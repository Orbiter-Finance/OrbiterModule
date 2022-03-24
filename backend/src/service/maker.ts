import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import axios from 'axios'
import { BigNumber } from 'bignumber.js'
import { getSelectorFromName } from 'starknet/dist/utils/stark'
import { Repository } from 'typeorm'
import { makerConfig } from '../config'
import { ServiceError, ServiceErrorCodes } from '../error/service'
import { MakerNode } from '../model/maker_node'
import { MakerNodeTodo } from '../model/maker_node_todo'
import { dateFormatNormal, equalsIgnoreCase, isEthTokenAddress } from '../util'
import { Core } from '../util/core'
import { accessLogger, errorLogger } from '../util/logger'
import {
  expanPool,
  getAllMakerList,
  getMakerList,
  sendTransaction,
} from '../util/maker'
import { CHAIN_INDEX, getPTextFromTAmount } from '../util/maker/core'
import { exchangeToUsd } from './coinbase'
import { IMXHelper } from './immutablex/imx_helper'
import {
  getErc20BalanceByL1,
  getNetworkIdByChainId,
  getProviderByChainId,
} from './starknet/helper'
// import Axios from '../util/Axios'

// Axios.axios()
export const CACHE_KEY_GET_WEALTHS = 'GET_WEALTHS'

const repositoryMakerNode = (): Repository<MakerNode> => {
  return Core.db.getRepository(MakerNode)
}
const repositoryMakerNodeTodo = (): Repository<MakerNodeTodo> => {
  return Core.db.getRepository(MakerNodeTodo)
}

/**
 * @param chainId
 * @param amount
 * @returns
 */
export function getAmountFlag(
  chainId: string | number,
  amount: string | number
): string {
  const rst = getPTextFromTAmount(chainId, amount)
  if (!rst.state) {
    return '0'
  }
  return (Number(rst.pText) % 9000) + ''
}

/**
 * Get maker's addresses
 * @returns
 */
export async function getMakerAddresses() {
  const makerList = await getMakerList()

  const makerAddresses: string[] = []
  for (const item of makerList) {
    if (makerAddresses.indexOf(item.makerAddress) > -1) {
      continue
    }
    makerAddresses.push(item.makerAddress)
  }

  return makerAddresses
}

const GAS_PRICE_PAID_RATE = { arbitrum: 0.8 } // arbitrum Transaction Fee = gasUsed * gasPrice * 0.8 (general)
export async function statisticsProfit(
  makerNode: MakerNode
): Promise<BigNumber> {
  let fromToCurrency = ''
  let fromToPrecision = 0
  let gasPrecision = 18 // gas default is eth, zksync is token

  const makerList = await getMakerList()
  for (const item of makerList) {
    if (!equalsIgnoreCase(item.makerAddress, makerNode.makerAddress)) {
      continue
    }

    if (
      equalsIgnoreCase(item.t1Address, makerNode.txToken) ||
      equalsIgnoreCase(item.t2Address, makerNode.txToken)
    ) {
      fromToCurrency = item.tName
      fromToPrecision = item.precision
    }

    if (equalsIgnoreCase(item.tName, makerNode.gasCurrency)) {
      gasPrecision = item.precision
    }
  }

  if (fromToCurrency && Number(makerNode.toAmount) > 0) {
    const fromMinusToUsd = await exchangeToUsd(
      new BigNumber(makerNode.fromAmount)
        .minus(makerNode.toAmount)
        .dividedBy(10 ** fromToPrecision),
      fromToCurrency
    )

    let gasPricePaidRate = 1
    if (GAS_PRICE_PAID_RATE[CHAIN_INDEX[makerNode.toChain]]) {
      gasPricePaidRate = GAS_PRICE_PAID_RATE[CHAIN_INDEX[makerNode.toChain]]
    }
    const gasAmountUsd = await exchangeToUsd(
      new BigNumber(makerNode.gasAmount)
        .multipliedBy(gasPricePaidRate)
        .dividedBy(10 ** gasPrecision),
      makerNode.gasCurrency
    )

    return fromMinusToUsd.minus(gasAmountUsd || 0)
  } else {
    return new BigNumber(0)
  }
}

