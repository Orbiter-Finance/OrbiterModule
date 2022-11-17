// import { ec, Signer } from 'starknet';
// import {SessionAccount} from '../src/service/starknet/accountV2';
// const signer = new Signer(ec.getKeyPair("0x37666e47ad225862b41e4ca28c6fe5b481b85628b2f3116fd72c01eb1c9daae"))
import { getProviderV4, StarknetHelp } from '../src/service/starknet/helper';
// const sessAccount = new SessionAccount(
//     account,
//     account.address,
//     sessionSigner,
//     signedSession,
//   )


async function main() {
    // const starknetHelp = new StarknetHelp("georli-alpha", "0x37666e47ad225862b41e4ca28c6fe5b481b85628b2f3116fd72c01eb1c9daae", "0x033b88fc03a2ccb1433d6c70b73250d0513c6ee17a7ab61c5af0fbe16bd17a6e");
    // const starknetHelp = new StarknetHelp("georli-alpha", "0x5755011ca164ce427ff9b56f1af7b3a7007bef0caf9163a0e9e30c979773f39", "0x069a775ef31fae8311b2ee2024243c9f1ee46e63f98a7dcaf3d077c951f5174b");
    // const nonce = await starknetHelp.getNetworkNonce()
    // console.log(nonce, '===nonce');
    // const result = await starknetHelp.signTransfer({
    //     tokenAddress: "0x049d36570d4e46f48e99674Bd3fcC84644dDD6B96F7C741b1562b82F9E004dc7",
    //     recipient: "0x069A775eF31FaE8311B2EE2024243C9F1eE46E63f98A7DCAF3D077C951f5174b",
    //     amount: "1000000000000",
    //     nonce
    // });
    // console.log(result, '===result');
    const provider = getProviderV4("mainnet-alpha");
    const block = await provider.getBlock("9173");
    console.log(JSON.stringify(block.transactions), '===block');
    
}

main()