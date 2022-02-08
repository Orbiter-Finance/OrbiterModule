import { $env } from '@/env'
import { $axios } from '@/plugins/axios'
import { reactive, ref } from 'vue'

type MakerInfoChains = {
  chainId: string
  chainName: string
}[]
type MakerInfo = {
  chains: MakerInfoChains
  earliestTime: number
}
export const makerInfo = {
  state: reactive({
    chains: [] as MakerInfoChains,
    earliestTime: 0,
  }),

  async get() {
    const resp = await $axios.get<MakerInfo>('maker')
    const data = resp.data

    // unshift All item
    data.chains.unshift({ chainId: '', chainName: 'All' })

    makerInfo.state.chains = data.chains
    makerInfo.state.earliestTime = data.earliestTime
  },
}

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
  tradeDuration: number
  state: number
  txTokenName: string
  needTo: any
  profitUSD: string
}[]
export const makerNodes = {
  state: reactive({
    loading: false,
    list: [] as MakerNodes,
  }),

  async get(
    makerAddress: string,
    fromChain: number = 0,
    toChain: number = 0,
    rangeDate: Date[] = [],
    userAddress = ''
  ) {
    if (!makerAddress) {
      return
    }

    makerNodes.state.loading = true
    try {
      const params = { makerAddress, fromChain, toChain, userAddress }
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
          $env.accountExploreUrl[item.toChain] + item['userAddress']

        item['fromTxHref'] = $env.txExploreUrl[item.fromChain] + item['formTx']

        item['toTxHref'] = ''
        if (item['toTx'] && item['toTx'] != '0x') {
          item['toTxHref'] = $env.txExploreUrl[item.toChain] + item['toTx']
        }
      }

      makerNodes.state.list = list
    } catch (error) {
      console.error(error)
    }
    makerNodes.state.loading = false
  },
}

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
export const makerWealth = {
  state: reactive({
    loading: false,
    list: [] as MakerWealths,
  }),

  async get(makerAddress: string) {
    if (!makerAddress) {
      return
    }

    makerWealth.state.loading = true
    try {
      const resp = await $axios.get<MakerWealths>('maker/wealths', {
        params: { makerAddress },
      })
      const wealths = resp.data

      // fill chain's accountExploreUrl
      for (const item of wealths) {
        item['tokenExploreUrl'] = $env.tokenExploreUrl[item.chainId]
      }
      makerWealth.state.list = wealths
    } catch (error) {
      console.error(error)
    }
    makerWealth.state.loading = false
  },
}
