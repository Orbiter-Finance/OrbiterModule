import { Address, ITransaction, QueryTxFilterEther } from '../types'
import EVMWatchBase from './evm.watch'
export default class ZKSync2Watch extends EVMWatchBase {
  readonly minConfirmations: number = 3
  private readonly feeAddress = '0xde03a0B5963f75f1C8485B355fF6D30f3093BDE7'.toLowerCase();
  public async getApiFilter(address: Address): Promise<QueryTxFilterEther> {
    const params: Partial<QueryTxFilterEther> = {
      address,
      sort: 'asc',
      page: 1,
      offset: 0,
    }
    const cursor = await this.apiScanCursor(address)
    if (cursor) {
      params.startblock = Number(cursor.blockNumber) + 1
    }
    return params as QueryTxFilterEther
  }
  protected async pushBefore(address: Address, txList: Array<ITransaction>) {
    txList = txList.filter(tx=> tx.to.toLowerCase() != this.feeAddress)
    return { address, txList }
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
    response.txlist = response.txlist.filter(row => row.to.toLowerCase() !== this.feeAddress)
    return response.txlist
  }
}
