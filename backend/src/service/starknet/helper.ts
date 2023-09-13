import { Account, cairo, Contract, ec, Provider, RpcProvider, uint256 } from 'starknet';
import Keyv from 'keyv'
import KeyvFile from 'orbiter-chaincore/src/utils/keyvFile'
import { max } from 'lodash'
import { getLoggerService } from '../../util/logger'
import { readLogArr, sleep, writeLogJson } from '../../util';
import ERC20Abi from './ERC20.json'

const accessLogger = getLoggerService('4')

export let starknetLockMap = {};

export function setStarknetLock(makerAddress: string, status: boolean) {
  starknetLockMap[makerAddress.toLowerCase()] = status;
}

export function getProviderV4(nodeUrl: string) {
    return new RpcProvider({ nodeUrl });
}

export const starknetHelpLockMap = {};

const txPool: { [makerAddress: string]: any[] } = {};

export class StarknetHelp {
  private cache: Keyv
  public account: Account
  constructor(
    public readonly rpc: string,
    public readonly privateKey: string,
    public readonly address: string,
    public readonly cairoVersion: string = '0',
  ) {
    this.cache = new Keyv({
      store: new KeyvFile({
        filename: `logs/nonce/${this.address.toLowerCase()}`, // the file path to store the data
        expiredCheckDelay: 999999 * 24 * 3600 * 1000, // ms, check and remove expired data in each ms
        writeDelay: 0, // ms, batch write to disk in a specific duration, enhance write performance.
        encode: JSON.stringify, // serialize function
        decode: JSON.parse, // deserialize function
      }),
    })

    const provider = getProviderV4(rpc);
    this.account = new Account(
      provider,
      address,
      ec.getKeyPair(this.privateKey),
      String(cairoVersion)
    )
  }

  async getNetworkNonce() {
    return Number(await this.account.getNonce())
  }
  // code:0.Normal clearing 1.Abnormal clearing
  async clearTask(taskList: any[], code: number) {
      const makerAddress = this.account.address.toLowerCase();
      if (starknetHelpLockMap[makerAddress]) {
          accessLogger.info('Task is lock, wait for 100 ms');
          await sleep(100);
          await this.clearTask(taskList, code);
          return;
      }
      starknetHelpLockMap[makerAddress] = true;
      try {
          const allTaskList: any[] = await this.getTask();
          const leftTaskList = allTaskList.filter(task => {
              return !taskList.find(item => item.params?.transactionID === task.params?.transactionID);
          });
          const clearTaskList = allTaskList.filter(task => {
              return !!taskList.find(item => item.params?.transactionID === task.params?.transactionID);
          });
          txPool[makerAddress] = leftTaskList;
          if (clearTaskList.length && code) {
              const cacheList: any[] = await readLogArr(`${makerAddress}_clear.json`, 'starknetTx/clear');
              cacheList.push(clearTaskList.map(item => {
                  return {
                      transactionID: item.params.transactionID,
                      chainId: item.params.fromChainID,
                      hash: item.params.fromHash
                  };
              }));
              await writeLogJson(`${makerAddress}_clear.json`, 'starknetTx/clear', cacheList);
          }
      } catch (e) {
          accessLogger.error(`starknet clearTask error: ${e.message}`);
      }
      starknetHelpLockMap[makerAddress] = false;
  }
  async pushTask(taskList: any[]) {
      const makerAddress = this.account.address.toLowerCase();
      if (starknetHelpLockMap[makerAddress]) {
          accessLogger.info('Task is lock, wait for 100 ms');
          await sleep(100);
          await this.pushTask(taskList);
          return;
      }
      starknetHelpLockMap[makerAddress] = true;
      try {
          const cacheList: any[] = await this.getTask();
          const newList: any[] = [];
          for (const task of taskList) {
              if (cacheList.find(item => item.params?.transactionID === task.params?.transactionID)) {
                  accessLogger.error(`TransactionID already exists ${task.params.transactionID}`);
              } else {
                  task.count = (task.count || 0) + 1;
                  newList.push(task);
              }
          }
          txPool[makerAddress] = [...cacheList, ...newList];
      } catch (e) {
          accessLogger.error(`starknet pushTask error: ${e.message}`);
      }
      starknetHelpLockMap[makerAddress] = false;
  }
  async getTask(): Promise<any[]> {
      return JSON.parse(JSON.stringify(txPool[this.address.toLowerCase()] || []));
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
    return {
      nonce: takeNonce,
      rollback: async (error: any, nonce: number) => {
        // try {
        //   let nonces = await this.getAvailableNonce()
        //   accessLogger.info(
        //     `Starknet Rollback ${error.message} error fallback nonces ${nonce} available ${JSON.stringify(nonces)}`
        //   )
        //   // nonces.push(nonce)
        //   //
        //   nonces.sort((a, b) => {
        //     return a - b
        //   })
        //   await this.cache.set(cacheKey, nonces)
        // } catch (error) {
        //   accessLogger.error(`Starknet Rollback error: ${ error.message}`)
        // }
        await sleep(1000);
        setStarknetLock(this.address.toLowerCase(), false);
      },
      commit:async(nonce:number)=> {
        await this.cache.set(cacheKey, nonces)
      }
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
        `Generate starknet_getNetwork_nonce = ${networkLastNonce}, nonces: ${nonces}`
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

    async signTransfer(paramsList: {
        tokenAddress: string
        recipient: string
        amount: string
    }[], nonce: number) {
        const provider = getProviderV4(this.rpc);
        const invocationList: any[] = [];
        for (const params of paramsList) {
            const ethContract = new Contract(ERC20Abi, params.tokenAddress, provider);
            invocationList.push(ethContract.populateTransaction.transfer(params.recipient, cairo.uint256(params.amount)));
        }
        if (!nonce && nonce != 0) {
            throw new Error('Not Find Nonce Params');
        }
        let maxFee = 0.009 * 10 ** 18;
        const { suggestedMaxFee } = await this.account.estimateFee(invocationList);
        if (suggestedMaxFee.gt(maxFee)) {
            maxFee = suggestedMaxFee;
        }
        const transactionDetail = {
            nonce: nonce,
            maxFee,
        };
        const trx = await this.account.execute(invocationList, undefined, transactionDetail);
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
                accessLogger.error(`Straknet Send After status error: ${response}`);
            }
        } catch (error) {
            accessLogger.error(`Starknet Send After GetTransaction Erro: ${error}`);
        }
        return {
            hash,
        };
    }
}
