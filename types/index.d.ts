import Vue, { PluginObject, ComponentOptions, AsyncComponent } from 'vue'

declare const VueJSModal: PluginObject<VueJSModalOptions> & {
  // rootInstance?: Vue
}

export default VueJSModal

export declare interface VueJSModalOptions {
  componentName?: string
  dialog?: boolean
}

declare interface VModal {
  show(name: string, params?: Record<string, any>): void
  show(
    component: typeof Vue | ComponentOptions<Vue> | AsyncComponent,
    componentProps?: object,
    modalProps?: object,
    modalEvents?: object
  ): void
  hide(name: string, params?: object): void
  hideAll(): void
  toggle(name: string, params?: object): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $modal: VModal
  }
}
