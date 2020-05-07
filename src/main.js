import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './util/i18n'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

import './util/mq'
import './util/toasted'
import './util/axios'
import './util/bootstrap'
import 'font-awesome/css/font-awesome.css'
import './util/constants'
import './util/moment'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(datePicker)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
