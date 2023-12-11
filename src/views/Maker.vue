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
            :header="item.chainName"
            shadow="hover"
          >
            <el-tabs class="maker-header--balances__names">
              <template  v-for="(item1, index1) in item.balances">

              <el-tab-pane
              :key="index1" v-if="item1 && item1.symbol"
                :label="item1.symbol"
              >
                <div
                  v-if="item1.address"
                  class="maker-header--balances__info"
                >
                  TokenAddress:&nbsp;
                  <a
                    :href="`${item.tokenExploreUrl}${item1.address}`"
                    target="_blank"
                  >
                    <TextLong :content="item1.address">
                      {{ item1.address }}
                    </TextLong>
                  </a>
                </div>
                <div class="maker-header--balances__info">
                  <span class="maker-header--balances__value">
                    {{ item1.balance || 'Faild Get' }}
                  </span>
                </div>
              </el-tab-pane>
            </template>

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
              :label="item.name"
              :value="item.internalId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="maker-search__item">
          <div class="title">To chain</div>
          <el-select v-model="state.toChainId" placeholder="Select">
            <el-option
              v-for="(item, index) in chains"
              :key="index"
              :label="item.name"
              :value="item.internalId"
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
        <el-col :span="4" class="maker-search__item">
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
          <div class="title">source</div>
          <el-select v-model="state.source" placeholder="Select">
            <el-option
                    v-for="(item, index) in source"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :offset="8" :span="4" class="maker-search__item">
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
            <span>UserAddressTotal: {{ userAddressList.length }}</span>
          </template>
        </el-popover>
      </div>
      <div v-if="!isSensitive" class="maker-header__statistics">
        <div>
          <el-popover placement="bottom" width="max-content" trigger="hover">
            <template #default>
              <div class="user-addresses">
                <div
                        v-for="(val, key) in statistics.summary"
                        :key="key"
                        @click="state.symbolSelected = val"
                >
                  {{ key }}
                  <span style="margin:0 10px">FromAmountTotal: {{ val.fromAmount }}</span>
                  <span>ToAmountTotal: {{ val.toAmount }}</span>
                </div>
              </div>
            </template>
            <template #reference>
              <div>
                <span style="margin-right: 10px">FromAmountTotal: {{ state.symbolSelected.fromAmount }}</span>
                <span>ToAmountTotal: {{ state.symbolSelected.toAmount }}</span>
              </div>
            </template>
          </el-popover>
        </div>
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
            position: relative;
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
          <div v-if="sendTypeShow" style="position: absolute;right:0">
            <el-radio v-model="sendType" label="1">回款</el-radio>
            <el-radio v-model="sendType" label="2">退款</el-radio>
          </div>
        </div>

        <el-table ref="dashboardTable" :data="list" stripe style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column v-if="selectShow"
                  :selectable="selectable"
                  type="selection"
                  width="55">
          </el-table-column>
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
                <el-tag v-else type="danger" effect="plain" size="mini">Invalid</el-tag>
                <el-tag style="margin-left: 5px" v-if="scope.row.source === 'xvm'"
                        type="info"
                        effect="plain"
                        size="mini">X</el-tag>
                <el-tag style="margin-left: 5px" v-else type="info" effect="plain" size="mini">UA</el-tag>
              </div>
              <div>
                <TextLong :content="scope.row.transactionID">
                  {{ scope.row.transactionID }}
                </TextLong>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="120">
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
          <el-table-column width="250">
            <template #header>
              User List
            </template>
            <template #default="{ row }">
              <div style="display: flex">
                <div style="width: 40%">
                  From user:
                </div>
                <div style="width: 60%">
                  <a :href="row.userAddressHref" target="_blank">
                    <TextLong :content="row.userAddress" placement="bottom">
                      {{ shortAddress(row.userAddress) }}
                    </TextLong>
                  </a>
                </div>
              </div>
              <div style="display: flex">
                <div style="width: 40%">
                  Maker:
                </div>
                <div style="width: 60%">
                  <a :href="row.makerAddressHref" target="_blank">
                    <TextLong :content="row.makerAddress">
                      {{ shortAddress(row.makerAddress) }}
                    </TextLong>
                  </a>
                </div>
              </div>
              <div style="display: flex">
                <div style="width: 40%">
                  To User:
                </div>
                <div style="width: 60%">
                  <a :href="row.replyAccountHref" target="_blank">
                    <TextLong :content="row.replyAccount">
                      {{ shortAddress(row.replyAccount) }}
                    </TextLong>
                  </a>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :width="isSensitive ? 300 : 240">
            <template #header>
              From transaction
            </template>
            <template #default="{ row }">
              <a :href="row.fromTxHref" target="_blank">
                <TextLong :content="row.formTx">
                  {{ row.formTx }}
                </TextLong>
              </a>
              <div style="display: flex">
                <TextLong :content="row.fromAmountFormat">
                  <span class="amount-operator--plus">+</span>
                  {{ row.fromAmountFormat }}
                </TextLong>
                <span style="padding:0 5px;white-space:nowrap">{{ row.tokenName }}</span>
              </div>
              <div class="table-timestamp">
                <TextLong :content="row.fromTimeStamp" placement="bottom"
                  >{{ row.fromTimeStampAgo }}
                </TextLong>
              </div>
            </template>
          </el-table-column>
          <el-table-column :width="isSensitive ? 300 : 240">
            <template #header>
              To transaction
            </template>
            <template #default="{ row }">
              <a v-if="row.toTxHref" :href="row.toTxHref" target="_blank">
                <TextLong :content="row.toTx">{{ row.toTx }}</TextLong>
              </a>
              <TextLong v-else :content="row.toTx">{{ row.toTx }}</TextLong>
              <div style="display: flex">
                <TextLong
                        :content="
                  (row.extValueFormat || row.toAmountFormat) +
                  (row.toAmount <= 0
                    ? ` (NeedTo: ${row.needTo.amountFormat})`
                    : '')
                "
                        placement="bottom"
                >
                  <span class="amount-operator--minus">-</span>
                  {{ row.extValueFormat || row.toAmountFormat }}
                </TextLong>
                <div style="padding:0 5px;white-space:nowrap">{{ row.toSymbol }}</div>
              </div>
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
          <el-table-column v-if="!isSensitive" label="Profit" width="150">
            <template #default="{ row }">
              <div v-if="row.profit > 0" class="amount-operator--plus">
                +{{ row.profit }} USD
              </div>
              <div v-if="row.profit == 0" style="color: #888888">
                {{ row.profit }} USD
              </div>
              <div  v-if="row.profit < 0" class="amount-operator--minus">
                {{ row.profit }} USD
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="State" width="140">
            <template #default="{ row }">
              <el-tag
                      :class="row.state !== 6 && row.state !== 7 && row.needTo ? 'state-tag' : ''"
                :style="'background:'+stateTags[row.state]?.color+';border-color: '+stateTags[row.state]?.color"
                effect="dark"
                @click="onClickStateTag(row)"
                >{{ stateTags[row.state]?.label }}</el-tag
              >
