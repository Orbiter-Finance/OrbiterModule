import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common'

@Entity()
export class MakerNodeTodo extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255, unique: true })
  transactionID: string

  @Column('varchar', { length: 60, default: '0x' })
  makerAddress: string

  @Column('text')
  data: string

  @Column('int', { width: 11, default: 5 })
  do_max: number

  @Column('int', { width: 11, default: 0 })
  do_current: number

  @Column('int', { width: 11, default: 0 })
  do_state: number

  @Column('int', { width: 11, default: 0 })
  state: number // 0: todo, 1: doit
}
