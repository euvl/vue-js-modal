<template>
<div id="app">
  <demo-error-modal/>
  <demo-login-modal/>
  <demo-dog-profile-modal />
  <demo-conditional-modal/>
  <demo-focus-modal/>
  <demo-size-modal/>

  <modals-container />

  <v-dialog
    @before-opened="dialogEvent('before-open')"
    @before-closed="dialogEvent('before-close')"
    @opened="dialogEvent('opened')"
    @closed="dialogEvent('closed')"/>

  <modal name="example-modal"
         transition="nice-modal-fade"
         :min-width="200"
         :min-height="200"
         :delay="100"
         :adaptive="adaptive"
         :resizable="resizable"
         :draggable="draggable">
    <div class="example-modal-content">
      Appropriately exploit professional infrastructures rather than unique growth strategies. Assertively build leveraged growth strategies vis-a-vis multimedia based vortals. Progressively simplify cross-platform value through interactive imperatives. Objectively
      implement enabled web services after plug-and-play ROI. Distinctively impact inexpensive schemas before installed base imperatives. Holisticly benchmark pandemic process improvements without wireless experiences. Efficiently create worldwide partnerships
      after tactical vortals. Uniquely productize enabled platforms vis-a-vis timely processes. Conveniently unleash standards compliant niches through highly efficient testing procedures. Rapidiously enable pandemic niche markets whereas viral markets.
      Assertively simplify alternative partnerships and error-free e-commerce. Professionally formulate 24/365 internal or "organic" sources through equity invested mindshare. Globally redefine unique best practices for.

      <input placeholder="Email">
    </div>
  </modal>

  <h2>Vue.js Modal
    <a href="https://github.com/euvl/vue-js-modal/blob/master/README.md"
       target="readme">Readme</a>
    <a href="https://github.com/euvl/vue-js-modal/issues"
       target="issues">Issues</a>
    <a href="https://github.com/euvl/vue-js-modal/tree/master/demo/client_side_rendering/src/components/modals"
       target="issues">Examples</a>
  </h2>

  <pre style="line-height: 1.5;">
    
    npm install --save vue-js-modal

    ...
    import vmodal from 'vue-js-modal'
    Vue.use(vmodal)
  </pre>

  <div style="margin-top: 20px; margin-bottom: 15px;">
    <button
      class="btn"
      @click="show(false, false, false)">Simple</button>
    <button
      class="btn"
      @click="show(true, false, false)">Resizable</button>
    <button
      class="btn"
      @click="show(false, true, false)">Adaptive</button>
    <button
      class="btn"
      @click="show(false, false, true)">Draggable</button>
    <br>
    <button
      class="btn green"
      @click="$modal.show('dog-profile')">
      Demo: Dog Profile photo
    </button>
    <button
      class="btn green"
      @click="$modal.show('error-modal')">
      Demo: Error handling
    </button>
    <button
      class="btn green"
      @click="$modal.show('demo-login')">
      Demo: Login
    </button>
    <button
      class="btn green"
      @click="$modal.show('size-modal')">
      Demo: Width: 60%, Height: auto
    </button>
    <button
      :class="canBeShown ? 'btn green' : 'btn red'"
      @click="conditionalShow">
      Can <b v-if="!canBeShown">NOT</b> be shown
    </button>
    <br>

    <button
      class="btn"
      @click="showBasicDialog">
      Dialog: basic
    </button>

    <button
      class="btn"
      @click="showTitleDialog">
      Dialog: title
    </button>

    <button
      class="btn"
      @click="showButtonsDialog">
      Dialog: buttons
    </button>
    <br>
    <button
      class="btn"
      @click="showDynamicRuntimeModal">
      Dynamic: Runtime Modal
    </button>
    <button
      class="btn"
      @click="showDynamicComponentModal">
      Dynamic: Component Modal
    </button>
    <button
      class="btn"
      @click="showDynamicComponentModalWithModalParams">
      Dynamic: Component Modal with modal params
    </button>
  </div>
</div>
</template>

<script>
import DemoErrorModal       from './components/modals/DemoErrorModal.vue'
import DemoFocusModal       from './components/modals/InputFocusModal.vue'
import DemoLoginModal       from './components/modals/DemoLoginModal.vue'
import DemoDogProfileModal  from './components/modals/DogProfileModal.vue'
import DemoConditionalModal from './components/modals/ConditionalModal.vue'
import DemoSizeModal        from './components/modals/SizeModal.vue'
import CustomComponentModal from './components/modals/CustomComponentModal.vue'

