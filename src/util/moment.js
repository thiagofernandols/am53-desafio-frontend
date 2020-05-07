import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(value.split('T')[0]).format('DD/MM/YYYY')
  }
})

Vue.filter('formatDateTime', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm:ss.SSS')
  }
})

Vue.filter('formatDateTime2', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm')
  }
})
