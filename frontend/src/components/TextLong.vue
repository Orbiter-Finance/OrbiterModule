<template>
  <el-popover
    popper-class="text-long--popper"
    :placement="placement"
    width="max-content"
    trigger="hover"
    :content="content"
    :offset="offset"
  >
    <template #reference>
      <div class="text-long"><slot></slot></div>
    </template>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextLong',
  props: {
    content: String,
    placement: {
      type: String,
      default: 'top',
    },
    offset: {
      type: Number,
      default: 0,
    },
  },
})
</script>

<style lang="scss" scoped>
.text-long {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<style lang="scss">
.text-long--popper.el-popover.el-popper {
  background: #222222;
  color: white;
  min-width: 0;

  .el-popper__arrow::before {
    background: #222222;
  }
}
</style>
