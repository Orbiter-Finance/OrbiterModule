import axios from 'axios'
import BigNumber from 'bignumber.js'
import { Not, Repository } from 'typeorm'
import { ServiceError, ServiceErrorCodes } from '../error/service'
import { MakerNode } from '../model/maker_node'
import { MakerPull } from '../model/maker_pull'
import { dateFormatNormal, equalsIgnoreCase, isEthTokenAddress } from '../util'
import { Core } from '../util/core'
import { accessLogger, errorLogger } from '../util/logger'
import { getAmountToSend } from '../util/maker'
import { CHAIN_INDEX } from '../util/maker/core'
import { getAmountFlag, getTargetMakerPool, makeTransactionID } from './maker'

const repositoryMakerNode = (): Repository<MakerNode> => {
  return Core.db.getRepository(MakerNode)
}
const repositoryMakerPull = (): Repository<MakerPull> => {
  return Core.db.getRepository(MakerPull)
}

/**
 * save maker_pull
 * @param makerPull
 * @param checkField txBlock or txHash(default)
 * @returns false: if exist
 */
async function savePull(
  makerPull: MakerPull,
  checkField: keyof MakerPull = 'txHash'
): Promise<boolean> {
  // chainId && makerAddress && tokenAddress unique
  const findConditions = {
    chainId: makerPull.chainId,
    makerAddress: makerPull.makerAddress,
    tokenAddress: makerPull.tokenAddress,
    [checkField]: makerPull[checkField],
  }
  const his = await repositoryMakerPull().findOne(findConditions)
  if (his) {
    await repositoryMakerPull().update({ id: his.id }, makerPull)
  } else {
    await repositoryMakerPull().insert(makerPull)
  }

  return true
}

/**
 * @param makerAddress
 * @param startTime
 * @param endTime
 * @param fromOrToMaker false: maker <<< to, true: maker >>> from
 */
export async function getMakerPulls(
  makerAddress: string,
  startTime = 0,
  endTime = 0,
  fromOrToMaker = false
): Promise<MakerPull[]> {
  if (!makerAddress) {
    throw new ServiceError(
      'Sorry, params makerAddress miss',
      ServiceErrorCodes['arguments invalid']
    )
  }

  const ALIAS_MP = 'mp'
  const ALIAS_MN = 'mn'

  // QueryBuilder
  const queryBuilder = repositoryMakerPull().createQueryBuilder(ALIAS_MP)

  // select subQuery
  const selectSubSelect = repositoryMakerNode()
    .createQueryBuilder(ALIAS_MN)
    .select('toTx')
    .where(`${ALIAS_MN}.makerAddress = :makerAddress`, { makerAddress })
    .limit(1)
  if (fromOrToMaker) {
    selectSubSelect.andWhere(`${ALIAS_MN}.toTx=${ALIAS_MP}.txHash`)
  } else {
    selectSubSelect.andWhere(`${ALIAS_MN}.formTx=${ALIAS_MP}.txHash`)
  }
  queryBuilder.addSelect('(' + selectSubSelect.getQuery() + ')', 'target_tx')

  // where
  queryBuilder.where(`${ALIAS_MP}.makerAddress = :makerAddress`, {
    makerAddress,
  })
  queryBuilder.andWhere(`${ALIAS_MP}.amount_flag != '0'`)
  queryBuilder.andWhere(
    `${ALIAS_MP}.${
      fromOrToMaker ? 'fromAddress' : 'toAddress'
    } = :makerAddress`,
    { makerAddress }
  )
  if (startTime) {
    queryBuilder.andWhere(`${ALIAS_MP}.txTime >= :startTime`, {
      startTime: dateFormatNormal(startTime),
    })
  }
  if (endTime) {
    queryBuilder.andWhere(`${ALIAS_MP}.txTime <= :endTime`, {
      endTime: dateFormatNormal(endTime),
    })
  }

  // order by
  queryBuilder.addOrderBy(`${ALIAS_MP}.txTime`, 'DESC')

  const list = await queryBuilder.getRawMany()

  // clear
  const newList: any[] = []
  for (const item of list) {
    newList.push({
      chainId: item.mp_chainId,
      makerAddress: item.mp_makerAddress,
      tokenAddress: item.mp_tokenAddress,
      amount: item.mp_amount,
      amount_flag: item.mp_amount_flag,
      nonce: item.mp_nonce,
      fromAddress: item.mp_fromAddress,
      toAddress: item.mp_toAddress,
      txHash: item.mp_txHash,
      txTime: item.mp_txTime,
      tx_status: item.mp_tx_status,
      target_tx: item.target_tx,
    })
  }

  return newList
}

/**
 * zksync token <-> tokenId
 * ex: { "0x1123": 2}
 */
const ZKSYNC_TOKEN_MAP = {}

