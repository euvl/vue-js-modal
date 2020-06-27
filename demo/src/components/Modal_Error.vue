<template>
  <modal
    name="error-modal"
    :classes="['error-modal', hasBugs && 'has-bugs']"
    :width="400"
    height="auto"
    :adaptive="true"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="error-modal-content">
      <div class="bugs-label">bugs: {{ bugCount }}</div>
      <button @click="createBug">Create a bug</button>
      <button @click="fixBug">Fix a bug</button>

      <div style="padding: 10px;">
        You will be able to close the window only if you have fixed all the bugs
        :)
      </div>
      <sub :style="{ opacity: hasBugs ? 1 : 0 }">
        {{ bugCount }} bugs to fix
      </sub>
    </div>
  </modal>
</template>
<script>
export default {
  name: 'DemoErrorModal',
  data() {
    return {
      bugCount: 0,
      message: '',
      hasBugs: false
    }
  },
  methods: {
    createBug() {
      this.bugCount++
    },

    fixBug() {
      this.bugCount = Math.max(this.bugCount - 1, 0)
      this.hasBugs = false
    },

    beforeOpen() {
      this.bugCount = Math.round(Math.random() * 3) + 1
    },

    beforeClose(event) {
      if (this.bugCount > 0) {
        this.hasBugs = true
        /*
        Stopping close event execution
        */
        event.cancel()
      }
    }
  }
}
</script>
<style lang="scss">
.error-modal {
  transition: box-shadow 1s;

  &.has-bugs {
    box-shadow: 0 24px 80px -2px rgba(255, 0, 0, 0.4) !important;
  }
}

.error-modal-content {
  padding: 10px;
  text-align: center;

  .bugs-label {
    text-transform: uppercase;
    font-size: 60px;
    font-weight: 300;
    letter-spacing: 2px;
    padding: 40px;
  }

  button {
    width: 180px;
  }

  sub {
    color: #ec625f;
    transition: opacity 0.25s;
  }
}
</style>
