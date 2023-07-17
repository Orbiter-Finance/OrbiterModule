import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import maker from './maker'
import notify from './notify'
import setting from './setting'

export default function () {
  const router = new KoaRouter<DefaultState, Context>({ prefix: '/' })

  maker(router)

  setting(router)
  
  notify(router)
  return router.routes()
}
