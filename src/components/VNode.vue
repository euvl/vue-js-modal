<script>
import { isFunction } from '../utils/types'

export default {
  name: 'VNode',
  props: {
    node: {
      type: [Object, Function],
      required: true
    },
    scope: {
      type: Object,
      default: () => ({})
    }
  },
  render() {
    if (isFunction(this.node)) return this.node(this.scope)

    return this.node
  }
}
</script>
