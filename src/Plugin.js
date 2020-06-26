import Modal from './components/Modal.vue'
import Dialog from './components/Dialog.vue'
import PluginCore from './PluginCore'

class Plugin extends PluginCore {
  constructor() {
    super()
  }

  install(Vue, options = {}) {
    super.install(Vue, options)

    Vue.prototype.$modal = this
    /**
     * Sets custom component name (if provided)
     */
    Vue.component(this.context.componentName, Modal)
    /**
     * Registration of <Dialog/> component
     */
    if (options.dialog) {
      Vue.component('VDialog', Dialog)
    }
    /**
     * Registration of <ModalsContainer/> component
     */
    if (options.dynamic) {
      const plugin = this

      Vue.mixin({
        beforeMount() {
          if (!plugin.root) {
            plugin.setDynamicModalContainer(this.$root)
          }
        }
      })
    }
  }
}

export default Plugin
