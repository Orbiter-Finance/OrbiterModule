import {
  IChainConfig,
  QueryTransactionsResponse,
  QueryTxFilter,
  TransactionStatus,
} from '../types'
import { isEmpty } from '../utils'
import EtherscanClient, { EtherscanApiAction } from '../utils/etherscan'
import { EVMChain } from './evm-chain.service'
export abstract class EvmExplorerService extends EVMChain {
  private apiClient: EtherscanClient
  constructor(public readonly chainConfig: IChainConfig) {
    super(chainConfig)
    this.apiClient = new EtherscanClient(this.chainConfig.api.url, {
      apiKey: this.chainConfig.api.key,
    })
  }

  public async getTransactions(
    address: string,
    filter: Partial<QueryTxFilter> = {}
  ): Promise<QueryTransactionsResponse> {
    const returnResponse: QueryTransactionsResponse = {
      txlist: [],
    }
    const response = await this.apiClient.call(
      EtherscanApiAction.AccountTxlist,
      filter
    )
    const { status, result, ...responseExtra } = response
    if (status !== '1') {
      throw new Error(
        `${this.chainConfig.name} GetTransactions Fail:${JSON.stringify(
          response
        )} , Params:${JSON.stringify(filter)}`
      )
    }
    Object.assign(returnResponse, responseExtra)
    for (const tx of result) {
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
        input,
        contractAddress,
        gasUsed: gas,
        timeStamp: timestamp,
        ...extra
      } = tx
      let status = TransactionStatus.PENDING
      if (extra.isError === '1' || extra.txreceipt_status !== '1') {
        status = TransactionStatus.Fail
      } else {
        status = TransactionStatus.COMPLETE
      }
      const symbol = isEmpty(contractAddress)
        ? this.chainConfig.nativeCurrency.symbol
        : await this.getTokenSymbol(contractAddress)
      returnResponse.txlist.push({
        chainId: this.chainConfig.chainId,
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
        contractAddress,
        timestamp,
        extra,
        status,
        fee: Number(gas) * Number(gasPrice),
        feeToken: '',
        symbol,
      })
    }
    return returnResponse
  }

  public async getTokenTransactions(
    address: string,
    contractAddress: string | null,
    filter: Partial<QueryTxFilter> = {}
  ): Promise<QueryTransactionsResponse> {
    //
    const returnResponse: QueryTransactionsResponse = {
      txlist: [],
    }
    const response = await this.apiClient.call(
      EtherscanApiAction.AccountTokentx,
      filter
    )
    const { status, result, ...resExtra } = response
    if (status !== '1') {
      throw new Error(
        `${this.chainConfig.name} getTokenTransactions Fail:${JSON.stringify(
          response
        )} , Params:${JSON.stringify(filter)}`
      )
    }
    Object.assign(returnResponse, resExtra)
    for (const tx of result) {
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
        input,
        contractAddress,
        gasUsed: gas,
        timeStamp: timestamp,
        ...extra
      } = tx
      const symbol = isEmpty(contractAddress)
        ? this.chainConfig.nativeCurrency.symbol
        : await this.getTokenSymbol(contractAddress)
      let status = TransactionStatus.PENDING
      if (extra.isError === '1' || extra.txreceipt_status !== '1') {
        status = TransactionStatus.Fail
      }  {
        status = TransactionStatus.COMPLETE
      }
      returnResponse.txlist.push({
        chainId: this.chainConfig.chainId,
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
        contractAddress,
        timestamp,
        extra,
        status,
        fee: Number(gas) * Number(gasPrice),
        feeToken: '',
        symbol,
      })
    }
    return returnResponse
  }
}
