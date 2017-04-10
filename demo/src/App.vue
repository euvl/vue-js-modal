<template>
<div id="app">
  <modal name="example-modal"
         transition="nice-modal-fade"
         :min-width="200"
         :min-height="200"
         :delay="100"
         :adaptive="adaptive"
         :resizable="resizable"
         :draggable="draggable">
    <div style="height: 100%; box-sizing: border-box; padding: 10px; font-size: 13px; overflow: auto">
      Appropriately exploit professional infrastructures rather than unique growth strategies. Assertively build leveraged growth strategies vis-a-vis multimedia based vortals. Progressively simplify cross-platform value through interactive imperatives. Objectively
      implement enabled web services after plug-and-play ROI. Distinctively impact inexpensive schemas before installed base imperatives. Holisticly benchmark pandemic process improvements without wireless experiences. Efficiently create worldwide partnerships
      after tactical vortals. Uniquely productize enabled platforms vis-a-vis timely processes. Conveniently unleash standards compliant niches through highly efficient testing procedures. Rapidiously enable pandemic niche markets whereas viral markets.
      Assertively simplify alternative partnerships and error-free e-commerce. Professionally formulate 24/365 internal or "organic" sources through equity invested mindshare. Globally redefine unique best practices for.
    </div>
  </modal>

  <h2>Vue.js Modal
    <a href="https://github.com/euvl/vue-js-modal/blob/master/README.md" target="readme">Readme</a>
    <a href="https://github.com/euvl/vue-js-modal/issues" target="issues">Issues</a>
  </h2>

  <pre style="line-height: 1.5;">
    npm install --save vue-js-modal

    ...
    import vmodal from 'vue-js-modal'
    Vue.use(vmodal)
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
        Is resizable, but if the size of the screen is changed - modal will return to its initial size as well as it will try to adapt to the page size
      </td>
    </tr>
  </table>

  <div style="margin-top: 20px; margin-bottom: 20px;">
    <button @click="show(false, false, false)">Simple</button>
    <button @click="show(true, false, false)">Resizable</button>
    <button @click="show(false, true, false)">Adaptive</button>
    <button @click="show(true, true, false)">Mixed</button>
    <button @click="show(false, false, true)">Draggable</button>
  </div>

  <props-table />
</div>
</template>

<script>
import PropsTable from './PropsTable.vue'
//<props-table/>

export default {
  name: 'app',
  components: {PropsTable},
  data() {
    return {
      resizable: false,
      adaptive: false,
      draggable: false,
    }
  },
  methods: {
    show(resizable = false, adaptive = false, draggable = false) {
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

  a {
    font-size: 12px;
  }
}

a {
  color: inherit;
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
</style>
