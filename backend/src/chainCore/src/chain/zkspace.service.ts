import BigNumber from 'bignumber.js'
import {
  HashOrBlockNumber,
  IChain,
  IChainConfig,
  ITransaction,
  QueryTransactionsResponse,
  QueryTxFilterZKSpace,
  Token,
  Transaction,
  TransactionStatus,
} from '../types'
import { equals, HttpGet } from '../utils'
/**
 * https://zks.app/wallet/token
 * https://zkspace.info/
 */
export class ZKSpace implements IChain {
  private tokens: Array<Token> = []
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
    if (this.tokens.length <= 0) {
      const { success, data } = await HttpGet(
        `${this.chainConfig.api.url}/tokens`
      )
      if (success && Array.isArray(data)) {
        this.tokens = data.map((row) => {
          return {
            id: row.id,
            name: row.name,
            symbol: row.symbol,
            decimals: row.decimals,
            address: row.address,
          }
        })
      }
      return this.tokens
    }
    return this.tokens
  }
  public async getTokenInfo(idOrAddrsss: string | number) {
    if (
      idOrAddrsss === 0 ||
      idOrAddrsss === '0' ||
      idOrAddrsss === '0x0000000000000000000000000000000000000000'
    ) {
      return this.chainConfig.nativeCurrency as Token
    }
    const tokens = await this.getTokenList()
    if (typeof idOrAddrsss === 'string') {
      // check local config
      const localToken = this.chainConfig.tokens.find((t) =>
        equals(t.address, idOrAddrsss)
      )
      if (localToken) {
        return localToken
      }
      return tokens.find((token) => equals(token.address, idOrAddrsss))
    } else {
      return tokens.find((token) => equals(token.id, idOrAddrsss))
    }
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
  public async convertTxToEntity(data: any): Promise<Transaction | null> {
    if (!data) return data
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
    } = data
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
      feeToken:
        extra.fee_token === 0
          ? this.chainConfig.nativeCurrency.symbol
          : extra.fee_token,
      tokenAddress: '',
      timestamp: created_at,
      extra,
      status: txStatus,
      symbol: '',
      source: '',
    })
    const tokenInfo = await this.getTokenInfo(token.id)
    if (tokenInfo) {
      trx.tokenAddress = tokenInfo.address
      trx.symbol = tokenInfo.symbol
      trx.value = trx.value.multipliedBy(10 ** tokenInfo.decimals)
    }
    return trx
  }

  async getTransactionByHash(hash: string): Promise<ITransaction | null> {
    const { data, success, ...resExtra } = await HttpGet(
      `${this.chainConfig.api.url}/tx/${hash}`
    )
    const trx = await this.convertTxToEntity(data)
    return trx
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
        const trx = await this.convertTxToEntity(row)
        if (trx) {
          response.txlist.push(trx)
        }
      }
    }
    return response
  }
  async getTokenTransactions(
    address: string,
    tokenAddress: string,
    filter: Partial<QueryTxFilterZKSpace>
  ): Promise<QueryTransactionsResponse> {
    const token = await this.getTokenInfo(tokenAddress)
    if (!token || !token.id) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    const response: QueryTransactionsResponse = {
      txlist: [],
    }
    const { data, success, ...resExtra } = await HttpGet(
      `${this.chainConfig.api.url}/txs`,
      Object.assign({ address, token: token.id }, filter)
    )
    Object.assign(response, resExtra)
    if (success) {
      for (const row of data.data) {
        const trx = await this.convertTxToEntity(row)
        if (trx) {
          response.txlist.push(trx)
        }
      }
    }
    return response
  }
  async getBalance(address: string): Promise<BigNumber> {
    return this.getTokenBalance(
      address,
      this.chainConfig.nativeCurrency.address
    )
  }
  public async getDecimals(): Promise<number> {
    return this.chainConfig.nativeCurrency.decimals
  }
  async getTokenBalance(
    address: string,
    tokenAddress: string
  ): Promise<BigNumber> {
    const token = await this.getTokenInfo(tokenAddress)
    if (!token) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    const { success, data } = await HttpGet(
      `${this.chainConfig.api.url}/overview/account/${address}`
    )
    if (success && Array.isArray(data)) {
      const mainToken = data.find((row) => equals(row.id, token.id))
      return new BigNumber(mainToken && mainToken.amount)
    }
    return new BigNumber(0)
  }
  async getTokenDecimals(tokenAddress: string): Promise<number> {
    const token = await this.getTokenInfo(tokenAddress)
    if (!token) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    if (token) {
      return Number(token.decimals)
    }
    return 0
  }
  async getTokenSymbol(tokenAddress: string): Promise<string> {
    const token = await this.getTokenInfo(tokenAddress)
    if (!token) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    return token && token.symbol
  }
}
