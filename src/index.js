import Modal from './Modal.vue'
import Dialog from './Dialog.vue'

const defaultComponentName = 'modal'

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

    const componentName = options.componentName || defaultComponentName
    Vue.component(componentName, Modal)

    if (options.dialog) {
      Vue.component('v-dialog', Dialog)
    }
  }
}

export default Plugin
