import Web3 from 'web3';
import { telegramBot } from "../sms/telegram";
import { makerConfig } from "../config";
import { errorLogger } from "./logger";
import { ChainServiceTokenBalance } from "orbiter-chaincore/src/packages/token-balance";

export class MakerWeb3 {
    public web3: Web3;
    public rpcList: string[];
    public rpcIndex: number = 0;
    public stableRpc: string;

    constructor(chainId: number) {
        if (!makerConfig[chainId] || !makerConfig[chainId].rpc) {
            const msg = `can't find ${chainId} rpc configure`;
            telegramBot.sendMessage(msg);
            errorLogger.error(msg);
            return;
        }
        this.rpcList = makerConfig[chainId].rpc;
        this.refreshWeb3();
    }

    refreshWeb3(customRpc?: string) {
        const rpc = customRpc || this.rpcList[0];
        this.stableRpc = rpc;
        this.web3 = new Web3(rpc);
    }

    getNewRpc(fn?: string) {
        const oldRpc = this.rpcList[this.rpcIndex];
        const index = this.rpcIndex + 1 >= this.rpcList.length ? 0 : this.rpcIndex;
        this.rpcIndex = index;
        const newRpc: string = this.rpcList[index];
        const msg = `request ${fn} fail, change rpc ${oldRpc.substr(0, 20)} --> ${newRpc.substr(0, 20)}`;
        errorLogger.error(msg);
        telegramBot.sendMessage(msg);
        return newRpc;
    }

    getRpc() {
        return this.rpcList[this.rpcIndex];
    }

    async getTransaction(transactionHash: string) {
        try {
            return await this.web3.eth.getTransaction(transactionHash);
        } catch (e) {
            await this.refreshWeb3(this.getNewRpc('getTransaction'));
            throw new Error(e);
        }
    }

    async getTransactionReceipt(transactionHash: string) {
        try {
            return await this.web3.eth.getTransactionReceipt(transactionHash);
        } catch (e) {
            await this.refreshWeb3(this.getNewRpc('getTransactionReceipt'));
            throw new Error(e);
        }
    }

    async getBlock(blockHashOrBlockNumber: string | number, returnTransactionObjects?: boolean): Promise<any> {
        try {
            if (returnTransactionObjects) {
                return await this.web3.eth.getBlock(blockHashOrBlockNumber, true);
            }
            return await this.web3.eth.getBlock(blockHashOrBlockNumber);
        } catch (e) {
            await this.refreshWeb3(this.getNewRpc('getBlock'));
            throw new Error(e);
        }
    }

    async getCode(address: string) {
        try {
            return await this.web3.eth.getCode(address);
        } catch (e) {
            await this.refreshWeb3(this.getNewRpc('getCode'));
            throw new Error(e);
        }
    }

    async getBlockNumber() {
        try {
            return await this.web3.eth.getBlockNumber();
        } catch (e) {
            await this.refreshWeb3(this.getNewRpc('getBlockNumber'));
            throw new Error(e);
        }
    }

    async Contract(ABI: any, tokenAddress: string) {
        try {
            return new this.web3.eth.Contract(ABI, tokenAddress);
        } catch (e) {
            // await this.refreshWeb3(this.getNewRpc('Contract'));
            throw new Error(e);
        }
    }

    async toHex(value: any) {
        try {
            return await this.web3.utils.toHex(value);
        } catch (e) {
            // await this.refreshWeb3(this.getNewRpc('toHex'));
            throw new Error(e);
        }
    }

    async getBalance(chainId: number, address: string, tokenAddress: string) {
        try {
            const chainService = new ChainServiceTokenBalance(String(chainId));
            const result = await chainService.getBalance(address, tokenAddress);
            return result?.balance;
        } catch (e) {
            await this.refreshWeb3(this.getNewRpc("getBalance"));
            throw new Error(e);
        }
    }
}
