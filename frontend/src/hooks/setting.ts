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
