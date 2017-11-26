<template>
<div id="app">
  <demo-error-modal/>
  <demo-login-modal/>
  <demo-dog-profile-modal />
  <demo-conditional-modal/>
  <demo-focus-modal/>
  <demo-size-modal/>

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
  </h2>

  <pre style="line-height: 1.5;">
    npm install --save vue-js-modal

    ...
    import vmodal from 'vue-js-modal'
    Vue.use(vmodal)
  </pre>

  <modes-table />

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
  </div>
</div>
</template>

<script>
import ModesTable           from './components/ModesTable.vue'
import DemoErrorModal       from './components/DemoErrorModal.vue'
import DemoFocusModal       from './components/InputFocusModal.vue'
import DemoLoginModal       from './components/DemoLoginModal.vue'
import DemoDogProfileModal  from './components/DogProfileModal.vue'
import DemoConditionalModal from './components/ConditionalModal.vue'
import DemoSizeModal        from './components/SizeModal.vue'

export default {
  name: 'app',
  components: {
    ModesTable,
    DemoErrorModal,
    DemoFocusModal,
    DemoLoginModal,
    DemoDogProfileModal,
    DemoConditionalModal,
    DemoSizeModal
  },
  data() {
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

    dialogEvent (eventName) {
      console.log('Dialog event: ' + eventName)
    }
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 50px;
  cursor: default;
  box-sizing: border-box;
}

pre {
  color: #595959;
  background-color: #f3f3f3;
  border: 1px solid #eee;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
  padding: 6px 18px;
  cursor: pointer;
  border-radius: 3px;

  background: white;

  color: #4db3ff;
  border: 1px solid #4db3ff;

  min-width: 90px;

  margin-bottom: 2px;
  margin-top: 4px;

  &:hover {
    color: #20a0ff;
    border: 1px solid #20a0ff;
  }

  &.green {
    $color: #50C9BA;

    color: $color;
    border: 1px solid $color;

    &:hover {
      color: mix($color, black, 95%);
      border: 1px solid mix($color, black, 95%);
    }
  }

  &.red {
    $color: #F21368;

    color: $color;
    border: 1px solid $color;

    &:hover {
      color: mix($color, black, 95%);
      border: 1px solid mix($color, black, 95%);
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
