<template>
  <transition name="overlay-fade">
    <div v-if="visibility.overlay"
         ref="overlay"
         class="v--modal-overlay"
         :aria-expanded="visible.toString()"
         :data-modal="name"
         @mousedown.stop="toggle(false)">
      <div class="v--modal-top-right">
        <slot name="top-right"/>
      </div>
      <transition :name="transition">
        <div v-if="visibility.modal"
             ref="modal"
             :class="modalClass"
             :style="modalStyle"
             @mousedown.stop>
          <slot/>
          <resizer v-if="resizable"
                   :min-width="minWidth"
                   :min-height="minHeight"
                   @resize="onModalResize"/>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
  import Vue         from 'vue'
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
        default: 0,
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
      reset: {
        type: Boolean,
        default: false
      },
      transition: {
        type: String
      },
      classes: {
        type: [String, Array],
        default: 'v--modal',
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
            return (width.type === '%' || width.type === 'px')
              && width.value > 0
          }

          return value >= 0
        }
      },
      height: {
        type: [Number, String],
        default: 300,
        validator (value) {
          if (typeof value === 'string') {
            let height = parseNumber(value)
            return (height.type === '%' || height.type === 'px')
              && height.value > 0
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
        //  this.adaptSize()

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
    beforeMount () {
      Modal.event.$on('toggle', (name, state, params) => {
        if (name === this.name) {
          if (typeof state === 'undefined') {
            state = !this.visible
          }

          this.toggle(state, params)
        }
      });

      window.addEventListener('resize', this.onWindowResize)
      this.onWindowResize()
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onWindowResize)
    },
    computed: {
      position () {
        const { window, modal, shift } = this

        const maxLeft = window.width - this.trueModalWidth
        const maxTop = window.height - this.trueModalHeight

        const left = shift.left + 
          this.pivotX * (window.width - this.trueModalWidth)
        const top = shift.top + 
          this.pivotY * (window.height - this.trueModalHeight)

        return {
          left: inRange(0, maxLeft, left),
          top: inRange(0, maxTop, top)
        }
      },

      trueModalWidth () {
        const { window, modal } = this
        const value = modal.widthType === '%'
          ? window.width / 100 * modal.width
          : modal.width

        return this.adaptive
          ? inRange(this.minWidth, this.window.width, value)
          : value
      },

      trueModalHeight () {
        const { window, modal } = this
        const value = (modal.heightType === '%') 
          ? window.height / 100 * modal.height 
          : modal.height

        return this.adaptive
          ? inRange(this.minHeight, this.window.height, value)
          : value
      },

      modalClass () {
        return ['v--modal-box', this.classes]
      },

      modalStyle () {
        return {
          top: this.position.top + 'px',
          left: this.position.left + 'px',
          width: this.trueModalWidth + 'px',
          height: this.trueModalHeight + 'px'
        }
      }
    },
    methods: {
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

      genEventObject (params) {
        //todo: clean this up (change to ...)
        var data = {
          name: this.name,
          timestamp: Date.now(),
          canceled: false,
          ref: this.$refs.modal,
          stop: function() {
            this.canceled = true
          }
        }

        return Vue.util.extend(data, params || {});
      },

      onModalResize (event) {
        this.modal.widthType = 'px'
        this.modal.width = event.size.width

        this.modal.heightType = 'px'
        this.modal.height = event.size.height

        const { size } = this.modal
        const resizeEvent = this.genEventObject({ size });

        this.$emit('resize', resizeEvent)
      },

      toggle (state, params) {
        const { reset, visible } = this

        const beforeEventName = visible 
          ? 'before-close' 
          : 'before-open'
          
        const afterEventName = visible 
          ? 'closed' 
          : 'opened'

        if (beforeEventName === 'before-open' && reset) {
          this.setInitialSize()
          this.shift.left = 0
          this.shift.top = 0
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

      emitCancelableEvent (data) {
        let stopEventExecution = false
        let stop = () => { stopEventExecution = true }
        let event = this.genEventObject(data)
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

      addDraggableListeners () {
        if (!this.draggable) {
          return;
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
            let { clientX, clientY } = getPosition(event)

            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)

            document.addEventListener('touchmove', mousemove)
            document.addEventListener('touchend', mouseup)

            startX = clientX
            startY = clientY
            cachedShiftX = this.shift.left
            cachedShiftY = this.shift.top

            event.preventDefault()
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
  };
</script>
<style>
  .v--modal-overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
    opacity: 1;
  }

  .v--modal-overlay .v--modal-box {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
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
