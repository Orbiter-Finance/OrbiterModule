
import { equalsIgnoreCase, logger } from '.';
import { BigNumber } from 'bignumber.js'
import dayjs from './dayFormat'
import dayjs2 from './dayWithRelativeFormat'
import axios from 'axios'
import { getChainInfo, makerConfigs } from '../configs/index';
import { utils } from 'ethers'
import Keyv from 'keyv';
import { IMarket } from "../interfaces";

const keyv = new Keyv();

// ETH:18  USDC:6  USDT:6
const token2Decimals = {
  'ETH': 18,
  'USDC': 6,
  'USDT': 6,
  'DAI': 18
}


/**
 *
 * @param currency
 * @returns
 */
export async function cacheExchangeRates(currency = 'USD'): Promise<any> {
  // cache
  const exchangeRates = await getRates(currency);
  if (exchangeRates) {
    let metisExchangeRates = await getRates('metis');
    if (metisExchangeRates && metisExchangeRates[currency]) {
      let toMetis = 1 / Number(metisExchangeRates[currency]);
      exchangeRates["METIS"] = String(toMetis);
    }
    let bnbExchangeRates = await getRates('bnb');
    if (bnbExchangeRates && bnbExchangeRates[currency]) {
      let toBNB = 1 / Number(bnbExchangeRates[currency]);
      exchangeRates["BNB"] = String(toBNB);
    }
    return exchangeRates;
  } else {
    return undefined;
  }
}
export async function getRates(currency) {
    const cacheData = await keyv.get(`rates:${currency}`);
  if (cacheData) {
    return cacheData;
  }
  const resp = await axios.get(
    `https://api.coinbase.com/v2/exchange-rates?currency=${currency}&timestamp=${Date.now()}`,
  )
  const data = resp.data?.data
  // check
  if (!data || !equalsIgnoreCase(data.currency, currency) || !data.rates) {
    return undefined
  }
  await keyv.set(`rates:${currency}`, data.rates, 1000 * 60 * 5); // true
  return data.rates
}

// let exchangeRates: { [key: string]: string } | undefined

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
    const exchangeRates = await cacheExchangeRates(currency)
    if (exchangeRates?.[sourceCurrency]) {
      rate = Number(exchangeRates[sourceCurrency])
    }
  } catch (error) {
    // errorLogger.error(error)
    logger.error(error)
  }

  return new BigNumber(rate)
}

