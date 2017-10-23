<template>
  <modal name="size-modal"
        transition="nice-modal-fade"
        classes="demo-modal-class"
        :min-width="200"
        :min-height="200"
        :pivot-y="0.5"
        :adaptive="true"
        :scrollable="true"
        :reset="true"
        width="60%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose">
  <div class="size-modal-content">
    <div>A new paragraph will be added every 5 sec to show how <b>height</b> scales.</div>
    <div v-for="(p, i) in paragraphs" :key="i">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dictum purus egestas libero ornare venenatis.
      Maecenas pharetra tortor eu tortor imperdiet, a faucibus quam finibus. Nulla id lacinia quam.
      Praesent imperdiet sed magna non finibus. Aenean blandit, mauris vitae lacinia rutrum,
      nunc mi scelerisque sem, in laoreet sem lectus ut orci. Ut egestas nulla in vehicula feugiat.
      Vivamus tincidunt nisi vel risus dictum suscipit. Nulla id blandit mi, vulputate aliquam enim.
    </div>
  </div>
</modal>
</template>
<script>
  export default {
    name: 'SizeModalTest',
    data () {
      return {
        paragraphs: [true],
        timer: null
      }
    },
    methods: {
      beforeOpen () {
        this.timer = setInterval(() => {
          this.paragraphs.push(true)
        }, 5000)
      },

      beforeClose () {
        clearInterval(this.timer)
        this.timer = null
        this.paragraphs = []
      },

      opened (e) {
        // e.ref should not be undefined here
        console.log('opened', e)
        console.log('ref', e.ref)
      },

      closed (e) {
        console.log('closed', e)
      }
    }
  }
</script>
<style>
  .size-modal-content {
    padding: 10px;
    font-style: 13px;
  }

  .v--modal-overlay[data-modal="size-modal"] {
    background: rgba(0, 0, 0, 0.5);
  }

  .demo-modal-class {
    border-radius: 5px;
    background: #F7F7F7;
    box-shadow: 5px 5px 30px 0px rgba(46,61,73, 0.6);
  }
</style>
