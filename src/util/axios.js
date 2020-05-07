import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import CripVueLoading from 'crip-vue-loading'

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT || 'http://localhost:9090'

Vue.use(CripVueLoading, {
  axios,
  color: '#007bff',
  failColor: '#dc3545',
  height: '3px'
})

const success = res => {
  store.dispatch('hidePreload')
  return res
}
const error = err => {
  store.dispatch('hidePreload')
  if (!err.response) {
    Vue.toasted.global.defaultError({ msg: 'Unavailable service' })
  } else {
    Vue.toasted.global.defaultError({ msg: err.response.data.message ? err.response.data.message : 'unexpected error' })
    return Promise.reject(err)
  }
}

axios.interceptors.response.use(success, error)
