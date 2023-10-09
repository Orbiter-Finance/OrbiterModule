import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import {
  AccountInfo,
  ChainId,
  ConnectorNames,
  ExchangeAPI,
  generateKeyPair,
  GlobalAPI,
  UserAPI,
} from '@loopring-web/loopring-sdk'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import { In, Repository } from 'typeorm';
import Web3 from 'web3'
import { sleep } from '..'
import { makerConfig } from '../../config'
import { MakerNode } from '../../model/maker_node'
import { MakerNodeTodo } from '../../model/maker_node_todo'
import zkspace_help from '../../service/zkspace/zkspace_help'
import { Core } from '../core'
import { accessLogger, errorLogger, getLoggerService } from '../logger'
import { makerList, makerListHistory } from './maker_list'
import send from './send'
import { equals } from 'orbiter-chaincore/src/utils/core'
import { chains } from 'orbiter-chaincore/src/utils'
import { getProviderV4 } from '../../service/starknet/helper';
import { IChainConfig } from 'orbiter-chaincore/src/types'
const PrivateKeyProvider = require('truffle-privatekey-provider')
import { doSms } from '../../sms/smsSchinese'
import { getAmountToSend } from './core'
import { chainQueue } from './new_maker'
import { telegramBot } from '../../sms/telegram'

let accountInfo: AccountInfo
let lpKey: string

const repositoryMakerNode = (): Repository<MakerNode> => {
  return Core.db.getRepository(MakerNode)
}
const repositoryMakerNodeTodo = (): Repository<MakerNodeTodo> => {
  return Core.db.getRepository(MakerNodeTodo)
}

export async function getMakerList() {
  return makerList
}

export async function getAllMakerList() {
  return makerList.concat(makerListHistory)
}

export function expanPool(pool) {
  return {
    pool1: {
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
      avalibleDeposit: pool.c1AvalibleDeposit,
      tradingFee: pool.c1TradingFee,
      gasFee: pool.c1GasFee,
      avalibleTimes: pool.c1AvalibleTimes,
    },
    pool2: {
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
      avalibleDeposit: pool.c2AvalibleDeposit,
      tradingFee: pool.c2TradingFee,
      gasFee: pool.c2GasFee,
      avalibleTimes: pool.c2AvalibleTimes,
    },
  }
}

async function checkLoopringAccountKey(makerAddress, fromChainID) {
  let netWorkID = fromChainID == 9 ? 1 : 5
  const exchangeApi = new ExchangeAPI({ chainId: netWorkID })
  const userApi = new UserAPI({ chainId: netWorkID })
  let GetAccountRequest = {
    owner: makerAddress,
  }
  if (!accountInfo) {
    let AccountResult = await exchangeApi.getAccount(GetAccountRequest)

    if (AccountResult.accInfo && AccountResult.raw_data) {
      accountInfo = AccountResult.accInfo
    } else {
      throw Error('account unlocked')
    }
  }
  if (!lpKey) {
    const { exchangeInfo } = await exchangeApi.getExchangeInfo()
    const provider = new PrivateKeyProvider(
      makerConfig.privateKeys[makerAddress.toLowerCase()],
      fromChainID == 9
        ? makerConfig['mainnet'].httpEndPoint
        : 'https://eth-goerli.alchemyapi.io/v2/fXI4wf4tOxNXZynELm9FIC_LXDuMGEfc'
    )
    try {
      const localWeb3 = new Web3(provider)
      let options = {
        web3: localWeb3,
        address: makerAddress,
        keySeed:
          accountInfo.keySeed && accountInfo.keySeed !== ''
            ? accountInfo.keySeed
            : GlobalAPI.KEY_MESSAGE.replace(
              '${exchangeAddress}',
              exchangeInfo.exchangeAddress
            ).replace('${nonce}', (accountInfo.nonce - 1).toString()),
        walletType: ConnectorNames.Unknown,
        chainId: fromChainID == 99 ? ChainId.GOERLI : ChainId.MAINNET,
      }
      const eddsaKey = await generateKeyPair(options)
      let GetUserApiKeyRequest = {
        accountId: accountInfo.accountId,
      }
      const { apiKey } = await userApi.getUserApiKey(
        GetUserApiKeyRequest,
        eddsaKey.sk
      )
      lpKey = apiKey
      if (!apiKey) {
        throw Error('Get Loopring ApiKey Error')
      }
    } catch (err) {
      throw err
    } finally {
      // Stop web3-provider-engine. Prevent data from being pulled all the time
      provider.engine.stop()
    }
  }
}

