<template>
  <div id="modals-container">
    <modal
      v-for="modal in modals"
      :key="modal.id"
      v-bind="modal.modalAttrs"
      v-on="modal.modalListeners"
      @closed="remove(modal.id)"
    >
      <component
        :is="modal.component"
        v-bind="modal.componentAttrs"
        v-on="$listeners"
        @close="$modal.hide(modal.modalAttrs.name)"
      />
    </modal>
  </div>
</template>
<script>
import { generateId } from './utils'

const PREFIX = '_dynamic_modal_'

export default {
  data () {
    return {
      modals: []
    }
  },
  created () {
    this.$root._dynamicContainer = this
  },
  methods: {
    add (component, componentAttrs = {}, modalAttrs = {}, modalListeners = {}) {
      const id = generateId()
      const name = modalAttrs.name || (PREFIX + id)

      this.modals.push({
        id,
        modalAttrs: { ...modalAttrs, name },
        modalListeners,
        component,
        componentAttrs
      })

      this.$nextTick(() => {
        this.$modal.show(name)
      })
    },
    remove (id) {
      const index = this.modals.findIndex(v => v.id === id)

      if (index !== -1) {
        this.modals.splice(index, 1)
      }
    }
  }
}
</script>
