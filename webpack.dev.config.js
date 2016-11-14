var config = require('./webpack.base.config');

config.devtool = 'eval-source-map';
config.devServer = {
  noInfo: true
};

module.exports = config;