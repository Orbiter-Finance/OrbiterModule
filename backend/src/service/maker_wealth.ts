import axios from 'axios'
import { BigNumber } from 'bignumber.js'
import { makerConfig } from '../config'
import { ServiceError, ServiceErrorCodes } from '../error/service'
import { MakerWealth } from '../model/maker_wealth'
import { Core } from '../util/core'
import { errorLogger } from '../util/logger'
import { DydxHelper } from './dydx/dydx_helper'
import loopring_help from './loopring/loopring_help'
import ZKSpaceHelper from './zkspace/zkspace_help'
import { chains, utils } from 'orbiter-chaincore'
import { equals } from 'orbiter-chaincore/src/utils/core'
import { ChainServiceTokenBalance } from 'orbiter-chaincore/src/packages/token-balance';
import { getMakerList } from '../util/maker'

const repositoryMakerWealth = () => Core.db.getRepository(MakerWealth)

const balanceService: { [key: number]: ChainServiceTokenBalance } = {};
export const CACHE_KEY_GET_WEALTHS = 'GET_WEALTHS'

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
  tokenAddress: string,
  tokenName: string
): Promise<string | undefined> {
  let value: string | undefined
  try {
    switch (chainId) {
            case 12:
      case 512:
        let balanceInfo = await ZKSpaceHelper.getZKSBalance({
          account: makerAddress,
          localChainID: chainId,
        })
        if (
          !balanceInfo ||
          !balanceInfo.length ||
          balanceInfo.findIndex((item) => item.id == 0) == -1
        ) {
          value = '0'
        }
        let httpEndPoint = makerConfig.zkspace.httpEndPoint
        if (chainId === 512) {
          httpEndPoint = makerConfig.zkspace_test.httpEndPoint
        }
        let tokenInfos = await ZKSpaceHelper.getTokenInfos(httpEndPoint)
        const zksTokenInfo = tokenInfos.find(
          (item) =>
            item.address.toLowerCase() ==
            (tokenAddress ? tokenAddress.toLowerCase() : '0x' + '0'.repeat(40))
        )
        let defaultIndex = balanceInfo.findIndex(
          (item) => item.id == (zksTokenInfo ? zksTokenInfo.id : 0)
        )
        value =
          defaultIndex > -1
            ? balanceInfo[defaultIndex].amount *
            10 ** (zksTokenInfo ? zksTokenInfo.decimals : 18) +
            ''
            : '0'
        break
      case 9:
      case 99:
        {
          let api = makerConfig.loopring.api
          let httpEndPoint = makerConfig.loopring.httpEndPoint
          let accountID: Number | undefined
          if (chainId === 99) {
            api = makerConfig.loopring_test.api
            httpEndPoint = makerConfig.loopring_test.httpEndPoint
          }
          let tokenInfos = await loopring_help.getTokenInfos(httpEndPoint)
          // getAccountID first
          const accountInfo = await axios(
            `${api.endPoint}/account?owner=${makerAddress}`
          )
          if (accountInfo.status == 200 && accountInfo.statusText == 'OK') {
            accountID = accountInfo.data.accountId
          }
          const lpTokenInfo = tokenInfos.find(
            (item) => item.address.toLowerCase() === tokenAddress.toLowerCase()
          )
          const balanceData = await axios.get(
            `${api.endPoint}/user/balances?accountId=${accountID}&tokens=${lpTokenInfo ? lpTokenInfo.tokenId : 0
            }`
          )
          if (balanceData.status == 200 && balanceData.statusText == 'OK') {
            if (balanceData.data && balanceData.data.length == 0) {
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
      case 11:
      case 511:
        const dydxHelper = new DydxHelper(chainId)
        value = (await dydxHelper.getBalanceUsdc(makerAddress)).toString()
        break
      default:
        // const balanceService =
        // value = await balanceService.getBalance(makerAddress, tokenAddress);
        if (!balanceService[String(chainId)]) {
          balanceService[String(chainId)] = new ChainServiceTokenBalance(String(chainId));
        }
        const result = await balanceService[String(chainId)].getBalance(makerAddress, tokenAddress);
        return result && result.balance;
        break
    }
  } catch (error) {
    errorLogger.error(
      `GetTokenBalance fail, chainId: ${chainId}, makerAddress: ${makerAddress},tokenAddress:${tokenAddress}, tokenName: ${tokenName}, error: `,
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
  const wealthsChains: WealthsChain[] = []
  const makerList = await getMakerList()
  const tokens = makerConfig.makerBalacnes[makerAddress.toLocaleLowerCase()];
  if (tokens) {
    const chainsList = chains.getAllChains();
    for (const chainConfig of chainsList) {
      const chainId = Number(chainConfig.internalId);
      if (equals('0x1c84daa159cf68667a54beb412cdb8b2c193fb32', makerAddress)) {
        if (![1,2,6,7].includes(chainId)) {
          continue;
        }
      } else {
        const item = makerList.find((row)=> (row.c1ID == chainId || row.c2ID === chainId) && equals(row.makerAddress, makerAddress));
        if (!item) {
          continue;
        }
      }
      const balances = [];
      if (!tokens.includes(chainConfig.nativeCurrency.symbol)) {
        tokens.push(chainConfig.nativeCurrency.symbol);
      }
      for (const symbol of tokens) {
        const token = chainConfig.tokens.find((row) => equals(row.symbol, symbol));
        if (token) {
          try {
            const value = await getTokenBalance(
              makerAddress,
              Number(chainConfig.internalId),
              token.address,
              token.symbol
            )
            balances.push({
              decimals: token.decimals,
              tokenAddress: token.address,
              tokenName: token.symbol,
              value: new BigNumber(value).dividedBy(10 ** token.decimals).toString()
            })
          } catch (error) {
            console.error('get balance error', error);
          }
          
        }

      }
      wealthsChains.push({
        chainId: Number(chainConfig.internalId),
        chainName: chainConfig.name,
        makerAddress,
        balances
      })
    }

  }

  return wealthsChains
}

/**
 *
 * @param makerAddress
 * @returns
 */
export async function getWealths(
  makerAddress: string
): Promise<WealthsChain[]> {
  const wealthsChains = await getWealthsChains(makerAddress)
  // get tokan balance
  const promises: Promise<void>[] = []
  for (const item of wealthsChains) {
    for (const item2 of item.balances) {
      const promiseItem = async () => {
        let makerAddress = item.makerAddress
        if (item.chainId === 4 || item.chainId === 44) {
          // mapping
          makerAddress =
            makerConfig.starknetAddress[item.makerAddress.toLowerCase()]
        }
        let value = await getTokenBalance(
          makerAddress,
          item.chainId,
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
 * @param wealths
 * @returns
 */
export async function saveWealths(wealths: WealthsChain[]) {
  for (const item1 of wealths) {
    for (const item2 of item1.balances) {
      await repositoryMakerWealth().insert({
        makerAddress: item1.makerAddress,
        tokenAddress: item2.tokenAddress,
        chainId: item1.chainId,
        balance: item2.value,
        decimals: item2.decimals,
      })
    }
  }
}
