import { fix0xPadStartAddress, sleep } from 'orbiter-chaincore/src/utils/core';
import { ScanChainMain, pubSub, chains } from 'orbiter-chaincore'
import { core as chainCoreUtil } from 'orbiter-chaincore/src/utils'
import { getMakerList, sendTransaction, sendTxConsumeHandle } from '.'
import * as orbiterCore from './core'
import BigNumber from 'bignumber.js'
import { TransactionIDV2 } from '../../service/maker'
import { accessLogger, errorLogger, getLoggerService } from '../logger'
import { Core } from '../core'
import { Repository } from 'typeorm'
import { MakerNode } from '../../model/maker_node'
import { makerConfig } from '../../config'
import mainnetChains from '../../config/chains.json'
import testnetChains from '../../config/testnet.json'
import Keyv from 'keyv'
import KeyvFile from 'orbiter-chaincore/src/utils/keyvFile'
import { ITransaction, TransactionStatus } from 'orbiter-chaincore/src/types'
import dayjs from 'dayjs'
import { MessageQueue } from '../messageQueue'
import { sendConsumer } from './send'
import { validateAndParseAddress } from "starknet";
import { attackerList } from "../../schedule/jobs";
import { telegramBot } from '../../sms/telegram'

const allChainsConfig = [...mainnetChains, ...testnetChains]
export const repositoryMakerNode = (): Repository<MakerNode> => {
  return Core.db.getRepository(MakerNode)
}
export const chainQueue: { [key: number]: MessageQueue } = {};
const LastPullTxMap: Map<String, Number> = new Map()
export interface IMarket {
  recipient: string
  sender: string
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
  amount = new BigNumber(String(amount)).toFixed()
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
  const minPrice = new BigNumber(
      market.fromChain.symbol === "ETH" ? 0.001 : market.pool.minPrice
  )
    .plus(new BigNumber(market.pool.tradingFee))
    .multipliedBy(new BigNumber(10 ** market.pool.precision))
  const maxPrice = new BigNumber(market.pool.maxPrice)
    .plus(new BigNumber(market.pool.tradingFee))
    .multipliedBy(new BigNumber(10 ** market.pool.precision))
  if (pText !== validPText) {
    accessLogger.error(
      `Payment checkAmount inconsistent: ${pText}!=${validPText}`
    )
    return false
  }
  if (new BigNumber(rAmount).comparedTo(maxPrice) === 1) {
    accessLogger.error(
      `Payment checkAmount Amount exceeds maximum limit: ${new BigNumber(
        rAmount
      ).dividedBy(10 ** market.pool.precision)} > ${maxPrice.dividedBy(
        10 ** market.pool.precision
      )}`
    )
    return false
  } else if (new BigNumber(rAmount).comparedTo(minPrice) === -1) {
    accessLogger.error(
      `Payment checkAmount The amount is below the minimum limit: ${new BigNumber(
        rAmount
      ).dividedBy(10 ** market.pool.precision)} < ${minPrice.dividedBy(
        10 ** market.pool.precision
      )}`
    )
    return false
  }
  return true
}
const caches: Map<string, Keyv> = new Map()
export const transfers: Map<string, Map<string, string>> = new Map()
function getCacheClient(chainId: string) {
  if (caches.has(chainId)) {
    return caches.get(chainId)
  }
  const cache = new Keyv({
    store: new KeyvFile({
      filename: `logs/transfer/${dayjs().format('YYYYMM')}-${chainId}`, // the file path to store the data
      expiredCheckDelay: 999999 * 24 * 3600 * 1000, // ms, check and remove expired data in each ms
      writeDelay: 100, // ms, batch write to disk in a specific duration, enhance write performance.
      encode: JSON.stringify, // serialize function
      decode: JSON.parse, // deserialize function
    }),
  })
  caches.set(chainId, cache)
  return cache
}

