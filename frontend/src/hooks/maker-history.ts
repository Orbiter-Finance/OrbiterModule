import { $env } from '@/env'
import { $axios } from '@/plugins/axios'
import { reactive, toRefs, ref } from 'vue'
import http from '@/plugins/axios2'


export async function useUnmatchedTradding(params: any) {
  const list: any = ref([])
  const loading = ref(false)
  const rangeDate = params.params || []
  if (rangeDate?.[0]) {
    params['startTime'] = rangeDate?.[0].getTime()
  }
  if (rangeDate?.[1]) {
    params['endTime'] = rangeDate?.[1].getTime()
  }
  try {
    loading.value = true
    const resp = await http.get('api/transaction/unmatch', {
      params: {
        ...params,
        rangeDate: null
      },
    })
    loading.value = false
    const data = resp.data || []
    // add hrefs
    for (const item of data) {
      item['txHashHref'] = ''
      if (item.hash && item.hash != '0x') {
        item['txHashHref'] = $env.txExploreUrl[item.chainId] + item.hash
      }
      item.toAmount = item.value
      item.amountFormat = item.value / Math.pow(10, 18)
      item.fromAddress = item.from
      item.target_tx = item.hash
      item.toAddress = item.to
      item.txHash = item.hash
      item.txTime = item.timestamp
      // status:0=PENDING,1=COMPLETE,2=REJECT,3=MatchFailed,4=refund
      // item.tx_status = item.status === 1 ? 'finalized' : 'rejected'
      item.tx_status = item.status === 2 ? 'rejected' : (item.status === 3 ? 'MatchFailed' : 'finalized')
      /* old: 
        amount: "131899000000000017"
        amountFormat: "0.131899000000000017"
        amount_flag: "17"
        chainId: 6
        chainName: "polygon"
        fromAddress: "0x80C67432656d59144cEFf962E8fAF8926599bCF8"
        makerAddress: "0x80C67432656d59144cEFf962E8fAF8926599bCF8"
        nonce: "28286"
        target_tx: "0xa7f56eb4b17e21a63887016e44d2393006a2e733ff6d271c3b75c3c2c61ba768"
        toAddress: "0xdaa072dbdcae920e50888e41790e48e4fb902b47"
        tokenAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
        txHash: "0xa7f56eb4b17e21a63887016e44d2393006a2e733ff6d271c3b75c3c2c61ba768"
        txHashHref: "https://polygonscan.com/tx/0xa7f56eb4b17e21a63887016e44d2393006a2e733ff6d271c3b75c3c2c61ba768"
        txTime: "2022-06-22T02:44:45.000Z"
        txTimeAgo: "2 minutes ago"
        tx_status: "finalized"
      */
    }
    list.value = data
  } catch (error) {
    console.error(error)
  }
  return {
    list,
    loading
  }
}

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
  target_tx: boolean
}[]
export function makerPulls() {
  const state = reactive({
    loading: false,
    list: [] as MakerPulls,
  })

  return {
    state: toRefs(state),

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
