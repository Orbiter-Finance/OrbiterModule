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
import { decodeLogs, decodeMethod, IERC20_ABI_JSON } from '../utils'

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
    console.log(
      JSON.stringify(trxRcceipt),
      '===',
      JSON.stringify(decodeLogs(trxRcceipt.logs))
    )
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
        newTx.symbol = this.chainConfig.nativeCurrency.symbol
      } else {
        // contract token
        newTx.contractAddress = to
        newTx.to = ''
        const decodeInputData = decodeMethod(String(input))
        if (decodeInputData && decodeInputData.name === 'transfer') {
          const addressEvent = decodeInputData.params.find(
            (e) => e.type === 'address'
          )
          const valueEvent = decodeInputData.params.find(
            (e) => e.type === 'uint256'
          )
          newTx.value = new BigNumber(valueEvent.value)
          newTx.to = addressEvent.value
          // newTx.symbol = await this.getTokenSymbol(to)
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
    return 18
  }
  public async getTokenBalance(
    address: string,
    contractAddress: string
  ): Promise<BigNumber> {
    const tokenContract = new this.web3.eth.Contract(
      IERC20_ABI_JSON as any,
      contractAddress
    )
    const tokenBalance = await tokenContract.methods.balanceOf(address).call()
    return new BigNumber(tokenBalance)
  }
  public async getTokenDecimals(contractAddress: string): Promise<number> {
    const tokenContract = new this.web3.eth.Contract(
      IERC20_ABI_JSON as any,
      contractAddress
    )
    const decimals = await tokenContract.methods.decimals().call()
    return decimals
  }
  public async getTokenSymbol(contractAddress: string): Promise<string> {
    const tokenContract = new this.web3.eth.Contract(
      IERC20_ABI_JSON as any,
      contractAddress
    )
    const symbol = await tokenContract.methods.symbol().call()
    return symbol
  }
}
