import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import {
  BALANCE_ALARM_BASELINE,
  getBalanceAlarms,
  saveBalanceAlarms
} from '../service/setting'

export default function (router: KoaRouter<DefaultState, Context>) {
  router.get('setting/balance_alarms', async ({ restful, request }) => {
    const makerAddress = String(request.query.makerAddress || '')

    const list = await getBalanceAlarms(makerAddress)

    restful.json({ list, defaultBaseline: BALANCE_ALARM_BASELINE })
  })

  router.post('setting/balance_alarms/save', async ({ restful, request }) => {
    const { makerAddress, value } = request.body || {}

    await saveBalanceAlarms(makerAddress, value)

    restful.json('')
  })
}
