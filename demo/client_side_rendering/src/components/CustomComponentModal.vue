<template>
  <div class="example-modal-content">
    <h1>This is a custom component</h1>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>
