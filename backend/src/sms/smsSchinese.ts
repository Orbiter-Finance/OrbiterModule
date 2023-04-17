import axios from 'axios'
import { accessLogger } from '../util/logger'
import { telegramBot } from './telegram'
const { schinese } = require('./config')

/**
 * sendMessage
 * @param string
 * @returns boolean
 */

//function
export const doSms = async function (alert) {
  const { options } = schinese
  let smsText = alert

  const params = {
    Uid: options.Uid,
    Key: options.Key,
    smsMob: options.smsMob,
    smsText,
  }
  try {
    const rst = await axios.get(options.Endpoint, { params, timeout: 30000 })
    accessLogger.info({ params: JSON.stringify(params), result: rst.data })
  } catch (error) {
    accessLogger.error('send sms error', error);
  }
  return true
}
