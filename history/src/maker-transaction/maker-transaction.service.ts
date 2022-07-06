import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PaginationResRO, PaginationReqRO } from '../shared/interfaces';
import { equalsIgnoreCase, logger, formateTimestamp } from '../shared/utils';
import { transforeData } from '../shared/utils';

@Injectable()
export class MakerTransactionService {
  constructor(
    private readonly manager: EntityManager
  ) {}

  async findAll(query: PaginationReqRO): Promise<PaginationResRO<any>> {
    // Clean keyword
    if (
      equalsIgnoreCase(query.keyword, '0x') ||
      equalsIgnoreCase(query.keyword, query.makerAddress)
    ) {
      query.keyword = '';
    }

    const cur = +query.current || 1;
    const limit = +query.size || 10;
    const offset = (cur - 1) * limit;

    let more = ``;
    if (query.makerAddress) {
      more += `and m.replySender = '${query.makerAddress}'`
    }
    if (query.startTime) {
      more += `and t.timestamp >= '${formateTimestamp(+query.startTime)}' `;
    }
    if (query.endTime) {
      more += `and t.timestamp <= '${formateTimestamp(+query.endTime)}' `;
    }
    if (query.fromChain) {
      more += `and m.fromChain = ${query.fromChain} `;
    }
    if (query.toChain) {
      more += `and m.toChain = ${query.toChain} `;
    }
    if (query.state) {
      /*
        0: { label: 'From: check', type: 'info' },
        1: { label: 'From: okay', type: 'warning' },
        2: { label: 'To: check', type: 'info' },
        3: { label: 'To: okay', type: 'success' },
        20: { label: 'To: failed', type: 'danger' },
      */
      const state = +query.state
      if (!isNaN(state) && state >= 0) {
        if (state < 2) {
          more += `and t.status = ${state} `
        } else if (state === 2 || state === 3) {
          more += `and t2.status = ${state === 2 ? 0 : 1} `
        } else {
          more += `and t2.status = 2 `
        }
      }
    }
    if (query.keyword) {
      more += `
        and (m.transcationId like '%${query.keyword}%' 
        or t.hash like '%${query.keyword}%' or t2.hash like '%${query.keyword}%'
        or m.replySender like '%${query.keyword}%' or	m.replyAccount like '%${query.keyword}%'
        or t.from like '%${query.keyword}%' or t.to like '%${query.keyword}%')
      ` ;
    } else {
      if (query.userAddress) {
        more += `and m.replyAccount = '${query.userAddress}' `;
      }
    }

    const wheresql = more.slice(4)

    const commsql = `
      from maker_transaction m 
        left join transaction t on m.inId = t.id 
        left join transaction t2 on m.outId = t2.id 
        ${wheresql ? 'where' : ''} ${wheresql}
    `
    const sql = ` 
      select m.id, m.transcationId, m.fromChain, m.toChain, m.toAmount, m.replySender, m.replyAccount, m.createdAt, m.updatedAt,
        m.replySender as makerAddress, m.replyAccount as userAddress, m.inId, m.outId, 
        t.hash as fromTx, t2.hash as toTx, t.nonce as fromNonce, t2.nonce as toNonce, 
        t.value as fromValue, t2.value as toValue, t.timestamp as fromTimeStamp, t2.timestamp as toTimeStamp, 
        t.symbol as tokenName, t2.status as status, t.status as fromStatus 
      ${commsql} order by t.timestamp DESC LIMIT ${limit} OFFSET ${offset}
    `

    logger.log(`[MakerTransactionService.findAll] ${sql.replace(/\s+/g, ' ')}`)
    const data = await this.manager.query(sql);

    const sqlOfTotal = `
      select COUNT(m.id) as sum 
        ${commsql}
    `
    logger.log(`[MakerTransactionService.findAll count] ${sqlOfTotal?.replace(/\s+/g, ' ')}`)
    const sumData = await this.manager.query(sqlOfTotal)
    const total = +sumData[0]?.sum || 0;
    const pages = Math.ceil((total / limit));
    // TODO: old transfore logic, should improve
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
