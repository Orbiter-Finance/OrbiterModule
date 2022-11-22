import {
  Account,
  number,
  KeyPair,
  ProviderInterface,
  SignerInterface,
  transaction,
  hash,
  InvocationsSignerDetails,
  Abi,
  InvocationsDetails,
  InvokeFunctionResponse,

} from 'starknet'
type Transaction = any;
import ERC20Abi from './ERC20.json'
import 'cross-fetch/polyfill';
import { toBN } from 'starknet/dist/utils/number';

export class OfflineAccount extends Account {
  constructor(
    provider: ProviderInterface,
    address: string,
    keyPairOrSigner: KeyPair | SignerInterface
  ) {
    super(provider, address, keyPairOrSigner)
  }
  /**
     * Invoke execute function in account contract
     *
     * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)
     *
     * @param calls - one or more calls to be executed
     * @param abis - one or more abis which can be used to display the calls
     * @param transactionsDetail - optional transaction details
     * @returns a confirmation of invoking a function on the starknet contract
     */
  public async execute(
    calls: any,
    abis: Abi[] | undefined = undefined,
    transactionsDetail: InvocationsDetails = {},
  ): Promise<InvokeFunctionResponse> {
    // const transactions = await this.extendCallsBySession(
    //   Array.isArray(calls) ? calls : [calls],
    //   this.signedSession,
    // )
    const transactions = calls;
    const nonce = number.toBN(
      transactionsDetail.nonce ?? (await this.getNonce()),
    )
    let maxFee: number.BigNumberish = "0"
    if (transactionsDetail.maxFee || transactionsDetail.maxFee === 0) {
      maxFee = transactionsDetail.maxFee
    } else {
      const { suggestedMaxFee } = await this.estimateFee(
        Array.isArray(calls) ? calls : [calls]
      )
      maxFee = suggestedMaxFee.toString()
    }

    const version = number.toBN(hash.transactionVersion)

    const signerDetails: InvocationsSignerDetails = {
      walletAddress: this.address,
      nonce,
      maxFee,
      version,
      chainId: this.chainId,
    }
    console.log(String(signerDetails.nonce), '===signerDetails');
    const signature = await this.signer.signTransaction(
      transactions,
      signerDetails,
      abis,
    )

    // const calldata = transaction.fromCallsToExecuteCalldataWithNonce(
    //   transactions,
    //   nonce,
    // )

    const calldata = transaction.fromCallsToExecuteCalldata(
      transactions,
    )


    return this.invokeFunction(
      {
        contractAddress: this.address,
        calldata,
        signature,
      },
      {
        maxFee,
        version,
        nonce,
      },
    )
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
    let maxFee = toBN(0.009 * 10 ** 18);
    const { suggestedMaxFee } = await this.estimateFee(invocation)
    if (suggestedMaxFee.gt(maxFee)) {
      maxFee = suggestedMaxFee;
    }
    const transactionDetail = {
      nonce: nonce,
      maxFee,
    }
    const response = await this.execute([invocation], [<any>ERC20Abi], transactionDetail)
    return response;
  }
}