export async function startNewMakerTrxPull() {
  const makerList = await getNewMarketList()
  const convertMakerList = groupWatchAddressByChain(makerList)
  const scanChain = new ScanChainMain(<any>allChainsConfig)
  for (const intranetId in convertMakerList) {
    convertMakerList[intranetId].forEach((address) => {
      if (address) {
        const pullKey = `${intranetId}:${address.toLowerCase()}`
        transfers.set(intranetId, new Map())
        LastPullTxMap.set(pullKey, Date.now())
      }
    })
    // 
    const insideChainId = Number(intranetId);
    if (!chainQueue[insideChainId]) {
      chainQueue[insideChainId] = new MessageQueue(`chain:${insideChainId}`, sendConsumer);
      chainQueue[insideChainId].consumeQueue(async (error, result) => {
        if (error) {
          accessLogger.error(`An error occurred while consuming messages ${error}`);
          return;
        }
        await sendTxConsumeHandle(result);
        return true;
      })
    }
    pubSub.subscribe(`${intranetId}:txlist`, (result) => {
      subscribeNewTransaction(result);
      return true;
    })
    scanChain.startScanChain(intranetId, convertMakerList[intranetId])
  }
  // L2 push
  pubSub.subscribe(`ACCEPTED_ON_L2:4`, (tx) => {
    subscribeNewTransaction([tx]);
    return true;
  })

}
async function isWatchAddress(address: string) {
  const makerList = await getNewMarketList()
  return (
    makerList.findIndex(
      (row) =>
        chainCoreUtil.equals(row.recipient, address) ||
        chainCoreUtil.equals(row.sender, address)
    ) != -1
  )
}
export async function subscribeNewTransaction(newTxList: Array<ITransaction>) {
  // Transaction received
  // accessLogger.info(`subscribeNewTransaction hash: ${JSON.stringify(newTxList.map(row=> row.hash))}`);
  const groupData = chainCoreUtil.groupBy(newTxList, 'chainId')
  for (const chainId in groupData) {
    const txList: Array<ITransaction> = groupData[chainId]
    for (const tx of txList) {
      try {
        if (!(await isWatchAddress(tx.to))) {
          // accessLogger.error(
          //   `The receiving address is not a Maker address=${tx.to}, hash=${tx.hash}`
          // )
          continue
        }
        if (!!attackerList.find(item => item.toLowerCase() === tx?.from.toLowerCase())) {
          errorLogger.error(`attacker address: ${tx.from} ${tx.hash}`);
          continue;
        }
        const fromChain = await chains.getChainByChainId(tx.chainId)
        // check send
        if (!fromChain) {
          errorLogger.error(
            `transaction fromChainId ${tx.chainId} does not exist: ${tx.hash}`
          )
          continue
        }
        // const accessLogger = getLoggerService(fromChain.internalId);
        // accessLogger.info(`subscribeNewTransaction：`, JSON.stringify(tx))
        if (chainCoreUtil.equals(tx.to, tx.from) || tx.value.lte(0)) {
          accessLogger.error(
            `subscribeNewTransaction to equals from | value <= 0 hash:${tx.hash}`
          )
          continue
        }


        let ext = '';
        if ([8, 88].includes(Number(fromChain.internalId))) {
          ext = dayjs(tx.timestamp).unix().toString();
        } else if ([4, 44].includes(Number(fromChain.internalId))) {
          ext = String(Number(tx.extra['version']));
        }
        const transactionID = TransactionIDV2(
          tx.from,
          fromChain.internalId,
          tx.nonce,
          tx.symbol,
          ext
        )
        if (
          ['3', '33', '8', '88', '12', '512'].includes(fromChain.internalId) &&
          tx.status === TransactionStatus.PENDING
        ) {
          tx.status = TransactionStatus.COMPLETE
        }
        if (tx.status != TransactionStatus.COMPLETE) {
          accessLogger.error(
            `[${transactionID}] Incorrect transaction status: fromChain=${fromChain.name},fromChainId=${fromChain.internalId},hash=${tx.hash},value=${tx.status}`
          )
          continue
        }
        let result = orbiterCore.getPTextFromTAmount(
          Number(fromChain.internalId),
          tx.value.toString()
        )
        if (['9', '99'].includes(fromChain.internalId)) {
          const memoArr = tx.extra['memo'].split('_');
          result = {
            state: true,
            pText: memoArr[0],
          }

        }
        if (!result.state) {
          accessLogger.error(
            `[${transactionID}] Incorrect transaction getPTextFromTAmount: fromChain=${fromChain.name
            },fromChainId=${fromChain.internalId},hash=${tx.hash
            },value=${tx.value.toString()} ${JSON.stringify(result)}`
          )
          continue
        }
        if (Number(result.pText) < 9000 || Number(result.pText) > 9999) {
          accessLogger.error(
            `[${transactionID}] Transaction Amount Value Format Error: fromChain=${fromChain.name
            },fromChainId=${fromChain.internalId},hash=${tx.hash
            },value=${tx.value.toString()} ${JSON.stringify(result)}`
          )
          continue
        }
        const toChainInternalId = Number(result.pText) - 9000;
        // if (toChainInternalId == 4 || toChainInternalId == 3) {
        //   const logger = LoggerService.getLogger("tx", {
        //       dir: `logs/UncollectedPayment/`
        //   });
        //   logger.info(`${transactionID}`);
        //   continue
        // }
        const toChain: any = chains.getChainByInternalId(String(toChainInternalId))
        const fromTokenInfo = fromChain.tokens.find((row) =>
          chainCoreUtil.equals(row.address, String(tx.tokenAddress))
        )
        if (chainCoreUtil.isEmpty(fromTokenInfo) || !fromTokenInfo?.name) {
          accessLogger.error(
            `[${transactionID}] Refund The query currency information does not exist: ${JSON.stringify(tx)}`
          )
          continue
        }
        const newMakerList = await getNewMarketList()
        const marketItem = newMakerList.find(
          (m) =>
            chainCoreUtil.equals(String(m.fromChain.id), fromChain.internalId) &&
            chainCoreUtil.equals(String(m.toChain.id), toChain.internalId) &&
            chainCoreUtil.equals(
              m.fromChain.tokenAddress,
              String(tx.tokenAddress)
            ) &&
            chainCoreUtil.equals(m.toChain.symbol, tx.symbol) &&
            chainCoreUtil.equals(m.recipient, tx.to)
        )
        if (!marketItem) {
          accessLogger.error(
            `Transaction pair not found ${fromChain.name} ${tx.hash} market:${fromChain.internalId} - ${toChain.internalId}`
          )
          continue
        }
        if (!chainCoreUtil.equals(tx.to, marketItem.recipient)) {
          accessLogger.error(
            `The recipient of the transaction is not a maker address ${tx.hash}`
          )
          continue
        }

        if (!['9', '99'].includes(fromChain.internalId)) {
          const checkAmountResult = checkAmount(
            Number(fromChain.internalId),
            Number(toChain.internalId),
            tx.value.toString(),
            marketItem
          )
          if (!checkAmountResult) {
            accessLogger.error(
              `[${transactionID}] checkAmount Fail: fromChain=${fromChain.name},hash=${tx.hash} ${JSON.stringify(tx)}`,
            )
            continue
          }
        }

        const formChainID = String(marketItem.fromChain.id);
        const chainTransferMap = transfers.get(formChainID)
        if (chainTransferMap?.has(transactionID)) {
          // accessLogger.error(
          //   `confirmTransaction ${tx.hash} ${transactionID} transfer exists!`
          // )
          return;
        }

        const startTimeTimeStamp = LastPullTxMap.get(
          `${formChainID}:${tx.to.toLowerCase()}`
        )
        if (tx.timestamp * 1000 < Number(startTimeTimeStamp)) {
          accessLogger.error(
            `The transaction time is less than the program start time: chainId=${tx.chainId},hash=${tx.hash}, ${dayjs(Number(startTimeTimeStamp)).format("YYYY-MM-DD HH:mm:ss")}>${dayjs(tx.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')}`
          )
          chainTransferMap?.set(transactionID, 'ok');
          // TAG:  rinkeby close
          continue
        }

        await confirmTransactionSendMoneyBack(transactionID, marketItem, tx)
      } catch (error) {
        errorLogger.error(`${tx.hash} startNewMakerTrxPull error: ${error}`)
      }
    }
  }
  return newTxList.map((tx) => tx.hash)
}
export async function confirmTransactionSendMoneyBack(
  transactionID: string,
  market: IMarket,
  tx: ITransaction
) {
  const fromChainID = Number(market.fromChain.id)

  if (
    Number(fromChainID) === 4 && tx.status != 1
  ) {
    return errorLogger.error(`[${tx.hash}] Intercept the transaction and do not collect the payment`)
  }
  const toChainID = Number(market.toChain.id)

  const toChainName = market.toChain.name
  const makerAddress = market.sender

  const cache = getCacheClient(String(fromChainID))
  const chainTransferMap = transfers.get(String(fromChainID))
  if (
    chainTransferMap?.has(transactionID) ||
    (await cache?.has(tx.hash.toLowerCase()))
  ) {
    // accessLogger.error(
    //   `confirmTransaction ${tx.hash} ${transactionID} transfer exists!`
    // )
    return;
  }
  if (
    chainCoreUtil.isEmpty(makerConfig.privateKeys[makerAddress.toLowerCase()])
  ) {
    accessLogger.error(
      `[${transactionID}] Your private key is not injected into the coin dealer address,makerAddress =${makerAddress}`
    )
    return
  }

  if (Number(chainTransferMap?.size) >= 5000) {
    chainTransferMap?.clear()
  }
  await cache?.set(tx.hash.toLowerCase(), true, 1000 * 60 * 60 * 24)
  LastPullTxMap.set(`${fromChainID}:${makerAddress}`, tx.timestamp * 1000)
  if (fromChainID == 21 && toChainID!==1) {
    chainTransferMap?.set(transactionID, "ok");
    telegramBot.sendMessage(`[${tx.hash}] break from base to chain not mainnet`).catch(error => {
      accessLogger.error(`send telegram message error ${error.stack}`);
    })
    errorLogger.error(`[${tx.hash}] break from base to chain not mainnet`);
    return;
  }
  // check send
  // valid is exits
  try {
    const makerNode = await repositoryMakerNode().findOne({
      transactionID,
    })
    if (makerNode) {
      accessLogger.info(`TransactionID was exist: ${transactionID}`)
      return
    }
  } catch (error) {
    errorLogger.error(`[${transactionID}] isHaveSqlError = ${error}` )
    return
  }

  await repositoryMakerNode()
    .insert({
      transactionID: transactionID,
      userAddress: tx.from,
      makerAddress: makerAddress,
      fromChain: String(fromChainID),
      toChain: String(toChainID),
      formTx: tx.hash,
      fromTimeStamp: String(tx.timestamp),
      fromAmount: tx.value.toString(),
      formNonce: String(tx.nonce),
      txToken: tx.tokenAddress,
      state: 1,
    })
    .then(async () => {
      const toTokenAddress = market.toChain.tokenAddress
      let userAddress = tx.from
      switch (String(fromChainID)) {
        case '11':
        case '511':
        case '4':
        case '44':
          userAddress = tx.extra['ext']
          break
        case '9':
        case '99':
          const memoArr = tx.extra['memo'].split('_');
          if (memoArr.length == 2 && memoArr[1]) {
            userAddress = memoArr[1];
          }
          break;
      }
      switch (String(toChainID)) {
        case '11':
        case '511':
          userAddress = tx.extra['ext'].replace('0x02', '0x')
          break
        case '4':
        case '44':
          userAddress = tx.extra['ext'].replace('0x03', '0x')
          try {
            validateAndParseAddress(fix0xPadStartAddress(userAddress, 66));
          } catch (e) {
            accessLogger.error(
                `Illegal user starknet address ${userAddress} hash:${tx.hash}, ${e.message}`
            );
            return;
          }
          break
      }
      if (!userAddress ||
          fix0xPadStartAddress(userAddress, 66).length !== 66 ||
          fix0xPadStartAddress(userAddress, 66) === "0x0000000000000000000000000000000000000000000000000000000000000000") {
        accessLogger.error(
            `Illegal user address ${userAddress} hash:${tx.hash}`
        );
        return;
      }
      accessLogger.info(`sendTransaction from hash: ${fromChainID}->${toChainID} ${tx.hash}`);
      await sendTransaction(
        makerAddress,
        transactionID,
        fromChainID,
        toChainID,
        toChainName,
        toTokenAddress,
        tx.value.toString(),
        userAddress,
        market.pool,
        tx.nonce,
        0,
        tx.from,
          0,
          tx.hash
      )
    })
    .catch((error) => {
      errorLogger.error(`[${transactionID}] newTransactionSqlError = ${error}`)
      return
    })

}

