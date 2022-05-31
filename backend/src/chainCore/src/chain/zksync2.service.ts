import BigNumber from 'bignumber.js'
import { Transaction, TransactionStatus } from '../types'
import { decodeLogs, isEmpty } from '../utils'
import { EvmExplorerService } from './evm-explorer.service'
export class ZKSync2 extends EvmExplorerService {
  public async convertTxToEntity(trx: any): Promise<Transaction | null> {
    const {
      hash,
      nonce,
      blockHash,
      blockNumber,
      transactionIndex,
      from,
      to,
      value,
      gasPrice,
      gas,
      input,
      ...extra
    } = trx
    const trxRcceipt = await this.web3.eth.getTransactionReceipt(hash)
    if (!trxRcceipt) {
      return null
    }
    // status
    const block = await this.web3.eth.getBlock(Number(blockNumber), false)
    const confirmations = await this.getConfirmations(blockNumber)
    const newTx = new Transaction({
      chainId: this.chainConfig.chainId,
      hash,
      from,
      to: String(to),
      value: new BigNumber(value),
      nonce,
      blockHash: String(blockHash),
      blockNumber: Number(blockNumber),
      transactionIndex: Number(transactionIndex),
      gas: Number(gas),
      gasPrice: Number(gasPrice),
      fee: Number(gas) * Number(gasPrice),
      feeToken: this.chainConfig.nativeCurrency.symbol,
      input,
      symbol: '',
      status: TransactionStatus.Fail,
      timestamp: Number(block.timestamp),
      confirmations,
      extra,
      source: 'rpc'
    })
    if (trxRcceipt.status) {
      newTx.status = TransactionStatus.COMPLETE
    }
    // valid main token or contract token
    if (!isEmpty(to)) {
      const code = await this.web3.eth.getCode(to)
      if (code === '0x') {
        newTx.symbol = this.chainConfig.nativeCurrency.symbol
      } else {
        // contract token
        newTx.tokenAddress = to
        newTx.symbol = await this.getTokenSymbol(to)
        newTx.to = ''
        const eventLogs = decodeLogs(trxRcceipt.logs)
        if (eventLogs && eventLogs.length >= 2) {
          const txLog = eventLogs[1]
          if (txLog.name === 'Transfer') {
            // to
            txLog.events.forEach((e) => {
              if (e.type === 'address' && e.name === 'to') {
                newTx.to = e.value
              }
              if (e.type === 'uint256' && e.name === 'value') {
                newTx.value = new BigNumber(e.value)
              }
            })
          }
          const feeLog = eventLogs[0]
          if (feeLog.name === 'Transfer') {
            // to
            newTx.feeToken = await this.getTokenSymbol(feeLog.address)
            feeLog.events.forEach((e) => {
              if (e.type === 'uint256' && e.name === 'value') {
                newTx.fee = e.value
              }
            })
          }
        }
      }
    }
    return newTx
  }
}
