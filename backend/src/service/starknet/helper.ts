import ERC20 from './ERC20.json'
import { utils } from 'ethers'
import { Account, Contract, ec, Provider, uint256 } from 'starknet'
import { sortBy } from 'lodash'
import { Uint256 } from 'starknet/dist/utils/uint256'
import BigNumber from 'bignumber.js'
import { BigNumberish, toBN } from 'starknet/dist/utils/number'
import { OfflineAccount } from './account'
import { compileCalldata } from 'starknet/dist/utils/stark'
import Keyv from 'keyv'
import KeyvFile from 'orbiter-chaincore/src/utils/keyvFile'
import { max } from 'lodash'
import { getLoggerService } from '../../util/logger'
import { sleep } from '../../util'
import { Mutex } from "async-mutex";
import { telegramBot } from "../../sms/telegram";

const accessLogger = getLoggerService('4')

export let starknetLockMap = {};

export function setStarknetLock(makerAddress: string, status: boolean) {
  starknetLockMap[makerAddress.toLowerCase()] = status;
}

export type starknetNetwork = 'mainnet-alpha' | 'georli-alpha'

export function getProviderV4(network: starknetNetwork | string) {
  const sequencer = {
    network: <any>network, // for testnet you can use defaultProvider
  }
  return new Provider({ sequencer })
}
export function parseInputAmountToUint256(
  input: string,
  decimals: number = 18
) {
  return getUint256CalldataFromBN(utils.parseUnits(input, decimals).toString())
}
export class StarknetHelp {
  private cache: Keyv
  private cacheTx: Keyv
  private cacheTxClear: Keyv
  public account: Account
  private mutex = new Mutex();
  constructor(
    public readonly network: starknetNetwork,
    public readonly privateKey: string,
    public readonly address: string
  ) {
    this.cache = new Keyv({
      store: new KeyvFile({
        filename: `logs/nonce/${this.address.toLowerCase()}`, // the file path to store the data
        expiredCheckDelay: 999999 * 24 * 3600 * 1000, // ms, check and remove expired data in each ms
        writeDelay: 100, // ms, batch write to disk in a specific duration, enhance write performance.
        encode: JSON.stringify, // serialize function
        decode: JSON.parse, // deserialize function
      }),
    })
    this.cacheTx = new Keyv({
      store: new KeyvFile({
        filename: `logs/starknetTx/${this.address.toLowerCase()}`, // the file path to store the data
        expiredCheckDelay: 999999 * 24 * 3600 * 1000, // ms, check and remove expired data in each ms
        writeDelay: 100, // ms, batch write to disk in a specific duration, enhance write performance.
        encode: JSON.stringify, // serialize function
        decode: JSON.parse, // deserialize function
      }),
    })
    this.cacheTxClear = new Keyv({
      store: new KeyvFile({
        filename: `logs/starknetTx/${this.address.toLowerCase()}_clear`, // the file path to store the data
        expiredCheckDelay: 999999 * 24 * 3600 * 1000, // ms, check and remove expired data in each ms
        writeDelay: 100, // ms, batch write to disk in a specific duration, enhance write performance.
        encode: JSON.stringify, // serialize function
        decode: JSON.parse, // deserialize function
      }),
    })
    const provider = getProviderV4(network)
    this.account = new Account(
      provider,
      address,
      ec.getKeyPair(this.privateKey)
    )
  }
  async transfer(tokenAddress: string, recipient: String, amount: string) {
    const abi = ERC20['abi']
    const erc20Contract = new Contract(abi as any, tokenAddress, this.account)
    return erc20Contract.transfer(recipient, parseInputAmountToUint256(amount))
  }

