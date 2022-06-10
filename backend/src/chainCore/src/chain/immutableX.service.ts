import BigNumber from 'bignumber.js'
import {
  HashOrBlockNumber,
  IChain,
  IChainConfig,
  QueryTxFilterIMX,
  QueryTransactionsResponse,
  Transaction,
  TransactionStatus,
  Token,
} from '../types'
import { ImmutableXClient } from '@imtbl/imx-sdk'
import dayjs from 'dayjs'
import { equals, isEmpty, orderBy } from '../utils'
/**
 * https://immutascan.io/
 * https://docs.x.immutable.com/docs/welcome
 */
export class ImmutableX implements IChain {
  private tokens: Array<Token> = []
  private client: ImmutableXClient
  constructor(public readonly chainConfig: IChainConfig) {}
  async getLatestHeight(): Promise<number> {
    return 0
  }
  async createClient() {
    if (this.client) {
      return this.client
    }
    this.client = await ImmutableXClient.build({
      publicApiUrl: this.chainConfig.api.url,
    })
    return this.client
  }
  public async getTokenList() {
    if (this.tokens.length <= 0) {
      // get all token list
      const { result: tokenList } = await this.client.listTokens({})
      if (tokenList) {
        this.tokens = tokenList.map((row) => {
          return {
            name: String(row.name),
            symbol: String(row.symbol),
            decimals: Number(row.decimals),
            address:
              row.token_address || '0x0000000000000000000000000000000000000000',
          } as Token
        })
      }
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
  async getTransactionByHash(hash: string): Promise<Transaction | null> {
    const client = await this.createClient()
    const rawTx = await client.getTransfer({
      id: Number(hash),
    })
    if (rawTx) {
      return await this.convertTxToEntity(rawTx)
    }
    return null
  }
  private timestampToNonce(timestamp: number | string) {
    let nonce = 0

    if (timestamp) {
      timestamp = String(timestamp)
      const match = timestamp.match(/(\d{3})$/i)
      if (match && match.length > 1) {
        nonce = Number(match[1]) || 0
      }

      if (nonce > 900) {
        nonce = nonce - 100
      }
    }
    return nonce
  }
  public async convertTxToEntity(data: any): Promise<Transaction | null> {
    if (!data) return data
    const { transaction_id, user, receiver, timestamp, token, ...extra } = data
    const nonce = this.timestampToNonce(timestamp.getTime())
    let tokenAddress = String(token.data['token_address'])
    if (isEmpty(tokenAddress)) {
      tokenAddress = this.chainConfig.nativeCurrency.address
    }
    let status = TransactionStatus.Fail
    if (['success', 'confirmed', 'accepted'].includes(data.status)) {
      status = TransactionStatus.COMPLETE
    }

    return new Transaction({
      chainId: this.chainConfig.chainId,
      hash: String(transaction_id),
      from: user,
      to: receiver,
      nonce,
      blockNumber: transaction_id,
      value: new BigNumber(token.data.quantity.toString()),
      symbol: token.type,
      status,
      timestamp: dayjs(timestamp).unix(),
      fee: 0,
      feeToken: this.chainConfig.nativeCurrency.symbol,
      tokenAddress,
      extra,
    })
  }
  async getTransactions(
    address: string,
    filter: Partial<QueryTxFilterIMX> = {}
  ): Promise<QueryTransactionsResponse> {
    const client = await this.createClient()
    const response: QueryTransactionsResponse = {
      txlist: [],
    }
    const requestTx = async (filterParams) => {
      const response: QueryTransactionsResponse = {
        txlist: [],
      }
      const { result, ...resExtra } = await client.getTransfers(filterParams)
      Object.assign(response, resExtra)
      for (const txRaw of result) {
        const tx = await this.convertTxToEntity(txRaw)
        if (tx) {
          response.txlist.push(tx)
        }
      }
      return response
    }
    const sendRes = await requestTx(
      Object.assign(
        {
          user: address,
        },
        filter
      )
    )
    const receiveRes = await requestTx(
      Object.assign(
        {
          receiver: address,
        },
        filter
      )
    )
    response.txlist.push(...sendRes.txlist)
    response.txlist.push(...receiveRes.txlist)
    response.txlist = orderBy(
      response.txlist,
      ['timestamp', 'blockNumber'],
      ['desc', 'desc']
    )
    return response
  }
  getTokenTransactions(
    address: string,
    tokenAddress: string,
    filter: Partial<QueryTxFilterIMX>
  ): Promise<QueryTransactionsResponse> {
    throw new Error('Method not implemented.')
  }
  async getBalance(address: string): Promise<BigNumber> {
    const client = await this.createClient()
    const { result } = await client.listBalances({
      user: address,
    })
    if (result) {
      const row = result.find(
        (row) => row.symbol === this.chainConfig.nativeCurrency.symbol
      )
      if (row) {
        return new BigNumber(row.balance?.toString() || 0)
      }
    }
    return new BigNumber(0)
  }
  async getDecimals(): Promise<number> {
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
    const client = await this.createClient()
    const { balance } = await client.getBalance({
      user: address,
      tokenAddress: tokenAddress,
    })
    return new BigNumber(balance?.toString() || 0)
  }
  async getTokenDecimals(tokenAddress: string): Promise<number> {
    const token = await this.getTokenInfo(tokenAddress)
    if (!token) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    return Number(token.decimals)
  }
  async getTokenSymbol(tokenAddress: string): Promise<string> {
    const token = await this.getTokenInfo(tokenAddress)
    if (!token) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    return token && token.symbol
  }
}
