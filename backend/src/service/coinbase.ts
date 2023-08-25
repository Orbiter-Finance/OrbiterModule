import axios from 'axios'
import { BigNumber } from 'bignumber.js'
import { equalsIgnoreCase } from '../util'
import { errorLogger } from '../util/logger'
import * as Keyv from 'keyv';
const keyv = new Keyv();

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

async function getBNBToUSD() {
  let BNBToUSD = await keyv.get(`USD_BNB_rate`);
  if (!BNBToUSD) {
    const res = await axios.get('https://www.binance.com/api/v3/depth?symbol=BNBUSDT&limit=1');
    BNBToUSD = Number(res?.data.bids[0][0]);
    if (BNBToUSD) {
      await keyv.set(`USD_BNB_rate`, BNBToUSD, 1000 * 60 * 5);
    }
  }
  if (!BNBToUSD) {
    console.error('get BNB rate fail');
    return 1;
  }
  return BNBToUSD;
}

async function getBNBRate(coinRates) {
  const BNBToUSD = await getBNBToUSD();
  const uRate = coinRates['USD'];
  return (uRate / BNBToUSD).toFixed(6);
}

async function getBNBRates() {
  const cache = await keyv.get(`BNB_rates`);
  if (cache) return cache;
  const resp = await axios.get(`https://api.coinbase.com/v2/exchange-rates?currency=USD`);
  const data = resp.data?.data;
  const rates = data.rates;
  let metisExchangeRates = await getRates("metis");
  if (metisExchangeRates?.["USD"]) {
    let toMetis = 1 / Number(metisExchangeRates["USD"]);
    rates["METIS"] = String(toMetis);
  }
  const BNBToUSD = await getBNBToUSD();
  for (const symbol in rates) {
    try {
      rates[symbol] = (+rates[symbol] * BNBToUSD).toFixed(6);
    } catch (e) {
      console.log(e.message);
    }
  }
  await keyv.set(`BNB_rates`, rates, 1000 * 60 * 5);
  return rates;
}

async function getRates(currency) {
  if (currency === "BNB") {
    return await getBNBRates();
  }
  const resp = await axios.get(
    `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
  )
  const data = resp.data?.data
  // check
  if (!data || !equalsIgnoreCase(data.currency, currency) || !data.rates) {
    return undefined
  }
  try {
    data.rates["BNB"] = String(await getBNBRate(data.rates));
  } catch (e) {
    console.error('get BNB rates fail');
  }
  await keyv.set(`rate:${currency}`, data.rates, 1000 * 60 * 5); // true
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
