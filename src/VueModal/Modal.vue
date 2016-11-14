<template>
  <div class="vue-modal-overlay" v-if="visibleOverlay" @click.stop="toggle(false)">
    <transition :name="transition">
      <div :class="modalclass" ref="modal" :style="styles" v-show="visibleModal" @click.stop>
        <template v-if="withTitle">
          <div class="modal-title">
            <slot name="title-left"/>
            <slot name="title-right"/>
          </div>
        </template>
        <slot/>
      </div>
    </transition>
  </div>
</template>
<script>
  import Vue from 'vue';
  import VueModal from './index';

  const props = {
    name: {
      required: true,
      type: [String, Number],
    },
    withTitle: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Number,
      default: 0,
    },
    position: {
      type: Array,
    },
    transition: {
      type: String,
    },
    classes: {
      type: [String, Array],
      default: 'vue-modal',
    },
    width: {
      type: Number,
      default: 600,
    },
  };

  export default {
    name: 'Modal',
    props,
    data() {
      return {
        visible: false,
        visibleModal: false,
        visibleOverlay: false,
      };
    },
    watch: {
      visible(value) {
        if (this.delay > 0) {
          if (value) {
            this.visibleOverlay = true;
            setTimeout(() => { this.visibleModal = true; },
              this.delay);
          } else {
            this.visibleModal = false;
            setTimeout(() => { this.visibleOverlay = false; },
              this.delay);
          }
        } else {
          this.visibleOverlay = value;

          Vue.nextTick(() => {
            this.visibleModal = value;
          });
        }
      },
    },
    created() {
      VueModal.event.$on('toggle', (name, state) => {
        if (name === this.name) {
          this.toggle(!this.visible);
        }
      });
    },
    computed: {
      modalclass() {
        return ['modal', this.classes];
      },
      styles() {
        return {
          'margin-left': (-this.width / 2) + 'px',
          width: this.width + 'px',
        };
      },
    },
    methods: {
      toggle(state) {
        const before = this.visible ? 'before-close' : 'before-open';
        const after = this.visible ? 'opened' : 'closed';

        this.$emit(before, this.name);
        this.visible = !!state;
        this.$emit(after, this.name);
      },
    },
  };
</script>
<style>
  .vue-modal-overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.1);
    z-index: 999;
  }

  .vue-modal-fade-enter-active, .vue-modal-fade-leave-active {
    transition: all .3s;
  }

  .vue-modal-fade-enter, .vue-modal-fade-leave-active {
    opacity: 0;
    transform: translateY(-20px);
  }

  .vue-modal {
    position: absolute;
    background: white;
    position: relative;
    text-align: left;

    left: 50%;
    top: 20%;

    box-sizing: border-box;
    border-radius: 3px;
    box-shadow: 0 20px 60px -2px rgba(27, 33, 58, .4);
    padding: 5px;
  }
</style>
