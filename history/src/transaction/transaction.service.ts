import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PaginationResRO, CommonResRO, PaginationReqRO } from '../shared/interfaces';
import { logger, formateTimestamp } from '../shared/utils';

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
    if (typeof query.status != 'undefined') {
      more += `and t.status = ${query.status} `
    }
    if (query.makerAddress) {
      more += `and m.replySender = '${query.makerAddress}' `
    }
    // fromOrToMaker 0: maker <<< to, 1: maker >>> from
    const inoutId = query.fromOrToMaker == 1 ? 'outId' : 'inId'
    const sql = `
      select * from transaction t left join maker_transaction m 
        on t.id = m.${inoutId} where m.${inoutId} is not null ${more} 
        order by t.timestamp DESC, t.createdAt DESC
    `
    logger.log(`[TransactionService.findUnmatched] ${sql.replace(/\s+/g, ' ')}`)
    const data = await this.manager.query(sql);

    return {
      code: 0,
      msg: null,
      data
    }
  }
  
  async findAll(query: PaginationReqRO): Promise<PaginationResRO<any>> {  
    // const { makerAddress } = query;
    const cur = +query.current || 1;
    const limit = +query.size || 10;
    const offset = `${(cur - 1) * limit}`;

    let more = ``;
    if (query.startTime) {
      more += `and t.timestamp >= '${formateTimestamp(+query.startTime)}' `;
    }
    if (query.endTime) {
      more += `and t.timestamp <= '${formateTimestamp(+query.endTime)}' `;
    }
    let smid = ``
    if (query.makerAddress || more) {
      if (query.makerAddress) {
        smid = `where (t.from='${query.makerAddress}' or t.to='${query.makerAddress}') ${more}`
      } else {
        smid = `where ${more}`
      }
    }
    const sql = `
      select * from transaction t ${smid}
        order by t.timestamp DESC, t.updatedAt DESC, t.createdAt DESC
    `;
    logger.log(`[TransactionService.findAll] ${sql.replace(/\s+/g, ' ')}`)
    const datas = await this.manager.query(sql);
    const data = datas.slice(offset, offset + limit);      

    const total = datas.length;
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
