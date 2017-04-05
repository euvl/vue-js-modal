<template>
<div id="app">
  <modal name="example-modal" transition="nice-modal-fade" :min-width="200" :min-height="200" :delay="100" :adaptive="adaptive" :resizable="resizable">
    <div style="height: 100%; box-sizing: border-box; padding: 10px; font-size: 13px; overflow: auto">
      Appropriately exploit professional infrastructures rather than unique growth strategies. Assertively build leveraged growth strategies vis-a-vis multimedia based vortals. Progressively simplify cross-platform value through interactive imperatives. Objectively
      implement enabled web services after plug-and-play ROI. Distinctively impact inexpensive schemas before installed base imperatives. Holisticly benchmark pandemic process improvements without wireless experiences. Efficiently create worldwide partnerships
      after tactical vortals. Uniquely productize enabled platforms vis-a-vis timely processes. Conveniently unleash standards compliant niches through highly efficient testing procedures. Rapidiously enable pandemic niche markets whereas viral markets.
      Assertively simplify alternative partnerships and error-free e-commerce. Professionally formulate 24/365 internal or "organic" sources through equity invested mindshare. Globally redefine unique best practices for.
    </div>
  </modal>

  <h2>Vue.js Modal</h2>

  <pre>
    npm install --save vue-js-modal
  </pre>

  <table>
    <tr>
      <td style="width: 20%">Modes:</td>
      <td></td>
    </tr>
    <tr>
      <td><b>Simple</b></td>
      <td>Yet another boring modal :)</td>
    </tr>
    <tr>
      <td><b>Adaptive</b></td>
      <td>Tries to adjust to the page size</td>
    </tr>
    <tr>
      <td><b>Resizable</b></td>
      <td>
        Has a small arrow on the bottom-right corner (customizable) that you can drag to change the size of the modal
      </td>
    </tr>
    <tr>
      <td><b>Mixed</b></td>
      <td>
        Is resizable, but if the size of the screen is changed modal will return to its initial size as well as it will try to adapt to the page size
      </td>
    </tr>
  </table>

  <div style="margin-top: 20px; margin-bottom: 20px;">
    <button @click="show(false, false)">Simple</button>
    <button @click="show(true, false)">Resizable</button>
    <button @click="show(false, true)">Adaptive</button>
    <button @click="show(true, true)">Mixed</button>
  </div>

  <table class="props">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Default</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(prop, name) in props">
        <td>
          {{name}}
        </td>
        <td>
          <template v-if="Array.isArray(prop.type)">
            <span v-for="type in prop.type">
              {{type.name}} /
            </span>
          </template>
          <template v-else>
            <span>{{prop.type.name}}</span>
          </template>
        </td>
        <td>
          {{prop.default}}
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      resizable: false,
      adaptive: false,

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
      }
    }
  },
  methods: {
    show(resizable, adaptive) {
      this.resizable = resizable
      this.adaptive = adaptive
      this.$modal.show('example-modal')
    }
  }
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
}

button {
    outline: none;
    background: white;
    border: 0;
    padding: 6px 18px;
    cursor: pointer;
    border-radius: 3px;

    background: white;

    color: #4db3ff;
    border: 1px solid #4db3ff;
    &:hover {
        color: #20a0ff;
        border: 1px solid #20a0ff;
    }
}

table.props {
  width: 100%;
  text-align: left;
}
</style>
