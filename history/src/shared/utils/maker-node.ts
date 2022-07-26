
import { equalsIgnoreCase, logger } from '.';
import { BigNumber } from 'bignumber.js'
// import * as dayjs from 'dayjs'
// import * as relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from './dayFormat'
import dayjs2 from './dayWithRelativeFormat'

import { getRAmountFromTAmount, pTextFormatZero, getToAmountFromUserAmount, getTAmountFromRAmount } from './core';
import axios from 'axios'
import { makerListHistory, makerList } from '../configs'
import { utils } from 'ethers'

// dayjs.extend(relativeTime)


async function getAllMakerList() {
  return makerList.concat(makerListHistory)
}
async function getMakerList() {
  return makerList
}

// ETH:18  USDC:6  USDT:6
const token2Decimals = {
  'ETH': 18,
  'USDC': 6,
  'USDT': 6
}
const CHAIN_INDEX = {
  1: 'eth',
  2: 'arbitrum',
  22: 'arbitrum',
  3: 'zksync',
  33: 'zksync',
  4: 'starknet',
  44: 'starknet',
  5: 'eth',
  6: 'polygon',
  66: 'polygon',
  7: 'optimism',
  77: 'optimism',
  8: 'immutablex',
  88: 'immutablex',
  9: 'loopring',
  99: 'loopring',
  10: 'metis',
  510: 'metis',
  11: 'dydx',
  511: 'dydx',
  12: 'zkspace',
  512: 'zkspace',
  13: 'boba',
  513: 'boba',
  514: 'zksync2',
}
const MAX_BITS = {
  eth: 256,
  arbitrum: 256,
  zksync: 35,
  zksync2: 256,
  starknet: 256,
  polygon: 256,
  optimism: 256,
  immutablex: 28,
  loopring: 256,
  metis: 256,
  dydx: 28,
  boba: 256,
  zkspace: 35,
}
const SIZE_OP = {
  P_NUMBER: 4,
}
function isChainSupport(chain) {
  if (parseInt(chain) == chain) {
    if (CHAIN_INDEX[chain] && MAX_BITS[CHAIN_INDEX[chain]]) {
      return true
    }
  } else {
    if (MAX_BITS[chain.toLowerCase()]) {
      return true
    }
  }
  return false
}
async function getTokenInfoNew(fromChainId, toChainId, tokenName) {
  // let decimals = -1
  let fromTokenName = ''
  let toTokenName = ''
  const makerList: any = await getMakerList()
  for(const item of makerList) {
    if (
      tokenName == item.tName && 
      ((item.c1ID == fromChainId && item.c2ID == toChainId) || (item.c2ID == fromChainId && item.c1ID == toChainId))
    ) {
      // decimals = item.precision
      fromTokenName = item.c1Name
      toTokenName = item.c2Name
      break
    }
  }
  // DO NOT USE here's decimals, use token2Decimals instead
  return { fromTokenName, toTokenName }
}

