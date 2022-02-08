import { Repository } from 'typeorm'
import { ServiceError, ServiceErrorCodes } from '../error/service'
import { SystemSetting } from '../model/system_setting'
import { Core } from '../util/core'
import { errorLogger } from '../util/logger'
import { getWealthsChains } from './maker'

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
      let value = BALANCE_ALARM_BASELINE
      if (settingValue) {
        for (const _item of settingValue) {
          let _value: number | undefined = undefined
          for (const _item1 of _item.baselines) {
            if (
              _item.chainId == item.chainId &&
              _item1.tokenName == item1.tokenName
            ) {
              _value = _item1.value
              break
            }
          }

          if (_value != undefined) {
            value = _value
            break
          }
        }
      }

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
