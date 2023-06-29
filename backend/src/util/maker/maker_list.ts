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
  [makerAddress: string]: {
    [chainIdPair: string]: {
      [symbolPair: string]: IMakerDataCfg;
    };
  }
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

export default {
  makerList: [],
  makerListHistory: []
};