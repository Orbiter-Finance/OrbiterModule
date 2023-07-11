import { chains } from 'orbiter-chaincore/src/utils';
import schedule from 'node-schedule'
import { LoggerService, accessLogger, errorLogger } from '../util/logger';
import * as coinbase from '../service/coinbase'
import * as serviceMaker from '../service/maker'
import mainnetChains from '../config/chains.json'
import testnetChains from '../config/testnet.json'
import { makerConfig } from "../config";
import { equals } from "orbiter-chaincore/src/utils/core";
import { setStarknetLock, StarknetHelp, starknetLockMap } from "../service/starknet/helper";
import { getNewMarketList, repositoryMakerNode } from "../util/maker/new_maker";
import { readLogJson, sleep, writeLogJson } from "../util";
import { sendTxConsumeHandle } from "../util/maker";
import { In } from "typeorm";
import { getStarknetTokenBalance } from "../service/maker_wealth";
import BigNumber from "bignumber.js";
import { telegramBot } from "../sms/telegram";
import { doSms } from "../sms/smsSchinese";
import fs from "fs";
import path from "path";
import { clearInterval } from "timers";
import { consulConfig } from "../config/consul_store";
import {extractMessageInAxiosError } from "../util/tools";

chains.fill(<any>[...mainnetChains, ...testnetChains])
// import { doSms } from '../sms/smsSchinese'
class MJob {
  protected rule:
    | string
    | number
    | schedule.RecurrenceRule
    | schedule.RecurrenceSpecDateRange
    | schedule.RecurrenceSpecObjLit
    | Date
  protected callback?: () => any
  protected jobName?: string

  /**
   * @param rule
   * @param callback
   * @param completed
   */
  constructor(
    rule:
      | string
      | number
      | schedule.RecurrenceRule
      | schedule.RecurrenceSpecDateRange
      | schedule.RecurrenceSpecObjLit
      | Date,
    callback?: () => any,
    jobName?: string
  ) {
    this.rule = rule
    this.callback = callback
    this.jobName = jobName
  }

  public schedule(): schedule.Job {
    return schedule.scheduleJob(this.rule, async () => {
      try {
        this.callback && (await this.callback())
      } catch (error) {
        let message = `MJob.schedule error: ${error.message}, rule: ${this.rule}`
        if (this.jobName) {
          message += `, jobName: ${this.jobName}`
        }
        errorLogger.error(message)
      }
    })
  }
}

// Pessimism Lock Job
class MJobPessimism extends MJob {
  public schedule(): schedule.Job {
    let pessimismLock = false

    const _callback = this.callback

    this.callback = async () => {
      if (pessimismLock) {
        return
      }
      pessimismLock = true

      try {
        _callback && (await _callback())
      } catch (error) {
        throw error
      } finally {
        // Always release lock
        pessimismLock = false
      }
    }

    return super.schedule()
  }
}

export function jobCacheCoinbase() {
  const callback = async () => {
    await coinbase.cacheExchangeRates()
  }

  new MJobPessimism(
    '*/10 * * * * *',
    callback,
    jobCacheCoinbase.name
  ).schedule()
}

let alarmMsgMap = {};
let balanceWaringTime = 0;
let cron;
const sendCronMap = {};

