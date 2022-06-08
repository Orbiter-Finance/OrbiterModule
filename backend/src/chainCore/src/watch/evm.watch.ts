import { EVMChain } from '../chain/evm-chain.service'
import { IntervalTimerDecorator } from '../decorators/intervalTimer.decorator'
import {
  Address,
  AddressMapTransactions,
  IEVMChain,
  QueryTxFilterEther,
} from '../types'
import { equals } from '../utils'
import logger from '../utils/logger'
import BasetWatch from './base.watch'

export default abstract class EVMWatchBase extends BasetWatch {
  abstract readonly minConfirmations: number
  private currentBlock: number = 0
  constructor(public readonly chain: IEVMChain) {
    super(chain)
  }
  public set setCurrentBlock(currentBlock: number) {
    if (currentBlock > this.currentBlock) {
      this.currentBlock = currentBlock
      this.cache.set(`rpcScan:${this.chain.chainConfig.chainId}`, currentBlock)
    }
  }
  public get getCurrentBlock() {
    return this.currentBlock
  }

  public async getApiFilter(address: Address): Promise<QueryTxFilterEther> {
    const params: Partial<QueryTxFilterEther> = {
      address,
      sort: 'asc',
      page: 1,
      offset: 100,
    }
    const cursor = await this.apiScanCursor(address)
    if (cursor) {
      params.startblock = Number(cursor.blockNumber) + 1
    }
    return params as QueryTxFilterEther
  }