  async getNetworkNonce() {
    return Number(await this.account.getNonce())
  }
  async clearTask(taskList: any[], reason: string) {
    await this.mutex.runExclusive(async () => {
      const cacheKey = `queue:${this.address.toLowerCase()}`;
      const allTaskList: any[] = await this.cacheTx.get(cacheKey) || [];
      const leftTaskList = allTaskList.filter(task => {
        return !taskList.find(item => item.params?.transactionID === task.params?.transactionID);
      });
      const clearTaskList = allTaskList.filter(task => {
        return !!taskList.find(item => item.params?.transactionID === task.params?.transactionID);
      });
      // TODO test
      console.log('allTask', allTaskList.map(item => item.params.amountToSend),
          'leftTask', leftTaskList.map(item => item.params.amountToSend),
          'clearTask', clearTaskList.map(item => item.params.amountToSend));
      await this.cacheTx.set(cacheKey, leftTaskList);
      const inputCacheClear = async () => {
        if (clearTaskList.length) {
          const cacheList: any[] = await this.cacheTxClear.get(cacheKey) || [];
            const clearData: any = {
                list: clearTaskList.map(item => {
                    return {
                        address: item.params.ownerAddress,
                        chainId: item.params.fromChainID,
                        symbol: item.params.symbol,
                        amount: item.params.amountToSend
                    };
                }), reason
            };
          cacheList.push(clearData);
            telegramBot.sendMessage(`starknet_task_clear ${JSON.stringify(clearData)}`).catch(error => {
                accessLogger.error('send telegram message error', error);
            });
          await this.cacheTxClear.set(cacheKey, cacheList);
        }
      };
      inputCacheClear();
    });
  }
  async pushTask(taskList: any[]) {
    await this.mutex.runExclusive(async () => {
      const cacheKey = `queue:${this.address.toLowerCase()}`;
      const cacheList = await this.cacheTx.get(cacheKey) || [];
      const newList: any[] = [];
      for (const task of taskList) {
        if (cacheList.find(item => item.params?.transactionID === task.params?.transactionID)) {
          accessLogger.error(`TransactionID already exists ${task.params.transactionID}`);
        } else {
          task.count = (task.count || 0) + 1;
          newList.push(task);
        }
      }
      await this.cacheTx.set(cacheKey, [...cacheList, ...newList]);
    });
  }
  async getTask() {
    const cacheKey = `queue:${this.address.toLowerCase()}`;
    return JSON.parse(JSON.stringify((await this.cacheTx.get(cacheKey)) || []));
  }
  async takeOutNonce() {
    let nonces = await this.getAvailableNonce()
    const takeNonce = nonces.splice(0, 1)[0]
    const networkLastNonce = await this.getNetworkNonce()
    if (Number(takeNonce) < Number(networkLastNonce)) {
      const cacheKey = `nonces:${this.address.toLowerCase()}`
      accessLogger.info(
        `The network nonce is inconsistent with the local, and a reset is requested ${takeNonce}<${networkLastNonce}`
      )
      await this.cache.set(cacheKey, [])
      return await this.takeOutNonce()
    }
    accessLogger.info(
      `getAvailableNonce takeNonce:${takeNonce},networkNonce:${networkLastNonce} starkNet_supportNoce:${JSON.stringify(
        nonces
      )}`
    )
    const cacheKey = `nonces:${this.address.toLowerCase()}`
    await this.cache.set(cacheKey, nonces)
    return {
      nonce: takeNonce,
      rollback: async (error: any, nonce: number) => {
        try {
          let nonces = await this.getAvailableNonce()
          accessLogger.info(
            `Starknet Rollback ${error.message} error fallback nonces ${nonce} available`,
            JSON.stringify(nonces)
          )
          nonces.push(nonce)
          //
          nonces.sort((a, b) => {
            return a - b
          })
          await this.cache.set(cacheKey, nonces)
        } catch (error) {
          accessLogger.error('Starknet Rollback error:' + error.message)
        }
      },
    }
  }
  async getAvailableNonce(): Promise<Array<number>> {
    const cacheKey = `nonces:${this.address.toLowerCase()}`
    let nonces: any = (await this.cache.get(cacheKey)) || []
    if (nonces && nonces.length <= 5) {
      // render
      let localLastNonce: number = max(nonces) || -1
      const networkLastNonce = await this.getNetworkNonce()
      if (networkLastNonce > localLastNonce) {
        nonces = [networkLastNonce]
        localLastNonce = networkLastNonce
      }
      for (let i = nonces.length; i <= 10; i++) {
        localLastNonce++
        nonces.push(localLastNonce)
      }
      accessLogger.info(
        'Generate starknet_getNetwork_nonce =',
        networkLastNonce,
        'nonces:',
        nonces,
        'networkLastNonce:',
        networkLastNonce
      )
      await this.cache.set(cacheKey, nonces)
      nonces.sort((a, b) => {
        return a - b
      })
      return nonces
    }
    nonces.sort((a, b) => {
      return a - b
    })
    return nonces
  }
  async signTransfer(params: {
    tokenAddress: string
    recipient: string
    amount: string
    nonce: number
  }) {
    const provider = getProviderV4(this.network)
    const entrypoint = 'transfer'
    const calldata = compileCalldata({
      recipient: params.recipient,
      amount: getUint256CalldataFromBN(params.amount),
    })
    const ofa = new OfflineAccount(provider, this.address, this.account.signer)
    const trx = await ofa.signTx(
      params.tokenAddress,
      entrypoint,
      calldata,
      params.nonce
    )
    if (!trx || !trx.transaction_hash) {
      throw new Error(`Starknet Failed to send transaction hash does not exist`)
    }
    await sleep(1000)
    const hash = trx.transaction_hash
    try {
      const response = await provider.getTransaction(hash)
      if (
        !['RECEIVED', 'PENDING', 'ACCEPTED_ON_L1', 'ACCEPTED_ON_L2'].includes(
          response['status']
        )
      ) {
        accessLogger.error('Straknet Send After status error:', response)
      }
    } catch (error) {
      accessLogger.error(`Starknet Send After GetTransaction Erro:`, error)
    }
    return {
      hash,
    }
  }

