<template>
  <modal
    name="size-modal"
    classes="demo-modal-class"
    :min-width="200"
    :min-height="200"
    :scrollable="true"
    :reset="true"
    width="60%"
    height="auto"
    @before-open="beforeOpen"
    @opened="opened"
    @before-close="beforeClose"
    @closed="closed"
  >
    <div class="size-modal-content">
      <div>
        A new paragraph will be added every 5 sec to show how
        <b>height</b> scales.
      </div>
      <div v-for="(p, i) in paragraphs" :key="i">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dictum
        purus egestas libero ornare venenatis. Maecenas pharetra tortor eu
        tortor imperdiet, a faucibus quam finibus. Nulla id lacinia quam.
        Praesent imperdiet sed magna non finibus. Aenean blandit, mauris vitae
        lacinia rutrum, nunc mi scelerisque sem, in laoreet sem lectus ut orci.
        Ut egestas nulla in vehicula feugiat. Vivamus tincidunt nisi vel risus
        dictum suscipit. Nulla id blandit mi, vulputate aliquam enim.
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  name: 'SizeModalTest',
  data() {
    return {
      paragraphs: [null, null],
      timer: null
    }
  },
  methods: {
    beforeOpen(event) {
      console.log('before-open', event)
    },
    beforeClose() {
      clearInterval(this.timer)
      this.timer = null
    },

    opened(event) {
      this.timer = setInterval(() => {
        this.paragraphs.push(null)
      }, 5000)
      // e.ref should not be undefined here
      console.log('opened', event)
      console.log('ref', event.ref)
    },

    closed(event) {
      this.paragraphs = []
      console.log('closed', event)
    }
  }
}
</script>
<style>
.size-modal-content {
  padding: 10px;
  font-style: 13px;
}

.v--modal-overlay[data-modal='size-modal'] {
  background: rgba(0, 0, 0, 0.5);
}

.demo-modal-class {
  border-radius: 5px;
  background: #f7f7f7;
  box-shadow: 5px 5px 30px 0px rgba(46, 61, 73, 0.6);
}
</style>
