
type SendQueueConsumer = (value: any) => Promise<unknown>
type SendQueueData = {
  value: any
  callback?: (error: any, result: any) => void
}

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
    this.queues[key].datas.unshift(data)
  }

  registerConsumer(key: string | number, consumer: SendQueueConsumer) {
    this.initQueuesKey(key)
    this.queues[key]['consumer'] = consumer
  }
}
