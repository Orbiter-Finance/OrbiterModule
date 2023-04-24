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
import { setStarknetLock, StarknetHelp, starknetLock } from "../service/starknet/helper";
import { getNewMarketList, repositoryMakerNode } from "../util/maker/new_maker";
import { sleep } from "../util";
import { sendTxConsumeHandle } from "../util/maker";
import { In } from "typeorm";
import { Mutex } from "async-mutex";
import { getTokenBalance } from "../service/maker_wealth";
import BigNumber from "bignumber.js";
import { telegramBot } from "../sms/telegram";
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

const mutexMap = new Map<string, Mutex>();
let limitWaringTime = new Date().valueOf();
let balanceWaringTime = new Date().valueOf();
// TODO
// Alarm interval duration(second)
const waringInterval = 30;

export async function batchTxSend(chainIdList = [4, 44]) {
  const makerSend = (makerAddress, chainId) => {
    const callback = async () => {
      const mutex = mutexMap.get(`${makerAddress}_${chainId}_mutex`);
      if (await mutex.isLocked()) {
        accessLogger.info(`${makerAddress}_${chainId} is lock, waiting for the end of the previous transaction`);
      }
      await mutex.runExclusive(async () => {
        accessLogger.info(`=========== batch tx cron start ===========`);
        if (Number(chainId) === 4 || Number(chainId) === 44) {
          if (starknetLock) {
            accessLogger.info('Starknet is lock, waiting for the end of the previous transaction');
            return;
          }
          const privateKey = makerConfig.privateKeys[makerAddress.toLowerCase()];
          const network = equals(chainId, 44) ? 'goerli-alpha' : 'mainnet-alpha';
          const starknet = new StarknetHelp(<any>network, privateKey, makerAddress);
          const taskList = await starknet.getTask();
          if (!taskList || !taskList.length) {
            accessLogger.info('There are no consumable tasks in the starknet queue');
            return;
          }
          // TODO
          const maxTaskCount: number = 5;
          const expireTime: number = 5 * 60 * 1000;
          const maxTryCount: number = 5;
          // Exceeded limit, clear task
          const clearTaskList = [];
          // Meet the limit, execute the task
          const execTaskList = [];
          for (let i = 0; i < taskList.length; i++) {
            const task = taskList[i];
            // max length limit
            if (i < taskList.length - maxTaskCount) {
              clearTaskList.push(task);
              accessLogger.error(`starknet_max_count_limit ${taskList.length}`);
              // TODO test
              telegramBot.sendMessage(`starknet_max_count_limit ${taskList.length}, value: ${task.signParam.amount}`).catch(error => {
                accessLogger.error('send telegram message error', error);
              })
              continue;
            }
            // expire time limit
            if (task.createTime < new Date().valueOf() - expireTime) {
              clearTaskList.push(task);
              accessLogger.error(`starknet_expire_time_limit ${new Date(task.createTime)} ${task}`);
              // TODO test
              telegramBot.sendMessage(`starknet_expire_time_limit ${new Date(task.createTime)}, value: ${task.signParam.amount}`).catch(error => {
                accessLogger.error('send telegram message error', error);
              })
              continue;
            }
            // retry count limit
            if (task.count > maxTryCount) {
              clearTaskList.push(task);
              accessLogger.error(`starknet_retry_count_limit ${task.count}`);
              // TODO test
              telegramBot.sendMessage(`starknet_retry_count_limit ${task.count}, value: ${task.signParam.amount}`).catch(error => {
                accessLogger.error('send telegram message error', error);
              })
              continue;
            }
            execTaskList.push(task);
          }
          if (clearTaskList.length) {
            accessLogger.error(`starknet_task_clear ${clearTaskList.length}`);
            if (limitWaringTime < new Date().valueOf() - waringInterval * 1000) {
              // TODO sms
              telegramBot.sendMessage(`starknet_task_clear ${clearTaskList.length}`).catch(error => {
                accessLogger.error('send telegram message error', error);
              });
              limitWaringTime = new Date().valueOf();
            }
            await starknet.clearTask(clearTaskList);
          }

          const queueList: any[] = [];
          // TODO
          for (let i = 0; i < Math.min(execTaskList.length, 3); i++) {
            const task = execTaskList[i];
            // Database filtering
            const makerNodeCount: number = await repositoryMakerNode().count(<any>{
              transactionID: task.params?.transactionID, state: In([1, 20])
            });
            if (!makerNodeCount) {
              accessLogger.error(`Transaction cannot be sent ${JSON.stringify(task)}`);
              await starknet.clearTask([task]);
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
              return;
            }
            // Maker balance judgment
            const makerBalance: string | number = (await getTokenBalance(
                makerAddress,
                chainId,
                equals(chainId, 44) ? 'starknet_test' : 'starknet',
                tokenAddress,
                market.toChain.symbol
            )) || 0;
            const needPay: BigNumber = tokenPay[tokenAddress];
            // Insufficient Balance
            if (needPay.comparedTo(makerBalance)) {
              accessLogger.error(`${makerAddress} maker starknet insufficient Balance`);
              if (balanceWaringTime < new Date().valueOf() - waringInterval * 1000) {
                // TODO sms
                telegramBot.sendMessage(`${makerAddress} maker starknet insufficient Balance, ${needPay} > ${makerBalance}`).catch(error => {
                  accessLogger.error('send telegram message error', error);
                });
                balanceWaringTime = new Date().valueOf();
              }
              return;
            }
          }

          const { nonce, rollback } = await starknet.takeOutNonce();
          // signParam: {recipient: toAddress,tokenAddress,amount: String(amountToSend)}
          const signParamList = queueList.map(item => item.signParam);
          // params: {makerAddress,toAddress,toChain,chainID,tokenInfo,tokenAddress,amountToSend,result_nonce,fromChainID,lpMemo,ownerAddress,transactionID}
          const paramsList = queueList.map(item => item.params);
          await starknet.clearTask(queueList);
          try {
            setStarknetLock(true);
            accessLogger.info('starknet_sql_nonce =', nonce);
            accessLogger.info('starknet_consume_count =', queueList.length);
            const { hash }: any = await starknet.signMutiTransfer(signParamList, nonce);
            await sleep(1000 * 10);
            await sendTxConsumeHandle({
              code: 3,
              txid: hash,
              rollback,
              params: paramsList[0],
              paramsList
            });
          } catch (error) {
            accessLogger.info(`starknet transfer restore: ${queueList.length}`);
            await starknet.pushTask(queueList);
            await rollback(error, nonce);
            await sleep(1000 * 2);
            await sendTxConsumeHandle({
              code: 1,
              txid: 'starknet transfer error: ' + error.message,
              result_nonce: nonce,
              params: paramsList[0]
            });
          }
        }
      });
    };

    // TODO
    // new MJobPessimism('*/30 * * * * *', callback, batchTxSend.name).schedule();
    new MJobPessimism('0 */1 * * * *', callback, batchTxSend.name).schedule();
  };
  const makerList = await getNewMarketList();
  const chainMakerList = makerList.filter(item => !!chainIdList.find(chainId => Number(item.toChain.id) === Number(chainId)));
  // const makerAddressList = Array.from(new Set(starknetMakerList.map(item => item.sender)));
  const makerDataList: { makerAddress: string, chainId: string }[] = [];
  for (const data of chainMakerList) {
    if (makerDataList.find(item => item.chainId === data.toChain.id)) {
      continue;
    }
    makerDataList.push({ makerAddress: data.sender, chainId: data.toChain.id });
  }
  for (const maker of makerDataList) {
    const mutex = new Mutex();
    mutexMap.set(`${maker.makerAddress}_${maker.chainId}_mutex`, mutex);
    makerSend(maker.makerAddress, maker.chainId);
  }
}