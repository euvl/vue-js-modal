import Vue from 'vue';
import Modal from './Modal.vue';

const VueModal = {
  event: new Vue(),
  install(self, options = {}) {
    if (this.installed) {
      return console.log('Modal component is already installed.');
    }

    this.installed = true;

    const modal = {
      toggle(name, state, params) {
        const opts = typeof state === 'object' && typeof params === 'undefined'
          ? state
          : params;
        VueModal.event.$emit('toggle', name, state);
      },
      show(name, params = {}) {
        VueModal.event.$emit('toggle', name, true);
      },
      hide(name, params = {}) {
        VueModal.event.$emit('toggle', name, false);
      },
    };

    Object.defineProperty(Vue.prototype, '$modal', {
      get() {
        return modal;
      },
    });

    Vue.component('modal', Modal);
    return null;
  },
};

export default VueModal;