/**
 * 0 ~ (2 ** N - 1)
 * @param { any } chain
 * @returns { any }
 */
 function AmountRegion(chain): any {
  if (!isChainSupport(chain)) {
    return {
      error: 'The chain did not support',
    }
  }
  if (typeof chain === 'number') {
    let max = new BigNumber(2 ** MAX_BITS[CHAIN_INDEX[chain]] - 1)
    return {
      min: new BigNumber(0),
      max: max,
    }
  } else if (typeof chain === 'string') {
    let max = new BigNumber(2 ** MAX_BITS[chain.toLowerCase()] - 1)
    return {
      min: new BigNumber(0),
      max: max,
    }
  }
}
function AmountMaxDigits(chain) {
  let amountRegion = AmountRegion(chain)
  if (amountRegion?.error) {
    return amountRegion
  }
  return amountRegion.max.toFixed().length
}
function removeSidesZero(param) {
  if (typeof param !== 'string') {
    return 'param must be string'
  }
  return param?.replace(/^0+(\d)|(\d)0+$/gm, '$1$2')
}
function AmountValidDigits(chain, amount) {
  let amountMaxDigits = AmountMaxDigits(chain)
  if (amountMaxDigits.error) {
    return amountMaxDigits.error
  }
  let amountRegion = AmountRegion(chain)

  let ramount = removeSidesZero(amount?.toString())

  if (ramount.length > amountMaxDigits) {
    return 'amount is inValid'
  }
  //note:the compare is one by one,not all by all
  if (ramount > amountRegion.max.toFixed()) {
    return amountMaxDigits - 1
  } else {
    return amountMaxDigits
  }
}
function isLimitNumber(chain: string | number) {
  if (chain === 3 || chain === 33 || chain === 'zksync') {
    return true
  }
  if (chain === 8 || chain === 88 || chain === 'immutablex') {
    return true
  }
  if (chain === 11 || chain === 511 || chain === 'dydx') {
    return true
  }
  if (chain === 12 || chain === 512 || chain === 'zkspace') {
    return true
  }
  return false
}
function getPTextFromTAmount(chain, amount) {
  if (!isChainSupport(chain)) {
    return {
      state: false,
      error: 'The chain did not support',
    }
  }
  if (amount < 1) {
    return {
      state: false,
      error: "the token doesn't support that many decimal digits",
    }
  }
  //Get the effective number of digits
  let validDigit = AmountValidDigits(chain, amount) // 10 11
  var amountLength = amount?.toString()?.length || 0
  if (amountLength < SIZE_OP.P_NUMBER) {
    return {
      state: false,
      error: 'Amount size must be greater than pNumberSize',
    }
  }
  if (isLimitNumber(chain) && amountLength > validDigit) {
    let zkAmount = amount?.toString()?.slice(0, validDigit)
    let op_text = zkAmount.slice(-SIZE_OP.P_NUMBER)
    return {
      state: true,
      pText: op_text,
    }
  } else {
    let op_text = amount?.toString()?.slice(-SIZE_OP.P_NUMBER)
    return {
      state: true,
      pText: op_text,
    }
  }
}
function getAmountFlag(
  chainId: string | number,
  amount: string | number
): string {
  const rst = getPTextFromTAmount(chainId, amount)
  if (!rst.state) {
    return '0'
  }
  return (Number(rst.pText) % 9000) + ''
}
function expanPool(pool) {
  return {
    pool1: {
      makerAddress: pool.makerAddress,
      c1ID: pool.c1ID,
      c2ID: pool.c2ID,
      c1Name: pool.c1Name,
      c2Name: pool.c2Name,
      t1Address: pool.t1Address,
      t2Address: pool.t2Address,
      tName: pool.tName,
      minPrice: pool.c1MinPrice,
      maxPrice: pool.c1MaxPrice,
      precision: pool.precision,
      avalibleDeposit: pool.c1AvalibleDeposit,
      tradingFee: pool.c1TradingFee,
      gasFee: pool.c1GasFee,
      avalibleTimes: pool.c1AvalibleTimes,
    },
    pool2: {
      makerAddress: pool.makerAddress,
      c1ID: pool.c1ID,
      c2ID: pool.c2ID,
      c1Name: pool.c1Name,
      c2Name: pool.c2Name,
      t1Address: pool.t1Address,
      t2Address: pool.t2Address,
      tName: pool.tName,
      minPrice: pool.c2MinPrice,
      maxPrice: pool.c2MaxPrice,
      precision: pool.precision,
      avalibleDeposit: pool.c2AvalibleDeposit,
      tradingFee: pool.c2TradingFee,
      gasFee: pool.c2GasFee,
      avalibleTimes: pool.c2AvalibleTimes,
    },
  }
}
/**
 * Get target maker pool
 * @param makerAddress
 * @param tokenAddress
 * @param fromChainId
 * @param toChainId
 * @param transactionTime
 * @returns
 */
 async function getTargetMakerPool(
  makerAddress: string,
  tokenAddress: string,
  fromChainId: number,
  toChainId: number,
  transactionTime?: Date
) {
  if (!transactionTime) {
    transactionTime = new Date()
  }
  const transactionTimeStramp = parseInt(transactionTime.getTime() / 1000 + '')
  for (const maker of await getAllMakerList()) {
    const { pool1, pool2 } = expanPool(maker)
    if (
      pool1.makerAddress.toLowerCase() == makerAddress.toLowerCase() &&
      (equalsIgnoreCase(pool1.t1Address, tokenAddress) ||
        equalsIgnoreCase(pool1.t2Address, tokenAddress)) &&
      ((pool1.c1ID == fromChainId && pool1.c2ID == toChainId)) &&
      transactionTimeStramp >= pool1.avalibleTimes[0].startTime &&
      transactionTimeStramp <= pool1.avalibleTimes[0].endTime
    ) {
      return pool1
    }
    if (
      pool2.makerAddress.toLowerCase() == makerAddress.toLowerCase() &&
      (equalsIgnoreCase(pool1.t1Address, tokenAddress) ||
        equalsIgnoreCase(pool1.t2Address, tokenAddress)) &&
      ((pool2.c2ID == fromChainId && pool2.c1ID == toChainId)) &&
      transactionTimeStramp >= pool2.avalibleTimes[0].startTime &&
      transactionTimeStramp <= pool2.avalibleTimes[0].endTime
    ) {
      return pool2
    }
  }
  return undefined
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
  const resp = await axios.get(
    `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
  )
  const data = resp.data?.data
  // check
  if (!data || !equalsIgnoreCase(data.currency, currency) || !data.rates) {
    return undefined
  }
  return data.rates
}

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
    // errorLogger.error(error)
    logger.error(error)
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
 * Get return amount
 * @param fromChainID
 * @param toChainID
 * @param amountStr
 * @param pool
 * @param nonce
 * @returns
 */
 export function getAmountToSend(
  fromChainID: number,
  toChainID: number,
  amountStr: string,
  pool: { precision: number; tradingFee: number; gasFee: number },
  nonce: string | number
) {
  const realAmount = getRAmountFromTAmount(fromChainID, amountStr)
  if (!realAmount.state) {
    // errorLogger.error(realAmount.error)
    return
  }
  const rAmount = <any>realAmount.rAmount
  if (nonce > 8999) {
    // errorLogger.error('nonce too high, not allowed')
    return
  }
  var nonceStr = pTextFormatZero(nonce)
  var readyAmount = getToAmountFromUserAmount(
    new BigNumber(rAmount).dividedBy(new BigNumber(10 ** pool.precision)),
    pool,
    true
  )

  return getTAmountFromRAmount(toChainID, readyAmount, nonceStr)
}

const GAS_PRICE_PAID_RATE = { arbitrum: 0.8 } // arbitrum Transaction Fee = gasUsed * gasPrice * 0.8 (general)
export async function statisticsProfit(
  makerNode
): Promise<BigNumber> {
  let fromToCurrency = ''
  let fromToPrecision = 0
  let gasPrecision = 18 // gas default is eth, zksync is token

  const makerList: any = await getMakerList()
  for (const item of makerList) {
    if (!equalsIgnoreCase(item.makerAddress, makerNode.makerAddress)) {
      continue
    }

    if (
      equalsIgnoreCase(item.t1Address, makerNode.fromTokenAddress) ||
      equalsIgnoreCase(item.t2Address, makerNode.toTokenAddress)
    ) {
      fromToCurrency = item.tName
      fromToPrecision = item.precision
    }

    if (equalsIgnoreCase(item.tName, makerNode.gasCurrency)) {
      gasPrecision = item.precision
    }
  }

  if (fromToCurrency && Number(makerNode.toAmount) > 0) {
    const fromMinusToUsd = await exchangeToUsd(
      new BigNumber(makerNode.fromAmount)
        .minus(makerNode.toAmount)
        .dividedBy(10 ** fromToPrecision),
      fromToCurrency
    )

    let gasPricePaidRate = GAS_PRICE_PAID_RATE[CHAIN_INDEX[makerNode.toChain]] || 1
    const gasAmountUsd = await exchangeToUsd(
      new BigNumber(makerNode.gasAmount)
        .multipliedBy(gasPricePaidRate)
        .dividedBy(10 ** gasPrecision),
      makerNode.gasCurrency || ''
    )
    return fromMinusToUsd.minus(gasAmountUsd || 0)
  } else {
    return new BigNumber(0)
  }
}

export async function transforeUnmatchedTradding(list = []) {
  for (const item of list) {
    item['chainName'] = CHAIN_INDEX[item.chainId] || ''

    const decimals = token2Decimals[item.tokenAddress]

    item['amountFormat'] = 0
    if (decimals > -1) {
      item['amountFormat'] = new BigNumber(item.value).dividedBy(
        10 ** decimals
      )
    } else {
      logger.warn(`should add new token to decimal map.`)
    }

    // time ago
    item['txTimeAgo'] = '-'
    if (item.timestamp.getTime() > 0) {
      item['txTimeAgo'] = dayjs2().to(dayjs(new Date(item.timestamp).getTime()))
    }
  }
}

export async function transforeData(list = []) {
  // fill data
  for (const item of list) {
    // format tokenName and amounts
    const { fromTokenName, toTokenName } = await getTokenInfoNew(item.fromChain, item.toChain, item.tokenName)
    const decimals = token2Decimals[item.tokenName]
    item['fromChainName'] = CHAIN_INDEX[item.fromChain] || fromTokenName || ''
    item['toChainName'] = CHAIN_INDEX[item.toChain] || toTokenName || ''
    item.decimals = decimals
    item.toTx = item.toTx || '0x'

    if (decimals > -1) {
      item.fromAmountFormat = `${new BigNumber(item.fromValue).dividedBy(
        10 ** decimals
      )}`
      item.fromValueFormat = (+item.fromAmountFormat).toFixed(6)
      item.fromAmount = item.fromValue
      item.toAmountFormat = `${new BigNumber(item.toAmount).dividedBy(
        10 ** decimals
      )}`
    } else {
      logger.log(`[shared/utils/maker-node.ts transforeData] maker-node.ts should Synchronize！Error decimals!`)
      // tmp for show
      item.fromValueFormat = new BigNumber(+item.toAmount).dividedBy(
        10 ** 18
      ).toFixed(6)
    }

    // old logic: when not toTx, dashboard ToAmount shows: 0 (NeedTo: 0.009752000000000003)
    if (!item.toTx) {
      item.toAmount = "0"
      item.toAmountFormat = "0"
    }

    // const fromChainTokenInfo = await getTokenInfo(
    //   Number(item.fromChain),
    //   item.txToken
    // )
    // item['txTokenName'] = fromChainTokenInfo.tokenName
    // item['fromAmountFormat'] = 0
    // if (fromChainTokenInfo.decimals > -1) {
    //   item['fromAmountFormat'] = new BigNumber(item['fromAmount']).dividedBy(
    //     10 ** fromChainTokenInfo.decimals
    //   )
    // }
    // // to amounts
    // const toChainTokenInfo = await getTokenInfo(
    //   Number(item.fromChain),
    //   item.txToken
    // )
    // item['toAmountFormat'] = 0
    // if (toChainTokenInfo.decimals > -1) {
    //   item['toAmountFormat'] = new BigNumber(item['toAmount']).dividedBy(
    //     10 ** toChainTokenInfo.decimals
    //   )
    // }

    // Trade duration
    item['tradeDuration'] = 0

    // Time duration、time ago
    // const tmp = item.fromTimeStamp
    item.fromTimeStamp = item.fromTimeStamp && dayjs(item.fromTimeStamp).format('YYYY-MM-DD HH:mm:ss')
    item.toTimeStamp = item.toTimeStamp && dayjs(item.toTimeStamp).format('YYYY-MM-DD HH:mm:ss')
    const dayjsFrom: any = dayjs(item.fromTimeStamp)
    item['fromTimeStampAgo'] = dayjs2().to(dayjsFrom)
    item['toTimeStampAgo'] = '-'
    if (item.toTimeStamp && item.toTimeStamp != '0') {
      const dayjsTo = dayjs(item.toTimeStamp)
      item['toTimeStampAgo'] = dayjs2().to(dayjsTo)

      item['tradeDuration'] = dayjsTo.unix() - dayjsFrom.unix()
    }

    let needTo = {
      chainId: 0,
      amount: 0,
      decimals: 0,
      amountFormat: '',
      tokenAddress: '',
    }

    // old:
    // if (item.state == 1 || item.state == 20) {
    // new:
    // compare two transaction to computed the old state & FE's showed state
    /*
      0: { label: 'From: check', type: 'info' },
      1: { label: 'From: okay', type: 'warning' },
      2: { label: 'To: check', type: 'info' },
      3: { label: 'To: okay', type: 'success' },
      20: { label: 'To: failed', type: 'danger' },
    */
    let state = 20
    if (item.fromStatus == 0) {
      state = 0
    } else if (item.fromStatus == 1) {
      state = 1
    }
    if (item.status == 0) {
      if (item.fromStatus == 1) state = 2
    } else if (item.status == 1) {
      state = 3
    }
    if (state == 1 || state == 20) {
      const _fromChain = Number(item.fromChain)
      needTo.chainId = Number(
        getAmountFlag(_fromChain, item.fromAmount)
      )

      // find pool
      const pool = await getTargetMakerPool(
        item.makerAddress,
        item.txToken,
        _fromChain,
        needTo.chainId
      )

      // if not find pool, don't do it
      if (pool) {
        needTo.tokenAddress =
          needTo.chainId == pool.c1ID ? pool.t1Address : pool.t2Address

        needTo.amount =
          getAmountToSend(
            _fromChain,
            needTo.chainId,
            item.fromAmount,
            pool,
            item.formNonce
          )?.tAmount || 0
        needTo.decimals = pool.precision
        needTo.amountFormat = new BigNumber(needTo.amount)
          .dividedBy(10 ** pool.precision)
          .toString()
      }
    }
    item['needTo'] = needTo

    // Parse to dydx txExt
    if (item.fromExt && (item.toChain == '11' || item.toChain == '511')) {
      // const dydxHelper = new DydxHelper(Number(item.toChain))
      // item.fromExt['dydxInfo'] = dydxHelper.splitStarkKeyPositionId(
      //   item.fromExt.value
      // )
      const chainId = Number(item.toChain)
      const data = item.fromExt.value
      const starkKey = utils.hexDataSlice(data, 0, 32)
      const positionId = parseInt(utils.hexDataSlice(data, 32), 16)
      item.fromExt['dydxInfo'] = { starkKey, positionId: String(positionId) }
    }

    // Profit statistics
    // (fromAmount - toAmount) / token's rate - gasAmount/gasCurrency's rate
    item['profitUSD'] = (await statisticsProfit(item)).toFixed(3)

    // old logic: when not toTx, dashboard Profit shows: 0.000 USD
    if (item.profitUSD === 'NaN' || !item.toTx) {
      item.profitUSD = "0.000"
    }
  }
  return list
}
