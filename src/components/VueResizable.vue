<template>
    <div class="resizable-component" :style="style">
        <slot></slot>
        <template v-for="el in active">
            <div v-show="!maximize" :class="'resizable-'+el" :key="el"></div>
        </template>
    </div>
</template>

<script>
const ELEMENT_MASK = {
  'resizable-r': { bit: 0b0001, cursor: 'e-resize' },
  'resizable-rb': { bit: 0b0011, cursor: 'se-resize' },
  'resizable-b': { bit: 0b0010, cursor: 's-resize' },
  'resizable-lb': { bit: 0b0110, cursor: 'sw-resize' },
  'resizable-l': { bit: 0b0100, cursor: 'w-resize' },
  'resizable-lt': { bit: 0b1100, cursor: 'nw-resize' },
  'resizable-t': { bit: 0b1000, cursor: 'n-resize' },
  'resizable-rt': { bit: 0b1001, cursor: 'ne-resize' },
  'drag-el': { bit: 0b1111, cursor: 'pointer' }
}
const CALC_MASK = {
  l: 0b0001,
  t: 0b0010,
  w: 0b0100,
  h: 0b1000
}
export default {
  props: {
    width: {
      default: undefined,
      type: [Number, String]
    },
    minWidth: {
      default: 0,
      type: Number
    },
    maxWidth: {
      default: undefined,
      type: Number
    },
    height: {
      default: undefined,
      type: [Number, String]
    },
    minHeight: {
      default: 0,
      type: Number
    },
    maxHeight: {
      default: undefined,
      type: Number
    },
    left: {
      default: 0,
      type: [Number, String]
    },
    top: {
      default: 0,
      type: [Number, String]
    },
    active: {
      default: () => ['r', 'rb', 'b', 'lb', 'l', 'lt', 't', 'rt'],
      validator: val =>
        ['r', 'rb', 'b', 'lb', 'l', 'lt', 't', 'rt'].filter(
          value => val.indexOf(value) !== -1
        ).length === val.length,
      type: Array
    },
    fitParent: {
      default: false,
      type: Boolean
    },
    dragSelector: {
      default: undefined,
      type: String
    },
    maximize: {
      default: false,
      type: Boolean
    },
    disableAttributes: {
      default: () => [],
      validator: val =>
        ['l', 't', 'w', 'h'].filter(value => val.indexOf(value) !== -1)
          .length === val.length,
      type: Array
    }
  },
  data() {
    return {
      w: this.width,
      h: this.height,
      minW: this.minWidth,
      minH: this.minHeight,
      maxW: this.maxWidth,
      maxH: this.maxHeight,
      l: this.left,
      t: this.top,
      mouseX: 0,
      mouseY: 0,
      offsetX: 0,
      offsetY: 0,
      parent: { width: 0, height: 0 },
      resizeState: 0,
      dragElements: [],
      dragState: false,
      calcMap: 0b1111
    }
  },
  watch: {
    maxWidth(value) {
      this.maxW = value
    },
    maxHeight(value) {
      this.maxH = value
    },
    minWidth(value) {
      this.minW = value
    },
    minHeight(value) {
      this.minH = value
    },
    width(value) {
      typeof value === 'number' && (this.w = value)
    },
    height(value) {
      typeof value === 'number' && (this.h = value)
    },
    left(value) {
      typeof value === 'number' && (this.l = value)
    },
    top(value) {
      typeof value === 'number' && (this.t = value)
    },
    dragSelector(selector) {
      this.setupDragElements(selector)
    },
    maximize(value) {
      this.setMaximize(value)
      this.emitEvent('maximize', { state: value })
    }
  },
  mounted() {
    console.log('VUE Resizable mounted')
    if (!this.width) {
      this.w = this.$el.parentElement.clientWidth
    } else {
      typeof this.width !== 'number' && (this.w = this.$el.clientWidth)
    }
    if (!this.height) {
      this.h = this.$el.parentElement.clientHeight
    } else {
      typeof this.height !== 'number' && (this.h = this.$el.clientHeight)
    }
    typeof this.left !== 'number' &&
      (this.l = this.$el.offsetLeft - this.$el.parentElement.offsetLeft)
    typeof this.top !== 'number' &&
      (this.t = this.$el.offsetTop - this.$el.parentElement.offsetTop)
    this.minW && this.w < this.minW && (this.w = this.minW)
    this.minH && this.h < this.minH && (this.h = this.minH)
    this.maxW && this.w > this.maxW && (this.w = this.maxW)
    this.maxH && this.h > this.maxH && (this.h = this.maxH)
    this.setMaximize(this.maximize)
    this.setupDragElements(this.dragSelector)
    this.disableAttributes.forEach(attr => {
      switch (attr) {
        case 'l':
          this.calcMap &= ~CALC_MASK.l
          break
        case 't':
          this.calcMap &= ~CALC_MASK.t
          break
        case 'w':
          this.calcMap &= ~CALC_MASK.w
          break
        case 'h':
          this.calcMap &= ~CALC_MASK.h
      }
    })
    document.documentElement.addEventListener(
      'mousemove',
      this.handleMove,
      true
    )
    document.documentElement.addEventListener(
      'mousedown',
      this.handleDown,
      true
    )
    document.documentElement.addEventListener('mouseup', this.handleUp, true)
    this.emitEvent('mount')
  },
  beforeDestroy() {
    document.documentElement.removeEventListener(
      'mousemove',
      this.handleMove,
      true
    )
    document.documentElement.removeEventListener(
      'mousedown',
      this.handleDown,
      true
    )
    document.documentElement.removeEventListener('mouseup', this.handleUp, true)
    this.emitEvent('destroy')
  },
  computed: {
    style() {
      return {
        width: typeof this.w === 'number' ? this.w + 'px' : this.w,
        height: typeof this.h === 'number' ? this.h + 'px' : this.h,
        left: typeof this.l === 'number' ? this.l + 'px' : this.l,
        top: typeof this.t === 'number' ? this.t + 'px' : this.t
      }
    }
  },
  methods: {
    setMaximize(value) {
      const parentEl = this.$el.parentElement
      if (value) {
        this.prevState = { w: this.w, h: this.h, l: this.l, t: this.t }
        this.t = this.l = 0
        this.w = parentEl.clientWidth
        this.h = parentEl.clientHeight
      } else {
        this.restoreSize()
      }
    },
    restoreSize() {
      if (this.prevState) {
        this.l = this.prevState.l
        this.t = this.prevState.t
        this.h = this.prevState.h
        this.w = this.prevState.w
      }
    },
    setupDragElements(selector) {
      const oldList = this.$el.querySelectorAll('.drag-el')
      oldList.forEach(el => {
        el.classList.remove('drag-el')
      })
      const nodeList = this.$el.querySelectorAll(selector)
      nodeList.forEach(el => {
        el.classList.add('drag-el')
      })
      this.dragElements = Array.prototype.slice.call(nodeList)
    },
    emitEvent(eventName, additionalOptions) {
      this.$emit(eventName, {
        eventName,
        left: this.l,
        top: this.t,
        width: this.w,
        height: this.h,
        ...additionalOptions
      })
    },
    handleMove(event) {
      if (this.resizeState !== 0) {
        if (this.maximize && this.prevState) {
          const parentWidth = this.parent.width
          const parentHeight = this.parent.height
          this.restoreSize()
          this.prevState = undefined
          this.t = event.clientY > parentHeight / 2 ? parentHeight - this.h : 0
          this.l = event.clientX > parentWidth / 2 ? parentWidth - this.w : 0
          this.emitEvent('maximize', { state: false })
        }
        let diffX = event.clientX - this.mouseX + this.offsetX,
          diffY = event.clientY - this.mouseY + this.offsetY
        this.offsetX = this.offsetY = 0
        if (this.resizeState & ELEMENT_MASK['resizable-r'].bit) {
          if (!this.dragState && this.w + diffX < this.minW)
            this.offsetX = diffX - (diffX = this.minW - this.w)
          else if (
            !this.dragState &&
            this.maxW &&
            this.w + diffX > this.maxW &&
            (!this.fitParent || this.w + this.l < this.parent.width)
          )
            this.offsetX = diffX - (diffX = this.maxW - this.w)
          else if (
            this.fitParent &&
            this.l + this.w + diffX > this.parent.width
          )
            this.offsetX = diffX - (diffX = this.parent.width - this.l - this.w)
          this.calcMap & CALC_MASK.w && (this.w += this.dragState ? 0 : diffX)
        }
        if (this.resizeState & ELEMENT_MASK['resizable-b'].bit) {
          if (!this.dragState && this.h + diffY < this.minH)
            this.offsetY = diffY - (diffY = this.minH - this.h)
          else if (
            !this.dragState &&
            this.maxH &&
            this.h + diffY > this.maxH &&
            (!this.fitParent || this.h + this.t < this.parent.height)
          )
            this.offsetY = diffY - (diffY = this.maxH - this.h)
          else if (
            this.fitParent &&
            this.t + this.h + diffY > this.parent.height
          )
            this.offsetY =
              diffY - (diffY = this.parent.height - this.t - this.h)
          this.calcMap & CALC_MASK.h && (this.h += this.dragState ? 0 : diffY)
        }
        if (this.resizeState & ELEMENT_MASK['resizable-l'].bit) {
          if (!this.dragState && this.w - diffX < this.minW)
            this.offsetX = diffX - (diffX = this.w - this.minW)
          else if (
            !this.dragState &&
            this.maxW &&
            this.w - diffX > this.maxW &&
            this.l >= 0
          )
            this.offsetX = diffX - (diffX = this.w - this.maxW)
          else if (this.fitParent && this.l + diffX < 0)
            this.offsetX = diffX - (diffX = -this.l)
          this.calcMap & CALC_MASK.l && (this.l += diffX)
          this.calcMap & CALC_MASK.w && (this.w -= this.dragState ? 0 : diffX)
        }
        if (this.resizeState & ELEMENT_MASK['resizable-t'].bit) {
          if (!this.dragState && this.h - diffY < this.minH)
            this.offsetY = diffY - (diffY = this.h - this.minH)
          else if (
            !this.dragState &&
            this.maxH &&
            this.h - diffY > this.maxH &&
            this.t >= 0
          )
            this.offsetY = diffY - (diffY = this.h - this.maxH)
          else if (this.fitParent && this.t + diffY < 0)
            this.offsetY = diffY - (diffY = -this.t)
          this.calcMap & CALC_MASK.t && (this.t += diffY)
          this.calcMap & CALC_MASK.h && (this.h -= this.dragState ? 0 : diffY)
        }
        this.mouseX = event.clientX
        this.mouseY = event.clientY
        const eventName = !this.dragState ? 'resize:move' : 'drag:move'
        this.emitEvent(eventName)
      }
    },
    handleDown(event) {
      for (let elClass in ELEMENT_MASK) {
        if (
          this.$el.contains(event.target) &&
          ((event.target.closest && event.target.closest(`.${elClass}`)) ||
            event.target.classList.contains(elClass))
        ) {
          elClass === 'drag-el' && (this.dragState = true)
          document.body.style.cursor = ELEMENT_MASK[elClass].cursor
          event.preventDefault && event.preventDefault()
          this.offsetX = this.offsetY = 0
          this.mouseX = event.clientX
          this.mouseY = event.clientY
          this.resizeState = ELEMENT_MASK[elClass].bit
          this.parent.height = this.$el.parentElement.clientHeight
          this.parent.width = this.$el.parentElement.clientWidth
          const eventName = !this.dragState ? 'resize:start' : 'drag:start'
          this.emitEvent(eventName)
          break
        }
      }
    },
    handleUp() {
      if (this.resizeState !== 0) {
        this.resizeState = 0
        document.body.style.cursor = ''
        const eventName = !this.dragState ? 'resize:end' : 'drag:end'
        this.emitEvent(eventName)
        this.dragState = false
      }
    }
  },
  name: 'v-resizable'
}
</script>

