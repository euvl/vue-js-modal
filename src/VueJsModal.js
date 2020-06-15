import {
  UNMOUNTED_ROOT_ERROR_MESSAGE,
  DYNAMIC_MODAL_DISABLED_ERROR,
  UNSUPPORTED_ARGUMENT_ERROR,
  HIDE_ALL_RESTRICTION_ERROR
} from './utils/errors'
import { createDivInBody } from './utils'
import ModalsContainer from './components/ModalsContainer.vue'

class VueJsModal {
  constructor(Vue, options, context) {
    Object.defineProperty(this, 'context', {
      get: () => {
        return context
      }
    })
    this.options = options
    this.rootInstance = this.options.root || null
    this.Vue = Vue
    this.event = new this.Vue()
  }

  get subscription() {
    return this.event
  }

  showStaticModal(modal, params) {
    this.event.$emit('toggle', modal, true, params)
  }

  getModalsContainer(root) {
    if (!root._dynamicContainer && this.options.injectModalsContainer) {
      const container = createDivInBody()

      new this.Vue({
        parent: root,
        render: h => h(ModalsContainer)
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
    this.event.$emit('toggle', name, false, params)
  }

  hideAll() {
    if (this.options.dynamic) {
      this.event.$emit('hide-all')
    } else {
      console.warn(HIDE_ALL_RESTRICTION_ERROR)
    }
  }

  toggle(name, params) {
    this.event.$emit('toggle', name, undefined, params)
  }
}

export default VueJsModal
