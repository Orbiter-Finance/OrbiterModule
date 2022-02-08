import { Repository } from 'typeorm'
import { SystemSetting } from '../model/system_setting'
import { Core } from '../util/core'
import { errorLogger } from '../util/logger'
import { getWealthsChains } from './maker'

type BalanceAlarms = {
  chainId: number
  chainName: string
  makerAddress: string
  baselines: {
    tokenAddress: string
    tokenName: string
    value: number
  }[]
}[]

const repositorySystemSetting = (): Repository<SystemSetting> => {
  return Core.db.getRepository(SystemSetting)
}
const BALANCE_ALARM_KEY = 'balance_alarm'

// Default Baseline
export const BALANCE_ALARM_BASELINE = 2

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
  const balanceAlarms: BalanceAlarms = []

  const settingValue = await getSettingValueJson(
    `${BALANCE_ALARM_BASELINE}_${makerAddress}`
  )

  for (const item of wealthsChains) {
  }

  return balanceAlarms
}

export async function saveBalanceAlarms(makerAddress: string, value: string) {}
