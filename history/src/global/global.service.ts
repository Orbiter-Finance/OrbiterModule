import { Injectable, HttpService } from '@nestjs/common';
import axios from 'axios';
import { oldGlobalDataApi } from '../shared/constants';
import { CommonResRO } from '../shared/interfaces';
import logger from '../shared/utils/logger';


@Injectable()
export class GlobalService {
  constructor(private httpService: HttpService) {}

  async getGobalData(): Promise<CommonResRO<any>> {
    const data: any = await this.getGobalDataByOldApi()

    return {
      code: 0,
      msg: null,
      data
    }
  }

  async getGobalDataByOldApi() {
    const res: any = await axios.get(oldGlobalDataApi)
    const data = res.data
    if (data.errCode === 0) {
      return data.data
    } else {
      logger.warn(`get ${oldGlobalDataApi} error: [${data.errCode}] ${data.errMessage}.`)
      return {}
    }
  }

}
