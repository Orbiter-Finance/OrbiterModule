import dayjs from 'dayjs'
import logger from '../utils/logger'
import schedule from 'node-schedule'
export const IntervalTimerDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>
) => {
  try {
    const methods: Function = descriptor.value

    descriptor.value = async function () {
      let execTime = Date.now()
      let isLock = false
      const that = this
      const intervalSeconds =
        (that.chain.chainConfig && that.chain.chainConfig.api.intervalTime) ||
        1000 * 4
      setInterval(async () => {
        if (Date.now() - execTime > intervalSeconds && !isLock) {
          try {
            that.chain.chainConfig.debug &&
              console.debug(
                `Api Scan ${process.pid}:【${this.chain.chainConfig.name}】`
              )
            isLock = true
            await methods.call(this, ...arguments)
          } catch (error) {
            logger.error(
              `[${this.chain.chainConfig.name}] Scan Chain API Timer execution exception：${error.message}`
            )
          } finally {
            isLock = false
            execTime = Date.now()
          }
        }
      }, 1000)
    }
  } catch (error) {
    logger.error('Scan Block IntervalTimerDecorator Error:', error.message)
  }
}
