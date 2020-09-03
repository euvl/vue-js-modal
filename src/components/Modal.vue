<template>
  <div v-if="visible" :class="containerClass">
    <transition
      :name="guaranteedOverlayTransition"
      @before-enter="beforeOverlayTransitionEnter"
      @after-enter="afterOverlayTransitionEnter"
      @before-leave="beforeOverlayTransitionLeave"
      @after-leave="afterOverlayTransitionLeave"
    >
      <div
        v-if="visibility.overlay"
        class="vm--overlay"
        :data-modal="name"
        :aria-expanded="visibility.overlay.toString()"
        @click.self.stop="onOverlayClick"
      >
        <div class="vm--top-right-slot">
          <slot name="top-right" />
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
        role="dialog"
        aria-modal="true"
      >
        <slot />
        <resizer
          v-if="resizable && !isAutoHeight"
          :min-width="minWidth"
          :min-height="minHeight"
          :max-width="maxWidth"
          :max-height="maxHeight"
          @resize="onModalResize"
        />
      </div>
    </transition>
  </div>
</template>
<script>
import Resizer from './Resizer.vue'
import {
  isInput,
  inRange,
  getTouchEvent,
  blurActiveElement,
  windowWidthWithoutScrollbar,
  stringStylesToObject
} from '../utils'
import { parseNumber, validateNumber } from '../utils/parser'
import ResizeObserver from '../utils/resizeObserver'
import FocusTrap from '../utils/focusTrap'

