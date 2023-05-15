import { chains } from 'orbiter-chaincore/src/utils';
import schedule from 'node-schedule'
import { accessLogger, errorLogger } from '../util/logger';
import * as coinbase from '../service/coinbase'
import * as serviceMaker from '../service/maker'
import * as serviceMakerWealth from '../service/maker_wealth'
import { doBalanceAlarm } from '../service/setting'
import { Core } from '../util/core'
import mainnetChains from '../config/chains.json'
import testnetChains from '../config/testnet.json'
import { makerConfig } from "../config";
import { equals } from "orbiter-chaincore/src/utils/core";
import { setStarknetLock, StarknetHelp, starknetLockMap } from "../service/starknet/helper";
import { getNewMarketList, repositoryMakerNode } from "../util/maker/new_maker";
import { isDevelopment, sleep } from "../util";
import { sendTxConsumeHandle } from "../util/maker";
import { In } from "typeorm";
import { getStarknetTokenBalance } from "../service/maker_wealth";
import BigNumber from "bignumber.js";
import { telegramBot } from "../sms/telegram";
import { doSms } from "../sms/smsSchinese";
import fs from "fs";
import path from "path";
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

export function jobGetWealths() {
  const callback = async () => {
    const makerAddresses = await serviceMaker.getMakerAddresses()
    for (const item of makerAddresses) {
      const wealths = await serviceMakerWealth.getWealths(item)

      Core.memoryCache.set(
        `${serviceMakerWealth.CACHE_KEY_GET_WEALTHS}:${item}`,
        wealths,
        100000
      )

      await serviceMakerWealth.saveWealths(wealths)
    }
  }

  new MJobPessimism('* */60 * * * *', callback, jobGetWealths.name).schedule()
}

