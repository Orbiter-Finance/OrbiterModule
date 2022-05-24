import { EVMChain } from '../chain/evm-chain.service'
import { Address, IChain, ITransaction, QueryTxFilterEther } from '../types'
import { decodeMethod, isEmpty } from '../utils'
import logger from '../utils/logger'
import BasetWatch from './base.watch'

export default class EVMWatchBase extends BasetWatch {
  chain: IChain

  protected async matchBlockTransaction(
    block: any
  ): Promise<Map<Address, Array<ITransaction>>> {
    // valid address
    const { transactions } = block
    const addressTxMap: Map<Address, Array<ITransaction>> = new Map()
    for (const tx of transactions) {
      const to = tx.to?.toLowerCase()
      const from = tx.from.toLowerCase()
      let matchAddress = ''
      if (this.addrTxs.has(to)) {
        // receive
        matchAddress = to
      } else if (this.addrTxs.has(from)) {
        // sender
        matchAddress = from
      } else {
        // token receive
        const decodeInputData = decodeMethod(String(tx.input))
        if (!decodeInputData) continue
        if (decodeInputData.name !== 'transfer') continue

        const toParams = decodeInputData.params.find(
          (log) => log.name === '_to' && log.type === 'address'
        )
        if (!toParams) continue

        const toAddress = toParams.value.toLowerCase()
        if (this.addrTxs.has(toAddress)) {
          matchAddress = toAddress
        }
      }
      if (!isEmpty(matchAddress)) {
        const trx = await this.chain.getTransactionByHash(tx.hash)
        if (!addressTxMap.has(matchAddress))
          addressTxMap.set(matchAddress, new Array())
        addressTxMap.get(matchAddress)?.push(trx)
      }
    }
    return addressTxMap
  }
  public async ws(): Promise<void> {
    const web3 = (<EVMChain>this.chain).getWeb3()
    if (!web3 || !web3.currentProvider) {
      throw new Error(`[${this.chain.chainConfig.name}] Web3 Not initialized`)
    }
    logger.info(
      `[${this.chain.chainConfig.name}] Start Websocket Subscribe `,
      web3.currentProvider['ws']['url']
    )
    web3.eth
      .subscribe('newBlockHeaders', (error, result) => {
        if (error) logger.error(`[${this.chain.chainConfig.name}] ws Subscribe newBlockHeaders error:`, error)
      })
      .on('data', async (blockHeader) => {
        const block = await web3.eth.getBlock(blockHeader.number, true)
        logger.debug(
          `[${this.chain.chainConfig.name}] WS Scan Block in Progress`,
          block.number,
          block.transactions.length
        )
        const addrMapTxlist: Map<
          Address,
          Array<ITransaction>
        > = await this.matchBlockTransaction(block)
        addrMapTxlist.forEach(
          async (txList: Array<ITransaction>, address: Address) => {
            const pushtxList = await this.pushMessage(address, txList)
            logger.info(
              `${this.chain.chainConfig.name} ${block.number} Websocket Subscribe New Transaction `,
              pushtxList.map((tx) => tx.hash)
            )
          }
        )
      })
  }
  public async getApiFilter(address: Address): Promise<QueryTxFilterEther> {
    const params: Partial<QueryTxFilterEther> = {
      address,
      sort: 'asc',
      offset: 100,
    }
    const cursor = await this.cursor(address)
    if (cursor) {
      params.startblock = Number(cursor.blockNumber) + 1
    }
    return params as QueryTxFilterEther
  }
}
