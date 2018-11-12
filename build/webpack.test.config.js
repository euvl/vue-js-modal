var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.config')

var webpackConfig = merge(baseConfig, {
  devtool: '#inline-source-map'
})

delete webpackConfig.entry
delete webpackConfig.output

module.exports = webpackConfig
