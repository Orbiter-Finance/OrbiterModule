import { isEthereumAddress } from 'class-validator'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import { DydxHelper } from '../service/dydx/dydx_helper'
import { makerConfigs } from "../config/consul";
import { consulConfig } from "../config/consul_store";
// extend relativeTime
dayjs.extend(relativeTime)


export default function (router: KoaRouter<DefaultState, Context>) {
  router.get('maker/miss_private_key_addresses', async ({ restful }: any) => {
    const makerAddresses = Array.from(new Set(
        makerConfigs.map(item => item.sender.toLowerCase())
    ));
    const addresses: string[] = []
    for (const item of makerAddresses) {
      if (consulConfig.maker?.privateKeys[item.toLowerCase()]) {
        continue
      }

      addresses.push(item)
    }
    const starknetAddress = consulConfig.maker.starknetAddress;
    if (starknetAddress) {
      for (const L1 in starknetAddress) {
        const address = starknetAddress[L1].toLowerCase();
        if (consulConfig.maker?.privateKeys[address]) {
          continue
        };
        addresses.push(address)
      }
    }
    restful.json(addresses)
  })

  // set privateKeys
  router.post('maker/privatekeys', async ({ request, restful }: any) => {
    const { body } = request

    const makerAddresses: string[] = []
    for (const makerAddress in body) {
      if (Object.prototype.hasOwnProperty.call(body, makerAddress)) {
        if (
          !body[makerAddress] ||
            consulConfig.maker?.privateKeys[makerAddress.toLowerCase()]
        ) {
          continue
        }

        makerAddresses.push(makerAddress)

        consulConfig.maker.privateKeys[makerAddress.toLowerCase()] = body[makerAddress]
      }
    }

    restful.json(makerAddresses.join(','))
  })

  // set dydx's ApiKeyCredentials
  router.post(
    'maker/dydx_api_key_credentials',
    async ({ request, restful }: any) => {
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
    }
  )
}