<!--              <div v-if="selectShow && row.state !== 6 && row.state !== 7 && row.needTo" style="margin-top: 5px">-->
<!--                <el-tag-->
<!--                        :class="row.state !== 6 && row.state !== 7 && row.needTo ? 'state-tag' : ''"-->
<!--                        style="background:#C959F7;border-color: #C959F7"-->
<!--                        effect="dark"-->
<!--                        @click="onClickBacktrack(row)"-->
<!--                >Back Track</el-tag>-->
<!--              </div>-->
            </template>
          </el-table-column>
        </el-table>
      </template>

      <el-empty v-else description="Empty"></el-empty>
      <el-dialog
              :title="sendType == 1 ? '回款' : '退款'"
              v-model="confirmSendVisible"
              width="60%">
        <div v-for="(item,index) in sendInfo" :key="index">
          To:{{ item.toAddress }} ===> {{ item.toChainIdName }}->value:{{ item.amountFormat }} {{ item.toSymbol }}
        </div>

        <template v-slot:footer>
          <el-button @click="confirmSendVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmSend">Send</el-button>
        </template>
      </el-dialog>
    </div>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script lang="ts" setup>
import * as RLP from 'rlp'
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
// import { bufArrToArr } from 'ethereumjs-util'
import { ethers, providers } from 'ethers'
import dayjs from 'dayjs'
import {
  TransactionDydx,
  TransactionEvm,
  TransactionImmutablex,
  TransactionLoopring,
  TransactionZksync,
  utils,
} from 'orbiter-sdk'
import { getStarknet, connect as getStarknetWallet } from 'orbiter-get-starknet';
import { stark, uint256 } from 'orbiter-starknet';
import { ref, computed, inject, reactive, toRef, watch, getCurrentInstance,onMounted } from 'vue';
import Web3 from 'web3';
import { Orbiter_V3_ABI, XVM_ABI } from "../config/ABI";
import config from "../config/index";
import util from "../utils/util";
import ERC20Abi from "../config/ERC20.json";
import BigNumber from "bignumber.js";
import Buffer from "vue-buffer";
// import * as zksync from 'zksync'
// mainnet > Mainnet, arbitrum > Arbitrum, zksync > zkSync
const CHAIN_NAME_MAPPING = {
  mainnet: 'Mainnet',
  arbitrum: 'Arbitrum',
  zksync: 'zkSync',
  polygon: 'Polygon',
  optimism: 'Optimism',
}
const stateTags = {
  0: { label: 'From: check', color: '#EADF6A' },
  1: { label: 'From: okay', color: '#E6A23B' },
  2: { label: 'From: failed', color: '#E13428' },
  3: { label: 'To: waiting', color: '#27D4DE' },
  4: { label: 'To: check', color: '#EADF6A' },
  5: { label: 'To: time out', color: '#627DEF' },
  6: { label: 'To: okay', color: '#67C23A' },
  7: { label: 'To: backtrack', color: '#C959F7' },
  20: { label: 'To: failed', color: '#E13428' },
  21: { label: 'Processed', color: '#888888' },
};
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
const source = [
  {
    value: '',
    label: 'All',
  },
  {
    value: 'rpc',
    label: 'UA',
  },
  {
    value: 'xvm',
    label: 'X',
  },
];
// Default time duration 10800
const DEFAULT_TIME_DURATION = 1 * 24 * 60 * 60 * 1000

