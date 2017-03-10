<template>
  <transition name="overlay-fade">
    <div v-if="visibility.overlay"
         class="nice-modal-overlay"
         @mousedown.stop="toggle(false)">
      <transition :name="transition">
        <div v-if="visibility.modal"
             v-bind:class="modalClass"
             v-bind:style="modalStyle"
             v-on:mousedown.stop
             ref="modal">
          <slot></slot>
          <resizer v-if="resizable" @resize="resize"/>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
  import Vue from 'vue';
  import Modal from './index';
  import Resizer from './Resizer.vue';

  export default {
    name: 'Modal',
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
      transition: {
        type: String,
      },
      classes: {
        type: [String, Array],
        default: 'nice-modal',
      },
      width: {
        type: Number,
        default: 600
      },
      height: {
        type: Number,
        default: 300
      },
      minWidth: {
        type: Number,
        default: 0
      },
      minHeight: {
        type: Number,
        default: 0
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

        modal: {
          width: this.width,
          height: this.height
        },

        window: {
          width: window.innerWidth,
          height: window.innerWidth
        }
      };
    },
    watch: {
      visible(value) {
        if (this.delay > 0) {
          if (value) {
            this.visibility.overlay = true;
            setTimeout(() => this.visibility.modal = true, this.delay);
          } else {
            this.visibility.modal = false;
            setTimeout(() => this.visibility.overlay = false, this.delay);
          }
        } else {
          this.visibility.overlay = value;
          Vue.nextTick(() => this.visibility.modal = value);
        }
      },
    },
    created() {
      Modal.event.$on('toggle', (name, state, params) => {
        if (name === this.name) {
          this.toggle(!this.visible, params);
        }
      });

      window.addEventListener('resize', this.onWindowResize);
    },
    beforeMount() {
      this.onWindowResize();
    },
    computed: {
      position() {
        return {
          left: (this.window.width - this.modal.width) / 2,
          top: (this.window.height - this.modal.height) / 2
        }
      },
      modalClass() {
        return ['modal', this.classes];
      },
      modalStyle() {
        return {
          top: this.position.top + 'px',
          left: this.position.left + 'px',
          width: this.modal.width + 'px',
          height: this.modal.height + 'px'
        }
      }
    },
    methods: {
      onWindowResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;

        if (this.adaptive) {
          this.modal.width = this.window.width > this.width
            ? this.width
            : this.window.width

          this.modal.height = this.window.height > this.height
            ? this.height
            : this.window.height;
        }
      },
      genEventObject(params) {
        return Vue.util.extend(
          {
            name: this.name,
            ref: this.$refs.modal,
            timestamp: Date.now()
          },
          params || {});
      },
      resize(event) {
        this.modal.width = event.size.width;

        let resizeEvent = this.genEventObject({
          size: this.modal
        });

        this.$emit('resize', resizeEvent);
      },
      toggle(state, params) {
        const beforeEventName = this.visible ? 'before-close' : 'before-open';
        const afterEventName = this.visible ? 'closed' : 'opened';

        let stopEventExecution = false;

        const beforeEvent = this.genEventObject({
          stop: () => stopEventExecution = false,
          state,
          params
        });

        this.$emit(beforeEventName, beforeEvent);

        if (!stopEventExecution) {
          this.visible = !!state;

          const afterEvent = this.genEventObject({
            state,
            params
          });

          this.$emit(afterEventName, afterEvent);
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .nice-modal-overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
    opacity: 1;

    .modal {
      position: relative;
      overflow: hidden;
      box-sizing: border-box;

      background-color: white;
    }
  }

  .overlay-fade-enter-active, .overlay-fade-leave-active {
    transition: all 0.2s;
  }

  .overlay-fade-enter, .overlay-fade-leave-active {
    opacity: 0;
  }

  .nice-modal-fade-enter-active, .nice-modal-fade-leave-active {
    transition: all 0.5s;
  }

  .nice-modal-fade-enter, .nice-modal-fade-leave-active {
    opacity: 0;
    transform: translateY(-20px);
  }

  .nice-modal {
    background: white;
    text-align: left;
    border-radius: 3px;
    box-shadow: 0 20px 60px -2px rgba(27, 33, 58, .4);
    padding: 0;

    &.nice-modal-fullscreen {
      width: 100vw;
      height: 100vh;
      margin: 0;
      left: 0;
      top: 0;
    }
  }
</style>
