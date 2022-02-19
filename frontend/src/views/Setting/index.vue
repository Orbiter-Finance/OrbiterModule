<template>
  <div class="setting">
    <el-row :gutter="36">
      <el-col :span="12">
        <BalanceAlarm></BalanceAlarm>
      </el-col>
      <el-col :span="12">
        <MakerPullStart></MakerPullStart>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
import BalanceAlarm from './BalanceAlarm.vue'
import MakerPullStart from './MakerPullStart.vue'

export default {
  components: { BalanceAlarm, MakerPullStart },
  setup() {},
}
</script>

<style lang="scss">
.setting {
  background-color: white;
  padding: 24px;
}
</style>
