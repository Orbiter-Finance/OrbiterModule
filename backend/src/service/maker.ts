import { Repository } from 'typeorm'
import { padStart } from 'orbiter-chaincore/src/utils/core'
import { makerConfig } from '../config'
import { ServiceError, ServiceErrorCodes } from '../error/service'
import { MakerNode } from '../model/maker_node'
import { MakerNodeTodo } from '../model/maker_node_todo'
import { dateFormatNormal, equalsIgnoreCase } from '../util'
import { Core } from '../util/core'
import { accessLogger } from '../util/logger'
import {
  sendTransaction,
} from '../util/maker'
import { makerConfigs } from "../config/consul";
import { IMarket } from "../util/maker/new_maker";

const repositoryMakerNode = (): Repository<MakerNode> => {
  return Core.db.getRepository(MakerNode)
}
const repositoryMakerNodeTodo = (): Repository<MakerNodeTodo> => {
  return Core.db.getRepository(MakerNodeTodo)
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
  return `${fromAddress.toLowerCase()}${chainId}${nonce}`
}
// export function newMakeTransactionID(
//   fromAddress: string,
//   fromChainId: number | string,
//   fromTxNonce: string | number,
//   symbol: string | undefined
// ) {
//   return `${fromAddress}${padStart(String(fromChainId), 4, '00')}${symbol || 'NULL'
//     }${fromTxNonce}`.toLowerCase()
// }

export function TransactionIDV2(
  fromAddress: string,
  fromChainId: number | string,
  fromTxNonce: string | number,
  symbol: string | undefined,
  ext?: string,
) {
  let txid = `${fromAddress}${padStart(String(fromChainId), 4, "0")}${symbol || "NULL"
    }${fromTxNonce}`;
  if (ext)
    txid = `${txid}_${ext}`
  return txid.toLowerCase();
}


/**
 * Get maker nodes
 * @param makerAddress
 * @param fromChain 0: All
 * @param toChain 0: All
 * @param startTime start time
 * @param endTime end time
 * @param keyword transactionID | user | fromTx | toTx
 * @param userAddress user's address
 * @returns
 */
export async function getMakerNodes(
  makerAddress: string,
  fromChain = 0,
  toChain = 0,
  startTime = 0,
  endTime = 0,
  keyword = '',
  userAddress = ''
): Promise<MakerNode[]> {
  if (!makerAddress) {
    throw new ServiceError(
      'Sorry, params makerAddress miss',
      ServiceErrorCodes['arguments invalid']
    )
  }

  // Clean keyword
  if (
    equalsIgnoreCase(keyword, '0x') ||
    equalsIgnoreCase(keyword, makerAddress)
  ) {
    keyword = ''
  }

  // QueryBuilder
  const queryBuilder = repositoryMakerNode().createQueryBuilder()

  // where
  // When keyword is no empty, only use keyword
  queryBuilder.where('makerAddress = :makerAddress', {
    makerAddress,
  })
  const starknetAddress =
    makerConfig.starknetAddress;
  if (starknetAddress[makerAddress.toLowerCase()]) {
    queryBuilder.where(
      'makerAddress in(:makerAddress)',
      { makerAddress: [starknetAddress[makerAddress.toLowerCase()], makerAddress] }
    )
  }
  if (keyword) {
    queryBuilder.andWhere(
      'transactionID like :kw or userAddress like :kw or formTx like :kw or toTx like :kw',
      { kw: `%${keyword}%` }
    )
  } else {
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
  }

  // order by
  queryBuilder
    .addOrderBy('fromTimeStamp', 'DESC')
    .addOrderBy('toTimeStamp', 'DESC')

  const list = await queryBuilder.getMany()

  console.warn('list: ', list.length)

  return list
}

export function getMarket(makerAddress: string,
                          tokenAddress: string,
                          fromChainId: number,
                          toChainId: number): IMarket | undefined {
  return makerConfigs.find(item =>
      Number(item.fromChain.id) === Number(fromChainId) &&
      Number(item.toChain.id) === Number(toChainId) &&
      equalsIgnoreCase(item.sender, makerAddress) &&
      equalsIgnoreCase(item.fromChain.tokenAddress, tokenAddress)
  );
}
