import BigNumber from 'bignumber.js'
import {
  HashOrBlockNumber,
  IChain,
  IChainConfig,
  QueryTransactionsResponse,
  QueryTxFilter,
  QueryTxFilterLoopring,
  Token,
  Transaction,
  TransactionStatus,
} from '../types'
import { ExchangeAPI, UserAPI } from '@loopring-web/loopring-sdk'
import { HttpGet } from '../utils'
import logger from '../utils/logger'
/**
 * https://beta.loopring.io/#/
 * https://docs.loopring.io/en/dex_apis/
 * https://explorer.loopring.io/
 */
export class Loopring implements IChain {
  private tokens: Array<Token> = []
  constructor(public readonly chainConfig: IChainConfig) {}
  async getLatestHeight(): Promise<number> {
    return 0
  }
  public async getTokenList() {
    if (this.tokens.length <= 0) {
      const { success, data } = await HttpGet(
        `${this.chainConfig.api.url}/exchange/tokens`
      )
      if (success && Array.isArray(data)) {
        this.tokens = data.map((row) => {
          return {
            id: row.tokenId,
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
      const localToken = this.chainConfig.tokens.find(
        (t) => t.address.toLowerCase() === idOrAddrsss.toLowerCase()
      )
      if (localToken) {
        return localToken
      }
      return tokens.find((token) => token.address === idOrAddrsss)
    } else {
      return tokens.find((token) => token.id === idOrAddrsss)
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
      const resData = await userApi.getUserTransferList(
        params,
        String(this.chainConfig.api.key)
      )
      if (resData['code']) {
        logger.error('Loopring getUserTransferList Fail:',JSON.stringify(resData))
        return response
      }
      const userTransfers:any =resData.userTransfers;
      if (userTransfers && Array.isArray(userTransfers) && userTransfers.length>0) {
        for (const tx of userTransfers) {
          const {
            id,
            hash,
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
              symbol: '',
              tokenAddress: '',
              status: TransactionStatus.Fail,
              timestamp: parseInt(String(timestamp / 1000)),
              extra,
            })
            const token = await this.getTokenInfo(storageInfo.tokenId)
            if (token) {
              trxDTO.symbol = token.symbol
              trxDTO.tokenAddress = token.address
            }
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
      console.error('Get loopring txlist faild: ', error.message)
    }
    return response
  }
  async getTokenTransactions(
    address: string,
    tokenAddress: string | null,
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
  public async getDecimals(): Promise<number> {
    return this.chainConfig.nativeCurrency.decimals
  }
  getTokenBalance(address: string, tokenAddress: string): Promise<BigNumber> {
    throw new Error('Method not implemented.')
  }
  async getTokenDecimals(tokenAddress: string): Promise<number> {
    const token = await this.getTokenInfo(tokenAddress)
    if (!token) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    return token && token.decimals
  }
  async getTokenSymbol(tokenAddress: string): Promise<string> {
    const token = await this.getTokenInfo(tokenAddress)
    if (!token) {
      throw new Error(`${tokenAddress} Token Not Exists`)
    }
    return token && token.symbol
  }
}
