import {
  Address,
  Hash,
  IChain,
  IChainWatch,
  ITransaction,
  QueryTransactionsResponse,
  QueryTxFilter,
  Transaction,
} from '../types'
import PubSubMQ from '../utils/pubsub'
import logger from '../utils/logger'
import { isEmpty, orderBy } from '../utils'
import { cacheDecorator } from '../decorators/cache.decorator'
import Keyv from 'keyv'
import dayjs from 'dayjs'
import { IntervalTimerDecorator } from '../decorators/intervalTimer.decorator'
import KeyvFile from '../utils/keyvFile'
export default abstract class BasetWatch implements IChainWatch {
  protected addrTxs: Map<Address, Map<Hash, ITransaction>> = new Map()
  // @cacheDecorator('cursor')
  protected cache: Keyv
  constructor(public readonly chain: IChain) {
    this.cache = new Keyv({
      store: new KeyvFile({
        filename: `cache/${this.chain.chainConfig.name}`, // the file path to store the data
        expiredCheckDelay: 999999 * 24 * 3600 * 1000, // ms, check and remove expired data in each ms
        writeDelay: 100, // ms, batch write to disk in a specific duration, enhance write performance.
        encode: JSON.stringify, // serialize function
        decode: JSON.parse, // deserialize function
      }),
    })
  }
  public abstract getApiFilter(address: Address): Promise<QueryTxFilter>

  public addWatchAddress(address: Array<Address> | Address) {
    if (Array.isArray(address)) {
      for (const addr of address) {
        const addrLower = addr.toLowerCase()
        if (!this.addrTxs.has(addrLower) && !isEmpty(addrLower)) {
          this.cursor(addrLower).catch((error) => {
            logger.error(
              `[${this.chain.chainConfig.name}] addWatchAddress init cursor error:`,
              error.message
            )
          })
          this.addrTxs.set(addrLower, new Map())
        }
      }
    } else if (typeof address === 'string') {
      const addrLower = address.toLowerCase()
      if (!this.addrTxs.has(addrLower) && !isEmpty(addrLower)) {
        this.cursor(addrLower).catch((error) => {
          logger.error(
            `[${this.chain.chainConfig.name}] addWatchAddress init cursor error:`,
            error.message
          )
        })
        this.addrTxs.set(addrLower, new Map())
      }
    } else {
      throw new Error('Failed to identify parameter')
    }
    return this
  }
  protected async pushMessage(address: Address, txList: Array<ITransaction>) {
    let pushTrx: Array<ITransaction> = []
    const cursorTrx = await this.cursor(address)
    const addrTxMap = this.addrTxs.get(address)
    for (const tx of txList) {
      if (addrTxMap && !addrTxMap.has(tx.hash)) {
        if (
          cursorTrx &&
          tx.blockNumber >= cursorTrx.blockNumber &&
          tx.timestamp > cursorTrx.timestamp
        ) {
          addrTxMap.set(tx.hash, tx)
          pushTrx.push(tx)
        }
      }
    }
    if (pushTrx.length > 0) {
      ;({ txlist: pushTrx } = await this.pushBefore(address, pushTrx))
      PubSubMQ.publish(`${this.chain.chainConfig.chainId}:${address}`, pushTrx)
      logger.info(
        `[${this.chain.chainConfig.name}] New transaction pushed`,
        JSON.stringify(pushTrx)
      )
      pushTrx = orderBy(pushTrx, ['timestamp', 'blockNumber'], ['desc', 'desc'])
      this.cursor(address, pushTrx[0])
      this.pushAfter(address, pushTrx)
    }
    return pushTrx
  }
  protected async pushBefore(address: Address, txlist: Array<ITransaction>) {
    return { address, txlist }
  }
  protected pushAfter(address: Address, txlist: Array<ITransaction>) {
    return { address, txlist }
  }
  public async apiWatchNewTransaction(
    address: Address
  ): Promise<Array<ITransaction>> {
    let trxList: Array<ITransaction> = [],
      tokenList: Array<ITransaction> = []
    const filter = await this.getApiFilter(address)
    try {
      // TAG:Do you need a web3js test according to the situation
      const response: QueryTransactionsResponse =
        await this.chain.getTransactions(address, filter)
      trxList = response.txlist
    } catch (error) {
      logger.error(
        `[${this.chain.chainConfig.name}] apiWatchNewTransaction getTransactions error: ${error.message}`
      )
    }
    try {
      // TAG:Do you need a web3js test according to the situation
      const response = await this.chain.getTokenTransactions(
        address,
        null,
        filter
      )
      tokenList = response.txlist
    } catch (error) {
      logger.error(
        `[${this.chain.chainConfig.name}] apiWatchNewTransaction getTokenTransactions error: ${error.message}`
      )
    }

    return [...trxList, ...tokenList]
  }
  public async cursor(
    address: Address,
    trx?: ITransaction
  ): Promise<ITransaction | null> {
    const cursorKey = `${this.chain.chainConfig.chainId}:${address}`
    let cursorTx: ITransaction = await this.cache.get(cursorKey)
    if (trx && trx.hash) {
      if (
        cursorTx &&
        (cursorTx.blockNumber > trx.blockNumber ||
          Number(cursorTx.timestamp) > Number(trx.timestamp))
      ) {
        return null
      }
      this.cache.set(cursorKey, trx)
      return trx
    } else {
      // get cursor
      if (!isEmpty(cursorTx)) {
        return cursorTx
      }
      // init
      const blockNumber = await this.chain.getLatestHeight()
      // TAG:blockNumber Whether + 1 is needed needs to be considered
      const nowTx: Pick<Transaction, 'blockNumber' | 'timestamp'> = {
        blockNumber: blockNumber,
        timestamp: dayjs().unix(),
      }
      this.cache.set(cursorKey, nowTx)
      return nowTx as Transaction
    }
  }

  @IntervalTimerDecorator
  public async api(): Promise<void> {
    if (this.addrTxs.size <= 0) {
      return logger.error(
        `[${this.chain.chainConfig.name}] Api Scan Missing address parameter`
      )
    }
    for (const address of this.addrTxs.keys()) {
      const prevCursor = await this.cursor(address)
      if (prevCursor) {
        // exec query trx
        logger.debug(
          `[${this.chain.chainConfig.name}] API Scan Block in Progress: Cursor = `,
          prevCursor.blockNumber,
          prevCursor.timestamp
        )
        let queryTxs = await this.apiWatchNewTransaction(address)
        console.log(JSON.stringify(queryTxs), '===查询到的交易')
        queryTxs = await this.pushMessage(address, queryTxs)
        if (queryTxs.length > 0) {
          logger.info(
            `[${this.chain.chainConfig.name}] Api apiWatchNewTransaction New Transaction: Cursor = ${prevCursor.blockNumber} `,
            queryTxs.map((tx) => tx.hash)
          )
        }
      }
    }
  }

  ws(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
