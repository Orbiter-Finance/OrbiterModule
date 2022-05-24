import { Address, QueryTxFilterIMX, ITransaction } from '../types'
import BasetWatch from './base.watch'
export default class ImmutableXWatch extends BasetWatch {
  public async getApiFilter(address: Address): Promise<QueryTxFilterIMX> {
    const params: Partial<QueryTxFilterIMX> = {
      page_size: 100,
      direction: 'desc',
    }
    return params as QueryTxFilterIMX
  }

  public async apiWatchNewTransaction(
    address: Address
  ): Promise<Array<ITransaction>> {
    const filter: any = await this.getApiFilter(address)
    const response = await this.chain.getTransactions(address, filter)
    return response.txlist
  }
  public async ws() {
    throw new Error('Method not implemented.')
  }
}
