import { ethers, providers, Wallet } from "ethers";
import BigNumber from "bignumber.js";
import { chains } from "orbiter-chaincore";
import { telegramBot } from "../sms/telegram";
import { MakerWeb3 } from "../util/web3";
import { getLoggerService } from "../util/logger";
import { IChainConfig } from "orbiter-chaincore/src/types";
import { readLogJson, sleep, writeLogJson } from "../util";
import Keyv from "keyv";
import KeyvFile from "orbiter-chaincore/src/utils/keyvFile";
import { equals } from "orbiter-chaincore/src/utils/core";
import { getNewMarketList, repositoryMakerNode } from "../util/maker/new_maker";
import { In } from "typeorm";
import { doSms } from "../sms/smsSchinese";
import { sendTxConsumeHandle } from "../util/maker";
import { max } from 'lodash';
import { alarmMsgMap } from "../schedule/jobs";
import { clearInterval } from "timers";
import { Orbiter_Router_ABI, ERC20_ABI } from "../config/ABI";

// Ensure that cached data is not manipulated at the same time
const taskLockMap = {};
// To ensure that the same maker cannot send two transactions at the same time
const jobLockMap = {};
// Categorize trading pools according to transaction type
const txPool: { [makerAddress_chainId: string]: any[] } = {};
// Each transaction pool corresponds to a timer
const cronMap: { [makerAddress_chainId: string]: any } = {};

let balanceWaringTime = 0;
// Alarm interval duration(second)
let waringInterval = 180;
// Execute several transactions at once
let execTaskCount = 50;
// Maximum number of transactions to be stacked in the memory pool
let maxTaskCount: number = 200;
let expireTime: number = 30 * 60;
let maxTryCount: number = 180;

let gasMulti: number = 1.2;
let gasMaxPrice: number = 200000000000;

interface IJobParams {
    waringInterval: number;
    execTaskCount: number;
    maxTaskCount: number;
    expireTime: number;
    maxTryCount: number;
    sendInterval: number;
}

export class EVMAccount {
    private cache: Keyv;
    public chainConfig: IChainConfig | any;
    public wallet: Wallet;
    public provider: ethers.providers.Provider;
    public logger: any;
    private makerWeb3: MakerWeb3;
    public address: string;
    private sendInterval: number = 20;
    private readonly lockKey: string;
    private readonly txKey: string;

    constructor(
        protected internalId: number,
        protected tokenAddress: string,
        protected readonly privateKey: string,
    ) {
        this.logger = getLoggerService(String(internalId));
        this.makerWeb3 = new MakerWeb3(internalId);
        this.chainConfig = chains.getChainByInternalId(String(internalId));
        this.refreshProvider();
        this.address = this.wallet.address.toLowerCase();
        this.cache = new Keyv({
            store: new KeyvFile({
                filename: `logs/evm/${internalId}/nonce/${this.address}`, // the file path to store the data
                expiredCheckDelay: 999999 * 24 * 3600 * 1000, // ms, check and remove expired data in each ms
                writeDelay: 0, // ms, batch write to disk in a specific duration, enhance write performance.
                encode: JSON.stringify, // serialize function
                decode: JSON.parse, // deserialize function
            }),
        });
        this.lockKey = `${this.address}_${this.chainConfig.internalId}`;
        this.txKey = `${this.address}_${this.chainConfig.internalId}_${tokenAddress.toLowerCase()}`;
    }

    refreshProvider() {
        this.provider = new providers.JsonRpcProvider({
            url: this.makerWeb3.stableRpc,
        });
        this.wallet = new ethers.Wallet(this.privateKey).connect(this.provider);
    }

    async takeOutNonce() {
        let nonces = await this.getAvailableNonce();
        const takeNonce = nonces.splice(0, 1)[0];
        const networkLastNonce = await this.getNetworkNonce();
        if (Number(takeNonce) < Number(networkLastNonce)) {
            const cacheKey = `nonces:${this.address}`;
            this.logger.info(
                `The network nonce is inconsistent with the local, and a reset is requested ${takeNonce}<${networkLastNonce}`
            );
            await this.cache.set(cacheKey, []);
            return await this.takeOutNonce();
        }
        this.logger.info(
            `getAvailableNonce takeNonce:${takeNonce},networkNonce:${networkLastNonce} ${this.chainConfig.name}_supportNoce:${JSON.stringify(
                nonces
            )}`
        );
        const cacheKey = `nonces:${this.address}`;
        return {
            nonce: takeNonce,
            commit: async (nonce: number) => {
                await this.cache.set(cacheKey, nonces);
            }
        };
    }

