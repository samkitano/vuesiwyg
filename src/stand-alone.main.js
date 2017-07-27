/**
 * Vuesiwyg v1.0.1
 * stand-alone version
 * (c) 2017 Sam Kitano
 * @license MIT
 */
import Vue from 'vue'
import Vuex from 'vuex'
import Component from './Vuesiwyg.vue'
import config from './vuesiwyg-config'
import store from './vuex/store'

Vue.use(Vuex)

let vStore = store(config)
let vStoreData = {
  config,
  components: [
    'toolbar',
    'editable',
    'markup'
  ]
}

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.component('vuesiwyg', Object.assign({}, Component, {
  store: new Vuex.Store(vStore),
  data: function () {
    return vStoreData
  }
}))

/* eslint-disable no-unused-vars */
const app = new Vue({
  el: '#app'
})
