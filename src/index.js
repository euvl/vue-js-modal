import Modal from './components/Modal.vue'
import Dialog from './components/Dialog.vue'
import ModalsContainer from './components/ModalsContainer.vue'
import VueJsModal from './VueJsModal'

function plugin(Vue, options = {}) {
  const instance = new VueJsModal(Vue, options, {
    componentName: options.componentName || 'Modal'
  })

  Vue.prototype.$modal = instance
  /**
   * Sets custom component name (if provided)
   */
  Vue.component(instance.context.componentName, Modal)
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
        if (instance.rootInstance === null) {
          instance.rootInstance = this.$root
        }
      }
    })
  }
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export { Modal, Dialog, ModalsContainer, VueJsModal, version }
