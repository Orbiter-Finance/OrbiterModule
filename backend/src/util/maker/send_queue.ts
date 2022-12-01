import dayjs from "dayjs"
import { sleep } from "orbiter-chaincore/src/utils/core"
import { doSms } from "../../sms/smsSchinese"
import { Core } from "../core"
import { accessLogger, errorLogger } from "../logger"

type SendQueueConsumer = (value: any) => Promise<unknown>
type SendQueueData = {
  value: any
  timestamp?: number
  callback?: (error: any, result: any) => void
}
const checkHealthByChain: {
  [key: string]: {
    smsInterval: number,
    lastSendSMSTime: number
  }
} = {};
const checkHealthAllChain = {
  smsInterval: 1000 * 30,
  lastSendSMSTime: 0
};
const lastConsumeTimeKey ='lastConsumeTime';
export class SendQueue {
  static TICKER_DURATION = 100
  private queues: {
    [key: string | number]: {
      datas: SendQueueData[]
      consumer?: SendQueueConsumer
    }
  }

  constructor() {
    this.queues = {}
    this.start()
    this.checkHealth((lastConsumeTime: number, timeout: number) => {
      if (Date.now() - checkHealthAllChain.lastSendSMSTime >= checkHealthAllChain.smsInterval) {
        checkHealthAllChain.lastSendSMSTime = Date.now();
        try {
          doSms(`Warning:From last consumption ${(timeout / 1000).toFixed(0)} seconds`)
        } catch (error) {
          errorLogger.error(
            `Warning:From last consumption doSMS error `,
            error
          )
        }
      }
    }, (chainId: number, timeout: number) => {
      const config = checkHealthByChain[chainId] || {
        smsInterval: 1000 * 30,
        lastSendSMSTime: 0
      };
      if (Date.now() - config.lastSendSMSTime >= config.smsInterval) {
        config.lastSendSMSTime = Date.now();
        doSms(`Warning:${chainId} Chain has not been processed for more than ${(timeout / 1000).toFixed(0)} seconds`);
      }
      checkHealthByChain[chainId] = config;
    });
  }
  public async checkHealth(cb1: any, cb2: any) {
    await sleep(1000 * 30);
    await Core.memoryCache.set(lastConsumeTimeKey, Date.now());
    setInterval(async () => {
      try {
        const lastConsumeTime = Number(await Core.memoryCache.get(lastConsumeTimeKey));
        Object.keys(this.queues).forEach((chainId) => {
          const request = this.queues[chainId];
          if (request.datas.length > 0) {
            const lastMsg = request.datas[request.datas.length - 1];
            const lastMsgTimestamp = Number(lastMsg.timestamp || 0);
            if (lastMsg && Date.now() - lastMsgTimestamp > 1000 * 60 * 2) {
              return cb2(chainId, Date.now() - lastMsgTimestamp);
            }
          }
        })
        if (Date.now() - lastConsumeTime > 1000 * 60 * 2) {
          return cb1(lastConsumeTime, Date.now() - lastConsumeTime);
        }
      } catch (error) {
        accessLogger.error('SendQueue checkHealth error', error);
      }
    }, 1000 * 10);
  }
  private async start() {
    while (true) {
      const ps = <Promise<unknown>[]>[]
      for (const key in this.queues) {
        if (!Object.prototype.hasOwnProperty.call(this.queues, key)) {
          continue
        }
        const item = this.queues[key]
        if (item.consumer) {
          const itemData = item.datas.pop()
          if (!itemData) {
            continue
          }
          const promise = async () => {
            try {
              await Core.memoryCache.set(lastConsumeTimeKey, Date.now());
              let result: any = undefined
              if (item.consumer) {
                result = await item.consumer(itemData.value)
              }
              itemData.callback && itemData.callback(undefined, result)
            } catch (error) {
              itemData.callback && itemData.callback(error, undefined)
            } finally {
              await Core.memoryCache.set(lastConsumeTimeKey, Date.now());
            }
          }
          ps.push(promise())
        }
      }

      await Promise.all(ps)

      await this.sleep()
    }
  }

  private sleep(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), SendQueue.TICKER_DURATION)
    })
  }

  private initQueuesKey(key: string | number) {
    if (!this.queues[key]) {
      this.queues[key] = { datas: [] }
    }
  }

  produce(key: string | number, data: SendQueueData) {
    this.initQueuesKey(key)
    data.timestamp = Date.now();
    this.queues[key].datas.unshift(data)
  }

  registerConsumer(key: string | number, consumer: SendQueueConsumer) {
    this.initQueuesKey(key)
    this.queues[key]['consumer'] = consumer
  }
}