/**
 * get Earliest by fromTimeStamp
 * @returns
 */
export async function getEarliestMakerNode(): Promise<MakerNode | undefined> {
  return repositoryMakerNode().findOne({ order: { fromTimeStamp: 'ASC' } })
}

/**
 * get token's info
 * @param chainId
 * @param tokenAddress
 * @returns
 */
type GET_TOKEN_INFO_RETURN = {
  decimals: number // default: -1, when not found
  tokenName: string
}
export async function getTokenInfo(
  chainId: number,
  tokenAddress: string
): Promise<GET_TOKEN_INFO_RETURN> {
  let decimals = -1
  let tokenName = ''

  const makerList = await getMakerList()
  for (const item of makerList) {
    if (
      (item.c1ID == chainId || item.c2ID == chainId) &&
      (equalsIgnoreCase(item.t1Address, tokenAddress) ||
        equalsIgnoreCase(item.t2Address, tokenAddress))
    ) {
      decimals = item.precision
      tokenName = item.tName
      break
    }
  }

  return { decimals, tokenName }
}

/**
 * make transactionID
 * @param fromAddress
 * @param chainId
 * @param nonce
 */
export function makeTransactionID(
  fromAddress: string,
  chainId: number,
  nonce: string
) {
  return `${fromAddress}${chainId}${nonce}`
}

/**
 * Get maker nodes
 * @param makerAddress
 * @param fromChain 0: All
 * @param toChain 0: All
 * @param startTime start time
 * @param endTime end time
 * @param userAddress user's address
 * @returns
 */
export async function getMakerNodes(
  makerAddress: string,
  fromChain = 0,
  toChain = 0,
  startTime = 0,
  endTime = 0,
  userAddress = ''
): Promise<MakerNode[]> {
  if (!makerAddress) {
    throw new ServiceError(
      'Sorry, params makerAddress miss',
      ServiceErrorCodes['arguments invalid']
    )
  }

  // QueryBuilder
  const queryBuilder = repositoryMakerNode().createQueryBuilder()

  // where
  queryBuilder.where('makerAddress = :makerAddress', {
    makerAddress,
  })
  if (fromChain > 0) {
    queryBuilder.andWhere('fromChain = :fromChain', { fromChain })
  }
  if (toChain > 0) {
    queryBuilder.andWhere('toChain = :toChain', { toChain })
  }
  if (startTime) {
    queryBuilder.andWhere('fromTimeStamp >= :startTime', {
      startTime: dateFormatNormal(startTime),
    })
  }
  if (endTime) {
    queryBuilder.andWhere('fromTimeStamp <= :endTime', {
      endTime: dateFormatNormal(endTime),
    })
  }
  if (userAddress) {
    queryBuilder.andWhere('userAddress = :userAddress', { userAddress })
  }

  // order by
  queryBuilder
    .addOrderBy('fromTimeStamp', 'DESC')
    .addOrderBy('toTimeStamp', 'DESC')

  const list = await queryBuilder.getMany()

  return list
}

/**
 *
 * @param makerAddress
 * @param chainId
 * @param chainName
 * @param tokenAddress
 * @param tokenName for match zksync result
 */
