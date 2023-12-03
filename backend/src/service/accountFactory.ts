import { Wallet } from "ethers";
import { EVMAccount } from "./evmAccount";

export class AccountFactory {
    private static accounts: { [key: string]: EVMAccount } = {}
    static createAccount(chainId: string, token: string, privateKey: string) {
        // get makerAddress 
        const wallet = new Wallet(privateKey);
        const makerAddress = wallet.address;
        const k = `${chainId}-${token}-${makerAddress}`.toLocaleLowerCase();
        if (!AccountFactory.accounts[k]) {
            AccountFactory.accounts[k] = new EVMAccount(+chainId, token, privateKey)
        }
        return AccountFactory.accounts[k];
    }
}