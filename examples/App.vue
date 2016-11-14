<template>
  <div id="app">
    <h1>Test page</h1>
    <button @click="showModal('basic')">Show basic modal</button>
    <transition name="fade">
      <modal name="basic">Hello! Im basic modal!</modal>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    showModal(name) => this.$modal.show(name),
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
