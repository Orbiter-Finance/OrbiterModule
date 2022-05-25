import dayjs from 'dayjs'
import { Address, ITransaction, QueryTxFilterDydx } from '../types'
import AbstractWatch from './base.watch'
export default class DydxWatch extends AbstractWatch {
  public async getApiFilter(address: Address): Promise<QueryTxFilterDydx> {
    const params:QueryTxFilterDydx = {
      limit: 50,
      createdBeforeOrAt: dayjs().toISOString(),
    }
    const cursor = await this.apiScanCursor(address)
    if (cursor) {
      params.createdBeforeOrAt = String(dayjs(cursor.timestamp).toISOString())
    }
    return params as QueryTxFilterDydx;
  }

  public async apiWatchNewTransaction(
    address: Address
  ): Promise<Array<ITransaction>> {
    const filter: any = await this.getApiFilter(address)
    const response = await this.chain.getTransactions(address, filter)
    return response.txlist
  }
  public async rpcScan() {
    throw new Error('Method not implemented.')
  }
}
