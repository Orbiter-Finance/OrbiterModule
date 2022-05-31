import { Address, QueryTxFilterMetis } from '../types'
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
    
}
