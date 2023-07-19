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
import { equals,isEmpty } from "orbiter-chaincore/src/utils/core";
import { setStarknetLock, StarknetHelp, starknetLockMap } from "../service/starknet/helper";
import { getNewMarketList, repositoryMakerNode } from "../util/maker/new_maker";
import { readLogJson, sleep, writeLogJson } from "../util";
import { sendTxConsumeHandle } from "../util/maker";
import { In } from "typeorm";
import { getStarknetTokenBalance } from "../service/maker_wealth";
import BigNumber from "bignumber.js";
import { telegramBot } from "../sms/telegram";
import { doSms } from "../sms/smsSchinese";
import { clearInterval } from "timers";
import { EVMAccount } from "../service/evmAccount";
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

export let alarmMsgMap = {};
let balanceWaringTime = 0;
// Alarm interval duration(second)
let waringInterval = 180;
// Execute several transactions at once
let execTaskCount = 50;
// Maximum number of transactions to be stacked in the memory pool
let maxTaskCount: number = 200;
let expireTime: number = 30 * 60;
let maxTryCount: number = 180;
let cron;

export async function batchTxSend() {
  const allChains = chains.getAllChains();
  const chainIdList = [
    ...allChains.filter(item => item?.router && Object.values(item.router).includes("OrbiterRouterV3")).map(item => +item.internalId),
    44, 4
  ];
  console.log('batch tx send list', chainIdList);
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
                accessLogger.error(`send telegram message error ${error.stack}`);
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
            accessLogger.error(`starknet sequencer error: ${nonce} != ${nonce1}, ${nonce} != ${nonce2}`);
            await starknet.pushTask(queueList);
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

    new MJobPessimism('*/15 * * * * *', callback, batchTxSend.name).schedule();
    // new MJobPessimism(`0 */2 * * * *`, callback, batchTxSend.name).schedule();
  };
  const makerList = await getNewMarketList();
  const chainMakerList = makerList.filter(item => !!chainIdList.find(chainId => Number(item.toChain.id) === Number(chainId)));
  const makerDataList: { makerAddress: string, chainId: string, symbol: string, tokenAddress: string }[] = [];
  for (const data of chainMakerList) {
    if (makerDataList.find(item => item.chainId === data.toChain.id && item.symbol === data.toChain.symbol)) {
      continue;
    }

    makerDataList.push({ makerAddress: data.sender, chainId: data.toChain.id, symbol: data.toChain.symbol, tokenAddress: data.toChain.tokenAddress });
  }
  accessLogger.info(`Preparing to execute a timed task ${JSON.stringify(makerDataList)}`);
  // Prevent the existence of unlinked transactions before the restart and the existence of nonce occupancy
  // await sleep(20000);
  for (let i = 0; i < makerDataList.length; i++) {
    try {
      const maker = makerDataList[i];
      const chainId = maker.chainId;
      const chainConfig: any = chains.getChainByInternalId(String(chainId));
      if (Number(chainId) === 4 || Number(chainId) === 44) {
        makerSend(maker.makerAddress, maker.chainId);
      } else if (chainConfig?.router && Object.values(chainConfig.router).includes("OrbiterRouterV3")) {
        startEVMJob(chainId, maker.makerAddress.toLowerCase(), maker.tokenAddress)
      }
      await sleep(2000);
    } catch (e) {
      errorLogger.error('job =====', e);
    }
  }

  watchStarknetAlarm();
}
export async function startEVMJob(chainId: string, makerAddr: string, tokenAddress: string) {
  if (!isEmpty(makerConfig.privateKeys[makerAddr])) {
    const privateKey = makerConfig.privateKeys[makerAddr];
    const evmAccount = new EVMAccount(Number(chainId), tokenAddress, privateKey);
    await evmAccount.startJob();
  } else {
    const timerId = setTimeout(() => {
      startEVMJob(chainId, makerAddr, tokenAddress);
      clearTimeout(timerId);
    }, 5000);
  }
}
export async function watchHttpEndPoint() {
  const chainList = ["mainnet", "arbitrum", "optimism", "polygon"];

  for (const chain of chainList) {
    if (makerConfig[chain] && makerConfig[chain]?.httpEndPoint && makerConfig[chain]?.httpEndPointInfura) {
      const data: { current?, httpEndPoint?, httpEndPointInfura?} = await readLogJson(`${chain}.json`, 'endPoint', { current: 2 });
      data.httpEndPoint = makerConfig[chain]?.httpEndPoint;
      data.httpEndPointInfura = makerConfig[chain]?.httpEndPointInfura;
      await writeLogJson(`${chain}.json`, 'endPoint', data);
    }
  }

  const callback = async () => {
    for (const chain of chainList) {
      if (makerConfig[chain]?.httpEndPoint && makerConfig[chain]?.httpEndPointInfura) {
        const data: { current?, httpEndPoint?, httpEndPointInfura?} = await readLogJson(`${chain}.json`, 'endPoint', { current: 2 });
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

export async function watchStarknetLimit() {
  const callback = async () => {
    const data: { waringInterval: number, execTaskCount: number, maxTaskCount: number, expireTime: number, maxTryCount: number } =
      await readLogJson(`limit.json`, 'starknetTx/limit', {
        waringInterval, execTaskCount, maxTaskCount, expireTime, maxTryCount
      });
    if (waringInterval !== data.waringInterval) {
      waringInterval = data.waringInterval;
      watchStarknetAlarm();
      accessLogger.log(`waringInterval change to ${waringInterval}s`);
    }
    if (execTaskCount !== data.execTaskCount) {
      execTaskCount = data.execTaskCount;
      accessLogger.log(`execTaskCount change to ${execTaskCount}`);
    }
    if (maxTaskCount !== data.maxTaskCount) {
      maxTaskCount = data.maxTaskCount;
      accessLogger.log(`maxTaskCount change to ${maxTaskCount}`);
    }
    if (expireTime !== data.expireTime) {
      expireTime = data.expireTime;
      accessLogger.log(`expireTime change to ${expireTime}s`);
    }
    if (maxTryCount !== data.maxTryCount) {
      maxTryCount = data.maxTryCount;
      accessLogger.log(`maxTryCount change to ${maxTryCount}`);
    }
  };

  new MJobPessimism('*/30 * * * * *', callback, watchStarknetLimit.name).schedule();
}

function watchStarknetAlarm() {
  if (cron) {
    clearInterval(cron);
  }
  cron = setInterval(() => {
    for (const key in alarmMsgMap) {
      telegramBot.sendMessage(`${key} ${(<string[]>alarmMsgMap[key]).join(',')}`).catch(error => {
        accessLogger.error(`send telegram message error ${error.stack}`);
      });
      doSms(`${key} count ${alarmMsgMap[key].length}`);
      delete alarmMsgMap[key];
    }
  }, waringInterval * 1000);
}

export async function watchLogs() {
  watchHttpEndPoint();
  watchStarknetLimit();
}
