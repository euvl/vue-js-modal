# vue-modal

A simple modal component for Vue.js

##Install

##Usage
Example:

main.js:
```js
import Vue from 'vue';
import App from './App';
import VueModal from 'vue-modal';

Vue.use(VueModal);

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});

```
App.vue:
```html
<template>
  <div id="app">
    <h1>Test page</h1>
    <button @click="modal('basic')">Show modal</button>
    <modal name="basic">Hello! Im a modal!</modal>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    modal(name) => this.$modal.show(name),
  },
};
</script>
```
##License
MIT
