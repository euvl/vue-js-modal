import Modal from './components/Modal.vue'
import Dialog from './components/Dialog.vue'
import PluginCore from './PluginCore'

const Plugin = {
  install(Vue, options = {}) {
    const plugin = new PluginCore(Vue, options)

    Object.defineProperty(Vue.prototype, '$modal', {
      get: function() {
        /**
         * The "this" scope is the scope of the component that calls this.$modal
         */
        const caller = this
        /**
         * The this.$modal can be called only from inside the vue components so this check is not really needed...
         */
        if (caller instanceof Vue) {
          const root = caller.$root

          if (!plugin.root) {
            plugin.setDynamicModalContainer(root)
          }
        }

        return plugin
      }
    })

    /**
     * Sets custom component name (if provided)
     */
    Vue.component(plugin.context.componentName, Modal)

    /**
     * Registration of <Dialog/> component
     */
    if (options.dialog) {
      Vue.component('VDialog', Dialog)
    }
  }
}

export default Plugin
