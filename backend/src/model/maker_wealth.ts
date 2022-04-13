import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common'

@Index('get_wealths', ['makerAddress'])
@Entity()
export class MakerWealth extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 128, default: '0x' })
  makerAddress: string

  @Column('varchar', { length: 128, default: '0x' })
  tokenAddress: string

  @Column('int', { width: 11, default: 0 })
  chainId: number

  @Column('varchar', { length: 30, default: '0' })
  balance: string

  @Column('int', { width: 11, default: 0 })
  decimals: number
}
