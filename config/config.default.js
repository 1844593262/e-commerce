'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513269761252_8527';

  // add your config here
  config.middleware = [];

  config.view = {
    defaultViewEngine: 'art'
  };

  config.httpclient = {
    request: {
      timeout: 30000
    }
  }

  config.static = {
    prefix: '/static'
  }

  config.art = {
    escape: false
  }

  config.security = {
    csrf: {
      enable: false,
    }
  }

  config.apiBaseUrl = 'http://www.jumax.dev.sudaotech.com/api/mall'
  config.apiClubBaseUrl = 'http://www.jumax.dev.sudaotech.com/api/club-mall'

  return config;
};
