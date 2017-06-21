<template>
  <div>
    <modal name="foo" :width="300" :height="140">
      Woot
    </modal>
    <p>Hi from <b>{{ name }}</b>.</p>
    <button @click="$modal.show('foo')">
      Open modal
    </button>
  </div>
</template>

<script>
export default {
  asyncData ({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  }
}
</script>
<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 50px;
}

.v--modal {
  text-align: center;
  padding: 50px;
}
</style>
