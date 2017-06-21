import Modal from './Modal.vue'

const Plugin = {
  install (Vue, options = {}) {
    if (this.installed) {
      return
    }

    this.installed = true
    this.event = new Vue()

    Vue.prototype.$modal = {
      show (name, params) {
        Plugin.event.$emit('toggle', name, true, params)
      },

      hide (name, params) {
        Plugin.event.$emit('toggle', name, false, params)
      },

      toggle (name, params) {
        Plugin.event.$emit('toggle', name, undefined, params)
      }
    }

    Vue.component('modal', Modal)
  }
}

export default Plugin
