import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PaginationResRO, PaginationReqRO } from '../shared/interfaces';
import * as dayjs from 'dayjs'
import { logger } from '../shared/utils';

@Injectable()
export class TransactionService {
  constructor(
    private readonly manager: EntityManager
  ) {}

  async findAll(query: PaginationReqRO): Promise<PaginationResRO<any>> {
    
    // const { makerAddress } = query;
    const cur = +query.current || 1;
    const limit = +query.size || 10;
    const offset = `${(cur - 1) * limit}`;

    let more = ``;
    if (query.startTime) {
      more += `and t.createdAt >= '${dayjs(+query.startTime).format('YYYY-MM-DD HH:mm:ss')}' `;
    }
    if (query.endTime) {
      more += `and t.createdAt <= '${dayjs(+query.endTime).format('YYYY-MM-DD HH:mm:ss')}' `;
    }
    const sql = `
      select * from transaction t where (t.from='${query.makerAddress}' or t.to='${query.makerAddress}') ${more}
        order by t.timestamp DESC, t.createdAt DESC
    `;
    logger.log(`[TransactionService.findAll] ${sql.replace(/\s+/g, ' ')}`)
    const datas = await this.manager.query(sql);
    const data = datas.slice(offset, offset + limit);
      

    const total = data.length;
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
