import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuVisible: true,
    preload: false,
    breadcrumb: null
  },
  mutations: {
    preload (store, value) {
      store.preload = value
    },
    toggleMenu (state, isVisible) {
      if (isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible
      } else {
        state.isMenuVisible = isVisible
      }
    },
    setBreadcrumb: (state, breadcrumb) => {
      state.breadcrumb = breadcrumb
    }
  },
  actions: {
    setBreadcrumb (context, breadcrumb) {
      context.commit('setBreadcrumb', breadcrumb)
    },
    showPreload (dispatch) {
      dispatch.commit('preload', true)
    },
    hidePreload (dispatch) {
      dispatch.commit('preload', false)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