/**
 * when confirmations >= it, tx was finalized
 */
const FINALIZED_CONFIRMATIONS = 3

/**
 * last MakerPull and pull count
 */
class MakerPullLastData {
  makerPull: MakerPull | undefined = undefined
  pullCount: 0
}
const LAST_PULL_COUNT_MAX = 3
const ETHERSCAN_LAST: { [key: string]: MakerPullLastData } = {}
const ARBITRUM_LAST: { [key: string]: MakerPullLastData } = {}
const ZKSYNC_LAST: { [key: string]: MakerPullLastData } = {}

export class ServiceMakerPull {
  private chainId: number
  private makerAddress: string
  private tokenAddress: string
  private tokenSymbol: string // for makerList[x].tName

  /**
   * @param api
   * @param makerAddress
   * @param tokenAddress
   */
  constructor(
    chainId: number,
    makerAddress: string,
    tokenAddress: string,
    tokenSymbol: string
  ) {
    this.chainId = chainId
    this.makerAddress = makerAddress
    this.tokenAddress = tokenAddress
    this.tokenSymbol = tokenSymbol
  }

  /**
   * get last maker_pull
   * @param last ETHERSCAN_LAST || ARBITRUM_LAST || ZKSYNC_LAST
   */
  private getLastMakerPull(last: MakerPullLastData) {
    // if last's pullCount < max pullCount, the last makerPull valid
    let lastMakePull: MakerPull | undefined
    if (last.pullCount < LAST_PULL_COUNT_MAX) {
      lastMakePull = last.makerPull
    } else {
      // update last data
      last.makerPull = undefined
      last.pullCount = 0
    }

    return lastMakePull
  }

  /**
   *
   * @param makerPull
   * @param hash
   * @param amount
   */
  private async compareData(makerPull: MakerPull, hash: string) {
    // to lower
    const makerAddress = this.makerAddress.toLowerCase()
    const fromAddress = makerPull.fromAddress.toLowerCase()
    const toAddress = makerPull.toAddress.toLowerCase()
    hash = hash.toLowerCase()

    // if maker out
    if (fromAddress == makerAddress) {
      const targetMP = await repositoryMakerPull().findOne({
        makerAddress: this.makerAddress, //  same makerAddress
        fromAddress: makerPull.toAddress,
        toAddress: fromAddress,
        amount_flag: String(makerPull.chainId),
        nonce: makerPull.amount_flag,
        tx_status: Not('rejected'),
      })

      if (targetMP) {
        const transactionID = makeTransactionID(
          targetMP.fromAddress,
          targetMP.chainId,
          targetMP.nonce
        )
        await repositoryMakerNode().update(
          {
            transactionID,
            needToAmount: targetMP.amount,
          },
          {
            toTx: makerPull.txHash,
            toAmount: makerPull.amount,
            toTimeStamp: dateFormatNormal(makerPull.txTime),
            gasCurrency: makerPull.gasCurrency,
            gasAmount: makerPull.gasAmount,
            state: targetMP.tx_status == 'finalized' ? 3 : 2,
          }
        )
      }
    }

    // if into maker
    if (toAddress == makerAddress) {
      // when amount_flag not in CHAIN_INDEX, it cann't identify toChain
      if (!CHAIN_INDEX[makerPull.amount_flag]) {
        return
      }

      const transactionID = makeTransactionID(
        makerPull.fromAddress,
        makerPull.chainId,
        makerPull.nonce
      )

      // find pool and calculate needToAmount
      const targetMakerPool = await getTargetMakerPool(
        this.makerAddress,
        this.tokenAddress,
        makerPull.chainId,
        Number(makerPull.amount_flag)
      )
      let needToAmount = '0'
      if (targetMakerPool) {
        needToAmount =
          getAmountToSend(
            makerPull.chainId,
            Number(makerPull.amount_flag),
            makerPull.amount,
            targetMakerPool,
            makerPull.nonce
          )?.tAmount || '0'
      }

      // match data from maker_pull
      const _mp = await repositoryMakerPull().findOne({
        chainId: Number(makerPull.amount_flag),
        makerAddress: this.makerAddress,
        fromAddress: makerPull.makerAddress,
        toAddress: fromAddress,
        amount: needToAmount,
        amount_flag: makerPull.nonce,
        tx_status: Not('rejected'),
      })
      const otherData = {}
      if (_mp) {
        otherData['toTx'] = _mp.txHash
        otherData['toAmount'] = _mp.amount
        otherData['toTimeStamp'] = dateFormatNormal(_mp.txTime)
        otherData['gasCurrency'] = _mp.gasCurrency
        otherData['gasAmount'] = _mp.gasAmount
        otherData['state'] = _mp.tx_status == 'finalized' ? 3 : 2
      }

      try {
        const makerNode = await repositoryMakerNode().findOne({ transactionID })

        // update or insert
        if (makerNode) {
          await repositoryMakerNode().update({ transactionID }, otherData)
        } else {
          await repositoryMakerNode().insert({
            transactionID,
            makerAddress: makerPull.makerAddress,
            userAddress: fromAddress,
            fromChain: String(makerPull.chainId),
            toChain: makerPull.amount_flag,
            formTx: hash,
            fromAmount: makerPull.amount,
            formNonce: makerPull.nonce,
            needToAmount,
            fromTimeStamp: dateFormatNormal(makerPull.txTime),
            state: makerPull.tx_status == 'finalized' ? 1 : 0,
            txToken: makerPull.tokenAddress,
            ...otherData,
          })
        }
      } catch (e) {
        // When run concurrently, insert will try transactionID exist error
        errorLogger.error(e)
      }
    }
  }