    async getAvailableNonce(): Promise<Array<number>> {
        const cacheKey = `nonces:${this.address.toLowerCase()}`;
        let nonces: any = (await this.cache.get(cacheKey)) || [];
        if (nonces && nonces.length <= 5) {
            // render
            let localLastNonce: number = max(nonces) || -1;
            const networkLastNonce = await this.getNetworkNonce();
            if (networkLastNonce > localLastNonce) {
                nonces = [networkLastNonce];
                localLastNonce = networkLastNonce;
            }
            for (let i = nonces.length; i <= 10; i++) {
                localLastNonce++;
                nonces.push(localLastNonce);
            }
            this.logger.info(
                `Generate ${this.chainConfig.name}_getNetwork_nonce = ${networkLastNonce}, nonces: ${nonces}`
            );
            await this.cache.set(cacheKey, nonces);
            nonces.sort((a, b) => {
                return a - b;
            });
            return nonces;
        }
        nonces.sort((a, b) => {
            return a - b;
        });
        return nonces;
    }

    async getNetworkNonce() {
        return Number(await this.wallet.getTransactionCount("pending"));
    }

    // code:0.Normal clearing 1.Abnormal clearing
    async clearTask(taskList: any[], code: number) {
        const txKey = this.txKey;
        if (taskLockMap[txKey]) {
            this.logger.info(`${txKey} task is lock, wait for 100 ms`);
            await sleep(100);
            await this.clearTask(taskList, code);
            return;
        }
        taskLockMap[txKey] = true;
        try {
            const allTaskList: any[] = await this.getTask();
            const leftTaskList = allTaskList.filter(task => {
                return !taskList.find(item => item.params?.transactionID === task.params?.transactionID);
            });
            const clearTaskList = allTaskList.filter(task => {
                return !!taskList.find(item => item.params?.transactionID === task.params?.transactionID);
            });
            txPool[txKey] = leftTaskList;
            if (clearTaskList.length && code) {
                const cacheList: any[] = await readLogJson(`${this.address}`, `evm/${this.chainConfig.internalId}/clear`);
                cacheList.push(clearTaskList.map(item => {
                    return {
                        transactionID: item.params.transactionID,
                        chainId: item.params.fromChainID,
                        hash: item.params.fromHash
                    };
                }));
                await writeLogJson(`${this.address}`, `evm/${this.chainConfig.internalId}/clear`, cacheList);
            }
        } catch (e) {
            this.logger.error(`clearTask error: ${e.message}`);
        }
        taskLockMap[txKey] = false;
    }

    async pushTask(taskList: any[]) {
        const txKey = this.txKey;
        if (taskLockMap[txKey]) {
            this.logger.info(`${txKey} task is lock, wait for 100 ms`);
            await sleep(100);
            await this.pushTask(taskList);
            return;
        }
        taskLockMap[txKey] = true;
        try {
            const cacheList: any[] = await this.getTask();
            const newList: any[] = [];
            for (const task of taskList) {
                if (cacheList.find(item => item.params?.transactionID === task.params?.transactionID)) {
                    this.logger.error(`TransactionID already exists ${task.params.transactionID}`);
                } else {
                    task.count = (task.count || 0) + 1;
                    newList.push(task);
                }
            }
            txPool[txKey] = [...cacheList, ...newList];
        } catch (e) {
            this.logger.error(`pushTask error: ${e.message}`);
        }
        taskLockMap[txKey] = false;
    }

    async getVariableConfig(): Promise<{
        waringInterval: number,
        execTaskCount: number,
        maxTaskCount: number,
        expireTime: number,
        maxTryCount: number,
        sendInterval: number,
        gasMulti: number,
        gasMaxPrice: number
    }> {
        return await readLogJson(`limit.json`, `evm/${this.chainConfig.internalId}/limit`, {
            waringInterval, execTaskCount, maxTaskCount, expireTime, maxTryCount,
            sendInterval: this.sendInterval,
            gasMulti,
            gasMaxPrice
        });
    }

