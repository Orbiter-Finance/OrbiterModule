import { getMakerList, sendTransaction } from '.'
import { ScanChainMain } from '../../chainCore'
import { ITransaction, TransactionStatus } from '../../chainCore/src/types'
import * as orbiterCore from './core'
import {
  equals,
  getChainByChainId,
  getChainByInternalId,
  groupBy,
  isEmpty,
} from '../../chainCore/src/utils'
import BigNumber from 'bignumber.js'
import { newMakeTransactionID } from '../../service/maker'
import { accessLogger, errorLogger } from '../logger'
import { Core } from '../core'
import { Repository } from 'typeorm'
import { MakerNode } from '../../model/maker_node'
import { makerConfig } from '../../config'
const repositoryMakerNode = (): Repository<MakerNode> => {
  return Core.db.getRepository(MakerNode)
}
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
  fromChainId: number,
  toChainId: number,
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
  return true
}
export async function startNewMakerTrxPull() {
  const makerList = await getMakerList()
  const convertMakerList = ScanChainMain.convertTradingList(makerList)
  const scanChain = new ScanChainMain(convertMakerList)
  for (const intranetId in convertMakerList) {
    pullTrxMap.set(intranetId, [])
    scanChain.mq.subscribe(`${intranetId}:txlist`, subscribeNewTransaction)
  }

  scanChain.run()
}
async function isExistsMakerAddress(address: string) {
  const makerList = await getMakerList()
  return makerList.findIndex((row) => equals(row.makerAddress, address)) != -1
}
async function subscribeNewTransaction(newTxList: Array<ITransaction>) {
  // Transaction received
  const makerList = await getMakerList()
  const groupData = groupBy(newTxList, 'chainId')
  for (const chainId in groupData) {
    // const chainConfig = getChainByChainId(chainId)
    // const pullTrxList = pullTrxMap.get(chainConfig.internalId)
    //
    const txList: Array<ITransaction> = groupData[chainId]
    for (const tx of txList) {
      if (!(await isExistsMakerAddress(tx.to))) {
        continue
      }
      accessLogger.info('subscribeNewTransaction：', tx.chainId, tx.hash)
      const fromChain = await getChainByChainId(tx.chainId)
      if (!fromChain) {
        accessLogger.info(
          `transaction fromChainId ${tx.chainId} does not exist: `,
          tx.chainId,
          tx.hash
        )
        continue
      }
      if (
        ['3', '33', '8', '88', '12', '512'].includes(fromChain.internalId) &&
        tx.status === TransactionStatus.PENDING
      ) {
        tx.status = TransactionStatus.COMPLETE
      }
      if (tx.status != TransactionStatus.COMPLETE) {
        accessLogger.info(
          'Incorrect transaction status: ',
          fromChain.name,
          tx.chainId,
          tx.hash,
          tx.status
        )
        continue
      }

      let result = orbiterCore.getPTextFromTAmount(
        Number(fromChain.internalId),
        tx.value.toNumber()
      )
      if (['9', '99'].includes(fromChain.internalId)) {
        result = {
          state: true,
          pText: tx.extra['memo'],
        }
      }
      if (!result.state) {
        accessLogger.info(
          'Incorrect transaction getPTextFromTAmount: ',
          fromChain.name,
          tx.chainId,
          tx.hash,
          tx.value.toString(),
          JSON.stringify(result)
        )
        continue
      }
      if (Number(result.pText) < 9000 || Number(result.pText) > 9999) {
        accessLogger.info(
          `Transaction Amount Value Format Error: `,
          fromChain.name,
          tx.chainId,
          tx.hash,
          tx.value.toString(),
          JSON.stringify(result)
        )
        continue
      }
      const toChainInternalId = Number(result.pText) - 9000
      const toChain = getChainByInternalId(String(toChainInternalId))
      const fromTokenInfo = fromChain.tokens.find((row) =>
        equals(row.address, String(tx.tokenAddress))
      )
      if (isEmpty(fromTokenInfo) || !fromTokenInfo?.name) {
        accessLogger.info(
          'Refund The query currency information does not exist: ' +
            JSON.stringify(tx)
        )
        continue
      }
      let market: IMarket | undefined
      for (const m of makerList) {
        const marketArr = newExpanPool(m)
        market = marketArr.find(
          (row) =>
            equals(row.fromChain.id, fromChain.internalId) &&
            equals(row.toChain.id, toChain.internalId) &&
            equals(row.fromChain.tokenAddress, tx.tokenAddress) &&
            equals(row.toChain.symbol, tx.symbol)
        )
        if (market) {
          break
        }
      }
      if (isEmpty(makerConfig.privateKeys[market!.makerAddress])) {
        accessLogger.error(
          'Your private key is not injected into the coin dealer address',
          market?.makerAddress
        )
        continue
      }
      if (isEmpty(market) || !market) {
        accessLogger.info(
          'Payment collection query Market  does not exist' + JSON.stringify(tx)
        )
        continue
      }
      if (!['12', '512', '9', '99'].includes(fromChain.internalId)) {
        const checkAmountResult = checkAmount(
          Number(fromChain.internalId),
          Number(toChain.internalId),
          tx.value.toString(),
          market
        )
        if (checkAmountResult) {
          accessLogger.error(
            'checkAmount Fail',
            fromChain.name,
            tx.hash,
            JSON.stringify(tx)
          )
        }
      }
      await confirmTransactionSendMoneyBack(market, tx)
    }
    // cache.set('hashList', pullTrxList)
  }
  return newTxList.map((tx) => tx.hash)
}
export async function confirmTransactionSendMoneyBack(
  market: IMarket,
  tx: ITransaction
) {
  const chainConfig = getChainByChainId(tx.chainId)
  // check send
  const transactionID = newMakeTransactionID(
    tx.from,
    chainConfig.internalId,
    tx.nonce,
    tx.symbol
  )
  // valid is exits
  try {
    const makerNode = await repositoryMakerNode().findOne({
      transactionID,
    })
    if (makerNode) {
      accessLogger.info('TransactionID was exist: ' + transactionID)
      return
    }
  } catch (error) {
    errorLogger.error('isHaveSqlError =', error)
    return
  }
  const fromChainID = market.fromChain.id
  const toChainID = market.toChain.id
  const toChainName = market.toChain.name
  const makerAddress = market.makerAddress
  accessLogger.info(
    `market send money back =`,
    JSON.stringify(tx),
    `${market.fromChain.name} - ${market.toChain.name}`
  )
  accessLogger.info(`newTransacioonID =`, transactionID)
  await repositoryMakerNode()
    .insert({
      transactionID: transactionID,
      userAddress: tx.from,
      makerAddress: makerAddress,
      fromChain: fromChainID,
      toChain: toChainID,
      formTx: tx.hash,
      fromTimeStamp: String(tx.timestamp),
      fromAmount: tx.value.toString(),
      formNonce: String(tx.nonce),
      txToken: tx.tokenAddress,
      state: 1,
    })
    .then(async () => {
      const toTokenAddress = market.toChain.tokenAddress
      const params = [
        makerAddress,
        transactionID,
        fromChainID,
        toChainID,
        toChainName,
        toTokenAddress,
        tx.value.toNumber(),
        tx.from,
        market.pool,
        tx.nonce,
      ]
      accessLogger.info(
        'ConfirmTransactionSendMoneyBack SendTransaction Params:',
        JSON.stringify(params)
      )
      accessLogger.log('exec sendTransaction trx', JSON.stringify(tx))
      await sendTransaction(
        makerAddress,
        transactionID,
        fromChainID,
        toChainID,
        toChainName,
        toTokenAddress,
        tx.value.toNumber(),
        tx.from,
        market.pool,
        tx.nonce
      )
    })
    .catch((error) => {
      errorLogger.error('newTransactionSqlError =', error)
      return
    })
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
