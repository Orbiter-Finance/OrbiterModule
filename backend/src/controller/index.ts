import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import global from './global'
import maker from './maker'

export default function () {
  const router = new KoaRouter<DefaultState, Context>({ prefix: '/' })
  
  global(router)

  maker(router)

  return router.routes()
}