    async getTask(): Promise<any[]> {
        return JSON.parse(JSON.stringify(txPool[this.txKey] || []));
    }

    async getGasPrice(transactionRequest: ethers.providers.TransactionRequest = {}) {
        try {
            const feeData = await this.provider.getFeeData();
            const variableConfig = await this.getVariableConfig();
            const multi: number = variableConfig.gasMulti;
            const gasMaxPrice: number = variableConfig.gasMaxPrice;
            if (feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
                transactionRequest.type = 2;
                const rpc = this.makerWeb3.getRpc()
                let maxPriorityFeePerGas = 5000000000
                try {
                    const provider = new ethers.providers.JsonRpcProvider(rpc);
                    const alchemyMaxPriorityFeePerGas = await provider.send("eth_maxPriorityFeePerGas", []);
                    if (Number(new BigNumber(alchemyMaxPriorityFeePerGas).multipliedBy(multi).toFixed(0)) > maxPriorityFeePerGas) {
                        maxPriorityFeePerGas = Number(new BigNumber(alchemyMaxPriorityFeePerGas).multipliedBy(multi).toFixed(0));
                    }
                    
                    transactionRequest.maxPriorityFeePerGas = this.makerWeb3.web3.utils.toHex(Number(maxPriorityFeePerGas).toFixed(0))
                    transactionRequest.maxFeePerGas = this.makerWeb3.web3.utils.toHex(gasMaxPrice)
                    delete transactionRequest.gasPrice;
                } catch (error) {
                  this.logger.error(`eth_maxPriorityFeePerGas error ${error.message}`)
                  throw new Error(`eth_maxPriorityFeePerGas error:${error.message}`);
                }
            
             
            } else {
                // type = 0 not eip 1559
                this.logger.error(`${this.chainConfig.name} Normal transaction sending is not implemented`)
            }
          
        } catch (e) {
            this.logger.error("get gas price error:", e);
            throw e;
        }
    }

    async send(toList: string[], valueList: string[], tokenAddress: string, preSend?: Function): Promise<ethers.providers.TransactionResponse | undefined> {
        const isErc20Tx = tokenAddress.toLowerCase() !== this.chainConfig.nativeCurrency.address.toLowerCase();
        if (toList.length > 1) {
            // Erc20
            if (!isErc20Tx) {
                this.logger.info(`${this.chainConfig.name} sent multi ====`);
                return await this.transferMulti(toList, valueList, preSend);
            } else {
                this.logger.info(`${this.chainConfig.name} sent token multi ====`);
                return await this.transferTokenMulti(toList, valueList, tokenAddress, preSend);
            }
        } else if (toList.length === 1) {
            if (!isErc20Tx) {
                this.logger.info(`${this.chainConfig.name} sent one ====`);
                return await this.transfer(toList[0], valueList[0], preSend);
            } else {
                this.logger.info(`${this.chainConfig.name} sent token one ====`);
                return await this.transferToken(toList[0], valueList[0], tokenAddress, preSend);
            }
        }
        return undefined;
    }

    async transfer(to: string, value: string, preSend?: Function): Promise<ethers.providers.TransactionResponse | undefined> {
        const transactionRequest: ethers.providers.TransactionRequest = {
            from: this.wallet.address,
            to,
            value: ethers.BigNumber.from(value),
            chainId: Number(this.chainConfig.networkId) || await this.wallet.getChainId(),
        };
        try {
            transactionRequest.gasLimit = await this.provider.estimateGas({
                from: transactionRequest.from,
                to: transactionRequest.to,
                value: transactionRequest.value,
            });
        } catch (error) {
            this.logger.error(`transfer estimateGas error`, error);
            transactionRequest.gasLimit = ethers.BigNumber.from(100000);
        }
        await this.getGasPrice(transactionRequest);
        const { nonce, commit } = await this.takeOutNonce();
        await this.checkNonce(nonce);
        if (preSend) await preSend();
        this.logger.info(`${this.chainConfig.name}_sql_nonce = ${nonce}`);
        transactionRequest.nonce = nonce;
        this.logger.info(`transfer transaction request`, JSON.stringify(transactionRequest));
        const signedTx = await this.wallet.signTransaction(transactionRequest);
        const txHash = ethers.utils.keccak256(signedTx);
        const response = await this.provider.sendTransaction(signedTx);
        this.logger.info(`transfer sendTransaction txHash`, txHash);
        // this.logger.info(`transfer sendTransaction response`, JSON.stringify(response));
        commit(nonce);
        return response;
    }

