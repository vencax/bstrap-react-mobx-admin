var webpack = require('webpack')
var path = require('path')

module.exports = {
  devtool: 'inline-sourcemap',
  entry: './examples/blog/js/main.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        // NOTE: you need modify exclude regexp when used in separate project
        // to allow babel to transpile!!!
        // E.g. /node_modules(?!\/react-mobx-admin)/
        exclude: /node_modules(?!\/react-mobx-admin)/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'examples/blog'),
    filename: 'main.min.js'
  },
  // NOTE: needed coz' import like from a separate project are used in example
  // e.g.: import DataRequester from 'react-mobx-admin/services/requester'
  resolve: {
    alias: {
      'bstrap-react-mobx-admin': __dirname,
      'react-mobx-admin': path.join(__dirname, "node_modules/react-mobx-admin")
    }
  }
}
