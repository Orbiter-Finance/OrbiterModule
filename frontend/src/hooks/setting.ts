import { $axios } from '@/plugins/axios'
import { reactive } from 'vue'

type BalanceAlarms = {
  chainId: number
  chainName: string
  makerAddress: string
  baselines: {
    tokenAddress: string
    tokenName: string
    value: number
  }[]
}[]
export const balanceAlarms = {
  state: reactive({
    loading: false,
    list: [] as BalanceAlarms,
  }),

  async get(makerAddress: string) {
    if (!makerAddress) {
      return
    }

    balanceAlarms.state.loading = true
    try {
      const params = { makerAddress }
      const resp = await $axios.get<BalanceAlarms>('setting/balance_alarms', {
        params,
      })
      const list = resp.data

      balanceAlarms.state.list = list
    } catch (error) {
      console.error(error)
    }
    balanceAlarms.state.loading = false
  },
}
