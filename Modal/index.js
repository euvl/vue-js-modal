import Vue from 'vue';
import Modal from './Modal.vue';

const VueModal = {
  install(Vue, options = {}) {
    if (!this.hasOwnProperty("event")) {
      this.event = new Vue();
    }

    const $modal = {
      show(name, params) {
        VueModal.event.$emit('toggle', name, true, params);
      },
      hide(name, params) {
        VueModal.event.$emit('toggle', name, false, params);
      }
    };

    Object.defineProperty(Vue.prototype, '$modal', {
      get: () => $modal
    });

    Vue.component('nice-modal', Modal);
    return null;
  },
};

Vue.use(VueModal);

export default VueModal;
