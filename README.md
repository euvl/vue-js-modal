<h1>Vue.js modal</h1>

[![npm version](https://badge.fury.io/js/vue-js-modal.svg)](https://badge.fury.io/js/vue-js-modal)

<h5>Simple to use vue.js modal plgin without any external dependencies</h5>

Demo: http://vue-js-modal.yev.io/

<h3>How to use</h3>

Include plugin in your main.js file.
```javsacript
import vmodal from 'vue-js-modal'

Vue.use(vmodal)
```

Create modal
```html
<modal name="hello-world">
  hello, world!
</modal>
```
Call it from anywhere in the app
```javascript
methods: {
  show() { 
    this.$modal.show('hello-word');
  },
  hide () {
    this.$modal.hide('hello-world');
  }
}
```

<h3>Properties</h3>

| Name      | Required | Type          | Default     | Description |
| ---       | ---      | ---           | ---         | ---         |
| name      | true  | [String, Number] |             | Name of the modal |
| delay     | false | Number           | 0           | Delay between showing overlay and actual modal box |
| resizable | false | Boolean          | false       | If true, allows to resize modal window, keeping it in the center of the screen. |
| adaptive  | false | Boolean          | false       | If true, modal box will try to adapt to the window size |
| transition| false | String           |             | Transition name |
| classes   | false | [String, Array]  | 'nice-modal'| Classes that will eb applied to the actual modal box, if specified not specified, the default 'nice-modal' class will eb applied |
| width     | false | Number           | 600         | |
| height    | false | Number           | 300         | |
| minWidth  | false | Number           | 0           | The minimum width to which modal can be resized  |
| minHeight | false | Number           | 0           | The minimum height to which modal can be resized |

<h3>Events</h3>

| Name         | Description |
| ---          | --- |
| before-open  | Emits while modal is still invisible, but was added to the DOM |
| open         | Emits after modal became visible or started transition |
| before-close | Emits before modal is going to be closed. Can be stopped from the event listener calling `event.stop()` (example: you are creating a text editor, and want to stop closisng and ask user to correct mistakes if text is not valid)
| close        | Emits right before modal is destoyed |

<h3>Screenshots</h3>

![](http://i.imgur.com/mN1MBJ3.gif)


Example: 
```
npm run examples
```
Will be served at http://localhost:8000/examples
