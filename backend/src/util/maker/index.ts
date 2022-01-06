import { AlchemyWeb3, createAlchemyWeb3 } from '@alch/alchemy-web3'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import { Repository } from 'typeorm'
import Web3 from 'web3'
import { isEthTokenAddress } from '..'
import { makerConfig } from '../../config'
import { MakerNode } from '../../model/maker_node'
import { MakerNodeTodo } from '../../model/maker_node_todo'
import { MakerZkHash } from '../../model/maker_zk_hash'
import { Core } from '../core'
import { accessLogger, errorLogger } from '../logger'
import { Web3Orbiter } from '../web3_orbiter'
import * as orbiterCore from './core'
import { makerList } from './maker_list'
import send from './send'

const web3List: AlchemyWeb3[] = []
const zkTokenInfo: any[] = []
const matchHashList: any[] = [] // Intercept multiple receive

const repositoryMakerNode = (): Repository<MakerNode> => {
  return Core.db.getRepository(MakerNode)
}
const repositoryMakerNodeTodo = (): Repository<MakerNodeTodo> => {
  return Core.db.getRepository(MakerNodeTodo)
}
const repositoryMakerZkHash = (): Repository<MakerZkHash> => {
  return Core.db.getRepository(MakerZkHash)
}

// function stopMaker() {
//   for (const web3 of web3List) {
//     web3.eth.clearSubscriptions(() => {})
//   }
//   web3List.splice(0, web3List.length)
//   return 'stop Maker'
// }
export async function startMaker() {
  for (const web3 of web3List) {
    web3.eth.clearSubscriptions(() => {})
  }

  var poolList = await getMakerList()
  if (poolList.length === 0) {
    return 'none poollist'
  }
  for (const pool of poolList) {
    if (!pool.t1Address || !pool.t2Address) {
      continue
    }

    watchPool(pool)
  }
  return 'start Maker'
}

