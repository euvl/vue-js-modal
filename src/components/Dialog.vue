<template>
  <component
    :is="$modal.context.componentName"
    name="dialog"
    height="auto"
    :classes="['vue-dialog', params.class]"
    :width="width"
    :shift-y="0.3"
    :adaptive="true"
    :focus-trap="true"
    :clickToClose="clickToClose"
    :transition="transition"
    @before-open="beforeOpened"
    @before-close="beforeClosed"
    @opened="$emit('opened', $event)"
    @closed="$emit('closed', $event)"
  >
    <div class="vue-dialog-content">
      <div class="vue-dialog-content-title" v-if="params.title" v-html="params.title || ''" />

      <component v-if="params.component" v-bind="params.props" :is="params.component" />
      <div v-else v-html="params.text || ''" />
    </div>
    <div class="vue-dialog-buttons" v-if="buttons">
      <button
        v-for="(button, index) in buttons"
        :class="button.class || 'vue-dialog-button'"
        type="button"
        tabindex="0"
        :style="buttonStyle"
        :key="index"
        v-html="button.title"
        @click.stop="click(index, $event)"
      >{{ button.title }}</button>
    </div>
    <div v-else class="vue-dialog-buttons-none" />
  </component>
</template>
<script>
export default {
  name: 'VueJsDialog',
  props: {
    width: {
      type: [Number, String],
      default: 400
    },
    clickToClose: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String
    }
  },
  data() {
    return {
      params: {}
    }
  },
  computed: {
    buttons() {
      return this.params.buttons || []
    },
    /**
     * Returns FLEX style with correct width for arbitrary number of
     * buttons.
     */
    buttonStyle() {
      return {
        flex: `1 1 ${100 / this.buttons.length}%`
      }
    }
  },
  methods: {
    beforeOpened(event) {
      // window.addEventListener('keyup', this.onKeyUp)

      this.params = event.params || {}
      this.$emit('before-opened', event)
    },

    beforeClosed(event) {
      // window.removeEventListener('keyup', this.onKeyUp)

      this.params = {}
      this.$emit('before-closed', event)
    },

    click(buttonIndex, event, source = 'click') {
      const button = this.buttons[buttonIndex]
      const handler = button?.handler

      if (typeof handler === 'function') {
        handler(buttonIndex, event, { source })
      }
    }
  }
}
</script>
<style>
.vue-dialog {
  font-size: 14px;
}

.vue-dialog div {
  box-sizing: border-box;
}

.vue-dialog-content {
  flex: 1 0 auto;
  width: 100%;
  padding: 14px;
}

.vue-dialog-content-title {
  font-weight: 600;
  padding-bottom: 14px;
}

.vue-dialog-buttons {
  display: flex;
  flex: 0 1 auto;
  width: 100%;
  border-top: 1px solid #eee;
}

.vue-dialog-buttons-none {
  width: 100%;
  padding-bottom: 14px;
}

.vue-dialog-button {
  font-size: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border: 0;
  cursor: pointer;
  box-sizing: border-box;
  line-height: 40px;
  height: 40px;
  color: inherit;
  font: inherit;
  outline: none;
}

.vue-dialog-button:hover {
  background: #f9f9f9;
}

.vue-dialog-button:active {
  background: #f3f3f3;
}

.vue-dialog-button:not(:first-of-type) {
  border-left: 1px solid #eee;
}
</style>
