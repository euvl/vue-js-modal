import Modal from './components/Modal.vue'
import Dialog from './components/Dialog.vue'
import ModalsContainer from './components/ModalsContainer.vue'
import plugin from './VueJsModal'

const VueJsModal = new plugin()

const install = (Vue, options = {}) => {
  VueJsModal.init(Vue, options, {
    componentName: options.componentName || 'Modal'
  })
  Vue.prototype.$modal = VueJsModal
  /**
   * Sets custom component name (if provided)
   */
  Vue.component(VueJsModal.context.componentName, Modal)
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
        if (VueJsModal.rootInstance === null) {
          VueJsModal.rootInstance = this.$root
        }
      }
    })
  }
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}
VueJsModal.install = install
export default VueJsModal
const version = '__VERSION__'
// Export all components too
export { Modal, Dialog, ModalsContainer, VueJsModal, version }
