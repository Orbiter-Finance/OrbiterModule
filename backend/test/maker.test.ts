import * as makerCore from '../src/util/maker/core'
// import { getProviderV4, StarknetHelp } from "../src/service/starknet/helper";

// import { Account, Contract, defaultProvider, ec, json, number, SequencerProvider, stark, hash, uint256, cairo, RpcProvider, CallData } from 'starknet';
// import ERC20Abi from "../src/service/starknet/ERC20.json";
import { getProviderV4, StarknetHelp } from "../src/service/starknet/helper";
// import { StarknetHelp } from "../src/service/starknet/helper";

describe('maker', () => {
  describe('makerCore', () => {
    it('test starknet', async () => {


      // const provider = getProviderV4("https://starknet-testnet.public.blastapi.io")
      // try {
      //   const t = await provider.getTransaction("0x4559b90319f2ad6397209314122327890bbd0f74453bcb11a487e233578c389");
      //   const t2 = await provider.getTransactionReceipt("0x4559b90319f2ad6397209314122327890bbd0f74453bcb11a487e233578c389");
      //   console.log('getTransaction', t);
      //   console.log('getTransactionReceipt', t2);
      // } catch (e) {
      //
      // }

      await transferTokenV2("0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          "0x0274Ff9139350580a93A4eD390De13FDd5bB333D18344146612Af4e17593e100",(0.000001 * 10 ** 18).toString())


    }, 1800 * 1000)
  })
})

async function transferTokenV2(token: string, to: string, value: string) {
  const account = new StarknetHelp(
      "https://starknet-testnet.public.blastapi.io",
      "",
      "",
      "1");
  const nonce = await account.getNetworkNonce();
  const res = await account.signTransfer([{ tokenAddress: token, recipient: to, amount: value }], nonce);
  console.log('res', res);
}
