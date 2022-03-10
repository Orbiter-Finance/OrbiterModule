import { equalsIgnoreCase, sleep } from '../../util'
import { accessLogger, errorLogger } from '../../util/logger'
import { IMXHelper, Transaction } from './imx_helper'

type Filter = {
  from?: string
  to?: string
}
type TransferCallbacks = {
  onConfirmation?: (transaction: Transaction) => any
  onReceived?: (transaction: Transaction) => any
}

const IMX_LISTEN_TRANSFER_DURATION = 5 * 1000

class IMXListen {
  private chainId = 0
  private receiver: string | undefined = undefined
  private isFirstTicker = true
  private transferReceivedHashs: { [key: string]: boolean } = {}
  private transferConfirmationedHashs: { [key: string]: boolean } = {}
  private listens: {
    filter: Filter | undefined
    callbacks?: TransferCallbacks
  }[] = []

  constructor(
    chainId: number,
    receiver: string | undefined = undefined,
    isFirstTicker = true
  ) {
    this.chainId = chainId
    this.receiver = receiver
    this.isFirstTicker = isFirstTicker

    this.start()
  }

  private start() {
    const ticker = async () => {
      const imxHelper = new IMXHelper(this.chainId)

      const imxClient = await imxHelper.getImmutableXClient()

      const transfers = await imxClient.getTransfers({
        page_size: 200,
        direction: <any>'desc',
        receiver: this.receiver,
      })

      if (!transfers.result) {
        return
      }

      for (const item of transfers.result) {
        const hash = item.transaction_id

        if (this.transferReceivedHashs[hash] !== undefined) {
          continue
        }

        // Set transferReceivedHashs[hash] = false
        this.transferReceivedHashs[hash] = false

        // Ignore first ticker
        if (this.isFirstTicker) {
          continue
        }
        item.transaction_id

        this.doTransfer(item)
      }

      this.isFirstTicker = false
    }
    ticker()

    setInterval(ticker, IMX_LISTEN_TRANSFER_DURATION)
  }

  /**
   * @param transfer
   * @param retryCount
   * @returns
   */
  private async doTransfer(transfer: any, retryCount = 0) {
    const { transaction_id } = transfer
    if (!transaction_id) {
      return
    }
    const imxHelper = new IMXHelper(this.chainId)

    // When retryCount > 0, get new data
    if (retryCount > 0) {
      try {
        const imxClient = await imxHelper.getImmutableXClient()
        transfer = await imxClient.getTransfer({ id: transfer.transaction_id })
      } catch (err) {
        errorLogger.error(
          `Get imx transaction [${transaction_id}] failed: ${err.message}, retryCount: ${retryCount}`
        )

        // Out max retry count
        if (retryCount >= 10) {
          return
        }

        await sleep(10000)
        return this.doTransfer(transfer, (retryCount += 1))
      }

      if (!transfer) {
        return
      }
    }

    const transaction = imxHelper.toTransaction(transfer)
    const { hash, from, to, txreceipt_status } = transaction

    const isConfirmed =
      equalsIgnoreCase(txreceipt_status, 'confirmed') ||
      equalsIgnoreCase(txreceipt_status, 'success')
    const isRejected = equalsIgnoreCase(txreceipt_status, 'rejected')

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
      this.doTransfer(transfer)
    }
  }

  transfer(filter: Filter, callbacks = undefined) {
    this.listens.push({ filter, callbacks })
  }

  clearListens() {
    this.listens = []
  }
}

const factorys = {}
/**
 *
 * @param chainId
 * @param receiver
 * @returns
 */
export function factoryIMXListen(
  chainId: number,
  receiver: string | undefined = undefined,
  isFirstTicker = true
) {
  const factoryKey = `${chainId}:${receiver}:${isFirstTicker}`

  if (factorys[factoryKey]) {
    return factorys[factoryKey]
  } else {
    return (factorys[factoryKey] = new IMXListen(
      chainId,
      receiver,
      isFirstTicker
    ))
  }
}
