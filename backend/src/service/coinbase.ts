import axios from 'axios'
import { BigNumber } from 'bignumber.js'
import { equalsIgnoreCase } from '../util'
import { errorLogger } from '../util/logger'

let exchangeRates: any

/**
 * @param sourceCurrency
 * @returns
 */
export async function getExchangeToUsdRate(
  sourceCurrency = 'ETH'
): Promise<BigNumber> {
  // toUpperCase
  sourceCurrency = sourceCurrency.toUpperCase()

  const currency = 'USD'

  let rate = -1
  try {
    if (!exchangeRates) {
      exchangeRates = await cacheExchangeRates(currency)
    }
    if (exchangeRates?.[sourceCurrency]) {
      rate = exchangeRates[sourceCurrency]
    }
  } catch (error) {
    errorLogger.error(error)
  }

  return new BigNumber(rate)
}

/**
 * @param value
 * @param sourceCurrency
 * @returns
 */
export async function exchangeToUsd(
  value: string | number | BigNumber,
  sourceCurrency: string
): Promise<BigNumber> {
  if (!(value instanceof BigNumber)) {
    value = new BigNumber(value)
  }

  const rate = await getExchangeToUsdRate(sourceCurrency)
  if (rate.comparedTo(0) !== 1) {
    return new BigNumber(0)
  }

  return value.dividedBy(rate)
}

/**
 *
 * @param currency
 * @returns
 */
export async function cacheExchangeRates(currency = 'USD'): Promise<any> {
  const resp = await axios.get(
    `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
  )
  const data = resp.data?.data

  // check
  if (!data || !equalsIgnoreCase(data.currency, currency) || !data.rates) {
    return undefined
  }

  // cache
  exchangeRates = data.rates

  return data.rates
}
