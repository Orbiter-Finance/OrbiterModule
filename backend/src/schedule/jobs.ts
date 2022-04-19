import axios from 'axios'
import schedule from 'node-schedule'
import SHA256 from "crypto-js/sha256";
import { makerConfig } from '../config'
import * as coinbase from '../service/coinbase'
import * as serviceMaker from '../service/maker'
import { ServiceMakerPull } from '../service/maker_pull'
import * as serviceMakerWealth from '../service/maker_wealth'
import { doBalanceAlarm } from '../service/setting'
import { clusterIsPrimary, sleep } from '../util'
import { Core } from '../util/core'
import { errorLogger } from '../util/logger'
import { expanPool, getMakerList } from '../util/maker'
import { CHAIN_INDEX } from '../util/maker/core'
import { doSms } from '../sms/smsSchinese'
const apiUrl = "https://maker-list.s3.amazonaws.com"

class MJob {
  protected rule:
    | string
    | number
    | schedule.RecurrenceRule
    | schedule.RecurrenceSpecDateRange
    | schedule.RecurrenceSpecObjLit
    | Date
  protected callback?: () => any
  protected jobName?: string

  /**
   * @param rule
   * @param callback
   * @param completed
   */
  constructor(
    rule:
      | string
      | number
      | schedule.RecurrenceRule
      | schedule.RecurrenceSpecDateRange
      | schedule.RecurrenceSpecObjLit
      | Date,
    callback?: () => any,
    jobName?: string
  ) {
    this.rule = rule
    this.callback = callback
    this.jobName = jobName
  }

  public schedule(): schedule.Job {
    return schedule.scheduleJob(this.rule, async () => {
      try {
        this.callback && (await this.callback())
      } catch (error) {
        let message = `MJob.schedule error: ${error.message}, rule: ${this.rule}`
        if (this.jobName) {
          message += `, jobName: ${this.jobName}`
        }
        errorLogger.error(message)
      }
    })
  }
}

// Pessimism Lock Job
class MJobPessimism extends MJob {
  public schedule(): schedule.Job {
    let pessimismLock = false

    const _callback = this.callback

    this.callback = async () => {
      if (pessimismLock) {
        return
      }
      pessimismLock = true

      try {
        _callback && (await _callback())
      } catch (error) {
        throw error
      } finally {
        // Always release lock
        pessimismLock = false
      }
    }

    return super.schedule()
  }
}

export function jobGetWealths() {
  const callback = async () => {
    const makerAddresses = await serviceMaker.getMakerAddresses()
    for (const item of makerAddresses) {
      const wealths = await serviceMakerWealth.getWealths(item)

      Core.memoryCache.set(
        `${serviceMakerWealth.CACHE_KEY_GET_WEALTHS}:${item}`,
        wealths,
        100000
      )

      await serviceMakerWealth.saveWealths(wealths)
    }
  }

  new MJobPessimism('* */60 * * * *', callback, jobGetWealths.name).schedule()
}

