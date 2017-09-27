<template>
  <modal name="dialog"
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
        <div class="dialog-c-title"
             v-if="params.title"
             v-html="params.title || ''"></div>
        <div class="dialog-c-text"
             v-html="params.text || ''"></div>
      </div>
      <div class="dialog-buttons" v-if="buttons">
        <button v-for="(button, i) in buttons"
                :style="buttonStyle"
                :key="i"
                v-html="button.title"
                @click.stop="click(i, $event)">
          {{button.title}}
        </button>
      </div>
      <div v-else class="dialog-buttons-none"></div>
  </modal>
</template>
<script>
  export default {
    name: 'Dialog',
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
        this.params = event.params || {}
        this.$emit('before-opened', event)
      },
      beforeClosed (event) {
        this.params = {}
        this.$emit('before-closed', event)
      },
      click (i, event) {
        let button = this.buttons[i]

        if (typeof button.handler === 'function') {
          return button.handler(i, event)
        } else {
          this.$modal.hide('dialog')
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

  .vue-dialog .dialog-flex {
    width: 100%;
    height: 100%;
  }

  .vue-dialog .dialog-content {
    flex: 1 0 auto;
    width: 100%;
    padding: 15px;
  }

  .vue-dialog .dialog-c-title {
    font-weight: 600;
    padding-bottom: 15px;
  }

  .vue-dialog .dialog-c-text {
  }

  .vue-dialog .dialog-buttons {
    display: flex;
    flex: 0 1 auto;
    width: 100%;
    border-top: 1px solid #eee;
    font-size: 12px;
  }

  .vue-dialog .dialog-buttons-none {
    width: 100%;
    padding-bottom: 15px;
  }

  .vue-dialog button {
    background: transparent;
    padding: 0;
    margin: 0;
    border: 0;
    cursor: pointer;
    box-sizing: border-box;
    line-height: 44px;
    height: 44px;

  /*  text-transform: uppercase; */
  /*  letter-spacing: 1px; */

    color:inherit;
    font:inherit;
  }

  .vue-dialog button:hover {
    background: rgba(0, 0, 0, 0.01);
  }

  .vue-dialog button:active {
    background: rgba(0, 0, 0, 0.025);
  }

  .vue-dialog button:not(:first-of-type) {
    border-left: 1px solid #eee;
  }
</style>
