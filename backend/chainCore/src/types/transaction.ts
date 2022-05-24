import BigNumber from 'bignumber.js'
export enum TransactionStatus {
  PENDING,
  COMPLETE,
  Fail,
}
// export interface ITransaction {
//   hash: string
//   nonce: number
//   blockHash: string
//   blockNumber: number
//   transactionIndex: number
//   from: string
//   to: string
//   value: BigNumber
//   gasPrice: number
//   gas: number
//   input: string
//   status: TransactionStatus
//   contractAddress: string
//   timestamp:number
//   extra: any
//   fee: number
//   feeToken: string
//   chainId: string
//   source: string
//   confirmations: number
// }

export class Transaction {
  public hash: string
  public nonce: number
  public blockHash?: string
  public blockNumber: number
  public transactionIndex?: number
  public from: string
  public to: string
  public value: BigNumber
  public symbol: string
  public gasPrice?: number
  public gas?: number
  public input?: string
  public status: TransactionStatus
  public contractAddress?: string
  public timestamp: number
  public fee: number
  public feeToken: string
  public chainId: string
  public source?: string
  public confirmations?: number
  public extra?: any
  constructor(opts: Transaction) {
    this.chainId = String(opts.chainId || '')
    this.hash = String(opts.hash || '')
    this.nonce = Number(opts.nonce || 0)
    this.blockHash = String(opts.blockHash || '')
    this.blockNumber = Number(opts.blockNumber || 0)
    this.transactionIndex = Number(opts.transactionIndex || 0)
    this.from = opts.from || ''
    this.to = opts.to || ''
    this.value = opts.value || new BigNumber(0)
    this.symbol = opts.symbol;
    this.gasPrice = Number(opts.gasPrice || 0)
    this.gas = Number(opts.gas || 0)
    this.input = opts.input || ''
    this.status = opts.status || TransactionStatus.PENDING
    this.contractAddress = String(opts.contractAddress || '')
    this.timestamp = Number(opts.timestamp)
    this.fee = Number(opts.fee || 0)
    this.feeToken = String(opts.feeToken || "")
    this.extra = opts.extra
    this.source = String(opts.source || '')
    this.confirmations = Number(opts.confirmations || 1)
  }
}
export type ITransaction = Transaction;
