import dayjs from 'dayjs'
import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import { DydxHelper } from '../service/dydx/dydx_helper'
import { uniqBy } from 'lodash'
export default function (router: KoaRouter<DefaultState, Context>) {
  router.post('notify/dydx', async ({ request, restful }) => {
    //
    const { txlist, account } = request.body
    const address = request.body['address'].toLowerCase()
    try {
      if (account && address) {
        DydxHelper.makerAccount.set(address, account)
      }
      if (txlist && address) {
        const values = DydxHelper.makerTrx.get(address)
        if (values && values.length > 0) {
          DydxHelper.makerTrx.set(address, uniqBy([...txlist, ...values], 'id'))
        } else {
          DydxHelper.makerTrx.set(address, txlist)
        }
      }
      restful.json({
        errno: 0,
      })
    } catch (error) {
      restful.json({
        errno: 1000,
        errmsg: error.message,
        data: dayjs().unix(),
      })
    }
  })
}
