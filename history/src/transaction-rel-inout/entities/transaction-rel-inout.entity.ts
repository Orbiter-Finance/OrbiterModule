import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateUpdateDateTimeAbstract } from '../../shared/abstracts';

@Entity('transaction_rel_inout')
export class TransactionRelInoutEntity extends CreateUpdateDateTimeAbstract {
  @PrimaryGeneratedColumn({ comment: "id" })
  id: number;

  @Column({ default: null, comment: "inId" })
  inId: number;

  @Column({ default: null, comment: "outId" })
  outId: number;

  // @OneToOne(() => TransactionEntity, (transaction) => transaction.id)
  // @JoinColumn()
  // in: number;

  // @OneToOne(() => TransactionEntity, (transaction) => transaction.id)
  // @JoinColumn()
  // out: number;

  @Column({ default: null })
  makerAddress: string;

  @Column({ default: null, comment: "transactionId" })
  transactionId: string;

  @Column({ length: 40, default: null, comment: "toAmount" })
  toAmount: string;
}
