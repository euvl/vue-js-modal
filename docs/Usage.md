---
sidebarDepth: 0
---

## Usage

There are 2 types of modals, static and dynamic. **Static** are defined explicitly though the template and **dynamic** are generated based on the configuration passed into the "show modal" function.

### Static modals

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

### Dynamic modals

In order to instantiate modals at runtime (for lazy-loading or de-cluttering templates), it is possible to create modals dynamically.


To show dynamic modal you can use the same `$modal.show` function with extended API: 

```js
this.$modal.show(
    component_definition, 
    component_properties, 
    modal_properties,
    modal_events
)
```

* `component_definition` - either inline or imported Vue component definition
* `component_properties` - any properties that are used within the `component_definition`
* `modal_properties` -modal component properties (see Properties section)
* `modal_events` - modal event handlers (see Events section)

Examples:

Using inline component definition:

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

Using imported component definition:

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