function confirmToTransaction(
  ChainID,
  Chain,
  txHash,
  transactionID,
  confirmations = 3,
  inspectCount:number = 0
) {
  accessLogger.info(`[${transactionID}] confirmToTransaction = ${getTime()}` )
  if (inspectCount>=50) {
    return;
  }
  inspectCount++;
  setTimeout(async () => {
    const trxConfirmations = await getConfirmations(Chain, txHash)
    if (!trxConfirmations) {
      return confirmToTransaction(
        ChainID,
        Chain,
        txHash,
        transactionID,
        confirmations,
        inspectCount
      )
    }
    accessLogger.info(
      `[${transactionID}] Transaction with hash ${txHash} has  ${trxConfirmations.confirmations} confirmation(s)` 
    )

    if (trxConfirmations.confirmations >= confirmations) {
      let info = <any>{}
      try {
        let toWeb3
        if (
          Chain === 'metis' ||
          Chain === 'metis_test' ||
          Chain === 'zksync2' ||
          Chain === 'zksync2_test'
        ) {
          //no use alchemy provider
          toWeb3 = new Web3(makerConfig[Chain].httpEndPoint)
        } else {
          toWeb3 = createAlchemyWeb3(makerConfig[Chain].httpEndPoint)
        }

        info = await toWeb3.eth.getBlock(trxConfirmations.trx.blockNumber)
      } catch (error) {
        errorLogger.error(`getBlockError = ${error}`)
      }

      accessLogger.info(
        `[${transactionID}] Transaction with hash ${txHash} has been successfully confirmed`
      )
      return
    }
    return confirmToTransaction(
      ChainID,
      Chain,
      txHash,
      transactionID,
      confirmations,
      inspectCount
    )
  }, 8 * 1000)
}

function confirmToZKTransaction(syncProvider, txID, transactionID) {
  accessLogger.info(`confirmToZKTransaction = ${getTime()}`)
  setTimeout(async () => {
    let transferReceipt: any
    try {
      transferReceipt = await syncProvider.getTxReceipt(txID)
    } catch (err) {
      errorLogger.error(`zkSync getTxReceipt failed: ${err.message}`)
      return confirmToZKTransaction(syncProvider, txID, transactionID)
    }

    accessLogger.info(
      `transactionID = ${transactionID} transferReceipt = ${JSON.stringify(transferReceipt)}`
    )

    if (
      transferReceipt.executed &&
      transferReceipt.success &&
      !transferReceipt.failReason
    ) {
      accessLogger.info(
        `zk_Transaction with hash ${txID} has been successfully confirmed`
      )
      accessLogger.info(
        'update maker_node =',
        `state = 3 WHERE transactionID = '${transactionID}'`
      )
      try {
        await repositoryMakerNode().update(
          { transactionID: transactionID },
          { state: 3 }
        )
      } catch (error) {
        errorLogger.error(`updateToSqlError = ${error}`)
      }
      return
    }

    // When failReason, don't try again
    if (!transferReceipt.success && transferReceipt.failReason) {
      return
    }
    return confirmToZKTransaction(syncProvider, txID, transactionID)
  }, 8 * 1000)
}

