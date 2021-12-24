import Application, { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import maker from './maker'

export default function () {
  const router = new KoaRouter<DefaultState, Context>({ prefix: '/' })

  maker(router)

  return router.routes()
}
