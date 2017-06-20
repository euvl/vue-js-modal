'use strict'

import Vue from 'vue'
import Meta from 'vue-meta'
import { createRouter } from './router.js'

import NuxtChild from './components/nuxt-child.js'
import NuxtLink from './components/nuxt-link.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.vue'
import App from './App.vue'

import { getContext } from './utils'

if (process.browser) {
  // window.onNuxtReady(() => console.log('Ready')) hook
  // Useful for jsdom testing or plugins (https://github.com/tmpvar/jsdom#dealing-with-asynchronous-script-loading)
  window._nuxtReadyCbs = []
  window.onNuxtReady = function (cb) {
    window._nuxtReadyCbs.push(cb)
  }
}

// Import SSR plugins
let plugin0 = require('~plugins/vue-js-modal')
plugin0 = plugin0.default || plugin0


// Component: <nuxt-child>
Vue.component(NuxtChild.name, NuxtChild)
// Component: <nuxt-link>
Vue.component(NuxtLink.name, NuxtLink)
// Component: <nuxt>
Vue.component(Nuxt.name, Nuxt)

// vue-meta configuration
Vue.use(Meta, {
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-n-head', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})

const defaultTransition = {"name":"page","mode":"out-in"}

async function createApp (ssrContext) {
  
  const router = createRouter()

  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, reject)
    })
  }

  if (process.browser) {
    
  }

  // root instance
  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  let app = {
    router,
    
    _nuxt: {
      defaultTransition: defaultTransition,
      transitions: [ defaultTransition ],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [ transitions ]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options._nuxt.transitions = transitions
        return transitions
      },
      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        if (typeof err === 'string') {
          err = { statusCode: 500, message: err }
        }
        this.$options._nuxt.dateErr = Date.now()
        this.$options._nuxt.err = err;
        return err
      }
    },
    ...App
  }

  const next = ssrContext ? ssrContext.next : (location) => app.router.push(location)
  const ctx = getContext({
    isServer: !!ssrContext,
    isClient: !ssrContext,
    route: router.currentRoute,
    next,
    
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
  }, app)
  delete ctx.error

  // Inject external plugins
  
  if (typeof plugin0 === 'function') {
    await plugin0(ctx)
  }
  

  return { app, router }
}

export { createApp, NuxtError }
