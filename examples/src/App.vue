<template>
  <div id="app">
    <h2>Vue.js Modal</h2>
    <modal name="example-modal"
                transition="nice-modal-fade"
                :delay="200"
                :adaptive="resizable"
                :resizable="adaptive">
      <div style="height: 100%; box-sizing: border-box; padding: 10px; font-size: 13px; overflow: auto">
          Appropriately exploit professional infrastructures rather than unique
          growth strategies. Assertively build leveraged growth strategies
          vis-a-vis multimedia based vortals. Progressively simplify
          cross-platform value through interactive imperatives. Objectively
          implement enabled web services after plug-and-play ROI. Distinctively
          impact inexpensive schemas before installed base imperatives.
          Holisticly benchmark pandemic process improvements without wireless
          experiences.
          Efficiently create worldwide partnerships after tactical vortals.
          Uniquely productize enabled platforms vis-a-vis timely processes.
          Conveniently unleash standards compliant niches through highly
          efficient testing procedures. Rapidiously enable pandemic niche
          markets whereas viral markets.
          Assertively simplify alternative partnerships and error-free
          e-commerce. Professionally formulate 24/365 internal or "organic"
          sources through equity invested mindshare. Globally redefine unique
          best practices for.
      </div>
    </modal>

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
        Has a small arrow on the bottom-right corner
        (customizable) that you can drag to change the size of the modal
        </td>
      </tr>
      <tr>
        <td><b>Mixed</b></td>
        <td>
        Is resizable, but if the size of the screen is changed
        modal will return to its initial size as well as it will try to adapt to
        the page size
        </td>
      </tr>
    </table>

    <button @click="show(false, false)">Simple</button>
    <button @click="show(true, false)">Resizable</button>
    <button @click="show(false, true)">Adaptive</button>
    <button @click="show(true, true)">Mixed</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      resizable: false,
      adaptive: false
    }
  },
  methods: {
    show(resizable, adaptive) {
      this.resizable = resizable;
      this.adaptive = adaptive;
      this.$modal.show('example-modal');
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 50px;
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

</style>
