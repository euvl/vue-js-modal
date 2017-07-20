<template>
  <modal name="dialog"
         classes="v--modal vue-dialog"
         :width="400"
         :height="180"
         :pivot-y="0.3"
         :adaptive="true"
         transition="fade"
         @before-open="beforeOpened"
         @before-close="beforeClosed">
    <flex-box direction="column" class="dialog-flex">
      <div class="dialog-content">
        <div class="dialog-c-title" v-text="params.title || ''"></div>
        <div class="dialog-c-text" v-html="params.text || ''"></div>
      </div>
      <div class="dialog-buttons" v-if="buttons.length > 0">
        <button v-for="(button, i) in buttons"
                :style="buttonStyle"
                :key="i"
                @click.stop="click(i, $event)">
          {{button.title}}
        </button>
      </div>
    </flex-box>
  </modal>
</template>
<script>
  /*
  buttons: [
    { title: 'Cancel' },
    { 
      title: 'Ok', 
      handler: () => {
        
      }
    }
  ]
  */
  export default {
    name: 'Dialog',
    data() {
      return {
        params: {},
        _buttons: [{ title: 'Cancel' }]
      }
    },
    computed: {
      buttons () {
        return this.params.buttons || this._buttons
      },
      buttonStyle () {
        return {
          flex: `1 1 ${100 / this.buttons.length}%`
        }
      }
    },
    methods: {
      beforeOpened (event) {
        this.params = event.params || {}
      },
      beforeClosed () {
        this.params = {}
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
<style lang="scss">
  .vue-dialog {
    font-size: 14px;
    color: rgb(100, 114, 118);

    .dialog-flex {
      width: 100%;
      height: 100%;
    }

    .dialog-content {
      flex: 1 0 auto;
      width: 100%;

      .dialog-c-title {
        font-weight: 600;
        padding: 15px;
      }

      .dialog-c-text {
        padding: 0px 15px;
      }
    }

    .dialog-buttons {
      display: flex;
      flex: 0 1 auto;
      width: 100%;
      border-top: 1px solid #eee;
      font-size: 12px;

      button {
        background: transparent;
        padding: 0;
        margin: 0;
        border: 0;
        cursor: pointer;
        box-sizing: border-box;
        line-height: 44px;
        height: 44px;

        text-transform: uppercase;
        letter-spacing: 1px;

        color:inherit;
        font:inherit;

        &:hover {
          background: mix(black, transparent, 0.8%);
        }

        &:active {
          background: mix(black, transparent, 2.4%);
        }

        &:not(:first-of-type) {
          border-left: 1px solid #eee;
        }
      }
    }
  }
</style>