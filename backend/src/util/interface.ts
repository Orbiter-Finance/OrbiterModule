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