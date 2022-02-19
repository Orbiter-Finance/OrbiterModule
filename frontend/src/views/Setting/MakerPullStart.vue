<template>
  <el-card class="setting__maker-pull-start">
    <template #header>
      <span>Transactions pull start</span>
    </template>
    <div class="setting__maker-pull-start__body" v-loading="state.loading">
      <el-form
        class="setting__maker-pull-start__form"
        ref="formRef"
        :model="state"
        label-width="140px"
        @submit.prevent
      >
        <el-form-item label="Total pull">
          <el-date-picker
            v-model="state.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="Increment pull">
          <el-date-picker
            v-model="state.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          ></el-date-picker>
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

const state = reactive({
  loading: false,
  date1: new Date()
})

const onSubmit = () => {}
const onReset = () => {}
</script>

<script lang="ts">
import { reactive } from 'vue';

export default {
  components: {},
  mounted() {},
}
</script>

<style lang="scss">
.setting__maker-pull-start {
  .setting__maker-pull-start__body {
    display: flex;
    flex-direction: row;
  }
}
</style>
