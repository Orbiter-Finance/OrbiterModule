import log4js, { Logger } from 'log4js'
import { logConfig } from '../config'
log4js.configure(logConfig.configure)
console = new Proxy(console, {
  get: function (target, prop) {
    if (prop === 'error') {
      return function (msg) {
        const isConnectionFailed =
          typeof msg === 'string' &&
          msg &&
          msg.includes('logstash Error with the connection')
        if (isConnectionFailed) {
          return
        }
        console.log('Error: ' + msg)
      }
    }
    return target[prop]
  },
})
export class LoggerService {
  private static loggers: Map<string, LoggerService> = new Map()
  private logger: Logger
  private keys: string[] = []
  constructor(...keys: string[]) {
    this.logger = log4js.getLogger()
    this.logger.addContext(
      'service',
      process.env['SERVICE'] || 'Orbiter Module'
    )
    if (keys.length) {
      this.keys = keys
      this.logger.addContext('key', this.keys.join(', '))
    }
  }
  static getLogger(...keys: string[]) {
    return new LoggerService(...keys)
  }
  appendKeys(...keys: string[]) {
    if (keys.length) {
      const oldKeys = [...this.keys]
      this.keys = [...new Set(this.keys.concat(keys))]
      this.logger.addContext('key', this.keys.join(', '))
      this.logger.debug(
        `Change key./n before: ${oldKeys.join(', ')} /n after: ${this.keys.join(
          ', '
        )}`
      )
    }
  }
  addKeyword(fieldName: string, value: any) {
    this.logger.addContext(fieldName, value)
  }
  log(level: string, ...args: any[]) {
    this.logger.log(level, ...args)
  }
  error(message: any, ...args: any[]) {
    this.logger.error(message, ...args)
  }
  info(message: any, ...args: any[]) {
    this.logger.log(message, ...args)
  }
  trace(message: any, ...args: any[]) {
    this.logger.trace(message, ...args)
  }
  debug(message: any, ...args: any[]) {
    this.logger.debug(message, ...args)
  }
  warn(message: any, ...args: any[]) {
    this.logger.warn(message, ...args)
  }
  fatal(message: any, ...args: any[]) {
    this.logger.fatal(message, ...args)
  }
  mark(message: any, ...args: any[]) {
    this.logger.mark(message, ...args)
  }
}
const accessLogger = new LoggerService('access')
const errorLogger = new LoggerService('error')
export function getLoggerService(key: string) {
  // const logger = LoggerService.getLogger(`${key}-`, {
  //     dir: `logs/${key}/`
  // });
  // Compatible with previous methods
  return {
    error(message: string, ...args: any) {
      // logger.error(`${message} - ${args.join(' ')}`);
      accessLogger.error(message, ...args)
    },
    info(message: string, ...args: any) {
      // logger.info(`${message} - ${args.join(' ')}`);
      accessLogger.info(message, ...args)
    },
  }
}
export { accessLogger, errorLogger }
