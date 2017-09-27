<template>
  <transition name="overlay-fade">
    <div v-if="visibility.overlay"
         ref="overlay"
         :class="overlayClass"
         :aria-expanded="visible.toString()"
         :data-modal="name"
         @mousedown.stop="onBackgroundClick"
         @touchstart.stop="onBackgroundClick">
      <div class="v--modal-top-right">
        <slot name="top-right"/>
      </div>
      <transition :name="transition">
        <div v-if="visibility.modal"
             ref="modal"
             :class="modalClass"
             :style="modalStyle"
             @mousedown.stop
             @touchstart.stop>
          <slot/>
          <resizer v-if="resizable && !isAutoHeight"
                   :min-width="minWidth"
                   :min-height="minHeight"
                   @resize="onModalResize"/>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
  import Modal       from './index'
  import Resizer     from './Resizer.vue'
  import { inRange } from './util'
  import parseNumber from './parser'

  export default {
    name: 'VueJsModal',
    props: {
      name: {
        required: true,
        type: String
      },
      delay: {
        type: Number,
        default: 0
      },
      resizable: {
        type: Boolean,
        default: false
      },
      adaptive: {
        type: Boolean,
        default: false
      },
      draggable: {
        type: [Boolean, String],
        default: false
      },
      scrollable: {
        type: Boolean,
        default: false
      },
      reset: {
        type: Boolean,
        default: false
      },
      transition: {
        type: String
      },
      clickToClose: {
        type: Boolean,
        default: true
      },
      classes: {
        type: [String, Array],
        default: 'v--modal'
      },
      minWidth: {
        type: Number,
        default: 0,
        validator (value) {
          return value >= 0
        }
      },
      minHeight: {
        type: Number,
        default: 0,
        validator (value) {
          return value >= 0
        }
      },
      width: {
        type: [Number, String],
        default: 600,
        validator (value) {
          if (typeof value === 'string') {
            let width = parseNumber(value)
            return (width.type === '%' || width.type === 'px') &&
              width.value > 0
          }

          return value >= 0
        }
      },
      height: {
        type: [Number, String],
        default: 300,
        validator (value) {
          if (typeof value === 'string') {
            if (value === 'auto') {
              return true
            }

            let height = parseNumber(value)
            return (height.type === '%' || height.type === 'px') &&
              height.value > 0
          }

          return value >= 0
        }
      },
      pivotX: {
        type: Number,
        default: 0.5,
        validator (value) {
          return value >= 0 && value <= 1
        }
      },
      pivotY: {
        type: Number,
        default: 0.5,
        validator (value) {
          return value >= 0 && value <= 1
        }
      }
    },
    components: {
      Resizer
    },
    data () {
      return {
        visible: false,

        visibility: {
          modal: false,
          overlay: false
        },

        shift: {
          left: 0,
          top: 0
        },

        modal: {
          width: 0,
          widthType: 'px',
          height: 0,
          heightType: 'px'
        },

        window: {
          width: 0,
          height: 0
        }
      }
    },
    watch: {
      visible (value) {
        if (value) {
          this.visibility.overlay = true

          setTimeout(() => {
            this.visibility.modal = true
            this.$nextTick(() => {
              this.addDraggableListeners()
            })
          }, this.delay)
        } else {
          this.visibility.modal = false

          setTimeout(() => {
            this.visibility.overlay = false
            this.$nextTick(() => {
              this.removeDraggableListeners()
            })
          }, this.delay)
        }
      }
    },
    created () {
      this.setInitialSize()
    },
    /**
     * Sets global listeners
     */
    beforeMount () {
      Modal.event.$on('toggle', (name, state, params) => {
        if (name === this.name) {
          if (typeof state === 'undefined') {
            state = !this.visible
          }

          this.toggle(state, params)
        }
      })

      window.addEventListener('resize', this.onWindowResize)
      this.onWindowResize()

      if (this.scrollable && !this.isAutoHeight) {
        console.warn(`Modal "${this.name}" has scrollable flag set to true ` +
          `but height is not "auto" (${this.height})`)
      }
    },
    /**
     * Removes "resize" window listener
     */
    beforeDestroy () {
      window.removeEventListener('resize', this.onWindowResize)
    },
    computed: {
      /**
       * Returns true if height is set to "auto"
       */
      isAutoHeight () {
        return this.modal.heightType === 'auto'
      },
      /**
       * Calculates and returns modal position based on the
       * pivots, window size and modal size
       */
      position () {
        const { window, shift, pivotX, pivotY,
          trueModalWidth, trueModalHeight } = this

        const maxLeft = window.width - trueModalWidth
        const maxTop = window.height - trueModalHeight

        const minTop = this.scrollable
          ? Number.NEGATIVE_INFINITY
          : 0

        const left = shift.left + pivotX * maxLeft
        const top = shift.top + pivotY * maxTop

        return {
          left: inRange(0, maxLeft, left),
          top: inRange(minTop, maxTop, top)
        }
      },
      /**
       * Returns pixel width (if set with %) and makes sure that modal size
       * fits the window
       */
      trueModalWidth () {
        const { window, modal, adaptive, minWidth } = this

        const value = modal.widthType === '%'
          ? window.width / 100 * modal.width
          : modal.width

        return adaptive
          ? inRange(minWidth, window.width, value)
          : value
      },
      /**
       * Returns pixel height (if set with %) and makes sure that modal size
       * fits the window.
       *
       * Returns 0 if height set as "auto"
       */
      trueModalHeight () {
        const { window, modal, isAutoHeight, adaptive } = this

        const value = (modal.heightType === '%')
          ? window.height / 100 * modal.height
          : modal.height

        if (isAutoHeight) {
          return 0
        }

        return adaptive
          ? inRange(this.minHeight, this.window.height, value)
          : value
      },
      /**
       * Returns class list for screen overlay (modal background)
       */
      overlayClass () {
        return {
          'v--modal-overlay': true,
          'scrollable': this.scrollable && this.isAutoHeight
        }
      },
      /**
       * Returns class list for modal itself
       */
      modalClass () {
        return ['v--modal-box', this.classes]
      },
      /**
       * CSS styles for position and size of the modal
       */
      modalStyle () {
        return {
          top: this.position.top + 'px',
          left: this.position.left + 'px',
          width: this.trueModalWidth + 'px',
          height: this.isAutoHeight
            ? 'auto'
            : (this.trueModalHeight + 'px')
        }
      }
    },
    methods: {
      /**
       * Initializes modal's size & position,
       * if "reset" flag is set to true - this function will be called
       * every time "beforeOpen" is triggered
       */
      setInitialSize () {
        let { modal } = this
        let width = parseNumber(this.width)
        let height = parseNumber(this.height)

        modal.width = width.value
        modal.widthType = width.type
        modal.height = height.value
        modal.heightType = height.type
      },

      onWindowResize () {
        this.window.width = window.innerWidth
        this.window.height = window.innerHeight
      },

      /**
       * Generates event object
       */
      genEventObject (params) {
        // @todo: clean this up (change to ...)
        var data = {
          name: this.name,
          timestamp: Date.now(),
          canceled: false,
          ref: this.$refs.modal
        }

        return Object.assign(data, params || {})
      },
      /**
       * Event handler which is triggered on modal resize
       */
      onModalResize (event) {
        this.modal.widthType = 'px'
        this.modal.width = event.size.width

        this.modal.heightType = 'px'
        this.modal.height = event.size.height

        const { size } = this.modal
        const resizeEvent = this.genEventObject({ size })

        this.$emit('resize', resizeEvent)
      },
      /**
       * Event handler which is triggered on $modal.show and $modal.hight
       */
      toggle (state, params) {
        const { reset, scrollable, visible } = this

        const beforeEventName = visible
          ? 'before-close'
          : 'before-open'

        const afterEventName = visible
          ? 'closed'
          : 'opened'

        if (beforeEventName === 'before-open') {
          if (reset) {
            this.setInitialSize()
            this.shift.left = 0
            this.shift.top = 0
          }

          if (scrollable) {
            document.body.classList.add('v--modal-block-scroll')
          }
        }

        if (beforeEventName === 'before-close') {
          if (scrollable) {
            document.body.classList.remove('v--modal-block-scroll')
          }
        }

        let stopEventExecution = false

        const stop = () => {
          stopEventExecution = true
        }
        const beforeEvent = this.genEventObject({ stop, state, params })

        this.$emit(beforeEventName, beforeEvent)

        if (!stopEventExecution) {
          const afterEvent = this.genEventObject({ state, params })

          this.visible = state
          this.$emit(afterEventName, afterEvent)
        }
      },

      getDraggableElement () {
        var selector = typeof this.draggable !== 'string'
          ? '.v--modal-box'
          : this.draggable

        if (selector) {
          var handler = this.$refs.overlay.querySelector(selector)
          if (handler) {
            return handler
          }
        }
      },
      /**
       * Event handler that is triggered when background overlay is clicked
       */
      onBackgroundClick () {
        if (this.clickToClose) {
          this.toggle(false)
        }
      },

      addDraggableListeners () {
        if (!this.draggable) {
          return
        }

        let dragger = this.getDraggableElement()

        if (dragger) {
          let startX = 0
          let startY = 0
          let cachedShiftX = 0
          let cachedShiftY = 0

          let getPosition = (event) => {
            return event.touches && event.touches.length > 0
              ? event.touches[0]
              : event
          }

          let mousedown = (event) => {
            let target = event.target

            if (target && target.nodeName === 'INPUT') {
              return
            }

            let { clientX, clientY } = getPosition(event)

            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)

            document.addEventListener('touchmove', mousemove)
            document.addEventListener('touchend', mouseup)

            startX = clientX
            startY = clientY
            cachedShiftX = this.shift.left
            cachedShiftY = this.shift.top

          //  event.preventDefault()
          }

          let mousemove = (event) => {
            let { clientX, clientY } = getPosition(event)

            this.shift.left = cachedShiftX + clientX - startX
            this.shift.top = cachedShiftY + clientY - startY
            event.preventDefault()
          }

          let mouseup = (event) => {
            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseup)

            document.removeEventListener('touchmove', mousemove)
            document.removeEventListener('touchend', mouseup)

            event.preventDefault()
          }

          dragger.addEventListener('mousedown', mousedown)
          dragger.addEventListener('touchstart', mousedown)
        }
      },

      removeDraggableListeners () {
      //  console.log('removing draggable handlers')
      }
    }
  }
