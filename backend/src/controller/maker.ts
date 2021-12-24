import BigNumber from 'bignumber.js'
import { plainToInstance } from 'class-transformer'
import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import { makerConfig } from '../config'
import * as serviceMaker from '../service/maker'
import { equalsIgnoreCase } from '../util'
import { Core } from '../util/core'
import { expanPool, getAmountToSend, getMakerList } from '../util/maker'
import { CHAIN_INDEX } from '../util/maker/core'

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

  router.get('maker/nodes', async ({ request, restful }) => {
    // parse query
    const params = plainToInstance(
      class {
        makerAddress: string
        fromChain?: number
        startTime?: number
        endTime?: number
      },
      request.query
    )

    const list = await serviceMaker.getMakerNodes(
      params.makerAddress,
      params.fromChain,
      Number(params.startTime),
      Number(params.endTime)
    )

    // fill data
    for (const item of list) {
      item['fromChainName'] = CHAIN_INDEX[item.fromChain] || ''
      item['toChainName'] = CHAIN_INDEX[item.toChain] || ''

      // format tokenName and amounts
      const fromChainTokenInfo = await serviceMaker.getTokenInfo(
        Number(item.fromChain),
        item.txToken
      )
      item['txTokenName'] = fromChainTokenInfo.tokenName
      item['fromAmountFormat'] = 0
      if (fromChainTokenInfo.decimals > -1) {
        item['fromAmountFormat'] = new BigNumber(item['fromAmount']).dividedBy(
          10 ** fromChainTokenInfo.decimals
        )
      }

      // to amounts
      const toChainTokenInfo = await serviceMaker.getTokenInfo(
        Number(item.fromChain),
        item.txToken
      )
      item['toAmountFormat'] = 0
      if (toChainTokenInfo.decimals > -1) {
        item['toAmountFormat'] = new BigNumber(item['toAmount']).dividedBy(
          10 ** toChainTokenInfo.decimals
        )
      }

      let needTo = {
        chainId: 0,
        amount: 0,
        amountFormat: '',
        tokenAddress: '',
      }
      if (item.state == 1 || item.state == 20) {
        needTo.chainId = Number(serviceMaker.getAmountFlag(item.fromAmount))

        // find pool
        let pool
        for (const maker of await getMakerList()) {
          const { pool1, pool2 } = expanPool(maker)
          if (
            pool1.makerAddress == item.makerAddress &&
            equalsIgnoreCase(pool1.t1Address, item.txToken) &&
            pool1.c1ID == item.fromChain &&
            pool1.c2ID == needTo.chainId
          ) {
            pool = pool1
            needTo.tokenAddress = pool1.t2Address
            break
          }
          if (
            pool2.makerAddress == item.makerAddress &&
            equalsIgnoreCase(pool2.t2Address, item.txToken) &&
            pool2.c1ID == needTo.chainId &&
            pool2.c2ID == item.fromChain
          ) {
            pool = pool2
            needTo.tokenAddress = pool2.t1Address
            break
          }
        }

        // if not find pool, don't do it
        if (pool) {
          needTo.amount =
            getAmountToSend(
              Number(item.fromChain),
              needTo.chainId,
              item.fromAmount,
              pool,
              item.formNonce
            )?.tAmount || 0
          needTo.amountFormat = new BigNumber(needTo.amount)
            .dividedBy(10 ** pool.precision)
            .toString()
        }
      }
      item['needTo'] = needTo
    }

    restful.json(list)
  })

  router.get('maker/wealths', async ({ restful }) => {
    let rst = Core.memoryCache.get(serviceMaker.CACHE_KEY_GET_WEALTHS)

    if (!rst) {
      rst = await serviceMaker.getWealths()
    }

    restful.json(rst)
  })

  // set makerConfig.privatekey
  router.post('maker/privatekey', async ({ request, restful }) => {
    const { privatekey } = request.body

    if (privatekey !== undefined) {
      makerConfig.privatekey = privatekey
    }

    restful.json()
  })
}
