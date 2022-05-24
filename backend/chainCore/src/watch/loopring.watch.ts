import dayjs from 'dayjs'
import { Address, ITransaction, QueryTxFilterLoopring } from '../types'
import AbstractWatch from './base.watch'
export default class LoopringWatch extends AbstractWatch {
  public async getApiFilter(address: string): Promise<QueryTxFilterLoopring> {
    const filter: Partial<QueryTxFilterLoopring> = {
      start: Date.now(),
      // status: 'processed',
      limit: 100,
      // tokenSymbol: 'ETH',
      transferTypes: 'transfer',
    }
    const cursor = await this.cursor(address)
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
    return response.txlist
  }
  public async ws() {
    throw new Error('Method not implemented.')
  }
}
