<template>
  <div>
    <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'

export default {
  name: 'ChatByHour',
  components: {
    apexchart: VueApexCharts
  },
  data: function () {
    return {
      series: [{ data: [] }],
      chartOptions: {
        xaxis: {
          categories: []
        }
      }
    }
  },
  methods: {
    findCountByIp: function () {
      this.$store.dispatch('showPreload')
      axios.get('/log/counttotalrequestsbyhour')
        .then(response => {
          const series = []
          const categories = []
          response.data.forEach(element => {
            series.push(element[1])
            categories.push(this.$options.filters.formatDateTime2(element[0]))
          })
          this.chartOptions = {
            chart: {
              height: 350,
              type: 'area',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: this.$t('dashboard.acessosHoras'),
              align: 'center'
            },
            xaxis: {
              labels: {
                rotate: -45
              },
              categories: categories,
              tickPlacement: 'on'
            },
            legend: {
              horizontalAlign: 'left'
            },
            colors: ['#ff1a1a']
          }
          this.series = [{
            name: this.$t('dashboard.qtdAcessos'),
            data: series
          }]
        })
    }
  },
  created: function () {
    this.findCountByIp()
  }
}
</script>
