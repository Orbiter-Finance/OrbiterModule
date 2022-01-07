import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common'

@Entity()
export class SystemCache extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255, default: '0' })
  cache_key: string

  @Column('text')
  cache_value: string
}
