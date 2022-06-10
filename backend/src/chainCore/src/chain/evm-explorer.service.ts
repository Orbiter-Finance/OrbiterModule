import BigNumber from 'bignumber.js'
import {
  IChainConfig,
  QueryTransactionsResponse,
  QueryTxFilter,
  Transaction,
  TransactionStatus,
} from '../types'
import { equals, isEmpty } from '../utils'
import EtherscanClient, { EtherscanApiAction } from '../utils/etherscan'
import logger from '../utils/logger'
import { EVMChain } from './evm-chain.service'
export abstract class EvmExplorerService extends EVMChain {
  private apiClient: EtherscanClient
  constructor(public readonly chainConfig: IChainConfig) {
    super(chainConfig)
    this.apiClient = new EtherscanClient(this.chainConfig.api.url, {
      apiKey: this.chainConfig.api.key,
      debug: this.chainConfig.debug
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
      try {
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
          confirmations,
          gasUsed: gas,
          timeStamp: timestamp,
          ...extra
        } = tx
        const tokenAddress = isEmpty(tx.contractAddress) ? this.chainConfig.nativeCurrency.address : tx.contractAddress;
        const status =
          extra.isError !== '1' || extra.txreceipt_status === '1'
            ? TransactionStatus.COMPLETE
            : TransactionStatus.Fail
        const symbol = isEmpty(tokenAddress)
          ? this.chainConfig.nativeCurrency.symbol
          : await this.getTokenSymbol(tokenAddress)
        const newTx = new Transaction({
          chainId: this.chainConfig.chainId,
          hash,
          from,
          to,
          value: new BigNumber(value),
          nonce,
          blockHash,
          blockNumber,
          transactionIndex,
          gasPrice,
          gas,
          input,
          tokenAddress,
          timestamp,
          status,
          fee: Number(gas) * Number(gasPrice),
          feeToken: this.chainConfig.nativeCurrency.symbol,
          confirmations,
          symbol,
          extra,
          source: 'api'
        })
        if (equals(newTx.input, 'deprecated')) {
          // is deprecated
          const rpcTx = await this.web3.eth.getTransaction(hash)
          newTx.input = rpcTx.input
        }
        returnResponse.txlist.push(newTx)
      } catch (error) {
        logger.error(
          'getTransactions Error:',
          error.message,
          JSON.stringify(tx)
        )
      }
    }
    return returnResponse
  }

  public async getTokenTransactions(
    address: string,
    tokenAddress: string | null,
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
      try {
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
          contractAddress:tokenAddress,
          gasUsed: gas,
          timeStamp: timestamp,
          confirmations,
          ...extra
        } = tx
        const symbol = isEmpty(tokenAddress)
          ? this.chainConfig.nativeCurrency.symbol
          : await this.getTokenSymbol(tokenAddress)
        const status =
          extra.isError !== '1' || extra.txreceipt_status === '1'
            ? TransactionStatus.COMPLETE
            : TransactionStatus.Fail
        const newTx = new Transaction({
          chainId: this.chainConfig.chainId,
          hash,
          from,
          to,
          value: new BigNumber(value),
          nonce,
          blockHash,
          blockNumber,
          transactionIndex,
          gasPrice,
          gas,
          input,
          tokenAddress,
          timestamp,
          status,
          fee: Number(gas) * Number(gasPrice),
          feeToken: this.chainConfig.nativeCurrency.symbol,
          symbol,
          confirmations,
          extra,
          source: 'api'
        })
        if (equals(newTx.input,'deprecated')) {
          // is deprecated
          const rpcTx = await this.web3.eth.getTransaction(hash)
          if (rpcTx) {
            newTx.input = rpcTx.input
          }
        }
        returnResponse.txlist.push(newTx)
      } catch (error) {
        logger.error(
          'getTokenTransactions Error:',
          error.message,
          JSON.stringify(tx),
        )
        throw error
      }
    }
    return returnResponse
  }
}