export async function getMakerList() {
  return makerList
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

function watchPool(pool) {
  const expan = expanPool(pool)
  accessLogger.info('userpool1 =', expan.pool1)
  accessLogger.info('userpool2 =', expan.pool2)

  watchTransfers(expan.pool1, 0)
  watchTransfers(expan.pool2, 1)
}

/*
  pool
  state    0 / 1   listen C1 /  listen C2
 */
function watchTransfers(pool, state) {
  // Instantiate web3 with WebSocketProvider
  let wsEndPoint = state
    ? makerConfig[pool.c2Name].wsEndPoint
    : makerConfig[pool.c1Name].wsEndPoint
  let tokenAddress = state ? pool.t2Address : pool.t1Address
  let fromChainID = state ? pool.c2ID : pool.c1ID
  let toChainID = state ? pool.c1ID : pool.c2ID

  if (wsEndPoint === null) {
    //zk || zk_test
    let httpEndPoint = state
      ? makerConfig[pool.c2Name].httpEndPoint
      : makerConfig[pool.c1Name].httpEndPoint

    const zkTokenInfoUrl = httpEndPoint + '/tokens/' + tokenAddress
    axios
      .get(zkTokenInfoUrl)
      .then(function (response) {
        if (response.status === 200) {
          var respData = response.data
          if (respData.status === 'success') {
            zkTokenInfo.push(respData.result)
            accessLogger.info('zkTokenInfo =', zkTokenInfo)
          } else {
            // error
          }
        } else {
          // error
        }
      })
      .catch(function (error) {
        errorLogger.error('error =', error)
      })

    confirmZKTransaction(httpEndPoint, pool, tokenAddress, state)
    return
  }
  // var socketOptions = {
  //   clientConfig: {
  //     keepalive: true,
  //     keepaliveInterval: 60000,
  //   },
  //   reconnect: {
  //     auto: true,
  //     delay: 1000,
  //     maxAttempts: Infinity,
  //     onTimeout: false,
  //   },
  // }
  // const web3 = new Web3(
  //   new Web3.providers.WebsocketProvider(wsEndPoint, socketOptions),
  // )
  const web3 = createAlchemyWeb3(wsEndPoint)

  // checkData
  const checkData = async (amount: string, transactionHash: string) => {
    const ptext = orbiterCore.getPTextFromTAmount(fromChainID, amount)
    if (ptext.state === false) {
      return
    }
    const pText = ptext.pText
    let validPText = (9000 + Number(toChainID)).toString()

    const realAmount = orbiterCore.getRAmountFromTAmount(fromChainID, amount)
    if (realAmount.state === false) {
      return
    }
    const rAmount = <any>realAmount.rAmount
    if (
      new BigNumber(rAmount).comparedTo(
        new BigNumber(pool.maxPrice)
          .plus(new BigNumber(pool.tradingFee))
          .multipliedBy(new BigNumber(10 ** pool.precision))
      ) === 1 ||
      new BigNumber(rAmount).comparedTo(
        new BigNumber(pool.minPrice)
          .plus(new BigNumber(pool.tradingFee))
          .multipliedBy(new BigNumber(10 ** pool.precision))
      ) === -1 ||
      pText !== validPText
    ) {
      // donothing
    } else {
      if (matchHashList.indexOf(transactionHash) > -1) {
        accessLogger.info('event.transactionHash exist: ' + transactionHash)
        return
      }
      matchHashList.push(transactionHash)

      // Initiate transaction confirmation
      accessLogger.info('match one transaction')
      confirmFromTransaction(pool, state, transactionHash)
    }
  }

  if (isEthTokenAddress(tokenAddress)) {
    new Web3Orbiter(<any>web3).transferListen(
      { to: makerConfig.makerAddress },
      {
        onConfirmation: (transaction) => {
          if (!transaction.hash) {
            return
          }

          checkData(transaction.value + '', transaction.hash)
        },
        onConnected: (subscriptionId) => {
          accessLogger.info(
            'eth subscriptionId =',
            subscriptionId,
            ' time =',
            getTime()
          )
        },
      }
    )
  } else {
    // Instantiate token contract object with JSON ABI and address
    const tokenContract = new web3.eth.Contract(
      <any>makerConfig.ABI,
      tokenAddress
    )

    // Generate filter options
    const options = {
      filter: {
        to: makerConfig.makerAddress,
      },
      fromBlock: 'latest',
    }

    // Subscribe to Transfer events matching filter criteria
    tokenContract.events
      .Transfer(options, (error, event) => {
        if (error) {
          errorLogger.error('wsEndPoint =', wsEndPoint)
          errorLogger.error(error)
          return
        }

        if (event.returnValues.to === makerConfig.makerAddress) {
          checkData(event.returnValues.value, event.transactionHash)
        } else {
          accessLogger.info('over')
        }
      })
      .on('connected', (subscriptionId: string) => {
        accessLogger.info(
          'contract subscriptionId =',
          subscriptionId,
          ' time =',
          getTime()
        )
      })
  }
}

function confirmZKTransaction(httpEndPoint, pool, tokenAddress, state) {
  let isFirst = true
  setInterval(async () => {
    let fromChainID = state ? pool.c2ID : pool.c1ID
    let toChainID = state ? pool.c1ID : pool.c2ID
    let toChain = state ? pool.c1Name : pool.c2Name
    let validPText = (9000 + Number(toChainID)).toString()

    let lastHash = ''
    try {
      const makerZkHash = await repositoryMakerZkHash().findOne(
        {
          makerAddress: pool.makerAddress,
          validPText: validPText,
          tokenAddress: tokenAddress,
        },
        { select: ['id', 'txhash'] }
      )
      if (makerZkHash) {
        lastHash = makerZkHash.txhash
      }
    } catch (error) {
      errorLogger.error('isHaveZkHashError =', error)
    }
    var zkInfoParams = {
      from: lastHash ? lastHash : 'latest',
      limit: 100,
      direction: 'newer',
    }
    const url =
      httpEndPoint + '/accounts/' + pool.makerAddress + '/transactions'
    axios
      .get(url, {
        params: zkInfoParams,
      })
      .then(async function (response) {
        if (response.status === 200) {
          var respData = response.data
          if (respData.status === 'success') {
            if (respData.result.list.length !== 0) {
              for (
                let index = 0;
                index < respData.result.list.length;
                index++
              ) {
                const element = respData.result.list[index]
                if (
                  element.failReason === null &&
                  element.op.type === 'Transfer' &&
                  (element.status === 'committed' ||
                    element.status === 'finalized')
                ) {
                  let tokenID = getZKTokenID(tokenAddress)

                  const ptext = orbiterCore.getPTextFromTAmount(
                    fromChainID,
                    element.op.amount
                  )
                  if (ptext.state === false) {
                    break
                  }
                  const pText = ptext.pText

                  const realAmount = orbiterCore.getRAmountFromTAmount(
                    fromChainID,
                    element.op.amount
                  )
                  if (realAmount.state === false) {
                    return
                  }
                  const rAmount = <any>realAmount.rAmount
                  if (
                    new BigNumber(rAmount).comparedTo(
                      new BigNumber(pool.maxPrice)
                        .plus(new BigNumber(pool.tradingFee))
                        .multipliedBy(new BigNumber(10 ** pool.precision))
                    ) === 1 ||
                    new BigNumber(rAmount).comparedTo(
                      new BigNumber(pool.minPrice)
                        .plus(new BigNumber(pool.tradingFee))
                        .multipliedBy(new BigNumber(10 ** pool.precision))
                    ) === -1 ||
                    pText !== validPText
                  ) {
                    // donothing
                  } else {
                    if (
                      element.txHash !== lastHash &&
                      element.op.type === 'Transfer' &&
                      element.op.to.toLowerCase() ===
                        makerConfig.makerAddress.toLowerCase() &&
                      element.op.token === tokenID &&
                      pText === validPText
                    ) {
                      accessLogger.info('element =', element)
                      accessLogger.info('match one transaction')
                      let nonce = element.op.nonce
                      accessLogger.info(
                        'Transaction with hash ' +
                          element.txHash +
                          'nonce ' +
                          nonce +
                          ' has found'
                      )
                      var transactionID =
                        element.op.from.toLowerCase() + fromChainID + nonce
                      let makerNode: MakerNode | undefined
                      try {
                        makerNode = await repositoryMakerNode().findOne(
                          { transactionID: transactionID },
                          { select: ['id'] }
                        )
                      } catch (error) {
                        errorLogger.error('zk_isHaveSqlError =', error)
                        break
                      }
                      if (!makerNode && !isFirst) {
                        accessLogger.info('newTransacioonID =', transactionID)
                        await repositoryMakerNode()
                          .insert({
                            transactionID: transactionID,
                            userAddress: element.op.from,
                            makerAddress: makerConfig.makerAddress,
                            fromChain: fromChainID,
                            toChain: toChainID,
                            formTx: element.txHash,
                            fromTimeStamp: orbiterCore.transferTimeStampToTime(
                              element.createdAt ? element.createdAt : '0'
                            ),
                            fromAmount: element.op.amount,
                            formNonce: element.op.nonce,
                            txToken: tokenAddress,
                            state: 1,
                          })
                          .then(async () => {
                            var toTokenAddress = state
                              ? pool.t1Address
                              : pool.t2Address
                            sendTransaction(
                              transactionID,
                              fromChainID,
                              toChainID,
                              toChain,
                              toTokenAddress,
                              element.op.amount,
                              element.op.from,
                              pool,
                              element.op.nonce
                            )
                          })
                          .catch((error) => {
                            errorLogger.error('newTransactionSqlError =', error)
                            return
                          })
                      }
                    }
                  }
                  if (index === respData.result.list.length - 1) {
                    if (lastHash && element.txHash !== lastHash) {
                      try {
                        await repositoryMakerZkHash().update(
                          {
                            makerAddress: makerConfig.makerAddress,
                            validPText: validPText,
                            tokenAddress: tokenAddress,
                          },
                          { txhash: element.txHash }
                        )
                        accessLogger.info('update success')
                      } catch (error) {
                        if (error) {
                          errorLogger.error('updateHashError =', error)
                        }
                      }
                    }
                    if (!lastHash) {
                      try {
                        const rst = await repositoryMakerZkHash().insert({
                          makerAddress: makerConfig.makerAddress,
                          validPText: validPText,
                          tokenAddress: tokenAddress,
                          txhash: element.txHash,
                        })
                        accessLogger.info('newHashResult =', rst)
                      } catch (error) {
                        errorLogger.error('newHashSqlError =', error)
                      }
                    }
                  }
                }
              }
            }
          } else {
            errorLogger.error('error1 =', respData)
          }
        } else {
          errorLogger.error('error2 =', respData)
        }
        isFirst = false
      })
      .catch(function (error) {
        errorLogger.error('error3 = getZKTransactionListError')
      })
  }, 10 * 1000)
}

function confirmFromTransaction(pool, state, txHash, confirmations = 3) {
  accessLogger.info('confirmFromTransaction =', getTime())

  setTimeout(async () => {
    var fromChain = state ? pool.c2Name : pool.c1Name
    var toChain = state ? pool.c1Name : pool.c2Name
    var tokenAddress = state ? pool.t1Address : pool.t2Address
    var toChainID = state ? pool.c1ID : pool.c2ID
    var fromChainID = state ? pool.c2ID : pool.c1ID
    const trxConfirmations = await getConfirmations(fromChain, txHash)

    // TODO
    if (!trxConfirmations) {
      return confirmFromTransaction(pool, state, txHash, confirmations)
    }

    var trx = trxConfirmations.trx

    accessLogger.info(
      'Transaction with hash ' +
        txHash +
        ' has ' +
        trxConfirmations.confirmations +
        ' confirmation(s)'
    )
    var transactionID = trx.from.toLowerCase() + fromChainID + trx.nonce

    let amountStr = '0'
    if (isEthTokenAddress(tokenAddress)) {
      console.log(Web3.utils.toHex(trx.value), trx.value)
      amountStr = Web3.utils.hexToNumberString(Web3.utils.toHex(trx.value))
    } else {
      const amountHex = '0x' + trx.input.slice(74)
      amountStr = Web3.utils.hexToNumberString(amountHex)
    }

    let makerNode: MakerNode | undefined
    try {
      makerNode = await repositoryMakerNode().findOne({
        transactionID: transactionID,
      })
    } catch (error) {
      errorLogger.error('isHaveSqlError =', error)
      return
    }
    if (!makerNode) {
      // const fromWeb3 = new Web3(config[fromChain].httpEndPoint)
      const fromWeb3 = createAlchemyWeb3(makerConfig[fromChain].httpEndPoint)
      var info = <any>{}
      try {
        info = await fromWeb3.eth.getBlock(trx.blockNumber)
      } catch (error) {
        errorLogger.error('getBlockError =', error)
      }

      try {
        await repositoryMakerNode().insert({
          transactionID: transactionID,
          userAddress: trx.from,
          makerAddress: makerConfig.makerAddress,
          fromChain: fromChainID,
          toChain: toChainID,
          formTx: trx.hash,
          fromTimeStamp: orbiterCore.transferTimeStampToTime(
            info.timestamp ? info.timestamp : '0'
          ),
          fromAmount: amountStr,
          formNonce: trx.nonce,
          txToken: tokenAddress,
          state: 0,
        })
        accessLogger.info('add success')
      } catch (error) {
        errorLogger.error('newTransactionSqlError =', error)
      }
    }
    if (trxConfirmations.confirmations >= confirmations) {
      accessLogger.info(
        'Transaction with hash ' + txHash + ' has been successfully confirmed'
      )
      accessLogger.info(
        'updateFromSql =',
        `state = 1 WHERE transactionID = '${transactionID}'`
      )
      try {
        await repositoryMakerNode().update(
          { transactionID: transactionID },
          { state: 1 }
        )
        accessLogger.info('update success')
      } catch (error) {
        errorLogger.error('updateFromError =', error)
        return
      }

      sendTransaction(
        transactionID,
        fromChainID,
        toChainID,
        toChain,
        tokenAddress,
        amountStr,
        trx.from,
        pool,
        trx.nonce
      )

      return
    }
    return confirmFromTransaction(pool, state, txHash, confirmations)
  }, 20 * 1000)
}

function confirmToTransaction(
  ChainID,
  Chain,
  txHash,
  transactionID,
  confirmations = 3
) {
  accessLogger.info('confirmToTransaction =', getTime())
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
      'Transaction with hash ' +
        txHash +
        ' has ' +
        trxConfirmations.confirmations +
        ' confirmation(s)'
    )

    if (trxConfirmations.confirmations >= confirmations) {
      // const toWeb3 = new Web3(config[Chain].httpEndPoint)
      const toWeb3 = createAlchemyWeb3(makerConfig[Chain].httpEndPoint)

      var info = <any>{}
      try {
        info = await toWeb3.eth.getBlock(trxConfirmations.trx.blockNumber)
      } catch (error) {
        errorLogger.error('getBlockError =', error)
      }
      var timestamp = orbiterCore.transferTimeStampToTime(
        info.timestamp ? info.timestamp : '0'
      )

      accessLogger.info(
        'Transaction with hash ' + txHash + ' has been successfully confirmed'
      )
      accessLogger.info(
        'update maker_node =',
        `state = 3, toTimeStamp = '${timestamp}' WHERE transactionID = '${transactionID}'`
      )
      try {
        await repositoryMakerNode().update(
          { transactionID: transactionID },
          { toTimeStamp: timestamp, state: 3 }
        )
        accessLogger.info('update success')
      } catch (error) {
        errorLogger.error('updateToSqlError =', error)
        return
      }
      return
    }
    return confirmToTransaction(
      ChainID,
      Chain,
      txHash,
      transactionID,
      confirmations
    )
  }, 20 * 1000)
}

