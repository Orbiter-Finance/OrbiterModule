<template>
  <div class="maker-history">
    <div class="maker-history__filter">
      <div class="filter__start-time">
        <span>Start Time: </span>
        <el-date-picker
          v-model="startTime"
          type="datetime"
          :clearable="false"
          :offset="-50"
          :show-arrow="false"
          @change="onChangeStartTime"
        >
        </el-date-picker>
      </div>
      <div
        :border="true"
        @click="showRejected = !showRejected"
        :class="{ 'filter-item--invalid': !showRejected }"
      >
        <span
          class="filter__color-block"
          style="background-color: var(--el-color-warning-light)"
        ></span>
        Transaction rejected
      </div>
      <div
        :border="true"
        :class="{ 'filter-item--invalid': !showCannotMatched }"
        @click="showCannotMatched = !showCannotMatched"
      >
        <span
          class="filter__color-block"
          style="background-color: var(--el-color-danger-light)"
        ></span>
        Transaction finalized but can't match
      </div>
      <!-- <div
        :border="true"
        :class="{ 'filter-item--invalid': !showSuccessed }"
        @click="showSuccessed = !showSuccessed"
      >
        <span class="filter__color-block"></span>
        Transaction successed
      </div> -->
    </div>
    <el-row :gutter="16">
      <el-col :span="12">
        <h3>In({{toList.length}})</h3>
        <vxe-table
          :scroll-y="{ enabled: false }"
          show-overflow
          :border="'inner'"
          :data="toList"
          style="width: 100%"
          v-loading="toLoading"
          :row-class-name="tableRowClassName"
        >
          <vxe-column title="Chain" width="90">
            <template #default="{ row }">
              <span class="amount-operator--plus"> + {{ row.chainName }} </span>
            </template>
          </vxe-column>
          <vxe-column title="Hash" width="180">
            <template #default="{ row }">
              <a :href="row.txHashHref" target="_blank">
                <TextLong :content="row.txHash">
                  {{ row.txHash }}
                </TextLong>
              </a>
            </template>
          </vxe-column>
          <vxe-column title="Time">
            <template #default="{ row }">
              <TextLong :content="row.txTime">
                {{ row.txTimeAgo }}
              </TextLong>
            </template>
          </vxe-column>
          <vxe-column title="Amount">
            <template #default="{ row }">
              <TextLong :content="row.amountFormat">
                {{ row.amountFormat }}
              </TextLong>
            </template>
          </vxe-column>
          <vxe-column field="tx_status" title="Status" />
        </vxe-table>
      </el-col>
      <el-col :span="12">
        <h3>Out({{fromList.length}})</h3>
        <vxe-table
          :scroll-y="{ enabled: false }"
          show-overflow
          :border="'inner'"
          :data="fromList"
          style="width: 100%"
          v-loading="fromLoading"
          :row-class-name="tableRowClassName"
        >
          <vxe-column title="Chain" width="90">
            <template #default="{ row }">
              <span class="amount-operator--minus">
                - {{ row.chainName }}
              </span>
            </template>
          </vxe-column>
          <vxe-column title="Hash" width="180">
            <template #default="{ row }">
              <a :href="row.txHashHref" target="_blank">
                <TextLong :content="row.txHash">
                  {{ row.txHash }}
                </TextLong>
              </a>
            </template>
          </vxe-column>
          <vxe-column title="Time">
            <template #default="{ row }">
              <TextLong :content="row.txTime">
                {{ row.txTimeAgo }}
              </TextLong>
            </template>
          </vxe-column>
          <vxe-column title="Amount">
            <template #default="{ row }">
              <TextLong :content="row.amountFormat">
                {{ row.amountFormat }}
              </TextLong>
            </template>
          </vxe-column>
          <vxe-column field="tx_status" title="Status" />
        </vxe-table>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import TextLong from '@/components/TextLong.vue'
import { useUnmatchedTradding } from '@/hooks/maker-history'
import dayjs from 'dayjs'
import {
  inject,
  reactive,
  toRef,
  watch,
  ref, computed
} from 'vue'

const makerAddressSelected: any = inject('makerAddressSelected')
const state = reactive({
  showSuccessed: false,
  showRejected: true,
  showCannotMatched: true,
  startTime: dayjs().startOf('day').subtract(6, 'day').toDate(),
})
// const showSuccessed = toRef(state, 'showSuccessed')
const showRejected = toRef(state, 'showRejected')
const showCannotMatched = toRef(state, 'showCannotMatched')
const startTime = toRef(state, 'startTime')
const fromLoading = ref(false)
const toLoading = ref(false)
const _fromList = ref([])
const _toList = ref([])
const fromList = computed(() => {
  return _fromList.value.filter(listFilter)
})
const toList = computed(() => {
  return _toList.value.filter(listFilter)
})
const getMakerPulls = async () => {
  const rangeDate = [state.startTime]
  const { list, loading } = await useUnmatchedTradding({
    makerAddress: makerAddressSelected?.value, 
    fromOrToMaker: 1,
    rangeDate,
    status: 2
  })
  fromLoading.value = loading.value
  _fromList.value = list.value

  const { list: list0, loading: loading0 } = await useUnmatchedTradding({
    makerAddress: makerAddressSelected?.value, 
    fromOrToMaker: 0,
    rangeDate,
    status: 2
  })
  toLoading.value = loading0.value
  _toList.value = list0.value
}
const tableRowClassName = ({ row }) => {
  if (row.tx_status == 'rejected') {
    return 'warning-row'
  }
  if (!row.target_tx) {
    return 'danger-row'
  }

  return ''
}

// , target_tx
const listFilter = ({ tx_status }) => {
  const conditions: boolean[] = []

  // if (state.showSuccessed) {
  //   conditions.push(tx_status == 'finalized' && !!target_tx) // !!target_tx to boolean
  // }
  if (state.showRejected) {
    conditions.push(tx_status == 'rejected')
  }
  if (state.showCannotMatched) {
    // conditions.push(!target_tx && tx_status != 'rejected')
    conditions.push(tx_status == 'MatchFailed')
  }

  return conditions.indexOf(true) > -1
}

// watchs
watch(() => makerAddressSelected?.value, getMakerPulls)
// methods
const onChangeStartTime = () => getMakerPulls()
</script>

<style lang="scss">
.maker-history {
  background: white;
  padding: 18px 36px;

  .maker-history__filter {
    display: flex;
    flex-direction: row;

    .filter__start-time {
      flex: 1;

      span {
        margin-right: 10px;
      }
    }

    > * {
      margin-right: 45px;
      font-size: 14px;
      display: flex;
      flex-direction: row;
      align-items: center;

      &:not(.filter__start-time):hover {
        cursor: pointer;
        opacity: 0.6;
      }
    }
    .filter-item--invalid {
      opacity: 0.5;
      text-decoration: line-through;
    }

    .filter__color-block {
      display: inline-block;
      width: 30px;
      height: 14px;
      margin-right: 5px;
      border: 1px solid rgba($color: #000000, $alpha: 0.1);
    }
  }

  a {
    color: #{var(--el-table-font-color)};
    text-decoration: none;

    &:hover {
      color: #{var(--el-color-primary)};
    }
  }
}
</style>
