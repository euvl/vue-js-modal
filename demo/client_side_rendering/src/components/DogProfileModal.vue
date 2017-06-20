<template>
  <modal name="dog-profile"
         classes="cute-dog-profile-photo"
         transition="scale"
         :height="260"
         :width="260"
         @opened="opened">
    <div slot="top-right" class="ct-top-right">
      HIDE THE DOGGY
    </div>
    <img src="/static/cute_dog.gif" />
  </modal>
</template>
<script>
export default {
  name: 'InputFocusModal',
  methods: {
    opened (event) {
    }
  }
}
</script>
<style lang="scss">
  .cute-dog-profile-photo {
    background-color: transparent;
    border-radius: 100%;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.65);

    img {
      width: 260px;
      height: 260px;
    }
  }

  .ct-top-right {
    cursor: pointer;
    padding-top: 20px;
    padding-right: 30px;
    font-weight: 600;
    color: white;
    text-shadow: 0 0px 20px black;
  }

  .scale-enter-active,
  .scale-leave-active {
    transition: all 0.5s;
  }

  .scale-enter,
  .scale-leave-active {
    opacity: 0;
    transform: scale(0.3) translateY(24px);
  }
</style>
