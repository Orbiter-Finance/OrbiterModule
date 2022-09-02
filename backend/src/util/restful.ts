import { Context } from 'koa'
import { ServiceErrorCodes } from '../error/service'

export class Restful {
  private ctx: Context

  constructor(ctx: Context) {
    this.ctx = ctx
  }

  /**
   * json output
   */
  public json(
    data?: any,
    errCode: ServiceErrorCodes = 0,
    errMessage: any = '',
    apis?: Array<[string, string]>
  ): void {
    if (!errMessage) {
      errMessage = ServiceErrorCodes[errCode]
    }

    const response = this.ctx.response
    response.set('content-type', 'application/json')
    response.body = JSON.stringify({ data, errCode, errMessage, apis })
  }

  /**
   * xml output
   * TODO
   */
  public xml(
    data: any,
    errCode: ServiceErrorCodes = 0,
    errMessage: any = '',
    apis?: Array<[string, string]>
  ): void {
    console.log(data, errCode, errMessage, apis)
    const response = this.ctx.response
    response.set('content-type', 'application/xml')
    response.body = 'building...'
  }
}
