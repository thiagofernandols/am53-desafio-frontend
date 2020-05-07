import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  iconPack: 'fontawesome',
  duration: 10000
})

Vue.toasted.register(
  'defaultSuccess',
  payload => !payload.msg ? 'Operation performed successfully!' : payload.msg,
  { type: 'success', icon: 'check' }
)

Vue.toasted.register(
  'defaultError',
  payload => !payload.msg ? 'Unexpected error.' : payload.msg,
  { type: 'error', icon: 'times' }
)

Vue.toasted.register(
  'info',
  payload => !payload.msg ? 'Info!' : payload.msg,
  { type: 'info', icon: 'info' }
)
