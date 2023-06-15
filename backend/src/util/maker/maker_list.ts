import chains from "../../config/chains.json";
import makerJson from "./maker.json";
import { privateMakerList } from "./maker_list_private";

// reserved chain : reserved symbol
const openMaker = {
  "0x80C67432656d59144cEFf962E8fAF8926599bCF8": "*:*",
  // "0xE4eDb277e41dc89aB076a1F049f4a3EfA700bCE8": "*:ETH",
  // "0xee73323912a4e3772B74eD0ca1595a152b0ef282": "14:ETH",
  // "0x0a88BC5c32b684D467b43C06D9e0899EfEAF59Df": "14:ETH",
};

function convertMakerList(chainList: IChainCfg[], makerMap: IMakerCfg): IMaker[] {
  const v1makerList: any[] = [];
  const noMatchMap: any = {};

  for (const chain of chainList) {
    if (chain.tokens && chain.nativeCurrency) {
      chain.tokens.push(chain.nativeCurrency);
    }
  }

  for (const chainIdPair in makerMap) {
    if (!makerMap.hasOwnProperty(chainIdPair)) continue;
    const symbolPairMap = makerMap[chainIdPair];
    const [fromChainId, toChainId] = chainIdPair.split("-");
    const c1Chain = chainList.find(item => +item.internalId === +fromChainId);
    const c2Chain = chainList.find(item => +item.internalId === +toChainId);
    if (!c1Chain) {
      noMatchMap[fromChainId] = {};
      continue;
    }
    if (!c2Chain) {
      noMatchMap[toChainId] = {};
      continue;
    }
    for (const symbolPair in symbolPairMap) {
      if (!symbolPairMap.hasOwnProperty(symbolPair)) continue;
      const makerData: IMakerDataCfg = symbolPairMap[symbolPair];
      const [fromChainSymbol, toChainSymbol] = symbolPair.split("-");
      // handle v1makerList
      if (fromChainSymbol === toChainSymbol) {
        handleV1MakerList(symbolPair, fromChainSymbol, toChainId, fromChainId, c1Chain, c2Chain, makerData);
      }
    }
  }

  function handleV1MakerList(
      symbolPair: string,
      symbol: string,
      toChainId: string,
      fromChainId: string,
      c1Chain: IChainCfg,
      c2Chain: IChainCfg,
      c1MakerData: IMakerDataCfg,
  ) {
    // duplicate removal
    if (v1makerList.find(item => item.c1ID === +toChainId && item.c2ID === +fromChainId && item.tName === symbol)) {
      return;
    }
    const c1Token = c1Chain.tokens.find(item => item.symbol === symbol);
    const c2Token = c2Chain.tokens.find(item => item.symbol === symbol);
    if (!c1Token) {
      noMatchMap[fromChainId] = noMatchMap[fromChainId] || {};
      noMatchMap[fromChainId][symbol] = 1;
      return;
    }
    if (!c2Token) {
      noMatchMap[toChainId] = noMatchMap[toChainId] || {};
      noMatchMap[toChainId][symbol] = 1;
      return;
    }
    // single
    const singleList = [4];

    // reverse chain data
    const reverseChainIdPair = `${toChainId}-${fromChainId}`;
    if (!makerMap.hasOwnProperty(reverseChainIdPair)) {
      if (singleList.find(item => +item === +toChainId || +item === +fromChainId)) {
        makerMap[reverseChainIdPair] = makerMap[reverseChainIdPair] || {};
        makerMap[reverseChainIdPair][symbolPair] = JSON.parse(JSON.stringify(c1MakerData));
        // console.log("single --->", reverseChainIdPair, symbolPair);
      } else {
        return;
      }
    }
    const reverseSymbolPairMap = makerMap[reverseChainIdPair];
    if (!reverseSymbolPairMap.hasOwnProperty(symbolPair)) {
      if (singleList.find(item => +item === +toChainId || +item === +fromChainId)) {
        makerMap[reverseChainIdPair] = makerMap[reverseChainIdPair] || {};
        makerMap[reverseChainIdPair][symbolPair] = JSON.parse(JSON.stringify(c1MakerData));
        // console.log("single --->", reverseChainIdPair, symbolPair);
      } else {
        return;
      }
    }
    const c2MakerData: IMakerDataCfg = reverseSymbolPairMap[symbolPair];
    const chainNameMap = {
      1: "mainnet",
      2: "arbitrum",
      3: "zksync",
      4: "starknet",
      6: "polygon",
      7: "optimism",
      8: "immutableX",
      9: "loopring",
      10: "metis",
      11: "dydx",
      12: "zkspace",
      13: "boba",
      14: "zksync2",
      15: "bnbchain",
      16: "arbitrum_nova",
      17: "polygon_evm",
    };
    if (!chainNameMap[+fromChainId] || !chainNameMap[+toChainId]) {
      console.error("fromChainId error", fromChainId);
      throw new Error();
    }
    if (c1MakerData.sender === c2MakerData.sender || Number(fromChainId) == 4) {
      v1makerList.push({
        makerAddress: c1MakerData.sender.toLowerCase(),
        c1ID: +fromChainId,
        c2ID: +toChainId,
        c1Name: chainNameMap[+fromChainId],
        c2Name: chainNameMap[+toChainId],
        // c1Name: c1Chain.name,
        // c2Name: c2Chain.name,
        t1Address: c1Token.address.toLowerCase(),
        t2Address: c2Token.address.toLowerCase(),
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
        c1AvalibleDeposit: 1000,
        c2AvalibleDeposit: 1000,
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

  return v1makerList;
}

const baseMakerList = convertMakerList(<any>chains, <any>makerJson);

for (const maker of privateMakerList) {
  if (!baseMakerList.find(item =>
      item.makerAddress.toLowerCase() === maker.makerAddress.toLowerCase() &&
      ((item.c1ID === maker.c1ID && item.c2ID === maker.c2ID &&
              item.c1Name === maker.c1Name && item.c2Name === maker.c2Name &&
              item.tName === maker.tName &&
              item.t1Address.toLowerCase() === maker.t1Address.toLowerCase() && item.t2Address.toLowerCase() === maker.t2Address.toLowerCase() &&
              item.c1GasFee === maker.c1GasFee && item.c2GasFee === maker.c2GasFee &&
              item.c1TradingFee === maker.c1TradingFee && item.c2TradingFee === maker.c2TradingFee)
          ||
          (item.c1ID === maker.c2ID && item.c2ID === maker.c1ID &&
              item.c1Name === maker.c2Name && item.c2Name === maker.c1Name &&
              item.tName === maker.tName &&
              item.t1Address.toLowerCase() === maker.t2Address.toLowerCase() && item.t2Address.toLowerCase() === maker.t1Address.toLowerCase() &&
              item.c1GasFee === maker.c2GasFee && item.c2GasFee === maker.c1GasFee &&
              item.c1TradingFee === maker.c2TradingFee && item.c2TradingFee === maker.c1TradingFee)
      ))) {
    baseMakerList.push(maker);
  }
}

export const makerList: IMaker[] = [];

for (const makerAddress in openMaker) {
  const [chain, symbol] = openMaker[makerAddress].split(":");
  makerList.push(...JSON.parse(JSON.stringify(baseMakerList)).map(item => {
    if (item.tName === "ETH") {
      item.makerAddress = (<string>makerAddress).toLowerCase();
    }
    return item;
  }).filter(item => {
    let chainFilter = true;
    let symbolFilter = true;
    if (chain !== "*") {
      chainFilter = (item.c1ID === +chain || item.c2ID === +chain) && item.c1ID !== 4 && item.c2ID !== 4;
    }
    if (symbol !== "*") {
      symbolFilter = item.tName === symbol;
    }
    return chainFilter && symbolFilter;
  }));
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
  c1AvalibleDeposit: number;
  c2AvalibleDeposit: number;
  c1AvalibleTimes: {
    startTime: number;
    endTime: number;
  }[];
  c2AvalibleTimes: {
    startTime: number;
    endTime: number;
  }[];
}

export interface IMakerCfg {
  [chainIdPair: string]: {
    [symbolPair: string]: IMakerDataCfg;
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
  explorers?: IExplorerConfig[];
  tokens: IToken[];
  contracts?: string[];
  xvmList?: string[];
  workingStatus?: "running" | "pause" | "stop";
}

export interface IToken {
  id?: number;
  name: string;
  symbol: string;
  decimals: 18;
  address: string;
  mainCoin?: boolean;
}

export interface IExplorerConfig {
  name: string;
  url: string;
  standard: string;
}

export const makerListHistory = []