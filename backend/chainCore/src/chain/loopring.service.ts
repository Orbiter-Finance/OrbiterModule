import BigNumber from 'bignumber.js'
import {
  HashOrBlockNumber,
  IChain,
  IChainConfig,
  QueryTransactionsResponse,
  QueryTxFilter,
  QueryTxFilterLoopring,
  Transaction,
  TransactionStatus,
} from '../types'
import { AccountInfo, ExchangeAPI, UserAPI } from '@loopring-web/loopring-sdk'
import { HttpGet } from '../utils'
/**
 * https://beta.loopring.io/#/
 * https://docs.loopring.io/en/dex_apis/
 * https://explorer.loopring.io/
 */
export class Loopring implements IChain {
  private tokens: Map<
    string,
    {
      type: string
      tokenId: number
      symbol: string
      name: string
      address: string
      decimals: number
      precision: number
      precisionForOrder: number
      orderAmounts: any
      luckyTokenAmounts: any
      fastWithdrawLimit: string
      gasAmounts: any
      enabled: boolean
    }
  > = new Map()
  constructor(public readonly chainConfig: IChainConfig) {}
  async getLatestHeight(): Promise<number> {
    return 0
  }
  public async getTokenList() {
    if (this.tokens.size <= 0) {
      const { success, data } = await HttpGet(
        `${this.chainConfig.api.url}/exchange/tokens`
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
  getTransactionByHash(hash: string): Promise<Transaction> {
    throw new Error('Method not implemented.')
  }
  private async getAccountInfo(address: string) {
    const networkId = Number(this.chainConfig.networkId)
    const exchangeAPI = new ExchangeAPI({
      chainId: networkId,
    })
    const accountInfo = await exchangeAPI.getAccount({
      owner: address,
    })
    return accountInfo
  }
  async getTransactions(
    address: string,
    filter: Partial<QueryTxFilterLoopring>
  ): Promise<QueryTransactionsResponse> {
    const response: QueryTransactionsResponse = {
      txlist: [],
    }
    try {
      const accountInfo = await this.getAccountInfo(address)
      const networkId = Number(this.chainConfig.networkId)
      const userApi = new UserAPI({
        chainId: networkId,
      })
      const params = Object.assign(
        {
          accountId: accountInfo.accInfo.accountId,
        },
        filter
      )
      console.log('查询条件：', params)
      const { userTransfers } = await userApi.getUserTransferList(
        params,
        String(this.chainConfig.api.key)
      )
      if (userTransfers && Array.isArray(userTransfers)) {
        for (const tx of userTransfers) {
          const {
            id,
            hash,
            symbol,
            amount,
            senderAddress,
            receiverAddress,
            feeAmount,
            feeTokenSymbol,
            timestamp,
            status,
            ...extra
          } = tx
          const storageInfo = tx['storageInfo']
          if (storageInfo) {
            // nonce
            const nonce = (storageInfo.storageId - 1) / 2
            const trxDTO = new Transaction({
              chainId: this.chainConfig.chainId,
              hash,
              from: senderAddress,
              to: receiverAddress,
              value: new BigNumber(amount),
              nonce,
              blockHash: '',
              blockNumber: Number(tx['blockId'] || 0),
              transactionIndex: Number(tx['indexInBlock'] || 0),
              gas: 0,
              gasPrice: 0,
              fee: Number(feeAmount || 0),
              feeToken: feeTokenSymbol,
              input: '',
              symbol,
              contractAddress: String(storageInfo.tokenId),
              status: TransactionStatus.Fail,
              timestamp: parseInt(String(timestamp / 1000)),
              extra,
            })
            if (status === 'processed') {
              trxDTO.status = TransactionStatus.COMPLETE
            } else if (status === 'received') {
              trxDTO.status = TransactionStatus.PENDING
            }
            response.txlist.push(trxDTO)
          }
        }
      }
    } catch (error) {
      console.error('Get loopring txlist faild: ', error)
    }
    return response
  }
  async getTokenTransactions(
    address: string,
    contractAddress: string | null,
    filter: Partial<QueryTxFilter>
  ): Promise<QueryTransactionsResponse> {
    const response: QueryTransactionsResponse = {
      txlist: [],
    }
    return response
  }
  getBalance(address: string): Promise<BigNumber> {
    throw new Error('Method not implemented.')
  }
  async getDecimals(): Promise<number> {
    const tokenInfo = (await this.getTokenList()).get('0')
    if (!tokenInfo) {
      throw new Error(`Main Token 0 Not Exists`)
    }
    return tokenInfo && tokenInfo.decimals
  }
  getTokenBalance(
    address: string,
    contractAddress: string
  ): Promise<BigNumber> {
    throw new Error('Method not implemented.')
  }
  async getTokenDecimals(contractAddress: string): Promise<number> {
    const tokenInfo = (await this.getTokenList()).get(contractAddress)
    if (!tokenInfo) {
      throw new Error(`${contractAddress} Token Not Exists`)
    }
    return tokenInfo && tokenInfo.decimals
  }
  async getTokenSymbol(contractAddress: string): Promise<string> {
    const tokenInfo = (await this.getTokenList()).get(contractAddress)
    if (!tokenInfo) {
      throw new Error(`${contractAddress} Token Not Exists`)
    }
    return tokenInfo && tokenInfo.symbol
  }
}
