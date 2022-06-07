import { Address, ITransaction, QueryTxFilterMetis } from '../types'
import EVMWatchBase from './evm.watch'
export default class MetisWatch extends EVMWatchBase {
  readonly minConfirmations: number = 3
  public async getApiFilter(address: Address): Promise<QueryTxFilterMetis> {
    const params: Partial<QueryTxFilterMetis> = {
      address,
      sort: 'asc',
      page: 1,
      offset: 0,
    }
    const cursor = await this.apiScanCursor(address)
    if (cursor) {
      params.startblock = Number(cursor.blockNumber) + 1
    }
    return params as QueryTxFilterMetis
  }

  public async apiWatchNewTransaction(
    address: Address
  ): Promise<Array<ITransaction>> {
    const filter: any = await this.getApiFilter(address)
    const response = await this.chain.getTokenTransactions(
      address,
      null,
      filter
    )
    return response.txlist
  }
}
