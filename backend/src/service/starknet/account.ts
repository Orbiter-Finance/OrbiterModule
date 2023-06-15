import {
  Account,
  number,
  KeyPair,
  ProviderInterface,
  SignerInterface
} from 'starknet';
type Transaction = any;
import ERC20Abi from './ERC20.json'
import 'cross-fetch/polyfill';

export class OfflineAccount extends Account {
  constructor(
    provider: ProviderInterface,
    address: string,
    keyPairOrSigner: KeyPair | SignerInterface
  ) {
    super(provider, address, keyPairOrSigner)
  }

  public async signTx(
    targetContract: string,
    entrypoint: string,
    txCalldata: number.BigNumberish[],
    nonce: number
  ): Promise<Transaction> {
    const invocation = {
      contractAddress: targetContract,
      entrypoint: entrypoint,
      calldata: txCalldata,
    }
    // const nonce = await this.getNonce();
    if (!nonce && nonce != 0) {
      throw new Error('Not Find Nonce Params')
    }
    let maxFee = number.toBN(0.009 * 10 ** 18);
    const { suggestedMaxFee } = await this.estimateFee(invocation)
    if (suggestedMaxFee.gt(maxFee)) {
      maxFee = suggestedMaxFee;
    }
    const transactionDetail = {
      nonce: nonce,
      maxFee,
    }
    console.log(nonce, '===signerDetails');
    return await this.execute([invocation], [<any>ERC20Abi], transactionDetail)
  }

  public async signMutiTx(
      invocationList: { contractAddress, entrypoint, calldata }[],
      nonce: number
  ): Promise<Transaction> {
    // const nonce = await this.getNonce();
    if (!nonce && nonce != 0) {
      throw new Error('Not Find Nonce Params');
    }
    let maxFee = toBN(0.009 * 10 ** 18);
    const { suggestedMaxFee } = await this.estimateFee(invocationList);
    if (suggestedMaxFee.gt(maxFee)) {
      maxFee = suggestedMaxFee;
    }
    const transactionDetail = {
      nonce: nonce,
      maxFee,
    };
    const abis: any[] = [];
    for (const data of invocationList) {
      abis.push(ERC20Abi);
    }
    return await this.execute(invocationList, abis, transactionDetail);
  }
}
