<template>
  <div id="app">
    <h2>
      Beeper
      <nice-beep class="inline-beep" color="#23d813" :frequency="1200"/>
    </h2>
    <div>
      tl;dr
    </div>

    <h2>Notifications</h2>
    <nice-notifications name="example-1" animation="fade"/>
    <nice-notifications position="bottom left"/>
    <button @click="notifyExample0">Example 1</button>
    <button @click="notifyExample1">Example 2</button>

    <h2>Modals</h2>
    <nice-modal name="example-modal"
                transition="nice-modal-fade"
                :delay="200"
                :adaptive="true"
                :resizable="true">
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
    </nice-modal>
    <button @click="modalExample0">Example 1</button>
  </div>
</template>

<script>
const ID = ((i) => () => i++)(0);

export default {
  name: 'app',
  methods: {
    notifyExample0() {
      this.$notify({
        type: 'error',
        group: 'example-1',
        title: 'Error message',
        text: 'This is error message #' + ID()
      });
    },
    notifyExample1() {
      this.$notify({
        type: 'warn',
        duration: 10000,
        title: 'Warning message',
        text:
          `
          Warning #${ID()} <br>
          Notification will dissapear in 10 sec<br>
          Rendering <b>HTML</b>
          `
      });
    },
    modalExample0() {
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

.inline-beep {
  display: inline-block;
  position: relative !important;
}

</style>
