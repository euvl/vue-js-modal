<template>
  <modal name="conditional-modal"
         :adaptive="true"
         :max-width="1000"
         :max-height="400"
         width="80%"
         height="50%"
         @before-open="beforeOpen">
    <div style="padding:30px; text-align: center">
      Hello!
    </div>
  </modal>
</template>
<script>
export default {
  name: 'Modal_Conditional',
  methods: {
    beforeOpen(event) {
      console.log('Event:', event)
      console.log('Params:', event.params)

      if (event.params.show === false) {
        event.cancel()
      }
    }
  }
}
</script>
