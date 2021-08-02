<template>
  <div>
    <div v-if="this.resizeEdges.includes('t')" class="vue-modal-top"></div>
    <div v-if="this.resizeEdges.includes('b')" class="vue-modal-bottom"></div>
    <div v-if="this.resizeEdges.includes('l')" class="vue-modal-left"></div>
    <div v-if="this.resizeEdges.includes('r')" class="vue-modal-right"></div>
    <div v-if="this.resizeEdges.includes('tr')" class="vue-modal-topRight"></div>
    <div v-if="this.resizeEdges.includes('tl')" class="vue-modal-topLeft"></div>
    <div v-if="this.resizeEdges.includes('br')" :id="getID" :class="className"></div>
    <div v-if="this.resizeEdges.includes('bl')" class="vue-modal-bottomLeft"></div>
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
    fixedMarginLeftRight: {
      type: Number,
      required: true
    },
    fixedMarginTopBottom: {
      type: Number,
      required: true
    },
    viewportWidth: {
      type: Number,
      required: true
    },
    viewportHeight: {
      type: Number,
      required: true
    },
    resizeIndicator: {
      type: Boolean,
      default: true
    },
    resizeEdges: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      clicked: false,
      targetClass: '',
      size: {},
      initialX: 0,
      initialY: 0
    }
  },
  mounted() {
    this.$el.addEventListener('mousedown', this.start, false)
  },
  computed: {
    className() {
      const { clicked } = this
      return ['vue-modal-bottomRight', { clicked }]
    },
    getID() {
      if (this.resizeIndicator) return 'vue-modal-triangle'
      else return ''
    }
  },
  methods: {
    start(event) {
      this.targetClass = event.target.className
      this.clicked = true
      this.initialX = event.clientX
      this.initialY = event.clientY

      window.addEventListener('mousemove', this.mousemove, false)
      window.addEventListener('mouseup', this.stop, false)

      event.stopPropagation()
      event.preventDefault()
    },
    stop() {
      this.clicked = false
      this.targetClass = ''
      this.initialX = 0
      this.initialY = 0

      window.removeEventListener('mousemove', this.mousemove, false)
      window.removeEventListener('mouseup', this.stop, false)

      this.$emit('resize-stop', {
        element: this.$el.parentElement,
        size: this.size
      })
    },

    mousemove(event) {
      this.resize(event)
    },

    resize(event) {
      var el = this.$el.parentElement 

      var width = event.clientX
      var height = event.clientY

      if (event.clientX > this.viewportWidth || event.clientX < 0) return
      if (event.clientY > this.viewportHeight || event.clientY < 0) return

      const styleWidth = parseInt(el.style.width.replace('px', ''))
      const styleHeight = parseInt(el.style.height.replace('px', ''))
      const styleLeft = parseInt(el.style.left.replace('px', ''))
      const styleTop = parseInt(el.style.top.replace('px', ''))
      
      const y = this.initialY - event.clientY
      const x = (this.initialX - event.clientX)
    if (el) {
          switch (this.targetClass) {
          case 'vue-modal-right':
            width = width - el.offsetLeft
            height = styleHeight
            break
          case 'vue-modal-left':
            height = styleHeight
            width = this.setWidth(el, x, width, styleLeft, styleWidth)
            break
          case 'vue-modal-top':
            width = styleWidth
            height = this.setHeight(el, y, height, styleTop, styleHeight)
            break
          case 'vue-modal-bottom':
            width = styleWidth
            height = height - el.offsetTop
            break
          case 'vue-modal-bottomRight':
            width = width - el.offsetLeft
            height = height - el.offsetTop
            break
          case 'vue-modal-topRight':
            width = width - el.offsetLeft
            height = this.setHeight(el, y, height, styleTop, styleHeight)
            break
          case 'vue-modal-bottomLeft':
            height = height - el.offsetTop
            width = this.setWidth(el, x, width, styleLeft, styleWidth)
            break
          case 'vue-modal-topLeft':
            height = this.setHeight(el, y, height, styleTop, styleHeight)
            width = this.setWidth(el, x, width, styleLeft, styleWidth)
            break
          default:
            console.error('Incorrrect/no resize direction.')
        }

        const maxWidth = Math.min(windowWidthWithoutScrollbar(), this.maxWidth)
        const maxHeight = Math.min(window.innerHeight, this.maxHeight)

        width = width == this.minWidth ? width + 1 : width == this.maxWidth ? width - 1 : inRange(this.minWidth, maxWidth, width)
        height = height == this.minHeight ? height + 1 : height == this.maxHeight ? height - 1 : inRange(this.minHeight, maxHeight, height)

        this.initialX = event.clientX
        this.initialY = event.clientY

        this.size = { width, height }

        const dimGrowth = {
          width: width - styleWidth,
          height: height - styleHeight
        }
 
        if (el.offsetLeft + width < this.viewportWidth - this.fixedMarginLeftRight && el.offsetLeft > this.fixedMarginLeftRight) el.style.width = width + 'px'
        else el.style.width = this.viewportWidth - this.fixedMarginLeftRight - el.offsetLeft + "px"

        if (el.offsetTop + height < this.viewportHeight - this.fixedMarginTopBottom && el.offsetTop > this.fixedMarginTopBottom) el.style.height = height + 'px'
        else el.style.height = this.viewportHeight - this.fixedMarginTopBottom - el.offsetTop + "px"

        if (el.offsetLeft + el.style.width < this.viewportWidth - this.fixedMarginLeftRight 
          && el.offsetTop + el.style.height < this.viewportHeight - this.fixedMarginTopBottom
          && el.offsetLeft > this.fixedMarginLeftRight
          && el.offsetTop > this.fixedMarginTopBottom
          && el.style.width > this.minWidth
          && el.style.height > this.minHeight) {
          this.$emit('resize', {
            element: el,
            size: this.size,
            direction: this.targetClass,
            dimGrowth: dimGrowth
          })
        }
      }
    },
    setWidth(el, x, width, styleLeft, styleWidth){
      let newWidth = styleWidth + x

      if ((el.offsetLeft - x) > this.fixedMarginLeftRight
          && el.offsetLeft - x + width < this.viewportWidth - this.fixedMarginLeftRight
          && newWidth > this.minWidth
          && newWidth < this.maxWidth
          ) {
            if (el.offsetLeft - x + width < this.viewportWidth - this.fixedMarginLeftRight 
            || x > 0) {
              width = newWidth
            }
            el.style.left = styleLeft - x + "px" 
          } else if (el.offsetLeft - x + width >= this.viewportWidth - this.fixedMarginLeftRight && newWidth > this.minWidth) {
            width = newWidth
            el.style.left = styleLeft - x + "px" 
          } else { 
            width = styleWidth
          }
      return width;
    },
    setHeight(el, y, height, styleTop, styleHeight) {
      let newHeight = styleHeight + y

      if ((el.offsetTop - y) > this.fixedMarginTopBottom 
      && el.offsetTop - y + height < this.viewportHeight - this.fixedMarginTopBottom 
      && newHeight > this.minHeight
      && newHeight < this.maxHeight) {
        if (el.offsetTop - y + height < this.viewportHeight - this.fixedMarginTopBottom 
        || y > 0) {
          height = newHeight
        }
        el.style.top = styleTop - y + "px"
      } else if (el.offsetTop - y + height >= this.viewportHeight - this.fixedMarginTopBottom 
      && newHeight > this.minHeight) {
        height = newHeight
        el.style.top = styleTop - y + "px"
      } else {
        height = styleHeight
      }
      return height
    }
  }
}
</script>
<style>
.vue-modal-top {
  display: block;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 12px;
  right: 12;
  top: 0;
  z-index: 9999999;
  background: transparent;
  cursor: n-resize;
}

