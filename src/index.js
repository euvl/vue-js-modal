import Plugin from './Plugin'

export { default as Modal } from './components/Modal.vue'
export { default as Dialog } from './components/Dialog.vue'
// export { default as ModalsContainer } from './components/ModalsContainer.vue'

export const version = '__VERSION__'

// Install by default if using the script tag
// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(install)
// }

export default Plugin