<style scoped>
.resizable-component {
  position: relative;
}
.resizable-component > .resizable-r {
  display: block;
  position: absolute;
  z-index: 90;
  touch-action: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: e-resize;
  width: 12px;
  right: -6px;
  top: 0;
  height: 100%;
}
.resizable-component > .resizable-rb {
  display: block;
  position: absolute;
  touch-action: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: se-resize;
  width: 12px;
  height: 12px;
  right: -6px;
  bottom: -6px;
  z-index: 91;
}
.resizable-component > .resizable-b {
  display: block;
  position: absolute;
  z-index: 90;
  touch-action: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: s-resize;
  height: 12px;
  bottom: -6px;
  width: 100%;
  left: 0;
}
.resizable-component > .resizable-lb {
  display: block;
  position: absolute;
  touch-action: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: sw-resize;
  width: 12px;
  height: 12px;
  left: -6px;
  bottom: -6px;
  z-index: 91;
}
.resizable-component > .resizable-l {
  display: block;
  position: absolute;
  z-index: 90;
  touch-action: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: w-resize;
  width: 12px;
  left: -6px;
  height: 100%;
  top: 0;
}
.resizable-component > .resizable-lt {
  display: block;
  position: absolute;
  touch-action: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: nw-resize;
  width: 12px;
  height: 12px;
  left: -6px;
  top: -6px;
  z-index: 91;
}
.resizable-component > .resizable-t {
  display: block;
  position: absolute;
  z-index: 90;
  touch-action: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: n-resize;
  height: 12px;
  top: -6px;
  width: 100%;
  left: 0;
}
.resizable-component > .resizable-rt {
  display: block;
  position: absolute;
  touch-action: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: ne-resize;
  width: 12px;
  height: 12px;
  right: -6px;
  top: -6px;
  z-index: 91;
}
</style>
