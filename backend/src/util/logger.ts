import log4js from 'log4js'
// import { LoggerService } from 'orbiter-chaincore/src/utils'
import { logConfig } from '../config'
import { LoggerService } from './LoggerService'

log4js.configure(logConfig.configure)

const accessLogger = log4js.getLogger('access')
const errorLogger = log4js.getLogger('error')
export { accessLogger, errorLogger }
export function getLoggerService(key: string) {
    const logger = LoggerService.getLogger(String(key));
    // Compatible with previous methods
    return {
        error(message: string, ...args: any) {
            accessLogger.error(message, ...args);
            logger.error(`${message} - ${args.join(' ')}`);
        },
        info(message: string, ...args: any) {
            accessLogger.info(message, ...args);
            logger.info(`${message} - ${args.join(' ')}`);
        }
    };
}