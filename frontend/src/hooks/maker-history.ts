import { $env } from '@/env'
import { $axios } from '@/plugins/axios'
import { reactive, toRefs } from 'vue'

type MakerPulls = {
  id: number
  makerAddress: string
  chainId: number
  chainName: string
  amountFormat: string
  txHash: string
  txHashHref: string
  txTimeAgo: string
  tx_status: string
}[]
export function makerPulls() {
  const state = reactive({
    loading: false,
    list: [] as MakerPulls,
  })

  return {
    ...toRefs(state),

    // fromOrToMaker 0: maker <<< to, 1: maker >>> from
    async get(makerAddress: string, fromOrToMaker = 0, rangeDate: Date[] = []) {
      if (!makerAddress) {
        return
      }

      state.loading = true
      try {
        const params = { makerAddress, fromOrToMaker }
        if (rangeDate?.[0]) {
          params['startTime'] = rangeDate?.[0].getTime()
        }
        if (rangeDate?.[1]) {
          params['endTime'] = rangeDate?.[1].getTime()
        }
        const resp = await $axios.get<MakerPulls>('maker/pulls', {
          params,
        })
        const list = resp.data

        // add hrefs
        for (const item of list) {
          item['txHashHref'] = ''
          if (item.txHash && item.txHash != '0x') {
            item['txHashHref'] = $env.txExploreUrl[item.chainId] + item.txHash
          }
        }

        state.list = list
      } catch (error) {
        console.error(error)
      }
      state.loading = false
    },
  }
}
