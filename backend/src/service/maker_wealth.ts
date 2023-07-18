import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import axios from 'axios'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { ServiceError, ServiceErrorCodes } from '../error/service'
import { MakerWealth } from '../model/maker_wealth'
import { isEthTokenAddress } from '../util'
import { Core } from '../util/core'
import { errorLogger } from '../util/logger'
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
import { consulConfig } from "../config/consul_store";

export async function getStarknetTokenBalance(chainId: number, address: string, tokenAddress: string): Promise<BigNumber | null> {
  try {
    const rpcFirst = equals(chainId, 44) ? consulConfig.maker?.starknet_test?.api?.endPoint : consulConfig.maker?.starknet?.api?.endPoint;
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
