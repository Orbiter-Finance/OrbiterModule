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
import { Repository } from 'typeorm'
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
import { getProviderV4 } from '../../service/starknet/helper'
import { IChainConfig } from 'orbiter-chaincore/src/types'
const PrivateKeyProvider = require('truffle-privatekey-provider')
import { doSms } from '../../sms/smsSchinese'
import { getAmountToSend } from './core'

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
      precision: pool.precision,
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
      precision: pool.precision,
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
        walletType: ConnectorNames.WalletLink,
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
  confirmations = 3
) {
  accessLogger.info(`[${transactionID}] confirmToTransaction =`, getTime())
  setTimeout(async () => {
    const trxConfirmations = await getConfirmations(Chain, txHash)
    if (!trxConfirmations) {
      return confirmToTransaction(
        ChainID,
        Chain,
        txHash,
        transactionID,
        confirmations
      )
    }
    accessLogger.info(
      `[${transactionID}] Transaction with hash ` +
        txHash +
        ' has ' +
        trxConfirmations.confirmations +
        ' confirmation(s)'
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
        errorLogger.error('getBlockError =', error)
      }

      accessLogger.info(
        `[${transactionID}] Transaction with hash ` +
          txHash +
          ' has been successfully confirmed'
      )
      return
    }
    return confirmToTransaction(
      ChainID,
      Chain,
      txHash,
      transactionID,
      confirmations
    )
  }, 8 * 1000)
}

