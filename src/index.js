import Modal from './Modal.vue'
import Dialog from './Dialog.vue'
import ModalsContainer from './ModalsContainer.vue'

const defaultComponentName = 'modal'
const unmountedRootErrorMessage = 
  '[vue-js-modal] In order to render dynamic modals, a <modals-container> ' +
  'component must be present on the page'

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
    this.componentName = options.componentName || defaultComponentName
    /**
     * Plugin API
     */
    Vue.prototype.$modal = {
      show (modal, paramsOrProps, params, events = {}) {
        if (typeof modal === 'string') {
          Plugin.event.$emit('toggle', modal, true, paramsOrProps)
          return
        }

        const root = params && params.root
          ? params.root
          : Plugin.rootInstance
        
        const container = getModalsContainer(Vue, options, root)
        
        if (container) {
          container.add(modal, paramsOrProps, params, events)
          return
        }

        console.warn(unmountedRootErrorMessage)
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
    Vue.component(this.componentName, Modal)
    /**
     * Registration of <Dialog/> component
     */
    if (options.dialog) {
      Vue.component('v-dialog', Dialog)
    }
    /**
     * Registration of <ModalsContainer/> component
     */
    if (options.dynamic) {
      Vue.component('modals-container', ModalsContainer)
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

function getModalsContainer (Vue, options, root) {
  if (!root._dynamicContainer && options.injectModalsContainer) {
    const modalsContainer = document.createElement('div')
    document.body.appendChild(modalsContainer)

    new Vue({
      parent: root,
      render: h => h(ModalsContainer)
    }).$mount(modalsContainer)
  }

  return root._dynamicContainer
}

export default Plugin