  public async replayBlockTransaction(
    hashOrTx: string | any
  ): Promise<AddressMapTransactions> {
    const txmap: AddressMapTransactions = new Map()
    let originTx =
      typeof hashOrTx === 'string'
        ? await (<EVMChain>this.chain).getWeb3().eth.getTransaction(hashOrTx)
        : hashOrTx
    if (!hashOrTx.to) {
      return txmap
    }
    try {
      let isMatchTx = await this.isWatchWalletAddress(originTx.from)
      if (!isMatchTx && (await this.isWatchWalletAddress(originTx.to))) {
        isMatchTx = true
      }
      if (await this.isWatchContractAddress(hashOrTx.to)) {
        isMatchTx = true
      }
      if (!isMatchTx && originTx.input.length >= 138) {
        // match 1
        // if (await this.isWatchTokenAddress(originTx.to)) {
        //   const decodeInputData = decodeMethod(originTx.input)
        //   if (
        //     decodeInputData &&
        //     decodeInputData.params.length == 2 &&
        //     decodeInputData.name === 'transfer'
        //   ) {
        //     const addressRow = decodeInputData.params.find(
        //       (row) => row.name === 'recipient' || row.type === 'address'
        //     )
        //     if (
        //       (await this.isWatchTokenAddress(originTx.to)) &&
        //       (await this.isWatchWalletAddress(addressRow.value))
        //     ) {
        //       isMatchTx = true
        //     }
        //   }
        // }
        // match2
        for (const address of Array.from(this.watchAddress.keys())) {
          if (originTx.input.includes(address.substring(2))) {
            if (await this.isWatchTokenAddress(originTx.to)) {
              isMatchTx = true
              break
            }
          }
        }
      }
      if (!isMatchTx) {
        return txmap
      }
      const trx = await this.chain.convertTxToEntity(originTx)
      if (!trx) {
        return txmap
      }
      let matchAddress = ''
      if (await this.isWatchWalletAddress(trx.from)) {
        matchAddress = trx.from
      } else if (await this.isWatchWalletAddress(trx.to)) {
        matchAddress = trx.to
      }
      if (!matchAddress) {
        logger.info(
          `[${this.chain.chainConfig.name}] Matched but the resolved transaction failed to match: Addrss=${matchAddress}`,
          JSON.stringify(trx)
        )
        return txmap
      }
      matchAddress = matchAddress.toLowerCase()
      logger.info(
        `[${this.chain.chainConfig.name}] replayBlock Match Transaction:Addrss=${matchAddress},matchAddress Hash=${originTx.hash}`
      )
      if (!txmap.has(matchAddress)) txmap.set(matchAddress, [])
      txmap.get(matchAddress)?.push(trx)
      return txmap
    } catch (error) {
      throw error
    }
  }
  private async isWatchWalletAddress(address: string): Promise<boolean> {
    return this.watchAddress.has(address.toLowerCase())
  }
  private async isWatchContractAddress(address: string): Promise<boolean> {
    const isWatchContract =
      this.chain.chainConfig.contracts.findIndex((addr) =>
        equals(addr, address)
      ) != -1
    return isWatchContract
  }
  private async isWatchTokenAddress(address: string): Promise<boolean> {
    const chainConfig = this.chain.chainConfig
    const isChainMainCoin = equals(chainConfig.nativeCurrency.address, address)
    if (isChainMainCoin) return true
    const isWatchToken =
      chainConfig.tokens.findIndex((token) => equals(token.address, address)) !=
      -1
    return isWatchToken
  }
  public async replayBlock(
    start: number,
    end: number,
    changeBlock?: Function
  ): Promise<{ start: number; end: number }> {
    try {
      const web3 = (<EVMChain>this.chain).getWeb3()
      const config = this.chain.chainConfig
      config.debug && logger.info(`[${config.name}] Start replayBlock ${start}/${end - this.minConfirmations}, Latest:${end}`)

      while (start < end - this.minConfirmations) {
        try {
          let timestamp = Date.now()
          config.debug &&
            logger.debug(
              `[replayBlock - GgetBlockBefore] Block:${start}/${end - this.minConfirmations}, Latest:${end}, timestamp:${timestamp}`
            )
          const block = await web3.eth.getBlock(start, true)
          config.debug &&
            logger.debug(
              `[replayBlock - GetBlockAfter] Block:${start}/${end - this.minConfirmations}, Latest:${end}, timestamp:${timestamp},Spend time:${
                (Date.now() - timestamp) / 1000 + '/s'
              }`
            )
          if (block) {
            const { transactions } = block
            config.debug && logger.info(
              `[${config.name}] replayBlock (${start}/${end}), Trxs Count : ${transactions.length}`
            )
            const txmap: AddressMapTransactions = new Map()
            for (const tx of transactions) {
              // Filter non whitelist address transactions
              const matchTxList = await this.replayBlockTransaction(tx)
              matchTxList.forEach((txlist, address) => {
                if (!txmap.has(address)) txmap.set(address, [])
                txmap.get(address)?.push(...txlist)
              })
            }
            changeBlock && changeBlock(start, txmap)
            config.debug &&
              logger.debug(
                `[replayBlock - complete] Block:${start}, Latest:${end}, Next Block:${
                  start + 1
                }, timestamp:${timestamp},Spend time:${
                  (Date.now() - timestamp) / 1000 + '/s'
                }`
              )
            start++
          }
        } catch (error) {
          console.error(error)
          logger.error(`[${config.name}] replayBlock Error:`, error.message)
        }
      }
      return { start, end }
    } catch (error) {
      throw error
    }
  }
  @IntervalTimerDecorator
  public async rpcScan() {
    const currentBlockCacheKey = `rpcScan:${this.chain.chainConfig.chainId}`
    const latestHeight = await this.chain.getLatestHeight()
    if (!this.getCurrentBlock || this.getCurrentBlock <= 0) {
      // get cache height
      let cacheBlock = await this.cache.get(currentBlockCacheKey)
      if (!cacheBlock) {
        cacheBlock = latestHeight
      }
      this.setCurrentBlock = cacheBlock
    }
    const currentBlockHeight = this.getCurrentBlock
    const isScan = latestHeight - currentBlockHeight + 1 > this.minConfirmations
    if (isScan) {
      const result = await this.replayBlock(
        currentBlockHeight,
        latestHeight,
        (blockNumber: number, txmap: AddressMapTransactions) => {
          this.setCurrentBlock = blockNumber
          if (txmap && txmap.size > 0) {
            txmap.forEach(async (txlist, address) => {
              this.pushMessage(address, txlist)
              if (txlist.length > 0) {
                this.chain.chainConfig.debug && logger.info(
                  `[${this.chain.chainConfig.name}] RpcScan New Transaction: Cursor = ${blockNumber} `,
                  txlist.map((tx) => tx.hash)
                )
              }
            })
          }
        }
      )
      this.chain.chainConfig.debug && logger.info(
        `[${this.chain.chainConfig.name}] rpcScan End of scan result：`,
        result
      )
    }
  }
}
