import BigNumber from 'bignumber.js'
import {
  HashOrBlockNumber,
  IChain,
  IChainConfig,
  QueryTxFilterIMX,
  QueryTransactionsResponse,
  Transaction,
  TransactionStatus,
} from '../types'
import { ImmutableXClient } from '@imtbl/imx-sdk'
import dayjs from 'dayjs'
import { orderBy } from '../utils'
/**
 * https://immutascan.io/
 * https://docs.x.immutable.com/docs/welcome
 */
export class ImmutableX implements IChain {
  private tokens: Map<
    string,
    {
      token_address: string
      image_url: string | null
      name: string | null
      decimals: string
      quantum: string
      symbol: string
    }
  > = new Map()
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
    // get all token list
    const { result: tokenList } = await this.client.listTokens({})
    if (tokenList) {
      tokenList.forEach((row) => {
        this.tokens.set(row.token_address, row)
      })
    }
    return this.client
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
  getTransactionByHash(hash: string): Promise<Transaction> {
    throw new Error('Method not implemented.')
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
      response.txlist = result.map((tx) => {
        const { transaction_id, user, receiver, timestamp, token, ...extra } =
          tx
        const tokenInfo = this.tokens.get(token.data['token_address'])
        const nonce = this.timestampToNonce(timestamp.getTime())
        return new Transaction({
          chainId: this.chainConfig.chainId,
          hash: String(transaction_id),
          from: user,
          to: receiver,
          nonce,
          blockNumber: transaction_id,
          value: new BigNumber(token.data.quantity.toString()),
          symbol: tokenInfo ? tokenInfo.symbol : '',
          status: TransactionStatus.Fail,
          timestamp: dayjs(timestamp).unix(),
          fee: 0,
          feeToken: '',
          tokenAddress: String(token.data['token_address']),
          extra,
        })
      })

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
    const tokenInfo = this.tokens.get(tokenAddress)
    if (!tokenInfo) {
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
    const tokenInfo = this.tokens.get(tokenAddress)
    if (!tokenInfo) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    if (tokenInfo) {
      return Number(tokenInfo.decimals)
    }
    return 0
  }
  async getTokenSymbol(tokenAddress: string): Promise<string> {
    const tokenInfo = this.tokens.get(tokenAddress)
    if (!tokenInfo) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    return tokenInfo && tokenInfo.symbol
  }
}
