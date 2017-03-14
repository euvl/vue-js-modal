<h1>Vue.js modal</h1>

<h5>Simple to use vue.js modal plgin without any external dependencies</h5>

<h3>How to:</h3>

Include plugin in your main.js file.
```javsacript
import 'vue-modal';
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

![](http://i.imgur.com/mN1MBJ3.gif)

