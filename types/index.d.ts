import Vue, { PluginObject, ComponentOptions, AsyncComponent } from "vue";

declare const VueJSModal: PluginObject<VueJSModalOptions> & {
  rootInstance?: Vue
};

export default VueJSModal;

export declare interface VueJSModalOptions {
  componentName?: string;
  dialog?: boolean;
}

declare interface VModal {
  show(modal: string 
    | typeof Vue 
    | ComponentOptions<Vue> 
    | AsyncComponent, paramsOrProps?: object, params?: object, events?: object): void;
  hide(name: string, params?: object): void;
  toggle(name: string, params?: object): void;
}

declare module "vue/types/vue" {
  interface Vue {
    $modal: VModal;
  }
}