const makerAddressSelected: any = inject('makerAddressSelected')
// const exchangeRates: any = inject('exchangeRates')
const state = reactive({
  rangeDate: [] as Date[],
  fromChainId: '',
  toChainId: '',
  userAddressSelected: '',
  symbolSelected: {
    fromAmount:'0.000000',
    toAmount:'0.000000',
  },
  keyword: '',
  status: -1,
  source: ''
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
  summary: {}
});
const makerNodes: any = ref([])
// computeds
const list = computed(() =>
  makerNodes.value.filter(
    (item) =>
      !state.userAddressSelected ||
      item.userAddress == state.userAddressSelected
  )
)
let currentInstance;
onMounted(() => {
  currentInstance = getCurrentInstance();
});
let selectDataList = [];
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
const chains = toRef(makerInfo.state, 'chains')
const loadingWealths = toRef(makerWealth.state, 'loading')
const wealths = toRef(makerWealth.state, 'list')
const loadingNodes = ref(false)
const loadingStatistics = ref(false)
const confirmSendVisible = ref(false)
const selectShow = ref(false)
const sendTypeShow = ref(false);
const sendInfo = ref([])
const selectChainId = ref(0)
const sendType = ref('1')
const currentPage = ref(1)
const pageSize = ref(100)
const total = ref(0)
const isSensitive = ref(config.isSensitive)
const pagesizes = computed(() =>
  Array.from(new Set([100, 200, 300, 400, Math.ceil(total.value / 100) * 100]))
)
const shortAddress = (address) => {
  if (address && address.length > 17) {
    return `${address.substr(0, 8)}...${address.substr(address.length - 6, 6)}`;
  }
  return address;
};
const connectStarkNetWallet = async () => {
  const { href } = window.location;
  const match = href.match(/referer=(\w*)/i);
  const refer = match?.[1] ? match[1].toUpperCase() : '';
  const isArgentX = refer === 'argent'.toUpperCase();
  const isBraavos = refer === 'braavos'.toUpperCase();

  const obj = {
    order: isArgentX
            ? ['argentX']
            : isBraavos
                    ? ['braavos']
                    : ['argentX', 'braavos'],
  };
  const wallet = await getStarknetWallet(obj);
  if (!wallet) {
    return;
  }
  const enabled = await wallet
          .enable({ showModal: false })
          .then((address) => {
            console.log(address)
                    return !!address?.length;
                  }
          );

  if (enabled) {
    ElNotification({
      title: 'Success',
      message: 'Connect succeeded',
      type: 'success',
    });
  }
};
const switchNetwork = async (chainId) => {
  const chain = util.getChainInfoByChainId(chainId)
  console.log('switch networkId', chain.networkId);
  if (!+chain.networkId) {
    return;
  }
  const switchParams = {
    chainId: '0x' + Number(chain.networkId).toString(16),
  };
  try {
    await (window as any).ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [switchParams],
    });
  } catch (error) {
    if (error.code === 4902) {
      // need add net
      const params = {
        chainId: '0x' + Number(chainId).toString(16), // A 0x-prefixed hexadecimal string
        chainName: chain.name,
        nativeCurrency: {
          name: chain.nativeCurrency.name,
          symbol: chain.nativeCurrency.symbol, // 2-6 characters long
          decimals: chain.nativeCurrency.decimals,
        },
        rpcUrls: chain.rpc,
        blockExplorerUrls: [
          chain.explorers &&
          chain.explorers.length > 0 &&
          chain.explorers[0].url
                  ? chain.explorers[0].url
                  : chain.infoURL,
        ],
      };
      await (window as any).ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [params],
      });
    } else {
      console.log(error)
    }
  }
};
const handleSelectionChange = (rowList) => {
  if (rowList.length) {
    if (sendType.value == 1) {
      selectChainId.value = rowList[0].toChainId;
    } else {
      selectChainId.value = rowList[0].fromChainId;
    }
  } else {
    selectChainId.value = 0;
  }
  selectDataList = rowList;
};
const selectable = (row) => {
  if (row.status === 95 || row.status === 99) {
    return false;
  }
  if (!(util.isSupportXVMContract(row.toChainId) || util.getOrbiterRouterV3Address(row.toChainId) || Number(row.toChainId) === 4 || Number(row.toChainId) === 44)) {
    return false;
  }
  if (!selectChainId.value) {
    return true;
  }
  if (sendType.value == 1) {
    if (selectChainId.value == row.toChainId) {
      return true;
    }
  } else {
    if (selectChainId.value == row.fromChainId) {
      return true;
    }
  }
  return false;
};

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
  state.source = ''

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
    source: state.source,
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
      source: state.source,
      ...prevMore,
    })
    if (result) {
      statistics.total = result.trxCount;
      statistics.fromAmount = result.fromAmount;
      statistics.toAmount = result.toAmount;
      statistics.profitAmount = result.profitAmount;
      statistics.profit = result.profit;
      statistics.summary = result.summary;
      state.symbolSelected = {
        fromAmount: '0.000000',
        toAmount: '0.000000',
      };
      const summary = statistics.summary;
      if (summary) {
        for (const key in summary) {
          const dt = summary[key];
          if (+dt.toAmount > +state.symbolSelected?.toAmount) {
            state.symbolSelected = dt;
          }
        }
      }
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

const confirmSend = async ()=>{
  const ethereum = (window as any).ethereum;
  if (!ethereum) {
    throw new Error('Please install metamask wallet first!');
  }
  let walletAccount = (
          await ethereum.request({ method: 'eth_requestAccounts' })
  )?.[0];
  const dataList = sendInfo.value;
  const sendData = dataList[0];
  const fromChainId: number = sendData.chainId;
  const chainInfo = util.getChainInfoByChainId(fromChainId);
  confirmSendVisible.value = false;
  if (fromChainId === 4 || fromChainId === 44) {
    const transactions = [];
    const abis = [];
    for (const data of dataList) {
      transactions.push({
        contractAddress: data.tokenAddress,
        entrypoint: 'transfer',
        calldata: stark.compileCalldata({
          recipient: data.toAddress,
          amount: getUint256CalldataFromBN(data.amount)
        })
      });
      abis.push(ERC20Abi)
    }
    const tx = await getStarknet().account.execute(transactions, abis);
    console.log(tx);
    ElNotification({
      title: 'Transfer Succeed',
      message:
              'The transfer was successful! Dashboard will update data list in 15 minutes!',
      type: 'success',
    });
    for (const dt of dataList) {
      const node = makerNodes.value.find(item => item.id == dt.id);
      node.state = 21;
    }
    return;
  }
  const v3Address = util.getOrbiterRouterV3Address(fromChainId);
  if (dataList.length > 1 && v3Address) {
    const mainTokenAddress = chainInfo.nativeCurrency.address;
    let totalMainValue = new BigNumber(0);
    const values = [];
    const tos = [];
    for (const data of dataList) {
      const tokenAddress = data?.tokenAddress;
      const value: any = data?.amount;
      tos.push(data?.toAddress);
      values.push(value);
      if (utils.equalsIgnoreCase(mainTokenAddress, tokenAddress)) {
        totalMainValue = totalMainValue.plus(new BigNumber(value));
      }else{
        ElNotification({
          title: 'Transfer Fail',
          message:
                  'Batch payback is only supported in the same currency',
          type: 'error',
        });
        return;
      }
    }
    const web3 = new Web3(ethereum);
    const contractInstance = new web3.eth.Contract(Orbiter_V3_ABI, v3Address);
    const { transactionHash } = await contractInstance.methods.transfers(tos, values).send({
      from: walletAccount, value: totalMainValue.toString()
    });
    console.log(transactionHash);
    ElNotification({
      title: 'Transfer Succeed',
      message:
              'The transfer was successful! Dashboard will update data list in 15 minutes!',
      type: 'success',
    });
    for (const dt of dataList) {
      const node = makerNodes.value.find(item => item.id == dt.id);
      node.state = 21;
    }
    return;
  }
  if (sendData.source === 'xvm' && util.isSupportXVMContract(fromChainId)) {
    if (!selectShow.value) {
      selectShow.value = true;
      return;
    } else {
      if (dataList.length <= 1) {
        const mainTokenAddress = chainInfo.nativeCurrency.address;
        const toAddress = sendData.toAddress;
        const tokenAddress = sendData?.tokenAddress;
        const tradeId = sendData?.tradeId;
        const op = sendData.op;
        const toValue = sendData?.amount;
        const value = utils.equalsIgnoreCase(mainTokenAddress, tokenAddress) ? toValue : '0';
        const bufferList = [Buffer.from(tradeId), op + ''];
        const encoded = RLP.encode(bufferList);
        const web3 = new Web3(ethereum);
        const contractInstance = new web3.eth.Contract(XVM_ABI, chainInfo.xvmList[0]);
        const { transactionHash } = await contractInstance.methods.swapAnswer(
                toAddress,
                tokenAddress,
                toValue,
                encoded).send({
          from: walletAccount, value: value
        });
        console.log(transactionHash);
        ElNotification({
          title: 'Transfer Succeed',
          message:
                  'The transfer was successful! Dashboard will update data list in 15 minutes!',
          type: 'success',
        });
        const node = makerNodes.value.find(item => item.id == sendData.id);
        node.state = 21;
        return;
      }
      const mainTokenAddress = chainInfo.nativeCurrency.address;
      const encodeDataList = [];
      let totalMainValue = new BigNumber(0);
      for (const data of dataList) {
        const tokenAddress = data?.tokenAddress;
        const value: any = data?.amount;
        encodeDataList.push(swapOkEncodeABI(data?.tradeId, tokenAddress, data.toAddress, value, data.op));
        if (utils.equalsIgnoreCase(mainTokenAddress, tokenAddress)) {
          totalMainValue = totalMainValue.plus(new BigNumber(value));
        }
      }
      const web3 = new Web3(ethereum);
      const contractInstance = new web3.eth.Contract(XVM_ABI, chainInfo.xvmList[0]);
      const { transactionHash } = await contractInstance.methods.multicall(encodeDataList).send({
        from: walletAccount, value: totalMainValue.toString()
      });
      console.log(transactionHash);
      ElNotification({
        title: 'Transfer Succeed',
        message:
                'The transfer was successful! Dashboard will update data list in 15 minutes!',
        type: 'success',
      });
      for (const dt of dataList) {
        const node = makerNodes.value.find(item => item.id == dt.id);
        node.state = 21;
      }
      return;
    }
  } else {
    const fromAddress = sendData.fromAddress;
    const toAddress = sendData.toAddress;
    const tokenAddress = sendData.tokenAddress;
    const amount = sendData.amount;
    const decimals = sendData.decimals;
    const fromExt = sendData.fromExt;

    // Get signer and make transfer's options
    const signer = new providers.Web3Provider(ethereum).getSigner();
    const transferOptions = {
      amount: ethers.BigNumber.from(amount),
      toAddress,
      tokenAddress,
    };

    // Transfer
    let txHash;
    switch (fromChainId) {
      case 3:
      case 33: {
        const tZksync = new TransactionZksync(fromChainId, signer);
        const res = await tZksync.transfer(transferOptions);
        txHash = res.txHash;
        break;
      }

      case 4:
      case 44: {
        txHash = await starknetTransfer(walletAccount, toAddress, fromChainId, tokenAddress, amount);
        break;
      }

      case 8:
      case 88: {
        const tImx = new TransactionImmutablex(fromChainId, signer);
        txHash = await tImx.transfer({
          ...transferOptions,
          decimals,
        });
        break;
      }

      case 9:
      case 99: {
        const tLoopring = new TransactionLoopring(
                fromChainId,
                new Web3(ethereum)
        );
        txHash = await tLoopring.transfer({ ...transferOptions, fromAddress });
        break;
      }

      case 11:
      case 511: {
        const tDydx = new TransactionDydx(fromChainId, new Web3(ethereum));
          txHash = await tDydx.transfer({
          ...transferOptions,
          fromAddress,
          receiverPublicKey: fromExt.dydxInfo?.starkKey,
          receiverPositionId: fromExt.dydxInfo?.positionId,
        });
        break;
      }

      default: {
        const tEvm = new TransactionEvm(fromChainId, signer);
        const res = await tEvm.transfer(transferOptions);
        txHash = res.hash;
        break;
      }
    }

    console.log(txHash);

    ElNotification({
      title: 'Transfer Succeed',
      message:
              'The transfer was successful! Dashboard will update data list in 15 minutes!',
      type: 'success',
    });
    const node = makerNodes.value.find(item => item.id == sendData.id);
    node.state = 21;
  }
}
// Events
const onClickStateTag = async (item: MakerNode) => {
  try {
    if (item.state == 6 || item.state == 7) {
      return;
    }
    const isOriginBack = sendType.value != 1;
    const needTo = isOriginBack ? item.needBack : item.needTo;
    const fromAddress = item.makerAddress;
    const toAddress = isOriginBack ? item.userAddress : item.replyAccount;
    const fromExt = item.fromExt;
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      throw new Error('Please install metamask wallet first!');
    }
    let walletAccount = (
            await ethereum.request({ method: 'eth_requestAccounts' })
    )?.[0];
    const fromChainId: number = needTo.chainId;
    const isStarknet = fromChainId === 4 || fromChainId === 44;

    if (!isStarknet && !util.equalsMakerAddress(walletAccount, fromAddress)) {
      // selectShow.value = false;
      // sendTypeShow.value = false;
      // throw new Error(
      //         `Please switch the address to ${fromAddress} in the wallet!`
      // );
      ElNotification({
        title: 'Warning',
        message: `The current wallet address is not ${fromAddress}`,
        type: 'warning',
        position: "bottom-right"
      });
    }
    sendTypeShow.value = true;
    console.log('step 0')
    if (!isStarknet) await switchNetwork(fromChainId);

    console.log('step 1')
    if (isStarknet) {
      selectShow.value = true;
      if (!getStarknet().account?.address) {
        await connectStarkNetWallet();
      }
      walletAccount = getStarknet().account?.address;
      if (!util.equalsMakerAddress(walletAccount, fromAddress) &&
              !util.equalsMakerAddress(walletAccount, "0x06e18Dd81378fD5240704204BcCC546f6dfad3D08C4a3a44347Bd274659ff328")) {
        selectShow.value = false;
        // throw new Error(
        //         `Please switch the address to ${fromAddress} or 0x06e18Dd81378fD5240704204BcCC546f6dfad3D08C4a3a44347Bd274659ff328 in the wallet!`
        // );
        ElNotification({
          title: 'Warning',
          message: `The current wallet address is not ${fromAddress}`,
          type: 'warning',
          position: "bottom-right"
        });
      }
    }

    if (util.isSupportXVMContract(fromChainId) || isStarknet || util.getOrbiterRouterV3Address(fromChainId)) {
      console.log('step 3')
      if (!selectShow.value) {
        selectShow.value = true;
        return;
      } else {
        if (selectDataList.length > 1) {
          const dataList = [];
          for (const data of selectDataList) {
            const dt = isOriginBack ? data.needBack : data.needTo;
            const toSymbol = isOriginBack ? data.tokenName : data.toSymbol;
            const toChainIdName = isOriginBack ? data.fromChainName : data.toChainName;
            const toAddress = isOriginBack ? data.userAddress : data.replyAccount;
            if (!dt) continue;
              if (data.tokenName !== data.toSymbol && data.replySender?.toLowerCase() === '0x1c84daa159cf68667a54beb412cdb8b2c193fb32'
                  && data.source === 'sync') {
                  data.source = 'xvm';
              }
            dataList.push({
              id: data.id,
              source: data.source,
              tradeId: data.fromTx,
              fromAddress: walletAccount,
              toAddress,
              fromExt: data.fromExt,
              toChainIdName,
              toSymbol,
              op: sendType.value != 1 ? 3 : 1,
              ...dt
            });
          }
          sendInfo.value = dataList;
          console.log('Send info ===> ', dataList);
          // confirmSendVisible.value = true;
          confirmSend()
          return;
        } else {
          const dt = isOriginBack ? item.needBack : item.needTo;
          const toSymbol = isOriginBack ? item.tokenName : item.toSymbol;
          const toChainIdName = isOriginBack ? item.fromChainName : item.toChainName;
          const toAddress = isOriginBack ? item.userAddress : item.replyAccount;
          if (!dt) return;
            if (item.tokenName !== item.toSymbol && item.replySender?.toLowerCase() === '0x1c84daa159cf68667a54beb412cdb8b2c193fb32'
                && item.source === 'sync') {
                item.source = 'xvm';
            }
          const dataList = [];
          dataList.push({
            id:item.id,
            source: item.source,
            tradeId: item.fromTx,
            fromAddress: walletAccount,
            toAddress,
            fromExt: item.fromExt,
            toChainIdName,
            toSymbol,
            op: sendType.value != 1 ? 3 : 1,
            ...dt
          });
          sendInfo.value = dataList;
          console.log('Send info ===> ', dataList);
          // confirmSendVisible.value = true;
          confirmSend()
          return;
        }
      }
    }

    const toSymbol = sendType.value != 1 ? item.tokenName : item.toSymbol;
    const toChainIdName = sendType.value != 1 ? item.fromChainName : item.toChainName;
    const dataList = [{
      id: item.id,
      source: item.source,
      fromAddress: walletAccount,
      toAddress,
      fromExt,
      toChainIdName,
      toSymbol,
      op: sendType.value != 1 ? 3 : 1,
      ...needTo }];
    console.log('Send info ===> ', dataList);
    sendInfo.value = dataList;
    // confirmSendVisible.value = true;
    confirmSend();
  } catch (err) {
    console.log('err ====', err);
    ElNotification({
      title: 'Error',
      message: `Fail: ${err.message}`,
      type: 'error',
    })
  }
}

