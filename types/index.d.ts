import Vue, { PluginObject, ComponentOptions, AsyncComponent } from 'vue'

export declare interface VueJSModalOptions {
  componentName?: string
  dialog?: boolean
  dynamicDefaults?: object
}

declare const VueJSModal: PluginObject<VueJSModalOptions>

declare interface VModal {
  show(name: string, params?: object): void
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

export default VueJSModal
