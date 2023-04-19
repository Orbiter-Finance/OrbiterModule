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
import { StarknetHelp } from "../service/starknet/helper";
import { getNewMarketList, repositoryMakerNode } from "../util/maker/new_maker";
import { sleep } from "../util";
import { sendTxConsumeHandle } from "../util/maker";
import { In } from "typeorm";
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

export async function batchTxSend(chainIdList = [4, 44]) {
  const makerSend = (makerAddress, chainId) => {
    const callback = async () => {
      if (Number(chainId) === 4 || Number(chainId) === 44) {
        const privateKey = makerConfig.privateKeys[makerAddress.toLowerCase()];
        const network = equals(chainId, 44) ? 'goerli-alpha' : 'mainnet-alpha';
        const starknet = new StarknetHelp(<any>network, privateKey, makerAddress);
        const taskList = await starknet.getTask();
        if (!taskList || !taskList.length) {
          accessLogger.info('There are no consumable tasks in the starknet queue');
          return;
        }
        const queueList: any[] = [];
        // TODO
        for (let i = 0; i < Math.min(taskList.length, 3); i++) {
          const task = taskList[i];
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
        const { nonce, rollback } = await starknet.takeOutNonce();
        const signParamList = queueList.map(item => item.signParam);
        const paramsList = queueList.map(item => item.params);
        await starknet.clearTask(queueList);
        try {
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
    };

    // TODO
    // new MJobPessimism('*/30 * * * * *', callback, batchTxSend.name).schedule();
    new MJobPessimism('0 */5 * * * *', callback, batchTxSend.name).schedule();
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
    makerSend(maker.makerAddress, maker.chainId);
  }
}