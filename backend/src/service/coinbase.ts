import axios from 'axios'
import { BigNumber } from 'bignumber.js'
import { equalsIgnoreCase } from '../util'
import { errorLogger } from '../util/logger'

let exchangeRates: { [key: string]: string } | undefined

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
      rate = Number(exchangeRates[sourceCurrency])
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
  // cache
  exchangeRates = await getRates(currency)
  if (exchangeRates) {
    let metisExchangeRates = await getRates('metis')
    if (metisExchangeRates && metisExchangeRates["USD"]) {
      let usdToMetis = 1 / Number(metisExchangeRates["USD"])
      exchangeRates["METIS"] = String(usdToMetis)
    }
    return exchangeRates
  } else {
    return undefined
  }
}
async function getRates(currency) {
  // const resp = await axios.get(
  //   `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
  // )
  // const data = resp.data?.data
  const data:any = null;
  // check
  if (!data || !equalsIgnoreCase(data.currency, currency) || !data.rates) {
    return undefined
  }
  return data.rates
}
/**
 *
 * @param currency
 * @returns
 */
export async function getExchangeRates(currency = 'USD') {
  try {
    if (!exchangeRates) {
      exchangeRates = await cacheExchangeRates(currency)
    }
  } catch (error) {
    errorLogger.error(error)
  }

  return exchangeRates
}