  /**
   * pull etherscan
   * @param api
   */
  async etherscan(api: { endPoint: string; key: string }) {
    const makerPullLastKey = `${this.makerAddress}:${this.tokenAddress}`
    let makerPullLastData = ETHERSCAN_LAST[makerPullLastKey]
    if (!makerPullLastData) {
      makerPullLastData = new MakerPullLastData()
    }
    let lastMakePull = this.getLastMakerPull(makerPullLastData)

    // when endblock is empty, will end latest
    const startblock = ''
    const endblock = lastMakePull ? lastMakePull.txBlock : ''

    const resp = await axios.get(api.endPoint, {
      params: {
        apiKey: api.key,
        module: 'account',
        action: isEthTokenAddress(this.tokenAddress) ? 'txlist' : 'tokentx',
        address: this.makerAddress,
        page: 1,
        offset: 100,
        startblock,
        endblock,
        sort: 'desc',
      },
      timeout: 16000,
    })

    // check data
    const { data } = resp
    if (data.status != '1' || !data.result || data.result.length <= 0) {
      accessLogger.warn('Get etherscan tokentx/txlist faild: ' + JSON.stringify(data))
      return
    }

    for (const item of data.result) {
      // contractAddress = 0x0...0
      let contractAddress = item.contractAddress
      if (isEthTokenAddress(this.tokenAddress) && !item.contractAddress) {
        contractAddress = this.tokenAddress
      }

      // checks
      if (!equalsIgnoreCase(contractAddress, this.tokenAddress)) {
        continue
      }

      const amount_flag = getAmountFlag(this.chainId, item.value)

      // save
      const makerPull = (lastMakePull = <MakerPull>{
        chainId: this.chainId,
        makerAddress: this.makerAddress,
        tokenAddress: contractAddress,
        data: JSON.stringify(item),
        amount: item.value,
        amount_flag,
        nonce: item.nonce,
        fromAddress: item.from,
        toAddress: item.to,
        txBlock: item.blockNumber,
        txHash: item.hash,
        txTime: new Date(item.timeStamp * 1000),
        gasCurrency: 'ETH',
        gasAmount: new BigNumber(item.gasUsed)
          .multipliedBy(item.gasPrice)
          .toString(),
        tx_status:
          item.confirmations >= FINALIZED_CONFIRMATIONS
            ? 'finalized'
            : 'committed',
      })
      await savePull(makerPull, 'txBlock')

      // compare
      await this.compareData(makerPull, item.hash)
    }

    // set ETHERSCAN_LAST
    if (lastMakePull?.txBlock == makerPullLastData.makerPull?.txBlock) {
      makerPullLastData.pullCount++
    }
    makerPullLastData.makerPull = lastMakePull
    ETHERSCAN_LAST[makerPullLastKey] = makerPullLastData
  }

