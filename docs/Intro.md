# Introduction

The library supports 2 types of modals - static and dynamic.

- **Static** are defined explicitly though the template.
- **Dynamic** are generated based on the configuration passed into the "show modal" function.

## Static modals

Modals are defined by simply using the `<modal />` component. To control it's visibility - use `$modal.show` / `$modal.hide` functions, for example:

```html{2,4,12,15}
<template>
    <modal name="my-first-modal">
        This is my first modal
    </modal>
</template>

<script>
export default {
    name: 'MyComponent',
    methods: {
        show () {
            this.$modal.show('my-first-modal');
        },
        hide () {
            this.$modal.hide('my-first-modal');
        }
    },
    mount () {
        this.show()
    }
}
</script>
```

## Dynamic modals

In order to instantiate modals at runtime (for lazy-loading or de-cluttering templates), it is possible to create modals dynamically.

To show dynamic modal you can use the same `$modal.show` function with extended API:

```js
this.$modal.show(
  component,
  component_properties,
  modal_properties,
  modal_events
)
```

- `component` - inline or imported Vue component definition
- `component_properties` - any properties that are used within the `component_definition`
- `modal_properties` -modal component properties (see Properties section)
- `modal_events` - modal event handlers (see Events section)

Using **imported** component definition:

```js
import MyComponent from './MyComponent.vue'

...

this.$modal.show(
  MyComponent,
  { text: 'This text is passed as a property' },
  { draggable: true }
)
```

---

Using **inline** component definition:

```js
this.$modal.show(
  {
    template: `
      <div>
        <h1>This is created inline</h1>
        <p>{{ text }}</p>
      </div>
    `,
    props: ['text']
  },
  { text: 'This text is passed as a property' },
  { height: 'auto' },
  { 'before-close': event => {} }
)
```

Other than defining the `name` modal parameter, it's also possible to close dynamic modals by emitting `'close'` event:

```js{5}
this.$modal.show({
  template: `
    <div>
      <p>Close using this button:</p>
      <button @click="$emit('close')">Close</button>
    </div>
  `
})
```

It is possible to set default property values for dynamic modals:

```js{4-8}
import VModal from 'vue-js-modal'

Vue.use(VModal, {
  dynamicDefaults: {
    draggable: true,
    resizable: true,
    height: 'auto'
  }
})
```

## Dialogs

Dialog is a simplified version of the modal which has most parameters set by default and is useful for quick prototyping, alerts, etc. Dialog is merely an example of how easy it is to create modals that fit your project needs. Nevertheless, you can use it if you set `dialog: true` in plugin configuration:

```js
Vue.use(VModal, { dialog: true })
```

And include this component in your project:

```html
<v-dialog />
```

To show modal follow this example (all params except of “text” are optional):

```js
this.$modal.show('dialog', {
  title: 'The standard Lorem Ipsum passage',
  text: 'Lorem ipsum dolor sit amet, ...',
  buttons: [
    {
      title: 'Cancel',
      handler: () => {
        this.$modal.hide('dialog')
      }
    },
    {
      title: 'Like',
      handler: () => {
        alert('Like action')
      }
    },
    {
      title: 'Repost',
      handler: () => {
        alert('Repost action')
      }
    }
  ]
})
```

![](https://user-images.githubusercontent.com/1577802/85934434-0dac5300-b8da-11ea-9db5-34fa5a0b7fe0.png)
