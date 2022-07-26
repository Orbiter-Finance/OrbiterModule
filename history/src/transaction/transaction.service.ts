import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PaginationResRO, CommonResRO, PaginationReqRO } from '../shared/interfaces';
import { logger, formateTimestamp, transforeUnmatchedTradding } from '../shared/utils';

@Injectable()
export class TransactionService {
  constructor(
    private readonly manager: EntityManager
  ) {}

  async findUnmatched(query): Promise<CommonResRO<any>> {
    let more = ``;
    if (query.startTime) {
      more += `and t.timestamp >= '${formateTimestamp(+query.startTime)}' `;
    }
    if (query.endTime) {
      more += `and t.timestamp <= '${formateTimestamp(+query.endTime)}' `;
    }
    // if (typeof query.status != 'undefined') {
    //   more += `and t.status = ${query.status} `
    // }
    if (query.makerAddress) {
      // more += `and m.replySender = '${query.makerAddress}' `
      const fromOrTo = query.fromOrToMaker == 1 ? 'from' : 'to'
      more += `and t.${fromOrTo} = '${query.makerAddress}'`
    }
    // fromOrToMaker 0: maker <<< to, 1: maker >>> from
    const inoutId = query.fromOrToMaker == 1 ? 'outId' : 'inId'
    const rInoutId = inoutId === 'outId' ? 'inId' : 'outId'
    // const sql = `
    //   select * from maker_transaction m left join transaction t on m.${inoutId} = t.id where m.${rInoutId} is null ${more} 
    //     order by t.timestamp DESC
    // `

    // const sql = `
    //   select * 
    //     from transaction t left join maker_transaction m on t.id = m.${inoutId} 
    //     where (t.status = '2' or t.status = '3') and m.${inoutId} is null ${more}
    // `

    const sql = `
      select t.id, t.chainId, t.hash, t.value, t.from, t.to, t.timestamp, t.status, t.tokenAddress 
        from transaction t left join maker_transaction m on t.id = m.${inoutId} 
        where (t.status = '1' and m.${rInoutId} is null ${more}) 
        or ((t.status = '2' or t.status = '3') ${more})
        order by t.timestamp DESC
    `

    logger.log(`[TransactionService.findUnmatched] ${sql.replace(/\s+/g, ' ')}`)
    const data = await this.manager.query(sql);
    await transforeUnmatchedTradding(data);
    
    return {
      code: 0,
      msg: null,
      data,
    }
  }
  
  async findAll(query: PaginationReqRO): Promise<PaginationResRO<any>> {  
    // const { makerAddress } = query;
    const cur = +query.current || 1;
    const limit = +query.size || 10;
    const offset = (cur - 1) * limit;

    let more = ``;
    if (query.startTime) {
      more += `${more ? 'and' : ''} t.timestamp >= '${formateTimestamp(+query.startTime)}' `;
    }
    if (query.endTime) {
      more += `${more ? 'and' : ''} t.timestamp <= '${formateTimestamp(+query.endTime)}' `;
    }
    let smid = ``
    if (query.makerAddress || more) {
      if (query.makerAddress) {
        smid = `where (t.from='${query.makerAddress}' or t.to='${query.makerAddress}') ${more}`
      } else {
        smid = `where ${more}`
      }
    }
    const commsql = `
      from transaction t ${smid}
        order by t.timestamp DESC
    `
    const sql = `
      select * ${commsql} LIMIT ${limit} OFFSET ${offset}
    `;
    logger.log(`[TransactionService.findAll] ${sql.replace(/\s+/g, ' ')}`)
    const datas = await this.manager.query(sql);
    const data = datas.slice(offset, offset + limit);      

    const sqlOfTotal = `
      select COUNT(t.id) as sum 
        ${commsql}
    `
    logger.log(`[TransactionService.findAll count] ${sqlOfTotal.replace(/\s+/g, ' ')}`)
    const sumData = await this.manager.query(sqlOfTotal)
    const total = +sumData[0]?.sum || 0;
    // const total = datas.length;
    const pages = Math.ceil((total / limit));

    return {
      code: 0,
      current: cur,
      size: limit,
      total,
      pages,
      msg: null,
      data
    }
  }
}