function confirmToZKTransaction(syncProvider, txID, transactionID = undefined) {
  accessLogger.info('confirmToZKTransaction =', getTime())
  setTimeout(async () => {
    const transferReceipt = await syncProvider.getTxReceipt(txID)
    accessLogger.info('transferReceipt =', transferReceipt)
    if (
      transferReceipt.executed &&
      transferReceipt.success &&
      !transferReceipt.failReason
    ) {
      accessLogger.info({ transferReceipt })
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
    return confirmToZKTransaction(syncProvider, txID)
  }, 20 * 1000)
}

async function getConfirmations(fromChain, txHash): Promise<any> {
  accessLogger.info('getConfirmations =', getTime())
  try {
    // const web3 = new Web3(config[fromChain].httpEndPoint)
    const web3 = createAlchemyWeb3(makerConfig[fromChain].httpEndPoint)

    const trx = await web3.eth.getTransaction(txHash)

    const currentBlock = await web3.eth.getBlockNumber()

    if (!trx) {
      return trx
    }
    return trx.blockNumber === null
      ? { confirmations: 0, trx: trx }
      : { confirmations: currentBlock - trx.blockNumber, trx: trx }
  } catch (error) {
    errorLogger.error(error)
  }
}

function getZKTokenID(tokenAddress) {
  if (!zkTokenInfo.length) {
    return null
  } else {
    for (let index = 0; index < zkTokenInfo.length; index++) {
      const tokenInfo = zkTokenInfo[index]
      if (tokenInfo.address === tokenAddress) {
        return tokenInfo.id
      }
    }
  }
}

function getTime() {
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  return time
}

/**
 * Get return amount
 * @param fromChainID
 * @param toChainID
 * @param amountStr
 * @param pool
 * @param nonce
 * @returns
 */
export function getAmountToSend(
  fromChainID: number,
  toChainID: number,
  amountStr: string,
  pool: { precision: number; tradingFee: number; gasFee: number },
  nonce: string | number
) {
  const realAmount = orbiterCore.getRAmountFromTAmount(fromChainID, amountStr)
  if (!realAmount.state) {
    errorLogger.error(realAmount.error)
    return
  }
  const rAmount = <any>realAmount.rAmount
  if (nonce > 8999) {
    errorLogger.error('nonce too high, not allowed')
    return
  }
  var nonceStr = orbiterCore.pTextFormatZero(nonce)
  var readyAmount = orbiterCore.getToAmountFromUserAmount(
    new BigNumber(rAmount).dividedBy(new BigNumber(10 ** pool.precision)),
    pool,
    true
  )

  return orbiterCore.getTAmountFromRAmount(toChainID, readyAmount, nonceStr)
}

/**
 *
 * @param transactionID
 * @param fromChainID
 * @param toChainID
 * @param toChain
 * @param tokenAddress
 * @param amountStr
 * @param fromAddress
 * @param pool
 * @param nonce
 * @param result_nonce
 * @returns
 */
export async function sendTransaction(
  transactionID,
  fromChainID,
  toChainID,
  toChain,
  tokenAddress,
  amountStr,
  fromAddress,
  pool,
  nonce,
  result_nonce = 0
) {
  console.log({ fromChainID, toChainID, amountStr, pool, nonce })
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
    errorLogger.error(amountToSend.error)
    return
  }
  const tAmount = amountToSend.tAmount
  accessLogger.info('amountToSend =', tAmount)
  accessLogger.info('toChain =', toChain)
  await send(
    fromAddress,
    toChain,
    toChainID,
    getZKTokenID(tokenAddress),
    tokenAddress,
    tAmount,
    result_nonce
  ).then(async (response) => {
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
        accessLogger.info('update success')
      } catch (error) {
        errorLogger.error('updateToSqlError =', error)
        return
      }
      if (response.zkProvider && (toChainID === 3 || toChainID === 33)) {
        let syncProvider = response.zkProvider
        confirmToZKTransaction(syncProvider, txID, transactionID)
      } else {
        confirmToTransaction(toChainID, toChain, txID, transactionID)
      }

      // update todo
      await repositoryMakerNodeTodo().update({ transactionID }, { state: 1 })
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
        accessLogger.info('update success')

        // todo need result_nonce
        if (response.result_nonce > 0) {
          // insert or update todo
          const todo = await repositoryMakerNodeTodo().findOne({
            transactionID,
          })
          if (todo) {
            await repositoryMakerNodeTodo().increment(
              { transactionID },
              'do_current',
              1
            )
          } else {
            await repositoryMakerNodeTodo().insert({
              transactionID,
              data: JSON.stringify({
                transactionID,
                fromChainID,
                toChainID,
                toChain,
                tokenAddress,
                amountStr,
                fromAddress,
                pool,
                nonce,
                result_nonce: response.result_nonce,
              }),
              do_state: 20,
            })
          }
        }
      } catch (error) {
        errorLogger.error('updateErrorSqlError =', error)
        return
      }
    }
  })
}
