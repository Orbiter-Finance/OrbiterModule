import axios from 'axios'
import * as starknet from 'starknet'
import { getSelectorFromName } from 'starknet/dist/utils/stark'
import { equalsIgnoreCase, sleep } from '..'
import { accessLogger, errorLogger } from '../logger'

type Api = { endPoint: string; key: string }
type Transaction = {
  blockNumber?: number
  timeStamp: number
  hash: string
  nonce: string
  blockHash: string
  transactionIndex: number
  from: string
  to: string
  value: string
  gas?: number
  gasPrice?: number
  isError?: number
  txreceipt_status: string
  input?: string
  contractAddress: string
  cumulativeGasUsed?: number
  gasUsed?: number
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

const STARKNET_LISTEN_TRANSFER_DURATION = 5 * 1000

class StarknetListen {
  private api: Api
  private selectorDec = ''
  private isFirstTicker = true
  private transferReceivedHashs: { [key: string]: boolean }
  private transferConfirmationedHashs: { [key: string]: boolean }
  private listens: {
    filter: Filter | undefined
    callbacks?: TransferCallbacks
  }[]

  constructor(api: Api) {
    this.api = api
    this.selectorDec = starknet.number.hexToDecimalString(
      getSelectorFromName('transfer')
    )
    this.transferReceivedHashs = {}
    this.transferConfirmationedHashs = {}
    this.listens = []

    this.start()
  }

  start() {
    const ticker = async () => {
      const resp = await axios.get(`${this.api.endPoint}/api/txns?ps=20&p=1`)
      const { data } = resp

      if (!data?.items) {
        return
      }

      for (const item of data.items) {
        const { hash, type } = item

        if (!equalsIgnoreCase(type, 'invoke')) {
          continue
        }
        if (this.transferReceivedHashs[hash] !== undefined) {
          continue
        }

        // Set transferReceivedHashs[hash] = false
        this.transferReceivedHashs[hash] = false

        // Ignore first ticker
        if (this.isFirstTicker) {
          continue
        }

        this.getTransaction(hash).catch((err) => {
          errorLogger.error(
            `Starknet getTransaction faild [${hash}]: ${err.message}`
          )
        })
      }

      this.isFirstTicker = false
    }
    ticker()

    setInterval(ticker, STARKNET_LISTEN_TRANSFER_DURATION)
  }

  async getTransaction(hash: string) {
    if (!hash) {
      return
    }

    const resp = await axios.get(`${this.api.endPoint}/api/txn/${hash}`)
    const { header, calldata } = resp.data || {}
    if (!header || !calldata || calldata.length < 7) {
      return
    }

    // Check selector
    if (calldata[1] != this.selectorDec) {
      return
    }

    // Clear front zero
    const from = starknet.number.toHex(
      starknet.number.toBN(starknet.number.hexToDecimalString(header.to))
    )
    const to = starknet.number.toHex(starknet.number.toBN(calldata[3]))
    const contractAddress = starknet.number.toHex(
      starknet.number.toBN(calldata[0])
    )

    const transaction: Transaction = {
      timeStamp: header.timestamp,
      hash: header.hash,
      nonce: calldata[6],
      blockHash: header.blockId,
      transactionIndex: header.index,
      from,
      to,
      value: calldata[4],
      txreceipt_status: header.status,
      contractAddress,
      confirmations: 0,
    }

    for (const item of this.listens) {
      const { filter, callbacks } = item

      if (filter) {
        if (filter.from && filter.from.toUpperCase() != from.toUpperCase()) {
          continue
        }
        if (filter.to && filter.to.toUpperCase() != to.toUpperCase()) {
          continue
        }
      }

      if (this.transferReceivedHashs[hash] !== true) {
        callbacks && callbacks.onReceived && callbacks.onReceived(transaction)
      }

      if (this.transferConfirmationedHashs[transaction.hash] === undefined) {
        if (
          equalsIgnoreCase(transaction.txreceipt_status, 'Accepted on L2') ||
          equalsIgnoreCase(transaction.txreceipt_status, 'Accepted on L1')
        ) {
          this.transferConfirmationedHashs[transaction.hash] = true
          accessLogger.info(`Transaction [${transaction.hash}] was confirmed.`)
          callbacks &&
            callbacks.onConfirmation &&
            callbacks.onConfirmation(transaction)
        } else {
          await sleep(2000)
          this.getTransaction(hash)
        }
      }
    }

    this.transferReceivedHashs[hash] = true
  }

  transfer(filter: Filter | undefined, callbacks?: TransferCallbacks) {
    this.listens.push({ filter, callbacks })
  }
}

const factorys: { [key: string]: StarknetListen } = {}
export function factoryStarknetListen(api: Api) {
  const factoryKey = `${api.endPoint}:${api.key}`

  if (factorys[factoryKey]) {
    return factorys[factoryKey]
  } else {
    return (factorys[factoryKey] = new StarknetListen(api))
  }
}
