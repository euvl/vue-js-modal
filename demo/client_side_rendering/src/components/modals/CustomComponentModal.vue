<template>
  <div class="example-modal-content">
    <h1>This is a custom component</h1>
    <p>{{ text }}</p>
    <button class="btn" @click="secondModelOpen">new Modal</button>
  </div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    secondModelOpen() {
      this.$modal.show({
          template: `
            <div class="example-modal-content">
              <h1>This is created inline</h1>
              <p>{{ text }}</p>
            </div>
          `,
          props: ['text']
        }, {
          text: 'This text is passed as a property'
        })
    }
  }
}
</script>
