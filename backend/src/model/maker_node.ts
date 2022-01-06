import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common'

@Entity()
export class MakerNode extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255, unique: true })
  transactionID: string

  @Column('varchar', { length: 60, default: '0x' })
  makerAddress: string

  @Column('varchar', { length: 60, default: '0x' })
  userAddress: string

  @Column('varchar', { length: 10, default: '0' })
  fromChain: string

  @Column('varchar', { length: 10, default: '0' })
  toChain: string

  @Column('varchar', { length: 255, default: '0x' })
  formTx: string

  @Column('varchar', { length: 255, default: '0x' })
  toTx: string

  @Column('varchar', { length: 10, default: '' })
  formNonce: string

  @Column('varchar', { length: 40, default: '0' })
  fromAmount: string

  @Column('varchar', { length: 40, default: '0' })
  toAmount: string

  @Column('varchar', { length: 40, default: '0' })
  needToAmount: string

  @Column('varchar', { length: 40, default: '0' })
  fromTimeStamp: string

  @Column('varchar', { length: 40, default: '0' })
  toTimeStamp: string

  @Column('varchar', { length: 60, default: '' })
  txToken: string // ex: USDC‘s tokenAddress

  @Column('varchar', { length: 40, default: '' })
  gasCurrency: string // ex: USDC、ETH

  @Column('varchar', { length: 40, default: '0' })
  gasAmount: string // gas's ether

  @Column('int', { width: 11, default: 0 })
  state: number
}
