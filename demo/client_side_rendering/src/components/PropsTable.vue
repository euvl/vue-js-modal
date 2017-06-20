<template>
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
            {{prop.type.map(v => v.name).join(' / ')}}
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
</template>
<script>
export default {
  name: 'PropsTable',
  data () {
    return {
      props: {
        name: {
          required: true,
          type: String,
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
        draggable: {
          type: Boolean,
          default: false
        },
        transition: {
          type: String,
        },
        classes: {
          type: [String, Array],
          default: 'v--modal',
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
        },
        pivotX: {
          type: Number,
          default: 0.5
        },
        pivotY: {
          type: Number,
          default: 0.5
        }
      }
    }
  }
}
</script>
<style lang="scss">
table.props {
  width: 100%;
  text-align: left;
  border-collapse: collapse;

  td, th {
    border: 1px solid #eee;
    padding: 4px 8px;
  }
}
</style>
