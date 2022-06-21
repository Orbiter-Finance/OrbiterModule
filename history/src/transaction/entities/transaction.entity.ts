import { Column, Entity, PrimaryColumn, Unique } from "typeorm";
import { CreateUpdateDateTimeAbstract } from '../../shared/abstracts';
// import { statusEnum } from '../../shared/enums';

@Entity('transaction')
@Unique(["hash", "chainId"])
export class TransactionEntity extends CreateUpdateDateTimeAbstract {
  @PrimaryColumn({ comment: "Id" })
  id: number;

  @Column({ default: null, comment: "Hash" })
  hash: string;

  @Column({ length: 20, default: null, comment: "Nonce" })
  nonce: string;

  @Column({ default: null, comment: "blockHash" })
  blockHash: string;

  @Column({ type: "bigint", default: null, comment: "blockNumber" })
  blockNumber: string;

  @Column({ default: null, comment: "transactionIndex" })
  transactionIndex: number;

  @Column({ default: null, comment: "from" })
  from: string;

  @Column({ default: null, comment: "to" })
  to: string;

  @Column({ length: 32, default: null, comment: "value" })
  value: string;
  
  @Column({ length: 20, default: null, comment: "symbol" })
  symbol: string;

  @Column({ type: "bigint", default: null, comment: "gasPrice" })
  gasPrice: string;

  @Column({ type: "bigint", default: null, comment: "gas" })
  gas: string;

  @Column({ type: "text", default: null, comment: "input" })
  input: string;

  // @Column({
  //   type: "enum",
  //   enum: statusEnum,
  // })
  // status: statusEnum;
  @Column({ type: "tinyint", default: null, comment: "status:0=PENDING,1=COMPLETE,2=FAIL" })
  status: string;

  @Column({ default: null, comment: "tokenAddress" })
  tokenAddress: string;
  
  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP', comment: "timestamp" })
  timestamp: string;

  @Column({ length: 20, default: null, comment: "fee" })
  fee: string;

  @Column({ length: 20, default: null, comment: "feeToken" })
  feeToken: string;

  @Column({  length: 20, default: null, comment: "chainId" })
  chainId: string;

  @Column({ length: 20, default: null, comment: "source" })
  source: string;

  @Column({ length: 50, default: null, comment: "memo" })
  memo: string;
  
  @Column({ type: "json", default: null, comment: "extra" })
  extra: string;
}
