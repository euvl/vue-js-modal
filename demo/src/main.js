import Vue from 'vue'
import VueJsModal from 'plugin'
import App from './App.vue'

Vue.use(VueJsModal, {
  dialog: true,
  dynamicDefaults: {
    draggable: true
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
