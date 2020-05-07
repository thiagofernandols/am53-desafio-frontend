<template>
  <div>
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'

export default {
  name: 'ChatByIp',
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
      axios.get('/log/counttotalrequestsbyip')
        .then(response => {
          const series = []
          const categories = []
          response.data.forEach(element => {
            series.push(element[1])
            categories.push(element[0])
          })
          this.chartOptions = {
            chart: {
              height: 350,
              type: 'bar'
            },
            plotOptions: {
              bar: {
                columnWidth: '50%',
                endingShape: 'rounded'
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: 2
            },
            grid: {
              row: {
                colors: ['#fff', '#f2f2f2']
              }
            },
            xaxis: {
              labels: {
                rotate: -45
              },
              categories: categories,
              tickPlacement: 'on'
            },
            title: {
              text: this.$t('dashboard.top10'),
              align: 'center'
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'light',
                type: 'horizontal',
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 0.85,
                stops: [50, 0, 100]
              }
            }
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
