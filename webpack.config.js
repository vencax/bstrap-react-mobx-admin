var path = require('path')
var babelOptions = {
  'presets': ['react', 'stage-0', ['es2015', {'modules': false}]],
  'plugins': [
    'transform-object-rest-spread',
    'transform-decorators-legacy',
    'transform-class-properties'
  ]
}

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
        exclude: /node_modules(?!(\\|\/)react-mobx-admin|(\\|\/)mobx-router)/,
        loader: 'babel-loader',
        options: babelOptions
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
      'bstrap-react-mobx-admin': __dirname
    }
  },
  externals: {
    'axios': 'axios',
    'mobx': 'mobx',
    'mobx-react': 'mobxReact',
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}
