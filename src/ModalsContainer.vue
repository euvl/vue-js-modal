<template>
    <div id="#modals-container">
        <modal
            v-for="modal in modals"
            :key="modal.id"
            v-bind="modal.config"
            @closed="remove(modal.id)"
        >
            <component
              :is="modal.component"
              v-bind="modal.params"
              @close="$modal.hide(modal.config.name)"
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
    this.$modal._setDynamicContainer(this)
  },
  methods: {
    add (modal, params, config) {
      let id = this.uid++
      config = config ? Object.assign({}, config) : {};
      if (!config.name) {
        config.name = '_dynamic-modal-' + id;
      }
      this.modals.push({
        id: id,
        component: modal,
        params: params || {},
        config: config
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
