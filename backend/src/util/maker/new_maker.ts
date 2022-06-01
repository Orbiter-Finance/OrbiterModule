import { expanPool, getMakerList } from '.'
import { ScanChainMain } from '../../chainCore'
import { ITransaction } from '../../chainCore/src/types'
import * as orbiterCore from './core'
import {
  equals,
  getChainByChainId,
  getChainByInternalId,
  groupBy,
} from '../../chainCore/src/utils'
import BigNumber from 'bignumber.js'
import { ChainId } from '@loopring-web/loopring-sdk'
const pullTrxMap: Map<string, Array<string>> = new Map()

export interface IMarket {
  makerAddress: string
  fromChain: {
    id: string
    name: string
    tokenAddress: string
    symbol: string
  }
  toChain: {
    id: string
    name: string
    tokenAddress: string
    symbol: string
  }
  pool: any
}
// checkData
export function checkAmount(
  fromChainId: string,
  toChainId:string,
  amount: string,
  market: IMarket
) {
  const ptext = orbiterCore.getPTextFromTAmount(fromChainId, amount)
  if (ptext.state === false) {
    return false
  }
  const pText = ptext.pText
  let validPText = (9000 + Number(toChainId)).toString()
  const realAmount = orbiterCore.getRAmountFromTAmount(fromChainId, amount)
  if (realAmount.state === false) {
    return false
  }
  const rAmount = <any>realAmount.rAmount
  if (
    new BigNumber(rAmount).comparedTo(
      new BigNumber(market.pool.maxPrice)
        .plus(new BigNumber(market.pool.tradingFee))
        .multipliedBy(new BigNumber(10 ** market.pool.precision))
    ) === 1 ||
    new BigNumber(rAmount).comparedTo(
      new BigNumber(market.pool.minPrice)
        .plus(new BigNumber(market.pool.tradingFee))
        .multipliedBy(new BigNumber(10 ** market.pool.precision))
    ) === -1 ||
    pText !== validPText
  ) {
    return false
  }
  return true;
}
export async function startNewMakerTrxPull() {
  const makerList = await getMakerList()
  const convertMakerList = ScanChainMain.convertTradingList(makerList)
  const scanChain = new ScanChainMain(convertMakerList)
  for (const intranetId in convertMakerList) {
    //
    // const cache = new Keyv({
    //   store: new KeyvFile({
    //     filename: `cache/maker/${intranetId}`, // the file path to store the data
    //     expiredCheckDelay: 999999 * 24 * 3600 * 1000, // ms, check and remove expired data in each ms
    //     writeDelay: 100, // ms, batch write to disk in a specific duration, enhance write performance.
    //     encode: JSON.stringify, // serialize function
    //     decode: JSON.parse, // deserialize function
    //   }),
    // })
    pullTrxMap.set(intranetId, [])
    // reader cache
    // const historyHashList = await cache.get('hashList')
    // if (historyHashList && Array.isArray(historyHashList)) {
    //   pullTrxMap.set(intranetId, historyHashList)
    // }
    scanChain.mq.subscribe(`${intranetId}:txlist`, subscribeNewTransaction)
  }
  subscribeNewTransaction([
    {
      chainId: '4',
      hash: '0x7aef9fc87c0516f6f943544a78a28f5b499853806ea6ac94b663ac5f6c99e041',
      nonce: 0,
      blockHash:
        '0x2aab838c45ffd9ed38dfc1b2515f98d6a586c9f4e56ff78341303c5f8e9cb23d',
      blockNumber: 10770101,
      transactionIndex: 30,
      from: '0xBF8128Fba8E855702Dc692E6cf534F9FBdf465C6',
      to: '0x0043d60e87c5dd08C86C3123340705a1556C4719',
      value: new BigNumber('7100000000009514'),
      symbol: 'ETH',
      gasPrice: 1100000010,
      gas: 21000,
      input: '0x',
      status: 1,
      tokenAddress: '0x0000000000000000000000000000000000000000',
      timestamp: 1653970230,
      fee: 23100000210000,
      feeToken: 'ETH',
      extra: {
        accessList: [],
        chainId: '0x4',
        maxFeePerGas: '1100000010',
        maxPriorityFeePerGas: '1100000010',
        r: '0x730cbf5b27c7814ffa19542401f1c5d87a476abb7fd9fcfd152b80dfaaf73b79',
        s: '0x15b9911a99419e3f58d3d4077a113f2cb9be53dcc21ef1c51d65c7507ddc6e85',
        type: 2,
        v: '0x1',
      },
      source: 'rpc',
      confirmations: 5446,
    },
  ])
  // scanChain.run()
}
async function subscribeNewTransaction(newTxList: Array<ITransaction>) {
  // Transaction received
  const makerList = await getMakerList()
  const groupData = groupBy(newTxList, 'chainId')
  for (const chainId in groupData) {
    const chainConfig = getChainByChainId(chainId)
    const pullTrxList = pullTrxMap.get(chainConfig.internalId)
    //
    const txList: Array<ITransaction> = groupData[chainId]
    for (const tx of txList) {
      const fromChain = await getChainByChainId(tx.chainId)
      const result = orbiterCore.getPTextFromTAmount(
        fromChain.internalId,
        tx.value.toString()
      )
      if (!result.state) {
        continue
      }
      const toChainInternalId = Number(result.pText) - 9000
      const toChain = await getChainByInternalId(String(toChainInternalId))
      let market:IMarket | undefined;
      for (const m of makerList) {
        const marketArr = newExpanPool(m)
        market = marketArr.find(
          (row) =>
            equals(row.fromChain.id, fromChain.internalId) &&
            equals(row.toChain.id, toChain.internalId)
        )
        if (market) {
          break
        }
      }
      if (market && checkAmount(fromChain.internalId, toChain.internalId, tx.value.toString(), market)) {
        // pullTrxList!.unshift(tx.hash.toLowerCase())
        await handleMakerPaymentCollection(tx, market)
      }
    }
    // cache.set('hashList', pullTrxList)
  }
}
export async function handleMakerPaymentCollection(
  tx: ITransaction,
  market: any
) {
  console.log('market:', market)
  console.log('trx:', tx)

  const chainConfig = getChainByInternalId(tx.chainId)
  if (chainConfig) {
    switch (Number(chainConfig.internalId)) {
      case 3:
      case 33:
        //
        break
      case 5:
      case 1:
        //
        break
    }
  }
}

