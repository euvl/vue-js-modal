import Vue        from 'vue'
import App        from './App.vue'
import VueJsModal from 'vue-js-modal'

Vue.use(VueJsModal)

new Vue({
  el: '#app',
  render: h => h(App)
})
