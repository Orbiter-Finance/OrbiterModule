import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import {
  HashOrBlockNumber,
  IChain,
  IChainConfig,
  ITransaction,
  QueryTransactionsResponse,
  QueryTxFilterZKSync,
  Transaction,
  TransactionStatus,
} from '../types'
import { HttpGet, isEmpty } from '../utils'
/**
 * ZKSync 1.0
 * https://docs.zksync.io/apiv02-docs/
 */
export class ZKSync implements IChain {
  private tokens: Map<
    string,
    {
      id: number
      address: string
      decimals: number
      symbol: string
      icon: string
      approved: string
    }
  > = new Map()
  constructor(public readonly chainConfig: IChainConfig) {}
  public async getLatestHeight(): Promise<number> {
    const { result } = await HttpGet(
      `${this.chainConfig.api.url}/blocks/lastCommitted`
    )
    return result && result['blockNumber']
  }
  public async getTokenList() {
    if (this.tokens.size <= 0) {
      const { success, data } = await HttpGet(
        `${this.chainConfig.api.url}/tokens?from=1&limit=100&direction=newer`
      )
      if (success && Array.isArray(data)) {
        data.forEach((token) => {
          this.tokens.set(String(token.tokenId), token)
        })
      }
      return this.tokens
    }
    return this.tokens
  }
  getConfirmations(hashOrHeight: HashOrBlockNumber): Promise<number> {
    throw new Error('Method not implemented.')
  }
  calcConfirmations(
    targetHeight: number,
    latestHeight: number
  ): Promise<number> {
    throw new Error('Method not implemented.')
  }
  getTransactionByHash(hash: string): Promise<ITransaction> {
    throw new Error('Method not implemented.')
  }
  public async getTransactions(
    address: string,
    filter: Partial<QueryTxFilterZKSync> = {}
  ): Promise<QueryTransactionsResponse> {
    const response: QueryTransactionsResponse = {
      txlist: [],
    }
    const { result } = await HttpGet(
      `${this.chainConfig.api.url}/accounts/${address}/transactions`,
      filter
    )
    const { list, ...resExtra } = result
    Object.assign(response, resExtra)
    if (result && result.list && result.list.length > 0) {
      for (const tx of result.list) {
        const { txHash, blockNumber, blockIndex, op, createdAt, ...extra } = tx
        const { from, to, amount, fee, nonce, token } = op
        let txStatus = TransactionStatus.Fail
        if (extra.status === 'committed') {
          txStatus = TransactionStatus.PENDING
        } else if (extra.status === 'finalized') {
          txStatus = TransactionStatus.COMPLETE
        }
        const trx = new Transaction({
          chainId: this.chainConfig.chainId,
          hash: txHash,
          nonce,
          blockHash: blockIndex,
          blockNumber,
          transactionIndex: 0,
          from,
          to,
          value: new BigNumber(amount),
          fee,
          feeToken: '',
          contractAddress: String(token),
          timestamp: dayjs(tx.createdAt).unix(),
          extra,
          status: txStatus,
          symbol: '',
        })
        if (isEmpty(token)) {
          trx.symbol = this.chainConfig.nativeCurrency.symbol
        }
        response.txlist.push(trx)
      }
    }
    return response
  }
  public async getTokenTransactions(
    address: string,
    contractAddress: string,
    filter: Partial<QueryTxFilterZKSync> = {}
  ): Promise<QueryTransactionsResponse> {
    return (await this.getTransactions(address, filter)).filter(
      (tx) => tx.contractAddress === contractAddress
    )
  }
  public async getBalance(address: string): Promise<BigNumber> {
    return this.getTokenBalance(address, this.chainConfig.nativeCurrency.symbol)
  }
  public async getDecimals(): Promise<number> {
    const tokenInfo = (await this.getTokenList()).get('0')
    if (!tokenInfo) {
      throw new Error(`Main Token 0 Not Exists`)
    }
    return tokenInfo && tokenInfo.decimals
  }
  public async getTokenBalance(
    address: string,
    contractAddress: string
  ): Promise<BigNumber> {
    const { result } = await HttpGet(
      `${this.chainConfig.api.url}/accounts/${address}/committed`
    )
    if (result && result.balances && result.balances[contractAddress]) {
      return new BigNumber(result.balances[contractAddress])
    }
    return new BigNumber(0)
  }
  public async getTokenDecimals(contractAddress: string): Promise<number> {
    const tokenInfo = (await this.getTokenList()).get(contractAddress)
    if (!tokenInfo) {
      throw new Error(`${contractAddress} Token Not Exists`)
    }
    if (tokenInfo) {
      return Number(tokenInfo.decimals)
    }
    return 0
  }
  async getTokenSymbol(contractAddress: string): Promise<string> {
    const tokenInfo = (await this.getTokenList()).get(contractAddress)
    if (!tokenInfo) {
      throw new Error(`${contractAddress} Token Not Exists`)
    }
    return tokenInfo && tokenInfo.symbol
  }
}
