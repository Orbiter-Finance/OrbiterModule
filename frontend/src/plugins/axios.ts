import { $env } from '@/env'
import axios from 'axios'
import { ElNotification } from 'element-plus'


const config = {
  baseURL:
    process.env.apiBaseURL || $env.apiBaseUrl || 'http://localhost:3002/',
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

    if (respData.errCode === undefined || respData.errMessage === undefined) {
      return Promise.reject(new Error('Invalid data!'))
    }

    if (respData.errCode != 0) {
      return Promise.reject(new Error(respData.errMessage))
    }

    return respData
  },
  function (error) {
    ElNotification({
      title: 'Error',
      message: `Fail: ${error.message}`,
      type: 'error',
    })

    // Do something with response error
    return Promise.reject(error)
  }
)

export { $axios }
