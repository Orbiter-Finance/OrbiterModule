import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateUpdateDateTimeAbstract } from '../../shared/abstracts';

@Entity('maker_transaction')
export class MakerTransactionEntity extends CreateUpdateDateTimeAbstract {
  @PrimaryGeneratedColumn({ comment: "id" })
  id: number;
  
  @Column({ length: 100, default: null, comment: "transactionId" })
  transcationId: string;

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

  @Column({ default: null, comment: "from Chain" })
  fromChain: number;

  @Column({ default: null, comment: "to Chain" })
  toChain: number;

  @Column({ default: null, comment: "toAmount" })
  toAmount: string;

  @Column({ default: null, comment: "maker Sender Address" })
  replySender: string;

  @Column({ default: null, comment: "reply user Recipient" })
  replyAccount: string;
}
