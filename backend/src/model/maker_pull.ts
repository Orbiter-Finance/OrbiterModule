import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common'

@Entity()
export class MakerPull extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('int', { width: 11, default: 0 })
  chainId: number

  @Column('varchar', { length: 60, default: '0x' })
  makerAddress: string

  @Column('varchar', { length: 60, default: '' })
  tokenAddress: string

  @Column('text')
  data: string

  @Column('varchar', { length: 32, default: '' })
  amount: string

  @Column('varchar', { length: 10, default: '' })
  amount_flag: string

  @Column('varchar', { length: 10, default: '' })
  nonce: string

  @Column('varchar', { length: 60, default: '' })
  fromAddress: string

  @Column('varchar', { length: 60, default: '' })
  toAddress: string

  @Column('varchar', { length: 255, default: '' })
  txBlock: string

  @Column('varchar', { length: 255, default: '' })
  txHash: string

  @Column('timestamp', { default: null })
  txTime: Date

  @Column('varchar', { length: 40, default: '' })
  gasCurrency: string // ex: USDC、ETH

  @Column('varchar', { length: 40, default: '0' })
  gasAmount: string // gas's ether

  @Column('varchar', { length: 11, default: null })
  tx_status: string // committed, finalized, rejected
}
