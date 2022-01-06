<template>
  <div class="maker-history">
    <div class="maker-history__filter">
      <el-checkbox
        :border="true"
        :model-value="showRejected"
        @change="showRejected = !showRejected"
      >
        Show rejected
      </el-checkbox>
      <el-checkbox
        :border="true"
        :model-value="showCannotMatched"
        @change="showCannotMatched = !showCannotMatched"
      >
        Show cannotMatched
      </el-checkbox>
      <el-checkbox
        :border="true"
        :model-value="showSuccessed"
        @change="showSuccessed = !showSuccessed"
      >
        Show successed
      </el-checkbox>
    </div>
    <el-row>
      <el-col :span="11">
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
      <el-col :span="2"></el-col>
      <el-col :span="11">
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

<script lang="ts">
import TextLong from '@/components/TextLong.vue'
import { makerPulls } from '@/hooks/maker-history'
import {
  computed,
  defineComponent,
  inject,
  reactive,
  ToRef,
  toRefs,
  watch,
} from 'vue'

export default defineComponent({
  components: { TextLong },
  setup() {
    const makerAddressSelected: ToRef<any> = inject('makerAddressSelected')

    const state = reactive({
      showSuccessed: false,
      showRejected: true,
      showCannotMatched: true,
    })

    const fromMakerPulls = makerPulls()
    const toMakerPulls = makerPulls()

    const getMakerPulls = () => {
      fromMakerPulls.get(makerAddressSelected.value, 1)
      toMakerPulls.get(makerAddressSelected.value, 0)
    }
    getMakerPulls()

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
        conditions.push(tx_status == 'finalized' && target_tx)
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

    // watchs
    watch(
      () => makerAddressSelected.value,
      () => {
        getMakerPulls()
      }
    )

    return {
      ...toRefs(state),

      fromList,
      fromLoading: fromMakerPulls.state.loading,

      toList,
      toLoading: toMakerPulls.state.loading,

      tableRowClassName,
    }
  },
})
</script>

<style lang="scss">
.maker-history {
  background: white;
  padding: 18px 36px;

  .maker-history__filter > * {
    margin-right: 20px;
    text-align: center;
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