    async transferToken(to: string, value: string, tokenAddress: string, preSend?: Function): Promise<ethers.providers.TransactionResponse | undefined> {
        value = await this.makerWeb3.toHex(value);
        const tokenContract = await this.makerWeb3.Contract(ERC20_ABI, tokenAddress)
        const transactionRequest: ethers.providers.TransactionRequest = {
            from: this.wallet.address,
            to: tokenAddress,
            value: '0x0',
            chainId: Number(this.chainConfig.networkId) || await this.wallet.getChainId(),
            data: tokenContract.methods
                .transfer(to, value)
                .encodeABI(),
        };
        try {
            transactionRequest.gasLimit = await this.provider.estimateGas({
                from: transactionRequest.from,
                to: transactionRequest.to,
                value: transactionRequest.value,
                data: transactionRequest.data,
            });
        } catch (error) {
            this.logger.error(`transfer token estimateGas error`, error);
            transactionRequest.gasLimit = ethers.BigNumber.from(100000);
        }
        await this.getGasPrice(transactionRequest);
        const { nonce, commit } = await this.takeOutNonce();
        await this.checkNonce(nonce);
        if (preSend) await preSend();
        this.logger.info(`${this.chainConfig.name}_sql_nonce = ${nonce}`);
        transactionRequest.nonce = nonce;
        this.logger.info(`transfer token transaction request`, JSON.stringify({
            ...transactionRequest,
            data: undefined
        }));
        const signedTx = await this.wallet.signTransaction(transactionRequest);
        const txHash = ethers.utils.keccak256(signedTx);
        const response = await this.provider.sendTransaction(signedTx);
        this.logger.info(`transfer token sendTransaction txHash`, txHash);
        // this.logger.info(`swap sendTransaction response`, JSON.stringify(response));
        commit(nonce);
        return response;
    }

    async transferMulti(toList: string[], valueList: string[], preSend?: Function): Promise<ethers.providers.TransactionResponse | undefined> {
        if (toList.length !== valueList.length) {
            this.logger.error("length error", `t: ${toList.join(",")}`, `v: ${valueList.join(",")}`);
            throw new Error('length error');
        }
        let totalValue = new BigNumber(0);
        for (let i = 0; i < valueList.length; i++) {
            const value: any = valueList[i];
            totalValue = totalValue.plus(value);
        }
        this.logger.info("swap total value", totalValue.toString());

        const ifa = new ethers.utils.Interface(Orbiter_Router_ABI);
        const calldata = ifa.encodeFunctionData("transfers", [
            toList,
            valueList,
        ]);

        let contractAddress = '';
        for (const address in this.chainConfig.router) {
            if (this.chainConfig.router[address] === 'OrbiterRouterV3') {
                contractAddress = address;
                break;
            }
        }
        if (!contractAddress) {
            throw new Error(`${this.chainConfig.name} contractAddress unconfigured`);
        }
        const transactionRequest: ethers.providers.TransactionRequest = {
            from: this.wallet.address,
            to: contractAddress,
            value: ethers.BigNumber.from(totalValue.toString()),
            chainId: Number(this.chainConfig.networkId) || await this.wallet.getChainId(),
            data: calldata,
        };
        try {
            transactionRequest.gasLimit = await this.provider.estimateGas({
                from: transactionRequest.from,
                to: transactionRequest.to,
                value: transactionRequest.value,
                data: transactionRequest.data,
            });
        } catch (error) {
            this.logger.error(`swap estimateGas error`, error);
            transactionRequest.gasLimit = ethers.BigNumber.from(100000);
        }
        await this.getGasPrice(transactionRequest);
        const { nonce, commit } = await this.takeOutNonce();
        await this.checkNonce(nonce);
        if (preSend) await preSend();
        this.logger.info(`${this.chainConfig.name}_sql_nonce = ${nonce}`);
        transactionRequest.nonce = nonce;
        this.logger.info(`swap transaction request`, JSON.stringify({ ...transactionRequest, data: undefined }));
        const signedTx = await this.wallet.signTransaction(transactionRequest);
        const txHash = ethers.utils.keccak256(signedTx);
        const response = await this.provider.sendTransaction(signedTx);
        this.logger.info(`swap sendTransaction txHash`, txHash);
        // this.logger.info(`swap sendTransaction response`, JSON.stringify(response));
        commit(nonce);
        return response;
    }

