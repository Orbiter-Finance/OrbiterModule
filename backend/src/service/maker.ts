import { Repository } from 'typeorm'
import { padStart } from 'orbiter-chaincore/src/utils/core'
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