</script>
<style>
  .v--modal-block-scroll {
    overflow: hidden;
  }

  .v--modal-overlay {
    position: fixed;
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
    opacity: 1;
  }

  .v--modal-overlay.scrollable {
    height: 100%;
    min-height: 100vh;
    overflow-y: auto;
    padding-bottom: 10px;
  }

  .v--modal-overlay .v--modal-box {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }

  .v--modal-overlay.scrollable .v--modal-box {
    margin-bottom: 10px;
  }

  .v--modal {
    background-color: white;
    text-align: left;
    border-radius: 3px;
    box-shadow: 0 20px 60px -2px rgba(27, 33, 58, .4);
    padding: 0;
  }

  .v--modal.v--modal-fullscreen {
    width: 100vw;
    height: 100vh;
    margin: 0;
    left: 0;
    top: 0;
  }

  .v--modal-top-right {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
  }

  .overlay-fade-enter-active, .overlay-fade-leave-active {
    transition: all 0.2s;
  }

  .overlay-fade-enter, .overlay-fade-leave-active {
    opacity: 0;
  }

  .nice-modal-fade-enter-active, .nice-modal-fade-leave-active {
    transition: all 0.4s;
  }

  .nice-modal-fade-enter, .nice-modal-fade-leave-active {
    opacity: 0;
    transform: translateY(-20px);
  }
</style>
