import { Configuration } from 'log4js'
import path from 'path'

const logsDir = 'logs'
const defaultC = { appenders: ['access', 'console'], level: 'trace' }
const configure: Configuration = {
  appenders: {
    access: {
      type: 'dateFile',
      filename: path.resolve(logsDir, 'access.log'),
      pattern: '.dd',
      mode: 0o644,
    },
    error: {
      type: 'dateFile',
      filename: path.resolve(logsDir, 'error.log'),
      pattern: '.dd',
      mode: 0o644
    },
    console: { type: 'console' },
  },
  categories: {
    default: defaultC,
    access: defaultC,
    error: { appenders: ['error', 'console'], level: 'trace' },
  },
}

if (process.env.logstashHost) {
  configure.appenders['logstash'] = {
    type: "log4js-logstash-tcp",
    host: process.env.logstashHost || '127.0.0.1',
    port: Number(process.env.logstashPort) || 5044,
    retry: {
      interval: 5000,
      count: 1,
    },
  }
  configure.categories['access'].appenders.push("logstash");
}

export { configure }
