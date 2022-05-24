import { accessLogger, errorLogger } from '../../../src/util/logger'
export default class logger {
  static debug(message: string, ...args:any) {
    console.debug(`${message}`, args)
  }
  static error(message: string, ...args: any) {
    errorLogger.error(message, args)
  }
  static info(message: string, ...args: any) {
    accessLogger.info(message, args)
  }
}
