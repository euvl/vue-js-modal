<template>
  <transition name="overlay-fade">
    <div v-if="visibility.overlay"
         ref="overlay"
         :class="overlayClass"
         :aria-expanded="visible.toString()"
         :data-modal="name">
      <div :class="backgroundClickClass"
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
    </div>
  </transition>
</template>
<script>
import Modal from './index'
import Resizer from './Resizer.vue'
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
    maxWidth: {
      type: Number,
      default: Infinity
    },
    maxHeight: {
      type: Number,
      default: Infinity
    },
    width: {
      type: [Number, String],
      default: 600,
      validator (value) {
        if (typeof value === 'string') {
          let width = parseNumber(value)
          return (width.type === '%' || width.type === 'px') && width.value > 0
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
          return (
            (height.type === '%' || height.type === 'px') && height.value > 0
          )
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
        heightType: 'px',
        renderedHeight: 0
      },

      window: {
        width: 0,
        height: 0
      },

      mutationObserver: null
    }
  },
  watch: {
    /**
     * Sets the visibility of overlay and modal.
     * Events 'opened' and 'closed' is called here
     * inside `setTimeout` and `$nextTick`, after the DOM changes.
     * This fixes `$refs.modal` `undefined` bug (fixes #15)
     */
    visible (value) {
      if (value) {
        this.visibility.overlay = true

        setTimeout(() => {
          this.visibility.modal = true
          this.$nextTick(() => {
            this.addDraggableListeners()
            this.callAfterEvent(true)
          })
        }, this.delay)
      } else {
        this.visibility.modal = false

        setTimeout(() => {
          this.visibility.overlay = false
          this.$nextTick(() => {
            this.removeDraggableListeners()
            this.callAfterEvent(false)
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
    /**
     * Making sure that autoHeight is enabled when using "scrollable"
     */
    if (this.scrollable && !this.isAutoHeight) {
      console.warn(
        `Modal "${this.name}" has scrollable flag set to true ` +
          `but height is not "auto" (${this.height})`
      )
    }
    /**
     * Only observe when using height: 'auto'
     * The callback will be called when modal DOM changes,
     * this is for updating the `top` attribute for height 'auto' modals.
     */
    if (this.isAutoHeight) {
      /**
       * MutationObserver feature detection:
       * Detects if MutationObserver is available, return false if not.
       * No polyfill is provided here, so height 'auto' recalculation will
       * simply stay at its initial height (won't crash).
       * (Provide polyfill to support IE < 11)
       */
      const MutationObserver = (function () {
        const prefixes = ['', 'WebKit', 'Moz', 'O', 'Ms']

        for (let i = 0; i < prefixes.length; i++) {
          let name = prefixes[i] + 'MutationObserver'

          if (name in window) {
            return window[name]
          }
        }
        return false
      })()

      if (MutationObserver) {
        this.mutationObserver = new MutationObserver(mutations => {
          this.updateRenderedHeight()
        })
      }
    }

    if (this.clickToClose) {
      window.addEventListener('keyup', this.onEscapeKeyUp)
    }
  },
  /**
   * Removes "resize" window listener
   */
  beforeDestroy () {
    window.removeEventListener('resize', this.onWindowResize)

    if (this.clickToClose) {
      window.removeEventListener('keyup', this.onEscapeKeyUp)
    }
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
      const {
        window,
        shift,
        pivotX,
        pivotY,
        trueModalWidth,
        trueModalHeight
      } = this

      const maxLeft = window.width - trueModalWidth
      const maxTop = window.height - trueModalHeight

      const left = shift.left + pivotX * maxLeft
      const top = shift.top + pivotY * maxTop

      return {
        left: inRange(0, maxLeft, left),
        top: inRange(0, maxTop, top)
      }
    },
    /**
     * Returns pixel width (if set with %) and makes sure that modal size
     * fits the window
     */
    trueModalWidth () {
      const { window, modal, adaptive, minWidth, maxWidth } = this

      const value =
        modal.widthType === '%' ? window.width / 100 * modal.width : modal.width

      const max = Math.min(window.width, maxWidth)

      return adaptive ? inRange(minWidth, max, value) : value
    },
    /**
     * Returns pixel height (if set with %) and makes sure that modal size
     * fits the window.
     *
     * Returns modal.renderedHeight if height set as "auto"
     */
    trueModalHeight () {
      const { window, modal, isAutoHeight, adaptive, maxHeight } = this

      const value =
        modal.heightType === '%'
          ? window.height / 100 * modal.height
          : modal.height

      if (isAutoHeight) {
        // use renderedHeight when height 'auto'
        return this.modal.renderedHeight
      }

      const max = Math.min(window.height, maxHeight)

      return adaptive ? inRange(this.minHeight, max, value) : value
    },
    /**
     * Returns class list for screen overlay (modal background)
     */
    overlayClass () {
      return {
        'v--modal-overlay': true,
        scrollable: this.scrollable && this.isAutoHeight
      }
    },
    /**
     * Returns class list for click outside overlay (background click)
     */
    backgroundClickClass() {
      return ['v--modal-background-click']
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
        height: this.isAutoHeight ? 'auto' : this.trueModalHeight + 'px'
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
      const { modal } = this
      const width = parseNumber(this.width)
      const height = parseNumber(this.height)

      modal.width = width.value
      modal.widthType = width.type
      modal.height = height.value
      modal.heightType = height.type
    },

    onEscapeKeyUp (event) {
      if (event.which === 27 && this.visible) {
        this.$modal.hide(this.name)
      }
    },

    onWindowResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },

    /**
     * Generates event object
     */
    genEventObject (params) {
      const eventData = {
        name: this.name,
        timestamp: Date.now(),
        canceled: false,
        ref: this.$refs.modal
      }

      return Object.assign(eventData, params || {})
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
     * Event handler which is triggered on $modal.show and $modal.hide
     * BeforeEvents: ('before-close' and 'before-open') are `$emit`ed here,
     * but AfterEvents ('opened' and 'closed') are moved to `watch.visible`.
     */
    toggle (state, params) {
      const { reset, scrollable, visible } = this
      if (visible === state) return
      const beforeEventName = visible ? 'before-close' : 'before-open'

      const MODAL_BLOCK_SCROLL_CLASS = 'v--modal-block-scroll';
      if (beforeEventName === 'before-open') {
        /**
         * Need to unfocus previously focused element, otherwise
         * all keypress events (ESC press, for example) will trigger on that element.
         */
        if (document.activeElement) {
          document.activeElement.blur()
        }

        if (reset) {
          this.setInitialSize()

          this.shift.left = 0
          this.shift.top = 0
        }

        if (scrollable) {
          // Keep track of counter
          const bodyDataSet = document.body.dataset;
          const currentBlockScrollCount = parseInt(bodyDataSet.vModalBlockScrollCounter, 10) || 0;

          // Perform addition if there exist no modal
          if (currentBlockScrollCount < 1) {
            // Store original body padding-right
            bodyDataSet.vModalBlockScrollRightPadding = document.body.style.paddingRight;

            // Apply scrollBarWidth as padding
            const scrollBarWidth = window.innerWidth - document.body.scrollWidth;
            document.body.style.paddingRight = `${scrollBarWidth}px`;

            // Apply scroll class
            document.getElementsByTagName('html')[0].classList.add(MODAL_BLOCK_SCROLL_CLASS)
            document.body.classList.add(MODAL_BLOCK_SCROLL_CLASS)
          }

          // Increase counter
          bodyDataSet.vModalBlockScrollCounter = currentBlockScrollCount + 1;
        }
      } else {
        if (scrollable) {
          // Keep track of counter
          const bodyDataSet = document.body.dataset;
          const currentBlockScrollCount = parseInt(bodyDataSet.vModalBlockScrollCounter, 10) || 0;

          // Perform removal of block scroll if there is only 1 modal left
          if (currentBlockScrollCount <= 1) {
            // Restore original padding-right on body
            document.body.style.paddingRight = document.body.dataset.vModalBlockScrollRightPadding || '';
            delete bodyDataSet.vModalBlockScrollRightPadding;
            delete bodyDataSet.vModalBlockScrollCounter;

            // Remove existing scroll class
            document.getElementsByTagName('html')[0].classList.remove(MODAL_BLOCK_SCROLL_CLASS)
            document.body.classList.remove(MODAL_BLOCK_SCROLL_CLASS)
          } else {

            // Decrease counter
            bodyDataSet.vModalBlockScrollCounter = currentBlockScrollCount - 1;
          }

        }
      }

      let stopEventExecution = false

      const stop = () => {
        stopEventExecution = true
      }

      const beforeEvent = this.genEventObject({ stop, state, params })

      this.$emit(beforeEventName, beforeEvent)

      if (!stopEventExecution) {
        this.visible = state
        // after events are called in `watch.visible`
      }
    },

    getDraggableElement () {
      var selector =
        typeof this.draggable !== 'string' ? '.v--modal-box' : this.draggable

      if (selector) {
        const handler = this.$refs.overlay.querySelector(selector)

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

        let getPosition = event => {
          return event.touches && event.touches.length > 0
            ? event.touches[0]
            : event
        }

        let mousedown = event => {
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

        let mousemove = event => {
          let { clientX, clientY } = getPosition(event)

          this.shift.left = cachedShiftX + clientX - startX
          this.shift.top = cachedShiftY + clientY - startY
          event.preventDefault()
        }

        let mouseup = event => {
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
    },

    /**
     * 'opened' and 'closed' events are `$emit`ed here.
     * This is called in watch.visible.
     * Because modal DOM updates are async,
     * wrapping afterEvents in `$nextTick` fixes `$refs.modal` undefined bug.
     * (fixes #15)
     */
    callAfterEvent (state) {
      if (state) {
        this.connectObserver()
      } else {
        this.disconnectObserver()
      }

      const eventName = state ? 'opened' : 'closed'
      const event = this.genEventObject({ state })

      this.$emit(eventName, event)
    },

    /**
     * Update $data.modal.renderedHeight using getBoundingClientRect.
     * This method is called when:
     * 1. modal opened
     * 2. MutationObserver's observe callback
     */
    updateRenderedHeight () {
      if (this.$refs.modal) {
        this.modal.renderedHeight = this.$refs.modal.getBoundingClientRect().height
      }
    },

    /**
     * Start observing modal's DOM, if childList or subtree changes,
     * the callback (registered in beforeMount) will be called.
     */
    connectObserver () {
      if (this.mutationObserver) {
        this.mutationObserver.observe(this.$refs.modal, {
          childList: true,
          attributes: true,
          subtree: true
        })
      }
    },

    /**
     * Disconnects MutationObserver
     */
    disconnectObserver () {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect()
      }
    }
  }
}
</script>
<style>
.v--modal-block-scroll {
  overflow: hidden;
  width: 100vw;
}

.v--modal-overlay {
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
  opacity: 1;
}

.v--modal-overlay.scrollable {
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.v--modal-overlay .v--modal-background-click {
  min-height: 100%;
  width: 100%;
  padding-bottom: 10px;
}

.v--modal-overlay .v--modal-box {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.v--modal-overlay.scrollable .v--modal-box {
  margin-bottom: 2px;
  /* transition: top 0.2s ease; */
}

.v--modal {
  background-color: white;
  text-align: left;
  border-radius: 3px;
  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
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

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: all 0.2s;
}

.overlay-fade-enter,
.overlay-fade-leave-active {
  opacity: 0;
}

.nice-modal-fade-enter-active,
.nice-modal-fade-leave-active {
  transition: all 0.4s;
}

.nice-modal-fade-enter,
.nice-modal-fade-leave-active {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