export function jobMakerPull() {
  const startPull = async (
    toChain: number,
    makerAddress: string,
    tokenAddress: string,
    tokenSymbol: string
  ) => {
    try {
      const serviceMakerPull = new ServiceMakerPull(
        toChain,
        makerAddress,
        tokenAddress,
        tokenSymbol
      )

      switch (CHAIN_INDEX[toChain]) {
        case 'eth':
          let apiEth = makerConfig.mainnet.api
          if (toChain == 4 || toChain == 5) {
            apiEth = makerConfig.rinkeby.api
          }
          await serviceMakerPull.etherscan(apiEth)
          break
        case 'arbitrum':
          let apiArbitrum = makerConfig.arbitrum.api
          if (toChain == 22) {
            apiArbitrum = makerConfig.arbitrum_test.api
          }
          await serviceMakerPull.arbitrum(apiArbitrum)
          break
        case 'polygon':
          let apiPolygon = makerConfig.polygon.api
          if (toChain == 66) {
            apiPolygon = makerConfig.polygon_test.api
          }
          await serviceMakerPull.polygon(apiPolygon)
          break
        case 'zksync':
          let apiZksync = makerConfig.zksync.api
          if (toChain == 33) {
            apiZksync = makerConfig.zksync_test.api
          }
          await serviceMakerPull.zkSync(apiZksync)
          break
        case 'optimism':
          let apiOptimism = makerConfig.optimism.api
          if (toChain == 77) {
            apiOptimism = makerConfig.optimism_test.api
          }
          await serviceMakerPull.optimism(apiOptimism)
          break
        case 'immutablex':
          let apiImmutableX = makerConfig.immutableX.api
          if (toChain == 88) {
            apiImmutableX = makerConfig.immutableX_test.api
          }
          await serviceMakerPull.immutableX(apiImmutableX)
          break
        case 'loopring':
          let apiLoopring = makerConfig.loopring.api
          if (toChain == 99) {
            apiLoopring = makerConfig.loopring_test.api
          }
          await serviceMakerPull.loopring(apiLoopring)
          break
        case 'metis':
          let apiMetis = makerConfig.metis.api
          if (toChain == 510) {
            apiMetis = makerConfig.metis_test.api
          }
          await serviceMakerPull.metis(apiMetis)
          break
        case 'dydx':
          let apiDydx = makerConfig.dydx.api
          if (toChain == 511) {
            apiDydx = makerConfig.dydx_test.api
          }
          await serviceMakerPull.dydx(apiDydx)
          break
      }
    } catch (error) {
      errorLogger.error(
        `jobMakerPull.startPull: ${error.message}, toChainId: ${toChain}, tokenAddress: ${tokenAddress}`
      )
    }
  }

  const callback = async () => {
    const makerList = await getMakerList()
    for (const item of makerList) {
      const { pool1, pool2 } = expanPool(item)
      await startPull(
        pool1.c1ID,
        pool1.makerAddress,
        pool1.t1Address,
        pool1.tName
      )
      await startPull(
        pool2.c2ID,
        pool2.makerAddress,
        pool2.t2Address,
        pool2.tName
      )
    }
  }

  new MJobPessimism('*/10 * * * * *', callback, jobMakerPull.name).schedule()
}

const jobMakerNodeTodoMakerAddresses: string[] = []
export function jobMakerNodeTodo(makerAddress: string) {
  // Prevent multiple makerAddress
  if (jobMakerNodeTodoMakerAddresses.indexOf(makerAddress) > -1) {
    return
  }
  jobMakerNodeTodoMakerAddresses.push(makerAddress)

  const callback = async () => {
    await serviceMaker.runTodo(makerAddress)
  }

  new MJobPessimism(
    '*/10 * * * * *',
    callback,
    jobMakerNodeTodo.name
  ).schedule()
}

export function jobCacheCoinbase() {
  const callback = async () => {
    await coinbase.cacheExchangeRates()
  }

  new MJobPessimism(
    '*/10 * * * * *',
    callback,
    jobCacheCoinbase.name
  ).schedule()
}

export function jobBalanceAlarm() {
  const callback = async () => {
    await doBalanceAlarm.do()
  }
  new MJobPessimism('*/10 * * * * *', callback, jobBalanceAlarm.name).schedule()
}
let getMakerListTimeStamp = new Date().getTime()
export const getNewMakerList = async (count = 0) => {
  try {
    const res = await getNewMakerListOnce()
    getMakerListTimeStamp = new Date().getTime()
    return res
  } catch (error) {
    const date = new Date()
    const nowTimeStamp = date.getTime()
    if (nowTimeStamp - getMakerListTimeStamp > 3600000) {
      // todo send message
      let alert =
        `backend pull makerList from aws s3 failed for one hour.${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      doSms(alert)
      getMakerListTimeStamp = nowTimeStamp
    }
    errorLogger.error(
      `getNewMakerList error=${error.message},try again ${count}`
    )
    count++
    if (count < 20) {
      return await getNewMakerList(count)
    } else {
      await sleep(2000)
      return await getNewMakerList()
    }
  }
}
const getNewMakerListOnce = async () => {
  const res: any = await axios({
    url: `${apiUrl}/maker_list.json`,
    method: "get"
  });
  if (res.status == 200) {
    return { ...res.data }
  }
  const sha = SHA256(JSON.stringify(res.data))
  res.data.sha = sha
  return res.data
}
export const makerListSha = {
  sha: '',
}
export function jobGetMakerList() {
  const callback = async () => {
    try {
      const makerListWrap = await getNewMakerList()
      if (makerListSha.sha != makerListWrap.sha && !clusterIsPrimary()) {
        process.exit(0)
      }
    } catch (error) {
      errorLogger.error(`getMakerListError: ${error.message},try again`)
      callback()
    }
  }
  new MJobPessimism('*/20 * * * * *', callback, jobGetMakerList.name).schedule()
}
