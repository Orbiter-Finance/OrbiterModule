import chainMain from './chain.json'
import chainTest from './chainTest.json'
import http from "@/plugins/axios";
import { $env as env } from '../env';

export const isProd = () => process.env.VUE_APP_ENV === 'production';
const maker = require(`./${isProd() ? `maker.json` : `makerTest.json`}`)
const cacheMaker = JSON.parse(localStorage.getItem('netWorkMaker') || '{}')
let chain = isProd() ? chainMain : chainTest
let chainConfig = []
let makerConfigs = []
let v1MakerConfigs = []

function convertMakerConfig(maker) {
  chainConfig = [...chain].map((item) => {
    if (process.env[`VUE_APP_CHAIN_API_KEY_${item.internalId}`]) {
      item.api = item.api || {}
      item.api.key = process.env[`VUE_APP_CHAIN_API_KEY_${item.internalId}`]
    }
    return item
  })
  // sort
  const makerArr = []
  for (const makerAddress in maker) {
    makerArr.push({ key: makerAddress, value: maker[makerAddress] })
  }
  const sortMaker = {}
  for (const data of makerArr.sort(function () {
    return Math.random() - 0.5
  })) {
    sortMaker[data.key] = data.value
  }
  const chainList = chainConfig
  const configs = []
  const v1MakerConfigsTmp = []
  const getChainTokenList = (chain) => {
    return chain.nativeCurrency
        ? [chain.nativeCurrency, ...chain.tokens]
        : [...chain.tokens]
  }
  for (const makerAddress in sortMaker) {
    const makerMap = maker[makerAddress]
    for (const chainIdPair in makerMap) {
      if (!makerMap.hasOwnProperty(chainIdPair)) continue
      const symbolPairMap = makerMap[chainIdPair]
      const [fromChainId, toChainId] = chainIdPair.split('-')
      // Temporary offline configuration
      const offlineList = [12, 13]
      if (
          offlineList.find((item) => +item === +fromChainId) ||
          offlineList.find((item) => +item === +toChainId)
      ) {
        continue
      }
      const c1Chain = chainList.find(
          (item) => +item.internalId === +fromChainId
      )
      const c2Chain = chainList.find((item) => +item.internalId === +toChainId)
      if (!c1Chain || !c2Chain) continue
      for (const symbolPair in symbolPairMap) {
        if (!symbolPairMap.hasOwnProperty(symbolPair)) continue
        const makerData = symbolPairMap[symbolPair]
        const [fromChainSymbol, toChainSymbol] = symbolPair.split('-')
        const fromTokenList = getChainTokenList(c1Chain)
        const toTokenList = getChainTokenList(c2Chain)
        const fromToken = fromTokenList.find(
            (item) => item.symbol === fromChainSymbol
        )
        const toToken = toTokenList.find(
            (item) => item.symbol === toChainSymbol
        )
        if (!fromToken || !toToken) continue
        const config = {
          id: '',
          makerId: '',
          ebcId: '',
          slippage: makerData.slippage || 0,
          recipient: makerAddress,
          sender: makerData.sender,
          tradingFee: makerData.tradingFee,
          gasFee: makerData.gasFee,
          fromChain: {
            id: +fromChainId,
            name: c1Chain.name,
            tokenAddress: fromToken.address,
            symbol: fromChainSymbol,
            decimals: fromToken.decimals,
            minPrice: makerData.minPrice,
            maxPrice: makerData.maxPrice,
          },
          toChain: {
            id: +toChainId,
            name: c2Chain.name,
            tokenAddress: toToken.address,
            symbol: toChainSymbol,
            decimals: toToken.decimals,
          },
          times: [makerData.startTime, makerData.endTime],
          crossAddress: {
            recipient: makerData.crossAddress?.makerAddress,
            sender: makerData.crossAddress?.sender,
            tradingFee: makerData.crossAddress?.tradingFee,
            gasFee: makerData.crossAddress?.gasFee,
          },
        }
        // handle makerConfigs
        configs.push(config)
        // v1 maker configs
        if (fromChainSymbol === toChainSymbol) {
          v1MakerConfigsTmp.push(config)
        }
      }
    }
  }
  v1MakerConfigs = v1MakerConfigsTmp
  makerConfigs = configs
  return { chainConfig, v1MakerConfigs, makerConfigs }
}

convertMakerConfig(maker)

const isSensitive = window.location.host == "rinkeby_dashboard.orbiter.finance";
// const isSensitive = window.location.host == "localhost:8080";

export default { chainConfig, makerConfigs, isSensitive };
