import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import {
  HashOrBlockNumber,
  IChain,
  IChainConfig,
  ITransaction,
  QueryTransactionsResponse,
  QueryTxFilterZKSync,
  Token,
  Transaction,
  TransactionStatus,
} from '../types'
import { equals, HttpGet } from '../utils'
/**
 * ZKSync 1.0
 * https://docs.zksync.io/apiv02-docs/
 */
export class ZKSync implements IChain {
  private tokens: Array<Token> = []
  constructor(public readonly chainConfig: IChainConfig) {}
  public async getLatestHeight(): Promise<number> {
    const { result } = await HttpGet(
      `${this.chainConfig.api.url}/blocks/lastCommitted`
    )
    return result && result['blockNumber']
  }
  public async getTokenList() {
    if (this.tokens.length <= 0) {
      const { status, result } = await HttpGet(
        `${this.chainConfig.api.url}/tokens?from=0&limit=100&direction=newer`
      )
      if (equals(status, 'success') && Array.isArray(result.list)) {
        this.tokens = result.list.map((row) => {
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
        const { from, to, amount, fee, nonce, token,type } = op
        let txStatus = TransactionStatus.Fail
        if (extra.status === 'committed') {
          txStatus = TransactionStatus.PENDING
        } else if (extra.status === 'finalized') {
          txStatus = TransactionStatus.COMPLETE
        }
        if (!equals('Transfer', type)) {
          continue
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
          feeToken: this.chainConfig.nativeCurrency.symbol,
          tokenAddress: '',
          timestamp: dayjs(tx.createdAt).unix(),
          extra,
          status: txStatus,
          symbol: '',
        })
        const tokenInfo = await this.getTokenInfo(token)
        if (tokenInfo) {
          trx.symbol = tokenInfo.symbol
          trx.tokenAddress = tokenInfo.address
        }
        response.txlist.push(trx)
      }
    }
    return response
  }
  public async getTokenTransactions(
    address: string,
    tokenAddress: string,
    filter: Partial<QueryTxFilterZKSync> = {}
  ): Promise<QueryTransactionsResponse> {
    return (await this.getTransactions(address, filter)).filter((tx) =>
      equals(tx.tokenAddress, tokenAddress)
    )
  }
  public async getBalance(address: string): Promise<BigNumber> {
    return this.getTokenBalance(
      address,
      this.chainConfig.nativeCurrency.address
    )
  }
  public async getDecimals(): Promise<number> {
    return this.chainConfig.nativeCurrency.decimals
  }
  public async getTokenBalance(
    address: string,
    tokenAddress: string
  ): Promise<BigNumber> {
    const token = await this.getTokenInfo(tokenAddress)
    if (!token) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    const { result } = await HttpGet(
      `${this.chainConfig.api.url}/accounts/${address}/committed`
    )
    if (result && result.balances && result.balances[token.symbol]) {
      return new BigNumber(result.balances[token.symbol])
    }
    return new BigNumber(0)
  }
  public async getTokenDecimals(tokenAddress: string): Promise<number> {
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
