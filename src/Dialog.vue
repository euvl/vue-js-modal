<template>
  <modal
    name="dialog"
    height="auto"
    :classes="['v--modal', 'vue-dialog', this.params.class]"
    :width="width"
    :pivot-y="0.3"
    :adaptive="true"
    :clickToClose="clickToClose"
    :transition="transition"
    @before-open="beforeOpened"
    @before-close="beforeClosed"
    @opened="$emit('opened', $event)"
    @closed="$emit('closed', $event)">
    <div class="dialog-content">
      <div
        class="dialog-c-title"
        v-if="params.title"
        v-html="params.title || ''"></div>
      <component
        v-if="params.component"
        v-bind="params.props"
        :is="params.component">
      </component>
      <div
        class="dialog-c-text"
        v-else
        v-html="params.text || ''"></div>
    </div>
    <div
      class="vue-dialog-buttons"
      v-if="buttons">
      <button
        v-for="(button, i) in buttons"
        :class="button.class || 'vue-dialog-button'"
        type="button"
        :style="buttonStyle"
        :key="i"
        v-html="button.title"
        @click.stop="click(i, $event)">
        {{button.title}}
      </button>
    </div>
    <div v-else class="vue-dialog-buttons-none"></div>
  </modal>
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
      type: String,
      default: 'fade'
    }
  },
  data () {
    return {
      params: {},
      defaultButtons: [{ title: 'CLOSE' }]
    }
  },
  computed: {
    buttons () {
      return this.params.buttons || this.defaultButtons
    },
    /**
      * Returns FLEX style with correct width for arbitrary number of
      * buttons.
      */
    buttonStyle () {
      return {
        flex: `1 1 ${100 / this.buttons.length}%`
      }
    }
  },
  methods: {
    beforeOpened (event) {
      window.addEventListener('keyup', this.onKeyUp)

      this.params = event.params || {}
      this.$emit('before-opened', event)
    },
    beforeClosed (event) {
      window.removeEventListener('keyup', this.onKeyUp)

      this.params = {}
      this.$emit('before-closed', event)
    },
    click (i, event, source = 'click') {
      const button = this.buttons[i]

      if (button && typeof button.handler === 'function') {
        button.handler(i, event, { source })
      } else {
        this.$modal.hide('dialog')
      }
    },
    onKeyUp (event) {
      if (event.which === 13 && this.buttons.length > 0) {
        const buttonIndex =
          this.buttons.length === 1
            ? 0
            : this.buttons.findIndex(button => button.default)

        if (buttonIndex !== -1) {
          this.click(buttonIndex, event, 'keypress')
        }
      }
    }
  }
}
</script>
<style>
.vue-dialog div {
  box-sizing: border-box;
}

.vue-dialog .dialog-flex {
  width: 100%;
  height: 100%;
}

.vue-dialog .dialog-content {
  flex: 1 0 auto;
  width: 100%;
  padding: 15px;
  font-size: 14px;
}

.vue-dialog .dialog-c-title {
  font-weight: 600;
  padding-bottom: 15px;
}

.vue-dialog .dialog-c-text {
}

.vue-dialog .vue-dialog-buttons {
  display: flex;
  flex: 0 1 auto;
  width: 100%;
  border-top: 1px solid #eee;
}

.vue-dialog .vue-dialog-buttons-none {
  width: 100%;
  padding-bottom: 15px;
}

.vue-dialog-button {
  font-size: 12px !important;
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
  background: rgba(0, 0, 0, 0.01);
}

.vue-dialog-button:active {
  background: rgba(0, 0, 0, 0.025);
}

.vue-dialog-button:not(:first-of-type) {
  border-left: 1px solid #eee;
}
</style>
