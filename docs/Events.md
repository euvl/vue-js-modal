---
sidebarDepth: 0
---

## Events


`@before-open`

Emits while modal is still invisible, but was added to the DOM. Further opening of the modal can be blocked from this event listener by calling `event.cancel()` .           

---

`@opened`

Emits after modal became visible or started transition.

---

`@before-close`

Emits before modal is going to be closed. Further closing of the modal can be blocked from this event listener by calling `event.cancel()` .

---

`@closed` 
 
Emits right before modal is destroyed.

---

### Event cancellation

Opening and closing can be canceled by calling `event.cancel()` function in either `before-open` or `before-close` event handlers.


### Example 
```html{19}
<template>
  <modal name="example"
         @before-open="beforeOpen"
         @before-close="beforeClose">
    Hello, Events!
  </modal>
</template>
<script>
export default {
  name: 'ExampleModal',
  methods: {
    beforeOpen (event) {
      console.log('Opening...')
    },
    beforeClose (event) {
      console.log('Closing...')
      // What a gamble.. 50% change to cancel closing
      if (Math.random() < 0.5) {
        event.cancel()
      }
    }
  }
}
</script>
```