<template>
  <div class="home">
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div style="display: flex">
      <div>
        <el-date-picker
          v-model="rangeDate"
          type="datetimerange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <div>
        <el-date-picker
          v-model="rangeDate"
          type="datetimerange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <div>
        <el-date-picker
          v-model="rangeDate"
          type="datetimerange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          :clearable="false"
        >
        </el-date-picker>
      </div>
    </div>

    <el-row :gutter="20">
      <el-col :span="8">
        <div class="title">From chain</div>
        <el-select v-model="chainIndex" placeholder="Select">
          <el-option
            v-for="(item, index) in chains"
            :key="index"
            :label="item"
            :value="index"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
        <div class="title">
          From date range
          <!-- <span style="font-size: 12px"
              >(Earliest: 2017-10-11 10:20:30, updating...)</span
            > -->
        </div>
        <el-date-picker
          v-model="rangeDate"
          type="datetimerange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          :clearable="false"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="6"> </el-col>
    </el-row>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return { rangeDate: [] }
  },
  components: {
    HelloWorld,
  },
}
</script>
