import dayjs from 'dayjs'
import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import { DydxHelper } from '../service/dydx/dydx_helper'
import { ServiceMakerPull } from '../service/maker_pull'
import { uniqBy } from 'lodash'
export default function (router: KoaRouter<DefaultState, Context>) {
  router.post('notify/dydx', async ({ request, restful }) => {
    //
    const { txlist, address } = request.body
    if (txlist && address) {
      const values = DydxHelper.makerTrx.get(address)
      if (values && values.length > 0) {
        DydxHelper.makerTrx.set(address, uniqBy([...txlist, ...values], 'id'))
      } else {
        DydxHelper.makerTrx.set(address, txlist)
      }
      restful.json({
        errno: 0,
        data: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
    } else {
      restful.json({
        errno: 1000,
      })
    }
  })
}
