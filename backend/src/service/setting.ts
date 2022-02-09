import axios from 'axios'
import { Repository } from 'typeorm'
import { prometheusConfig } from '../config'
import { ServiceError, ServiceErrorCodes } from '../error/service'
import { SystemSetting } from '../model/system_setting'
import { sleep } from '../util'
import { Core } from '../util/core'
import { errorLogger } from '../util/logger'
import { getMakerAddresses, getWealths, getWealthsChains } from './maker'

type BalanceAlarm = {
  chainId: number
  chainName: string
  makerAddress: string
  baselines: {
    tokenAddress: string
    tokenName: string
    value: number
  }[]
}

const repositorySystemSetting = (): Repository<SystemSetting> => {
  return Core.db.getRepository(SystemSetting)
}
const BALANCE_ALARM_KEY = 'balance_alarm'

// Default Baseline
export const BALANCE_ALARM_BASELINE = 2

export function getTargetBaseline(
  chainId: number,
  tokenAddress: string,
  balanceAlarms?: BalanceAlarm[]
) {
  // Default use BALANCE_ALARM_BASELINE, When settingValue has value, use it
  if (balanceAlarms) {
    for (const item of balanceAlarms) {
      for (const item1 of item.baselines) {
        if (item.chainId == chainId && item1.tokenAddress == tokenAddress) {
          return item1.value
        }
      }
    }
  }

  return BALANCE_ALARM_BASELINE
}

/**
 * Get setting_value with json parse
 * @param setting_key
 * @returns
 */
export async function getSettingValueJson(setting_key: string) {
  let json: any = undefined
  try {
    const setting = await repositorySystemSetting().findOne({
      setting_key,
    })
    if (setting) {
      json = JSON.parse(setting?.setting_value)
    }
  } catch (error) {
    errorLogger.error(error)
  }
  return json
}

export async function getBalanceAlarms(makerAddress: string) {
  const wealthsChains = await getWealthsChains(makerAddress)
  const balanceAlarms: BalanceAlarm[] = []

  const settingValue: BalanceAlarm[] | undefined = await getSettingValueJson(
    `${BALANCE_ALARM_KEY}_${makerAddress}`
  )

  for (const item of wealthsChains) {
    const balanceAlarm: BalanceAlarm = {
      chainId: item.chainId,
      chainName: item.chainName,
      makerAddress: item.makerAddress,
      baselines: [],
    }

    for (const item1 of item.balances) {
      // Default use BALANCE_ALARM_BASELINE, When settingValue has value, use it
      let value = getTargetBaseline(
        item.chainId,
        item1.tokenAddress,
        settingValue
      )

      balanceAlarm.baselines.push({
        tokenAddress: item1.tokenAddress,
        tokenName: item1.tokenName,
        value,
      })
    }

    balanceAlarms.push(balanceAlarm)
  }

  return balanceAlarms
}

export async function saveBalanceAlarms(
  makerAddress: string,
  value: BalanceAlarm[]
) {
  // check
  if (!makerAddress) {
    throw new ServiceError(
      'Sorry, params makerAddress miss',
      ServiceErrorCodes['arguments invalid']
    )
  }

  const setting_key = `${BALANCE_ALARM_KEY}_${makerAddress}`
  const setting_value = JSON.stringify(value)

  const target = await repositorySystemSetting().findOne(
    { setting_key },
    { select: ['id'] }
  )
  if (target) {
    await repositorySystemSetting().update({ id: target.id }, { setting_value })
  } else {
    await repositorySystemSetting().insert({ setting_key, setting_value })
  }

  return true
}

type DoBalanceAlarmItem = {
  makerAddress: string
  chainId: number
  chainName: string
  tokenAddress: string
  tokenName: string
  balance: number
}
export const doBalanceAlarm = new (class {
  prevList: DoBalanceAlarmItem[] = []

  async do() {
    const doList: DoBalanceAlarmItem[] = []
    const onCompared = (
      doBalanceAlarmItem: DoBalanceAlarmItem,
      baseline: number
    ) => {
      if (doBalanceAlarmItem.balance < baseline) {
        const index = this.prevList.findIndex(
          (item) =>
            item.chainId == doBalanceAlarmItem.chainId &&
            item.tokenAddress == doBalanceAlarmItem.tokenAddress
        )
        if (index == -1) {
          doList.push(doBalanceAlarmItem)
        }
      }
    }
    this.prevList = await this.list(onCompared)

    const alerts: any[] = []
    for (const item of doList) {
      alerts.push({
        labels: {
          alertname: 'Dashboard',
          instance: 'BalanceAlarm',
          serverity: 'critical',
        },
        annotations: {
          info: 'Not enough balance. ',
          summary: `${item.tokenName}: ${item.balance}`,
        },
      })
    }

    // Post to alertmanager
    const postToAlertmanager = async (total = 0) => {
      try {
        const url = `${prometheusConfig.alertmanager.api}/api/v2/alerts`
        
        await axios.post(url, alerts, {
          headers: { 'Content-Type': 'application/json' },
        })
      } catch (err) {
        errorLogger.error('ToAlertmanager faild: ', err.message)

        // Await some time, retry
        if (total < 5) {
          await sleep(5000)
          postToAlertmanager(total + 1)
        }
      }
    }
    postToAlertmanager()
  }

  async list(
    onCompared?: (
      doBalanceAlarmItem: DoBalanceAlarmItem,
      baseline: number
    ) => void
  ) {
    const makerAddresses = await getMakerAddresses()

    const list: DoBalanceAlarmItem[] = []
    for (const item of makerAddresses) {
      const wealths = await getWealths(item)

      const settingValue: BalanceAlarm[] | undefined =
        await getSettingValueJson(`${BALANCE_ALARM_KEY}_${item}`)

      for (const item1 of wealths) {
        for (const item2 of item1.balances) {
          const baseline = getTargetBaseline(
            item1.chainId,
            item2.tokenAddress,
            settingValue
          )
          const balance = Number(item2.value)
          const doBalanceAlarmItem: DoBalanceAlarmItem = {
            makerAddress: item,
            chainId: item1.chainId,
            chainName: item1.chainName,
            tokenAddress: item2.tokenAddress,
            tokenName: item2.tokenName,
            balance,
          }

          // Call onCompared
          onCompared && onCompared(doBalanceAlarmItem, baseline)

          balance < baseline && list.push(doBalanceAlarmItem)
        }
      }
    }

    return list
  }
})()
