import axios from 'axios'
import { accessLogger, errorLogger } from '../../util/logger';
import BobaService from './boba_service';

type Api = { endPoint: string; key: string }
type Transaction = {
  blockNumber: number
  timeStamp: number
  hash: string
  nonce: string
  blockHash: string
  transactionIndex: number
  from: string
  to: string
  value: string
  gas: number
  gasPrice: number
  isError: number
  txreceipt_status: number
  input: string
  contractAddress: string
  cumulativeGasUsed: number
  gasUsed: number
  confirmations: number
}
type Filter = {
  from?: string
  to?: string
}
type TransferCallbacks = {
  onConfirmation?: (transaction: Transaction) => any
  onReceived?: (transaction: Transaction) => any
}
type Action = 'txlist' | 'tokentx'

const ETHLISTEN_TRANSFER_DURATION = 5 * 1000

export class BobaListen {
  private api: Api
  private address: string
  private action: Action
  private rpcHost: string;
  private blockProvider?: (isFirst: boolean) => Promise<string>
  private transferReceivedHashs: { [key: string]: boolean }
  private transferConfirmationedHashs: { [key: string]: boolean }
  private transferBreaker?: () => boolean

  constructor(
    api: Api,
    address: string,
    action: Action = 'txlist',
    rpcHost: string,
    blockProvider?: (isFirst: boolean) => Promise<string>,
  ) {
    this.api = api
    this.address = address
    this.blockProvider = blockProvider
    this.action = action

    this.transferReceivedHashs = {}
    this.transferConfirmationedHashs = {}
    this.rpcHost = rpcHost;
  }

  transfer(
    filter: Filter | undefined,
    callbacks?: TransferCallbacks,
    confirmationsTotal = 3
  ) {
    const checkFilter = (from: string, to: string): boolean => {
      if (!filter) {
        return true
      }

      if (filter.from && filter.from.toUpperCase() != from.toUpperCase()) {
        return false
      }

      if (filter.to && filter.to.toUpperCase() != to.toUpperCase()) {
        return false
      }
      return true
    }

    let isFirstTicker = true
    const service = new BobaService(this.rpcHost, this.api.endPoint);
    const timer = setInterval(() => ticker(), ETHLISTEN_TRANSFER_DURATION)
    const ticker = async () => {
      try {
        if (this.transferBreaker && this.transferBreaker() === false) {
          clearInterval(timer)
          return
        }

        let startblock = ''
        if (this.blockProvider) {
          startblock = await this.blockProvider(isFirstTicker)
          isFirstTicker = false
        }
        const result:any = await service.getTransactionByAddress(this.address, startblock)
        for (const item of result) {
          if (!checkFilter(item.from, item.to)) {
            continue
          }

          if (this.transferReceivedHashs[item.hash] === undefined) {
            this.transferReceivedHashs[item.hash] = true
            callbacks &&
              callbacks.onReceived &&
              callbacks.onReceived(<Transaction>item)
          }

          if (confirmationsTotal > 0) {
            if (
              this.transferConfirmationedHashs[item.hash] === undefined &&
              Number(item.confirmations) >= confirmationsTotal
            ) {
              this.transferConfirmationedHashs[item.hash] = true
              accessLogger.info(`[Boba listen] Transaction [${item.hash}] was confirmed. confirmations: ${item.confirmations}`)
              callbacks &&
                callbacks.onConfirmation &&
                callbacks.onConfirmation(<Transaction>item)
            }
          }
        }
      } catch (error) {
        console.log(error);
        errorLogger.error(
          `[Boba listen] get transfer error: ${error.message}, api.endPoint: ${this.api.endPoint}, address: ${this.address}`
        )
      }
    }
    ticker()
  }
}
