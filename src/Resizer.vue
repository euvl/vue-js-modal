<template>
  <div :class="className"></div>
</template>
<script>
import { inRange } from './util'

export default {
  name: 'VueJsModalResizer',
  props: {
    minHeight: {
      type: Number,
      default: 0
    },
    minWidth: {
      type: Number,
      default: 0
    }},
  data() {
    return {
      clicked: false,
      size: {}
    }
  },
  mounted() {
    this.$el.addEventListener('mousedown', this.start, false)
  },
  computed: {
    className () {
      return {'vue-modal-resizer': true, 'clicked': this.clicked}
    }
  },
  methods: {
    start(event) {
      this.clicked = true

      window.addEventListener('mousemove', this.mousemove, false)
      window.addEventListener('mouseup', this.stop, false)

      event.stopPropagation()
      event.preventDefault()
    },
    stop() {
      this.clicked = false

      window.removeEventListener('mousemove', this.mousemove, false)
      window.removeEventListener('mouseup', this.stop, false)

      this.$emit('resize-stop', {
        element: this.$el.parentElement,
        size: this.size
      });
    },
    mousemove(event) {
      this.resize(event)
    },
    resize(event) {
      var el = this.$el.parentElement

      if (el) {
        var width = event.clientX - el.offsetLeft
        var height = event.clientY - el.offsetTop

        width = inRange(this.minWidth, window.innerWidth, width)
        height = inRange(this.minHeight, window.innerHeight, height)

        this.size = {width, height}
        el.style.width = width + 'px'
        el.style.height = height + 'px'

        this.$emit('resize', {
          element: el,
          size: this.size
        })
      }
    }
  }
}
</script>
<style>
.vue-modal-resizer {
  display: block;
  overflow: hidden;
  position: absolute;
  width: 12px;
  height: 12px;
  right: 0;
  bottom: 0;
  z-index: 9999999;
  background: transparent;
  cursor: se-resize;
}

.vue-modal-resizer::after {
  display: block;
  position: absolute;
  content: '';
  background: transparent;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border-bottom: 10px solid #ddd;
  border-left: 10px solid transparent;
}

.vue-modal-resizer.clicked::after {
  border-bottom: 10px solid #369BE9;
}
</style>
