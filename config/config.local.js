const path = require('path')
const webpackConfig = require('../build/webpack.dev.config')

module.exports = appInfo => {
  const config = exports = {};

  config.apiBaseUrl = 'http://www.jumax.dev.sudaotech.com/api/mall'

  config.static = {
    prefix: '/static',
    dir: [path.join(appInfo.baseDir, 'app/public')]
  }

  config.webpack = {
    webpackConfigList: [webpackConfig]
  }

  return config;
};
