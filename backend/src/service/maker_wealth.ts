import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import axios from 'axios'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { makerConfig } from '../config'
import { ServiceError, ServiceErrorCodes } from '../error/service'
import { MakerWealth } from '../model/maker_wealth'
import { isEthTokenAddress } from '../util'
import { Core } from '../util/core'
import { LoggerService } from '../util/logger'
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
  const logger = LoggerService.getLogger(makerAddress, tokenAddress)
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
    logger.error(
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