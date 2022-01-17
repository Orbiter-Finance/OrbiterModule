import schedule from 'node-schedule'
import { makerConfig } from '../config'
import * as serviceMaker from '../service/maker'
import * as coinbase from '../service/coinbase'
import { ServiceMakerPull } from '../service/maker_pull'
import { Core } from '../util/core'
import { errorLogger } from '../util/logger'
import { expanPool, getMakerList } from '../util/maker'
import { CHAIN_INDEX } from '../util/maker/core'

class MJob {
  protected rule:
    | string
    | number
    | schedule.RecurrenceRule
    | schedule.RecurrenceSpecDateRange
    | schedule.RecurrenceSpecObjLit
    | Date
  protected callback?: () => any

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
    callback?: () => any
  ) {
    this.rule = rule
    this.callback = callback
  }

  public schedule(): schedule.Job {
    return schedule.scheduleJob(this.rule, async () => {
      try {
        this.callback && (await this.callback())
      } catch (error) {
        errorLogger.error(
          `MJob.schedule error: ${error.message}, rule: ${this.rule}`
        )
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
      const wealths = await serviceMaker.getWealths(item)
      Core.memoryCache.set(
        `${serviceMaker.CACHE_KEY_GET_WEALTHS}:${item}`,
        wealths,
        100000
      )
    }
  }

  new MJobPessimism('* */5 * * * *', callback).schedule()
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
      }
    } catch (error) {
      errorLogger.error('jobMakerPull.startPull', error)
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

  new MJobPessimism('*/10 * * * * *', callback).schedule()
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

  new MJobPessimism('*/10 * * * * *', callback).schedule()
}

export function jobCacheCoinbase() {
  const callback = async () => {
    await coinbase.cacheExchangeRates()
  }

  new MJobPessimism('*/10 * * * * *', callback).schedule()
}
