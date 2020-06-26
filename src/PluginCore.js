import {
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

  setDynamicModalContainer(root) {
    this.root = root

    const element = createDivInBody()

    new this.Vue({
      parent: this.root,
      render: (h) => h(ModalsContainer)
    }).$mount(element)
  }

  showDynamicModal(modal, props, params, events) {
    const { options, root } = this

    const container = root && root._modalContainer
    const dynamicDefaults = options.dynamicDefaults || {}

    if (container) {
      container.add(modal, props, { ...dynamicDefaults, ...params }, events)
    }
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
    console.log(this)
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
