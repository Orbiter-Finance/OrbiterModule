import axios from 'axios'
import { accessLogger } from '../util/logger'
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
  const rst = await axios.get(options.Endpoint, { params })
  accessLogger.info({ params: JSON.stringify(params), result: rst.data })

  return true
}
