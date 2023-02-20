import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PaginationResRO, PaginationReqRO } from '../shared/interfaces';
import { equalsIgnoreCase, logger, formateTimestamp } from '../shared/utils';
import { transforeData } from '../shared/utils';

enum StateEnum {
  fromCheck = 0,
  fromOk = 1,
  fromFail = 2,
  toWaiting = 3,
  toCheck = 4,
  toTimeOut = 5,
  toOk = 6,
  backtrack = 7,
  fail = 20
}

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
      more += `and (m.replySender = '${query.makerAddress}' or m.replyAccount = '${query.makerAddress}' or t.to = '${query.makerAddress}' or t2.from = '${query.makerAddress}') `
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
      const state = +query.state;
      switch (state) {
        case StateEnum.fromCheck: {
          more += `and t.status = 0 `;
          break;
        }
        case StateEnum.fromOk: {
          more += `and t.status = 1 `;
          break;
        }
        case StateEnum.fromFail: {
          more += `and t.status = 3 `;
          break;
        }
        case StateEnum.toWaiting: {
          more += `and t.status = 97 `;
          break;
        }
        case StateEnum.toCheck: {
          more += `and t2.status = 97 `;
          break;
        }
        case StateEnum.toTimeOut: {
          more += `and (t2.status != 95 and t2.status != 99 or t2.status is NULL) and m.createdAt < '${formateTimestamp(new Date().valueOf() - 1000 * 60 * 30)}' `;
          break;
        }
        case StateEnum.toOk: {
          more += `and (t2.status = 99 or t2.status = 1)`;
          break;
        }
        case StateEnum.backtrack: {
          more += `and t2.status = 95 `;
          break;
        }
        case StateEnum.fail: {
          more += `and t2.status = 96 `;
          break;
        }
      }
    }
    if(query.source){
      more += `and t.source = '${query.source}' `;
    }
    if (query.keyword) {
      more += `
        and (m.transcationId like '%${query.keyword}%' 
        or t.hash like '%${query.keyword}%' or t2.hash like '%${query.keyword}%'
        or m.replyAccount like '%${query.keyword}%' or t.from like '%${query.keyword}%' or t2.to like '%${query.keyword}%')
      ` ;
      // or m.replySender like '%${query.keyword}%' or	m.replyAccount like '%${query.keyword}%'
    } else {
      if (query.userAddress) {
        more += `and (m.replyAccount = '${query.userAddress}' or t.from = '${query.userAddress}' or t2.to = '${query.userAddress}') `
      }
    }

    // const wheresql = more.slice(4)
    // ${wheresql ? 'where' : ''} ${wheresql}
    if (query.makerAddress) {
      const wheresql = more.slice(4)
      more = wheresql ? `where ${wheresql}` : ''
    } else {
      more = `where m.inId is not null and m.outId is not null ${more}`
    }

    const commsql = `
      from maker_transaction m 
        left join transaction t on m.inId = t.id 
        left join transaction t2 on m.outId = t2.id 
        ${more}
    `
    const sql = ` 
      select m.id, m.transcationId, m.fromChain, m.toChain, m.toAmount, m.replySender, m.replyAccount, m.createdAt, m.updatedAt,
        m.replySender as makerAddress, t.from as userAddress, m.inId, m.outId, t.gasPrice, t.gas,
        t.nonce as fromNonce, t.tokenAddress as fromTokenAddress, t.tokenAddress as txToken, t2.tokenAddress as toTokenAddress, t.hash as fromTx, t2.hash as toTx, t.nonce as fromNonce, t2.nonce as toNonce, 
        t.value as fromValue, t2.value as toValue, t.timestamp as fromTimeStamp, t2.timestamp as toTimeStamp, t2.fee as gasAmount, t2.feeToken as gasCurrency,
        t.symbol as tokenName, t2.status as status, t.status as fromStatus, t.source as source, t.transferId as transferId, t.extra as extra
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