const defaultTransition = 'vm-transition--default'

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
    focusTrap: {
      type: Boolean,
      default: false
    },
    reset: {
      type: Boolean,
      default: false
    },
    overlayTransition: {
      type: String,
      default: 'vm-transition--overlay'
    },
    transition: {
      type: String,
      default: 'vm-transition--modal'
    },
    clickToClose: {
      type: Boolean,
      default: true
    },
    classes: {
      type: [String, Array],
      default: () => []
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
    shiftX: {
      type: Number,
      default: 0.5,
      validator(value) {
        return value >= 0 && value <= 1
      }
    },
    shiftY: {
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
    this.$modal.subscription.$on('toggle', this.onToggle)

    window.addEventListener('resize', this.onWindowResize)
    window.addEventListener('orientationchange', this.onWindowResize)

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

    this.$focusTrap = new FocusTrap()
  },
  /**
   * Removes global listeners
   */
  beforeDestroy() {
    this.$modal.subscription.$off('toggle', this.onToggle)

    window.removeEventListener('resize', this.onWindowResize)
    window.removeEventListener('orientationchange', this.onWindowResize)

    if (this.clickToClose) {
      window.removeEventListener('keyup', this.onEscapeKeyUp)
    }
    /**
     * Removes blocked scroll
     */
    document.body.classList.remove('vm--block-scroll')
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
        shiftX,
        shiftY,
        trueModalWidth,
        trueModalHeight
      } = this

      const maxLeft = viewportWidth - trueModalWidth
      const maxTop = Math.max(viewportHeight - trueModalHeight, 0)

      const left = shiftLeft + shiftX * maxLeft
      const top = shiftTop + shiftY * maxTop

      return {
        left: parseInt(inRange(0, maxLeft, left)),
        top:
          !trueModalHeight && this.isAutoHeight
            ? undefined
            : parseInt(inRange(0, maxTop, top))
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

      if (adaptive) {
        const max = Math.max(minWidth, Math.min(viewportWidth, maxWidth))
        return inRange(minWidth, max, value)
      }

      return value
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

      if (adaptive) {
        const max = Math.max(minHeight, Math.min(viewportHeight, maxHeight))

        return inRange(minHeight, max, value)
      }

      return value
    },

    /**
     * Returns the height of the modal when in 'auto' mode, making sure the
     * modal fits the viewport if 'adaptive' is also true
     */
    autoHeight() {
      return this.adaptive && this.modal.renderedHeight >= this.viewportHeight
        ? Math.max(this.minHeight, this.viewportHeight) + 'px'
        : 'auto'
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
      return ['vm--modal', this.classes]
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
          height: this.isAutoHeight
            ? this.autoHeight
            : this.trueModalHeight + 'px'
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
    },

    afterOverlayTransitionEnter() {
      this.overlayTransitionState = TransitionState.Enter
    },

    beforeOverlayTransitionLeave() {
      this.overlayTransitionState = TransitionState.Leaving
    },

    afterOverlayTransitionLeave() {
      this.overlayTransitionState = TransitionState.Leave
    },

    beforeModalTransitionEnter() {
      this.modalTransitionState = TransitionState.Entering

      this.$nextTick(() => {
        this.resizeObserver.observe(this.$refs.modal)
      })
    },

    afterModalTransitionEnter() {
      /* Setup resize ovserver */
      this.modalTransitionState = TransitionState.Enter

      if (this.draggable) {
        this.addDraggableListeners()
      }

      if (this.focusTrap) {
        this.$focusTrap.enable(this.$refs.modal)
      }

      const event = this.createModalEvent({
        state: 'opened'
      })

      this.$emit('opened', event)
    },

    beforeModalTransitionLeave() {
      this.modalTransitionState = TransitionState.Leaving
      this.resizeObserver.unobserve(this.$refs.modal)

      if (this.$focusTrap.enabled()) {
        this.$focusTrap.disable()
      }
    },

    afterModalTransitionLeave() {
      this.modalTransitionState = TransitionState.Leave

      const event = this.createModalEvent({
        state: 'closed'
      })

      this.$emit('closed', event)
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
      const width = parseNumber(this.width)
      const height = parseNumber(this.height)

      this.modal.width = width.value
      this.modal.widthType = width.type
      this.modal.height = height.value
      this.modal.heightType = height.type
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
      return {
        name: this.name,
        ref: this.$refs.modal || null,
        ...properties
      }
    },
    /**
     * Event handler which is triggered on modal resize
     */
    onModalResize(event) {
      this.modal.widthType = 'px'
      this.modal.width = event.size.width

      this.modal.heightType = 'px'
      this.modal.height = event.size.height

      const { size } = this.modal

      this.$emit(
        'resize',
        this.createModalEvent({
          size
        })
      )
    },

    open(params) {
      if (this.reset) {
        this.setInitialSize()

        this.shiftLeft = 0
        this.shiftTop = 0
      }

      if (this.scrollable) {
        document.body.classList.add('vm--block-scroll')
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
        if (this.scrollable) {
          document.body.classList.remove('vm--block-scroll')
        }

        return
      }
      /**
       * Need to unfocus previously focused element, otherwise
       * all keypress events (ESC press, for example) will trigger on that element.
       */
      blurActiveElement()

      this.visible = true
      /* Making sure that entering tranition uses "enter" sequance instead of "appear" */
      this.$nextTick(() => {
        this.startTransitionEnter()
      })
    },

    close(params) {
      if (this.scrollable) {
        document.body.classList.remove('vm--block-scroll')
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
      if (this.draggable === true) {
        return this.$refs.modal
      }

      if (typeof this.draggable === 'string') {
        return this.$refs.modal.querySelector(this.draggable)
      }

      return null
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
      const dragger = this.getDraggableElement()

      if (dragger) {
        let startX = 0
        let startY = 0
        let initialShiftLeft = 0
        let initialShiftTop = 0

        const handleDraggableMousedown = event => {
          let target = event.target

          if (isInput(target)) {
            return
          }

          let { clientX, clientY } = getTouchEvent(event)

          document.addEventListener('mousemove', handleDraggableMousemove)
          document.addEventListener('touchmove', handleDraggableMousemove)

          document.addEventListener('mouseup', handleDraggableMouseup)
          document.addEventListener('touchend', handleDraggableMouseup)

          startX = clientX
          startY = clientY

          initialShiftLeft = this.shiftLeft
          initialShiftTop = this.shiftTop
        }

        const handleDraggableMousemove = event => {
          let { clientX, clientY } = getTouchEvent(event)

          this.shiftLeft = initialShiftLeft + clientX - startX
          this.shiftTop = initialShiftTop + clientY - startY

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
        shiftX,
        shiftY,
        trueModalWidth,
        trueModalHeight
      } = this

      const maxLeft = viewportWidth - trueModalWidth
      const maxTop = Math.max(viewportHeight - trueModalHeight, 0)

      const left = shiftLeft + shiftX * maxLeft
      const top = shiftTop + shiftY * maxTop

      this.shiftLeft -= left - inRange(0, maxLeft, left)
      this.shiftTop -= top - inRange(0, maxTop, top)
    }
  }
}
</script>

<style>
.vm--block-scroll {
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

.vm--modal {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  background-color: white;
  border-radius: 3px;
  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
}

.vm--container.scrollable .vm--modal {
  margin-bottom: 2px;
}

.vm--top-right-slot {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
}

.vm-transition--overlay-enter-active,
.vm-transition--overlay-leave-active {
  transition: all 50ms;
}

.vm-transition--overlay-enter,
.vm-transition--overlay-leave-active {
  opacity: 0;
}

.vm-transition--modal-enter-active,
.vm-transition--modal-leave-active {
  transition: all 400ms;
}

.vm-transition--modal-enter,
.vm-transition--modal-leave-active {
  opacity: 0;
  transform: translateY(-20px);
}

.vm-transition--default-enter-active,
.vm-transition--default-leave-active {
  transition: all 2ms;
}

.vm-transition--default-enter,
.vm-transition--default-leave-active {
  opacity: 0;
}
</style>
