import Vue    from 'vue'
import Modal  from './Modal.vue'

const ModalPlugin = {
  install(Vue, options = {}) {
    if (!this.hasOwnProperty("event")) {
      this.event = new Vue()
    }

    const $modal = {
      show(name, params) {
        ModalPlugin.event.$emit('toggle', name, true, params)
      },
      hide(name, params) {
        ModalPlugin.event.$emit('toggle', name, false, params)
      }
    }

    Object.defineProperty(Vue.prototype, '$modal', {
      get: () => $modal
    })

    Vue.component('modal', Modal)
    return null
  },
}

Vue.use(ModalPlugin)

export default ModalPlugin
