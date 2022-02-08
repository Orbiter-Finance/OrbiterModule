import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import { getBalanceAlarms } from '../service/setting'

export default function (router: KoaRouter<DefaultState, Context>) {
  router.get('setting/balance_alarms', async ({ restful, request }) => {
    const makerAddress = String(request.query.makerAddress || '')

    const rst = await getBalanceAlarms(makerAddress)

    restful.json(rst)
  })

  router.post('setting/balance_alarms/save', async ({ restful }) => {
    restful.json({})
  })
}
