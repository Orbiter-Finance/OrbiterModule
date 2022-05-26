import log4js from 'log4js'

export default class logger {
  static debug(message: string, ...args:any) {
    log4js.getLogger('access').debug(`${message}`, args)
  }
  static error(message: string, ...args: any) {
    log4js.getLogger('scanChainError').error(message, args)
  }
  static info(message: string, ...args: any) {
    log4js.getLogger('scanChainInfo').info(message, args)
  }
}