async function getTokenBalance(
  makerAddress: string,
  chainId: number,
  chainName: string,
  tokenAddress: string,
  tokenName: string
): Promise<string | undefined> {
  let value: string | undefined
  try {
    switch (CHAIN_INDEX[chainId]) {
      case 'zksync':
        {
          let api = makerConfig.zksync.api
          if (chainId == 33) {
            api = makerConfig.zksync_test.api
          }

          const respData = (
            await axios.get(
              `${api.endPoint}/accounts/${makerAddress}/committed`
            )
          ).data

          if (respData.status == 'success' && respData?.result?.balances) {
            value = respData.result.balances[tokenName.toUpperCase()]
          }
        }
        break
      case 'loopring':
        {
          let api = makerConfig.loopring.api
          let accountID: Number | undefined
          if (chainId === 99) {
            api = makerConfig.loopring_test.api
          }
          // getAccountID first
          const accountInfo = await axios(
            `${api.endPoint}/account?owner=${makerAddress}`
          )
          if (accountInfo.status == 200 && accountInfo.statusText == 'OK') {
            accountID = accountInfo.data.accountId
          }

          const balanceData = await axios.get(
            `${api.endPoint}/user/balances?accountId=${accountID}&tokens=0`
          )
          if (balanceData.status == 200 && balanceData.statusText == 'OK') {
            if (!Array.isArray(balanceData.data)) {
              value = '0'
            }
            if (balanceData.data.length == 0) {
              value = '0'
            }
            let balanceMap = balanceData.data[0]
            let totalBalance = balanceMap.total ? balanceMap.total : 0
            let locked = balanceMap.locked ? balanceMap.locked : 0
            let withDraw = balanceMap.withDraw ? balanceMap.withDraw : 0
            value = totalBalance - locked - withDraw + ''
          }
        }
        break
      case 'starknet':
        const networkId = getNetworkIdByChainId(chainId)
        value = String(
          await getErc20BalanceByL1(makerAddress, tokenAddress, networkId)
        )
        break
      case 'immutablex':
        const imxHelper = new IMXHelper(chainId)
        value = (
          await imxHelper.getBalanceBySymbol(makerAddress, tokenName)
        ).toString()
        break
      default:
        const alchemyUrl = makerConfig[chainName]?.httpEndPoint
        if (!alchemyUrl) {
          break
        }

        // when empty tokenAddress or 0x00...000, get eth balances
        if (!tokenAddress || isEthTokenAddress(tokenAddress)) {
          value = await createAlchemyWeb3(alchemyUrl).eth.getBalance(
            makerAddress
          )
        } else {
          const resp = await createAlchemyWeb3(
            alchemyUrl
          ).alchemy.getTokenBalances(makerAddress, [tokenAddress])

          for (const item of resp.tokenBalances) {
            if (item.error) {
              continue
            }

            value = String(item.tokenBalance)

            // Now only one
            break
          }
        }
        break
    }
  } catch (error) {
    errorLogger.error(
      `GetTokenBalance fail, makerAddress: ${makerAddress}, tokenName: ${tokenName}, error: `,
      error.message
    )
  }

  return value
}

type WealthsChain = {
  chainId: number
  chainName: string
  makerAddress: string
  balances: {
    tokenAddress: string
    tokenName: string
    value?: string // When can't get balance(e: Network fail), it is undefined
    decimals: number // for format
  }[]
}
export async function getWealthsChains(makerAddress: string) {
  // check
  if (!makerAddress) {
    throw new ServiceError(
      'Sorry, params makerAddress miss',
      ServiceErrorCodes['arguments invalid']
    )
  }

  const makerList = await getMakerList()
  const wealthsChains: WealthsChain[] = []

  const pushToChainBalances = (
    wChain: WealthsChain,
    tokenAddress: string,
    tokenName: string,
    decimals: number
  ) => {
    const find = wChain.balances.find(
      (item) => item.tokenAddress == tokenAddress
    )
    if (find) {
      return
    }

    wChain.balances.push({ tokenAddress, tokenName, decimals, value: '' })
  }
  const pushToChains = (
    makerAddress: string,
    chainId: number,
    chainName: string
  ): WealthsChain => {
    const find = wealthsChains.find((item) => item.chainId === chainId)
    if (find) {
      return find
    }

    // push chain where no exist
    const item = { makerAddress, chainId, chainName, balances: [] }
    wealthsChains.push(item)

    return item
  }
  for (const item of makerList) {
    if (item.makerAddress != makerAddress) {
      continue
    }

    pushToChainBalances(
      pushToChains(item.makerAddress, item.c1ID, item.c1Name),
      item.t1Address,
      item.tName,
      item.precision
    )
    pushToChainBalances(
      pushToChains(item.makerAddress, item.c2ID, item.c2Name),
      item.t2Address,
      item.tName,
      item.precision
    )
  }

  // get tokan balance
  for (const item of wealthsChains) {
    // add eth
    const ethBalancesItem = item.balances.find((item2) => {
      return !item2.tokenAddress || isEthTokenAddress(item2.tokenAddress)
    })
    if (ethBalancesItem) {
      // clear eth's tokenAddress
      ethBalancesItem.tokenAddress = ''
    } else {
      // add eth balances item
      item.balances.unshift({
        tokenAddress: '',
        tokenName: CHAIN_INDEX[item.chainId] == 'polygon' ? 'MATIC' : 'ETH',
        decimals: 18,
        value: '',
      })
    }
  }

  return wealthsChains
}
export async function getWealths(
  makerAddress: string
): Promise<WealthsChain[]> {
  const wealthsChains = await getWealthsChains(makerAddress)

  // get tokan balance
  const promises: Promise<void>[] = []
  for (const item of wealthsChains) {
    for (const item2 of item.balances) {
      const promiseItem = async () => {
        let value = await getTokenBalance(
          item.makerAddress,
          item.chainId,
          item.chainName,
          item2.tokenAddress,
          item2.tokenName
        )

        // When value!='' && > 0, format it
        if (value) {
          value = new BigNumber(value)
            .dividedBy(10 ** item2.decimals)
            .toString()
        }

        item2.value = value
      }
      promises.push(promiseItem())
    }
  }

  await Promise.all(promises)

  return wealthsChains
}

