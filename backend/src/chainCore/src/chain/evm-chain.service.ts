import { AlchemyWeb3, createAlchemyWeb3 } from '@alch/alchemy-web3'
import { isEmpty } from '@loopring-web/loopring-sdk'
import BigNumber from 'bignumber.js'
import {
  HashOrBlockNumber,
  ITransaction,
  QueryTxFilterEther,
  Transaction,
  TransactionStatus,
} from '../types'
import {
  IChainConfig,
  IEVMChain,
  QueryTransactionsResponse,
} from '../types/chain'
import { decodeMethod, IERC20_ABI_JSON } from '../utils'
import logger from '../utils/logger'

export abstract class EVMChain implements IEVMChain {
  protected readonly web3: AlchemyWeb3
  constructor(public readonly chainConfig: IChainConfig) {
    this.web3 = createAlchemyWeb3(this.chainConfig.rpc[0])
  }

  public abstract getTransactions(
    address: string,
    filter?: Partial<QueryTxFilterEther>
  ): Promise<QueryTransactionsResponse>

  public abstract getTokenTransactions(
    address: string,
    tokenAddress?: string | null,
    filter?: Partial<QueryTxFilterEther>
  ): Promise<QueryTransactionsResponse>
  public getWeb3() {
    return this.web3
  }
  public getLatestHeight(): Promise<number> {
    return this.web3.eth.getBlockNumber()
  }
  public async getConfirmations(
    hashOrHeight: HashOrBlockNumber
  ): Promise<number> {
    const latestHeight = await this.getLatestHeight()
    if (typeof hashOrHeight === 'string') {
      const { blockNumber } = await this.web3.eth.getTransaction(hashOrHeight)
      if (blockNumber) {
        return this.calcConfirmations(blockNumber, latestHeight)
      }
      return 0
    } else {
      return this.calcConfirmations(Number(hashOrHeight), latestHeight)
    }
  }
  public async calcConfirmations(
    targetHeight: number,
    latestHeight: number
  ): Promise<number> {
    return Number(latestHeight) - Number(targetHeight) + 1
  }
  public async getTransactionByHash(
    txHash: string
  ): Promise<ITransaction | null> {
    const trx = await this.web3.eth.getTransaction(txHash)
    if (trx) {
      const tx = await this.convertTxToEntity(trx)
      return tx
    }
    return null
  }
  public async convertTxToEntity(trx: any): Promise<Transaction | null> {
    const {
      hash,
      nonce,
      blockHash,
      blockNumber,
      transactionIndex,
      from,
      to,
      value,
      gasPrice,
      gas,
      input,
      ...extra
    } = trx
    
    const trxRcceipt = await this.web3.eth.getTransactionReceipt(hash)
    if (!trxRcceipt) {
      return null
    }
    // status
    const block = await this.web3.eth.getBlock(Number(blockNumber), false)
    const confirmations = await this.getConfirmations(blockNumber)
    const newTx = new Transaction({
      chainId: this.chainConfig.chainId,
      hash,
      from,
      to: String(to),
      value: new BigNumber(value),
      nonce,
      blockHash: String(blockHash),
      blockNumber: Number(blockNumber),
      transactionIndex: Number(transactionIndex),
      gas: Number(gas),
      gasPrice: Number(gasPrice),
      fee: Number(gas) * Number(gasPrice),
      feeToken: this.chainConfig.nativeCurrency.symbol,
      input,
      symbol: '',
      tokenAddress: '',
      status: TransactionStatus.Fail,
      timestamp: Number(block.timestamp),
      confirmations,
      extra,
    })
    if (trxRcceipt.status) {
      newTx.status = TransactionStatus.COMPLETE
    }
    // valid main token or contract token
    if (!isEmpty(to)) {
      const code = await this.web3.eth.getCode(to)
      if (code === '0x') {
        newTx.tokenAddress = this.chainConfig.nativeCurrency.address
        newTx.symbol = this.chainConfig.nativeCurrency.symbol
      } else {
        // contract token
        newTx.tokenAddress = to
        newTx.to = ''
        const decodeInputData = decodeMethod(String(input), to.toLowerCase())
        // Compatible with transaction data from other chains to dydx
        if (
          this.chainConfig.contracts.findIndex(
            (addr) => addr.toLowerCase() === to.toLowerCase()
          ) !== -1
        ) {
          if (decodeInputData.name === 'transferERC20') {
            decodeInputData.params.forEach((el) => {
              if (el.name === '_token') {
                newTx.tokenAddress = el.value
              } else if (el.name === '_to') {
                newTx.to = el.value
              } else if (el.name === '_amount') {
                newTx.value = new BigNumber(el.value)
              }
            })
            newTx.symbol = await this.getTokenSymbol(to)
          }
        }
        if (decodeInputData && decodeInputData.name === 'transfer') {
          decodeInputData.params.forEach((el) => {
            if (el.type === 'address') {
              newTx.to = el.value
            } else if (el.type === 'uint256') {
              newTx.value = new BigNumber(el.value)
            }
          })
          // get token symbol
          newTx.symbol = await this.getTokenSymbol(to)
        }
      }
    }
    return newTx
  }
  public async getBalance(address: string): Promise<BigNumber> {
    const value = await this.web3.eth.getBalance(address)
    return new BigNumber(value)
  }
  public async getDecimals(): Promise<number> {
    return this.chainConfig.nativeCurrency.decimals
  }
  public async getTokenBalance(
    address: string,
    tokenAddress: string
  ): Promise<BigNumber> {
    const tokenContract = new this.web3.eth.Contract(
      IERC20_ABI_JSON as any,
      tokenAddress
    )
    const tokenBalance = await tokenContract.methods.balanceOf(address).call()
    return new BigNumber(tokenBalance)
  }
  public async getTokenDecimals(tokenAddress: string): Promise<number> {
    if (tokenAddress.toLowerCase() === this.chainConfig.nativeCurrency.address.toLowerCase()) {
      return this.chainConfig.nativeCurrency.decimals;
    }
    const token = await this.chainConfig.tokens.find(
      (token) => token.address.toLowerCase() === tokenAddress.toLowerCase()
    )
    if (token) {
      return token.decimals
    }
    try {
      const tokenContract = new this.web3.eth.Contract(
        IERC20_ABI_JSON as any,
        tokenAddress
      )
      const decimals = await tokenContract.methods.decimals().call()
      return decimals
    } catch (error) {
      logger.error(`getTokenDecimals Error:`, error.message, tokenAddress)
    }
    return NaN
  }
  public async getTokenSymbol(tokenAddress: string): Promise<string> {
    if (tokenAddress.toLowerCase() === this.chainConfig.nativeCurrency.address.toLowerCase()) {
      return this.chainConfig.nativeCurrency.symbol;
    }
    const token = await this.chainConfig.tokens.find(
      (token) => token.address.toLowerCase() === tokenAddress.toLowerCase()
    )
    if (token) {
      return token.symbol
    }
    try {
      const tokenContract = new this.web3.eth.Contract(
        IERC20_ABI_JSON as any,
        tokenAddress
      )
      const symbol = await tokenContract.methods.symbol().call()
      return symbol
    } catch (error) {
      logger.error(`getTokenSymbol Error:`, error.message, tokenAddress)
    }
    return ''
  }
}
