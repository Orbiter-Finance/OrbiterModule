<template>
  <div class="maker">
    <div
      class="maker-block maker-header maker-header--balances"
      v-loading="loadingWealths"
      element-loading-text="Loading Balances"
    >
      <template v-if="wealths.length > 0">
        <el-card
          v-for="(item, index) in wealths"
          :key="index"
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
                  <TextLong :content="item1.tokenAddress">{{
                    item1.tokenAddress
                  }}</TextLong>
                </a>
              </div>
              <div class="maker-header--balances__info">
                Balances:&nbsp;<span class="maker-header--balances__value">{{
                  item1.value || 'Faild Get'
                }}</span>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </template>
      <el-empty v-else description="Empty balances"></el-empty>
    </div>
    <div
      class="maker-block maker-header maker-header--search"
      v-loading="loadingNodes"
    >
      <el-row :gutter="20">
        <el-col :span="6" class="maker-search__item">
          <div class="title">From chain</div>
          <el-select v-model="chainId" placeholder="Select">
            <el-option
              v-for="(item, index) in chains"
              :key="index"
              :label="mappingChainName(item.chainName)"
              :value="item.chainId"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="maker-search__item">
          <div class="title">
            From date range
            <!-- <span style="font-size: 12px"
              >(Earliest: 2017-10-11 10:20:30, updating...)</span
            > -->
          </div>
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :clearable="false"
            :offset="-110"
            :show-arrow="false"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="6" class="maker-search__item">
          <div class="title">Reset | Apply</div>
          <el-button @click="reset">Reset</el-button>
          <el-button type="primary" @click="getMakerNodes">Apply</el-button>
        </el-col>
      </el-row>
      <el-row v-if="userAddressSelected">
        <el-tag closable @close="userAddressSelected = ''">
          UserAddress: {{ userAddressSelected }}
        </el-tag>
      </el-row>
    </div>
    <div class="maker-block maker-header maker-header__statistics">
      <div>TransactionTotal: {{ list.length }}</div>
      <div>
        <el-popover placement="bottom" width="max-content" trigger="hover">
          <template #default>
            <div class="user-addresses">
              <div
                v-for="(item, index) in userAddressList"
                :key="index"
                @click="userAddressSelected = item.address"
              >
                {{ item.address }}<span>&nbsp;({{ item.count }})</span>
              </div>
            </div>
          </template>
          <template #reference>
            <span>UserAddressTotal:{{ userAddressList.length }}</span>
          </template>
        </el-popover>
      </div>
      <div>FromAmountTotal: {{ fromAmountTotal }}</div>
      <div>ToAmountTotal: {{ toAmountTotal }}</div>
      <div style="color: #67c23a">+{{ diffAmountTotal }}</div>
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
        <el-table :data="list" stripe style="width: 100%">
          <el-table-column label="TransactionID">
            <template #default="scope">
              <div>
                <el-tag
                  v-if="scope.row.txTokenName"
                  type="info"
                  effect="plain"
                  size="mini"
                  >{{ scope.row.txTokenName }}</el-tag
                >
                <el-tag v-else type="danger" effect="plain" size="mini">
                  Invalid
                </el-tag>
              </div>
              <div>
                <TextLong :content="scope.row.transactionID">{{
                  scope.row.transactionID
                }}</TextLong>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="90">
            <template #header>
              From <br />
              To
            </template>
            <template #default="scope">
              <el-tag
                class="maker__chain-tag"
                type="success"
                effect="light"
                size="mini"
              >
                + {{ scope.row.fromChainName }}
              </el-tag>
              <el-tag
                class="maker__chain-tag"
                type="danger"
                effect="light"
                size="mini"
              >
                - {{ scope.row.toChainName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column style="min-width: 120px">
            <template #header>
              Maker <br />
              User
            </template>
            <template #default="scope">
              <a :href="scope.row.makerAddressHref" target="_blank">
                <TextLong :content="scope.row.makerAddress">{{
                  scope.row.makerAddress
                }}</TextLong>
              </a>
              <a :href="scope.row.userAddressHref" target="_blank">
                <TextLong :content="scope.row.userAddress" placement="bottom">{{
                  scope.row.userAddress
                }}</TextLong>
              </a>
            </template>
          </el-table-column>
          <el-table-column width="145">
            <template #header>
              FromTx <br />
              FromTime
            </template>
            <template #default="scope">
              <a :href="scope.row.fromTxHref" target="_blank">
                <TextLong :content="scope.row.formTx">{{
                  scope.row.formTx
                }}</TextLong>
              </a>
              <div class="table-timestamp">
                <TextLong
                  :content="scope.row.fromTimeStamp"
                  placement="bottom"
                  >{{ scope.row.fromTimeStampAgo }}</TextLong
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column width="145">
            <template #header>
              ToTx <br />
              ToTime
            </template>
            <template #default="scope">
              <a
                v-if="scope.row.toTxHref"
                :href="scope.row.toTxHref"
                target="_blank"
              >
                <TextLong :content="scope.row.toTx">{{
                  scope.row.toTx
                }}</TextLong>
              </a>
              <TextLong v-else :content="scope.row.toTx">{{
                scope.row.toTx
              }}</TextLong>
              <div class="table-timestamp">
                <TextLong
                  v-if="scope.row.toTimeStamp && scope.row.toTimeStamp != '0'"
                  :content="scope.row.toTimeStamp"
                  placement="bottom"
                >
                  {{ scope.row.toTimeStampAgo }}
                </TextLong>
                <span v-else>{{ scope.row.toTimeStampAgo }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="120">
            <template #header>
              FromAmount <br />
              ToAmount
            </template>
            <template #default="scope">
              <TextLong :content="scope.row.fromAmountFormat"
                ><span class="amount-operator--plus">+</span>
                {{ scope.row.fromAmountFormat }}</TextLong
              >
              <TextLong :content="scope.row.toAmountFormat" placement="bottom"
                ><span class="amount-operator--minus">-</span>
                {{ scope.row.toAmountFormat }}</TextLong
              >
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
            <template #default="scope">
              <el-tag :type="stateTags[scope.row.state]?.type" effect="dark">
                {{ stateTags[scope.row.state]?.label }}
              </el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column label="Others"
            ><template #default="scope">
              <el-button
                v-if="scope.row.needTo?.amount > 0"
                type="danger"
                plain
                size="small"
                @click="() => {}"
              >
                -{{ scope.row.needTo?.amountFormat }}
              </el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </template>

      <el-empty v-else description="Empty"></el-empty>
    </div>
  </div>
</template>

<script lang="ts">
import TextLong from '@/components/TextLong.vue'
import { BigNumber } from 'bignumber.js'
import {
  computed,
  defineComponent,
  inject,
  reactive,
  toRef,
  toRefs,
  watch,
} from 'vue'
import { makerInfo, makerNodes, makerWealth } from '../hooks/maker'

// mainnet > Mainnet, arbitrum > Arbitrum, zksync > zkSync
const CHAIN_NAME_MAPPING = {
  mainnet: 'Mainnet',
  arbitrum: 'Arbitrum',
  zksync: 'zkSync',
}

export default defineComponent({
  components: {
    TextLong,
  },
  setup() {
    const makerAddressSelected: any = inject('makerAddressSelected')

    const state = reactive({
      rangeDate: [] as Date[],
      chainId: '',
      userAddressSelected: '',
    })

    const stateTags = {
      0: { label: 'From: check', type: 'info' },
      1: { label: 'From: okay', type: 'warning' },
      2: { label: 'To: check', type: 'info' },
      3: { label: 'To: okay', type: 'success' },
      20: { label: 'To: failed', type: 'danger' },
    }

    makerInfo.get()

    const getMakerWealth = () => {
      makerWealth.get(makerAddressSelected?.value)
    }
    getMakerWealth()

    const reset = () => {
      const endTime = new Date()
      const startTime = new Date(endTime.getTime() - 86400000)
      state.rangeDate = [startTime, endTime]
      state.chainId = ''
      state.userAddressSelected = ''
    }
    reset()

    const getMakerNodes = () => {
      makerNodes.get(
        makerAddressSelected?.value,
        Number(state.chainId),
        state.rangeDate
      )
    }
    getMakerNodes()

    // computeds
    const list = computed(() => {
      return makerNodes.list.filter((item) => {
        if (!state.userAddressSelected) {
          return true
        }
        return item.userAddress == state.userAddressSelected
      })
    })
    const userAddressList = computed(() => {
      const userAddressList: { address: string; count: number }[] = []
      for (const item of makerNodes.list) {
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
    const fromAmountTotal = computed(() => {
      let num = new BigNumber(0)
      for (const item of list.value) {
        num = num.plus(item.fromAmountFormat)
      }
      return num
    })
    const toAmountTotal = computed(() => {
      let num = new BigNumber(0)
      for (const item of list.value) {
        num = num.plus(item.toAmountFormat)
      }
      return num
    })
    const diffAmountTotal = computed(() => {
      let num = new BigNumber(0)
      for (const item of list.value) {
        if (!item.profitUSD) {
          continue
        }

        num = num.plus(item.profitUSD)
      }
      return num.toString() + ' USD'
    })

    // When makerAddressSelected changed, get maker's data
    watch(
      () => makerAddressSelected?.value,
      () => {
        getMakerWealth()
        getMakerNodes()
      }
    )

    // methods
    const mappingChainName = (chainName: string) => {
      if (CHAIN_NAME_MAPPING[chainName]) {
        return CHAIN_NAME_MAPPING[chainName]
      }
      return chainName
    }

    return {
      makerAddressSelected,

      ...toRefs(state),
      stateTags,
      reset,

      chains: toRef(makerInfo, 'chains'),

      loadingWealths: toRef(makerWealth, 'loading'),
      wealths: toRef(makerWealth, 'list'),

      loadingNodes: toRef(makerNodes, 'loading'),
      list,
      getMakerNodes,

      userAddressList,
      fromAmountTotal,
      toAmountTotal,
      diffAmountTotal,

      mappingChainName,
    }
  },
})
</script>

<style lang="scss">
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
</style>
