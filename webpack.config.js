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
    entry: './src/main.js',
    module: {
      loaders: [{test: /\.js$/, loader: 'babel-loader', options: babelOptions}]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bstrap-react-mobx-admin.min.js'
    },
    externals: {
      'underscore': {root: '_', commonjs: 'underscore'},
      'mobx': {root: 'mobx', commonjs2: 'mobx', commonjs: 'mobx'},
      'prop-types': {root: 'propTypes', commonjs: 'prop-types'},
      'react': {root: 'React', commonjs: 'react'},
      'react-dom': {root: 'ReactDOM', commonjs: 'react-dom'},
      'mobx-react': {root: 'mobxReact', commonjs: 'mobx-react'},
      'react-bootstrap': {commonjs: 'react-bootstrap'},
      'react-mobx-admin': {commonjs: 'react-mobx-admin'},
      'react-bootstrap-date-picker': {commonjs: 'react-bootstrap-date-picker'}
    }
  }
}
