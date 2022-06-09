import BigNumber from 'bignumber.js'
import { Transaction, TransactionStatus } from '../types'
import { isEmpty } from '../utils'
import { EvmExplorerService } from './evm-explorer.service'

export class Optimism extends EvmExplorerService {
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
      input,
      ...extra
    } = trx
    const trxRcceipt = await this.web3.eth.getTransactionReceipt(hash)
    if (!trxRcceipt) {
      return null
    }
    const gas = trxRcceipt.gasUsed
    // status
    const block = await this.web3.eth.getBlock(Number(blockNumber), false)
    const confirmations = await this.getConfirmations(blockNumber)
    const newTx = new Transaction({
      chainId: this.chainConfig.chainId,
      hash,
      from,
      to: '',
      value: new BigNumber(value),
      nonce,
      blockHash: String(blockHash),
      blockNumber: Number(blockNumber),
      transactionIndex: Number(transactionIndex),
      gas: Number(gas),
      gasPrice: Number(gasPrice),
      fee: (Number(gas) * Number(gasPrice) + (Number(trxRcceipt['l1GasUsed']) * Number(trxRcceipt['l1GasPrice']) * Number(trxRcceipt['l1FeeScalar']))),
      feeToken: this.chainConfig.nativeCurrency.symbol,
      input,
      symbol: '',
      tokenAddress: '',
      status: TransactionStatus.Fail,
      timestamp: Number(block.timestamp),
      confirmations,
      extra,
      source: 'rpc',
    })
    if (trxRcceipt.status) {
      newTx.status = TransactionStatus.COMPLETE
    }
    // valid main token or contract token
    if (!isEmpty(to)) {
      const code = await this.web3.eth.getCode(to)
      if (code === '0x') {
        newTx.to = to
        newTx.tokenAddress = this.chainConfig.nativeCurrency.address
        newTx.symbol = this.chainConfig.nativeCurrency.symbol
      } else {
        // contract token
        newTx.tokenAddress = to
        newTx.to = ''
        const contractData = await this.decodeInputContractTransfer(input, to)
        if (contractData.name === 'transferERC20') {
          newTx.tokenAddress = contractData.data['token']
          newTx.to = contractData.data['to']
          newTx.value = new BigNumber(contractData.data['amount'])
        } else if (contractData.name === 'transfer') {
          newTx.tokenAddress = to
          newTx.to = contractData.data['recipient']
          newTx.value = new BigNumber(contractData.data['amount'])
        }
        newTx.symbol = await this.getTokenSymbol(String(newTx.tokenAddress))
      }
    }
    return newTx
  }
}
