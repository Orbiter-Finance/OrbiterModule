import {AxiosError, AxiosResponse} from 'axios'
/**
 *
 * @param {number} withDigits with how many digits the random id should be
 * @returns {string} random id with time and digits
 */
export function getRandomIdByTime(withDigits = 5) {
  const timeString = Date.now().toString()
  let lastString = ''
  for (let i = 0; i < withDigits; i++) {
    lastString += Math.floor(Math.random() * 10).toString()
  }
  return timeString + lastString
}

/**
 * 
 * @param {AxiosError} error AxiosError
 * @param {string} field field in error.response.data
 * @returns {string} message in error.response.data[field] or error.message
 */
export function extractMessageInAxiosError(error: AxiosError, field?: string) {
  const { response } = error
  const { data } = response as AxiosResponse
  if (field) return data[field] || error.message
  const { message, description } = data
  return message || description || error.message
}
