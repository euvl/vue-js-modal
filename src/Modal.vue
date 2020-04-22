<template>
  <transition :name="overlayTransition">
    <div
      v-if="visibility.overlay"
      ref="overlay"
      :class="overlayClass"
      :aria-expanded="visibility.overlay.toString()"
      :data-modal="name"
    >
      <div
        class="v--modal-background-click"
        @mousedown.self="handleBackgroundClick"
        @touchstart.self="handleBackgroundClick"
      >
        <div class="v--modal-top-right">
          <slot name="top-right"/>
        </div>
        <transition
          :name="transition"
          @before-enter="beforeTransitionEnter"
          @after-enter="afterTransitionEnter"
          @after-leave="afterTransitionLeave"
        >
          <div
            v-if="visibility.modal"
            ref="modal"
            :class="modalClass"
            :style="modalStyle"
            role="dialog"
            aria-modal="true"
          >
            <slot/>
            <resizer
              v-if="resizable && !isAutoHeight"
              :min-width="minWidth"
              :min-height="minHeight"
              :max-width="maxWidth"
              :max-height="maxHeight"
              @resize="handleModalResize"
            />
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>
<script>
import Modal from './index'
import Resizer from './Resizer.vue'
import {
  inRange,
  createModalEvent,
  getMutationObserver,
  blurActiveElement,
  windowWidthWithoutScrollbar,
  stringStylesToObject
} from './utils'
import { parseNumber, validateNumber } from './parser'

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
    overlayTransition: {
      type: String,
      default: 'overlay-fade'
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
    styles: {
      type: [String, Array, Object]
    },
    minWidth: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0
      }
    },
    minHeight: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0
      }
    },
    maxWidth: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    maxHeight: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    width: {
      type: [Number, String],
      default: 600,
      validator: validateNumber
    },
    height: {
      type: [Number, String],
      default: 300,
      validator(value) {
        return value === 'auto' || validateNumber(value)
      }
    },
    pivotX: {
      type: Number,
      default: 0.5,
      validator(value) {
        return value >= 0 && value <= 1
      }
    },
    pivotY: {
      type: Number,
      default: 0.5,
      validator(value) {
        return value >= 0 && value <= 1
      }
    }
  },
  components: {
    Resizer
  },
  data() {
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

      viewportHeight: 0,
      viewportWidth: 0,

      mutationObserver: null
    }
  },
  created() {
    this.setInitialSize()
  },
  /**
   * Sets global listeners
   */
  beforeMount() {
    Modal.event.$on('toggle', this.handleToggleEvent)

    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
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
       *
       * Detects if MutationObserver is available, return false if not.
       * No polyfill is provided here, so height 'auto' recalculation will
       * simply stay at its initial height (won't crash).
       * (Provide polyfill to support IE < 11)
       *
       * https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
       *
       * For the sake of SSR, MutationObserver cannot be initialized
       * before component creation >_<
       */
      const MutationObserver = getMutationObserver()

      if (MutationObserver) {
        this.mutationObserver = new MutationObserver(mutations => {
          this.updateRenderedHeight()
        })
      } else {
        console.warn(
          'MutationObserver was not found. Vue-js-modal automatic resizing relies ' +
            'heavily on MutationObserver. Please make sure to provide shim for it.'
        )
      }
    }

    if (this.clickToClose) {
      window.addEventListener('keyup', this.handleEscapeKeyUp)
    }
  },
  /**
   * Removes global listeners
   */
  beforeDestroy() {
    Modal.event.$off('toggle', this.handleToggleEvent)
    window.removeEventListener('resize', this.handleWindowResize)

    if (this.clickToClose) {
      window.removeEventListener('keyup', this.handleEscapeKeyUp)
    }
    /**
     * Removes blocked scroll
     */
    if (this.scrollable) {
      document.body.classList.remove('v--modal-block-scroll')
    }
  },
  computed: {
    /**
     * Returns true if height is set to "auto"
     */
    isAutoHeight() {
      return this.modal.heightType === 'auto'
    },
    /**
     * Calculates and returns modal position based on the
     * pivots, window size and modal size
     */
    position() {
      const {
        viewportHeight,
        viewportWidth,
        shift,
        pivotX,
        pivotY,
        trueModalWidth,
        trueModalHeight
      } = this

      const maxLeft = viewportWidth - trueModalWidth
      const maxTop = Math.max(viewportHeight - trueModalHeight, 0)

      const left = shift.left + pivotX * maxLeft
      const top = shift.top + pivotY * maxTop

      return {
        left: parseInt(inRange(0, maxLeft, left)),
        top: parseInt(inRange(0, maxTop, top))
      }
    },
    /**
     * Returns pixel width (if set with %) and makes sure that modal size
     * fits the window
     */
    trueModalWidth() {
      const { viewportWidth, modal, adaptive, minWidth, maxWidth } = this

      const value =
        modal.widthType === '%'
          ? (viewportWidth / 100) * modal.width
          : modal.width

      const max = Math.max(minWidth, Math.min(viewportWidth, maxWidth))

      return adaptive ? inRange(minWidth, max, value) : value
    },
    /**
     * Returns pixel height (if set with %) and makes sure that modal size
     * fits the window.
     *
     * Returns modal.renderedHeight if height set as "auto"
     */
    trueModalHeight() {
      const {
        viewportHeight,
        modal,
        isAutoHeight,
        adaptive,
        minHeight,
        maxHeight
      } = this

      const value =
        modal.heightType === '%'
          ? (viewportHeight / 100) * modal.height
          : modal.height

      if (isAutoHeight) {
        // use renderedHeight when height 'auto'
        return this.modal.renderedHeight
      }

      const max = Math.max(minHeight, Math.min(viewportHeight, maxHeight))

      return adaptive ? inRange(minHeight, max, value) : value
    },
    /**
     * Returns class list for screen overlay (modal background)
     */
    overlayClass() {
      return {
        'v--modal-overlay': true,
        scrollable: this.scrollable && this.isAutoHeight
      }
    },
    /**
     * Returns class list for modal itself
     */
    modalClass() {
      return ['v--modal-box', this.classes]
    },
    stylesProp() {
      return typeof this.styles === 'string'
        ? stringStylesToObject(this.styles)
        : this.styles
    },
    /**
     * CSS styles for position and size of the modal
     */
    modalStyle() {
      return [
        this.stylesProp,
        {
          top: this.position.top + 'px',
          left: this.position.left + 'px',
          width: this.trueModalWidth + 'px',
          height: this.isAutoHeight ? 'auto' : this.trueModalHeight + 'px'
        }
      ]
    }
  },
  watch: {
    /**
     * Sets the visibility of overlay and modal.
     * Events 'opened' and 'closed' is called here
     * inside `setTimeout` and `$nextTick`, after the DOM changes.
     * This fixes `$refs.modal` `undefined` bug (fixes #15)
     */
    visible(value) {
      // console.log('Activating visible watcher, value: ', value)

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

  methods: {
    handleToggleEvent(name, state, params) {
      if (this.name === name) {
        const nextState = typeof state === 'undefined' ? !this.visible : state

        this.toggle(nextState, params)
      }
    },
    /**
     * Initializes modal's size & position,
     * if "reset" flag is set to true - this function will be called
     * every time "beforeOpen" is triggered
     */
    setInitialSize() {
      const { modal } = this
      const width = parseNumber(this.width)
      const height = parseNumber(this.height)

      modal.width = width.value
      modal.widthType = width.type
      modal.height = height.value
      modal.heightType = height.type
    },

    handleEscapeKeyUp(event) {
      if (event.which === 27 && this.visible) {
        this.$modal.hide(this.name)
      }
    },

    handleWindowResize() {
      this.viewportWidth = windowWidthWithoutScrollbar()
      this.viewportHeight = window.innerHeight

      this.ensureShiftInWindowBounds()
    },
    /**
     * Generates event object
     */
    createModalEvent(args = {}) {
      return createModalEvent({
        name: this.name,
        ref: this.$refs.modal,
        ...args
      })
    },
    /**
     * Event handler which is triggered on modal resize
     */
    handleModalResize(event) {
      this.modal.widthType = 'px'
      this.modal.width = event.size.width

      this.modal.heightType = 'px'
      this.modal.height = event.size.height

      const { size } = this.modal

      this.$emit('resize', this.createModalEvent({ size }))
    },
    /**
     * Event handler which is triggered on $modal.show and $modal.hide
     * BeforeEvents: ('before-close' and 'before-open') are `$emit`ed here,
     * but AfterEvents ('opened' and 'closed') are moved to `watch.visible`.
     */
    toggle(nextState, params) {
      const { reset, scrollable, visible } = this

      if (visible === nextState) {
        return
      }

      const beforeEventName = visible ? 'before-close' : 'before-open'

      if (beforeEventName === 'before-open') {
        if (reset) {
          this.setInitialSize()

          this.shift.left = 0
          this.shift.top = 0
        }

        if (scrollable) {
          document.body.classList.add('v--modal-block-scroll')
        }
      } else {
        if (scrollable) {
          document.body.classList.remove('v--modal-block-scroll')
        }
      }

      let stopEventExecution = false

      const stop = () => {
        stopEventExecution = true
      }

      const beforeEvent = this.createModalEvent({
        stop,
        state: nextState,
        params
      })

      this.$emit(beforeEventName, beforeEvent)

      if (!stopEventExecution) {
        this.visible = nextState

        if (beforeEventName === 'before-open') {
          /**
           * Need to unfocus previously focused element, otherwise
           * all keypress events (ESC press, for example) will trigger on that element.
           */
          blurActiveElement()
        }
      }
    },

    getDraggableElement() {
      const selector =
        typeof this.draggable !== 'string' ? '.v--modal-box' : this.draggable

      return selector ? this.$refs.overlay.querySelector(selector) : null
    },

    /**
     * Event handler that is triggered when background overlay is clicked
     */
    handleBackgroundClick() {
      if (this.clickToClose) {
        this.toggle(false)
      }
    },

    /**
     *'opened' and 'closed' events are `$emit`ed here.
     * This is called in watch.visible.
     * Because modal DOM updates are async,
     * wrapping afterEvents in `$nextTick` fixes `$refs.modal` undefined bug.
     * (fixes #15)
     */
    callAfterEvent(state) {
      if (state) {
        this.connectObserver()
      } else {
        this.disconnectObserver()
      }
      const eventName = state ? 'opened' : 'closed'
      const event = this.createModalEvent({ state })
      this.$emit(eventName, event)
    },

    addDraggableListeners() {
      if (!this.draggable) {
        return
      }

      const dragger = this.getDraggableElement()

      if (dragger) {
        let startX = 0
        let startY = 0
        let cachedShiftX = 0
        let cachedShiftY = 0

        const getPosition = event => {
          return event.touches && event.touches.length > 0
            ? event.touches[0]
            : event
        }

        const handleDraggableMousedown = event => {
          let target = event.target

          if (
            target &&
            (target.nodeName === 'INPUT' ||
              target.nodeName === 'TEXTAREA' ||
              target.nodeName === 'SELECT')
          ) {
            return
          }

          let { clientX, clientY } = getPosition(event)

          document.addEventListener('mousemove', handleDraggableMousemove)
          document.addEventListener('touchmove', handleDraggableMousemove)

          document.addEventListener('mouseup', handleDraggableMouseup)
          document.addEventListener('touchend', handleDraggableMouseup)

          startX = clientX
          startY = clientY

          cachedShiftX = this.shift.left
          cachedShiftY = this.shift.top
        }

        const handleDraggableMousemove = event => {
          let { clientX, clientY } = getPosition(event)

          this.shift.left = cachedShiftX + clientX - startX
          this.shift.top = cachedShiftY + clientY - startY

          event.preventDefault()
        }

        const handleDraggableMouseup = event => {
          this.ensureShiftInWindowBounds()

          document.removeEventListener('mousemove', handleDraggableMousemove)
          document.removeEventListener('touchmove', handleDraggableMousemove)

          document.removeEventListener('mouseup', handleDraggableMouseup)
          document.removeEventListener('touchend', handleDraggableMouseup)

          event.preventDefault()
        }

        dragger.addEventListener('mousedown', handleDraggableMousedown)
        dragger.addEventListener('touchstart', handleDraggableMousedown)
      }
    },

    removeDraggableListeners() {
      /**
       * Ideally this is not needed because "dragger" will be unmounted anyway.
       */
    },
    /**
     * Update $data.modal.renderedHeight using getBoundingClientRect.
     * This method is called when:
     * 1. modal opened
     * 2. MutationObserver's observe callback
     */
    updateRenderedHeight() {
      if (this.$refs.modal) {
        this.modal.renderedHeight = this.$refs.modal.getBoundingClientRect().height
      }
    },
    /**
     * Start observing modal's DOM, if childList or subtree changes,
     * the callback (registered in beforeMount) will be called.
     */
    connectObserver() {
      if (this.mutationObserver) {
        this.mutationObserver.observe(this.$refs.overlay, {
          childList: true,
          attributes: true,
          subtree: true
        })
      }
    },
    /**
     * Disconnects MutationObserver
     */
    disconnectObserver() {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect()
      }
    },

    beforeTransitionEnter() {
      this.connectObserver()
    },

    afterTransitionEnter() {
      // console.log('after transition enter')
    },

    afterTransitionLeave() {
      // console.log('after transition leave')
    },

    ensureShiftInWindowBounds() {
      const {
        viewportHeight,
        viewportWidth,
        shift,
        pivotX,
        pivotY,
        trueModalWidth,
        trueModalHeight
      } = this

      const maxLeft = viewportWidth - trueModalWidth
      const maxTop = Math.max(viewportHeight - trueModalHeight, 0)

      const left = shift.left + pivotX * maxLeft
      const top = shift.top + pivotY * maxTop

      this.shift.left -= left - inRange(0, maxLeft, left)
      this.shift.top -= top - inRange(0, maxTop, top)
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
  width: 100%;
  min-height: 100%;
  height: auto;
}

.v--modal-overlay .v--modal-box {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.v--modal-overlay.scrollable .v--modal-box {
  margin-bottom: 2px;
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
