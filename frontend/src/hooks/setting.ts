import { $axios } from '@/plugins/axios'
import { ElNotification } from 'element-plus'
import { reactive } from 'vue'

type BalanceAlarms = {
  chainId: number
  chainName: string
  makerAddress: string
  baselines: {
    tokenAddress: string
    tokenName: string
    value: number
    balance?: string
  }[]
}[]
export const balanceAlarms = {
  state: reactive({
    loading: false,
    list: [] as BalanceAlarms,
    defaultBaseline: 0,
  }),

  async get(makerAddress: string) {
    if (!makerAddress) {
      return
    }

    balanceAlarms.state.loading = true
    try {
      const params = { makerAddress }
      const resp = await $axios.get<{
        list: BalanceAlarms
        defaultBaseline: number
      }>('setting/balance_alarms', {
        params,
      })
      const { list, defaultBaseline } = resp.data

      balanceAlarms.state.list = list
      balanceAlarms.state.defaultBaseline = defaultBaseline
    } catch (error) {
      console.error(error)
    }
    balanceAlarms.state.loading = false
  },

  async save(makerAddress: string) {
    if (!makerAddress) {
      return
    }

    balanceAlarms.state.loading = true
    try {
      const data = { makerAddress, value: balanceAlarms.state.list }
      await $axios.post<BalanceAlarms>('setting/balance_alarms/save', data)

      ElNotification({
        title: 'Success',
        message: 'Setting - BalanceAlarms saved.',
        type: 'success',
      })
    } catch (error) {
      console.error(error)
    }
    balanceAlarms.state.loading = false
  },
}

type DydxApiKeyCredentials = {
  [key: string]: {
    key: string
    secret: string
    passphrase: string
  }
}
export const dydxApiKeyCredentials = {
  state: reactive({
    loading: false,
    apiKeyCredentials: {} as DydxApiKeyCredentials,
  }),

  async save() {
    dydxApiKeyCredentials.state.loading = true
    try {
      const data = dydxApiKeyCredentials.state.apiKeyCredentials
      
      await $axios.post('setting/dydx_api_key_credentials', data)

      ElNotification({
        title: 'Success',
        message: 'Setting - DydxApiKeyCredentials saved.',
        type: 'success',
      })
    } catch (error) {
      console.error(error)
    }
    dydxApiKeyCredentials.state.loading = false
  },
}
