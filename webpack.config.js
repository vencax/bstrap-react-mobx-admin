var path = require('path')
var babelOptions = {
  'presets': ['react', 'stage-0', ['es2015', {'modules': false}]],
  'plugins': [
    'transform-object-rest-spread',
    'transform-decorators-legacy',
    'transform-class-properties'
  ]
}

module.exports = (env = {dev: true}) => {
  return {
    devtool: env.dev ? 'inline-sourcemap' : 'source-map',
    entry: './src/index.js',
    module: {
      loaders: [{test: /\.js$/, loader: 'babel-loader', options: babelOptions}]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bstrap-react-mobx-admin.min.js',
      library: 'bstrap-react-mobx-admin',
      libraryTarget: 'umd'
    },
    externals: {
      'underscore': {
        root: '_', commonjs: 'underscore', commonjs2: 'underscore', amd: 'underscore'
      },
      'prop-types': {
        root: 'propTypes', commonjs: 'prop-types', commonjs2: 'prop-types'
      },
      'react': {
        root: 'React', commonjs: 'react', commonjs2: 'react', amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM', commonjs: 'react-dom', commonjs2: 'react-dom', amd: 'react'
      },
      'mobx-react': {root: 'mobxReact', commonjs: 'mobx-react', commonjs2: 'mobx-react'},
      'react-bootstrap': {commonjs: 'react-bootstrap', commonjs2: 'react-bootstrap'},
      'react-mobx-admin': {
        commonjs: 'react-mobx-admin', commonjs2: 'react-mobx-admin'
      },
      'react-bootstrap-date-picker': {
        commonjs: 'react-bootstrap-date-picker',
        commonjs2: 'react-bootstrap-date-picker'
      }
    }
  }
}
