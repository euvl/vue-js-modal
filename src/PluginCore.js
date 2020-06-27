import { UNSUPPORTED_ARGUMENT_ERROR } from './utils/errors'
import { createDivInBody } from './utils'
import ModalsContainer from './components/ModalsContainer.vue'

class PluginCore {
  constructor(Vue, options = {}) {
    this.options = options
    this.Vue = Vue
    this.root = null
    this.subscription = new Vue()

    this.showStaticModal = this.showStaticModal.bind(this)
    this.showDynamicModal = this.showDynamicModal.bind(this)
    this.setDynamicModalContainer = this.setDynamicModalContainer.bind(this)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.hideAll = this.hideAll.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  get context() {
    const { componentName } = this.options

    return {
      componentName: componentName || 'Modal'
    }
  }

  showStaticModal(modal, params) {
    this.subscription.$emit('toggle', modal, true, params)
  }
  /**
   * Creates a container for modals in the root Vue component.
   *
   * @param {Vue} parent
   */
  setDynamicModalContainer(parent) {
    this.root = parent

    const element = createDivInBody()

    new this.Vue({
      parent,
      render: h => h(ModalsContainer)
    }).$mount(element)
  }

  showDynamicModal(modal, props, params, events) {
    const container = this.root?.__modalContainer
    const dynamicDefaults = this.options.dynamicDefaults || {}

    container?.add(modal, props, { ...dynamicDefaults, ...params }, events)
  }

  show(modal, ...args) {
    switch (typeof modal) {
      case 'string':
        this.showStaticModal(modal, ...args)
        break

      case 'object':
      case 'function':
        this.showDynamicModal(modal, ...args)
        break

      default:
        console.warn(UNSUPPORTED_ARGUMENT_ERROR, modal)
    }
  }

  hide(name, params) {
    this.subscription.$emit('toggle', name, false, params)
  }

  hideAll() {
    this.subscription.$emit('hide-all')
  }

  toggle(name, params) {
    this.subscription.$emit('toggle', name, undefined, params)
  }
}

export default PluginCore
