<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button @click="showModal">Show modal</button>
    <transition name="fade">
      <modal name="hello">Hello!</modal>
    </transition>
  </div>
</template>

<script>
import Hello from './components/Hello';

export default {
  name: 'app',
  methods: {
    showModal() {
      this.$modal.toggle('hello', false);
    },
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
