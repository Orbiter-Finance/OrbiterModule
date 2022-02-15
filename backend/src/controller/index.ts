import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import global from './global'
import maker from './maker'
import setting from './setting'

export default function () {
  const router = new KoaRouter<DefaultState, Context>({ prefix: '/' })
  
  global(router)

  maker(router)

  setting(router)

  return router.routes()
}
