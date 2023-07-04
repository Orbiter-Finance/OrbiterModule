import axios from 'axios'
import { Repository } from 'typeorm'
import { prometheusConfig } from '../config'
import { ServiceError, ServiceErrorCodes } from '../error/service'
import { SystemSetting } from '../model/system_setting'
import { sleep } from '../util'
import { Core } from '../util/core'
import { accessLogger, errorLogger } from '../util/logger'

type BalanceAlarm = {
  chainId: number
  chainName: string
  makerAddress: string
  baselines: {
    tokenAddress: string
    tokenName: string
    value: number
    balance?: string
  }[]
}
type MakerPullStart = {
  totalPull: number,
  incrementPull: number,
}

const repositorySystemSetting = (): Repository<SystemSetting> => {
  return Core.db.getRepository(SystemSetting)
}
const BALANCE_ALARM_KEY = 'balance_alarm'

// Default Baseline
export const DEFAULT_BALANCE_ALARM_BASELINE = 0

// Default makerPullStart
export const DEFAULT_MAKER_PULL_START: MakerPullStart = {
  totalPull: 86400000, // ms
  incrementPull: 1800000,
}

export function getTargetBaseline(
  chainId: number,
  tokenAddress: string,
  balanceAlarms?: BalanceAlarm[]
) {
  // Default use DEFAULT_BALANCE_ALARM_BASELINE, When settingValue has value, use it
  if (balanceAlarms) {
    for (const item of balanceAlarms) {
      for (const item1 of item.baselines) {
        if (item.chainId == chainId && item1.tokenAddress == tokenAddress) {
          return item1.value
        }
      }
    }
  }

  return DEFAULT_BALANCE_ALARM_BASELINE
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


export async function saveMakerPullStart(value: any) {

}

type DoBalanceAlarmItem = {
  makerAddress: string
  chainId: number
  chainName: string
  tokenAddress: string
  tokenName: string
  balance: number
}
