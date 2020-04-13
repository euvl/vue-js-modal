<template>
  <div
    v-if="visible"
    :class="containerClass"
    :data-modal="name"
  >
    <transition
      :name="guaranteedOverlayTransition"
      @before-enter="beforeOverlayTransitionEnter"
      @after-enter="afterOverlayTransitionEnter"
      @before-leave="beforeOverlayTransitionLeave"
      @after-leave="afterOverlayTransitionLeave"
    >
      <div
        v-if="visibility.overlay"
        ref="overlay"
        class="vm--overlay"
        :aria-expanded="visibility.overlay.toString()"
        @mousedown.self="onOverlayClick"
        @touchstart.self="onOverlayClick"
      >
        <div class="vm--top-right-slot">
          <slot name="top-right"/>
        </div>
      </div>
    </transition>
    <transition
      :name="guaranteedModalTransition"
      @before-enter="beforeModalTransitionEnter"
      @after-enter="afterModalTransitionEnter"
      @before-leave="beforeModalTransitionLeave"
      @after-leave="afterModalTransitionLeave"
    >
      <div
        v-if="visibility.modal"
        ref="modal"
        :aria-expanded="visibility.modal.toString()"
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

const TransitionState = {
  Enter: 'enter',
  Entering: 'entering',
  Leave: 'leave',
  Leaving: 'leavng'
}

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

      // isVisibilityChanging: false,

      visibility: {
        modal: false,
        overlay: false
      },

      overlayTransitionState: null,
      modalTransitionState: null,

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
      viewportWidth: 0
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
    hasTransitionFinished() {
      return this.visibility.modal === this.visibility.overlay
    },
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
    containerClass() {
      return [
        'vm--container',
        this.scrollable && this.isAutoHeight && 'scrollable'
      ]
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
    },

    isComponentReadyToBeDestroyed() {
      return (
        this.overlayTransitionState === TransitionState.Leave &&
        this.modalTransitionState === TransitionState.Leave
      )
    }
  },

  watch: {
    // visible(value) {
    //   if (value) {
    //     this.startTransitionEnter()
    //   }
    //   // } else {
    //   //   this.visibility.overlay = false
    //   //   this.visibility.modal = false
    //   // }
    // },

    isComponentReadyToBeDestroyed(isReady) {
      if (isReady) {
        this.visible = false
      }
    }
  },

  methods: {
    startTransitionEnter() {
      this.visibility.overlay = true
      this.visibility.modal = true
    },

    startTransitionLeave() {
      this.visibility.overlay = false
      this.visibility.modal = false
    },

    beforeOverlayTransitionEnter() {
      this.overlayTransitionState = TransitionState.Entering
      /* Entering transition sequance started */
      // this.isVisibilityChanging = true
    },

    afterOverlayTransitionEnter() {
      this.overlayTransitionState = TransitionState.Enter
      // this.visibility.modal = true
    },

    beforeOverlayTransitionLeave() {
      this.overlayTransitionState = TransitionState.Leaving
    },

    afterOverlayTransitionLeave() {
      this.overlayTransitionState = TransitionState.Leave
      /* Leaving transition sequance finished */
      // this.isVisibilityChanging = false
    },

    beforeModalTransitionEnter() {
      this.modalTransitionState = TransitionState.Entering
    },

    afterModalTransitionEnter() {
      /* Entering transition sequance finished */
      // this.isVisibilityChanging = false
      /* Setup resize ovserver */
      this.modalTransitionState = TransitionState.Enter
      this.resizeObserver.observe(this.$refs.modal)

      const event = this.createModalEvent({
        state: 'opened'
      })

      this.$emit('opened', event)
    },

    beforeModalTransitionLeave() {
      this.modalTransitionState = TransitionState.Leaving
      this.resizeObserver.unobserve(this.$refs.modal)
      /* Leaving transition sequance started */
      // this.isVisibilityChanging = true
    },

    afterModalTransitionLeave() {
      this.modalTransitionState = TransitionState.Leave

      const event = this.createModalEvent({
        state: 'closed'
      })

      this.$emit('closed', event)
      // this.visibility.overlay = false
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

    open(params) {
      /**
       * Need to unfocus previously focused element, otherwise
       * all keypress events (ESC press, for example) will trigger on that element.
       */
      blurActiveElement()

      if (this.reset) {
        this.setInitialSize()

        this.shiftLeft = 0
        this.shiftTop = 0
      }

      if (this.scrollable) {
        document.body.classList.add('v--modal-block-scroll')
      }

      let cancelEvent = false

      const cancel = () => {
        cancelEvent = true
      }

      const event = this.createModalEvent({
        cancel,
        state: 'before-open',
        params
      })

      this.$emit('before-open', event)

      if (cancelEvent) {
        return
      }

      this.visible = true
      /* Making sure that entering tranition uses "enter" sequance instead of "appear" */
      this.$nextTick(() => {
        this.startTransitionEnter()
      })
    },

    close(params) {
      if (this.scrollable) {
        document.body.classList.remove('v--modal-block-scroll')
      }

      let cancelEvent = false

      const cancel = () => {
        cancelEvent = true
      }

      const event = this.createModalEvent({
        cancel,
        state: 'before-close',
        params
      })

      this.$emit('before-close', event)

      if (cancelEvent) {
        return
      }

      this.startTransitionLeave()
    },
    /**
     * Event handler which is triggered on $modal.show and $modal.hide
     * BeforeEvents: ('before-close' and 'before-open') are `$emit`ed here,
     * but AfterEvents ('opened' and 'closed') are moved to `watch.visible`.
     */
    toggle(isOpening, params) {
      const { visible } = this

      if (visible === isOpening) {
        return
      }

      if (isOpening) {
        this.open(params)
      } else {
        this.close(params)
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
    onOverlayClick() {
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

.vm--container {
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
}

.vm--overlay {
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  /* z-index: 999; */
  opacity: 1;
}

.vm--container.scrollable {
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.v--modal-box {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.vm--container.scrollable .v--modal-box {
  margin-bottom: 2px;
}

.v--modal {
  background-color: white;
  text-align: left;
  border-radius: 3px;
  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
  padding: 0;
}

/* .v--modal.v--modal-fullscreen {
  width: 100vw;
  height: 100vh;
  margin: 0;
  left: 0;
  top: 0;
} */

.vm--top-right-slot {
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
