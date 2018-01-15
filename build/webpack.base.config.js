const pathExists = require('path-exists')
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')

const config = {
  entry: {},

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'es3ify-loader!babel-loader'
        }
      }
    ]
  },

  plugins: [
  ]
}

const pagesJsRoot = path.join(__dirname, '../app/public/js/pages')

glob(path.join(__dirname, '../app/view/pages/*.art'), (er, files) => {
  if (files.length) {
    let entries = {}

    entries = files.reduce((prev, next) => {
      let { name } = path.parse(next)
      let jsFile = pagesJsRoot + '/' + name + '.js'

      pathExists(jsFile).then(exists => {
        if (exists) {
          prev[name] = jsFile
        }
      })

      return prev
    }, entries)

    config.entry = entries
  }
})

module.exports = config
