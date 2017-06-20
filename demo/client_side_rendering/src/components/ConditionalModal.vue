<template>
  <modal name="conditional-modal"
         :adaptive="true"
         @before-open="beforeOpen">
    <div style="padding:30px; text-align: center">
      Hello!
    </div>
  </modal>
</template>
<script>
export default {
  name: 'ConditionalModal',
  methods: {
    beforeOpen (event) {
      console.log('Event:', event)
      console.log('Params:', event.params)

      if (event.params.show === false) {
        event.stop()
      }
    },
  }
}
</script>