.vue-modal-bottom {
  display: block;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 12px;
  left: 0;
  bottom: 0;
  z-index: 9999999;
  background: transparent;
  cursor: s-resize;
}

.vue-modal-left {
  display: block;
  overflow: hidden;
  position: absolute;
  width: 12px;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999999;
  background: transparent;
  cursor: w-resize;
}

.vue-modal-right {
  display: block;
  overflow: hidden;
  position: absolute;
  width: 12px;
  height: 100%;
  right: 0;
  top: 0;
  z-index: 9999999;
  background: transparent;
  cursor: e-resize;
}

.vue-modal-topRight {
  display: block;
  overflow: hidden;
  position: absolute;
  width: 12px;
  height: 12px;
  right: 0;
  top: 0;
  z-index: 9999999;
  background: transparent;
  cursor: ne-resize;
}
.vue-modal-topLeft {
  display: block;
  overflow: hidden;
  position: absolute;
  width: 12px;
  height: 12px;
  left: 0;
  top: 0;
  z-index: 9999999;
  background: transparent;
  cursor: nw-resize;
}
.vue-modal-bottomLeft {
  display: block;
  overflow: hidden;
  position: absolute;
  width: 12px;
  height: 12px;
  left: 0;
  bottom: 0;
  z-index: 9999999;
  background: transparent;
  cursor: sw-resize;
}
.vue-modal-bottomRight {
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

#vue-modal-triangle::after {
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

#vue-modal-triangle.clicked::after {
  border-bottom: 10px solid #369be9;
}
</style>
