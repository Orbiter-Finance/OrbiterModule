import log4js from 'log4js'
import { logConfig } from '../config'

log4js.configure(logConfig.configure)

const accessLogger = log4js.getLogger('access')
const errorLogger = log4js.getLogger('error')

export { accessLogger, errorLogger }
