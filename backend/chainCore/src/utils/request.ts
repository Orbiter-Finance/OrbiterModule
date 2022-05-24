import axios from 'axios'
export async function HttpGet(url: string, params?: any) {
  const response = await axios.get(url, {
    params,
  })
  return response.data
}
export async function HttpPost() {}
