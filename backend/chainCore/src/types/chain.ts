import BigNumber from 'bignumber.js'
import { HashOrBlockNumber, QueryTxFilter } from '.'
import { ITransaction } from './transaction'
export interface IExplorerConfig {
  name: string
  url: string
  standard: string
}
export interface INativeCurrency {
  name: string
  symbol: string
  decimals: number
}
export interface IChainConfig {
  name: string
  chainId: string
  internalId: string
  network: string
  networkId: string
  rpc: string[]
  api: {
    url: string
    key?: string
    intervalTime: number
  }
  nativeCurrency: INativeCurrency
  watch: Array<string>
  explorers: IExplorerConfig[]
}
export interface QueryTransactionsResponse {
  txlist: Array<ITransaction>
  [key: string]: any
}

export interface IChain {
  chainConfig: IChainConfig
  getLatestHeight(): Promise<number>
  getConfirmations(hashOrHeight: HashOrBlockNumber): Promise<number>
  calcConfirmations(targetHeight: number, latestHeight: number): Promise<number>
  getTransactionByHash(hash: string): Promise<ITransaction>
  getTransactions(
    address: string,
    filter: Partial<QueryTxFilter>
  ): Promise<QueryTransactionsResponse>
  getTokenTransactions(
    address: string,
    contractAddress: string | null,
    filter: Partial<QueryTxFilter>
  ): Promise<QueryTransactionsResponse>
  getBalance(address: string): Promise<BigNumber>
  getDecimals(): Promise<number>
  getTokenBalance(address: string, contractAddress: string): Promise<BigNumber>
  getTokenDecimals(contractAddress: string): Promise<number>
  getTokenSymbol(contractAddress: string): Promise<string>
}
