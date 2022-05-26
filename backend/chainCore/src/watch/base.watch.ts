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
import Keyv from 'keyv'
import dayjs from 'dayjs'
import { IntervalTimerDecorator } from '../decorators/intervalTimer.decorator'
import KeyvFile from '../utils/keyvFile'
export default abstract class BasetWatch implements IChainWatch {
  protected watchAddress: Map<Address, any> = new Map()
  protected pushHistory: Map<string, string> = new Map()
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
  public async init() {
    let txlist: Array<string> = (await this.cache.get(`txlist`)) || []
    if (!Array.isArray(txlist)) txlist = []
    txlist.forEach((hash) => {
      if (!this.pushHistory.has(hash.toLowerCase())) {
        this.pushHistory.set(hash, hash)
      }
    })
    return this
  }
  public addWatchAddress(address: Array<Address> | Address) {
    if (Array.isArray(address)) {
      for (const addr of address) {
        const addrLower = addr.toLowerCase()
        if (!this.watchAddress.has(addrLower) && !isEmpty(addrLower)) {
          this.apiScanCursor(addrLower).catch((error) => {
            logger.error(
              `[${this.chain.chainConfig.name}] addWatchAddress init cursor error:`,
              error.message
            )
          })
          this.watchAddress.set(addrLower, [])
        }
      }
    } else if (typeof address === 'string') {
      const addrLower = address.toLowerCase()
      if (!this.watchAddress.has(addrLower) && !isEmpty(addrLower)) {
        this.apiScanCursor(addrLower).catch((error) => {
          logger.error(
            `[${this.chain.chainConfig.name}] addWatchAddress init cursor error:`,
            error.message
          )
        })
        this.watchAddress.set(addrLower, [])
      }
    } else {
      throw new Error('Failed to identify parameter')
    }
    return this
  }
  protected async pushMessage(address: Address, txList: Array<ITransaction>) {
    let pushTrx: Array<ITransaction> = []
    txList.forEach((tx) => {
      if (!this.pushHistory.has(tx.hash.toLowerCase())) {
        pushTrx.push(tx)
        this.pushHistory.set(tx.hash.toLowerCase(), tx.hash)
      }
    })
    if (pushTrx.length > 0) {
      // write addrTxMap to cache
      this.cache.set('txlist', Array.from(this.pushHistory.keys()))
      ;({ txlist: pushTrx } = await this.pushBefore(address, pushTrx))
      PubSubMQ.publish(`${this.chain.chainConfig.chainId}:${address}`, pushTrx)
      logger.info(
        `[${this.chain.chainConfig.name}] New transaction pushed`,
        JSON.stringify(pushTrx)
      )
      pushTrx = orderBy(pushTrx, ['timestamp', 'blockNumber'], ['desc', 'desc'])
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
      const response: QueryTransactionsResponse =
        await this.chain.getTransactions(address, filter)
      trxList = response.txlist
    } catch (error) {
      logger.error(
        `[${this.chain.chainConfig.name}] apiWatchNewTransaction getTransactions error: ${error.message}`
      )
    }
    try {
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
  public async apiScanCursor(
    address: Address,
    trx?: ITransaction
  ): Promise<ITransaction | null> {
    await this.init()
    const cursorKey = `ApiCursor:${address}`
    let cursorTx: ITransaction = await this.cache.get(cursorKey)
    if (trx && trx.hash) {
      if (
        cursorTx &&
        (cursorTx.blockNumber > trx.blockNumber ||
          Number(cursorTx.timestamp) > Number(trx.timestamp))
      ) {
        return null
      }
      this.cache.set(cursorKey, {
        blockNumber: trx.blockNumber,
        timestamp: trx.timestamp,
      })
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
  public async apiScan(): Promise<void> {
    if (this.watchAddress.size <= 0) {
      return logger.error(
        `[${this.chain.chainConfig.name}] Api Scan Missing address parameter`
      )
    }
    for (const address of this.watchAddress.keys()) {
      const prevCursor = await this.apiScanCursor(address)
      if (prevCursor) {
        // exec query trx
        logger.debug(
          `[${this.chain.chainConfig.name}] API Scan Block in Progress: Cursor = `,
          prevCursor.blockNumber,
          prevCursor.timestamp
        )
        const queryTxs = await this.apiWatchNewTransaction(address)
        if (queryTxs.length > 0) {
          logger.info(
            `[${this.chain.chainConfig.name}] ApiScan New Transaction: Cursor = ${prevCursor.blockNumber} `,
            queryTxs.map((tx) => tx.hash)
          )
        }
        await this.pushMessage(address, queryTxs)
        const latest = orderBy(
          queryTxs,
          ['timestamp', 'blockNumber'],
          ['desc', 'desc']
        )[0]
        this.apiScanCursor(address, latest)
      }
    }
  }

  rpcScan(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
