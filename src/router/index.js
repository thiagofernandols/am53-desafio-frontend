import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Home from '@/views/home/Home.vue'
import DataLog from '@/views/data-log/DataLog.vue'
import DataLogForm from '@/views/data-log/DataLogForm.vue'

Vue.use(VueRouter)

Vue.prototype.$routeDashboard = { name: 'Dashboard', path: '/' }
Vue.prototype.$routeDataLog = { name: 'DataLog', path: '/logs' }
Vue.prototype.$routeDataLogForm = { name: 'DataLogForm', path: '/logs/:id' }

const routes = [
  {
    path: '*',
    redirect: Vue.prototype.$routeDashboard.path
  },
  {
    path: Vue.prototype.$routeDashboard.path,
    name: Vue.prototype.$routeDashboard.name,
    component: Home,
    meta: {
      breadcrumb: [
        { text: 'Dashboard' }
      ]
    }
  },
  {
    path: Vue.prototype.$routeDataLog.path,
    name: Vue.prototype.$routeDataLog.name,
    component: DataLog,
    meta: {
      breadcrumb: [
        { text: 'Dashboard', href: Vue.prototype.$routeDashboard.path, to: { name: Vue.prototype.$routeDashboard.name } },
        { text: 'Logs' }
      ]
    }
  },
  {
    path: Vue.prototype.$routeDataLogForm.path,
    name: Vue.prototype.$routeDataLogForm.name,
    component: DataLogForm,
    meta: {
      breadcrumb: [
        { text: 'Dashboard', href: Vue.prototype.$routeDashboard.path, to: { name: Vue.prototype.$routeDashboard.name } },
        { text: 'Logs', href: Vue.prototype.$routeDataLog.path, to: { name: Vue.prototype.$routeDataLog.name } },
        { text: 'Cadastro' }
      ]
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  to.matched.some(record => store.commit('setBreadcrumb', record.meta.breadcrumb))
  store.commit('preload', false)
  next()
})

export default router
