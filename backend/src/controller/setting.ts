import { isEthereumAddress } from 'class-validator'
import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import { DydxHelper } from '../service/dydx/dydx_helper'
import {
  DEFAULT_BALANCE_ALARM_BASELINE,
  saveBalanceAlarms
} from '../service/setting'

export default function (router: KoaRouter<DefaultState, Context>) {

  router.post('setting/balance_alarms/save', async ({ restful, request }: any) => {
    const { makerAddress, value } = request.body || {}

    await saveBalanceAlarms(makerAddress, value)

    restful.json('')
  })

  // set dydx's ApiKeyCredentials
  router.post('setting/dydx_api_key_credentials', async ({ request, restful }: any) => {
    const { body } = request
    
    const makerAddresses: string[] = []
    for (const makerAddress in body) {
      if (Object.prototype.hasOwnProperty.call(body, makerAddress)) {
        if (!isEthereumAddress(makerAddress)) {
          continue
        }

        makerAddresses.push(makerAddress)

        DydxHelper.setApiKeyCredentials(makerAddress, body[makerAddress])
      }
    }

    restful.json(makerAddresses.join(','))
  })
}