function confirmToLPTransaction(
  txID: string,
  transactionID: string,
  toChainId: number,
  makerAddress: string
) {
  accessLogger.info(`confirmToLPTransaction = ${getTime()}`)
  setTimeout(async () => {
    try {
      await checkLoopringAccountKey(makerAddress, toChainId)
      const GetUserTransferListRequest = {
        accountId: accountInfo.accountId,
        hashes: txID,
      }
      let netWorkID = toChainId == 9 ? 1 : 5
      const userApi = new UserAPI({ chainId: netWorkID })
      const LPTransferResult = await userApi.getUserTransferList(
        GetUserTransferListRequest,
        lpKey
      )
      if (
        LPTransferResult.totalNum === 1 &&
        LPTransferResult.userTransfers?.length === 1
      ) {
        let lpTransaction = LPTransferResult.userTransfers[0]
        if (
          lpTransaction.status == 'processed' &&
          lpTransaction.txType == 'TRANSFER'
        ) {
          accessLogger.info({ lpTransaction })
          accessLogger.info(
            `lp_Transaction with hash ${txID} has been successfully confirmed`
          )
          try {
            await repositoryMakerNode().update(
              { transactionID: transactionID },
              { state: 3 }
            )
          } catch (error) {
            errorLogger.error(`updateToSqlError = ${error}`)
          }
          return
        }
      }
    } catch (err) {
      errorLogger.error(`loopring getTxReceipt failed: ${err.message}`)
      return confirmToLPTransaction(
        txID,
        transactionID,
        toChainId,
        makerAddress
      )
    }
    return confirmToLPTransaction(txID, transactionID, toChainId, makerAddress)
  }, 8 * 1000)
}

export async function confirmToSNTransaction(
  txID: string,
  chainId: number,
  paramsList: { makerAddress: string, transactionID: string }[],
  rollback: any
) {
  try {
    accessLogger.info(`confirmToSNTransaction = ${getTime()}`)
    const provider = getProviderV4(
        makerConfig[chainId].rpc[0]
    )
    let response
    try {
      response = await provider.getTransactionReceipt(txID);
    } catch (e) {
      if (e.message === "29: Transaction hash not found") {
        await sleep(1000 * 30);
        return await confirmToSNTransaction(
            txID,
            chainId,
            paramsList,
            rollback
        );
      }
      const msg = `starknet get receipt error: ${e.message}, txID:${txID}, transactionID:${JSON.stringify(paramsList.map(item => item.transactionID))}`;
      errorLogger.info(msg);
      // telegramBot.sendMessage(msg).catch(error => {
      //   accessLogger.error(`send telegram message error ${error.stack}`);
      // });
      return false;
    }

    const txStatus = response['execution_status']
    accessLogger.info(
      `sn_transaction = ${JSON.stringify({ status: txStatus, txID })}`
    )

    // When reject
    if (txStatus == 'REJECTED') {
      errorLogger.info(
        `starknet transfer failed: ${txStatus}, txID:${txID}, transactionID:${JSON.stringify(paramsList.map(item => item.transactionID))}`
        
      )
        telegramBot.sendMessage(`starknet transfer failed: ${txStatus}, txID:${txID}, transactionID:${JSON.stringify(paramsList.map(item => item.transactionID))}`).catch(error => {
            accessLogger.error(`send telegram message error ${error.stack}`);
        });
      return false
    } else if (
      ['ACCEPTED_ON_L1', 'ACCEPTED_ON_L2', 'PENDING', 'SUCCEEDED'].includes(txStatus)
    ) {
      accessLogger.info(
        `sn_Transaction with hash ${txID} has been successfully confirmed`
      )
      const transactionIDList: string[] = paramsList.map(item => item.transactionID);
      accessLogger.info(
        'update maker_node =',
        `state = 3 WHERE transactionID in (${transactionIDList})`
      );
      await repositoryMakerNode().update(
        { transactionID: In(transactionIDList) },
        { state: 3 }
      );
      return true
    }
    await sleep(1000 * 30)
    return await confirmToSNTransaction(
      txID,
      chainId,
      paramsList,
      rollback
    )
  } catch (error) {
    getLoggerService(String(chainId)).error(
      `confirmToSNTransaction error ${error.message}`
    );
    if (Number(chainId) === 4 &&
        (error.message.indexOf(`Cannot use 'in' operator to search for 'calldata' in`) !== -1 ||
            error.message.indexOf('Bad Gateway') !== -1)
    ) {
      return;
    }
    telegramBot.sendMessage(`${txID} confirmToSNTransaction error ${paramsList.map(item => item.transactionID)}, ${error.message}`).catch(error => {
      accessLogger.error(`send telegram message error ${error.stack}`);
    });
  }
}

