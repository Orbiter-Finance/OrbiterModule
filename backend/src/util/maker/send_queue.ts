import { sleep } from "orbiter-chaincore/src/utils/core"
import { accessLogger } from "../logger"

type SendQueueConsumer = (value: any) => Promise<unknown>
type SendQueueData = {
  value: any
  timestamp?: number
  callback?: (error: any, result: any) => void
}
export class SendQueue {
  static TICKER_DURATION = 100
  static LastConsumeTime = Date.now();
  private queues: {
    [key: string | number]: {
      datas: SendQueueData[]
      consumer?: SendQueueConsumer
    }
  }

  constructor() {
    this.queues = {}
    this.start()
  }
  public async checkHealth(cb1: any, cb2: any) {
    await sleep(1000 * 30);
    setInterval(() => {
      try {
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
        if (Date.now() - SendQueue.LastConsumeTime > 1000 * 60 * 2) {
          return cb1(Date.now() - SendQueue.LastConsumeTime);
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
              SendQueue.LastConsumeTime = Date.now();
              let result: any = undefined
              if (item.consumer) {
                result = await item.consumer(itemData.value)
              }
              itemData.callback && itemData.callback(undefined, result)
            } catch (error) {
              itemData.callback && itemData.callback(error, undefined)
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
