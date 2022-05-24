import { IChain } from './chain'
import { ITransaction } from './transaction'
export * from './chain'
export * from './transaction'
export type HashOrBlockNumber = string | number
export type Hash = string
export type Address = string
export interface IChainWatch {
  chain: IChain
  api(): Promise<void>
  ws(): Promise<void>
  // cursor(address: Address, tx?: ITransaction): Promise<string>
}
// export interface IEvmChainExplorerApi {
//   getTransactions(
//     address: string,
//     filter: Partial<TxListFilter>
//   ): Promise<ITransaction[]>
//   getTokenTransactions(
//     address: string,
//     contractAddress?: string | null,
//     filter?: Partial<TxListFilter>
//   ): Promise<ITransaction[]>
// }
export interface QueryTxFilter {}
export interface QueryTxFilterMetis extends QueryTxFilter {
  address: string
  sort?: string
  startblock?: number
  endblock?: number
  page?: number
  offset?: number
  filterby?: string
  starttimestamp?: number
  endtimestamp?: number
}
export interface QueryTxFilterEther extends QueryTxFilter {
  address: string
  sort?: string
  startblock?: number
  endblock?: number
  page?: number
  offset?: number
}
export interface QueryTxFilterZKSync extends QueryTxFilter {
  from: string | 'latest'
  limit: number
  direction: 'newer' | 'older'
}
export interface QueryTxFilterZKSpace extends QueryTxFilter {
  types: string
  limit: number
  start: number
  token?:string
}
export interface QueryTxFilterDydx extends QueryTxFilter {
  limit: number
  createdBeforeOrAt: string
}
export interface QueryTxFilterLoopring extends QueryTxFilter {
  accountId: number;
  start?: number
  end?: number;
  status?: string;
  limit?: number;
  offset?:number;
  tokenSymbol?: string;
  transferTypes?: string;
}

export interface QueryTxFilterIMX extends QueryTxFilter {
  order_by: string | null
  page_size: number | null
  cursor: string | null
  direction: string | null
  user: string | null
  receiver: string | null
  status: string | null
  rollup_status: string | null
  min_timestamp: string | null
  max_timestamp: string | null
  token_type: string | null
  token_id: string | null
  token_address: string | null
  min_quantity: string | null
  max_quantity: string | null
  metadata: string | null
}
