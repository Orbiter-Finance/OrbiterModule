import dayjs from 'dayjs'
import { Address, ITransaction, QueryTxFilterLoopring } from '../types'
import AbstractWatch from './base.watch'
export default class LoopringWatch extends AbstractWatch {
  public async getApiFilter(address: string): Promise<QueryTxFilterLoopring> {
    const filter: Partial<QueryTxFilterLoopring> = {
      start: Date.now(),
      status: 'processed,received',
      limit: 100,
      // tokenSymbol: 'ETH',
      transferTypes: 'transfer',
    }
    const cursor = await this.apiScanCursor(address)
    if (cursor && cursor.timestamp)
      filter.start = Number(cursor.timestamp) * 1000 + 1
    filter.end = dayjs(filter.start).add(10, 'minute').valueOf()
    return filter as QueryTxFilterLoopring
  }
  public async apiWatchNewTransaction(
    address: Address
  ): Promise<Array<ITransaction>> {
    const filter = await this.getApiFilter(address)
    const response = await this.chain.getTransactions(address, filter)
    // console.log('露营交易：', filter, response)
    return response.txlist
  }
}
