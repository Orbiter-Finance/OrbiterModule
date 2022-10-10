import BigNumber from "bignumber.js";
import { isEmpty } from "class-validator";
import { chains } from "orbiter-chaincore";
import { equals } from "orbiter-chaincore/src/utils/core";
import { IMarket } from "./new_maker";

// export const makerList = [];
export const makerListHistory = [];

export class MakerUtil {
  static makerList: Array<IMarket> = [];
  static makerListHistory: Array<IMarket> = [];
  public static async refreshMakerList(): Promise<Array<IMarket> | undefined> {
    if (!process.env['SUBGRAPHS']) {
      console.error('refreshMakerList GET SUBGRAPHS Not Found');
      return;
    }
    const makerList: any = await fecthSubgraphFetchLp(process.env['SUBGRAPHS']);
    if (makerList && makerList.length > 0) {
      MakerUtil.makerList = makerList;
    }
    return MakerUtil.makerList;
  }
}

export const fecthSubgraphFetchLp = async (endpoint: string) => {
  const headers = {
    "content-type": "application/json",
  };
  const graphqlQuery = {
    operationName: "fetchLpList",
    query: `query fetchLpList {
      lpEntities(where: { status: 1 }) {
        id
        createdAt
        maxPrice
        minPrice
        sourcePresion
        destPresion
        tradingFee
        gasFee
        startTime
        stopTime
          maker {
          id
          owner
        }
          pair {
          id
          sourceChain
          destChain
          sourceToken
          destToken
          ebcId
        }
      }
    }`,
    variables: {},
  };

  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(graphqlQuery),
  };

  const response = await fetch(endpoint, options);
  const data = await response.json();
  //
  const lpEntities = data.data["lpEntities"];
  if (!(lpEntities && Array.isArray(lpEntities))) {
    throw new Error("Get LP List Fail");
  }
  const convertData = convertChainLPToOldLP(lpEntities);
  return convertData;
};
export function convertChainLPToOldLP(oldLpList: Array<any>): Array<IMarket> {
  const marketList:Array<IMarket | null> = oldLpList.map(row => {
    try {
      const pair = row["pair"];
      const maker = row["maker"];
      const fromChain = chains.getChainByInternalId(pair.sourceChain);
      const fromToken = fromChain.tokens.find(row =>
        equals(row.address, pair.sourceToken),
      );
      const toChain = chains.getChainByInternalId(pair.destChain);
      const toToken = toChain.tokens.find(row =>
        equals(row.address, pair.destToken),
      );
      const recipientAddress = maker["owner"];
      const senderAddress = maker["owner"];
      const fromChainId = pair.sourceChain;
      const toChainId = pair.destChain;
      const minPrice = new BigNumber(
        Number(row["minPrice"]) / Math.pow(10, Number(row["sourcePresion"])),
      ).toNumber();
      const maxPrice = new BigNumber(
        Number(row["maxPrice"]) / Math.pow(10, Number(row["sourcePresion"])),
      ).toNumber();
      const times = [
        Number(row["startTime"]),
        Number(row["stopTime"] || 9999999999),
      ];
      return {
        id: row["id"],
        recipient: recipientAddress,
        sender: senderAddress,
        makerId: maker.id,
        ebcId: pair["ebcId"],
        fromChain: {
          id: Number(fromChainId),
          name: fromChain.name,
          tokenAddress: pair.sourceToken,
          symbol: fromToken?.symbol || "",
          decimals: Number(row["sourcePresion"]),
        },
        toChain: {
          id: Number(toChainId),
          name: toChain.name,
          tokenAddress: pair.destToken,
          symbol: toToken?.symbol || "",
          decimals: Number(row["destPresion"])
        },
        times,
        pool: {
          //Subsequent versions will modify the structure
          makerAddress: recipientAddress,
          c1ID: fromChainId,
          c2ID: toChainId,
          c1Name: fromChain.name,
          c2Name: toChain.name,
          t1Address: pair.sourceToken,
          t2Address: pair.destToken,
          tName: fromToken?.symbol,
          minPrice,
          maxPrice,
          precision: Number(row["sourcePresion"]),
          avalibleDeposit: 1000,
          tradingFee: new BigNumber(
            Number(row["tradingFee"]) / Math.pow(10, Number(row["destPresion"])),
          ).toNumber(),
          gasFee: new BigNumber(
            Number(row["gasFee"]) / Math.pow(10, Number(row["destPresion"])),
          ).toNumber(),
          avalibleTimes: times,
        },
      } as IMarket;
    } catch (error) {
      return null;
    }
  });
  return marketList.filter(row => !isEmpty(row)) as any;
}