import BigNumber from 'bignumber.js'
import AWS from 'aws-sdk'
import { plainToInstance } from 'class-transformer'
import { isEthereumAddress } from 'class-validator'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import { equals } from 'orbiter-chaincore/src/utils/core'
import { makerConfig } from '../config'
import { DydxHelper } from '../service/dydx/dydx_helper'
import * as serviceMaker from '../service/maker'
import * as serviceMakerWealth from '../service/maker_wealth'
import { getAmountToSend, getMakerList } from '../util/maker'
import { CHAIN_INDEX } from '../util/maker/core'
// extend relativeTime
dayjs.extend(relativeTime)

AWS.config.update({
  maxRetries: 3,
  httpOptions: { timeout: 30000, connectTimeout: 5000 },
  region: 'ap-northeast-1',
  accessKeyId: makerConfig.s3AccessKeyId,
  secretAccessKey: makerConfig.s3SecretAccessKey,
})

const s3 = new AWS.S3()

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
      pushChain(item.c1ID, item.c1Name)
      pushChain(item.c2ID, item.c2Name)
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

  router.post('maker/config', async (ctx) => {
    const { headers, request, restful } = ctx
    try {
      if (makerConfig.s3Proof != headers.authorization) {
        ctx.response.status = 401
        return restful.json({ message: 's3Proof is error' })
      }
      const oldData = request.body.oldData
      const newData = request.body.newData
      if (oldData && newData) {
        const oldParams = {
          Bucket: 'orbiter-makerlist',
          Key: 'rinkeby/old_makerList.json',
          Body: Buffer.from(oldData),
        }
        const newParams = {
          ACL: 'public-read',
          Bucket: 'orbiter-makerlist',
          Key: 'rinkeby/makerList.json',
          Body: Buffer.from(newData),
        }
        await uploadToS3(oldParams)
        await uploadToS3(newParams)
        restful.json({ message: 'ok' })
      } else {
        ctx.response.status = 400
        restful.json({ message: 'param is empty' })
      }
    } catch (error) {
      ctx.response.status = 500
      restful.json({ message: error.message })
    }
  })
}

function uploadToS3(params) {
  return new Promise((resolve, reject) => {
    s3.upload(params, function (err: Error, data: any) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}
