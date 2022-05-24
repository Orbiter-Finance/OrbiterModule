import { AlchemyWeb3, createAlchemyWeb3 } from '@alch/alchemy-web3'
import BigNumber from 'bignumber.js'
import {
  HashOrBlockNumber,
  ITransaction,
  QueryTxFilterEther,
  Transaction,
  TransactionStatus,
} from '../types'
import { IChain, IChainConfig, QueryTransactionsResponse } from '../types/chain'
import { decodeMethod, DEFAULT_ABI } from '../utils'

export abstract class EVMChain implements IChain {
  private readonly web3: AlchemyWeb3
  constructor(public readonly chainConfig: IChainConfig) {
    const wss = this.chainConfig.rpc.find((url: string) => {
      return url && url.includes('wss://')
    })
    if (!wss) {
      throw new Error(`[${this.chainConfig.name}] Not Config RPC WSS Server`)
    }
    this.web3 = createAlchemyWeb3(wss)
  }
  abstract readonly minConfirmations: number
  public abstract getTransactions(
    address: string,
    filter?: Partial<QueryTxFilterEther>
  ): Promise<QueryTransactionsResponse>

  public abstract getTokenTransactions(
    address: string,
    contractAddress?: string | null,
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
  public async getTransactionByHash(txHash: string): Promise<ITransaction> {
    const trxRcceipt = await this.web3.eth.getTransactionReceipt(txHash)
    console.log(trxRcceipt, '===trxRcceipt')
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
    } = await this.web3.eth.getTransaction(txHash)
    const block = await this.web3.eth.getBlock(Number(blockNumber))
    const trxDTO = new Transaction({
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
      feeToken: '',
      input,
      symbol: '',
      status: TransactionStatus.Fail,
      timestamp: Number(block.timestamp),
      extra,
    })
    const confirmations = await this.getConfirmations(trxDTO.blockNumber)
    trxDTO.confirmations = confirmations
    if (trxRcceipt) {
      if (trxRcceipt.status) {
        trxDTO.status =
          confirmations >= this.minConfirmations
            ? TransactionStatus.COMPLETE
            : TransactionStatus.PENDING
      } else {
        trxDTO.status = TransactionStatus.Fail
      }
    }
    // valid is contract address
    const code = await this.web3.eth.getCode(trxDTO.to)
    if (code === '0x') {
      trxDTO.symbol = this.chainConfig.nativeCurrency.symbol
    } else {
      trxDTO.contractAddress = String(to)
      trxDTO.symbol = await this.getTokenSymbol(trxDTO.contractAddress)
      trxDTO.to = ''
      const decodeInputData = decodeMethod(String(trxDTO.input))
      if (decodeInputData && decodeInputData.name === 'transfer') {
        const addressEvent = decodeInputData.params.find(
          (e) => e.name === '_to' && e.type === 'address'
        )
        const valueEvent = decodeInputData.params.find(
          (e) => e.name === '_value' && e.type === 'uint256'
        )
        trxDTO.value = new BigNumber(valueEvent.value)
        trxDTO.to = addressEvent.value
      }
    }
    return trxDTO
  }
  public async getBalance(address: string): Promise<BigNumber> {
    const value = await this.web3.eth.getBalance(address)
    return new BigNumber(value)
  }
  public async getDecimals(): Promise<number> {
    return 18
  }
  public async getTokenBalance(
    address: string,
    contractAddress: string
  ): Promise<BigNumber> {
    const tokenContract = new this.web3.eth.Contract(
      DEFAULT_ABI as any,
      contractAddress
    )
    const tokenBalance = await tokenContract.methods.balanceOf(address).call()
    return new BigNumber(tokenBalance)
  }
  public async getTokenDecimals(contractAddress: string): Promise<number> {
    const tokenContract = new this.web3.eth.Contract(
      DEFAULT_ABI as any,
      contractAddress
    )
    const decimals = await tokenContract.methods.decimals().call()
    return decimals
  }
  public async getTokenSymbol(contractAddress: string): Promise<string> {
    const tokenContract = new this.web3.eth.Contract(
      DEFAULT_ABI as any,
      contractAddress
    )
    const symbol = await tokenContract.methods.symbol().call()
    return symbol
  }
}
