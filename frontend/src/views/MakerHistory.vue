<template>
  <div class="maker-history">
    <el-row>
      <el-col :span="11">
        <h3>In</h3>
        <el-table :data="toList" style="width: 100%" v-loading="fromLoading">
          <el-table-column label="Chain" width="90">
            <template #default="scope">
              <span class="amount-operator--plus">
                + {{ scope.row.chainName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="Hash" width="180">
            <template #default="scope">
              <a :href="scope.row.txHashHref" target="_blank">
                <TextLong :content="scope.row.txHash">{{
                  scope.row.txHash
                }}</TextLong>
              </a>
            </template>
          </el-table-column>
          <el-table-column label="Time">
            <template #default="scope">
              <TextLong :content="scope.row.txTime">
                {{ scope.row.txTimeAgo }}
              </TextLong>
            </template>
          </el-table-column>
          <el-table-column prop="amountFormat" label="Amount" />
          <el-table-column prop="tx_status" label="Status" />
        </el-table>
      </el-col>
      <el-col :span="2"></el-col>
      <el-col :span="11">
        <h3>Out</h3>
        <el-table :data="fromList" style="width: 100%" v-loading="toLoading">
          <el-table-column label="Chain" width="90">
            <template #default="scope">
              <span class="amount-operator--minus">
                - {{ scope.row.chainName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="Hash" width="180">
            <template #default="scope">
              <a :href="scope.row.txHashHref" target="_blank">
                <TextLong :content="scope.row.txHash">{{
                  scope.row.txHash
                }}</TextLong>
              </a>
            </template>
          </el-table-column>
          <el-table-column label="Time">
            <template #default="scope">
              <TextLong :content="scope.row.txTime">
                {{ scope.row.txTimeAgo }}
              </TextLong>
            </template>
          </el-table-column>
          <el-table-column prop="amountFormat" label="Amount" />
          <el-table-column prop="tx_status" label="Status" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import TextLong from '@/components/TextLong.vue'
import { makerPulls } from '@/hooks/maker-history'
import { defineComponent, inject, ToRef, watch } from 'vue'

export default defineComponent({
  components: { TextLong },
  setup() {
    const makerAddressSelected: ToRef<any> = inject('makerAddressSelected')

    const fromMakerPulls = makerPulls()
    const toMakerPulls = makerPulls()

    const getMakerPulls = () => {
      fromMakerPulls.get(makerAddressSelected.value, 1)
      toMakerPulls.get(makerAddressSelected.value, 0)
    }
    getMakerPulls()

    // watchs
    watch(
      () => makerAddressSelected.value,
      () => {
        getMakerPulls()
      }
    )

    return {
      fromList: fromMakerPulls.list,
      fromLoading: fromMakerPulls.loading,

      toList: toMakerPulls.list,
      toLoading: toMakerPulls.loading,
    }
  },
})
</script>

<style lang="scss">
.maker-history {
  background: white;
  padding: 18px 36px;

  a {
    color: #{var(--el-table-font-color)};
    text-decoration: none;

    &:hover {
      color: #{var(--el-color-primary)};
    }
  }
}
</style>
