import * as winstonX from 'orbiter-chaincore/src/packages/winstonX';
import path from 'path';
export class LoggerService {
  static services: { [key: string]: any } = {};
  static createLogger(key: string, opts?: winstonX.WinstonXOptions) {
    let logDir = path.join(process.env.logDir || process.cwd(), 'maker');
    if (key) {
      logDir = path.join(logDir, String(key));
    }
    opts = Object.assign({
      logDir,
      label: key,
      debug: true,
      telegram: {
        token: process.env["TELEGRAM_TOKEN"],
        chatId: process.env["TELEGRAM_CHATID"]
      }
    }, opts)
    const logger = winstonX.createLogger(opts);
    LoggerService.services[key] = logger;
    return logger;
  }
  static getLogger(key: string, opts?: winstonX.WinstonXOptions): winstonX.LoggerType {
    return (
      LoggerService.services[key] ||
      LoggerService.createLogger(key, opts)
    );
  }
}