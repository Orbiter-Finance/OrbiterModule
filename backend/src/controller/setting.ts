import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'

export default function (router: KoaRouter<DefaultState, Context>) {
  router.get('setting/balance_alarm', async ({ restful }) => {
    restful.json({})
  })

  router.post('setting/balance_alarm/save', async ({ restful }) => {
    restful.json({})
  })
}
