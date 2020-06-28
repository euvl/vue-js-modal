---
sidebarDepth: 2
---

# Usage

## Configuration

Configuration options can be passed as a second argument to `Vue.use`. 

####  `dialog: Boolean` 

Enables [dialogs](Intro#dialogs).


---


#### `componentName: String`

Changes component name from "Modal" to any other string value. It is useful when there is already a global "modal" component.

```js
Vue.use(VModal, { componentName: 'Foo' })
```
```html
<foo name="example">This is a modal</foo>
```


---


#### `dynamicDefaults: object`

Default properties that are injected into dynamic modals. 

```js
Vue.use(VModal, { dynamicDefault: { draggable: true, resizable: true } })
```

## API

Plugin API can be called within any component through `this.$modal`:


---


#### `$modal.show(name, params)`

**Arguments:**

`name: string` - Name of the modal

`params?: object` - Any data that you would want to pass into the modal (`@before-open` event handler will contain `params` in the event)

**Description:**

Shows a static modal. Modal component can be defined anywhere within the same or any ancestor component.

```html
<template>
    <modal name="example">This is an example</modal>
</template>

<script>
export default {
    name: 'MyComponent',
    mounted () {
        this.$modal.show('example')
    }
}
</script>
``` 

#### `$modal.show(component, componentProps, modalProps, modalEvents)`

Todo

#### `$modal.hide(name)`

Todo

#### `$modal.hideAll()`

Todo