    async signMultiTransfer(paramsList: {
        tokenAddress: string
        recipient: string
        amount: string
    }[], nonce: number) {
        const provider = getProviderV4(this.network);
        const entrypoint = 'transfer';
        const invocationList: { contractAddress: string, entrypoint: string, calldata: any }[] = [];

        for (const params of paramsList) {
            const calldata = compileCalldata({
                recipient: params.recipient,
                amount: getUint256CalldataFromBN(params.amount),
            });

            invocationList.push({ contractAddress: params.tokenAddress, entrypoint, calldata });
        }
        const ofa = new OfflineAccount(provider, this.address, this.account.signer);
        const trx = await ofa.signMutiTx(
            invocationList,
            nonce
        );
        if (!trx || !trx.transaction_hash) {
            throw new Error(`Starknet Failed to send transaction hash does not exist`);
        }
        await sleep(1000);
        const hash = trx.transaction_hash;
        try {
            const response = await provider.getTransaction(hash);
            if (
                !['RECEIVED', 'PENDING', 'ACCEPTED_ON_L1', 'ACCEPTED_ON_L2'].includes(
                    response['status']
                )
            ) {
                accessLogger.error('Straknet Send After status error:', response);
            }
        } catch (error) {
            accessLogger.error(`Starknet Send After GetTransaction Erro:`, error);
        }
        return {
            hash,
        };
    }
}
/**
 *
 * @param starknetAddress
 * @param contractAddress
 * @param networkId
 * @returns
 */
export async function getErc20Balance(
  starknetAddress: string,
  contractAddress: string,
  network: string
) {
  if (!starknetAddress || !contractAddress) {
    return 0
  }
  const provider = getProviderV4(network)
  const abi = ERC20['abi']
  const tokenContract = new Contract(<any>abi, contractAddress, provider)
  const balanceSender: Uint256 = (
    await tokenContract.balanceOf(starknetAddress)
  ).balance
  return new BigNumber(balanceSender.low.toString() || 0).toNumber()
}

export function getUint256CalldataFromBN(bn: BigNumberish) {
  return { type: 'struct' as const, ...uint256.bnToUint256(String(bn)) }
}
