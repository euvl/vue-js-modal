<template>
  <div>
    <modal name="foo">bar</modal>
    <button @click="$modal.show('foo')">
      Open modal
    </button>
    <p>Hi from {{ name }}</p>
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
