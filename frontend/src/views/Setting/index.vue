<template>
  <div class="setting">
    <el-row :gutter="36">
      <el-col :span="12">
        <BalanceAlarm></BalanceAlarm>
      </el-col>
      <el-col :span="12">
        <DydxApiKeyCredentials></DydxApiKeyCredentials>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
import BalanceAlarm from './BalanceAlarm.vue'
import DydxApiKeyCredentials from './DydxApiKeyCredentials.vue'

export default {
  components: { BalanceAlarm, DydxApiKeyCredentials },
  setup() {},
}
</script>

<style lang="scss">
.setting {
  background-color: white;
  padding: 24px;
}
</style>
