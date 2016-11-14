module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    publicPath: 'dist/',
    filename: 'vue-modal.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        exclude: /node_modules/
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint'
    }
  }
};