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
      <div
        :border="true"
        :class="{ 'filter-item--invalid': !showSuccessed }"
        @click="showSuccessed = !showSuccessed"
      >
        <span class="filter__color-block"></span>
        Transaction successed
      </div>
    </div>
    <el-row :gutter="16">
      <el-col :span="12">
        <h3>In</h3>
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
        <h3>Out</h3>
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
import { makerPulls } from '@/hooks/maker-history'
import dayjs from 'dayjs'
import {
  computed,
  inject,
  reactive,
  toRef,
  watch,
} from 'vue'

const makerAddressSelected: any = inject('makerAddressSelected')
const state = reactive({
  showSuccessed: false,
  showRejected: true,
  showCannotMatched: true,
  startTime: dayjs().startOf('day').subtract(6, 'day').toDate(),
})
const showSuccessed = toRef(state, 'showSuccessed')
const showRejected = toRef(state, 'showRejected')
const showCannotMatched = toRef(state, 'showCannotMatched')
const startTime = toRef(state, 'startTime')
const fromMakerPulls = makerPulls()
const toMakerPulls = makerPulls()
const getMakerPulls = () => {
  const rangeDate = [state.startTime]
  fromMakerPulls.get(makerAddressSelected?.value, 1, rangeDate)
  toMakerPulls.get(makerAddressSelected?.value, 0, rangeDate)
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

const listFilter = ({ tx_status, target_tx }) => {
  const conditions: boolean[] = []

  if (state.showSuccessed) {
    conditions.push(tx_status == 'finalized' && !!target_tx) // !!target_tx to boolean
  }
  if (state.showRejected) {
    conditions.push(tx_status == 'rejected')
  }
  if (state.showCannotMatched) {
    conditions.push(!target_tx && tx_status != 'rejected')
  }

  return conditions.indexOf(true) > -1
}
const fromList = computed(() => {
  return fromMakerPulls.state.list.value.filter(listFilter)
})
const toList = computed(() => {
  return toMakerPulls.state.list.value.filter(listFilter)
})

getMakerPulls()
// watchs
watch(() => makerAddressSelected?.value, getMakerPulls)
// methods
const onChangeStartTime = () => {
  getMakerPulls()
}
const fromLoading = fromMakerPulls.state.loading
const toLoading = toMakerPulls.state.loading
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
