import { $env } from '@/env'
import { reactive, ref } from 'vue'
import http from '@/plugins/axios2'
import config from '../config/index'

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
    const chains: any[] = config.chainConfig;

    // unshift All item
    chains.unshift({ chainId: '', name: 'All' });

    makerInfo.state.chains = chains;
    makerInfo.state.earliestTime = new Date().valueOf();
  },
}

export type MakerNode = {
  id: number
  transactionID: string
  makerAddress: string
  userAddress: string
  replyAccount: string
  fromChain: string
  fromChainName: string
  toChain: string
  toChainName: string
  formTx: string
  fromTxHref: string
  fromValue: string
  fromAmountFormat: string
  tokenName:string
  toSymbol: string
  decimals:number
  fromExt: {
    type: string
    value: string
    dydxInfo?: {
      starkKey: string
      positionId: string
    }
  } | null
  toAmountFormat: string
  fromTx: string,
  toTx: string
  toTxHref: string
  fromTimeStamp: string
  fromTimeStampAgo: string
  toTimeStamp: string
  toTimeStampAgo: string
  source: string
  tradeDuration: number
  state: number
  txTokenName: string
  needTo: any
  needBack: any
  profit: any
}
function transforeDate(params: any = {}) {
  const { rangeDate = [], keyword = '' } = params
  if (!keyword) {
    if (rangeDate?.[0]) {
      params['startTime'] = rangeDate?.[0].getTime()
    }
    if (rangeDate?.[1]) {
      params['endTime'] = rangeDate?.[1].getTime()
    }
  }
}
function transforeData(list: any = []) {
  const accountExploreUrl = $env.accountExploreUrl

  // add hrefs
  for (const item of list) {
    item.state = 20;
    if (item.fromStatus == 0) {
      // from check
      item.state = 0;
    } else if (item.fromStatus == 1) {
      // from ok
      item.state = 1;
    } else if (item.fromStatus == 3) {
      // from fail
      item.state = 2;
    } else if (item.fromStatus == 97) {
      // to waiting
      item.state = 3;
    } else if (item.fromStatus == 98) {
      // to time out
      item.state = 5;
    }

    if (item.status == 95) {
      // backtrack
      item.state = 7;
    } else if (item.status == 97) {
      // to check
      item.state = 4;
    } else if (item.status == 98) {
      // to time out
      item.state = 5;
    } else if (item.status == 1 || item.status == 99) {
      // to ok
      item.state = 6;
    }

    if (item.fromStatus != 97 && item.status != 97 && item.status != 95 && item.status != 99 && item.status != 1 && item.source == 'xvm' && new Date(item.createdAt).valueOf() < new Date().valueOf() - 1000 * 60 * 30) {
      // to time out
      item.state = 5;
    }

    if (item.status == 96) {
      // to fail
      item.state = 20;
    }

    item['makerAddressHref'] = accountExploreUrl[item.fromChain] + item['makerAddress']
    item['userAddressHref'] = accountExploreUrl[item.fromChain] + item['userAddress']
    item['replyAccountHref'] = accountExploreUrl[item.toChain] + item['replyAccount']
    item['fromTxHref'] = $env.txExploreUrl[item.fromChain] + item['fromTx']
    item['toTxHref'] = ''
    if (item['toTx'] && item['toTx'] != '0x') {
      item['toTxHref'] = $env.txExploreUrl[item.toChain] + item['toTx']
      if (item.state === 7) {
        item['toTxHref'] = $env.txExploreUrl[item.fromChain] + item['toTx'];
      }
    }
    item['txTokenName'] = item.tokenName
    item.transactionID = item.transcationId
    item.formTx = item.fromTx
  }
}
export const requestStatistics = async (params: any = {}) => {
  const loading = ref(false)
  if (params.makerAddress) {
    transforeDate(params)
    if ($env.starknetL1MapL2['mainnet-alpha'][params.makerAddress.toLowerCase()]) {
      params.makerAddress = `${params.makerAddress},${$env.starknetL1MapL2['mainnet-alpha'][params.makerAddress.toLowerCase()]}`;
    }
    loading.value = true
    try {
      const res: any = await http.get(`/v1/dashboard/statistics`, {
        params: params
      })
      if (res.code === 0) {
        const data = res.data
        return data;
      }
    } catch (error) {
      console.error(error)
    }
    loading.value = false
  }
}

export const useTransactionHistory = async (params: any = {}) => {
  const loading = ref(false)
  const list: any = ref([])
  const size = ref(params.size || 100)
  const current = ref(params.current || 1)
  const total = ref(0)
  if (params.makerAddress) {
    transforeDate(params)
    loading.value = true
    try {
      const res: any = await http.get(`/v1/dashboard/transaction`, {
        params: {
          ...params,
          rangeDate: null,
          size: size.value,
          current: current.value
        }
      })
      if (res.code === 0) {
        const data = res.data;
        transforeData(data)
        list.value = data
        total.value = res.total
      }
    } catch (error) {
      console.error(error)
    }
    loading.value = false
  }
  return {
    list,
    loading,
    total
  }
}

type MakerWealths = {
  chainId: number
  chainName: string
  tokenExploreUrl: string
  makerAddress:string
  balances: {
    address: string;
    symbol: string;
    balance: string;
    decimals: number;
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
      const resp: any = await http.get('/v1/dashboard/wealth', {
        params: { makerAddress },
      });
      console.log('resp', resp);
      const wealths: any[] = resp;

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
