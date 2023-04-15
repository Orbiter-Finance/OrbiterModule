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
  if (process.env["TELEGRAM_TOKEN"]) {
    telegramBot.sendMessage(smsText).catch(error => {
      accessLogger.error('send telegram message error', error);
    })
  }
  const params = {
    Uid: options.Uid,
    Key: options.Key,
    smsMob: options.smsMob,
    smsText,
  }
  const rst = await axios.get(options.Endpoint, { params, timeout: 30000 })
  accessLogger.info({ params: JSON.stringify(params), result: rst.data })

  return true
}
