<template>
  <transition
    :name="guaranteedOverlayTransition"
    @before-enter="beforeOverlayTransitionEnter"
    @after-enter="afterOverlayTransitionEnter"
    @after-leave="afterOverlayTransitionLeave"
  >
    <div
      v-if="visibility.overlay"
      ref="overlay"
      :class="overlayClass"
      :aria-expanded="visibility.overlay.toString()"
      :data-modal="name"
    >
      <div
        class="v--modal-background-click"
        @mousedown.self="onBackgroundClick"
        @touchstart.self="onBackgroundClick"
      >
        <div class="v--modal-top-right">
          <slot name="top-right"/>
        </div>
        <transition
          :name="guaranteedModalTransition"
          @after-enter="afterModalTransitionEnter"
          @before-leave="beforeModalTransitionLeave"
          @after-leave="afterModalTransitionLeave"
        >
          <div
            v-if="visibility.modal"
            ref="modal"
            :class="modalClass"
            :style="modalStyle"
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
  blurActiveElement,
  windowWidthWithoutScrollbar,
  stringStylesToObject
} from './utils'
import ModalEvent from './ModalEvent'
import { parseNumber, validateNumber } from './parser'
import ResizeObserver from './ResizeObserver'

const defaultTransition = 'vue-js-modal-transition--default'

export default {
  name: 'VueJsModal',
  props: {
    name: {
      required: true,
      type: String
    },
    delay: {
      type: Number,
      default: 0,
      validator(value) {
        if (value > 0) {
          console.warn('[vue-js-modal] "delay" property is deprecated.')
        }
        return true
      }
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
      default: 'vue-js-modal-transition--overlay'
    },
    transition: {
      type: String,
      default: 'vue-js-modal-transition--modal'
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

      isVisibilityChanging: false,

      visibility: {
        modal: false,
        overlay: false
      },

      shiftLeft: 0,
      shiftTop: 0,

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
    Modal.event.$on('toggle', this.onToggle)

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

    if (this.clickToClose) {
      window.addEventListener('keyup', this.onEscapeKeyUp)
    }
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(entries => {
      if (entries.length > 0) {
        const [entry] = entries

        this.modal.renderedHeight = entry.contentRect.height
      }
    })
  },
  /**
   * Removes global listeners
   */
  beforeDestroy() {
    Modal.event.$off('toggle', this.onToggle)

    window.removeEventListener('resize', this.onWindowResize)

    if (this.clickToClose) {
      window.removeEventListener('keyup', this.onEscapeKeyUp)
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
     *  Because modal state is based on transitions - we need to make sure
     * that there is always a transition for overlay/modal
     **/
    guaranteedOverlayTransition() {
      return this.overlayTransition || defaultTransition
    },

    guaranteedModalTransition() {
      return this.transition || defaultTransition
    },

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
        shiftLeft,
        shiftTop,
        pivotX,
        pivotY,
        trueModalWidth,
        trueModalHeight
      } = this

      const maxLeft = viewportWidth - trueModalWidth
      const maxTop = viewportHeight - trueModalHeight

      const left = shiftLeft + pivotX * maxLeft
      const top = shiftTop + pivotY * maxTop

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
    visible(value) {
      if (value) {
        this.visibility.overlay = true
      } else {
        this.visibility.modal = false
      }
    }
  },

  methods: {
    beforeOverlayTransitionEnter() {
      /* Entering transition sequance started */
      this.isVisibilityChanging = true
    },

    afterOverlayTransitionEnter() {
      this.visibility.modal = true
    },

    afterOverlayTransitionLeave() {
      /* Leaving transition sequance finished */
      this.isVisibilityChanging = false

      const event = this.createModalEvent({
        state: 'closed'
      })

      this.$emit('closed', event)
    },

    afterModalTransitionEnter() {
      /* Entering transition sequance finished */
      this.isVisibilityChanging = false
      /* Setup resize ovserver */
      this.resizeObserver.observe(this.$refs.modal)

      const event = this.createModalEvent({
        state: 'opened'
      })

      this.$emit('opened', event)
    },

    beforeModalTransitionLeave() {
      /* Leaving transition sequance started */
      this.isVisibilityChanging = true
      this.resizeObserver.unobserve(this.$refs.modal)
    },

    afterModalTransitionLeave() {
      this.visibility.overlay = false
    },

    onToggle(name, state, params) {
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

    onEscapeKeyUp(event) {
      if (event.which === 27 && this.visible) {
        this.$modal.hide(this.name)
      }
    },

    onWindowResize() {
      this.viewportWidth = windowWidthWithoutScrollbar()
      this.viewportHeight = window.innerHeight

      this.ensureShiftInWindowBounds()
    },
    /**
     * Generates event object
     */
    createModalEvent(properties = {}) {
      return new ModalEvent({
        name: this.name,
        ref: this.$refs.modal || null,
        ...properties
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

      const isOpening = visible
      const isClosing = !visible

      const beforeEventName = visible ? 'before-close' : 'before-open'

      if (isOpening) {
        /**
         * Need to unfocus previously focused element, otherwise
         * all keypress events (ESC press, for example) will trigger on that element.
         */
        blurActiveElement()

        if (reset) {
          this.setInitialSize()

          this.shiftLeft = 0
          this.shiftTop = 0
        }

        if (scrollable) {
          document.body.classList.add('v--modal-block-scroll')
        }
      }

      if (isClosing) {
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
    onBackgroundClick() {
      if (this.clickToClose) {
        this.toggle(false)
      }
    },

    addDraggableListeners() {
      if (!this.draggable) {
        return
      }

      const dragger = this.getDraggableElement()

      if (dragger) {
        let startX = 0
        let startY = 0
        let cachedShiftLeft = 0
        let cachedShiftTop = 0

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

          cachedShiftLeft = this.shiftLeft
          cachedShiftTop = this.shiftTop
        }

        const handleDraggableMousemove = event => {
          let { clientX, clientY } = getPosition(event)

          this.shiftLeft = cachedShiftLeft + clientX - startX
          this.shiftTop = cachedShiftTop + clientY - startY

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

    ensureShiftInWindowBounds() {
      const {
        viewportHeight,
        viewportWidth,
        shiftLeft,
        shiftTop,
        pivotX,
        pivotY,
        trueModalWidth,
        trueModalHeight
      } = this

      const maxLeft = viewportWidth - trueModalWidth
      const maxTop = viewportHeight - trueModalHeight

      const left = shiftLeft + pivotX * maxLeft
      const top = shiftTop + pivotY * maxTop

      this.shiftLeft -= left - inRange(0, maxLeft, left)
      this.shiftTop -= top - inRange(0, maxTop, top)
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

.vue-js-modal-transition--overlay-enter-active,
.vue-js-modal-transition--overlay-leave-active {
  transition: all 50ms;
}

.vue-js-modal-transition--overlay-enter,
.vue-js-modal-transition--overlay-leave-active {
  opacity: 0;
}

.vue-js-modal-transition--modal-enter-active,
.vue-js-modal-transition--modal-leave-active {
  transition: all 400ms;
}

.vue-js-modal-transition--modal-enter,
.vue-js-modal-transition--modal-leave-active {
  opacity: 0;
  transform: translateY(-20px);
}

.vue-js-modal-transition--default-enter-active,
.vue-js-modal-transition--default-leave-active {
  transition: all 2ms;
}

.vue-js-modal-transition--default-enter,
.vue-js-modal-transition--default-leave-active {
  opacity: 0;
}
</style>
