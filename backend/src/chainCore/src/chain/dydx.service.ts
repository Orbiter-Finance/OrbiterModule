import BigNumber from 'bignumber.js'
import {
  HashOrBlockNumber,
  IChain,
  IChainConfig,
  ITransaction,
  QueryTransactionsResponse,
  QueryTxFilterDydx,
  Transaction,
  TransactionStatus,
} from '../types'
import {
  ApiKeyCredentials,
  DydxClient,
  TransferResponseObject,
} from '@dydxprotocol/v3-client'
import Web3 from 'web3'
import dayjs from 'dayjs'
import { equals, isEmpty } from '../utils'
export class Dydx implements IChain {
  private apiKeyCredentials: ApiKeyCredentials = {
    key: '',
    secret: '',
    passphrase: '',
  }

  constructor(public readonly chainConfig: IChainConfig) {
    if (!isEmpty(this.chainConfig.api.key)) {
      const keys: Array<string> = this.chainConfig.api.key?.split('.') || []
      this.apiKeyCredentials.key = keys[0]
      this.apiKeyCredentials.secret = keys[1]
      this.apiKeyCredentials.passphrase = keys[2]
    }
  }

  public getDydxClient() {
    const apiKeyCredentials = this.apiKeyCredentials
    if (
      !apiKeyCredentials.key ||
      !apiKeyCredentials.secret ||
      !apiKeyCredentials.passphrase
    ) {
      throw new Error(
        'Wallet signature not configured key | secret | passphrase'
      )
    }
    const web3 = new Web3()
    return new DydxClient(this.chainConfig.api.url, {
      web3,
      apiKeyCredentials,
      apiTimeout: 3000,
      networkId: Number(this.chainConfig.networkId),
    })
  }

  async getLatestHeight(): Promise<number> {
    return 0
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
  async getTransactionByHash(hash: string): Promise<ITransaction> {
    throw new Error('Method not implemented.')
  }
  /**
   * The api does not return the nonce value, timestamp(ms) last three number is the nonce
   *  (warnning: there is a possibility of conflict)
   * @param  timestamp ms
   * @returns
   */
  static timestampToNonce(timestamp: number | string) {
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

    return nonce + ''
  }
  async getTransactions(
    _address: string,
    filter: Partial<QueryTxFilterDydx> = {}
  ): Promise<QueryTransactionsResponse> {
    const response: QueryTransactionsResponse = {
      txlist: [],
    }
    const dydxClient = this.getDydxClient()
    const transfers = await dydxClient.private
      .getTransfers({
        limit: filter.limit || 100,
        createdBeforeOrAt: dayjs(
          filter.createdBeforeOrAt || new Date()
        ).toISOString(),
      })
      .then(
        (result: { transfers: TransferResponseObject[] }) =>
          result.transfers || []
      )

    for (const row of transfers) {
      const value = new BigNumber(
        equals(row.type, 'TRANSFER_IN') ? row.creditAmount : row.debitAmount
      )
      const symbol = equals(row.type, 'TRANSFER_IN')
        ? row.creditAsset
        : row.debitAsset
      const { id, fromAddress, toAddress, createdAt, ...extra } = row
      const nonce = Dydx.timestampToNonce(new Date(row.createdAt).getTime())
      const token = await this.chainConfig.tokens.find(t => equals(String(symbol), t.symbol));
      const tx = new Transaction({
        chainId: this.chainConfig.chainId,
        hash: id,
        nonce: Number(nonce),
        from: fromAddress || '',
        to: toAddress || '',
        blockNumber: 0,
        value,
        status: TransactionStatus.Fail,
        timestamp: dayjs(createdAt).unix(),
        fee: 0,
        feeToken: String(token?.symbol),
        tokenAddress: token?.address,
        extra,
        symbol,
      })
      if (equals(row.status, 'PENDING')) {
        tx.status = TransactionStatus.PENDING
      } else if (equals(row.status, 'CONFIRMED')) {
        tx.status = TransactionStatus.COMPLETE
      }
      response.txlist.push(tx)
    }
    return response
  }
  getTokenTransactions(
    address: string,
    tokenAddress: string,
    filter: Partial<QueryTxFilterDydx>
  ): Promise<QueryTransactionsResponse> {
    throw new Error('Method not implemented.')
  }
  getBalance(address: string): Promise<BigNumber> {
    throw new Error('Method not implemented.')
  }
  getDecimals(): Promise<number> {
    throw new Error('Method not implemented.')
  }
  getTokenBalance(address: string, tokenAddress: string): Promise<BigNumber> {
    throw new Error('Method not implemented.')
  }
  getTokenDecimals(tokenAddress: string): Promise<number> {
    throw new Error('Method not implemented.')
  }
  getTokenSymbol(tokenAddress: string): Promise<string> {
    throw new Error('Method not implemented.')
  }
}
