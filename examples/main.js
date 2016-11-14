import Vue from 'vue';
import App from './App';
import VueModal from '../src/index';

Vue.use(VueModal);

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
