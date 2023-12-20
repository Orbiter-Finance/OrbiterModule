
import { equalsIgnoreCase, logger } from '.';
import { BigNumber } from 'bignumber.js'
import dayjs from './dayFormat'
import dayjs2 from './dayWithRelativeFormat'
import axios from 'axios'
import { utils } from 'ethers'
import * as Keyv from 'keyv';
import { makerList } from "../configs";
const keyv = new Keyv();

async function getAllMakerList() {
  return makerList;
  // return await convertMakerList();
}
async function getMakerList() {
  return makerList;
  // return await convertMakerList();
}

export interface IChainCfg {
  name: string;
  chainId: string;
  internalId: string;
  networkId?: string;
  rpc: string[];
  api?: {
    url: string;
    key?: string;
    intervalTime?: number;
  };
  debug?: boolean;
  nativeCurrency: IToken;
  watch?: string[];
  explorers?: any[];
  tokens: IToken[];
  contracts?: string[];
  xvmList?: string[];
  workingStatus?: any;
  infoURL?: string;
}

export interface IToken {
  id?: number;
  name: string;
  symbol: string;
  decimals: 18;
  address: string;
  mainCoin?: boolean;
}

export interface IMakerCfg {
  [makerAddress: string]: {
    [chainIdPair: string]: {
      [symbolPair: string]: IMakerDataCfg;
    };
  };
}

export interface IMakerDataCfg {
  makerAddress: string;
  sender: string;
  gasFee: number;
  tradingFee: number;
  maxPrice: number;
  minPrice: number;
  slippage: number;
  startTime: number;
  endTime: number;
  crossAddress?: {
    makerAddress: string;
    sender: string;
    gasFee: number;
    tradingFee: number;
  };
}

export interface IMaker {
  makerAddress: string;
  c1ID: number;
  c2ID: number;
  c1Name: string;
  c2Name: string;
  t1Address: string;
  t2Address: string;
  tName: string;
  c1MinPrice: number;
  c1MaxPrice: number;
  c2MinPrice: number;
  c2MaxPrice: number;
  precision: number;
  c1TradingFee: number;
  c2TradingFee: number;
  c1GasFee: number;
  c2GasFee: number;
  c1AvalibleTimes: [
    {
      startTime: number;
      endTime: number;
    },
  ];
  c2AvalibleTimes: [
    {
      startTime: number;
      endTime: number;
    },
  ];
}