export async function getNewMarketList(): Promise<Array<IMarket>> {
  const makerList = await getMakerList()
  return chainCoreUtil.flatten(
    makerList.map((row) => {
      return newExpanPool(row)
    })
  )
}
export function groupWatchAddressByChain(makerList: Array<IMarket>): {
  [key: string]: Array<string>
} {
  const chainIds = chainCoreUtil.uniq(
    chainCoreUtil.flatten(
      makerList.map((row) => [row.fromChain.id, row.toChain.id])
    )
  )
  const chain = {}
  for (const id of chainIds) {
    const recipientAddress = chainCoreUtil.uniq(
      makerList.filter((m) => m.fromChain.id === id).map((m) => m.recipient)
    )
    const senderAddress = chainCoreUtil.uniq(
      makerList.filter((m) => m.toChain.id === id).map((m) => m.sender)
    )
    chain[id] = chainCoreUtil.uniq([...senderAddress, ...recipientAddress])
  }
  return chain
}
// getNewMarketList().then((result) => {
//   console.log(groupWatchAddressByChain(result), '===result')
// })
export function newExpanPool(pool): Array<IMarket> {
  return [
    {
      recipient: pool.makerAddress,
      sender: pool.makerAddress,
      fromChain: {
        id: String(pool.c1ID),
        name: pool.c1Name,
        tokenAddress: pool.t1Address,
        symbol: pool.tName,
      },
      toChain: {
        id: String(pool.c2ID),
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
      recipient: pool.makerAddress,
      sender: pool.makerAddress,
      fromChain: {
        id: String(pool.c2ID),
        name: pool.c2Name,
        tokenAddress: pool.t2Address,
        symbol: pool.tName,
      },
      toChain: {
        id: String(pool.c1ID),
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
  ].map((row) => {
    const L1L2Maping = makerConfig.starknetAddress
    if (['4', '44'].includes(row.toChain.id)) {
      // starknet mapping
      row.sender = L1L2Maping[row.sender.toLowerCase()]
    }
    if (['4', '44'].includes(row.fromChain.id)) {
      // starknet mapping
      row.recipient = L1L2Maping[row.recipient.toLowerCase()]
    }
    return row
  })
}