const jobMakerNodeTodoMakerAddresses: string[] = []
export function jobMakerNodeTodo(makerAddress: string) {
  // Prevent multiple makerAddress
  if (jobMakerNodeTodoMakerAddresses.indexOf(makerAddress) > -1) {
    return
  }
  jobMakerNodeTodoMakerAddresses.push(makerAddress)

  const callback = async () => {
    await serviceMaker.runTodo(makerAddress)
  }

  new MJobPessimism(
    '*/10 * * * * *',
    callback,
    jobMakerNodeTodo.name
  ).schedule()
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

export function jobBalanceAlarm() {
  const callback = async () => {
    await doBalanceAlarm.do()
  }

  new MJobPessimism('*/10 * * * * *', callback, jobBalanceAlarm.name).schedule()
}

let limitWaringTime = 0;
let balanceWaringTime = 0;
// Alarm interval duration(second)
const waringInterval = 180;
// Execute several transactions at once
const execTaskCount = 10;
// Maximum number of transactions to be stacked in the memory pool
const maxTaskCount: number = 200;
const expireTime: number = 10 * 60 * 1000;
const maxTryCount: number = 60;

export async function batchTxSend(chainIdList = [4, 44]) {
  const makerSend = (makerAddress, chainId) => {
    const callback = async () => {
        const sn = async () => {
            if (starknetLockMap[makerAddress.toLowerCase()]) {
                console.log('Starknet is lock, waiting for the end of the previous transaction');
                return { code: 0 };
            }
            setStarknetLock(makerAddress, true);
            const privateKey = makerConfig.privateKeys[makerAddress.toLowerCase()];
            const network = equals(chainId, 44) ? 'goerli-alpha' : 'mainnet-alpha';
            const starknet = new StarknetHelp(<any>network, privateKey, makerAddress);
            const taskList = await starknet.getTask();
            if (!taskList || !taskList.length) {
                accessLogger.log('There are no consumable tasks in the starknet queue');
                return { code: 1 };
            }
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
                if (task.createTime < new Date().valueOf() - expireTime) {
                    clearTaskList.push(task);
                    const formatDate = (timestamp: number) => {
                        return new Date(timestamp).toDateString() + " " + new Date(timestamp).toLocaleTimeString();
                    };
                    errorMsgList.push(`starknet_expire_time_limit ${formatDate(task.createTime)} < ${formatDate(new Date().valueOf() - expireTime)}, ownerAddress: ${task.params.ownerAddress}, value: ${task.signParam.amount}, fromChainID: ${task.params.fromChainID}`);
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
                if (limitWaringTime < new Date().valueOf() - waringInterval * 1000) {
                    const alert: string = `starknet_task_clear ${clearTaskList.map(item => item.params?.transactionID)}`;
                    doSms(alert);
                    telegramBot.sendMessage(alert).catch(error => {
                        accessLogger.error('send telegram message error', error);
                    });
                    limitWaringTime = new Date().valueOf();
                }
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
                            accessLogger.error('send telegram message error', error);
                        });
                        balanceWaringTime = new Date().valueOf();
                    }
                    return { code: 1 };
                }
            }

            const { nonce, rollback } = await starknet.takeOutNonce();
            // signParam: {recipient: toAddress,tokenAddress,amount: String(amountToSend)}
            const signParamList = queueList.map(item => item.signParam);
            // params: {makerAddress,toAddress,toChain,chainID,tokenInfo,tokenAddress,amountToSend,result_nonce,fromChainID,lpMemo,ownerAddress,transactionID}
            const paramsList = queueList.map(item => item.params);
            if (!queueList.length) {
                accessLogger.info('There are no consumable tasks in the starknet queue');
                return { code: 1 };
            }
            try {
                await starknet.clearTask(queueList, 0);
                accessLogger.info('starknet_sql_nonce =', nonce);
                accessLogger.info('starknet_consume_count =', queueList.length);
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
                if (error.message.indexOf('StarkNet Alpha throughput limit reached') !== -1) {
                    await starknet.pushTask(queueList);
                }
                await rollback(error, nonce);
                await sendTxConsumeHandle({
                    code: 1,
                    txid: 'starknet transfer error: ' + error.message,
                    result_nonce: nonce,
                    params: paramsList[0]
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

    new MJobPessimism('*/10 * * * * *', callback, batchTxSend.name).schedule();
    // new MJobPessimism(`0 */2 * * * *`, callback, batchTxSend.name).schedule();
  };
  const makerList = await getNewMarketList();
  const chainMakerList = makerList.filter(item => !!chainIdList.find(chainId => Number(item.toChain.id) === Number(chainId)));
  const makerDataList: { makerAddress: string, chainId: string, symbol: string }[] = [];
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
}

export async function watchHttpEndPoint() {
    const chainList = isDevelopment() ? ["goerli", "optimism_test", "arbitrum_test"] : ["mainnet", "arbitrum", "optimism", "polygon"];
    const dir: string = `../../logs/endPoint`;
    const createDir = () => {
        return new Promise(async (resolve) => {
            await fs.stat(path.join(__dirname, dir), async (err, data) => {
                if (err) {
                    await fs.mkdir(path.join(__dirname, dir), (err) => {
                        if (err && err.code === 'EEXIST') {
                            console.log("EEXIST");
                        }
                        resolve(1);
                    });
                } else {
                    resolve(1);
                }
            });
        });
    };
    if (!await createDir()) {
        return;
    }

    for (const chain of chainList) {
        if (makerConfig[chain] && makerConfig[chain]?.httpEndPoint && makerConfig[chain]?.httpEndPointInfura) {
            const dirFile: string = `${dir}/${chain}.json`;
            let data: { current?, httpEndPoint?, httpEndPointInfura? } = {};
            try {
                data = JSON.parse(fs.readFileSync(path.join(__dirname, dirFile)).toString()) || {};
            } catch (e) {
                data = { current: 2 };
            }
            data.httpEndPoint = makerConfig[chain]?.httpEndPoint;
            data.httpEndPointInfura = makerConfig[chain]?.httpEndPointInfura;
            fs.writeFileSync(path.join(__dirname, dirFile), JSON.stringify(data));
        }
    }


    const callback = async () => {
        for (const chain of chainList) {
            if (makerConfig[chain]?.httpEndPoint && makerConfig[chain]?.httpEndPointInfura) {
                const dirFile: string = `${dir}/${chain}.json`;
                let data: { current?, httpEndPoint?, httpEndPointInfura? } = JSON.parse(fs.readFileSync(path.join(__dirname, dirFile)).toString()) || {};
                if (data.current === 1 && makerConfig[chain]?.httpEndPointInfura !== data.httpEndPoint) {
                    makerConfig[chain].httpEndPointInfura = data.httpEndPoint;
                    accessLogger.log(`${chain} switch to httpEndPoint ${data.httpEndPoint}`);
                }
                if (data.current === 2 && makerConfig[chain]?.httpEndPointInfura !== data.httpEndPointInfura) {
                    makerConfig[chain].httpEndPointInfura = data.httpEndPointInfura;
                    accessLogger.log(`${chain} switch to httpEndPointInfura ${data.httpEndPointInfura}`);
                }
            }
        }
    };

    new MJobPessimism('*/10 * * * * *', callback, watchHttpEndPoint.name).schedule();
}