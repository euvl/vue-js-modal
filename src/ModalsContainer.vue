<template>
    <div id="#modals-container">
        <modal
            v-for="modal in modals"
            :key="modal.id"
            :name="modal.name"
            v-bind="modal.config"
            @closed="remove(modal.id)"
        >
            <component :is="modal.component" v-bind="modal.params"></component>
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
      let name = '_dynamic-modal-' + id
      this.modals.push({
        id: id,
        name: name,
        component: modal,
        params: params || {},
        config: config || {}
      })
      this.$nextTick(() => {
        this.$modal.show(name)
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
