# Usage

The library supports 2 types of modals - static and dynamic.

* **Static** are defined explicitly though the template.
* **Dynamic** are generated based on the configuration passed into the "show modal" function.

## Static modals

Modals are defined by simply using the `<modal />` component. To control it's visibility - use `$modal.show` / `$modal.hide` functions, for example:

```html
<template>
    <modal name="my-first-modal">
        This is my first modal
    </modal>
</template>
```
```js{5,8}
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

* `component` - inline or imported Vue component definition
* `component_properties` - any properties that are used within the `component_definition`
* `modal_properties` -modal component properties (see Properties section)
* `modal_events` - modal event handlers (see Events section)

Using **imported** component definition:

```js
import MyComponent from './MyComponent.vue'

export default {
    name: 'App',
    mount () {
        this.$modal.show(
            MyComponent, 
            { text: 'This text is passed as a property' }, 
            { draggable: true }
        )
    }
}
```

---

Using **inline** component definition:

```js
export default {
    name: 'App',
    mount () {
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
            { 'before-close': (event) => {} }
        )
    }
}
```


## Dialogs

Dialog is a simplified version of the modal which has most parameters set by default and is useful for quick prototyping, alerts, etc.

To start using dialogs you must set `dialog: true` in plugin configuration:

```js
Vue.use(VModal, { dialog: true })
```

And include this component in your project:

```html
<v-dialog />
```

Make a function call (all params except of “text” are optional):

```js
this.$modal.show('dialog', {
  title: 'Alert',
  text: 'This is test alert',
  buttons: [
    {
      title: 'Confirm',
      handler: () => alert('confirmed')
    },
    {
      title: 'Deny',    // Button title
      default: true,    // Will be triggered by default if 'Enter' pressed.
      handler: () => {} // Button click handler
    },
    {
      title: 'Close'
    }
 ]
})
```

![](https://user-images.githubusercontent.com/1577802/29165216-ec62552c-7db9-11e7-807e-ef341edcc94d.png)