export function newExpanPool(pool) {
  return [
    {
      makerAddress: pool.makerAddress,
      fromChain: {
        id: pool.c1ID,
        name: pool.c1Name,
        tokenAddress: pool.t1Address,
        symbol: pool.tName,
      },
      toChain: {
        id: pool.c2ID,
        name: pool.c2Name,
        tokenAddress: pool.t2Address,
        symbol: pool.tName,
      },
      // minPrice: pool.c1MinPrice,
      // maxPrice: pool.c1MaxPrice,
      // precision: pool.precision,
      // avalibleDeposit: pool.c1AvalibleDeposit,
      // tradingFee: pool.c1TradingFee,
      // gasFee: pool.c1GasFee,
      // avalibleTimes: pool.c1AvalibleTimes,
      pool: {
        //Subsequent versions will modify the structure
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
    },
    {
      makerAddress: pool.makerAddress,
      fromChain: {
        id: pool.c2ID,
        name: pool.c2Name,
        tokenAddress: pool.t2Address,
        symbol: pool.tName,
      },
      toChain: {
        id: pool.c1ID,
        name: pool.c1Name,
        tokenAddress: pool.t1Address,
        symbol: pool.tName,
      },
      // minPrice: pool.c2MinPrice,
      // maxPrice: pool.c2MaxPrice,
      // precision: pool.precision,
      // avalibleDeposit: pool.c2AvalibleDeposit,
      // tradingFee: pool.c2TradingFee,
      // gasFee: pool.c2GasFee,
      // avalibleTimes: pool.c2AvalibleTimes,
      pool: {
        //Subsequent versions will modify the structure
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
    },
  ]
}
