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
        @close="$modal.hide(modal.modalAttrs.name, $event)"
      >
        <template v-for="(slot, key) in modal.componentSlots" #[key]="scope">
          <VNode :node="slot" :key="key" :scope="scope" />
        </template>
      </component>
    </modal>
  </div>
</template>
<script>
import { generateId } from '../utils'
import VNode from './VNode.vue'

const PREFIX = 'dynamic_modal_'

export default {
  data() {
    return {
      modals: []
    }
  },
  components: {
    VNode
  },
  created() {
    /**
     * Register ModalContainer so that it was availiable inside the plugin
     */
    this.$root.__modalContainer = this
  },
  mounted() {
    this.$modal.subscription.$on('hide-all', () => {
      this.modals = []
    })
  },
  methods: {
    add(
      component,
      componentAttrs = {},
      componentSlots = {},
      modalAttrs = {},
      modalListeners = {}
    ) {
      const id = generateId()
      const name = modalAttrs.name || PREFIX + id

      this.modals.push({
        id,
        modalAttrs: { ...modalAttrs, name },
        modalListeners,
        component,
        componentAttrs,
        componentSlots
      })

      this.$nextTick(() => {
        this.$modal.show(name)
      })
    },
    remove(id) {
      const index = this.modals.findIndex(v => v.id === id)

      if (index !== -1) {
        this.modals.splice(index, 1)
      }
    }
  }
}
</script>
