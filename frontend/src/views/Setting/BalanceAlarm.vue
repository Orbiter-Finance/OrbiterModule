<template>
  <el-card class="setting__balance-alarm">
    <template #header>
      <span>Balance alarm</span>
    </template>
    <div class="setting__balance-alarm__body" v-loading="state.loading">
      <div class="setting__balance-alarm__menu">
        <el-menu
          v-if="state.chainId > 0"
          :default-active="String(state.chainId)"
          v-model="state.chainId"
          @select="(v) => (state.chainId = Number(v))"
        >
          <el-menu-item
            v-for="item in chains"
            :index="String(item.id)"
            :key="item.id"
          >
            <span>{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <el-form
        class="setting__balance-alarm__form"
        ref="formRef"
        :model="state"
        label-width="140px"
        @submit.prevent
      >
        <el-form-item label="Select token">
          <el-radio-group v-model="state.tokenAddress">
            <el-radio
              v-for="(item, index) in baselines"
              :label="item.tokenAddress"
              :key="index"
              border
            >
              {{ item.tokenName }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Alarm baseline">
          <el-input
            style="width: 250px"
            type="number"
            :model-value="baselineValue"
            :step="5"
            placeholder="Less than this value will alarm."
            @input="onInputBaselineValue"
          />
        </el-form-item>
        <el-form-item label="Current Balance">
          <span
            style="
              color: var(--el-input-text-color, var(--el-text-color-regular));
            "
            >{{ balanceValue }}</span
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Submit</el-button>
          <el-button @click="onReset">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup lang="ts">
const makerAddressSelected: any = inject('makerAddressSelected')

const state = reactive({
  chainId: 0,
  tokenAddress: '',

  loading: toRef(balanceAlarms.state, 'loading'),
})

// computeds
const chains = computed(() => {
  const _chains = [] as any[]
  for (const item of balanceAlarms.state.list) {
    _chains.push({ id: item.chainId, name: item.chainName })
  }
  return _chains
})
const baselines = computed(() => {
  for (const item of balanceAlarms.state.list) {
    if (item.chainId == state.chainId) {
      return item.baselines
    }
  }
  return []
})
const baselineValue = computed(() => {
  for (const item of baselines.value) {
    if (item.tokenAddress == state.tokenAddress) {
      return item.value
    }
  }
  return ''
})
const balanceValue = computed(() => {
  let balance: string | undefined = '0'
  let tokenName = ''
  for (const item of baselines.value) {
    if (item.tokenAddress == state.tokenAddress) {
      balance = item.balance
      tokenName = item.tokenName
      break
    }
  }
  return `${balance} ${tokenName}`
})

const getBalanceAlarms = () => {
  balanceAlarms.get(makerAddressSelected?.value)
}
getBalanceAlarms()

const refreshChainIdAndTokenAddress = () => {
  const { list } = balanceAlarms.state

  if (list.length < 1) {
    return
  }

  let nvItem = list.find((item) => item.chainId == state.chainId)
  if (!nvItem) {
    nvItem = list[0]
    state.chainId = nvItem.chainId
  }

  if (nvItem.baselines.length < 1) {
    return
  }

  const targetBaselines = nvItem.baselines.find(
    (item) => item.tokenAddress == state.tokenAddress
  )

  if (!targetBaselines) {
    state.tokenAddress = nvItem.baselines[0].tokenAddress
  }
}

// watchs
watch(
  () => makerAddressSelected?.value,
  () => {
    getBalanceAlarms()
  }
)
watch(
  () => balanceAlarms.state.list,
  () => refreshChainIdAndTokenAddress()
)
watch(
  () => state.chainId,
  () => refreshChainIdAndTokenAddress()
)

// Events
const onInputBaselineValue = (v: any) => {
  for (const item of balanceAlarms.state.list) {
    if (item.chainId != state.chainId) {
      continue
    }

    const target = item.baselines.find(
      (item1) => item1.tokenAddress == state.tokenAddress
    )
    if (target) {
      target.value = v
      break
    }
  }
}

const onSubmit = () => {
  balanceAlarms.save(makerAddressSelected?.value)
}
const onReset = () => {
  onInputBaselineValue(balanceAlarms.state.defaultBaseline)
}
</script>

<script lang="ts">
import { balanceAlarms } from '@/hooks/setting'
import { computed, inject, reactive, toRef, watch } from 'vue'

export default {
  components: {},
  mounted() {},
}
</script>

<style lang="scss">
.setting__balance-alarm {
  .setting__balance-alarm__body {
    display: flex;
    flex-direction: row;

    .setting__balance-alarm__menu {
      width: auto;
      min-width: 120px;

      .el-menu-item.is-active {
        background-color: var(--el-menu-hover-bg-color);
      }

      ul {
        height: 100%;
      }
    }

    .setting__balance-alarm__form {
      flex: 1;
    }
  }
}
</style>
