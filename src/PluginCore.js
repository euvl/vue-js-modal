import { UNSUPPORTED_ARGUMENT_ERROR } from './utils/errors'
import { createDivInBody } from './utils'
import ModalsContainer from './components/ModalsContainer.vue'

const PluginCore = (Vue, options = {}) => {
  const subscription = new Vue()

  const context = {
    root: null,
    componentName: options.componentName || 'Modal'
  }

  const showStaticModal = (name, params) => {
    subscription.$emit('toggle', name, true, params)
  }

  const showDynamicModal = (
    component,
    componentProps,
    componentSlots,
    modalProps = {},
    modalEvents
  ) => {
    const container = context.root?.__modalContainer
    const defaults = options.dynamicDefaults || {}

    container?.add(
      component,
      componentProps,
      componentSlots,
      { ...defaults, ...modalProps },
      modalEvents
    )
  }

  /**
   * Creates a container for modals in the root Vue component.
   *
   * @param {Vue} parent
   */
  const setDynamicModalContainer = parent => {
    context.root = parent

    const element = createDivInBody()

    new Vue({
      parent,
      render: h => h(ModalsContainer)
    }).$mount(element)
  }

  const show = (...args) => {
    const [modal] = args

    switch (typeof modal) {
      case 'string':
        showStaticModal(...args)
        break

      case 'object':
      case 'function':
        showDynamicModal(...args)
        break

      default:
        console.warn(UNSUPPORTED_ARGUMENT_ERROR, modal)
    }
  }

  const hide = (name, params) => {
    subscription.$emit('toggle', name, false, params)
  }

  const hideAll = () => {
    subscription.$emit('hide-all')
  }

  const toggle = (name, params) => {
    subscription.$emit('toggle', name, undefined, params)
  }

  return {
    context,
    subscription,
    show,
    hide,
    hideAll,
    toggle,
    setDynamicModalContainer
  }
}

export default PluginCore
