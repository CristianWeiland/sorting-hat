<template>
  <div>
    <bar-chart :chart-data="data" :options="options"></bar-chart>
  </div>
</template>

<script>
import { Bar, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

const BarChart = {
  extends: Bar,
  mixins: [ reactiveProp ],
  props: ['options'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options);
  },
};

export default {
  name: 'bar-chart-wrapper',
  components: {
    BarChart,
  },
  props: [ 'data', 'options' ],
};
</script>