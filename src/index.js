import Modal from './Modal.vue'
import Dialog from './Dialog.vue'
import ModalsContainer from './ModalsContainer.vue'
import { createDivInBody } from './utils'

const defaultComponentName = 'Modal'

const UNMOUNTED_ROOT_ERROR_MESSAGE =
  '[vue-js-modal] ' +
  'In order to render dynamic modals, a <modals-container> ' +
  'component must be present on the page.'

const DYNAMIC_MODAL_DISABLED_ERROR =
  '[vue-js-modal] ' +
  '$modal() received object as a first argument, but dynamic modals are ' +
  'switched off. https://github.com/euvl/vue-js-modal/#dynamic-modals'

const UNSUPPORTED_ARGUMENT_ERROR =
  '[vue-js-modal] ' +
  '$modal() received an unsupported argument as a first argument.'

export const getModalsContainer = (Vue, options, root) => {
  if (!root._dynamicContainer && options.injectModalsContainer) {
    const container = createDivInBody()

    new Vue({
      parent: root,
      render: h => h(ModalsContainer)
    }).$mount(container)
  }

  return root._dynamicContainer
}

const Plugin = {
  install (Vue, options = {}) {
    /**
     * Makes sure that plugin can be installed only once
     */
    if (this.installed) {
      return
    }

    this.installed = true
    this.event = new Vue()
    this.rootInstance = null

    const componentName = options.componentName || defaultComponentName
    const dynamicDefaults = options.dynamicDefaults || {}
    /**
     * Plugin API
     */
    const showStaticModal = (modal, params) => {
      Plugin.event.$emit('toggle', modal, true, params)
    }

    const showDynamicModal = (modal, props, params, events) => {
      /**
       * Get root for dynamic modal
       */
      const root = params && params.root ? params.root : Plugin.rootInstance
      const container = getModalsContainer(Vue, options, root)
      /**
       * Show dynamic modal
       */
      if (container) {
        container.add(modal, props, { ...dynamicDefaults, ...params }, events)
        return
      }

      console.warn(UNMOUNTED_ROOT_ERROR_MESSAGE)
    }

    Vue.prototype.$modal = {
      show (modal, ...args) {
        switch (typeof modal) {
          case 'string': {
            return showStaticModal(modal, ...args)
          }
          case 'object':
          case 'function': {
            return options.dynamic
              ? showDynamicModal(modal, ...args)
              : console.warn(DYNAMIC_MODAL_DISABLED_ERROR)
          }
          default: {
            console.warn(UNSUPPORTED_ARGUMENT_ERROR, modal)
          }
        }
      },
      hide (name, params) {
        Plugin.event.$emit('toggle', name, false, params)
      },
      toggle (name, params) {
        Plugin.event.$emit('toggle', name, undefined, params)
      }
    }
    /**
     * Sets custom component name (if provided)
     */
    Vue.component(componentName, Modal)
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
        beforeMount () {
          if (Plugin.rootInstance === null) {
            Plugin.rootInstance = this.$root
          }
        }
      })
    }
  }
}

export default Plugin
