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
const pullTrxMap: Map<string, Array<string>> = new Map()
export const checkTxAmount = (internalId: string, amount: string) => {
  const ptext = orbiterCore.getPTextFromTAmount(internalId, amount)
  console.log(ptext)
  if (ptext.state === false) {
    return false
  }
  const pText = ptext.pText
  // let validPText = (9000 + Number(toChainID)).toString()
  const realAmount = orbiterCore.getRAmountFromTAmount(internalId, amount)
  console.log(realAmount, '==realAmount')
  // if (realAmount.state === false) {
  //   return false
  // }
  // const rAmount = <any>realAmount.rAmount
  // if (
  //   new BigNumber(rAmount).comparedTo(
  //     new BigNumber(pool.maxPrice)
  //       .plus(new BigNumber(pool.tradingFee))
  //       .multipliedBy(new BigNumber(10 ** pool.precision))
  //   ) === 1 ||
  //   new BigNumber(rAmount).comparedTo(
  //     new BigNumber(pool.minPrice)
  //       .plus(new BigNumber(pool.tradingFee))
  //       .multipliedBy(new BigNumber(10 ** pool.precision))
  //   ) === -1 ||
  //   pText !== validPText
  // ) {
  //   return false
  // } else {
  //   if (matchHashList.indexOf(transactionHash) > -1) {
  //     accessLogger.info('event.transactionHash exist: ' + transactionHash)
  //     return false
  //   }
  //   matchHashList.push(transactionHash)

  //   // Initiate transaction confirmation
  //   accessLogger.info('match one transaction >>> ', transactionHash)

  return true
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
      let market: any = null
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
      if (market) {
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
      minPrice: pool.c1MinPrice,
      maxPrice: pool.c1MaxPrice,
      precision: pool.precision,
      avalibleDeposit: pool.c1AvalibleDeposit,
      tradingFee: pool.c1TradingFee,
      gasFee: pool.c1GasFee,
      avalibleTimes: pool.c1AvalibleTimes,
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
      minPrice: pool.c2MinPrice,
      maxPrice: pool.c2MaxPrice,
      precision: pool.precision,
      avalibleDeposit: pool.c2AvalibleDeposit,
      tradingFee: pool.c2TradingFee,
      gasFee: pool.c2GasFee,
      avalibleTimes: pool.c2AvalibleTimes,
    },
  ]
}
