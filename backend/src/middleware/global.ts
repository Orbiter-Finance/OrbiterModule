import { Context, Next } from 'koa'
import { ServiceError } from '../error/service'
import { accessLogger } from '../util/logger'
import { Restful } from '../util/restful'

export default function () {
  return async (ctx: Context, next: Next) => {
    const startMs = new Date().getTime()

    // restful bind
    ctx.restful = new Restful(ctx)

    try {
      await next()
    } catch (err) {
      if (!(err instanceof ServiceError)) {
        throw err
      }

      ctx.restful.json(null, err.code, err.message)
    }

    const ms = new Date().getTime() - startMs
    accessLogger.info(`${ctx.method} ${ctx.path} ${ctx.status} ${ms}ms`)
  }
}
