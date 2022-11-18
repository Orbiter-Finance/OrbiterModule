// import { ec, Signer } from 'starknet';
// import {SessionAccount} from '../src/service/starknet/accountV2';
// const signer = new Signer(ec.getKeyPair("0x37666e47ad225862b41e4ca28c6fe5b481b85628b2f3116fd72c01eb1c9daae"))
import { Contract } from 'starknet';
import { getProviderV4, StarknetHelp } from '../src/service/starknet/helper';
// const sessAccount = new SessionAccount(
//     account,
//     account.address,
//     sessionSigner,
//     signedSession,
//   )


async function main() {
    const starknetHelp = new StarknetHelp("georli-alpha", "", "");
    console.log("getAvailableNonce---", await starknetHelp.getAvailableNonce(), await starknetHelp.getNetworkNonce())
    const { nonce, rollback } = await starknetHelp.takeOutNonce();
    console.log(`takeOutNonce :`, nonce);
    const result = await starknetHelp.signTransfer({
        tokenAddress: "0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
        recipient: "0x050e5ba067562e87b47d87542159e16a627e85b00de331a53b471cee1a4e5a4f",
        amount: (Math.random() * 0.05 * 10 ** 18).toString(),
        nonce
    });

    console.log(result);
}

main()