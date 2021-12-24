import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common'

@Entity()
export class MakerZkHash extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 60, default: '0' })
  makerAddress: string

  @Column('varchar', { length: 20, default: '0' })
  validPText: string

  @Column('varchar', { length: 60, default: '0' })
  tokenAddress: string

  @Column('varchar', { length: 255, default: '0' })
  txhash: string
}
