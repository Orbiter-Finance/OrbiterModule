import axios from 'axios'
import { errorLogger } from '../logger'

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

const ETHLISTEN_TRANSFER_DURATION = 5 * 1000

export class EthListen {
  private api: Api
  private address: string
  private blockProvider?: () => Promise<string>
  private receivedHashs: { [key: string]: boolean }
  private transferBreaker?: () => boolean
  private transferConfirmationAlways: boolean

  constructor(
    api: Api,
    address: string,
    blockProvider?: () => Promise<string>,
    transferConfirmationAlways = false
  ) {
    this.api = api
    this.address = address
    this.blockProvider = blockProvider
    this.transferConfirmationAlways = transferConfirmationAlways

    this.receivedHashs = {}
  }

  setTransferBreaker(transferBreaker?: () => boolean): EthListen {
    this.transferBreaker = transferBreaker
    return this
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

    const timer = setInterval(() => {
      if (this.transferBreaker && this.transferBreaker() === false) {
        clearInterval(timer)
        return
      }

      ticker()
    }, ETHLISTEN_TRANSFER_DURATION)
    const ticker = async () => {
      try {
        let startblock = ''
        if (this.blockProvider) {
          startblock = await this.blockProvider()
        }

        const resp = await axios.get(this.api.endPoint, {
          params: {
            apiKey: this.api.key,
            module: 'account',
            action: 'txlist',
            address: this.address,
            page: 1,
            offset: 100,
            startblock,
            endblock: 'latest',
            sort: 'asc',
          },
          timeout: 16000,
        })
        const { data } = resp

        if (data.status != '1' || !data.result || data.result.length <= 0) {
          return
        }

        for (const item of data.result) {
          if (!checkFilter(item.from, item.to)) {
            continue
          }

          if (this.receivedHashs[item.hash] === undefined) {
            callbacks &&
              callbacks.onReceived &&
              callbacks.onReceived(<Transaction>item)
          }

          if (confirmationsTotal > 0) {
            if (item.confirmations < confirmationsTotal) {
              this.receivedHashs[item.hash] = true
              return
            }

            if (
              (this.transferConfirmationAlways ||
                this.receivedHashs[item.hash]) &&
              item.confirmations >= confirmationsTotal
            ) {
              callbacks &&
                callbacks.onConfirmation &&
                callbacks.onConfirmation(<Transaction>item)

              this.receivedHashs[item.hash] = false
            }
          }
        }
      } catch (error) {
        errorLogger.error(error)
      }
    }
    ticker()
  }
}
