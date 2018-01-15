'use strict';

const serialize = require('serialize-javascript')
const defaults = require('art-template/lib/defaults')

defaults.imports.serialize = function (value) {
  return serialize(value, { isJSON: true })
};

defaults.imports.currency = function (val = 0, decimals = 0) {
  val = parseFloat(val) / 100;
  if (decimals !== 0) {
    return val.toFixed(decimals);
  } else {
    return val;
  }
}

defaults.rules.unshift({
  /* Use @{{}} to output raw */
  test: /(@{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}})|({{$[ \t]*(\/?)([\w\W]*?)[ \t]*}})/,
  use: function (match, raw, close, code) {
    raw = raw.replace('@', '')
    return {
      code: `'${raw}'`,
      output: 'raw'
    }
  }
})

// had enabled by egg
// exports.static = true;

exports.art = {
  enable: true,
  package: 'egg-view-art'
}
