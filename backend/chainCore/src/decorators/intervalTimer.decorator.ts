import logger from '../utils/logger'

export const IntervalTimerDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>
) => {
  const methods: Function = descriptor.value
  let execTime = Date.now()
  let isLock = false
  descriptor.value = function () {
    const intervalSeconds = (this.chain.chainConfig && this.chain.chainConfig.api.intervalTime || 1000 * 5)
    const timer = setInterval(async () => {
      if (Date.now() - execTime > intervalSeconds && !isLock) {
        try {
          isLock = true
          await methods.call(this, ...arguments, (isFinish: boolean) => {
            if (isFinish) clearInterval(timer)
          })
        } catch (error) {
          console.log(error)
          logger.error(
            `[${ this.chain.chainConfig.name}] Scan Chain API Timer execution exception：${error.message}`
          )
        } finally {
          execTime = Date.now()
          isLock = false
        }
      }
    }, 1000)
  }
}
