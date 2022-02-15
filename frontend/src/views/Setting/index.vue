<template>
  <div class="setting">
    <el-row :gutter="5">
      <el-col :span="12">
        <BalanceAlarm></BalanceAlarm>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
import BalanceAlarm from './BalanceAlarm.vue'

export default {
  components: { BalanceAlarm },
  setup() {},
}
</script>

<style lang="scss">
.setting {
  background-color: white;
  padding: 24px;
}
</style>
