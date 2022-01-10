<template>
  <div class="dashboard">
    <div class="dashboard-block">
      <el-row>
        <el-col :span="12">
          <canvas ref="chart1"></canvas>
        </el-col>
        <el-col :span="12">b</el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
// import TextLong from '@/components/TextLong.vue'
import { defineComponent } from 'vue'
import { Chart } from 'chart.js'

export default defineComponent({
  components: {
    // TextLong,
  },
  mounted() {
    const chart1Dom = this.$refs['chart1']

    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      '七月',
    ]
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'PV',
          backgroundColor: 'rgb(155, 155, 132)',
          borderColor: 'rgb(155, 155, 132)',
          data: [10, 12, 44, 12, 56, 40, 34],
        },
        {
          label: 'UV',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [19, 10, 5, 2, 20, 30, 45],
        },
      ],
    }
    // const myChart =
    new Chart(chart1Dom, {
      type: 'line',
      data,
      options: {
        elements: { line: { tension: 0.4 } },
      },
    })
  },
})
</script>

<style lang="scss">
.dashboard {
}
.dashboard-block {
  display: block;
  margin: 0 auto;
  padding: 12px;
  background-color: white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
</style>
