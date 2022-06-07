import log4js from 'log4js'

import { configure } from '../../../config/log'
log4js.configure(configure)
export default class logger {
  static debug(message: string, ...args: any) {
    console.debug(`${message}`, args)
  }
  static error(message: string, ...args: any) {
    log4js.getLogger('scanChainError').error(message, args)
  }
  static info(message: string, ...args: any) {
    log4js.getLogger('scanChainInfo').info(message, args)
  }
}