  /**
   * pull arbitrum
   * @param api
   */
  async arbitrum(api: { endPoint: string; key: string }) {
    const makerPullLastKey = `${this.makerAddress}:${this.tokenAddress}`
    let makerPullLastData = ARBITRUM_LAST[makerPullLastKey]
    if (!makerPullLastData) {
      makerPullLastData = new MakerPullLastData()
    }
    let lastMakePull = this.getLastMakerPull(makerPullLastData)

    // when endblock is empty, will end latest
    const startblock = ''
    const endblock = lastMakePull ? lastMakePull.txBlock : ''

    const resp = await axios.get(api.endPoint, {
      params: {
        // apiKey: api.key,
        module: 'account',
        action: isEthTokenAddress(this.tokenAddress) ? 'txlist' : 'tokentx',
        address: this.makerAddress,
        page: 1,
        offset: 100,
        startblock,
        endblock,
        sort: 'desc',
      },
      timeout: 16000,
    })

    // check data
    const { data } = resp
    if (data.status != '1' || !data.result || data.result.length <= 0) {
      accessLogger.warn('Get arbitrum tokentx/txlist faild: ' + JSON.stringify(data))
      return
    }

    for (const item of data.result) {
      // contractAddress = 0x0...0
      let contractAddress = item.contractAddress
      if (isEthTokenAddress(this.tokenAddress) && !item.contractAddress) {
        contractAddress = this.tokenAddress
      }

      // checks
      if (!equalsIgnoreCase(contractAddress, this.tokenAddress)) {
        continue
      }

      const amount_flag = getAmountFlag(this.chainId, item.value)

      // save
      const makerPull = (lastMakePull = <MakerPull>{
        chainId: this.chainId,
        makerAddress: this.makerAddress,
        tokenAddress: contractAddress,
        data: JSON.stringify(item),
        amount: item.value,
        amount_flag,
        nonce: item.nonce,
        fromAddress: item.from,
        toAddress: item.to,
        txBlock: item.blockNumber,
        txHash: item.hash,
        txTime: new Date(item.timeStamp * 1000),
        gasCurrency: 'ETH',
        gasAmount: new BigNumber(item.gasUsed)
          .multipliedBy(item.gasPrice)
          .toString(),
        tx_status:
          item.confirmations >= FINALIZED_CONFIRMATIONS
            ? 'finalized'
            : 'committed',
      })
      await savePull(makerPull, 'txBlock')

      // compare
      await this.compareData(makerPull, item.hash)
    }

    // set ARBITRUM_LAST
    if (lastMakePull?.txBlock == makerPullLastData.makerPull?.txBlock) {
      makerPullLastData.pullCount++
    }
    makerPullLastData.makerPull = lastMakePull
    ARBITRUM_LAST[makerPullLastKey] = makerPullLastData
  }

  /**
   * pull zksync
   * @param api
   */
  async zkSync(api: { endPoint: string; key: string }) {
    // if tokenAddress not in zksyncTokenMap, get it
    if (!ZKSYNC_TOKEN_MAP[this.tokenAddress]) {
      const respData = (
        await axios.get(`${api.endPoint}\/tokens\/${this.tokenAddress}`, {
          timeout: 16000,
        })
      ).data
      if (respData.result?.address == this.tokenAddress) {
        ZKSYNC_TOKEN_MAP[this.tokenAddress] = respData.result?.id
      }
    }

    const makerPullLastKey = `${this.makerAddress}:${this.tokenAddress}`
    let makerPullLastData = ZKSYNC_LAST[makerPullLastKey]
    if (!makerPullLastData) {
      makerPullLastData = new MakerPullLastData()
    }
    let lastMakePull = this.getLastMakerPull(makerPullLastData)

    const resp = await axios.get(
      `${api.endPoint}/accounts/${this.makerAddress}/transactions`,
      {
        params: {
          from: lastMakePull ? lastMakePull.txHash : 'latest',
          limit: 100,
          direction: 'older',
        },
      }
    )

    // parse data
    const { data } = resp
    if (data.status != 'success' || !data.result?.list) {
      return
    }
    if (data.result.list.length <= 0) {
      return
    }

    const transactions = data.result.list
    for (const item of transactions) {
      const _op = item.op
      if (!_op) {
        continue
      }

      // filter _op.type!=Transfer
      if (_op.type != 'Transfer') {
        continue
      }

      // check token
      if (_op.token != ZKSYNC_TOKEN_MAP[this.tokenAddress]) {
        continue
      }

      let tx_status = item.status
      if (tx_status == 'committed') {
        // zksync finalized's status so slow, when status=committed, set tx_status = 'finalized'
        tx_status = 'finalized'
      }

      const amount_flag = getAmountFlag(this.chainId, _op.amount)

      // save
      const makerPull = (lastMakePull = <MakerPull>{
        chainId: this.chainId,
        makerAddress: this.makerAddress,
        tokenAddress: this.tokenAddress,
        data: JSON.stringify(item),
        amount: _op.amount,
        amount_flag,
        nonce: _op.nonce,
        fromAddress: _op.from,
        toAddress: _op.to,
        txBlock: item.blockNumber,
        txHash: item.txHash,
        txTime: new Date(item.createdAt),
        gasCurrency: this.tokenSymbol,
        gasAmount: _op.fee || '',
        tx_status,
      })
      await savePull(makerPull)

      // skip compare if failReason != null or status == 'Rejected'
      if (item.failReason != null || tx_status == 'rejected') {
        continue
      }

      // compare
      await this.compareData(makerPull, item.txHash)
    }

    // set ZKSYNC_LAST
    if (lastMakePull?.txHash == makerPullLastData.makerPull?.txHash) {
      makerPullLastData.pullCount++
    }
    makerPullLastData.makerPull = lastMakePull
    ZKSYNC_LAST[makerPullLastKey] = makerPullLastData
  }
}
