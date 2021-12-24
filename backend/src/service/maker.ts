import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import axios from 'axios'
import { BigNumber } from 'bignumber.js'
import { Repository } from 'typeorm'
import { makerConfig } from '../config'
import { ServiceError, ServiceErrorCodes } from '../error/service'
import { MakerNode } from '../model/maker_node'
import { MakerNodeTodo } from '../model/maker_node_todo'
import { dateFormatNormal, equalsIgnoreCase } from '../util'
import { Core } from '../util/core'
import { accessLogger, errorLogger } from '../util/logger'
import { getMakerList, sendTransaction } from '../util/maker'
import { CHAIN_INDEX, SIZE_OP } from '../util/maker/core'

export const CACHE_KEY_GET_WEALTHS = 'GET_WEALTHS'

const repositoryMakerNode = (): Repository<MakerNode> => {
  return Core.db.getRepository(MakerNode)
}
const repositoryMakerNodeTodo = (): Repository<MakerNodeTodo> => {
  return Core.db.getRepository(MakerNodeTodo)
}

/**
 * amount % 10**P_NUMBER % 9000
 * @param amount
 * @returns
 */
export function getAmountFlag(amount: string | number): string {
  let str = String(amount)
  if (str.length < SIZE_OP.P_NUMBER) {
    return '0'
  }
  str = String(amount).slice(-SIZE_OP.P_NUMBER)
  return (Number(str) % 9000) + ''
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
 * @param startTime start time
 * @param endTime end time
 * @returns
 */
export async function getMakerNodes(
  makerAddress: string,
  fromChain: number = 0,
  startTime?: number,
  endTime?: number
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

  // order by
  queryBuilder
    .addOrderBy('fromTimeStamp', 'DESC')
    .addOrderBy('toTimeStamp', 'DESC')

  const list = await queryBuilder.getMany()

  return list
}

type WealthsChain = {
  chainId: number
  chainName: string
  balances: {
    makerAddress: string
    tokenAddress: string
    tokenName: string
    value: string
  }[]
}
export async function getWealths(
  makerAddress: string
): Promise<WealthsChain[]> {
  if (!makerAddress) {
    throw new ServiceError(
      'Sorry, params makerAddress miss',
      ServiceErrorCodes['arguments invalid']
    )
  }

  const makerList = await getMakerList()

  const wealthsChains: WealthsChain[] = []
  const pushToChainBalances = async (
    wChain: WealthsChain,
    makerAddress: string,
    tokenAddress: string,
    tokenName: string,
    decimals: number
  ) => {
    const find = wChain.balances.find(
      (item) =>
        item.makerAddress == makerAddress && item.tokenAddress == tokenAddress
    )
    if (find) {
      return
    }

    let value = '0'
    try {
      switch (CHAIN_INDEX[wChain.chainId]) {
        case 'eth':
        case 'arbitrum':
          const alchemyUrl = makerConfig[wChain.chainName]?.httpEndPoint
          if (!alchemyUrl) {
            break
          }

          // when empty tokenAddress, get eth balances
          if (tokenAddress) {
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
          } else {
            value = await createAlchemyWeb3(alchemyUrl).eth.getBalance(
              makerAddress
            )
          }
          break
        case 'zksync':
          let api = makerConfig.zksync.api
          if (wChain.chainId == 33) {
            api = makerConfig.zksync_test.api
          }

          const respData = (
            await axios.get(
              `${api.endPoint}/accounts/${makerAddress}/committed`
            )
          ).data

          if (respData.status == 'success' && respData?.result?.balances) {
            value = respData?.result?.balances[tokenName.toUpperCase()]
          }

          break
      }

      // When value!='' && > 0, format it
      if (value) {
        value = new BigNumber(value).dividedBy(10 ** decimals).toString()
      }
    } catch (error) {
      errorLogger.error(error)
    }

    wChain.balances.push({ makerAddress, tokenAddress, tokenName, value })
  }
  const pushToChains = (chainId: number, chainName: string): WealthsChain => {
    const find = wealthsChains.find((item) => item.chainId === chainId)
    if (find) {
      return find
    }

    // push chain where no exist, default add eth
    const item = { chainId, chainName, balances: [] }
    wealthsChains.push(item)

    return item
  }
  for (const item of makerList) {
    if (item.makerAddress != makerAddress) {
      continue
    }

    // add eth
    await pushToChainBalances(
      pushToChains(item.c1ID, item.c1Name),
      item.makerAddress,
      '',
      'ETH',
      18
    )
    await pushToChainBalances(
      pushToChains(item.c2ID, item.c2Name),
      item.makerAddress,
      '',
      'ETH',
      18
    )

    await pushToChainBalances(
      pushToChains(item.c1ID, item.c1Name),
      item.makerAddress,
      item.t1Address,
      item.tName,
      item.precision
    )
    await pushToChainBalances(
      pushToChains(item.c2ID, item.c2Name),
      item.makerAddress,
      item.t2Address,
      item.tName,
      item.precision
    )
  }

  return wealthsChains
}

export async function runTodo() {
  // find: do_current < do_max and state = 0
  const todos = await repositoryMakerNodeTodo()
    .createQueryBuilder()
    .where('do_current < do_max AND state = 0')
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
