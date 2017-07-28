import Vue from 'vue'
import Vuex from 'vuex'
import Component from 'vuesiwyg/src/Vuesiwyg.vue'
import config from 'vuesiwyg/src/vuesiwyg-config.js'
import store from 'vuesiwyg/src/vuex/store.js'
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

/* eslint-disable no-new */
const vuesiwyg = Vue.component('vuesiwyg', Object.assign({}, Component, {
  store: new Vuex.Store(vStore),
  data: function () {
    return vStoreData
  }
}))

export default vuesiwyg
