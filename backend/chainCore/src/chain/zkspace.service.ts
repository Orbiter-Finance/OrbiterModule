import BigNumber from 'bignumber.js'
import {
  HashOrBlockNumber,
  IChain,
  IChainConfig,
  ITransaction,
  QueryTransactionsResponse,
  QueryTxFilterZKSpace,
  Transaction,
  TransactionStatus,
} from '../types'
import { HttpGet } from '../utils'
/**
 * https://zks.app/wallet/token
 * https://zkspace.info/
 */
export class ZKSpace implements IChain {
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
  async getLatestHeight(): Promise<number> {
    const { success, data } = await HttpGet(
      `${this.chainConfig.api.url}/blocks`,
      {
        start: 0,
        limit: 1,
      }
    )
    if (success && Array.isArray(data.data) && data.data.length > 0) {
      return data.data[0].number
    }
    return 0
  }
  public async getTokenList() {
    if (this.tokens.size <= 0) {
      const { success, data } = await HttpGet(
        `${this.chainConfig.api.url}/tokens`
      )
      if (success && Array.isArray(data)) {
        data.forEach((row) => {
          this.tokens.set(String(row.id), row)
        })
      }
      return this.tokens;
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
  async getTransactions(
    address: string,
    filter: Partial<QueryTxFilterZKSpace> = {}
  ): Promise<QueryTransactionsResponse> {
    const response: QueryTransactionsResponse = {
      txlist: [],
    }
    const { data, success, ...resExtra } = await HttpGet(
      `${this.chainConfig.api.url}/txs`,
      Object.assign({ address }, filter)
    )
    Object.assign(response, resExtra)
    if (success) {
      for (const row of data.data) {
        const {
          tx_hash,
          nonce,
          block_number,
          from,
          to,
          amount,
          fee,
          token,
          created_at,
          ...extra
        } = row
        let txStatus = TransactionStatus.Fail
        if (extra.success) {
          txStatus = TransactionStatus.PENDING
          if (extra.status === 'pending') {
            txStatus = TransactionStatus.PENDING
          } else if (extra.status === 'verified') {
            txStatus = TransactionStatus.COMPLETE
          }
        }
        const trx = new Transaction({
          chainId: this.chainConfig.chainId,
          hash: tx_hash,
          nonce,
          blockHash: '',
          blockNumber: block_number,
          transactionIndex: 0,
          from,
          to,
          value: new BigNumber(amount),
          fee,
          feeToken: extra.fee_token === 0 ? this.chainConfig.nativeCurrency.symbol : extra.fee_token,
          tokenAddress: String(token.id),
          timestamp: created_at,
          extra,
          status: txStatus,
          symbol: token.symbol,
        })
        response.txlist.push(trx)
      }
    }
    return response
  }
  async getTokenTransactions(
    address: string,
    tokenAddress: string,
    filter: Partial<QueryTxFilterZKSpace>
  ): Promise<QueryTransactionsResponse> {
    const token = (await this.getTokenList()).get(tokenAddress)
    if (!token) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    const response: QueryTransactionsResponse = {
      txlist: [],
    }
    const { data, success, ...resExtra } = await HttpGet(
      `${this.chainConfig.api.url}/txs`,
      Object.assign({ address }, filter)
    )
    Object.assign(response, resExtra)
    if (success) {
      for (const row of data.data) {
        const {
          tx_hash,
          nonce,
          block_number,
          from,
          to,
          amount,
          fee,
          token,
          created_at,
          ...extra
        } = row
        let txStatus = TransactionStatus.Fail
        if (extra.success) {
          txStatus = TransactionStatus.PENDING
          if (extra.status === 'pending') {
            txStatus = TransactionStatus.PENDING
          } else if (extra.status === 'verified') {
            txStatus = TransactionStatus.COMPLETE
          }
        }
        const trx = new Transaction({
          chainId: this.chainConfig.chainId,
          hash: tx_hash,
          nonce,
          blockHash: '',
          blockNumber: block_number,
          transactionIndex: 0,
          from,
          to,
          value: new BigNumber(amount),
          fee,
          feeToken: extra.fee_token === 0 ? '' : extra.fee_token,
          tokenAddress: String(token.id),
          timestamp: created_at,
          extra,
          status: txStatus,
          symbol: token.symbol,
        })
        response.txlist.push(trx)
      }
    }
    return response
  }
  async getBalance(address: string): Promise<BigNumber> {
    return this.getTokenBalance(address, '0')
  }
  async getDecimals(): Promise<number> {
    const tokenInfo = (await this.getTokenList()).get('0')
    if (!tokenInfo) {
      throw new Error(`Main Token 0 Not Exists`)
    }
    return tokenInfo && tokenInfo.decimals
  }
  async getTokenBalance(
    address: string,
    tokenAddress: string
  ): Promise<BigNumber> {
    const token = (await this.getTokenList()).get(tokenAddress)
    if (!token) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    const { success, data } = await HttpGet(
      `${this.chainConfig.api.url}/overview/account/${address}`
    )
    if (success && Array.isArray(data)) {
      const mainToken = data.find((row) => String(row.id) === String(token.id))
      return new BigNumber(mainToken && mainToken.amount)
    }
    return new BigNumber(0)
  }
  async getTokenDecimals(tokenAddress: string): Promise<number> {
    const tokenInfo = (await this.getTokenList()).get(tokenAddress);
    if (!tokenInfo) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    if (tokenInfo) {
      return Number(tokenInfo.decimals)
    }
    return 0
  }
  async getTokenSymbol(tokenAddress: string): Promise<string> {
    const tokenInfo = (await this.getTokenList()).get(tokenAddress)
    if (!tokenInfo) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    return tokenInfo && tokenInfo.symbol
  }
}