function confirmToZKSTransaction(
  txID: string,
  transactionID: string,
  toChainId: number,
  makerAddress: string
) {
  accessLogger.info(`confirmToZKSTransaction = ${getTime()}`)
  setTimeout(async () => {
    let transferReceipt: any
    const normalTxId = txID.replace('sync-tx:', '0x')
    try {
      transferReceipt = await zkspace_help.getZKSpaceTransactionData(
        toChainId,
        normalTxId
      )
    } catch (err) {
      errorLogger.error(`zks getTxReceipt failed: ${err.message}`)
      return confirmToZKSTransaction(
        txID,
        transactionID,
        toChainId,
        makerAddress
      )
    }
    accessLogger.info(
      `transactionID = ${transactionID} transferReceipt = ${JSON.stringify(transferReceipt)}`      
    )

    if (
      transferReceipt.success === true &&
      transferReceipt.data.success === true &&
      transferReceipt.data.tx_type === 'Transfer' &&
      (transferReceipt.data.status === 'verified' ||
        transferReceipt.data.status === 'pending')
    ) {
      accessLogger.info(
        `zks_Transaction with hash ${txID} has been successfully confirmed`
      )
      accessLogger.info(
        `update maker_node = state = 3 WHERE transactionID = '${transactionID}'`
      )
      try {
        await repositoryMakerNode().update(
          { transactionID: transactionID },
          { state: 3 }
        )
      } catch (error) {
        errorLogger.error(`updateToSqlError = ${error}`)
      }
      return
    }

    // When failReason, don't try again
    if (
      !transferReceipt.success ||
      !transferReceipt.data.success ||
      transferReceipt.data.fail_reason
    ) {
      return
    }
    return confirmToZKSTransaction(txID, transactionID, toChainId, makerAddress)
  }, 8 * 1000)
}

async function getConfirmations(fromChain, txHash): Promise<any> {
  accessLogger.info(`${fromChain} ${txHash} getConfirmations = ${getTime()}`)
  try {
    let web3
    if (
      fromChain === 'metis' ||
      fromChain === 'metis_test' ||
      fromChain === 'zksync2' ||
      fromChain === 'zksync2_test'
    ) {
      //no use alchemy provider
      web3 = new Web3(makerConfig[fromChain].httpEndPoint)
    } else {
      web3 = createAlchemyWeb3(makerConfig[fromChain].httpEndPoint)
    }
    const trx = await web3.eth.getTransaction(txHash)
    const currentBlock = await web3.eth.getBlockNumber()

    if (!trx) {
      return trx
    }
    return trx.blockNumber === null
      ? { confirmations: 0, trx: trx }
      : { confirmations: currentBlock - trx.blockNumber + 1, trx: trx }
  } catch (error) {
    errorLogger.error(error)
  }
}

function getTime() {
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  return time
}

/**
 *
 * @param makerAddress
 * @param transactionID
 * @param fromChainID
 * @param toChainID
 * @param toChain
 * @param tokenAddress
 * @param amountStr
 * @param toAddress
 * @param pool
 * @param nonce
 * @param result_nonce
 * @param ownerAddress // Cross address ownerAddress
 * @returns
 */
