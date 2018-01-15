const pathExists = require('path-exists')
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const es3ifyPlugin = require('es3ify-webpack-plugin')

let entriesConfig = {}
const pagesJsRoot = path.join(__dirname, '../front/views')
const files = glob.sync(path.join(__dirname, '../app/view/pages/*.art'))

if (files.length) {
  let entries = {
    vendor: ['jquery', 'yox', 'es6-promise', 'bxslider', 'axios', 'moment'],
    'ie-polyfill': pagesJsRoot + '/ie-polyfill.js',
    'global': pagesJsRoot + '/global.js'
  }

  entries = files.reduce((prev, next) => {
    let { name } = path.parse(next)
    let jsFile = pagesJsRoot + '/' + name + '.js'

    let exists = pathExists.sync(jsFile)
    if (exists) {
      prev[name] = jsFile
    }

    return prev
  }, entries)

  entriesConfig = entries
}

const config = {
  entry: entriesConfig,

  output: {
    publicPath: '/static',
    path: path.resolve(__dirname, '../app/public'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?$!expose-loader?jQuery'
      },

      {
        test: require.resolve('es6-promise'),
        loader: 'expose-loader?Promise'
      },

      {
        test: require.resolve('axios'),
        loader: 'expose-loader?axios'
      },

      {
        test: require.resolve('yox'),
        loader: 'expose-loader?Yox'
      },

      {
        test: require.resolve('moment'),
        loader: 'expose-loader?moment'
      }
    ]
  },

  plugins: [
    new es3ifyPlugin(),

    new ManifestPlugin({
      publicPath: '/static/',
      writeToFileEmit: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "[name].js"
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: "[name].js",
      minChunks: 3
    }),

    new webpack.ProvidePlugin({
      'Yox': 'yox',
      'window.Yox': 'yox',
      'window.$': 'jquery',
      'window.Promise': 'es6-promise',
      'Promise': 'es6-promise',
      'axios': 'axios',
      'moment': 'moment'
    }),

    new webpack.EnvironmentPlugin(['NODE_ENV']),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh-cn/)
  ],

  resolve: {
    alias: {
      src: path.resolve(__dirname, '../app/public'),
      root: path.resolve(__dirname, '../'),
      'yox': 'yox/dist/yox-legacy.js',
      'jquery.jedate': 'jquery.jedate/jquery.jedate.js'
    }
  }
}

module.exports = config