export async function convertMakerList(): Promise<IMaker[]> {
  const cacheData = await keyv.get(`maker`);
  if (cacheData) {
    return cacheData;
  }
  await new Promise(resolve => setTimeout(resolve, 1500));
  const chainList: IChainCfg[] = await getChainList();
  const makerCfgMap: IMakerCfg[] = await getMakerCfgMap();
  const v1makerList: IMaker[] = [];

  for (const chain of chainList) {
    if (chain.tokens && chain.nativeCurrency) {
      chain.tokens.push(chain.nativeCurrency);
    }
  }

  for (const makerAddress in makerCfgMap) {
    const makerMap = makerCfgMap[makerAddress];
    for (const chainIdPair in makerMap) {
      if (!makerMap.hasOwnProperty(chainIdPair)) continue;
      const symbolPairMap = makerMap[chainIdPair];
      const [fromChainId, toChainId] = chainIdPair.split("-");
      const c1Chain = chainList.find(item => +item.internalId === +fromChainId);
      const c2Chain = chainList.find(item => +item.internalId === +toChainId);
      if (!c1Chain) {
        continue;
      }
      if (!c2Chain) {
        continue;
      }
      for (const symbolPair in symbolPairMap) {
        if (!symbolPairMap.hasOwnProperty(symbolPair)) continue;
        const makerData: any = symbolPairMap[symbolPair];
        const [fromChainSymbol, toChainSymbol] = symbolPair.split("-");
        // handle v1makerList
        if (fromChainSymbol === toChainSymbol) {
          handleV1MakerList(symbolPair, fromChainSymbol, toChainId, fromChainId, c1Chain, c2Chain, makerData);
        }
      }
    }

    function handleV1MakerList(symbolPair: string, symbol: string,
                               toChainId: string, fromChainId: string,
                               c1Chain: IChainCfg, c2Chain: IChainCfg,
                               c1MakerData: IMakerDataCfg) {
      // duplicate removal
      if (v1makerList.find(item =>
          item.c1ID === +toChainId && item.c2ID === +fromChainId &&
          item.tName === symbol)) {
        return;
      }
      const c1Token = c1Chain.tokens.find(item => item.symbol === symbol);
      const c2Token = c2Chain.tokens.find(item => item.symbol === symbol);
      if (!c1Token) {
        return;
      }
      if (!c2Token) {
        return;
      }
      // reverse chain data
      let reverseSymbolPairMap: any = {};
      const reverseChainIdPair = `${toChainId}-${fromChainId}`;
      if (!makerMap.hasOwnProperty(reverseChainIdPair)) {
        reverseSymbolPairMap = makerMap[`${fromChainId}-${toChainId}`];
      } else {
        reverseSymbolPairMap = makerMap[reverseChainIdPair];
      }
      if (!reverseSymbolPairMap.hasOwnProperty(symbolPair)) return;
      const c2MakerData: IMakerDataCfg = reverseSymbolPairMap[symbolPair];
      c1MakerData.makerAddress = c2MakerData.makerAddress = makerAddress;
      if (c1MakerData.makerAddress === c2MakerData.makerAddress) {
        v1makerList.push({
          makerAddress: c1MakerData.makerAddress,
          c1ID: +fromChainId,
          c2ID: +toChainId,
          c1Name: c1Chain.name,
          c2Name: c2Chain.name,
          t1Address: c1Token.address,
          t2Address: c2Token.address,
          tName: symbol,
          c1MinPrice: c1MakerData.minPrice,
          c1MaxPrice: c1MakerData.maxPrice,
          c2MinPrice: c2MakerData.minPrice,
          c2MaxPrice: c2MakerData.maxPrice,
          precision: c1Token.decimals,
          c1TradingFee: c1MakerData.tradingFee,
          c2TradingFee: c2MakerData.tradingFee,
          c1GasFee: c1MakerData.gasFee,
          c2GasFee: c2MakerData.gasFee,
          c1AvalibleTimes: [
            {
              startTime: c1MakerData.startTime,
              endTime: c1MakerData.endTime,
            },
          ],
          c2AvalibleTimes: [
            {
              startTime: c2MakerData.startTime,
              endTime: c2MakerData.endTime,
            },
          ],
        });
      }
    }
  }

  const allMakerList: IMaker[] = JSON.parse(JSON.stringify(makerList));
  for (const maker of v1makerList) {
    if (!(<IMaker[]>makerList).find(item =>
        (Number(item.c1ID) === Number(maker.c1ID) && Number(item.c2ID) === Number(maker.c2ID) && item.tName === maker.tName) ||
        (Number(item.c2ID) === Number(maker.c1ID) && Number(item.c1ID) === Number(maker.c2ID) && item.tName === maker.tName))
    ) {
      allMakerList.push(maker);
    }
  }

  await keyv.set(`maker`, allMakerList, 1000 * 60 * 10);
  return allMakerList;
}

async function getChainList() {
  const resp = await axios.get(
      `http://openapi.orbiter.finance/mainnet/v1/config/chain`,
  );
  return resp.data?.result;
}

async function getMakerCfgMap() {
  const resp = await axios.get(
      `http://openapi.orbiter.finance/mainnet/v1/config/maker`,
  );
  return resp.data?.result;
}

// ETH:18  USDC:6  USDT:6
const token2Decimals = {
  'BNB': 18,
  'ETH': 18,
  'USDC': 6,
  'USDT': 6,
  'DAI': 18
}

