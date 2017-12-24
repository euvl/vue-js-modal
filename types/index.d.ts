import Vue, { PluginObject } from "vue";

declare const VueJSModal: PluginObject<VueJSModalOptions>;
export default VueJSModal;

export declare interface VueJSModalOptions {
  componentName?: string;
  dialog?: boolean;
}

declare interface VModal {
  show(name: string, params?: object): void;
  hide(name: string, params?: object): void;
  toggle(name: string, params?: object): void;
}

declare module "vue/types/vue" {
  interface Vue {
    $modal: VModal;
  }
}
