import { $env } from '@/env'
import { $axios } from '@/plugins/axios'
import { reactive } from 'vue'

type MakerInfoChains = {
  chainId: string
  chainName: string
}[]
type MakerInfo = {
  chains: MakerInfoChains
  earliestTime: number
}
export const makerInfo = reactive({
  chains: [] as MakerInfoChains,
  earliestTime: 0,

  async get() {
    const resp = await $axios.get<MakerInfo>('maker')
    const data = resp.data

    // unshift All item
    data.chains.unshift({ chainId: '', chainName: 'All' })

    this.chains = data.chains
    this.earliestTime = data.earliestTime
  },
})

type MakerNodes = {
  id: number
  transactionID: string
  makerAddress: string
  userAddress: string
  fromChain: string
  fromChainName: string
  toChain: string
  toChainName: string
  formTx: string
  fromTxHref: string
  fromAmountFormat: string
  toAmountFormat: string
  toTx: string
  toTxHref: string
  fromTimeStamp: string
  fromTimeStampAgo: string
  toTimeStamp: string
  toTimeStampAgo: string
  state: number
  txTokenName: string
  needTo: any
}[]
export const makerNodes = reactive({
  loading: false,
  list: [] as MakerNodes,

  async get(
    makerAddress: string,
    fromChain: number = 0,
    rangeDate: Date[] = [],
    userAddress = ''
  ) {
    if (!makerAddress) {
      return
    }

    this.loading = true
    try {
      const params = { makerAddress, fromChain, userAddress }
      if (rangeDate?.[0]) {
        params['startTime'] = rangeDate?.[0].getTime()
      }
      if (rangeDate?.[1]) {
        params['endTime'] = rangeDate?.[1].getTime()
      }
      const resp = await $axios.get<MakerNodes>('maker/nodes', {
        params,
      })
      const list = resp.data

      // add hrefs
      for (const item of list) {
        item['makerAddressHref'] =
          $env.accountExploreUrl[item.fromChain] + item['makerAddress']
        item['userAddressHref'] =
          $env.accountExploreUrl[item.fromChain] + item['userAddress']

        item['fromTxHref'] = $env.txExploreUrl[item.fromChain] + item['formTx']

        item['toTxHref'] = ''
        if (item['toTx'] && item['toTx'] != '0x') {
          item['toTxHref'] = $env.txExploreUrl[item.toChain] + item['toTx']
        }
      }

      this.list = list
    } catch (error) {
      console.error(error)
    }
    this.loading = false
  },
})

type MakerWealths = {
  chainId: number
  chainName: string
  tokenExploreUrl: string
  balances: {
    makerAddress: string
    tokenAddress: string
    tokenName: string
    value: string
  }[]
}[]
export const makerWealth = reactive({
  loading: false,
  list: [] as MakerWealths,

  async get(makerAddress: string) {
    if (!makerAddress) {
      return
    }

    this.loading = true
    try {
      const resp = await $axios.get<MakerWealths>('maker/wealths', {
        params: { makerAddress },
      })
      const wealths = resp.data

      // fill chain's accountExploreUrl
      for (const item of wealths) {
        item['tokenExploreUrl'] = $env.tokenExploreUrl[item.chainId]
      }
      this.list = wealths
    } catch (error) {
      console.error(error)
    }
    this.loading = false
  },
})
