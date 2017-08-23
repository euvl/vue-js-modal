// Karma configuration
var webpackConfig = require('../../build/webpack.test.config.js')

module.exports = function(config) {
  config.set({
    frameworks: [
      'mocha'
    ],
    files: [
      './tests.webpack.js'
    ],
    browsers: [
      // 'Chrome',
      'PhantomJS'
    ],
    preprocessors: {
      './tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['spec'],
    plugins: [
      // Launchers
      // 'karma-chrome-launcher',
      'karma-phantomjs-launcher',

      // Test Libraries
      'karma-mocha',
      'karma-sinon-chai',

      // Preprocessors
      'karma-webpack',
      'karma-sourcemap-loader',
      // Reporters
      'karma-spec-reporter',
      'karma-coverage'
    ],

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    logLevel: config.LOG_INFO,
    singleRun: true,
    concurrency: Infinity,
  })
}
