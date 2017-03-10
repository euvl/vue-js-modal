##Vue.js modal

####Simple to use vue.js modal

![](http://i.imgur.com/1lnYmFj.png)


####Install:

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
  this.$modal.show('hello-word');
}
```

####Props: 

//todo