/**
 * Get target maker pool
 * @param makerAddress
 * @param tokenAddress
 * @param fromChainId
 * @param toChainId
 * @param transactionTime
 * @returns
 */
export async function getTargetMakerPool(
  makerAddress: string,
  tokenAddress: string,
  fromChainId: number,
  toChainId: number,
  transactionTime?: Date
) {
  if (!transactionTime) {
    transactionTime = new Date()
  }
  const transactionTimeStramp = parseInt(transactionTime.getTime() / 1000 + '')

  for (const maker of await getAllMakerList()) {
    const { pool1, pool2 } = expanPool(maker)
    if (
      pool1.makerAddress == makerAddress &&
      equalsIgnoreCase(pool1.t1Address, tokenAddress) &&
      pool1.c1ID == fromChainId &&
      pool1.c2ID == toChainId &&
      transactionTimeStramp >= pool1.avalibleTimes[0].startTime &&
      transactionTimeStramp <= pool1.avalibleTimes[0].endTime
    ) {
      return pool1
    }

    if (
      pool2.makerAddress == makerAddress &&
      equalsIgnoreCase(pool2.t2Address, tokenAddress) &&
      pool2.c1ID == toChainId &&
      pool2.c2ID == fromChainId &&
      transactionTimeStramp >= pool2.avalibleTimes[0].startTime &&
      transactionTimeStramp <= pool2.avalibleTimes[0].endTime
    ) {
      return pool2
    }
  }
  return undefined
}

export async function runTodo(makerAddress: string) {
  // find: do_current < do_max and state = 0
  const todos = await repositoryMakerNodeTodo()
    .createQueryBuilder()
    .where('makerAddress=:makerAddress and do_current < do_max AND state = 0', {
      makerAddress,
    })
    .getMany()

  for (const todo of todos) {
    const data = todo.data ? JSON.parse(todo.data) : {}
    // now only do sendTransaction
    if (todo.do_state === 20) {
      const {
        transactionID,
        fromChainID,
        toChainID,
        toChain,
        tokenAddress,
        amountStr,
        fromAddress,
        pool,
        nonce,
        result_nonce,
      } = data
      accessLogger.info(`runTodo item: transactionID=${transactionID}`)

      // only retry result_nonce > 0
      if (result_nonce > 0) {
        // do_current insert or update logic in sendTransaction
        await sendTransaction(
          todo.makerAddress,
          transactionID,
          fromChainID,
          toChainID,
          toChain,
          tokenAddress,
          amountStr,
          fromAddress,
          pool,
          nonce,
          result_nonce
        )
      }
    }
  }
}