export async function cacheExchangeRates(currency = 'USD'): Promise<any> {
  const exchangeRates = await getRates(currency);
  if (exchangeRates) {
    let metisExchangeRates = await getRates("metis");
    if (metisExchangeRates?.[currency]) {
      let toMetis = 1 / Number(metisExchangeRates[currency]);
      exchangeRates["METIS"] = String(toMetis);
    }

    return exchangeRates;
  } else {
    return null;
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

export async function getRates(currency) {
  currency = currency || 'USD';
  if (currency === "BNB") {
    return await getBNBRates();
  }
  // rates test
  // return (require("./rates"))["default"];
    const cacheData = await keyv.get(`rate:${currency}`);
  if (cacheData) {
    try {
      cacheData["BNB"] = String(await getBNBRate(cacheData));
    } catch (e) {
      console.error('get BNB rates fail');
    }
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
  try {
    data.rates["BNB"] = String(await getBNBRate(data.rates));
  } catch (e) {
    console.error('get BNB rates fail');
  }
  await keyv.set(`rate:${currency}`, data.rates, 1000 * 60 * 5); // true
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

const GAS_PRICE_PAID_RATE = {}
export async function statisticsProfit(
  makerNode
): Promise<BigNumber> {
  if (makerNode.tokenName === 'USDC' || makerNode.tokenName === 'USDT') {
    return statisticsProfitOld(makerNode)
  }
  let fromToPrecision = token2Decimals[makerNode.tokenName] || 18
  let gasPrecision = token2Decimals[makerNode.tokenName] || 18 // gas default is eth, zksync is token

  if (makerNode.tokenName && Number(makerNode.toAmount) > 0) {
    const fromMinusToUsd = await exchangeToUsd(
      new BigNumber(makerNode.fromAmount)
        .minus(makerNode.toAmount)
        .dividedBy(10 ** fromToPrecision),
      makerNode.tokenName
    )
    let gasPricePaidRate = GAS_PRICE_PAID_RATE[makerNode.toChain] || 1
    if (makerNode.gasCurrency) {
      const gasAmountUsd = await exchangeToUsd(
        new BigNumber(makerNode.gasAmount)
          .multipliedBy(gasPricePaidRate)
          .dividedBy(10 ** gasPrecision),
        makerNode.gasCurrency || ''
      )
      return fromMinusToUsd.minus(gasAmountUsd || 0)
    }
    return fromMinusToUsd;
  } else {
    return new BigNumber(0)
  }
}

// old logic use makerList
export async function statisticsProfitOld(
  makerNode
): Promise<BigNumber> {
  let fromToCurrency = ''
  let fromToPrecision = 0
  let gasPrecision = 18 // gas default is eth, zksync is token

  const makerList = await getMakerList()
  for (const item of makerList) {
    // if (!equalsIgnoreCase(item.makerAddress, makerNode.makerAddress)) {
    //   continue
    // }

    if (
      equalsIgnoreCase(item.t1Address, makerNode.txToken) ||
      equalsIgnoreCase(item.t2Address, makerNode.txToken)
    ) {
      fromToCurrency = item.tName
      fromToPrecision = item.precision
    }

    if (equalsIgnoreCase(item.tName, makerNode.gasCurrency)) {
      gasPrecision = item.precision
    }
  }

  let fromPrecision = fromToPrecision;
  let toPrecision = fromToPrecision;
  if (+makerNode.fromChain === 15) {
    fromPrecision = 18;
  } else {
    fromPrecision = token2Decimals[fromToCurrency];
  }
  if (+makerNode.toChain === 15) {
    toPrecision = 18;
  } else {
    toPrecision = token2Decimals[fromToCurrency];
  }

  if (fromToCurrency && Number(makerNode.toAmount) > 0) {
    let fromMinusToUsd = await exchangeToUsd(
      new BigNumber(makerNode.fromAmount).dividedBy(10 ** fromPrecision)
        .minus(
          new BigNumber(makerNode.toAmount).dividedBy(10 ** toPrecision)
        ),
      fromToCurrency
    )

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
  // Temporarily, the public chain name can be obtained from chaincore
  switch (String(chainId)) {
    case "16":
      return 'Nova';
    // oether
  }
  const makerList = await getAllMakerList();
  const row1 = makerList.find(row => String(row.c1ID) == String(chainId));
  if (row1) {
    return row1.c1Name;
  }
  const row2 = makerList.find(row => String(row.c2ID) == String(chainId));
  if (row2) {
    return row2.c2Name;
  }
  return '';
}
export async function transforeData(list = []) {
  // fill data
  const makerList = await getAllMakerList();
  for (const item of list) {
    // format tokenName and amounts
    let fromDecimals = token2Decimals[item.tokenName]
    let toDecimals = token2Decimals[item.tokenName]
    if (+item.fromChain === 15 || +item.fromChain === 38) {
      fromDecimals = 18
    }
    if (+item.toChain === 15 || +item.toChain === 38) {
      toDecimals = 18
    }
    item['fromChainName'] = await getChainName(item.fromChain)
    item['toChainName'] = await getChainName(item.toChain)
    item.decimals = fromDecimals
    item.toTx = item.toTx || '0x'
    if (fromDecimals > -1) {
      item.fromAmountFormat = `${new BigNumber(item.fromValue).dividedBy(
        10 ** fromDecimals
      )}`
      item.fromValueFormat = (+item.fromAmountFormat).toFixed(6)
      item.fromAmount = item.fromValue
      item.toAmountFormat = `${new BigNumber(item.toAmount).dividedBy(
        10 ** toDecimals
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
      chainId: item['toChain'],
      amount: item['toAmount'],
      decimals: 0,
      amountFormat: item['toAmountFormat'],
      tokenAddress: '',
    }
    const market = makerList.find(row => {
      return (row.c1ID == item['fromChain'] && row.c2ID == item['toChain'] && row['tName'] == item['tokenName'])
        || (row.c1ID == item['toChain'] && row.c2ID == item['fromChain'] && row['tName'] == item['tokenName'])
    });
    if (market) {
      if (market.c1ID == item['fromChain']) {
        needTo.decimals = fromDecimals;
        needTo.tokenAddress = market.t2Address;
      } else if (market.c2ID == item['fromChain']) {
        needTo.decimals = toDecimals;
        needTo.tokenAddress = market.t1Address;
      }
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

      // const _fromChain = Number(item.fromChain)
      // needTo.chainId = Number(
      //   getAmountFlag(_fromChain, item.fromAmount)
      // )

      // find pool
      // const pool = await getTargetMakerPool(
      //   item.makerAddress,
      //   item.txToken,
      //   _fromChain,
      //   needTo.chainId
      // )

      // // if not find pool, don't do it
      // if (pool) {
      //   needTo.tokenAddress =
      //     needTo.chainId == pool.c1ID ? pool.t1Address : pool.t2Address

      //   needTo.amount =
      //     Number(getAmountToSend(
      //       _fromChain,
      //       needTo.chainId,
      //       item.fromAmount,
      //       pool,
      //       item.formNonce
      //     )?.tAmount || 0)
      //   needTo.decimals = pool.precision
      //   needTo.amountFormat = new BigNumber(needTo.amount)
      //     .dividedBy(10 ** pool.precision)
      //     .toString()
      // }
    }
    item['needTo'] = needTo

    // Parse to dydx txExt
    if (item.fromExt && (item.toChain == '11' || item.toChain == '511')) {
      // const dydxHelper = new DydxHelper(Number(item.toChain))
      // item.fromExt['dydxInfo'] = dydxHelper.splitStarkKeyPositionId(
      //   item.fromExt.value
      // )
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