    async transferTokenMulti(toList: string[], valueList: string[], tokenAddress: string, preSend?: Function): Promise<ethers.providers.TransactionResponse | undefined> {
        if (toList.length !== valueList.length) {
            this.logger.error("length error", `t: ${toList.join(",")}`, `v: ${valueList.join(",")}`);
            throw new Error('length error');
        }

        const ifa = new ethers.utils.Interface(Orbiter_Router_ABI);
        const calldata = ifa.encodeFunctionData("transferTokens", [
            tokenAddress,
            toList,
            valueList,
        ]);

        let contractAddress = '';
        for (const address in this.chainConfig.router) {
            if (this.chainConfig.router[address] === 'OrbiterRouterV3') {
                contractAddress = address;
                break;
            }
        }
        if (!contractAddress) {
            throw new Error(`${this.chainConfig.name} contractAddress unconfigured`);
        }
        const transactionRequest: ethers.providers.TransactionRequest = {
            from: this.wallet.address,
            to: contractAddress,
            value: '0x0',
            chainId: Number(this.chainConfig.networkId) || await this.wallet.getChainId(),
            data: calldata,
        };
        try {
            transactionRequest.gasLimit = await this.provider.estimateGas({
                from: transactionRequest.from,
                to: transactionRequest.to,
                value: transactionRequest.value,
                data: transactionRequest.data,
            });
        } catch (error) {
            this.logger.error(`swap token estimateGas error`, error);
            transactionRequest.gasLimit = ethers.BigNumber.from(100000);
        }
        await this.getGasPrice(transactionRequest);
        const { nonce, commit } = await this.takeOutNonce();
        await this.checkNonce(nonce);
        if (preSend) await preSend();
        this.logger.info(`${this.chainConfig.name}_sql_nonce = ${nonce}`);
        transactionRequest.nonce = nonce;
        this.logger.info(`swap token transaction request`, JSON.stringify({ ...transactionRequest, data: undefined }));
        const signedTx = await this.wallet.signTransaction(transactionRequest);
        const txHash = ethers.utils.keccak256(signedTx);
        const response = await this.provider.sendTransaction(signedTx);
        this.logger.info(`swap token sendTransaction txHash`, txHash);
        // this.logger.info(`swap sendTransaction response`, JSON.stringify(response));
        commit(nonce);
        return response;
    }

    async checkNonce(nonce: number) {
        const lastNonce = await this.wallet.getTransactionCount();
        // Alarm triggered by too much pending data in the memory pool
        if (nonce - 20 > lastNonce) {
            const alert = `${this.txKey} last nonce ${lastNonce}, use nonce ${nonce}`;
            this.logger.error(alert);
            telegramBot.sendMessage(alert).catch(error => {
                this.logger.error(`send telegram message error ${error.stack}`);
            });
        }
    }

