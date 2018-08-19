<template>
    <div id="modals-container">
        <modal
            v-for="modal in modals"
            :key="modal.id"
            v-bind="modal.config"
            v-on="modal.events"
            @closed="remove(modal.id)"
        >
            <component
              :is="modal.component"
              v-bind="modal.params"
              @close="$modal.hide(modal.config.name)"
              v-on="$listeners"
            ></component>
        </modal>
    </div>
</template>
<script>
export default {
  data () {
    return {
      uid: 0,
      modals: []
    }
  },
  created () {
    this.$root._dynamicContainer = this
  },
  methods: {
    add (modal, params, config, events) {
      let id = this.uid++
      config = config ? Object.assign({}, config) : {}
      if (!config.name) {
        config.name = '_dynamic-modal-' + id
      }
      this.modals.push({
        id: id,
        component: modal,
        params: params || {},
        config: config,
        events: events
      })
      this.$nextTick(() => {
        this.$modal.show(config.name)
      })
    },
    remove (id) {
      for (let i in this.modals) {
        if (this.modals[i].id === id) {
          this.modals.splice(i, 1)
          return
        }
      }
    }
  }
}
</script>
