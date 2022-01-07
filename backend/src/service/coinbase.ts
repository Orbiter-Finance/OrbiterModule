import axios from 'axios'
import { BigNumber } from 'bignumber.js'
import { equalsIgnoreCase } from '../util'
import { Core } from '../util/core'

const CACHE_KEY_EXCHANGE_RATES = 'EXCHANGE_RATES'

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
  const cacheKey = `${CACHE_KEY_EXCHANGE_RATES}_${currency}`
  let exchangeRates: any = Core.memoryCache.get(cacheKey)
  if (!exchangeRates) {
    exchangeRates = await cacheExchangeRates(currency)
  }
  if (!exchangeRates?.[sourceCurrency]) {
    throw `No found exchangeRates[${sourceCurrency}]`
  }

  return new BigNumber(exchangeRates[sourceCurrency])
}

/**
 * @param value
 * @param sourceCurrency
 * @returns
 */
export async function exchangeToUsd(
  value: string | BigNumber,
  sourceCurrency: string
): Promise<BigNumber> {
  if (!(value instanceof BigNumber)) {
    value = new BigNumber(value)
  }

  const rate = await getExchangeToUsdRate(sourceCurrency)

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
  const cacheKey = `${CACHE_KEY_EXCHANGE_RATES}_${currency}`
  Core.memoryCache.set(cacheKey, data.rates)

  return data.rates
}
