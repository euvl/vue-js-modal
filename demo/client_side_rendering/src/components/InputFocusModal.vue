<template>
  <modal name="input-focus-modal"
         :height="150"
         :adaptive="true"
         @opened="opened">
    <div style="padding: 30px; text-align: center">
      <input class="huge-font" type="text" placeholder="email" ref="email">
    </div>
  </modal>
</template>
<script>
export default {
  name: 'InputFocusModal',
  methods: {
    opened (event) {
      console.log(this.$refs.email)
    //  this.$refs.email.focus();
    }
  }
}
</script>
<style>
  input.huge-font {
    font-size: 70px;
    font-weight: 100;
    text-align: center;
    min-width: auto;
    width: 100%;
  }
</style>
