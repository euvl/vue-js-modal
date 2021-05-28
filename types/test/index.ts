import Vue, { CreateElement } from "vue";
import VueJSModal, { VueJSModalOptions, Modal, Dialog, version } from "../index";

const versionTest: string = version

const createElement: CreateElement = undefined as unknown as CreateElement
createElement(Modal)
createElement(Dialog)

Vue.use(VueJSModal);
Vue.use<VueJSModalOptions>(VueJSModal, {
  componentName: "another-modal-name",
  dialog: false
});

const vm = new Vue({
  template: `<vue-modal name="awesome-modal"></vue-modal>`
}).$mount("#app");

vm.$modal.show("awesome-modal");
vm.$modal.hide("awesome-modal", { customeEvent: "customEventParam" });
vm.$modal.toggle("awesome-modal");