export async function batchTxSend(chainIdList = [4, 44]) {
  const makerSend = (makerAddress, chainId) => {
    const accessLogger = LoggerService.getLogger(makerAddress);
    const snCallback = async () => {
        const sn = async () => {
            if (starknetLockMap[makerAddress.toLowerCase()]) {
                console.log('Starknet is lock, waiting for the end of the previous transaction');
                return { code: 0 };
            }
            setStarknetLock(makerAddress, true);
            // Alarm interval duration(second)
            const waringInterval = consulConfig.starknet.waringInterval ? Number(consulConfig.starknet.waringInterval) : 180;
            // Execute several transactions at once
            const execTaskCount = consulConfig.starknet.execTaskCount ? Number(consulConfig.starknet.execTaskCount) : 50;
            // Maximum number of transactions to be stacked in the memory pool
            const maxTaskCount: number = consulConfig.starknet.maxTaskCount ? Number(consulConfig.starknet.maxTaskCount) : 200;
            const expireTime: number = consulConfig.starknet.expireTime ? Number(consulConfig.starknet.expireTime) : 1800;
            const maxTryCount: number = consulConfig.starknet.maxTryCount ? Number(consulConfig.starknet.maxTryCount) : 10;

            const privateKey = makerConfig.privateKeys[makerAddress.toLowerCase()];
            const network = equals(chainId, 44) ? 'goerli-alpha' : 'mainnet-alpha';
            const starknet = new StarknetHelp(<any>network, privateKey, makerAddress);
            let taskList = await starknet.getTask();
            if (!taskList || !taskList.length) {
                accessLogger.log('There are no consumable tasks in the starknet queue');
                return { code: 1 };
            }
            taskList = taskList.sort(function (a, b) {
                return b.createTime - a.createTime;
            });
            // Exceeded limit, clear task
            const clearTaskList: any[] = [];
            // Meet the limit, execute the task
            const execTaskList: any[] = [];
            // Error message
            const errorMsgList: string[] = [];
            for (let i = 0; i < taskList.length; i++) {
                const task = taskList[i];
                // max length limit
                if (i < taskList.length - maxTaskCount) {
                    clearTaskList.push(task);
                    errorMsgList.push(`starknet_max_count_limit ${taskList.length} > ${maxTaskCount}, ownerAddress: ${task.params.ownerAddress}, value: ${task.signParam.amount}, fromChainID: ${task.params.fromChainID}`);
                    continue;
                }
                // expire time limit
                if (task.createTime < new Date().valueOf() - expireTime * 1000) {
                    clearTaskList.push(task);
                    const formatDate = (timestamp: number) => {
                        return new Date(timestamp).toDateString() + " " + new Date(timestamp).toLocaleTimeString();
                    };
                    errorMsgList.push(`starknet_expire_time_limit ${formatDate(task.createTime)} < ${formatDate(new Date().valueOf() - expireTime * 1000)}, ownerAddress: ${task.params.ownerAddress}, value: ${task.signParam.amount}, fromChainID: ${task.params.fromChainID}`);
                    continue;
                }
                // retry count limit
                if (task.count > maxTryCount) {
                    clearTaskList.push(task);
                    errorMsgList.push(`starknet_retry_count_limit ${task.count} > ${maxTryCount}, ownerAddress: ${task.params.ownerAddress}, value: ${task.signParam.amount}, fromChainID: ${task.params.fromChainID}`);
                    continue;
                }
                execTaskList.push(task);
            }
            if (clearTaskList.length) {
                accessLogger.error(`starknet_task_clear ${clearTaskList.length}, ${JSON.stringify(errorMsgList)}`);
                alarmMsgMap['starknet_task_clear'] = alarmMsgMap['starknet_task_clear'] || [];
                alarmMsgMap['starknet_task_clear'].push(...clearTaskList.map(item => item.params?.transactionID));
                await starknet.clearTask(clearTaskList, 1);
            }

            const queueList: any[] = [];
            for (let i = 0; i < Math.min(execTaskList.length, execTaskCount); i++) {
                const task = execTaskList[i];
                // Database filtering
                const makerNodeCount: number = await repositoryMakerNode().count(<any>{
                    transactionID: task.params?.transactionID, state: In([1, 20])
                });
                if (!makerNodeCount) {
                    accessLogger.error(`Transaction cannot be sent ${JSON.stringify(task)}`);
                    await starknet.clearTask([task], 1);
                    continue;
                }
                queueList.push(JSON.parse(JSON.stringify(task)));
            }
            const tokenPay: { [tokenAddress: string]: BigNumber } = {};
            for (const queue of queueList) {
                tokenPay[queue.signParam.tokenAddress] = new BigNumber(tokenPay[queue.signParam.tokenAddress] || 0).plus(queue.signParam.amount);
            }
            const makerList = await getNewMarketList();
            for (const tokenAddress in tokenPay) {
                const market = makerList.find(item => equals(item.toChain.id, chainId) && equals(item.toChain.tokenAddress, tokenAddress));
                if (!market) {
                    accessLogger.error(
                        `Transaction pair not found market: - ${chainId} ${tokenAddress}`
                    );
                    return { code: 1 };
                }
                // Maker balance judgment
                const makerBalance: BigNumber | null = await getStarknetTokenBalance(chainId, makerAddress, tokenAddress);
                const needPay: BigNumber = tokenPay[tokenAddress];
                // Insufficient Balance
                if (makerBalance && needPay.gt(makerBalance)) {
                    accessLogger.error(`starknet ${makerAddress} ${market.toChain.symbol} insufficient balance, ${needPay.toString()} > ${makerBalance.toString()}`);
                    if (balanceWaringTime < new Date().valueOf() - waringInterval * 1000) {
                        const alert: string = `starknet ${makerAddress} ${market.toChain.symbol} insufficient balance, ${needPay.toString()} > ${makerBalance.toString()}`;
                        doSms(alert);
                        telegramBot.sendMessage(alert).catch(error => {
                            accessLogger.error(`batchTxSend send telegram message error message:${extractMessageInAxiosError(error)} stack ${error.stack}`);
                        });
                        balanceWaringTime = new Date().valueOf();
                    }
                    return { code: 1 };
                }
            }

            // signParam: {recipient: toAddress,tokenAddress,amount: String(amountToSend)}
            const signParamList = queueList.map(item => item.signParam);
            // params: {makerAddress,toAddress,toChain,chainID,tokenInfo,tokenAddress,amountToSend,result_nonce,fromChainID,lpMemo,ownerAddress,transactionID}
            const paramsList = queueList.map(item => item.params);
            if (!queueList.length) {
                accessLogger.info('There are no consumable tasks in the starknet queue');
                return { code: 1 };
            }
            const { nonce, rollback, commit } = await starknet.takeOutNonce();
            try {
                await starknet.clearTask(queueList, 0);
                accessLogger.info(`starknet_sql_nonce = ${nonce}`);
                accessLogger.info(`starknet_consume_count = ${queueList.length}`);
                let hash = '';
                if (signParamList.length === 1) {
                    accessLogger.info('starknet sent one ====');
                    const res: any = await starknet.signTransfer({ ...signParamList[0], nonce });
                    hash = res.hash;
                } else {
                    accessLogger.info('starknet sent multi ====');
                    const res: any = await starknet.signMultiTransfer(signParamList, nonce);
                    hash = res.hash;
                }
                await commit(nonce);
                await sendTxConsumeHandle({
                    code: 3,
                    txid: hash,
                    rollback,
                    params: paramsList[0],
                    paramsList
                });
                setStarknetLock(makerAddress, false);
            } catch (error) {
                accessLogger.error(`starknet transfer fail: ${queueList.map(item => item.params?.transactionID)}`);
                if (error.message.indexOf('StarkNet Alpha throughput limit reached') !== -1 ||
                    error.message.indexOf('Bad Gateway') !== -1) {
                    await starknet.pushTask(queueList);
                } else if (error.message.indexOf('Invalid transaction nonce. Expected:') !== -1
                    && error.message.indexOf('got:') !== -1) {
                    const arr: string[] = error.message.split(', got: ');
                    const nonce1 = arr[0].replace(/[^0-9]/g, "");
                    const nonce2 = arr[1].replace(/[^0-9]/g, "");
                    if (Number(nonce) !== Number(nonce1) && Number(nonce) !== Number(nonce2)) {
                        accessLogger.error(`starknet sequencer error: ${nonce} != ${nonce1}, ${nonce} != ${nonce2}`);
                        await starknet.pushTask(queueList);
                    }
                }
                await rollback(error, nonce);
                await sendTxConsumeHandle({
                    code: 4,
                    txid: 'starknet transfer error: ' + error.message,
                    result_nonce: nonce,
                    params: paramsList[0],
                    paramsList
                });
            }
            return { code: 0 };
        };
        if (Number(chainId) === 4 || Number(chainId) === 44) {
            try {
                const rs = await sn();
                // code 0.complete or wait 1.interrupt
                if (rs.code === 1) {
                    setStarknetLock(makerAddress, false);
                }
            } catch (e) {
                setStarknetLock(makerAddress, false);
                accessLogger.error(`sn job error: ${e.message}`);
            }
        }
    };

      const interval = consulConfig.starknet.sendInterval ? Number(consulConfig.starknet.sendInterval) : 15;
      if (sendCronMap[`${makerAddress}_${chainId}`]) {
          clearInterval(sendCronMap[`${makerAddress}_${chainId}`]);
          accessLogger.info(`${makerAddress}-${chainId} cron interval change to ${interval}s`);
      }
      sendCronMap[`${makerAddress}_${chainId}`] = setInterval(() => {
          snCallback();
      }, interval * 1000);
  };
  const makerList = await getNewMarketList();
  const chainMakerList = makerList.filter(item => !!chainIdList.find(chainId => Number(item.toChain.id) === Number(chainId)));
  const makerDataList: { makerAddress: string, chainId: number, symbol: string }[] = [];
  for (const data of chainMakerList) {
    if (makerDataList.find(item => item.chainId === data.toChain.id && item.symbol === data.toChain.symbol)) {
      continue;
    }
    makerDataList.push({ makerAddress: data.sender, chainId: data.toChain.id, symbol: data.toChain.symbol });
  }
  // Prevent the existence of unlinked transactions before the restart and the existence of nonce occupancy
  await sleep(5000);
  for (let i = 0; i < makerDataList.length; i++) {
    const maker = makerDataList[i];
    makerSend(maker.makerAddress, maker.chainId);
  }
  watchStarknetAlarm();
}

function watchStarknetAlarm() {
    if (cron) {
        clearInterval(cron);
    }
    const waringInterval = consulConfig.starknet.waringInterval ? Number(consulConfig.starknet.waringInterval) : 180;
    cron = setInterval(() => {
        for (const key in alarmMsgMap) {
            telegramBot.sendMessage(`${key} ${(<string[]>alarmMsgMap[key]).join(',')}`).catch(error => {
                accessLogger.error(`watchStarknetAlarm send telegram message error message:${extractMessageInAxiosError(error)} stack ${error.stack}`);
            });
            doSms(`${key} count ${alarmMsgMap[key].length}`);
            delete alarmMsgMap[key];
        }
    }, waringInterval * 1000);
}