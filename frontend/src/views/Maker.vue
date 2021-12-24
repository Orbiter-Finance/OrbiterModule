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
          :header="item.chainName"
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
    <div class="maker-block maker-header" v-loading="loadingNodes">
      <el-row :gutter="20">
        <el-col :span="6" class="maker-search__item">
          <div class="title">From chain</div>
          <el-select v-model="chainId" placeholder="Select">
            <el-option
              v-for="(item, index) in chains"
              :key="index"
              :label="item.chainName"
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
    </div>
    <div
      class="maker-block maker-header maker-header__statistics"
      v-if="list.length > 0"
    >
      <span>TransactionTotal: {{ transactionTotal }}</span>
      <span>FromAmountTotal: {{ fromAmountTotal }}</span>
      <span>ToAmountTotal: {{ toAmountTotal }}</span>
      <span style="color: #67c23a">+{{ diffAmountTotal }}</span>
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
                <TextLong :content="scope.row.userAddress">{{
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
              <div class="table-timestamp">{{ scope.row.fromTimeStamp }}</div>
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
              <div class="table-timestamp">{{ scope.row.toTimeStamp }}</div>
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
              <TextLong :content="scope.row.toAmountFormat"
                ><span class="amount-operator--minus">-</span>
                {{ scope.row.toAmountFormat }}</TextLong
              >
            </template>
          </el-table-column>
          <el-table-column prop="state" label="State" width="120">
            <template #default="scope">
              <el-tag :type="stateTags[scope.row.state]?.type" effect="dark">
                {{ stateTags[scope.row.state]?.label }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Others"
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
          </el-table-column>
        </el-table>
      </template>

      <el-empty v-else description="Empty"></el-empty>
    </div>
  </div>
</template>

<script lang="ts">
import TextLong from '@/components/TextLong.vue'
import { BigNumber } from 'bignumber.js'
import { defineComponent, inject, reactive, ToRef, toRefs } from 'vue'
import { makerInfo, makerNodes, makerWealth } from '../hooks/maker'

export default defineComponent({
  components: {
    TextLong,
  },
  setup() {
    const state = reactive({
      rangeDate: [] as Date[],
      chainId: '',
    })

    const makerAddressSelected: ToRef<any> = inject('makerAddressSelected')

    const stateTags = {
      0: { label: 'From: check', type: 'info' },
      1: { label: 'From: okay', type: 'warning' },
      2: { label: 'To: check', type: 'info' },
      3: { label: 'To: okay', type: 'success' },
      20: { label: 'To: failed', type: 'danger' },
    }

    makerInfo.get()

    const getMakerWealth = () => {
      makerWealth.get(makerAddressSelected.value)
    }
    getMakerWealth()

    const reset = () => {
      const endTime = new Date()
      const startTime = new Date(endTime.getTime() - 86400000)
      state.rangeDate = [startTime, endTime]
      state.chainId = ''
    }
    reset()

    const getMakerNodes = () => {
      makerNodes.get(
        makerAddressSelected.value,
        Number(state.chainId),
        state.rangeDate
      )
    }
    getMakerNodes()

    return {
      makerAddressSelected,
      ...toRefs(state),
      stateTags,
      reset,

      chains: toRefs(makerInfo).chains,

      loadingWealths: toRefs(makerWealth).loading,
      wealths: toRefs(makerWealth).list,
      getMakerWealth,

      loadingNodes: toRefs(makerNodes).loading,
      list: toRefs(makerNodes).list,
      getMakerNodes,
    }
  },
  computed: {
    transactionTotal() {
      return this.list.length
    },
    fromAmountTotal() {
      let num = new BigNumber(0)
      for (const item of this.list) {
        // filter item when toAmount <= 0
        if (item.toAmount <= 0) {
          continue
        }

        num = num.plus(item.fromAmountFormat)
      }
      return num
    },
    toAmountTotal() {
      let num = new BigNumber(0)
      for (const item of this.list) {
        num = num.plus(item.toAmountFormat)
      }
      return num
    },
    diffAmountTotal() {
      return new BigNumber(this.fromAmountTotal).minus(this.toAmountTotal)
    },
  },
  watch: {
    makerAddressSelected() {
      this.getMakerWealth()
      this.getMakerNodes()
    },
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
  }
}
.maker-header__statistics {
  font-size: 14px;
  color: #555555;

  & > * {
    margin-right: 16px;
  }
}
.table-timestamp {
  font-size: 12px;
  color: #888888;
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
