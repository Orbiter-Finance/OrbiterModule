import log4js from 'log4js'
import { LoggerService } from 'orbiter-chaincore/src/utils'
import { logConfig } from '../config'

log4js.configure(logConfig.configure)

const accessLogger = log4js.getLogger('access')
const errorLogger = log4js.getLogger('error')

export { accessLogger, errorLogger }

export function createLogger(key: string) {
    const logger = LoggerService.getLogger(key, {
        key
    });
    return logger;
}