const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const base = require('./webpack.srr.config')

module.exports = merge(base, {
  plugins: [new ExtractTextPlugin('styles.css')],
  output: {
    filename: 'ssr.pure.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  }
})
