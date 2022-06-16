import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PaginationResRO, PaginationReqRO } from '../shared/interfaces';
import { TransactionRealDto } from './dto/transaction-real.dto';
import * as dayjs from 'dayjs'
import { equalsIgnoreCase, logger } from '../shared/utils';
import { transforeData } from '../shared/utils';

@Injectable()
export class TransactionRelInoutService {
  constructor(
    private readonly manager: EntityManager
  ) {}

  async findAll(query: PaginationReqRO): Promise<PaginationResRO<TransactionRealDto>> {
    // Clean keyword
    if (
      equalsIgnoreCase(query.keyword, '0x') ||
      equalsIgnoreCase(query.keyword, query.makerAddress)
    ) {
      query.keyword = '';
    }

    const cur = +query.current || 1;
    const limit = +query.size || 10;
    const offset = `${(cur - 1) * limit}`;
    // const first = offset + 1;
    // const last = offset + limit;

    let more = ``;
    if (query.makerAddress) {
      more += `and r.makerAddress = '${query.makerAddress}'`
    }
    if (query.startTime) {
      more += `and r.createdAt >= '${dayjs(+query.startTime).format('YYYY-MM-DD HH:mm:ss')}' `;
    }
    if (query.endTime) {
      more += `and r.createdAt <= '${dayjs(+query.endTime).format('YYYY-MM-DD HH:mm:ss')}' `;
    }
    if (query.fromChain) {
      more += `and t.chainId = '${query.fromChain}' `;
    }
    if (query.toChain) {
      more += `and t2.chainId = '${query.toChain}' `;
    }
    if (query.keyword) {
      more += `
        and (r.transactionId like '%${query.keyword}%' 
        or t.hash like '%${query.keyword}%' or t2.hash like '%${query.keyword}%'
        or t.from like '%${query.keyword}%' or t.to like '%${query.keyword}%')
      ` ;
    } else {
      if (query.userAddress) {
        more += `and (t.from = '${query.userAddress}' or t.to = '${query.userAddress}') `;
      }
      if (query.status) {
        more += `and t2.status = ${query.status} `; // ???
      }
    }

    // blockHash	blockNumber	transactionIndex from to value	symbol	gasPrice	gas	input	status	
    // tokenAddress	timestamp	fee	feeToken	chainId	source	extra	
    // createdAt	updatedAt	transactionId
    const sql = `
      select r.id, r.makerAddress, r.createdAt, r.transactionId, r.toAmount, r.inId, r.outId, 
        t.hash as fromTx, t2.hash as toTx, t.nonce as fromNonce, t2.nonce as toNonce, 
        t.chainId as fromChain, t2.chainId as toChain, t.value as fromAmount, t2.value as toAmount,
        t.timestamp as fromTimeStamp, t2.timestamp as toTimeStamp, t2.to as userAddress, t.feeToken as tokenName,
        t2.status as status 
          from transaction_rel_inout r 
          left join transaction t on r.inId = t.id 
          left join transaction t2 on r.outId = t2.id 
          where r.inId is not null and r.outId is not null ${more} 
          order by t.timestamp DESC, t2.timestamp DESC
    `; // LIMIT ${limit} OFFSET ${offset};

    logger.log(`[TransactionRelInoutService.findAll] ${sql.replace(/\s+/g, ' ')}`)
    const datas = await this.manager.query(sql);
    const total = datas.length;
    const pages = Math.ceil((total / limit));

    // const subsql = `
    //   ${sql} LIMIT ${limit} OFFSET ${offset}
    // `
    // const data = await this.manager.query(subsql)
    const data = datas.slice(offset, offset + limit);
    const newData = await transforeData(data)

    return {
      code: 0,
      current: cur,
      size: limit,
      total,
      pages,
      msg: null,
      data: newData
    };
  }

}
