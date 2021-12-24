import { $env } from '@/env'
import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL:
    process.env.apiBaseURL || $env.apiBaseUrl || 'http://localhost:3002/',
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const $axios = axios.create(config)

$axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
$axios.interceptors.response.use(
  function (response) {
    const respData = response.data

    if (
      respData.data === undefined ||
      respData.errCode === undefined ||
      respData.errMessage === undefined
    ) {
      return Promise.reject(new Error('Invalid data!'))
    }

    if (respData.errCode != 0) {
      return Promise.reject(new Error(respData.errMessage))
    }

    return respData
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

export { $axios }
