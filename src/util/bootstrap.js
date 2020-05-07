import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faPlus, faPencilAlt, faTrashAlt, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(BootstrapVue)

library.add(faSearch, faPlus, faPencilAlt, faTrashAlt, faUpload)

Vue.component('font-awesome-icon', FontAwesomeIcon)