const getUint256CalldataFromBN = (bn) => {
  return { type: 'struct', ...uint256.bnToUint256(bn) };
};

const starknetTransfer = async (fromAddress, toAddress, chainId, tokenAddress, amount) => {
  amount = new BigNumber(amount);
  // fromAddress = fromAddress.toLowerCase();
  toAddress = toAddress.toLowerCase();
  tokenAddress = tokenAddress.toLowerCase();
  const chanInfo = util.getChainInfoByChainId(chainId);
  // let networkID = chanInfo.chainId;
  // const network = networkID == 1 ? 'mainnet-alpha' : 'georli-alpha';
  // const STARKNET_CROSS_CONTRACT_ADDRESS = {
  //   'mainnet-alpha':
  //           '0x0173f81c529191726c6e7287e24626fe24760ac44dae2a1f7e02080230f8458b',
  //   'georli-alpha':
  //           '0x0457bf9a97e854007039c43a6cc1a81464bd2a4b907594dabc9132c162563eb3',
  // };
  // const contractAddress = STARKNET_CROSS_CONTRACT_ADDRESS[network];


  // const isMainToken = util.isEthTokenAddress(chainId, tokenAddress);
  const transaction = {
    contractAddress: tokenAddress,
    entrypoint: 'transfer',
    calldata: stark.compileCalldata({
      recipient: toAddress,
      amount: getUint256CalldataFromBN(String(amount)),
    }),
  }
  const txhash: any = await getStarknet().account.execute(transaction);
  if (txhash?.code == 'TRANSACTION_RECEIVED') {
    return txhash.transaction_hash;
  }
  return 0;
};
const swapOkEncodeABI = (tradeId: string, token: string, toAddress: string, toValue: string, op:number) => {
  const ifa = new ethers.utils.Interface(XVM_ABI);
  const bufferList = [Buffer.from(tradeId), op + ''];
  const encoded = RLP.encode(bufferList);
  return ifa.encodeFunctionData('swapAnswer', [
    toAddress,
    token,
    toValue,
    encoded
  ]);
};

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
watch(() => sendType.value, function () {
  selectDataList = [];
  currentInstance.ctx.$refs.dashboardTable.clearSelection();
});
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

.state-tag {
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
