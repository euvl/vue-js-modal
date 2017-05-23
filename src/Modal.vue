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
                   @resize="resize"/>
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

  export default {
    name: 'VueJsModal',
    props: {
      name: {
        required: true,
        type: [String, Number],
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
      transition: {
        type: String
      },
      classes: {
        type: [String, Array],
        default: 'v--modal',
      },
      minWidth: {
        type: Number,
        default: 0
      },
      minHeight: {
        type: Number,
        default: 0
      },
      width: {
        type: Number,
        default: 600
      },
      height: {
        type: Number,
        default: 300,
        /*
        [Number, String],
        validator (value) {
          return typeof value === 'string'
            ? (value === 'auto')
            : true
        }
        */
      },
      pivotX: {
        type: Number,
        default: 0.5
      },
      pivotY: {
        type: Number,
        default: 0.5
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
          width: this.width,
          height: this.height
        },

        window: {
          width: window.innerWidth,
          height: window.innerWidth
        },

        draggableElement: false
      };
    },
    watch: {
      visible (value) {
        if (value) {
          this.visibility.overlay = true
          this.adaptSize()

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
      Modal.event.$on('toggle', (name, state, params) => {
        if (name === this.name) {
          if (typeof state === 'undefined') {
            state = !this.visible
          }

          this.toggle(state, params)
        }
      });

      window.addEventListener('resize', this.onWindowResize)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onWindowResize)
    },
    beforeMount () {
      this.onWindowResize()
    },
    computed: {
      position () {
        const { window, modal, shift } = this
        const maxLeft = window.width - modal.width
        const maxTop = window.height - modal.height

        const left = shift.left + this.pivotX * (window.width - modal.width)
        const top = shift.top + this.pivotY * (window.height - modal.height)

        return {
          left: inRange(0, maxLeft, left),
          top: inRange(0, maxTop, top)
        }
      },

      modalClass () {
        return ['v--modal-box', this.classes]
      },

      modalStyle () {
        return {
          top: this.position.top + 'px',
          left: this.position.left + 'px',
          width: this.modal.width + 'px',
          height: this.modal.height + 'px'
        }
      }
    },
    methods: {
      onWindowResize () {
        this.window.width = window.innerWidth
        this.window.height = window.innerHeight
        this.adaptSize()
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
//        return event
      },

      adaptSize () {
        if (this.adaptive) {
          this.modal.width = inRange(0, this.window.width, this.modal.width)
          this.modal.height = inRange(0, this.window.height, this.modal.height)
        }
      },

      resize (event) {
        this.modal.width = event.size.width
        this.modal.height = event.size.height

        const { size } = this.modal
        const resizeEvent = this.genEventObject({ size });

        this.$emit('resize', resizeEvent)
      },

      toggle (state, params) {
        const beforeEventName = this.visible ? 'before-close' : 'before-open'
        const afterEventName = this.visible ? 'closed' : 'opened'

        let stopEventExecution = false

        const stop = () => { stopEventExecution = true }
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
<style scoped>
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
    background-color: white;
  }

  .v--modal {
    background: white;
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
