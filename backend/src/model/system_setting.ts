import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common'

@Entity()
export class SystemSetting extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255, default: '0' })
  setting_key: string

  @Column('text')
  setting_value: string
}