export default {
  name: 'app',
  components: {
    DemoErrorModal,
    DemoFocusModal,
    DemoLoginModal,
    DemoDogProfileModal,
    DemoConditionalModal,
    DemoSizeModal
  },
  data () {
    return {
      resizable: false,
      adaptive: false,
      draggable: false,
      canBeShown: false
    }
  },
  created () {
    setInterval(() => {
      this.canBeShown = !this.canBeShown
    }, 5000)
  },
  methods: {
    show(resizable, adaptive, draggable) {
      this.resizable = resizable
      this.adaptive = adaptive
      this.draggable = draggable
      /*
        $nextTick is required because the data model with new
        "resizable, adaptive, draggable" values is not updated yet.. eh
      */
      this.$nextTick(() => {
        this.$modal.show('example-modal')
      })
    },

    conditionalShow () {
      this.$modal.show('conditional-modal', { show: this.canBeShown })
    },


    showBasicDialog () {
      this.$modal.show('dialog', {
        text: 'I am a tiny dialog box.<br/>And I render <b>HTML!</b>'
      })
    },

    showTitleDialog () {
      this.$modal.show('dialog', {
        title: 'Information',
        text: 'Check out, I have a title 😎'
      })
    },

    showButtonsDialog () {
      this.$modal.show('dialog', {
        title: 'Buttons example',
        text: 'You can add an arbitrary number of buttons.',
        buttons: [
          {
            title: 'C💩NCEL',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'LIKE',
            default: true,
            handler: () => {
              alert('LIKE LIKE LIKE')
            }
          },
          {
            title: 'REPOST',
            handler: () => {
              alert('REPOST REPOST REPOST')
            }
          }
        ]
      })
    },

    showDynamicRuntimeModal () {
      this.$modal.show({
        template: `
          <div class="example-modal-content">
            <h1>This is created inline</h1>
            <p>{{ text }}</p>
          </div>
        `,
        props: ['text']
      }, {
        text: 'This text is passed as a property'
      })
    },

    showDynamicComponentModal () {
      this.$modal.show(CustomComponentModal, {
        text: 'This text is passed as a property'
      })
    },

    showDynamicComponentModalWithModalParams () {
      this.$modal.show({
        template: `
          <div class="example-modal-content">
            <button class="btn" @click="closeByName">Close this using name</button>
            <button class="btn" @click="closeByEvent">Close this using events</button>
          </div>
        `,
        methods: {
          closeByName() { this.$modal.hide('dynamic-modal'); },
          closeByEvent() { this.$emit('close'); },
        }
      }, null, {
        name: 'dynamic-modal',
        resizable: true,
        adaptive: true,
        draggable: true,
      })
    },

    dialogEvent (eventName) {
      console.log('Dialog event: ' + eventName)
    }
  }
}
</script>

<style lang="scss">

*:not(pre) {
  font-family: 'Montserrat';
  box-sizing: border-box;
}

body {
  margin: 0;

  padding: 100px 50px;
  padding-bottom: 0;

  width: 100%;
  min-height: 100vh;

  background: #fc00aa;
  background: -webkit-linear-gradient(to right, #fc00aa, #00dbde);
  background: linear-gradient(315deg, #fc00aa, #00dbde);

  cursor: default;
}

pre {
  color: #595959;
  background-color: #f3f3f3;
  border: 1px solid #eee;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #6b7c93;

  background: #F6F9FC;
  padding: 20px;
  border-radius: 3px;

  box-shadow: 0 4px 36px rgba(50,50,93,.11),
    0 1px 33px rgba(0,0,0,.08);
}

h1,
h2 {
  font-weight: normal;

  a {
    font-size: 12px;
  }
}

a {
  color: inherit;
}

button.btn {
  outline: none;
  background: white;
  border: 0;
  padding: 10px 18px;
  cursor: pointer;
  border-radius: 3px;

  color: white;
  
  box-shadow: 0 4px 8px rgba(#20a0ff, .3);
  background: #4db3ff;

  font-weight: 600;

  border-radius: 3px;

  min-width: 90px;

  margin-bottom: 8px;
  margin-top: 8px;
  margin-right: 8px;

  &:hover {
    background: #20a0ff;
  }

  &.green {
    box-shadow: 0 4px 8px rgba(#50C9BA, .3);
    background: #50C9BA;

    &:hover {
     background: mix(#50C9BA, black, 95%);
    }
  }

  &.red {
    box-shadow: 0 4px 8px rgba(#F21368, .3);
    background: #F21368;

    &:hover {
      background: mix(#F21368, black, 95%);
    }
  }
}

.example-modal-content {
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 13px;
  overflow: auto;
}

.vue-dialog button {
  letter-spacing: 1px;
}

@media (max-width:600px)  {
  body {
    padding: 10px;
  }
}
</style>
