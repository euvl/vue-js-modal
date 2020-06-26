import {
  UNMOUNTED_ROOT_ERROR_MESSAGE,
  DYNAMIC_MODAL_DISABLED_ERROR,
  UNSUPPORTED_ARGUMENT_ERROR,
  HIDE_ALL_RESTRICTION_ERROR
} from './utils/errors'
import { createDivInBody } from './utils'
import ModalsContainer from './components/ModalsContainer.vue'

class PluginCore {
  install(Vue, options = {}) {
    this.options = options
    this.Vue = Vue
    this.rootInstance = null
  }

  get context() {
    const { componentName } = this.options

    return {
      componentName: componentName || 'Modal'
    }
  }

  get subscription() {
    if (!this._pubsub) {
      this._pubsub = new this.Vue()
    }

    return this._pubsub
  }

  showStaticModal(modal, params) {
    this.subscription.$emit('toggle', modal, true, params)
  }

  getModalsContainer(root) {
    if (!root._dynamicContainer && this.options.injectModalsContainer) {
      const container = createDivInBody()

      new this.Vue({
        parent: root,
        render: (h) => h(ModalsContainer)
      }).$mount(container)
    }

    return root._dynamicContainer
  }

  showDynamicModal(modal, props, params, events) {
    const root = params && params.root ? params.root : this.rootInstance
    const container = this.getModalsContainer(root)
    /**
     * Show dynamic modal
     */
    const dynamicDefaults = this.options.dynamicDefaults || {}

    if (container) {
      container.add(modal, props, { ...dynamicDefaults, ...params }, events)
      return
    }

    console.warn(UNMOUNTED_ROOT_ERROR_MESSAGE)
  }

  show(modal, ...args) {
    switch (typeof modal) {
      case 'string': {
        return this.showStaticModal(modal, ...args)
      }

      case 'object':
      case 'function': {
        return this.options.dynamic
          ? this.showDynamicModal(modal, ...args)
          : console.warn(DYNAMIC_MODAL_DISABLED_ERROR)
      }

      default: {
        console.warn(UNSUPPORTED_ARGUMENT_ERROR, modal)
      }
    }
  }

  hide(name, params) {
    this.subscription.$emit('toggle', name, false, params)
  }

  hideAll() {
    if (this.options.dynamic) {
      this.subscription.$emit('hide-all')
    } else {
      console.warn(HIDE_ALL_RESTRICTION_ERROR)
    }
  }

  toggle(name, params) {
    this.subscription.$emit('toggle', name, undefined, params)
  }
}

export default PluginCore
