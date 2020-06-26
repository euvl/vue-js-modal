import Modal from './components/Modal.vue'
import Dialog from './components/Dialog.vue'
import ModalsContainer from './components/ModalsContainer.vue'

import PluginCore from './PluginCore'

class Plugin extends PluginCore {
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
      Vue.component('ModalsContainer', ModalsContainer)

      Vue.mixin({
        beforeMount() {
          if (this.rootInstance === null) {
            this.rootInstance = this.$root
          }
        }
      })
    }
  }
}

export default Plugin
