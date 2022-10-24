import { isEthereumAddress } from 'class-validator'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import { makerConfig } from '../config'
import { DydxHelper } from '../service/dydx/dydx_helper'
import * as serviceMaker from '../service/maker'
import * as serviceMakerWealth from '../service/maker_wealth'
import { getMakerList } from '../util/maker'

// extend relativeTime
dayjs.extend(relativeTime)
export default function (router: KoaRouter<DefaultState, Context>) {
  router.get('maker', async ({ restful }) => {
    const chains = <{ chainId: number; chainName: string }[]>[]
    const pushChain = (chainId: number, chainName: string) => {
      const find = chains.find((item) => item.chainId == chainId)
      if (find) {
        return
      }

      chains.push({ chainId, chainName })
    }
    const makerList = await getMakerList()
    for (const item of makerList) {
      pushChain(item.fromChain.id, item.fromChain.symbol)
      pushChain(item.toChain.id, item.toChain.symbol)
    }

    const earliestMakrNode = await serviceMaker.getEarliestMakerNode()
    let earliestTime = 0
    if (earliestMakrNode) {
      earliestTime = new Date(earliestMakrNode.fromTimeStamp).getTime()
    } else {
      earliestTime = new Date().getTime()
    }

    restful.json({ earliestTime, chains })
  })

  router.get('maker/wealths', async ({ request, restful }) => {
    const makerAddress = String(request.query.makerAddress || '')

    // let rst = Core.memoryCache.get(
    //   `${serviceMakerWealth.CACHE_KEY_GET_WEALTHS}:${makerAddress}`
    // )
    // if (!rst) {
    //   rst = await serviceMakerWealth.getWealths(makerAddress)
    // }

    // No need to cache temporarily, get real-time
    const rst = await serviceMakerWealth.getWealths(makerAddress)

    restful.json(rst)
  })

  router.get('maker/miss_private_key_addresses', async ({ restful }) => {
    const makerAddresses = await serviceMaker.getMakerAddresses()
    const addresses: string[] = []
    for (const item of makerAddresses) {
      if (makerConfig.privateKeys[item.toLowerCase()]) {
        continue
      }

      addresses.push(item)
    }
    const starknetAddress = makerConfig.starknetAddress;
    if (starknetAddress) {
      for (const L1 in starknetAddress) {
        const address = starknetAddress[L1].toLowerCase();
        if (makerConfig.privateKeys[address]) {
          continue
        };
        addresses.push(address)
      }
    }
    restful.json(addresses)
  })

  // set makerConfig.privateKeys
  router.post('maker/privatekeys', async ({ request, restful }) => {
    const { body } = request

    const makerAddresses: string[] = []
    for (const makerAddress in body) {
      if (Object.prototype.hasOwnProperty.call(body, makerAddress)) {
        if (
          !body[makerAddress] ||
          makerConfig.privateKeys[makerAddress.toLowerCase()]
        ) {
          continue
        }

        makerAddresses.push(makerAddress)

        makerConfig.privateKeys[makerAddress.toLowerCase()] = body[makerAddress]
      }
    }

    restful.json(makerAddresses.join(','))
  })

  // set dydx's ApiKeyCredentials
  router.post(
    'maker/dydx_api_key_credentials',
    async ({ request, restful }) => {
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