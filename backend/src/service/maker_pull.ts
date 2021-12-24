import axios from 'axios'
import { Repository } from 'typeorm'
import { MakerNode } from '../model/maker_node'
import { MakerPull } from '../model/maker_pull'
import { dateFormatNormal, equalsIgnoreCase } from '../util'
import { Core } from '../util/core'
import { accessLogger, errorLogger } from '../util/logger'
import { CHAIN_INDEX } from '../util/maker/core'
import { getAmountFlag, makeTransactionID } from './maker'

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
const LAST_PULL_COUNT_MAX = 3
const ETHERSCAN_LAST = {
  makerPull: <MakerPull | undefined>undefined,
  pullCount: 0, // last pull count
}
const ARBITRUM_LAST = {
  makerPull: <MakerPull | undefined>undefined,
  pullCount: 0,
}
const ZKSYNC_LAST = {
  makerPull: <MakerPull | undefined>undefined,
  pullCount: 0,
}

export class ServiceMakerPull {
  private chainId: number
  private makerAddress: string
  private tokenAddress: string

  /**
   * @param api
   * @param makerAddress
   * @param tokenAddress
   */
  constructor(chainId: number, makerAddress: string, tokenAddress: string) {
    this.chainId = chainId
    this.makerAddress = makerAddress
    this.tokenAddress = tokenAddress
  }

  /**
   * get last maker_pull
   * @param last ETHERSCAN_LAST || ARBITRUM_LAST || ZKSYNC_LAST
   */
  private getLastMakerPull(last: {
    makerPull: MakerPull | undefined
    pullCount: number
  }) {
    // if last's pullCount < max pullCount, the last makerPull valid
    let lastMakePull: MakerPull | undefined
    if (last.pullCount < LAST_PULL_COUNT_MAX) {
      lastMakePull = last.makerPull
    } else {
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
          },
          {
            toTx: makerPull.txHash,
            toAmount: makerPull.amount,
            toTimeStamp: dateFormatNormal(makerPull.txTime),
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

      // match data from maker_pull
      const _mp = await repositoryMakerPull().findOne({
        chainId: Number(makerPull.amount_flag),
        makerAddress: this.makerAddress,
        fromAddress: makerPull.makerAddress,
        toAddress: fromAddress,
        amount_flag: makerPull.nonce,
      })
      const otherData = {}
      if (_mp) {
        otherData['toTx'] = _mp.txHash
        otherData['toAmount'] = _mp.amount
        otherData['toTimeStamp'] = dateFormatNormal(_mp.txTime)
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
    let lastMakePull = this.getLastMakerPull(ETHERSCAN_LAST)

    // when endblock is empty, will end latest
    const startblock = ''
    const endblock = lastMakePull ? lastMakePull.txBlock : ''

    // TODO
    const resp = await axios.get(api.endPoint, {
      params: {
        apiKey: api.key,
        module: 'account',
        action: 'tokentx',
        address: this.makerAddress,
        page: 1,
        offset: 100,
        startblock,
        endblock,
        sort: 'desc',
      },
      timeout: 6000,
    })

    // check data
    const { data } = resp
    if (data.status != '1' || !data.result) {
      return
    }
    if (data.result.length <= 0) {
      return
    }

    for (const item of data.result) {
      // checks
      if (!equalsIgnoreCase(item.contractAddress, this.tokenAddress)) {
        continue
      }

      const amount_flag = getAmountFlag(item.value)

      // save
      const makerPull = (lastMakePull = <MakerPull>{
        chainId: this.chainId,
        makerAddress: this.makerAddress,
        tokenAddress: item.contractAddress,
        data: JSON.stringify(item),
        amount: item.value,
        amount_flag,
        nonce: item.nonce,
        fromAddress: item.from,
        toAddress: item.to,
        txBlock: item.blockNumber,
        txHash: item.hash,
        txTime: new Date(item.timeStamp * 1000),
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
    if (lastMakePull?.txBlock == ETHERSCAN_LAST.makerPull?.txBlock) {
      ETHERSCAN_LAST.pullCount++
    }
    ETHERSCAN_LAST.makerPull = lastMakePull
  }

  /**
   * pull arbitrum
   * @param api
   */
  async arbitrum(api: { endPoint: string; key: string }) {
    let lastMakePull = this.getLastMakerPull(ARBITRUM_LAST)

    // when endblock is empty, will end latest
    const startblock = ''
    const endblock = lastMakePull ? lastMakePull.txBlock : ''

    // TODO
    const resp = await axios.get(api.endPoint, {
      params: {
        // apiKey: api.key,
        module: 'account',
        action: 'tokentx',
        address: this.makerAddress,
        page: 1,
        offset: 100,
        startblock,
        endblock,
        sort: 'desc',
      },
      timeout: 6000,
    })

    // check data
    const { data } = resp
    if (data.status != '1' || !data.result) {
      return
    }
    if (data.result.length <= 0) {
      return
    }

    for (const item of data.result) {
      // checks
      if (!equalsIgnoreCase(item.contractAddress, this.tokenAddress)) {
        continue
      }

      const amount_flag = getAmountFlag(item.value)

      // save
      const makerPull = (lastMakePull = <MakerPull>{
        chainId: this.chainId,
        makerAddress: this.makerAddress,
        tokenAddress: item.contractAddress,
        data: JSON.stringify(item),
        amount: item.value,
        amount_flag,
        nonce: item.nonce,
        fromAddress: item.from,
        toAddress: item.to,
        txBlock: item.blockNumber,
        txHash: item.hash,
        txTime: new Date(item.timeStamp * 1000),
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
    if (lastMakePull?.txBlock == ARBITRUM_LAST.makerPull?.txBlock) {
      ARBITRUM_LAST.pullCount++
    }
    ARBITRUM_LAST.makerPull = lastMakePull
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
          timeout: 6000,
        })
      ).data
      if (respData.result?.address == this.tokenAddress) {
        ZKSYNC_TOKEN_MAP[this.tokenAddress] = respData.result?.id
      }
    }

    let lastMakePull = this.getLastMakerPull(ZKSYNC_LAST)

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

      // filter _op.type!=Transfer or failReason!=null
      if (_op.type != 'Transfer' || item.failReason != null) {
        continue
      }

      // check token
      if (_op.token != ZKSYNC_TOKEN_MAP[this.tokenAddress]) {
        continue
      }

      let tx_status = item.status
      if (tx_status == 'rejected') {
        // skip status='Rejected'
        continue
      }
      if (tx_status == 'committed') {
        // zksync finalized's status so slow, when status=committed, set tx_status = 'finalized'
        tx_status = 'finalized'
      }

      const amount_flag = getAmountFlag(_op.amount)

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
        tx_status,
      })
      await savePull(makerPull)

      // compare
      await this.compareData(makerPull, item.txHash)
    }

    // set ZKSYNC_LAST
    if (lastMakePull?.txHash == ZKSYNC_LAST.makerPull?.txHash) {
      ZKSYNC_LAST.pullCount++
    }
    ZKSYNC_LAST.makerPull = lastMakePull
  }
}
