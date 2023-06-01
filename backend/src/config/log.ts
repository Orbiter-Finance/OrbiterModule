import { Configuration } from 'log4js'
import path from 'path'

const logsDir = 'logs'
const defaultC = { appenders: ['access', 'console','logstash'], level: 'trace' }
const configure: Configuration = {
  appenders: {
    access: {
      type: 'dateFile',
      filename: path.resolve(logsDir, 'access.log'),
      pattern: '.dd',
      mode: 0o644
    },
    error: {
      type: 'dateFile',
      filename: path.resolve(logsDir, 'error.log'),
      pattern: '.dd',
      mode: 0o644
    },
    console: { type: 'console' },
    logstash: {
      type: "log4js-logstash-tcp",
      host: process.env.logstashHost,
      port: process.env.logstashPort,
      retry: {
        interval: 5000,   
        count: -1,
      },
    },
  },
  categories: {
    default: defaultC,
    access: defaultC,
    error: { appenders: ['error', 'console','logstash'], level: 'trace' },
  },
}

export { configure }
