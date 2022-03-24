import axios from 'axios'
import { nanoid } from 'nanoid'
import * as starknet from 'starknet'
import { getSelectorFromName } from 'starknet/dist/utils/stark'
import { equalsIgnoreCase, sleep } from '..'
import { accessLogger, errorLogger } from '../logger'
import { startMakerEvent } from "../../schedule/index"

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
  private apiParamsTo: string
  private selectorDec = ''
  private isFirstTicker = true
  private transferReceivedHashs: { [key: string]: boolean }
  private transferConfirmationedHashs: { [key: string]: boolean }
  private listens: {
    filter: Filter | undefined
    callbacks?: TransferCallbacks
  }[]

  constructor(api: Api, apiParamsTo = '') {
    this.api = api
    this.apiParamsTo = apiParamsTo
    this.selectorDec = starknet.number.hexToDecimalString(
      getSelectorFromName('transfer')
    )
    this.transferReceivedHashs = {}
    this.transferConfirmationedHashs = {}
    this.listens = []

    this.start()
  }

  start() {
    const ticker = async (p = 1) => {
      const resp = await axios.get(
        `${this.api.endPoint}/api/txns?to=${this.apiParamsTo}&ps=10&p=${p}`
      )
      const { data } = resp

      if (!data?.items) {
        return
      }

      let isGetNextPage = true

      for (const item of data.items) {
        const { hash, type } = item

        if (!equalsIgnoreCase(type, 'invoke')) {
          continue
        }
        if (this.transferReceivedHashs[hash] !== undefined) {
          isGetNextPage = false
          continue
        }

        // Set transferReceivedHashs[hash] = false
        this.transferReceivedHashs[hash] = false

        // Ignore first ticker
        if (this.isFirstTicker) {
          isGetNextPage = false
          continue
        }

        this.getTransaction(hash).catch((err) => {
          errorLogger.error(
            `Starknet getTransaction faild [${hash}]: ${err.message}`
          )
        })
      }

      if (isGetNextPage) {
        await ticker((p += 1))
      }

      this.isFirstTicker = false
    }
    ticker()
    const uuid = nanoid()
    startMakerEvent[uuid] = {
      type: "interval"
    }
    startMakerEvent[uuid].watcher = setInterval(ticker, STARKNET_LISTEN_TRANSFER_DURATION)
  }

  async getTransaction(hash: string, retryCount = 0) {
    if (!hash) {
      return
    }

    let header: any, calldata: any
    try {
      const resp = await axios.get(`${this.api.endPoint}/api/txn/${hash}`)
      header = resp.data?.header
      calldata = resp.data?.calldata
    } catch (err) {
      errorLogger.error(
        `Get starknet transaction [${hash}] failed: ${err.message}, retryCount: ${retryCount}`
      )

      // Out max retry count
      if (retryCount >= 10) {
        return
      }

      await sleep(10000)
      return this.getTransaction(hash, (retryCount += 1))
    }

    // Check data
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

    const isConfirmed =
      equalsIgnoreCase(transaction.txreceipt_status, 'Accepted on L2') ||
      equalsIgnoreCase(transaction.txreceipt_status, 'Accepted on L1')
    const isRejected = equalsIgnoreCase(
      transaction.txreceipt_status,
      'Rejected'
    )

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

      if (
        this.transferConfirmationedHashs[transaction.hash] === undefined &&
        isConfirmed
      ) {
        accessLogger.info(`Transaction [${transaction.hash}] was confirmed.`)
        callbacks &&
          callbacks.onConfirmation &&
          callbacks.onConfirmation(transaction)
      }
    }

    this.transferReceivedHashs[hash] = true

    if (isConfirmed) {
      this.transferConfirmationedHashs[transaction.hash] = true
    } else if (!isRejected) {
      await sleep(2000)
      this.getTransaction(hash)
    }
  }

  transfer(filter: Filter | undefined, callbacks?: TransferCallbacks) {
    this.listens.push({ filter, callbacks })
  }
}

const factorys: { [key: string]: StarknetListen } = {}
export function factoryStarknetListen(api: Api, apiParamsTo = '') {
  const factoryKey = `${api.endPoint}:${api.key}:${apiParamsTo}`

  if (factorys[factoryKey]) {
    return factorys[factoryKey]
  } else {
    return (factorys[factoryKey] = new StarknetListen(api, apiParamsTo))
  }
}
