import { GraphQLClient, gql } from 'graphql-request'
import { createAlchemyWeb3, AlchemyWeb3 } from '@alch/alchemy-web3'
export default class BobaService {
  private grap: GraphQLClient
  private jsonrpc: AlchemyWeb3
  constructor(rpcHost: string,apiHost: string) {
    this.jsonrpc = createAlchemyWeb3(rpcHost);
    this.grap = new GraphQLClient(
      apiHost,
      { headers: {} }
    )
  }
  getTransactionByAddress(addrHash: string, startBlock?: string, endblock?: string) {
    return new Promise(async (resolve, reject) => {
      const trxList: any[] = []
      try {
        const query = gql`
          query ($hash: AddressHash!) {
            address(hash: $hash) {
              transactions(first: 39) {
                edges {
                  node {
                    blockNumber,
                    status
                    hash
                  }
                }
              }
            }
          }
        `
        const { address } = await this.grap.request(query, {
          hash: addrHash,
        })
        if (address && address.transactions && address.transactions.edges) {
          let transactions = address.transactions.edges.map((row) => {
            return row.node
          })
          if (Number(startBlock) > 0) {
            transactions = transactions.filter(
              (row) => row.blockNumber >= Number(startBlock)
            )
          }
          const nowHeight = await this.jsonrpc.eth.getBlockNumber()
          for (const row of transactions) {
            if (row.error || row.status != 'OK') {
              continue
            }
            const trx: any = await this.jsonrpc.eth.getTransaction(row.hash)
            var receipt:any = await this.jsonrpc.eth.getTransactionReceipt(row.hash)
            if (trx && receipt && receipt.status) {
              trxList.push({
                blockNumber: trx.blockNumber,
                timeStamp:Number(trx.l1Timestamp),
                hash: trx.hash,
                blockHash: trx.blockHash,
                transactionIndex: trx.transactionIndex,
                from: trx.from,
                to: trx.to,
                value: trx.value,
                gas: trx.gas,
                gasPrice: trx.gasPrice,
                nonce: trx.nonce,
                isError: '0',
                txreceipt_status: '',
                input: trx.input,
                contractAddress: '',
                cumulativeGasUsed: '',
                gasUsed: receipt.gasUsed,
                confirmations: nowHeight - trx.blockNumber + 1,
              })
            }
           
          }
        }
        resolve(trxList)
      } catch (error) {
        reject(error)
      }
    })
  }
}
