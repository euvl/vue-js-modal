---
sidebarDepth: 0
---

## Installation

```bash
npm install vue-js-modal --save
```

Import plugin in your main file:

```js
import VModal from 'vue-js-modal'

Vue.use(VModal)
```

Or as a Nuxt.js plugin:

```js
import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.nocss'

// import from 'vue-js-modal/dist/styles.css

Vue.use(VModal)

export default function(_, inject) {
  inject('modal', VModal)
}
```

::: tip Extracted CSS
The `/dist` directory contains a version of the build with extracted CSS files. This is useful for SSR but also can be used with the purely client-side implementation when you need more flexibility in controlling your stylesheets.

* `ssr.index.js` - SSR build with inline CSS
* `ssr.nocss.js` - SSR build without inline CSS
* `styles.css` - File with required styles
:::
