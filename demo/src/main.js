import Vue from 'vue'
import VueJsModal from 'plugin'
import App from './App.vue'

Vue.use(VueJsModal, {
  dialog: true,
  dynamic: true,
  dynamicDefaults: {
    foo: 'foo'
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
