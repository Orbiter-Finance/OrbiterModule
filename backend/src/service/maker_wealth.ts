import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import axios from 'axios'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { makerConfig } from '../config'
import { ServiceError, ServiceErrorCodes } from '../error/service'
import { MakerWealth } from '../model/maker_wealth'
import { isEthTokenAddress } from '../util'
import { Core } from '../util/core'
import { errorLogger } from '../util/logger'
import { getMakerList } from '../util/maker'
import { DydxHelper } from './dydx/dydx_helper'
import { IMXHelper } from './immutablex/imx_helper'
import ZKSpaceHelper from './zkspace/zkspace_help'
import loopring_help from './loopring/loopring_help'
import { chains, utils } from 'orbiter-chaincore'
import { equals } from 'orbiter-chaincore/src/utils/core'
import { ChainServiceTokenBalance } from 'orbiter-chaincore/src/packages/token-balance';

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
export async function getTokenBalance(
  makerAddress: string,
  chainId: number,
  chainName: string,
  tokenAddress: string,
  tokenName: string
): Promise<string | undefined> {
  let value: string | undefined
  try {
    switch (chainId) {
      case 3:
      case 33:
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
      case 8:
      case 88:
        const imxHelper = new IMXHelper(chainId)
        value = (
          await imxHelper.getBalanceBySymbol(makerAddress, tokenName)
        ).toString()
        break
      case 11:
      case 511:
        const dydxHelper = new DydxHelper(chainId)
        value = (await dydxHelper.getBalanceUsdc(makerAddress)).toString()
        break
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

      case 1:
      case 2:
      case 22:
      case 4:
      case 44:
      case 5:
      case 7:
      case 77:
      case 10:
      case 510:
      case 12:
      case 512:
      case 14:
      case 514:
      case 15:
      case 515:
      case 16:
      case 516:
      case 17:
      case 517:
      case 518:
      case 519:
        // const balanceService = 
        // value = await balanceService.getBalance(makerAddress, tokenAddress);
        if (!balanceService[String(chainId)]) {
          balanceService[String(chainId)] = new ChainServiceTokenBalance(String(chainId));
        }
        const result = await balanceService[String(chainId)].getBalance(makerAddress, tokenAddress);
        return result && result.balance;
        break
      default:
        const alchemyUrl = makerConfig[chainName]?.httpEndPoint || makerConfig[chainId]?.httpEndPoint
        if (!alchemyUrl) {
          break
        }
        // when empty tokenAddress or 0x00...000  get eth balances
        if (!tokenAddress || isEthTokenAddress(tokenAddress) || chainId == 97) {
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
      `GetTokenBalance fail, chainId: ${chainId}, makerAddress: ${makerAddress},tokenAddress:${tokenAddress}, tokenName: ${tokenName}, error: ${error.message}`
      
    )
  }

  return value
}

/**
 * @param web3
 * @param makerAddress
 * @param tokenAddress
 * @returns
 */
async function getBalanceByCommon(
  web3: Web3,
  makerAddress: string,
  tokenAddress: string
) {
  const tokenContract = new web3.eth.Contract(
    <any>makerConfig.ABI,
    tokenAddress
  )
  const tokenBalanceWei = await tokenContract.methods
    .balanceOf(makerAddress)
    .call({
      from: makerAddress,
    })
  return tokenBalanceWei
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
    // find token 
    const chain1:any = chains.getChainByInternalId(String(item.c1ID))
    const token1 = chains.getTokenByAddress(chain1.chainId, item.t1Address);
    pushToChainBalances(
      pushToChains(item.makerAddress, item.c1ID, item.c1Name),
      item.t1Address,
      token1?.symbol || "",
      token1?.decimals || item.precision
    )
    const chain2:any = chains.getChainByInternalId(String(item.c2ID))
    const token2 = chains.getTokenByAddress(chain2.chainId, item.t2Address);
    pushToChainBalances(
      pushToChains(item.makerAddress, item.c2ID, item.c2Name),
      item.t2Address,
      token2?.symbol || "",
      token2?.decimals || item.precision
    )
  }
  // get tokan balance
  for (const chain of wealthsChains) {
    const chainId = chain['chainId']
    if (chainId == 11 || chainId == 511) {
      continue
    }
    const chainConfig = chains.getChainByInternalId(String(chainId))
    if (chainConfig) {
      const nativeCurrency = chainConfig.nativeCurrency
      if (
        nativeCurrency &&
        chain.balances.findIndex(
          (row) => equals(row.tokenAddress, nativeCurrency.address)
        ) < 0
      ) {
        chain.balances.push({
          tokenAddress: nativeCurrency.address,
          tokenName: nativeCurrency.symbol,
          decimals: nativeCurrency.decimals,
          value: '',
        })
      }
    }
    if (utils.core.equals(chain.makerAddress, '0x80C67432656d59144cEFf962E8fAF8926599bCF8')) {
      chain.balances.sort(item => {
        return item.tokenName == 'ETH' ? -1 : 1;
      })
    } else if (utils.core.equals(chain.makerAddress, '0xd7Aa9ba6cAAC7b0436c91396f22ca5a7F31664fC')) {
      chain.balances.sort(item => {
        return item.tokenName == 'USDT' ? -1 : 1;
      })
    } else if (utils.core.equals(chain.makerAddress, '0x41d3D33156aE7c62c094AAe2995003aE63f587B3')) {
      chain.balances.sort(item => {
        return item.tokenName == 'USDC' ? -1 : 1;
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

import {
  Contract,
  SequencerProvider,
} from "starknet";
import StarknetTokenABI from "./starknet/Starknet_Token.json";

export async function getStarknetTokenBalance(chainId: number, address: string, tokenAddress: string): Promise<BigNumber | null> {
  try {
    const rpcFirst = equals(chainId, 44) ? makerConfig.starknet_test.api.endPoint : makerConfig.starknet.api.endPoint;
    const provider = new SequencerProvider({
      baseUrl: rpcFirst,
      feederGatewayUrl: "feeder_gateway",
      gatewayUrl: "gateway",
    });
    const contractInstance = new Contract(
        <any>StarknetTokenABI,
        tokenAddress,
        provider,
    );
    const balanceResult = (await contractInstance.balanceOf(address)).balance;
    return new BigNumber(balanceResult.low.toString());
  } catch (e) {
    return null;
  }
}