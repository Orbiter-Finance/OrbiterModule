import ERC20 from './ERC20.json'
import ERC20Abi from './erc20_abi.json'
import { utils } from "ethers"
import {
  Account,
  Contract,
  ec,
  number,
  Provider,
  uint256,
  Signer,
} from 'starknet'
import { Uint256 } from 'starknet/dist/utils/uint256'
import BigNumber from 'bignumber.js'
import { BigNumberish, bigNumberishArrayToDecimalStringArray, toBN, toHex } from 'starknet/dist/utils/number'
import { OfflineAccount } from './account'
import { compileCalldata } from 'starknet/dist/utils/stark'
import Keyv from 'keyv'
import KeyvFile from 'orbiter-chaincore/src/utils/keyvFile'
import { max } from 'lodash'
import { getLoggerService } from '../../util/logger'
import { SessionAccount } from './accountV2'
import { fromCallsToExecuteCalldataWithNonce } from 'starknet/dist/utils/transaction'
const accessLogger = getLoggerService("4");

export type starknetNetwork = 'mainnet-alpha' | 'georli-alpha'

export function getProviderV4(network: starknetNetwork | string) {
  const sequencer = {
    network: <any>network // for testnet you can use defaultProvider
  }
  return new Provider({ sequencer });
  // return new Provider({network: <any>network});

}
export function parseInputAmountToUint256(
  input: string,
  decimals: number = 18,
) {
  return getUint256CalldataFromBN(utils.parseUnits(input, decimals).toString())
}
export class StarknetHelp {
  private cache: Keyv
  public account: Account;
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
    const provider = getProviderV4(network);
    this.account = new Account(
      provider,
      address,
      ec.getKeyPair(this.privateKey)
    )
  }
  async transfer(tokenAddress: string, recipient: String, ) {
    const provider = getProviderV4(this.network);
    const abi = ERC20['abi'];
    const erc20Contract = new Contract(abi as any, tokenAddress, this.account);
    const calldata = compileCalldata({
      recipient: <any>recipient,
      amount: parseInputAmountToUint256("1"),
    })
    console.log(tokenAddress, '====tokenAddress')
    console.log(recipient, '====recipient')
    // const transferRes = await this.account.execute({
    //   contractAddress: tokenAddress,
    //   entrypoint: 'transfer',
    //   calldata: [recipient, "2000000000000000000"],
    // }, [<any>abi],
    //   {
    //     nonce: 9,
    //     maxFee: "999999995330000"
    //   });
    // console.log(transferRes, '==transferRes');
    return erc20Contract.transfer(
      recipient,
      parseInputAmountToUint256("2"),
    )
  }
  async signTx(
    targetContract: string,
    txCalldata: number.BigNumberish[],
  ): Promise<any> {
    const invocation = {
      contractAddress: targetContract,
      entrypoint: 'transfer',
      calldata: txCalldata,
    }
    const nonce = await this.getNetworkNonce();
    console.log(nonce, '=====nonce');

    if (!nonce) {
      throw new Error('Not Find Nonce Params')
    }
    let fee = toBN(0.009 * 10 ** 18);
    const transactionDetail = {
      walletAddress: this.address,
      chainId: '0x534e5f474f45524c49',
      nonce: nonce,
      version: 0,
      maxFee: fee,
    }
    return {
      type: 'INVOKE_FUNCTION',
      // entry_point_selector:
      // '0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad',
      contract_address: targetContract,
      calldata: fromCallsToExecuteCalldataWithNonce(
        [invocation],
        transactionDetail.nonce
      ),
      signature: bigNumberishArrayToDecimalStringArray(
        await this.account.signer.signTransaction([invocation], <any>transactionDetail)
      ),
      max_fee: toHex(fee),
    } as any;
  }
  async getNetworkNonce() {
    console.log(this.network, '====netork')
    const provider = getProviderV4('mainnet-alpha');
    const nonce = await provider.getNonce("0x001709ea381e87d4c9ba5e4a67adc9868c05e82556a53fd1b3a8b1f21e098143");
    return Number(nonce);
    // return Number(await acc.getNonce())
  }
  async takeOutNonce() {
    const nonces = await this.getAvailableNonce()
    const takeNonce = nonces.splice(0, 1)[0]
    const networkLastNonce = await this.getNetworkNonce();
    if (Number(takeNonce) < Number(networkLastNonce)) {
      const cacheKey = `nonces:${this.address.toLowerCase()}`
      accessLogger.info(`The network nonce is inconsistent with the local, and a reset is requested ${takeNonce}<${networkLastNonce}`);
      await this.cache.set(cacheKey, [])
      return await this.takeOutNonce();
    }
    accessLogger.info(`getAvailableNonce takeNonce:${takeNonce},networkNonce:${networkLastNonce} starkNet_supportNoce:${JSON.stringify(nonces)}`);
    const cacheKey = `nonces:${this.address.toLowerCase()}`
    await this.cache.set(cacheKey, nonces)
    return {
      nonce: takeNonce,
      rollback: async (error: any, nonce: number) => {
        try {
          const nonces = await this.getAvailableNonce()
          accessLogger.info(`Starknet Rollback ${error.message} error fallback nonces ${nonce} available`, JSON.stringify(nonces))
          nonces.push(nonce)
          await this.cache.set(cacheKey, nonces)
        } catch (error) {
          accessLogger.error('Starknet Rollback error:' + error.message);
        }

      },
    }
  }
  async getAvailableNonce() {
    const cacheKey = `nonces:${this.address.toLowerCase()}`
    let nonces: any = (await this.cache.get(cacheKey)) || []
    if (nonces && nonces.length <= 5) {
      // render
      let localLastNonce: number = max(nonces) || 0
      const networkLastNonce = await this.getNetworkNonce();
      if (networkLastNonce > localLastNonce) {
        nonces = [networkLastNonce]
        localLastNonce = networkLastNonce
      }
      for (let i = nonces.length; i <= 10; i++) {
        localLastNonce++
        nonces.push(localLastNonce)
      }
      accessLogger.info('Generate starknet_getNetwork_nonce =', networkLastNonce, 'nonces:', nonces)
      await this.cache.set(cacheKey, nonces)
    }
    nonces.sort();
    return nonces
  }
  async signTransfer(params: {
    tokenAddress: string
    recipient: string
    amount: string
    nonce: number
  }) {
    const starkPair = ec.getKeyPair(this.privateKey)
    const signer = new Signer(starkPair)
    const provider = getProviderV4(this.network)
    const acc: OfflineAccount = new OfflineAccount(
      provider,
      this.address,
      signer
    )
    const entrypoint = 'transfer'
    const calldata = compileCalldata({
      recipient: params.recipient,
      amount: getUint256CalldataFromBN(params.amount),
    })
    let nonce = params.nonce
    const signedTx = await acc.signTx(
      params.tokenAddress,
      entrypoint,
      calldata,
      Number(nonce)
    )
    const sentTx: any = await acc.broadcastSignedTransaction(signedTx)
    const hash = sentTx.transaction_hash;
    // provider.getTransaction(hash).then((result) => {
    //   console.log(JSON.stringify(result), '==before')
    // })
    // await provider.waitForTransaction(txid)
    // console.log(await acc.getNonce(), 'after==nonce')
    // provider.getTransaction(txid).then((result) => {
    //   console.log(JSON.stringify(result), '===after')
    // })
    return { hash }
  }
  async sendEthTransaction(tokenAddress: string, to: string, amount: string
  ) {
    if (to.length != 66) {
      throw new Error(`Starknet To Address ${to} Format Error`)
    }
    // const abi = ERC20['abi'];
    const abi = ERC20Abi;
    return new Promise(async (resolve, reject) => {
      try {
        const erc20Contract = new Contract(
          <any>abi,
          tokenAddress,
          this.account
        )
        const tokenBalance = await getErc20Balance(
          this.account.address,
          tokenAddress,
          this.network
        )
        const toAmount = number.toBN(amount)
        if (toAmount.gt(number.toBN(tokenBalance.toString()))) {
          throw new Error(
            `Starknet ${this.account.address
            } Insufficient funds ${tokenBalance.toString()}/${toAmount.toString()}`
          )
        }
        console.log('===============transfer----', erc20Contract.transfer)
        const transferResp = await erc20Contract.transfer(
          to,
          parseInputAmountToUint256(toAmount.toString())
        )
        console.log(transferResp, '======transferResp');

        if (transferResp.code != 'TRANSACTION_RECEIVED') {
          return reject(`Starknet transfer failed ${transferResp.code}`)
        }
        console.warn(
          'Waitting transfer transaction:',
          transferResp.transaction_hash
        )

        return resolve({
          hash: transferResp.transaction_hash,
          // done: () => provider.waitForTransaction(transferResp.transaction_hash),
        })
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
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
  const abi = ERC20['abi'];
  const tokenContract = new Contract(<any>abi, contractAddress, provider)
  const balanceSender: Uint256 = (
    await tokenContract.balanceOf(starknetAddress)
  ).balance
  return new BigNumber(balanceSender.low.toString() || 0).toNumber()
}


export function getUint256CalldataFromBN(bn: BigNumberish) {
  return { type: 'struct' as const, ...uint256.bnToUint256(String(bn)) }
}

