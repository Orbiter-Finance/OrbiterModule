export interface IObservers {
  id: string
  topic: string
  callback: Function
  once: boolean
}
export class PubSub {
  private pubsubId: number = -1
  private topics: Map<string, Array<IObservers>> = new Map()
  subscribe(
    topic: string,
    callback: Function,
    once: boolean = false
  ): IObservers {
    if (typeof callback !== 'function') {
      throw new TypeError(
        'When subscribing for an event, a callback function must be defined.'
      )
    }

    const obServer: IObservers = {
      topic,
      id: String((this.pubsubId += 1)),
      callback,
      once,
    }
    if (this.topics.has(topic)) {
      this.topics.get(topic)?.push(obServer)
    } else {
      this.topics.set(topic, [obServer])
    }
    return obServer
  }
  subscribeOnce(topic: string, callback: Function) {
    return this.subscribe(topic, callback, true)
  }
  publish(topic: string, ...data: Array<any>) {
    if (!this.topics.has(topic)) {
      return false
    }
    const topicObs = this.topics.get(topic)
    if (!topicObs || topicObs.length <= 0) {
      return false
    }
    topicObs.forEach((ob: IObservers) => {
      ob.callback(data, { topic, id: ob.id })
      if (ob.once) {
        // cancel
        this.unSubscribe(ob.id)
      }
    })
    return true
  }
  unSubscribe(id: string) {
    this.topics.forEach((obs: Array<IObservers>, topic: string) => {
      obs.forEach((ob: IObservers, index: number) => {
        if (id === ob.id) {
          obs.splice(index, 1)
        }
      })
      if (obs.length <= 0) {
        this.topics.delete(topic)
      }
    })
    return false
  }
}
const PubSubMQ = new PubSub();
export default PubSubMQ;
