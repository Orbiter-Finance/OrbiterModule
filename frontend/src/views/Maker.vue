<template>
  <div class="maker">
    <div
      class="maker-block maker-header maker-header--balances"
      v-loading="loadingWealths"
      element-loading-text="Loading Balances"
    >
      <el-row v-if="wealths.length > 0" class="chain_info_wrap" :gutter="16">
        <el-col v-for="(item, index) in wealths" :key="index" :span="4">
          <el-card
            class="chain_info"
            :header="mappingChainName(item.chainName)"
            shadow="hover"
          >
            <el-tabs class="maker-header--balances__names">
              <el-tab-pane
                v-for="(item1, index1) in item.balances"
                :key="index1"
                :label="item1.tokenName"
                :name="index1 + ''"
              >
                <div
                  v-if="item1.tokenAddress"
                  class="maker-header--balances__info"
                >
                  TokenAddress:&nbsp;
                  <a
                    :href="`${item.tokenExploreUrl}${item1.tokenAddress}`"
                    target="_blank"
                  >
                    <TextLong :content="item1.tokenAddress">
                      {{ item1.tokenAddress }}
                    </TextLong>
                  </a>
                </div>
                <div class="maker-header--balances__info">
                  <span class="maker-header--balances__value">
                    {{ item1.value || 'Faild Get' }}
                  </span>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
      <el-empty v-else description="Empty balances"></el-empty>
    </div>
    <div
      class="maker-block maker-header maker-header--search"
      v-loading="loadingNodes"
    >
      <el-row :gutter="20">
        <el-col :span="4" class="maker-search__item">
          <div class="title">From chain</div>
          <el-select v-model="state.fromChainId" placeholder="Select">
            <el-option
              v-for="(item, index) in chains"
              :key="index"
              :label="mappingChainName(item.chainName)"
              :value="item.chainId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="maker-search__item">
          <div class="title">To chain</div>
          <el-select v-model="state.toChainId" placeholder="Select">
            <el-option
              v-for="(item, index) in chains"
              :key="index"
              :label="mappingChainName(item.chainName)"
              :value="item.chainId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col v-if="!state.keyword" :span="8" class="maker-search__item">
          <div class="title">From date range</div>
          <el-date-picker
            v-model="state.rangeDate"
            type="datetimerange"
            range-separator="To"
            :shortcuts="shortcuts"
            start-placeholder="Start date"
            end-placeholder="End date"
            :clearable="false"
            :offset="-110"
            :show-arrow="false"
          ></el-date-picker>
        </el-col>
        <el-col :span="8" class="maker-search__item">
          <div class="title">TransactionID | User | FromTx | ToTx</div>
          <el-input
            v-model="state.keyword"
            placeholder="Input search keyword."
            :clearable="true"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="title">state</div>
          <el-select v-model="state.status" placeholder="Select">
            <el-option
              v-for="(item, index) in status"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="maker-search__item">
          <div class="title">Reset | Apply</div>
          <el-button @click="reset">Reset</el-button>
          <el-button type="primary" @click="() => clickApply()"
            >Apply</el-button
          >
        </el-col>
      </el-row>
      <el-row v-if="state.userAddressSelected">
        <el-tag closable @close="state.userAddressSelected = ''">
          UserAddress: {{ state.userAddressSelected }}
        </el-tag>
      </el-row>
    </div>
    <div
      class="maker-block maker-header maker-header__statistics"
      v-loading="loadingStatistics"
    >
      <el-button-group v-if="false">
        <el-button
          :disabled="loadingNodes"
          size="small"
          @click="onClickPageButton(false)"
        >
          Previous Page
        </el-button>
        <el-button
          :disabled="loadingNodes"
          size="small"
          @click="onClickPageButton(true)"
        >
          Next Page
        </el-button>
      </el-button-group>
      <div>TransactionTotal: {{ statistics.total }}</div>
      <div>
        <el-popover placement="bottom" width="max-content" trigger="hover">
          <template #default>
            <div class="user-addresses">
              <div
                v-for="(item, index) in userAddressList"
                :key="index"
                @click="state.userAddressSelected = item.address"
              >
                {{ item.address }}
                <span>&nbsp;({{ item.count }})</span>
              </div>
            </div>
          </template>
          <template #reference>
            <span>UserAddressTotal:{{ userAddressList.length }}</span>
          </template>
        </el-popover>
      </div>
      <div>FromAmountTotal: {{ statistics.fromAmount }}</div>
      <div>ToAmountTotal: {{ statistics.toAmount }}</div>
      <div style="color: #67c23a; font-weight: 600">
        +{{ statistics.profit['USD'] }} USD
      </div>
      <el-dropdown>
        <div style="color: #409eff; font-weight: 600">
          +{{ statistics.profit['ETH'] }} ETH
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(val, key) in statistics.profit"
              :key="key"
            >
              <div style="color: #409eff; font-weight: 600">
                + {{ val }} {{ key }}
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div style="color: #f56c6c; font-weight: 600">
        +{{ statistics.profit['CNY'] }} CNY
      </div>
      <div style="margin-left: auto">
        <router-link
          :to="`/maker/history?makerAddress=${makerAddressSelected}`"
          target="_blank"
        >
          <el-button size="small" round>All transactions</el-button>
        </router-link>
      </div>
    </div>
    <div class="maker-block">
      <template v-if="list.length > 0">
        <div
          v-if="!state.userAddressSelected"
          style="
            display: flex;
            justify-content: center;
            item-align: center;
            margin: 10px;
          "
        >
          <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="pagesizes"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>

        <el-table :data="list" stripe style="width: 100%">
          <el-table-column label="TransactionID">
            <template #default="scope">
              <div>
                <el-tag
                  v-if="scope.row.txTokenName"
                  type="info"
                  effect="plain"
                  size="mini"
                  >{{ scope.row.txTokenName }}
                </el-tag>
                <el-tag v-else type="danger" effect="plain" size="mini"
                  >Invalid</el-tag
                >
              </div>
              <div>
                <TextLong :content="scope.row.transactionID">
                  {{ scope.row.transactionID }}
                </TextLong>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="90">
            <template #header>
              From
              <br />To
            </template>
            <template #default="scope">
              <el-tag
                class="maker__chain-tag"
                type="success"
                effect="light"
                size="mini"
                >+ {{ scope.row.fromChainName }}
              </el-tag>
              <el-tag
                class="maker__chain-tag"
                type="danger"
                effect="light"
                size="mini"
                >- {{ scope.row.toChainName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column style="min-width: 120px">
            <template #header>
              Maker
              <br />User
            </template>
            <template #default="scope">
              <a :href="scope.row.makerAddressHref" target="_blank">
                <TextLong :content="scope.row.makerAddress">
                  {{ scope.row.makerAddress }}
                </TextLong>
              </a>
              <a :href="scope.row.userAddressHref" target="_blank">
                <TextLong :content="scope.row.userAddress" placement="bottom">
                  {{ scope.row.userAddress }}
                </TextLong>
              </a>
            </template>
          </el-table-column>
          <el-table-column width="145">
            <template #header>
              FromTx
              <br />FromTime
            </template>
            <template #default="scope">
              <a :href="scope.row.fromTxHref" target="_blank">
                <TextLong :content="scope.row.formTx">
                  {{ scope.row.formTx }}
                </TextLong>
              </a>
              <div class="table-timestamp">
                <TextLong :content="scope.row.fromTimeStamp" placement="bottom"
                  >{{ scope.row.fromTimeStampAgo }}
                </TextLong>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="145">
            <template #header>
              ToTx
              <br />ToTime
            </template>
            <template #default="{ row }">
              <a v-if="row.toTxHref" :href="row.toTxHref" target="_blank">
                <TextLong :content="row.toTx">{{ row.toTx }}</TextLong>
              </a>
              <TextLong v-else :content="row.toTx">{{ row.toTx }}</TextLong>
              <div class="table-timestamp">
                <TextLong
                  v-if="row.toTimeStamp && row.toTimeStamp != '0'"
                  :content="row.toTimeStamp"
                  placement="bottom"
                >
                  {{ row.toTimeStampAgo }}
                  <span v-if="row.tradeDuration >= 0"
                    >({{ row.tradeDuration }}s)</span
                  >
                </TextLong>
                <span v-else>{{ row.toTimeStampAgo }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="120">
            <template #header>
              FromAmount
              <br />ToAmount
            </template>
            <template #default="{ row }">
              <TextLong :content="row.fromAmountFormat">
                <span class="amount-operator--plus">+</span>
                {{ row.fromAmountFormat }}
              </TextLong>
              <TextLong
                :content="
                  row.toAmountFormat +
                  (row.toAmount <= 0
                    ? ` (NeedTo: ${row.needTo.amountFormat})`
                    : '')
                "
                placement="bottom"
              >
                <span class="amount-operator--minus">-</span>
                {{ row.toAmountFormat }}
              </TextLong>
            </template>
          </el-table-column>
          <el-table-column label="Profit" width="150">
            <template #default="{ row }">
              <div v-if="row.profitUSD > 0" class="amount-operator--plus">
                +{{ row.profitUSD }} USD
              </div>
              <div v-else class="amount-operator--minus">
                {{ row.profitUSD }} USD
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="State" width="140">
            <template #default="{ row }">
              <el-tag
                :class="'state-tag--' + row.state"
                :type="stateTags[row.state]?.type"
                effect="dark"
                @click="onClickStateTag(row)"
                >{{ stateTags[row.state]?.label }}</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
      </template>

      <el-empty v-else description="Empty"></el-empty>
    </div>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script lang="ts" setup>
import TextLong from '@/components/TextLong.vue'
import {
  makerInfo,
  MakerNode,
  makerWealth,
  useTransactionHistory,
  requestStatistics,
} from '@/hooks/maker'
// import { BigNumber } from 'bignumber.js'
import { ElNotification } from 'element-plus'
import { BigNumberish, ethers, providers } from 'ethers'
import dayjs from 'dayjs'
import {
  TransactionDydx,
  TransactionEvm,
  TransactionImmutablex,
  TransactionLoopring,
  TransactionZksync,
  utils,
} from 'orbiter-sdk'
import { ref, computed, inject, reactive, toRef, watch } from 'vue'
import Web3 from 'web3'

// mainnet > Mainnet, arbitrum > Arbitrum, zksync > zkSync
const CHAIN_NAME_MAPPING = {
  mainnet: 'Mainnet',
  arbitrum: 'Arbitrum',
  zksync: 'zkSync',
  polygon: 'Polygon',
  optimism: 'Optimism',
}
const stateTags = {
  0: { label: 'From: check', type: 'info' },
  1: { label: 'From: okay', type: 'warning' },
  2: { label: 'To: check', type: 'info' },
  3: { label: 'To: okay', type: 'success' },
  20: { label: 'To: failed', type: 'danger' },
}
const status = [
  {
    value: -1,
    label: 'All',
  },
].concat(
  Object.keys(stateTags).map((key) => ({
    value: +key,
    label: stateTags[key].label,
  }))
)
// Default time duration 10800
const DEFAULT_TIME_DURATION = 1 * 24 * 60 * 60 * 1000

const makerAddressSelected: any = inject('makerAddressSelected');
makerAddressSelected.value = window.ethereum.selectedAddress;
// const exchangeRates: any = inject('exchangeRates')
const state = reactive({
  rangeDate: [] as Date[],
  fromChainId: '',
  toChainId: '',
  userAddressSelected: '',
  keyword: '',
  status: -1,
})
const shortcuts = [
  {
    text: 'Today',
    value: () => {
      return [dayjs().startOf('d'), dayjs().endOf('d')]
    },
  },
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
const statistics = reactive({
  total: 0,
  fromAmount: 0,
  toAmount: 0,
  profit: {},
  profitAmount: 0,
})
const makerNodes: any = ref([])
// computeds
const list = computed(() =>
  makerNodes.value.filter(
    (item) =>
      !state.userAddressSelected ||
      item.userAddress == state.userAddressSelected
  )
)

const userAddressList = computed(() => {
  const userAddressList: { address: string; count: number }[] = []
  for (const item of makerNodes.value) {
    if (!item.userAddress) {
      continue
    }

    const userAddress = userAddressList.find(
      (item1) => item.userAddress == item1.address
    )
    if (userAddress) {
      userAddress.count++
      continue
    }

    userAddressList.push({ address: item.userAddress, count: 1 })
  }

  // Sort by count desc
  userAddressList.sort((a, b) => b.count - a.count)

  return userAddressList
})
// const diffAmountTotal = computed(() => {
//   let num = new BigNumber(0)
//   for (const item of list.value) {
//     if (!item.profitUSD) {
//       continue
//     }

//     num = num.plus(item.profitUSD)
//   }
//   return num.toNumber().toFixed(2)
// })
// const diffAmountTotalETH = computed(() => {
//   const num = new BigNumber(diffAmountTotal.value).multipliedBy(
//     exchangeRates?.value?.ETH || 0
//   )
//   return num.toFixed(5)
// })
// const diffAmountTotalCNY = computed(() => {
//   const num = new BigNumber(diffAmountTotal.value).multipliedBy(
//     exchangeRates?.value?.CNY || 0
//   )
//   return num.toFixed(2)
// })
const chains = toRef(makerInfo.state, 'chains')
const loadingWealths = toRef(makerWealth.state, 'loading')
const wealths = toRef(makerWealth.state, 'list')
const loadingNodes = ref(false)
const loadingStatistics = ref(false)
const currentPage = ref(1)
const pageSize = ref(100)
const total = ref(0)
const pagesizes = computed(() =>
  Array.from(new Set([100, 200, 300, 400, Math.ceil(total.value / 100) * 100]))
)

const handleSizeChange = (val: number) => {
  pageSize.value = val
  getMakerNodes({ size: val })
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getMakerNodes({ current: val })
}
const getMakerWealth = () => makerWealth.get(makerAddressSelected?.value)
const reset = () => {
  state.rangeDate = [dayjs().startOf('d').toDate(), dayjs().endOf('d').toDate()]
  state.fromChainId = ''
  state.toChainId = ''
  state.userAddressSelected = ''
  state.keyword = ''
  state.status = -1

  getMakerNodes()
  getStatistics()
}
let prevMore = {}
const clickApply = () => {
  getMakerNodes({ current: 1 })
  getStatistics()
}
const getMakerNodes = async (more: any = {}) => {
  loadingNodes.value = true
  prevMore = {
    ...prevMore,
    ...more,
  }
  const {
    list: _list,
    // loading,
    total: _total,
  } = await useTransactionHistory({
    makerAddress: makerAddressSelected?.value,
    fromChain: state.fromChainId ? +state.fromChainId : null,
    toChain: state.toChainId ? +state.toChainId : null,
    rangeDate: state.rangeDate,
    keyword: state.keyword.trim(),
    state: state.status,
    ...prevMore,
  })
  loadingNodes.value = false
  makerNodes.value = _list.value
  total.value = _total.value
}
const getStatistics = async (more: any = {}) => {
  loadingStatistics.value = true
  try {
    prevMore = {
      ...prevMore,
      ...more,
    }
    const result = await requestStatistics({
      makerAddress: makerAddressSelected?.value,
      fromChain: state.fromChainId ? +state.fromChainId : null,
      toChain: state.toChainId ? +state.toChainId : null,
      rangeDate: state.rangeDate,
      keyword: state.keyword.trim(),
      state: state.status,
      ...prevMore,
    })
    if (result) {
      statistics.total = result.trxCount
      statistics.fromAmount = result.fromAmount
      statistics.toAmount = result.toAmount
      statistics.profitAmount = result.profitAmount
      statistics.profit = result.profit
    }
  } catch (error) {
    throw new Error(error)
  } finally {
    loadingStatistics.value = false
  }
}
// Methods
const mappingChainName = (chainName: string) => {
  if (CHAIN_NAME_MAPPING[chainName]) {
    return CHAIN_NAME_MAPPING[chainName]
  }
  return chainName
}
const transferNeedTo = async (
  fromAddress: string,
  toAddress: string,
  needTo: {
    chainId: number
    amount: BigNumberish
    decimals: number
    tokenAddress: string
  },
  fromExt: any
) => {
  const ethereum = (window as any).ethereum
  if (!ethereum) {
    throw new Error('Please install metamask wallet first!')
  }

  // Check wallet
  const walletAccount = (
    await ethereum.request({ method: 'eth_requestAccounts' })
  )?.[0]
  if (!utils.equalsIgnoreCase(walletAccount, fromAddress)) {
    throw new Error(
      `Please switch the address to ${fromAddress} in the wallet!`
    )
  }

  // Ensure networkId
  await utils.ensureMetamaskNetwork(needTo.chainId, ethereum)

  // Get signer and make transfer's options
  const signer = new providers.Web3Provider(ethereum).getSigner()
  const transferOptions = {
    amount: ethers.BigNumber.from(needTo.amount),
    toAddress,
    tokenAddress: needTo.tokenAddress,
  }

  // Transfer
  let txHash = ''
  switch (needTo.chainId) {
    case 3:
    case 33: {
      const tZksync = new TransactionZksync(needTo.chainId, signer)
      await tZksync.transfer(transferOptions)
      break
    }

    case 4:
    case 44: {
      console.warn('do starknet')
      break
    }

    case 8:
    case 88: {
      const tImx = new TransactionImmutablex(needTo.chainId, signer)
      await tImx.transfer({
        ...transferOptions,
        decimals: needTo.decimals,
      })
      break
    }

    case 9:
    case 99: {
      const tLoopring = new TransactionLoopring(
        needTo.chainId,
        new Web3(ethereum)
      )
      await tLoopring.transfer({ ...transferOptions, fromAddress })
      break
    }

    case 11:
    case 511: {
      const tDydx = new TransactionDydx(needTo.chainId, new Web3(ethereum))
      await tDydx.transfer({
        ...transferOptions,
        fromAddress,
        receiverPublicKey: fromExt.dydxInfo?.starkKey,
        receiverPositionId: fromExt.dydxInfo?.positionId,
      })
      break
    }

    default: {
      const tEvm = new TransactionEvm(needTo.chainId, signer)
      await tEvm.transfer(transferOptions)
      break
    }
  }

  return { txHash }
}
// Events
const onClickStateTag = async (item: MakerNode) => {
  try {
    if (item.state != 1 || !item.needTo) {
      return
    }

    await transferNeedTo(
      item.makerAddress,
      item.userAddress,
      item.needTo,
      item.fromExt
    )

    // Update item.state
    // item.toTx = txHash
    // item.toTxHref = $env.txExploreUrl[item.toChain] + item['toTx']
    item.state = 2

    ElNotification({
      title: 'Transfer Succeed',
      message:
        'The transfer was successful! Dashboard will update data list in 15 minutes!',
      type: 'success',
    })
  } catch (err) {
    ElNotification({
      title: 'Error',
      message: `Fail: ${err.message}`,
      type: 'error',
    })
  }
}
const onClickPageButton = (next: boolean) => {
  const startTime: Date = state.rangeDate[0]
  const endTime: Date = state.rangeDate[1]
  if (!startTime || !endTime) {
    return
  }
  const duration = next ? DEFAULT_TIME_DURATION : -DEFAULT_TIME_DURATION
  state.rangeDate = [
    new Date(startTime.getTime() + duration),
    new Date(endTime.getTime() + duration),
  ]
  getMakerNodes()
}
const init = () => getMakerWealth() + getMakerNodes() + getStatistics()

makerInfo.get()
reset()
init()
// When makerAddressSelected changed, get maker's data
watch(() => makerAddressSelected?.value, init)
</script>

<style lang="scss">
.maker-header--balances__info {
  white-space: nowrap;
}
.maker {
  a {
    color: #{var(--el-table-font-color)};
    text-decoration: none;

    &:hover {
      color: #{var(--el-color-primary)};
    }
  }
}

.maker-block {
  display: block;
  margin: 0 auto;
  padding: 12px;
  background-color: white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.maker-search__item > * {
  margin-bottom: 8px;
}

.maker-header {
  border-bottom: 1px solid #e8e8e8;
  background-color: #f8f8f8;
}

.maker-header--balances {
  display: flex;
  flex-direction: row;

  .el-empty {
    padding: 0;
  }

  .el-card__header {
    font-size: 18px;
    font-weight: bold;
    color: #555555;
  }

  & > * {
    margin-right: 20px;
    flex: 1;
  }

  & > *:last-child {
    margin-right: 0;
  }

  &__names {
    margin-top: calc(#{var(--el-card-padding)} * -1);

    & .el-tabs__item {
      font-size: 13px;
      font-weight: normal;
    }
  }

  &__value {
    font-weight: bold;
  }

  &__info {
    color: #555555;
    font-size: 13px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 4px;

    > * {
      display: contents;
    }
  }
}

.maker-header--search {
  .el-row {
    margin-top: 10px;

    &:first-child {
      margin-top: 0;
    }
  }
}

.maker-header__statistics {
  font-size: 14px;
  color: #555555;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > * {
    margin-right: 16px;
  }
}

.user-addresses {
  max-height: 300px;
  overflow-y: scroll;

  > * {
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;

    &:hover {
      background-color: #f8f8f8;
      cursor: pointer;
    }

    &:last-child {
      border-bottom: none;
    }

    span {
      font-size: 13px;
      color: #{var(--el-color-primary)};
    }
  }
}

.table-timestamp {
  font-size: 12px;
  color: #888888;
  width: max-content;
}

.maker__chain-tag {
  display: block;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 5px;
  text-align: center;

  &:last-child {
    margin-bottom: 0;
  }
}

.state-tag--1 {
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 1;
  }
}

.chain_info_wrap {
  .chain_info {
    height: 165px;
  }

  .el-col:nth-child(n + 7) .chain_info {
    margin-top: 16px;
  }
}
</style>