    private async job() {
        const makerAddress = this.address;
        const lockKey = this.lockKey;
        if (jobLockMap[lockKey]) {
            console.log(`${lockKey} is lock, waiting for the end of the previous transaction`);
            return { code: 0 };
        }
        jobLockMap[lockKey] = true;
        const chainId = this.chainConfig.internalId;
        let taskList = await this.getTask();
        if (!taskList || !taskList.length) {
            this.logger.info(`There are no consumable tasks in the ${this.txKey} queue`);
            return { code: 1 };
        }

        this.logger.info(`start job ========`);

        const variableConfig = await this.getVariableConfig();
        waringInterval = variableConfig.waringInterval;
        execTaskCount = variableConfig.execTaskCount;
        maxTaskCount = variableConfig.maxTaskCount;
        expireTime = variableConfig.expireTime;
        maxTryCount = variableConfig.maxTryCount;


        taskList = taskList.sort(function (a, b) {
            return b.createTime - a.createTime;
        });
        // Exceeded limit, clear task
        const clearTaskList: any[] = [];
        // Meet the limit, execute the task
        const execTaskList: any[] = [];
        // Error message
        const errorMsgList: string[] = [];
        this.logger.info(`check task ========`);
        for (let i = 0; i < taskList.length; i++) {
            const task = taskList[i];
            // max length limit
            if (i < taskList.length - maxTaskCount) {
                clearTaskList.push(task);
                errorMsgList.push(`${this.chainConfig.name}_max_count_limit ${taskList.length} > ${maxTaskCount}, ownerAddress: ${task.params.ownerAddress}, value: ${task.signParam.amount}, fromChainID: ${task.params.fromChainID}`);
                continue;
            }
            // expire time limit
            if (task.createTime < new Date().valueOf() - expireTime * 1000) {
                clearTaskList.push(task);
                const formatDate = (timestamp: number) => {
                    return new Date(timestamp).toDateString() + " " + new Date(timestamp).toLocaleTimeString();
                };
                errorMsgList.push(`${this.chainConfig.name}_expire_time_limit ${formatDate(task.createTime)} < ${formatDate(new Date().valueOf() - expireTime * 1000)}, ownerAddress: ${task.params.ownerAddress}, value: ${task.signParam.amount}, fromChainID: ${task.params.fromChainID}`);
                continue;
            }
            // retry count limit
            if (task.count > maxTryCount) {
                clearTaskList.push(task);
                errorMsgList.push(`${this.chainConfig.name}_retry_count_limit ${task.count} > ${maxTryCount}, ownerAddress: ${task.params.ownerAddress}, value: ${task.signParam.amount}, fromChainID: ${task.params.fromChainID}`);
                continue;
            }
            execTaskList.push(task);
        }
        if (clearTaskList.length) {
            this.logger.error(`${this.chainConfig.name}_task_clear ${clearTaskList.length}, ${JSON.stringify(errorMsgList)}`);
            alarmMsgMap[`${this.chainConfig.name}_task_clear`] = alarmMsgMap[`${this.chainConfig.name}_task_clear`] || [];
            alarmMsgMap[`${this.chainConfig.name}_task_clear`].push(...clearTaskList.map(item => item.params?.transactionID));
            await this.clearTask(clearTaskList, 1);
        }

        this.logger.info(`clear check over ========`);

        let queueList: any[] = [];
        for (let i = 0; i < Math.min(execTaskList.length, execTaskCount); i++) {
            const task = execTaskList[i];
            // Database filtering
            const makerNodeCount: number = await repositoryMakerNode().count(<any>{
                transactionID: task.params?.transactionID, state: In([1, 20])
            });
            if (!makerNodeCount) {
                this.logger.error(`Transaction cannot be sent ${JSON.stringify(task)}`);
                await this.clearTask([task], 1);
                continue;
            }
            queueList.push(JSON.parse(JSON.stringify(task)));
        }
        const tokenPay: { [tokenAddress: string]: BigNumber } = {};
        for (const queue of queueList) {
            tokenPay[queue.signParam.tokenAddress] = new BigNumber(tokenPay[queue.signParam.tokenAddress] || 0).plus(queue.signParam.amount);
        }
        this.logger.info(`balance check ========`);
        const makerList = await getNewMarketList();
        for (const tokenAddress in tokenPay) {
            const market = makerList.find(item => equals(item.toChain.id, chainId) && equals(item.toChain.tokenAddress, tokenAddress));
            if (!market) {
                this.logger.error(
                    `Transaction pair not found market: - ${chainId} ${tokenAddress}`
                );
                return { code: 1 };
            }
            // Maker balance judgment
            let makerBalance: BigNumber = new BigNumber(0);
            try {
                makerBalance = new BigNumber(await this.makerWeb3.getBalance(chainId, makerAddress, tokenAddress));
            } catch (e) {
                this.logger.error(`getBalance error ${e.message}`);
                telegramBot.sendMessage(`getBalance error ${e.message}`).catch(error => {
                    this.logger.error(`send telegram message error ${error.stack}`);
                });
                await this.refreshProvider();
                return { code: 1 };
            }
            const needPay: BigNumber = tokenPay[tokenAddress];
            // Insufficient Balance
            if (makerBalance && needPay.gt(makerBalance)) {
                this.logger.error(`${this.chainConfig.name} ${makerAddress} ${market.toChain.symbol} insufficient balance, ${needPay.toString()} > ${makerBalance.toString()}`);
                if (balanceWaringTime < new Date().valueOf() - waringInterval * 1000) {
                    const alert: string = `${this.chainConfig.name} ${makerAddress} ${market.toChain.symbol} insufficient balance, ${needPay.toString()} > ${makerBalance.toString()}`;
                    doSms(alert);
                    telegramBot.sendMessage(alert).catch(error => {
                        this.logger.error(`send telegram message error ${error.stack}`);
                    });
                    balanceWaringTime = new Date().valueOf();
                }
                return { code: 1 };
            }
        }
        if (!queueList.length) {
            this.logger.info(`There are no consumable tasks in the ${this.chainConfig.name} queue`);
            return { code: 1 };
        }
        if (queueList.length < 10) {
            queueList = [queueList[0]];
        }

        // params: {makerAddress,toAddress,toChain,chainID,tokenInfo,tokenAddress,amountToSend,result_nonce,fromChainID,lpMemo,ownerAddress,transactionID}
        const paramsList = queueList.map(item => item.params);
     

        this.logger.info(`queue check over ========`);
        // signParam: {recipient: toAddress,tokenAddress,amount: String(amountToSend)}
        const toList: string[] = [];
        const valueList: string[] = [];
        const tokenAddressList: string[] = [];
        const chainIdHashList: string[] = [];
        for (const queue of queueList) {
            const { recipient, amount, tokenAddress, fromChainId, fromHash } = queue.signParam;
            toList.push(recipient);
            valueList.push(amount);
            tokenAddressList.push(tokenAddress);
            chainIdHashList.push(`(${fromChainId}) ${fromHash}`);
        }
        try {
            this.logger.info(`prepare send ========`);
            const res: ethers.providers.TransactionResponse | undefined = await this.send(toList, valueList, tokenAddressList[0], async () => {
                await this.clearTask(queueList, 0);
                this.logger.info(`${this.chainConfig.name}_consume_count = ${queueList.length}`);
            });
            const hash = res?.hash;
            this.logger.info(`to hash: ${hash} ,from hash: ${chainIdHashList.join(' ,')}`);
            await sendTxConsumeHandle({
                code: 3,
                txid: hash,
                params: paramsList[0],
                paramsList
            });
        } catch (error) {
            this.logger.error(`${this.chainConfig.name} transfer fail: ${queueList.map(item => item.params?.transactionID)}`);
            await sendTxConsumeHandle({
                code: 4,
                txid: `${this.chainConfig.name} transfer error: ` + error.message,
                params: paramsList[0],
                paramsList
            });
        }
        return { code: 1 };
    }

    async startJob() {
        const _this = this;
        const variableConfig = await this.getVariableConfig();
        this.sendInterval = variableConfig.sendInterval;

        const txKey = this.txKey;
        const lockKey = this.lockKey;
        cronMap[txKey] = createCron(this.sendInterval);

        function createCron(interval: number) {
            _this.logger.info(`${txKey} create cron: interval ${interval}s`);
            return setInterval(async () => {
                try {
                    const rs = await _this.job();
                    // code 0.complete or wait 1.interrupt
                    if (rs.code === 1) {
                        jobLockMap[lockKey] = false;
                    }
                } catch (e) {
                    jobLockMap[lockKey] = false;
                    _this.logger.error(`${_this.chainConfig.name} job error: ${e.message}`);
                }
                await watchCron();
            }, interval * 1000);
        }

        // watch send interval
        async function watchCron() {
            const data: IJobParams = await _this.getVariableConfig();
            if (_this.sendInterval !== data.sendInterval) {
                if (cronMap[txKey]) {
                    clearInterval(cronMap[txKey]);
                }
                _this.sendInterval = data.sendInterval;
                cronMap[txKey] = createCron(_this.sendInterval);
            }
        }
    }
}
