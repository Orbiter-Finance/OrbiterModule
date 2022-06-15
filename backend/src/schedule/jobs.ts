import { BigNumber } from 'bignumber.js';
import schedule from 'node-schedule'
import { makerConfig } from '../config'
import * as coinbase from '../service/coinbase'
import * as serviceMaker from '../service/maker'
import { ServiceMakerPull } from '../service/maker_pull'
import * as serviceMakerWealth from '../service/maker_wealth'
import { doBalanceAlarm } from '../service/setting'
import { Core } from '../util/core'
import { errorLogger } from '../util/logger'
import { expanPool, getMakerList } from '../util/maker'
import { CHAIN_INDEX } from '../util/maker/core'
import { ScanChainMain } from '../chainCore'
// import { doSms } from '../sms/smsSchinese'
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
        // case 'eth':
        //   let apiEth = makerConfig.mainnet.api
        //   if (toChain == 4 || toChain == 5) {
        //     apiEth = makerConfig.rinkeby.api
        //   }
        //   await serviceMakerPull.etherscan(apiEth)
        //   break
        // case 'arbitrum':
        //   let apiArbitrum = makerConfig.arbitrum.api
        //   if (toChain == 22) {
        //     apiArbitrum = makerConfig.arbitrum_test.api
        //   }
        //   await serviceMakerPull.arbitrum(apiArbitrum)
        //   break
        // case 'polygon':
        //   let apiPolygon = makerConfig.polygon.api
        //   if (toChain == 66) {
        //     apiPolygon = makerConfig.polygon_test.api
        //   }
        //   await serviceMakerPull.polygon(apiPolygon)
        //   break
        // case 'zksync':
        //   let apiZksync = makerConfig.zksync.api
        //   if (toChain == 33) {
        //     apiZksync = makerConfig.zksync_test.api
        //   }
        //   await serviceMakerPull.zkSync(apiZksync)
        //   break
        // case 'optimism':
        //   let apiOptimism = makerConfig.optimism.api
        //   if (toChain == 77) {
        //     apiOptimism = makerConfig.optimism_test.api
        //   }
        //   await serviceMakerPull.optimism(apiOptimism)
        //   break
        // case 'immutablex':
        //   let apiImmutableX = makerConfig.immutableX.api
        //   if (toChain == 88) {
        //     apiImmutableX = makerConfig.immutableX_test.api
        //   }
        //   await serviceMakerPull.immutableX(apiImmutableX)
        //   break
        // case 'loopring':
        //   let apiLoopring = makerConfig.loopring.api
        //   if (toChain == 99) {
        //     apiLoopring = makerConfig.loopring_test.api
        //   }
        //   await serviceMakerPull.loopring(apiLoopring)
        //   break
        // case 'metis':
        //   let apiMetis = makerConfig.metis.api
        //   if (toChain == 510) {
        //     apiMetis = makerConfig.metis_test.api
        //   }
        //   await serviceMakerPull.metis(apiMetis)
        //   break
        case 'dydx':
          let apiDydx = makerConfig.dydx.api
          if (toChain == 511) {
            apiDydx = makerConfig.dydx_test.api
          }
          await serviceMakerPull.dydx(apiDydx)
          break
        // case 'boba':
        //   const network =
        //     toChain === 13 ? makerConfig.boba : makerConfig.boba_test
        //   await serviceMakerPull.boba(network.api, network.wsEndPoint)
        //   break
        // case 'zkspace':
        //   let apiZkspace = makerConfig.zkspace.api
        //   if (toChain == 512) {
        //     apiZkspace = makerConfig.zkspace_test.api
        //   }
        //   await serviceMakerPull.zkspace(apiZkspace)
        //   break
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

export async function startNewDashboardPull() {
  const makerList = await getMakerList()
  const convertMakerList = ScanChainMain.convertTradingList(makerList)
  for (const intranetId in convertMakerList) {
    if (['4', '44'].includes(intranetId)) {
      for (const row of convertMakerList[intranetId]) {
        // starknet and evm wallet address mapping

        if (makerConfig.starknetAddressMap[row.address]) {
          row['address'] = makerConfig.starknetAddressMap[row.address]
        }
      }
    }
  }
  const scanChain = new ScanChainMain(convertMakerList)
  const serviceMakerPull = new ServiceMakerPull(0, '', '', '')
  for (const intranetId in convertMakerList) {
    //
    scanChain.mq.subscribe(`${intranetId}:txlist`, async (result) => {
      return await serviceMakerPull.handleNewScanChainTrx(result, makerList)
    })
  }
  serviceMakerPull.handleNewScanChainTrx([
    {
      chainId: 'SN_GOERLI',
      hash: '0x15e19b1e191abd16084fbc88d051cd9d0aff27aef16ff3daa0a8207a3af31d5',
      nonce: 13,
      blockHash:
        '0x7df5b4d3006bb5c3d44400c836f6f437b7f9c3a82588f3be2db9a47c66db91b',
      blockNumber: 239235,
      transactionIndex: 0,
      from: '0x033b88fc03a2ccb1433d6c70b73250d0513c6ee17a7ab61c5af0fbe16bd17a6e',
      to: '0x03b6da1627bf56996a2cc03934b9fbe94f43a36bc14d97be3cf7ef916e14fe9d',
      value: new BigNumber('190010000000000'),
      symbol: 'ETH',
      gasPrice: 0,
      gas: 0,
      input: '',
      status: 2,
      tokenAddress:
        '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
      timestamp: 1655185624,
      fee: Number('0xf48189e4d4d'),
      feeToken: 'ETH',
      extra: {
        contract_address:
          '0x33b88fc03a2ccb1433d6c70b73250d0513c6ee17a7ab61c5af0fbe16bd17a6e',
        entry_point_selector:
          '0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad',
        entry_point_type: 'EXTERNAL',
        calldata: [
          '0x1',
          '0x457bf9a97e854007039c43a6cc1a81464bd2a4b907594dabc9132c162563eb3',
          '0x68bcbdba7cc8cac2832d23e2c32e9eec39a9f1d03521eff5dff800a62725fa',
          '0x0',
          '0x5',
          '0x5',
          '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
          '0x3b6da1627bf56996a2cc03934b9fbe94f43a36bc14d97be3cf7ef916e14fe9d',
          '0xacd0268dc400',
          '0x0',
          '0x8a3214f28946a797088944396c476f014f88dd37',
          '0xd',
        ],
        signature: [
          '0x62e09184fbad44f84ec0079fe0e060f26a0171dfb2d4bf4bd711658d1a06222',
          '0x56020308f201c516dfe5a2d5cb2bd5cdc10335fa74f7745e2c00a3fc94c869f',
        ],
        max_fee: '0x1192e91ca4d0',
        type: 'INVOKE_FUNCTION',
        ext: '0x8a3214f28946a797088944396c476f014f88dd37',
      },
      source: 'rpc',
      confirmations: 1,
    },
  ], makerList)
  // scanChain.run()
}
