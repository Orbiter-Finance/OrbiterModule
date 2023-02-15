export interface PaginationResRO<T> extends CommonResRO<T> {
  current: number;
  size: number;
  total: number;
  pages: number;
}

export interface PaginationReqRO {
  current: number;
  size: number;
  [k: string]: any;
};

export interface CommonResRO<T> {
  code: number;
  data: T[];
  msg: string | null;
}

export interface IMarket {
  id: string;
  makerId: string;
  ebcId: string;
  recipient: string;
  sender: string;
  slippage: number;
  tradingFee: number;
  gasFee: number;
  fromChain: {
    id: number;
    name: string;
    tokenAddress: string;
    symbol: string;
    decimals: number;
    maxPrice: number;
    minPrice: number;
  };
  toChain: {
    id: number;
    name: string;
    tokenAddress: string;
    symbol: string;
    decimals: number;
  };
  times: Number[];
  crossAddress?: {
    recipient: string;
    sender: string;
    tradingFee: number;
    gasFee: number;
  };
}