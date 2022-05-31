import { EVMChain } from '../chain/evm-chain.service'
import { IntervalTimerDecorator } from '../decorators/intervalTimer.decorator'
import {
  Address,
  AddressMapTransactions,
  IEVMChain,
  ITransaction,
  QueryTxFilterEther,
  Transaction,
} from '../types'
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
    try {
      const trx =
        typeof hashOrTx === 'string'
          ? await this.chain.getTransactionByHash(hashOrTx)
          : await this.chain.convertTxToEntity(hashOrTx)
      if (!trx) {
        return txmap
      }
      const from = trx.from.toLowerCase()
      const to = trx.to.toLowerCase()
      //
      if (await this.isWatchWalletAddress(from)) {
        if (!txmap.has(from)) txmap.set(from, [])
        txmap.get(from)?.push(trx)
      } else if (await this.isWatchWalletAddress(to)) {
        if (!txmap.has(to)) txmap.set(to, [])
        txmap.get(to)?.push(trx)
      }
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
      this.chain.chainConfig.contracts.findIndex(
        (addr) => addr.toLowerCase() === address.toLowerCase()
      ) != -1
    return isWatchContract
  }
  private async isWatchTokenAddress(address: string): Promise<boolean> {
    const isWatchToken =
      this.chain.chainConfig.tokens.findIndex(
        (token) => token.address.toLowerCase() === address.toLowerCase()
      ) != -1
    return isWatchToken
  }
  public async isWatchToAddress(to: string) {
    const lowerToAddress = to.toLowerCase()
    const chainConfig = this.chain.chainConfig
    // is watch wallet address
    const isWatchWallet = await this.isWatchWalletAddress(lowerToAddress)
    if (isWatchWallet) return true
    // is watch token address
    const isWatchToken = await this.isWatchTokenAddress(lowerToAddress)
    if (isWatchToken) return true
    // is chain main coin
    const isChainMainCoin =
      chainConfig.nativeCurrency.address.toLowerCase() === lowerToAddress
    if (isChainMainCoin) return true
    // is watch contract address
    const isWatchContract = await this.isWatchContractAddress(lowerToAddress)
    if (isWatchContract) return true
    return false
  }
  public async replayBlock(
    start: number,
    end: number,
    changeBlock?: Function
  ): Promise<{ start: number; end: number }> {
    try {
      const web3 = (<EVMChain>this.chain).getWeb3()
      const config = this.chain.chainConfig
      logger.info(`[${config.name}] Start replayBlock ${start} to ${end}`)
      while (start < end) {
        try {
          const block = await web3.eth.getBlock(start, true)
          const { transactions } = block
          config.debug && logger.debug(
            `[${config.name}] replayBlock (${start}/${end}), Trxs Count ${transactions.length}`
          )
          const txmap: AddressMapTransactions = new Map()
          for (const tx of transactions) {
            // Filter non whitelist address transactions
            if (!(await this.isWatchToAddress(String(tx.to)))) {
              continue
            }
            config.debug && logger.debug(
              `[${config.name}] replayBlock Handle Tx (${start}/${end}), trx index:${tx.transactionIndex}, hash:${tx.hash}`
            )
            const matchTxList = await this.replayBlockTransaction(tx)
            matchTxList.forEach((txlist, address) => {
              if (!txmap.has(address)) txmap.set(address, [])
              txmap.get(address)?.push(...txlist)
            })
          }
          changeBlock && changeBlock(start, txmap)
          start++
        } catch (error) {
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
    await this.init()
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
    this.chain.chainConfig.debug && logger.debug(
      `[${this.chain.chainConfig.name}] RpcScan in Progress (${currentBlockHeight}/${latestHeight}) Min Confirmation:${this.minConfirmations} Scan Or Not:${isScan}`
    )
    if (isScan) {
      const result = await this.replayBlock(
        currentBlockHeight,
        latestHeight,
        (blockNumber: number, txmap: AddressMapTransactions) => {
          this.setCurrentBlock = blockNumber
          if (txmap && txmap.size > 0) {
            txmap.forEach((txlist, address) => {
              this.pushMessage(address, txlist)
              if (txlist.length > 0) {
                logger.info(
                  `[${this.chain.chainConfig.name}] RpcScan New Transaction: Cursor = ${blockNumber} `,
                  txlist.map((tx) => tx.hash)
                )
              }
            })
          }
        }
      )
      logger.info(`[${this.chain.chainConfig}] rpcScan End of scan result：`, result)
    }
  }
}
