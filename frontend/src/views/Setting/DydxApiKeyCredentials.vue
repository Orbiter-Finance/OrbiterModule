<template>
  <el-card class="setting__dydx-api-key-credentials">
    <template #header>
      <span>Dydx Api Key Credentials</span>
    </template>
    <div
      class="setting__dydx-api-key-credentials__body"
      v-loading="state.loading"
    >
      <el-form
        class="setting__dydx-api-key-credentials__form"
        ref="formRef"
        :model="state"
        label-width="140px"
        @submit.prevent
      >
        <el-form-item label="Key">
          <el-input
            style="width: 320px"
            :model-value="makerApiKeyCredentials && makerApiKeyCredentials.key"
            placeholder="Input dYdX key."
            @input="onInputApiKeyCredentials('key', $event)"
          />
        </el-form-item>
        <el-form-item label="Secret">
          <el-input
            style="width: 320px"
            :model-value="
              makerApiKeyCredentials && makerApiKeyCredentials.secret
            "
            placeholder="Input dYdX secret."
            @input="onInputApiKeyCredentials('secret', $event)"
          />
        </el-form-item>
        <el-form-item label="Passphrase">
          <el-input
            style="width: 320px"
            :model-value="
              makerApiKeyCredentials && makerApiKeyCredentials.passphrase
            "
            placeholder="Input dYdX passphrase."
            @input="onInputApiKeyCredentials('passphrase', $event)"
          />
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
  loading: toRef(dydxApiKeyCredentials.state, 'loading'),
  date1: new Date(),
})

const makerApiKeyCredentials = computed(() => {
  return dydxApiKeyCredentials.state.apiKeyCredentials[makerAddressSelected?.value]
})

const onInputApiKeyCredentials = (key: string, value: string) => {
  const { apiKeyCredentials } = dydxApiKeyCredentials.state
  if (!apiKeyCredentials[makerAddressSelected?.value]) {
    apiKeyCredentials[makerAddressSelected?.value] = {
      key: '',
      secret: '',
      passphrase: '',
    }
  }
  apiKeyCredentials[makerAddressSelected?.value][key] = value
}
const onSubmit = () => {
  dydxApiKeyCredentials.save()
}
const onReset = () => {
  delete dydxApiKeyCredentials.state.apiKeyCredentials[makerAddressSelected?.value]
}
</script>

<script lang="ts">
import { dydxApiKeyCredentials } from '@/hooks/setting'
import { computed, inject, reactive, toRef } from 'vue'

export default {
  components: {},
  mounted() {},
}
</script>

<style lang="scss">
.setting__dydx-api-key-credentials {
  .setting__dydx-api-key-credentials__body {
    display: flex;
    flex-direction: row;
  }
}
</style>
