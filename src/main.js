import Vue from 'vue'
import Vuex from 'vuex'
import VueSiWyg from './Vuesiwyg.vue'
import config from './vuesiwyg-config'
import createModule from './vuex/store'

Vue.use(Vuex)

let vStore = createModule(config)
let data = {
  config,
  components: [
    'toolbar',
    'editable',
    'markup'
  ]
}

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.component('Vuesiwyg', Object.assign({}, VueSiWyg, {
  store: new Vuex.Store(vStore),
  data: function () {
    return data
  }
}))

/* eslint-disable no-unused-vars */
const app = new Vue({
  el: '#app'
})