function confirmToZKTransaction(syncProvider, txID, transactionID) {
  accessLogger.info('confirmToZKTransaction =', getTime())
  setTimeout(async () => {
    let transferReceipt: any
    try {
      transferReceipt = await syncProvider.getTxReceipt(txID)
    } catch (err) {
      errorLogger.error('zkSync getTxReceipt failed: ' + err.message)
      return confirmToZKTransaction(syncProvider, txID, transactionID)
    }

    accessLogger.info(
      'transactionID =',
      transactionID,
      'transferReceipt =',
      JSON.stringify(transferReceipt)
    )

    if (
      transferReceipt.executed &&
      transferReceipt.success &&
      !transferReceipt.failReason
    ) {
      accessLogger.info(
        'zk_Transaction with hash ' + txID + ' has been successfully confirmed'
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
        errorLogger.error('updateToSqlError =', error)
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
  accessLogger.info('confirmToLPTransaction =', getTime())
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
            'lp_Transaction with hash ' +
              txID +
              ' has been successfully confirmed'
          )
          try {
            await repositoryMakerNode().update(
              { transactionID: transactionID },
              { state: 3 }
            )
          } catch (error) {
            errorLogger.error('updateToSqlError =', error)
          }
          return
        }
      }
    } catch (err) {
      errorLogger.error('loopring getTxReceipt failed: ' + err.message)
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
  transactionID: string,
  chainId: number,
  makerAddress: string,
  nonce: string,
  rollback: any
) {
  try {
    accessLogger.info('confirmToSNTransaction =', getTime())
    const provider = getProviderV4(
      Number(chainId) == 4 ? 'mainnet-alpha' : 'georli-alpha'
    )
    const response = await provider.getTransaction(txID)
    const txStatus = response['status']
    accessLogger.info(
      'sn_transaction =',
      JSON.stringify({ status: txStatus, txID })
    )

    // When reject
    if (txStatus == 'REJECTED') {
      errorLogger.info(
        `starknet transfer failed: ${txStatus}, txID:${txID}, transactionID:${transactionID} transaction_failure_reason,`,
        response['transaction_failure_reason']
      )
      // check nonce
      // if (
      //   response['transaction_failure_reason'] &&
      //   response['transaction_failure_reason']['error_message'].includes(
      //     'Error message: nonce invalid'
      //   )
      // ) {
      //   return true
      // }
      return false
      // return rollback(transaction['transaction_failure_reason'] && transaction['transaction_failure_reason']['error_message'], nonce);
    } else if (
      ['ACCEPTED_ON_L1', 'ACCEPTED_ON_L2', 'PENDING'].includes(txStatus)
    ) {
      accessLogger.info(
        'sn_Transaction with hash ' + txID + ' has been successfully confirmed'
      )
      accessLogger.info(
        'update maker_node =',
        `state = 3 WHERE transactionID = '${transactionID}'`
      )
      await repositoryMakerNode().update(
        { transactionID: transactionID },
        { state: 3 }
      )
      return true
    }
    await sleep(1000 * 30)
    return await confirmToSNTransaction(
      txID,
      transactionID,
      chainId,
      makerAddress,
      nonce,
      rollback
    )
  } catch (error) {
    getLoggerService(String(chainId)).error(
      'confirmToSNTransaction error',
      error.message
    )
  }
}

function confirmToZKSTransaction(
  txID: string,
  transactionID: string,
  toChainId: number,
  makerAddress: string
) {
  accessLogger.info('confirmToZKSTransaction =', getTime())
  setTimeout(async () => {
    let transferReceipt: any
    const normalTxId = txID.replace('sync-tx:', '0x')
    try {
      transferReceipt = await zkspace_help.getZKSpaceTransactionData(
        toChainId,
        normalTxId
      )
    } catch (err) {
      errorLogger.error('zks getTxReceipt failed: ' + err.message)
      return confirmToZKSTransaction(
        txID,
        transactionID,
        toChainId,
        makerAddress
      )
    }
    accessLogger.info(
      'transactionID =',
      transactionID,
      'transferReceipt =',
      JSON.stringify(transferReceipt)
    )

    if (
      transferReceipt.success === true &&
      transferReceipt.data.success === true &&
      transferReceipt.data.tx_type === 'Transfer' &&
      (transferReceipt.data.status === 'verified' ||
        transferReceipt.data.status === 'pending')
    ) {
      accessLogger.info(
        'zks_Transaction with hash ' + txID + ' has been successfully confirmed'
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
        errorLogger.error('updateToSqlError =', error)
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
  accessLogger.info('getConfirmations =', getTime())
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
  pool,
  nonce,
  result_nonce = 0,
  ownerAddress = ''
) {
  const accessLogger = getLoggerService(toChainID);
  const amountToSend = getAmountToSend(
    fromChainID,
    toChainID,
    amountStr,
    pool,
    nonce
  )
  if (!amountToSend) {
    return
  }
  if (!amountToSend.state) {
    errorLogger.error('amountToSend error', amountToSend.error)
    return
  }
  const tAmount = amountToSend.tAmount
  accessLogger.info('transactionID =', transactionID)
  accessLogger.info('amountToSend =', tAmount)
  accessLogger.info('toChain =', toChain)
  // accessLogger.info(
  // `transactionID=${transactionID}&makerAddress=${makerAddress}&fromChainID=${fromChainID}&toAddress=${toAddress}&toChain=${toChain}&toChainID=${toChainID}`
  // )
  const toChainConfig: IChainConfig = chains.getChainByInternalId(
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
    `${transactionID} Exec Send Transfer`,
    JSON.stringify({
      makerAddress,
      toAddress,
      toChain,
      fromChainID,
      toChainID,
      tokenAddress,
      tAmount,
      result_nonce,
      nonce,
      tokenInfo,
    })
  )
  await send(
    makerAddress,
    toAddress,
    toChain,
    toChainID,
    tokenInfo,
    // getTokenInfo(toChainID, tokenAddress),
    tokenAddress,
    tAmount,
    result_nonce,
    fromChainID,
    nonce,
    ownerAddress
  )
    .then(async (response) => {
      const accessLogger = getLoggerService(toChainID);
      accessLogger.info('response =', response)
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
          errorLogger.error(`[${transactionID}] updateToSqlError =`, error)
          return
        }
        if (response.zkProvider && (toChainID === 3 || toChainID === 33)) {
          let syncProvider = response.zkProvider
          confirmToZKTransaction(syncProvider, txID, transactionID)
        } else if (toChainID === 4 || toChainID === 44) {
          confirmToSNTransaction(
            txID,
            transactionID,
            toChainID,
            makerAddress,
            nonce,
            response.rollback
          )
        } else if (toChainID === 8 || toChainID === 88) {
          console.warn({ toChainID, toChain, txID, transactionID })
          // confirmToSNTransaction(txID, transactionID, toChainID)
        } else if (toChainID === 9 || toChainID === 99) {
          confirmToLPTransaction(txID, transactionID, toChainID, makerAddress)
        } else if (toChainID === 11 || toChainID === 511) {
          accessLogger.info(
            `dYdX transfer succceed. txID: ${txID}, transactionID: ${transactionID}`
          )
          // confirmToSNTransaction(txID, transactionID, toChainID)
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
      } else {
        errorLogger.error(
          'updateError maker_node =',
          `state = 20 WHERE transactionID = '${transactionID}'`
        )
        try {
          await repositoryMakerNode().update(
            { transactionID: transactionID },
            { state: 20 }
          )
          accessLogger.info(
            `[${transactionID}] sendTransaction toChain ${toChain} state = 20  update success`
          )
          // todo need result_nonce
          // if (response.result_nonce > 0) {
          //   // insert or update todo
          //   const todo = await repositoryMakerNodeTodo().findOne({
          //     transactionID,
          //   })
          //   if (todo) {
          //     await repositoryMakerNodeTodo().increment(
          //       { transactionID },
          //       'do_current',
          //       1
          //     )
          //   } else {
          //     await repositoryMakerNodeTodo().insert({
          //       transactionID,
          //       makerAddress,
          //       data: JSON.stringify({
          //         transactionID,
          //         fromChainID,
          //         toChainID,
          //         toChain,
          //         tokenAddress,
          //         amountStr,
          //         fromAddress,
          //         pool,
          //         nonce,
          //         result_nonce: response.result_nonce,
          //       }),
          //       do_state: 20,
          //     })
          //   }
          // }
        } catch (error) {
          errorLogger.error(`[${transactionID}] updateErrorSqlError =`, error)
          return
        }
        let alert = 'Send Transaction Error ' + transactionID
        try {
          doSms(alert)
        } catch (error) {
          errorLogger.error(
            `[${transactionID}] sendTransactionErrorMessage =`,
            error
          )
        }
      }
    })
    .catch((error) => {
      errorLogger.warn(error)
    })
}
