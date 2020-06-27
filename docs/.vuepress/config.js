const sidebar = require('./sidebar')

module.exports = {
  base: '/vue-js-modal/',
  title: 'Vue.js Modal',
  description: 'Simple, flexible, Vue.js modal plugin',
  themeConfig: {
    displayAllHeaders: false,

    sidebar,
    nav: [
      { text: 'Github', link: 'https://github.com/euvl/vue-js-modal' },
      { text: 'Examples', link: '/examples/' }
    ]
  }
}
