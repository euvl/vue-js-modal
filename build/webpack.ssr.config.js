const merge = require('webpack-merge')
const base = require('./webpack.base.config')

module.exports = merge(base, {
  target: 'node',
  output: {
    filename: 'ssr.index.js'
  }
})
