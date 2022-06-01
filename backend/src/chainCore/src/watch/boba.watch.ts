import { GraphQLClient, gql } from 'graphql-request'
import { Address, ITransaction } from '../types'
import EVMWatchBase from './evm.watch'
export default class BobaWatch extends EVMWatchBase {
  readonly minConfirmations: number = 1
  public async execGraphqlTransactions<
    T extends {
      hash: string
      blockNumber: number
    }
  >(addressHash: string): Promise<Array<T>> {
    const grap = new GraphQLClient(this.chain.chainConfig.api.url, { })
    // exec query
    const query = gql`
      query ($hash: AddressHash!) {
        address(hash: $hash) {
          transactions(first: 30) {
            edges {
              node {
                blockNumber
                hash
              }
            }
          }
        }
      }
    `
    const response = await grap
      .request(query, {
        hash: addressHash,
      })
      .then((res) => {
        if (
          res &&
          res.address &&
          res.address.transactions &&
          res.address.transactions.edges
        ) {
          return res.address.transactions.edges.map((row) => {
            return row.node
          })
        }
      })
    return response
  }
  public async apiWatchNewTransaction(
    address: Address
  ): Promise<Array<ITransaction>> {
    const filter = await this.getApiFilter(address)
    let hashList = await this.execGraphqlTransactions(address)
    hashList = hashList.filter((tx) => tx.blockNumber >= Number(filter.startblock))
    const queryTxList:Array<ITransaction> = [];
    for(const row of hashList) {
        const trx = await this.chain.getTransactionByHash(row.hash);
        trx && queryTxList.push(trx);
    }
    return queryTxList;
  }
}
