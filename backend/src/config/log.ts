import { Configuration } from 'log4js'
import path from 'path'

const logsDir = 'logs'
const defaultC = { appenders: ['access', 'console'], level: 'trace' }
const configure: Configuration = {
  appenders: {
    scanChainInfo:{
      type: 'dateFile',
      filename: path.resolve(logsDir, 'scanChain.info.log'),
      pattern: '.dd',
      mode: 0o644
    },
    scanChainError: {
      type: 'dateFile',
      filename: path.resolve(logsDir, 'scanChain.error.log'),
      pattern: '.dd',
      mode: 0o644
    },
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
  },
  categories: {
    default: defaultC,
    access: defaultC,
    scanChainInfo: { appenders: ['scanChainInfo'], level: 'trace' },
    scanChainError:  { appenders: ['scanChainError', 'console'], level: 'trace' },
    error: { appenders: ['error', 'console'], level: 'trace' },
  },
}

export { configure }
