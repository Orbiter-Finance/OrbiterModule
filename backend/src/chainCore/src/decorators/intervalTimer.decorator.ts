import logger from '../utils/logger'
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
      const config = that.chain.chainConfig ;
      const intervalSeconds =
        (config.api.intervalTime) ||
        1000 * 4
      setInterval(async () => {
        // config.debug && console.debug(`[${config.name}] time:${Date.now() - execTime},intervalSeconds:${intervalSeconds}, isLock:${isLock}`)
        if (Date.now() - execTime > intervalSeconds && !isLock) {
          try {
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
