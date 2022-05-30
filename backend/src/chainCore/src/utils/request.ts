import { stringify } from 'qs'
import axios from 'axios'
export async function HttpGet(url: string, params?: any) {
  if (params) {
    url = `${url}${url.includes('?')?'&':"?"}${stringify({
      ...params,
    })}`
  }
  const response = await axios.get(url, {
    timeout: 1000 * 30
  })
  console.debug(`request api debug：`, url)
  return response.data
}
export async function HttpPost() {}
