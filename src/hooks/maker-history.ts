import { $env } from '@/env'
import { reactive, toRefs, ref } from 'vue'
import http from '@/plugins/axios'


export async function useUnmatchedTradding(params: any) {
  const list: any = ref([])
  const loading = ref(false)
  const rangeDate = params.rangeDate || []
  if (rangeDate?.[0]) {
    params['startTime'] = rangeDate?.[0].getTime()
  }
  if (rangeDate?.[1]) {
    params['endTime'] = rangeDate?.[1].getTime()
  }
  try {
    loading.value = true
    const resp = await http.get('/v1/dashboard/unmatch', {
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
      // item.amountFormat = item.value // / Math.pow(10, 18)
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