export async function getExchangeToSymbol(
    value,
    fromCurrency,
    toCurrency
): Promise<BigNumber> {
  fromCurrency = fromCurrency.toUpperCase();
  toCurrency = toCurrency.toUpperCase();
  let rate = new BigNumber(0);
  try {
    const exchangeRates = await cacheExchangeRates(toCurrency);
    if (exchangeRates?.[fromCurrency]) {
      rate = new BigNumber(Number(exchangeRates[fromCurrency]));
    }
  } catch (error) {
    logger.error('get rate error', error);
  }

  if (!(value instanceof BigNumber)) {
    value = new BigNumber(value);
  }

  return value.dividedBy(rate);
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

const GAS_PRICE_PAID_RATE = { 2: 0.8 }; // arbitrum Transaction Fee = gasUsed * gasPrice * 0.8 (general)
export async function statisticsProfit(
    makerNode,
    market: IMarket
): Promise<string> {
  const toSymbol = market?.toChain?.symbol;
  if (market && Number(makerNode.toAmount) > 0) {
    const fromSymbol = market.fromChain.symbol;
    const fromValue = await getExchangeToSymbol(
        new BigNumber(makerNode.fromAmount)
            .dividedBy(10 ** market.fromChain.decimals),
        fromSymbol, toSymbol);

    const toValue = new BigNumber(makerNode.toAmount)
        .dividedBy(10 ** market.toChain.decimals);

    let profit = fromValue.minus(toValue);

    if (makerNode.gasAmount) {
      const gasPricePaidRate = GAS_PRICE_PAID_RATE[makerNode.toChain] || 1;
      const toChainInfo = getChainInfo(market.toChain.id);
      // let mainSymbol = toChainInfo.nativeCurrency?.symbol || 'ETH';
      let mainDecimals: number = toChainInfo.nativeCurrency.decimals || 18;
      if (market.toChain.id === 6 || market.toChain.id === 66) {
        // mainSymbol = 'MATIC';
        mainDecimals = 18;
      }
      if (market.toChain.id === 3 || market.toChain.id === 33) {
        // mainSymbol = toSymbol;
        mainDecimals = market.toChain.decimals;
      }
      const gas = await getExchangeToSymbol(
          new BigNumber(makerNode.gasAmount)
              .multipliedBy(gasPricePaidRate)
              .dividedBy(10 ** mainDecimals),
          makerNode.gasCurrency, toSymbol);
      profit = profit.minus(gas || 0);
    }

    const profitToUsd = await exchangeToUsd(
        profit,
        toSymbol
    );

    return profitToUsd.toFixed(3);
  } else {
    return '0.000';
  }
}

// old logic use makerList
export async function statisticsProfitOld(
  makerNode
): Promise<BigNumber> {
  let fromToCurrency = '';
  let fromToPrecision = 0;
  let gasPrecision = 18; // gas default is eth, zksync is token

  for (const item of makerConfigs) {
    if (!equalsIgnoreCase(item.recipient, makerNode.makerAddress)) {
      continue;
    }

    if (equalsIgnoreCase(item.toChain.tokenAddress, makerNode.txToken)) {
      fromToCurrency = item.toChain.symbol;
      fromToPrecision = item.toChain.decimals;
    }

    if (equalsIgnoreCase(item.toChain.symbol, makerNode.gasCurrency)) {
      gasPrecision = item.toChain.decimals;
    }
  }

  if (fromToCurrency && Number(makerNode.toAmount) > 0) {
    let fromMinusToUsd = await exchangeToUsd(
        new BigNumber(makerNode.fromAmount)
            .minus(makerNode.toAmount)
            .dividedBy(10 ** fromToPrecision),
        fromToCurrency
    );

    let gasPricePaidRate = 1
    if (GAS_PRICE_PAID_RATE[makerNode.toChain]) {
      gasPricePaidRate = GAS_PRICE_PAID_RATE[makerNode.toChain]
    }

    if (makerNode.gasCurrency) {
      const gasAmountUsd = await exchangeToUsd(
        new BigNumber(makerNode.gasAmount)
          .multipliedBy(gasPricePaidRate)
          .dividedBy(10 ** gasPrecision),
        makerNode.gasCurrency
      )
      return fromMinusToUsd.minus(gasAmountUsd || 0)
    }

    return fromMinusToUsd;
  } else {
    return new BigNumber(0)
  }
}

export async function transforeUnmatchedTradding(list = []) {
  for (const item of list) {
    item['chainName'] = await getChainName(item.chainId)

    const decimals = token2Decimals[item.tokenName]

    item['amountFormat'] = 0
    if (decimals > -1) {
      item['amountFormat'] = new BigNumber(item.value).dividedBy(
        10 ** decimals
      )
    } else {
      logger.log(`[shared/utils/maker-node.ts transforeData] maker-node.ts should Synchronize！Error decimals!`)
    }

    // time ago
    item['txTimeAgo'] = '-'
    if (item.timestamp.getTime() > 0) {
      item['txTimeAgo'] = dayjs2().to(dayjs(new Date(item.timestamp).getTime()))
    }
  }
}
/**
 * @deprecated
 * @param chainId 
 * @returns 
 */
async function getChainName(chainId: string) {
  let market = makerConfigs.find(item => item.fromChain.id === +chainId);
  if (market?.fromChain?.name) {
    return market.fromChain.name;
  }
  market = makerConfigs.find(item => item.toChain.id === +chainId);
  if (market?.toChain?.name) {
    return market.toChain.name;
  }
  return '';
}
export async function transforeData(list = []) {
  // fill data
  for (const item of list) {
    // format tokenName and amounts
    const decimals = token2Decimals[item.tokenName]
    item['fromChainName'] = await getChainName(item.fromChain)
    item['toChainName'] = await getChainName(item.toChain)
    item.toAmount = item.toValue || item.toAmount;
    item.decimals = decimals
    item.toTx = item.toTx || '0x'
    if (decimals > -1) {
      item.fromAmountFormat = `${new BigNumber(item.fromValue).dividedBy(
        10 ** decimals
      )}`
      item.fromValueFormat = (+item.fromAmountFormat).toFixed(6)
      item.fromAmount = item.fromValue
    } else {
      logger.log(`[shared/utils/maker-node.ts transforeData] maker-node.ts should Synchronize！Error decimals!`)
      // tmp for show
      item.fromValueFormat = new BigNumber(+item.toAmount).dividedBy(
        10 ** 18
      ).toFixed(6)
    }

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


    let market: IMarket;
    try {
      const extra: any = JSON.parse(item.extra);
      item.toSymbol = extra?.toSymbol || item.tokenName;
      market = makerConfigs.find(cfg =>
          cfg.fromChain.id == item['fromChain'] &&
          cfg.fromChain.symbol == item['tokenName'] &&
          cfg.toChain.id == item['toChain'] &&
          cfg.toChain.symbol == item.toSymbol);

      if (extra?.xvm?.params?.data?.expectValue) {
        if (!item.toValue) {
          item.toAmount = extra.xvm.params.data.expectValue;
          item.extValueFormat =`${new BigNumber(extra.xvm.params.data.expectValue).dividedBy(
              10 ** market.toChain.decimals
          )}`;
        }
      }
      delete item.extra;
    } catch (e) {
      console.log(e);
    }

    if (market) {
      item.needTo = {
        chainId: market.toChain.id,
        decimals: market.toChain.decimals,
        tokenAddress: market.toChain.tokenAddress,
        amount: item.toAmount,
        amountFormat: `${new BigNumber(item.toAmount).dividedBy(
            10 ** market.toChain.decimals
        )}`,
      };

      const fromValue: string = String(item.fromValue);
      item.needBack = {
        chainId: market.fromChain.id,
        decimals: market.fromChain.decimals,
        tokenAddress: market.fromChain.tokenAddress,
        amount: fromValue,
        amountFormat: `${new BigNumber(fromValue).dividedBy(
            10 ** market.fromChain.decimals
        )}`
      };

      item.toAmountFormat = `${new BigNumber(item.toAmount).dividedBy(
          10 ** market.toChain.decimals
      )}`;
    }


    // Parse to dydx txExt
    if (item.fromExt && (item.toChain == '11' || item.toChain == '511')) {
      const data = item.fromExt.value
      const starkKey = utils.hexDataSlice(data, 0, 32)
      const positionId = parseInt(utils.hexDataSlice(data, 32), 16)
      item.fromExt['dydxInfo'] = { starkKey, positionId: String(positionId) }
    }
    // Profit statistics
    // (fromAmount - toAmount) / token's rate - gasAmount/gasCurrency's rate
    if (!item.toValue)
      item['profit'] = '0.000';
    else
      item['profit'] = await statisticsProfit(item, market);
  }
  return list
}
