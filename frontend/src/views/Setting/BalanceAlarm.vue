<template>
  <el-card class="setting__balance-alarm">
    <template #header>
      <span>Balance alarm</span>
    </template>
    <div class="setting__balance-alarm__body">
      <div class="setting__balance-alarm__menu">
        <el-menu default-active="2">
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
        :model="form"
        label-width="140px"
        @submit.prevent="true"
        @submit.stop="() => { console.log('xxxxxx') }"
      >
        <el-form-item label="Select token">
          <el-radio-group v-model="form.token">
            <el-radio label="ETH"></el-radio>
            <el-radio label="USDC"></el-radio>
            <el-radio label="USDT"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Alarm baseline">
          <el-input-number style="min-width: 240px" v-model="form.baseline" :step="5"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Submit</el-button>
          <el-button>Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup lang="ts">
const form = reactive({
  token: '',
  baseline: 1,
})

const chains = ref([
  { id: 5, name: 'rinkeby' },
  { id: 22, name: 'arbitrum_test' },
  { id: 33, name: 'zksync_test' },
  { id: 66, name: 'polygon_test' },
])

const onSubmit = () => {
  console.log('submit!')
}
</script>

<script lang="ts">
import { reactive, ref } from 'vue'

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
