<template>
  <div class="test2">
    <div class="vue-modal-topRight"></div>
    <div class="vue-modal-topLeft"></div>
    <div :class="className"></div>
    <div class="vue-modal-bottomLeft"></div>
  </div>
</template>
<script>
import { inRange, windowWidthWithoutScrollbar } from '../utils'

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
    },
    maxWidth: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    maxHeight: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    emitEvent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      clicked: false,
      targetClass: '',
      size: {},
      initialX: 0
    }
  },
  mounted() {
    this.$el.addEventListener('mousedown', this.start, false)
  },
  computed: {
    className() {
      const { clicked } = this
      return ['vue-modal-bottomRight', { clicked }]
    }
  },
  methods: {
    start(event) {
      this.targetClass = event.target.className
      this.clicked = true
      this.initialX = event.clientX

      window.addEventListener('mousemove', this.mousemove, false)
      window.addEventListener('mouseup', this.stop, false)

      event.stopPropagation()
      event.preventDefault()
    },
    stop() {
      this.clicked = false
      this.targetClass = ''
      this.initialX = 0

      window.removeEventListener('mousemove', this.mousemove, false)
      window.removeEventListener('mouseup', this.stop, false)

      this.$emit('resize-stop', {
        element: this.$el.parentElement,
        size: this.size
      })
    },

    mousemove(event) {
      switch (this.targetClass) {
        case 'vue-modal-bottomRight':
          this.resize(event, 'botRight')
          break
        case 'vue-modal-bottomLeft':
          this.resize(event, 'botLeft')
          break
        case 'vue-modal-topRight':
          this.resize(event, 'topRight')
          break
        case 'vue-modal-topLeft':
          this.resize(event, 'topLeft')
          break
        case 'vue-modal-top':
          console.log('top TODO')
          break
        case 'vue-modal-bottom':
          console.log('bot TODO')
          break
        case 'vue-modal-left':
          console.log('left TODO')
          break
        case 'vue-modal-right':
          console.log('right TODO')
          break
        default:
          console.warn('Could not identify Resize Target Direction')
      }
    },

    resize(event, dir) {
      //TODO Handle botLeft cases
      var el = this.$el.parentElement

      //! Expects width and hieght inital to be the bottom Right COORD
      var width = event.clientX
      var height = event.clientY
      console.log('x: ' + width + ' y: ' + height)
      if (el) {
        switch (dir) {
          case 'botRight':
            width = width - el.offsetLeft
            height = height - el.offsetTop
            break
          case 'botLeft':
            console.log(el.style.width)
            //Save intial X in start x
            width =
              parseInt(el.style.width.replace('px', '')) +
              (this.initialX - event.clientX)
            height = height - el.offsetTop
            console.log('new x: ' + width + ' new y: ' + height)
            break
          case 'topRight':
            width = width - el.offsetLeft
            height = height + el.offsetTop
            break
          case 'topLeft':
            width = width + el.offsetLeft
            height = height + el.offsetTop
            break
        }

        const maxWidth = Math.min(windowWidthWithoutScrollbar(), this.maxWidth)
        const maxHeight = Math.min(window.innerHeight, this.maxHeight)
        width = inRange(this.minWidth, maxWidth, width)
        height = inRange(this.minHeight, maxHeight, height)
        this.initialX = event.clientX

        this.size = { width, height }

        const dimGrowth = {
          width: width - parseInt(el.style.width.replace('px', '')),
          height: height - parseInt(el.style.height.replace('px', ''))
        }

        el.style.width = width + 'px'
        el.style.height = height + 'px'

        // switch (dir) {
        //   case 'botLeft':
        //     console.log('Trying to Shift')
        //     el.style.left = 0
        //     break
        //   default:
        //     break
        // }

        //Emit event if True
        if (this.emitEvent) {
          this.$emit('resize', {
            element: el,
            size: this.size,
            direction: dir,
            dimGrowth: dimGrowth
          })
        }
      }
    }
  }
}
</script>
<style>
.vue-modal-topRight {
  background-color: lime;
  display: block;
  overflow: hidden;
  position: absolute;
  width: 12px;
  height: 12px;
  right: 0;
  top: 0;
  z-index: 9999999;
  /* background: transparent; */
  cursor: ne-resize;
}
.vue-modal-topLeft {
  background-color: yellow;
  display: block;
  overflow: hidden;
  position: absolute;
  width: 12px;
  height: 12px;
  left: 0;
  top: 0;
  z-index: 9999999;
  /* background: transparent; */
  cursor: nw-resize;
}
.vue-modal-bottomLeft {
  background-color: red;
  display: block;
  overflow: hidden;
  position: absolute;
  width: 12px;
  height: 12px;
  left: 0;
  bottom: 0;
  z-index: 9999999;
  /* background: transparent; */
  cursor: sw-resize;
}
.vue-modal-bottomRight {
  background-color: blue;
  display: block;
  overflow: hidden;
  position: absolute;
  width: 12px;
  height: 12px;
  right: 0;
  bottom: 0;
  z-index: 9999999;
  /* background: transparent; */
  cursor: se-resize;
}

.vue-modal-bottomRight::after {
  display: block;
  position: absolute;
  content: '';
  /* background: transparent; */
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border-bottom: 10px solid #ddd;
  border-left: 10px solid transparent;
}

.vue-modal-bottomRight.clicked::after {
  border-bottom: 10px solid #369be9;
}
</style>
