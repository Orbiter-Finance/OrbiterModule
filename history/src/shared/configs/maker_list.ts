export const makerConfigs: IMarket[] = [];

export interface IMarket {
  id: string;
  makerId: string;
  ebcId: string;
  recipient: string;
  sender: string;
  slippage: number;
  tradingFee: number;
  gasFee: number;
  spendTime: number;
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
}