export async function sendTransaction(
  makerAddress: string,
  transactionID,
  fromChainID,
  toChainID,
  toChain,
  tokenAddress,
  amountStr,
  toAddress,
  market,
  nonce,
  result_nonce = 0,
  ownerAddress = '',
  retryCount = 0,
  fromHash?
) {
  const accessLogger = getLoggerService(toChainID);
  const amountToSend = getAmountToSend(
    fromChainID,
    toChainID,
    amountStr,
    market,
    nonce
  )
  if (!amountToSend) {
    return
  }
  if (!amountToSend.state) {
    errorLogger.error(`amountToSend error ${amountToSend.error}`)
    return
  }
  const tAmount = amountToSend.tAmount
  accessLogger.info(`transactionID = ${transactionID}`)
  accessLogger.info(`amountToSend = ${tAmount}`)
  accessLogger.info(`toChain = ${toChain}`)
  accessLogger.info(`retryCount = ${retryCount}`)
  // accessLogger.info(
  // `transactionID=${transactionID}&makerAddress=${makerAddress}&fromChainID=${fromChainID}&toAddress=${toAddress}&toChain=${toChain}&toChainID=${toChainID}`
  // )
  const toChainConfig: any = chains.getChainByInternalId(
    String(toChainID)
  )
  if (!toChainConfig || !toChainConfig.tokens) {
    accessLogger.error(
      `[${transactionID}] The public chain configuration for the payment does not exist, toChainId ${toChainID} `
    )
    return
  }
  const tokenInfo = toChainConfig.tokens.find((token) =>
    equals(token.address, tokenAddress)
  )
  if (!tokenInfo) {
    accessLogger.error(
      `[${transactionID}] The public chain Token configuration for the payment does not exist, toChainId ${toChainID} ${tokenAddress} `
    )
    return
  }
  accessLogger.info(
    `${transactionID} [${process.pid}] Send Queue ${transactionID}`)
  if (!chainQueue[Number(toChainID)]) {
    throw new Error(`No queue created ${toChainID}`);
  }
  chainQueue[Number(toChainID)].enqueue(transactionID, {
    transactionID,
    makerAddress,
    toAddress,
    toChain,
    chainID: toChainID,
    tokenInfo,
    tokenAddress,
    amountToSend: tAmount,
    result_nonce,
    fromChainID,
    lpMemo: nonce,
    ownerAddress,
    fromHash
  }).catch(error => {
    errorLogger.warn(`enqueue error: ${error}`);
  });

}
export async function sendTxConsumeHandle(result: any) {
  const { params, ...response } = result;
  const { transactionID, makerAddress,
    toChain,
    chainID: toChainID,
    amountToSend: tAmount,
    lpMemo: nonce } = params;
  const accessLogger = getLoggerService(toChainID);
  if (response.code !== 0) accessLogger.info(`${transactionID} sendTxConsumeHandle response = ${JSON.stringify(response)}`);
  // code 0:handle single payment 1:fail 2:store multiple transactions 3:handle multiple payments
  if (!response.code) {
    var txID = response.txid
    accessLogger.info(
      `update maker_node: state = 2, toTx = '${txID}', toAmount = ${tAmount} where transactionID=${transactionID}`
    )
    try {
      await repositoryMakerNode().update(
        { transactionID: transactionID },
        {
          toTx: txID,
          toAmount: tAmount,
          state: 2,
        }
      )
      accessLogger.info(
        `[${transactionID}] sendTransaction toChain ${toChain} update success`
      )
    } catch (error) {
      errorLogger.error(`[${transactionID}] updateToSqlError = ${error}`)
      return
    }
    if (response.zkProvider && (toChainID === 3 || toChainID === 33)) {
      let syncProvider = response.zkProvider
      // confirmToZKTransaction(syncProvider, txID, transactionID)
    } else if (toChainID === 4 || toChainID === 44) {
      confirmToSNTransaction(
        txID,
        toChainID,
        [{ makerAddress, transactionID }],
        response.rollback
      )
    } else if (toChainID === 8 || toChainID === 88) {
      console.warn({ toChainID, toChain, txID, transactionID })
    } else if (toChainID === 9 || toChainID === 99) {
      confirmToLPTransaction(txID, transactionID, toChainID, makerAddress)
    } else if (toChainID === 11 || toChainID === 511) {
      accessLogger.info(
        `dYdX transfer succceed. txID: ${txID}, transactionID: ${transactionID}`
      )
    } else if (toChainID === 12 || toChainID === 512) {
      if (txID.indexOf('sync-tx:') != -1) {
        txID = txID.replace('sync-tx:', '0x')
      }
      confirmToZKSTransaction(txID, transactionID, toChainID, makerAddress)
    } else {
      confirmToTransaction(toChainID, toChain, txID, transactionID)
    }
    await repositoryMakerNodeTodo().update({ transactionID }, { state: 1 })
    // update todo
  } else if (response.code === 2) {
    // Store multiple transactions
    console.log(`Store success toChainID: ${toChainID} tAmount: ${tAmount}`)
    accessLogger.info(`Store success toChainID: ${toChainID} tAmount: ${tAmount}`);
  } else if (response.code === 3) {
    // handle multiple transactions
    await handleParamsList(result);
  } else if (response.code === 4) {
    if (!result?.paramsList || !result?.paramsList.length) {
      return;
    }
    const transactionIDList: string[] = result.paramsList.map(item => item.transactionID);
    errorLogger.error(
      `updateError maker_node = state = 20 WHERE transactionID in ('${transactionIDList}')`
    );
    try {
      await repositoryMakerNode().update(
        { transactionID: In(transactionIDList) },
        { state: 20 }
      );
      accessLogger.info(
        `[${transactionIDList}] sendTransaction toChain ${toChain} state = 20  update success`
      );
    } catch (error) {
      errorLogger.error(`[${transactionIDList}] updateErrorSqlError = ${error}`);
      return;
    }
    if (Number(toChainID) === 4 || Number(toChainID) === 44) {
      // handle multiple transactions fail
      if (response.txid.indexOf('StarkNet Alpha throughput limit reached') !== -1 ||
          response.txid.indexOf('Bad Gateway') !== -1) {
        return;
      } else if (response.txid.indexOf('Invalid transaction nonce. Expected:') !== -1 && response.txid.indexOf('got:') !== -1) {
        // const arr: string[] = response.txid.split(', got: ');
        // const nonce1 = arr[0].replace(/[^0-9]/g, "");
        // const nonce2 = arr[1].replace(/[^0-9]/g, "");
        // if (Number(response.result_nonce) !== Number(nonce1) && Number(response.result_nonce) !== Number(nonce2)) {
        //   return;
        // }
        return;
      } else if (response.txid.indexOf('-32603: HTTP status client error (429 Too Many Requests) for url (https://alpha-mainnet.starknet.io/gateway/add_transaction)') !== -1) {
        return;
      }
    }
    telegramBot.sendMessage(`Send Transaction Error ${makerAddress} toChain: ${toChainID}, transactionID: ${transactionIDList}, errmsg: ${response.txid}`).catch(error => {
      accessLogger.error(`send telegram message error ${error.stack}`);
    });
    let alert = 'Send Transaction Error Count ' + transactionIDList.length;
    try {
      doSms(alert);
    } catch (error) {
      errorLogger.error(
        `[${transactionIDList}] sendTransactionErrorMessage = ${error}`
      );
    }
  } else {

    errorLogger.error(
      `updateError maker_node = state = 20 WHERE transactionID = '${transactionID}'`
    )
    try {
      await repositoryMakerNode().update(
        { transactionID: transactionID },
        { state: 20 }
      )
      accessLogger.info(
        `[${transactionID}] sendTransaction toChain ${toChain} state = 20  update success`
      )
    } catch (error) {
      errorLogger.error(`[${transactionID}] updateErrorSqlError = ${error}`)
      return
    }
    if (!(typeof response.error === 'object' && response.error.message.includes("nonce too high. allowed nonce range"))) {
      telegramBot.sendMessage(`Send Transaction Error ${makerAddress} toChain: ${toChainID}, transactionID: ${transactionID}, errmsg: ${response.txid}`).catch(error => {
        accessLogger.error(`send telegram message error ${error.stack}`);
      })
      let alert = 'Send Transaction Error ' + transactionID
      try {
        doSms(alert)
      } catch (error) {
        errorLogger.error(
          `[${transactionID}] sendTransactionErrorMessage = ${error}`
        )
      }
    }
  }
}

async function handleParamsList(result) {
  let { params, paramsList, ...response } = result;
  const txID = response.txid;
  const { chainID: toChainID } = params;
  paramsList = paramsList || [params];
  const accessLogger = getLoggerService(toChainID);
  const transactionIDList: string[] = paramsList.map(item => item.transactionID);
  accessLogger.info(`${transactionIDList} sendTxConsumeHandle response = ${JSON.stringify(response)}`);
  accessLogger.info(
    `update maker_node: state = 2, toTx = '${txID}' where transactionID in (${transactionIDList})`
  );
  try {
    await repositoryMakerNode().update(
      { transactionID: In(transactionIDList) },
      {
        toTx: txID,
        state: 2,
      }
    );
    accessLogger.info(
      `[${transactionIDList}] sendTransaction update success`
    );
  } catch (error) {
    errorLogger.error(`[${transactionIDList}] updateToSqlError = ${error}`);
    return;
  }

  if (toChainID === 4 || toChainID === 44) {
    const txID = response.txid;
    confirmToSNTransaction(
      txID,
      toChainID,
      paramsList,
      response.rollback
    );
  }
}
