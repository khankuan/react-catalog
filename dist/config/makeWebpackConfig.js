'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = makeWebpackConfig;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _babel = require('./babel.dev');

var _babel2 = _interopRequireDefault(_babel);

var _babel3 = require('./babel.prod');

var _babel4 = _interopRequireDefault(_babel3);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var devPlugins = [new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoErrorsPlugin()];

var prodPlugins = [new _webpack2.default.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }), new _webpack2.default.optimize.OccurrenceOrderPlugin(), new _webpack2.default.optimize.DedupePlugin(), new _webpack2.default.optimize.UglifyJsPlugin({
  compress: {
    screw_ie8: true, // React doesn't support IE8
    warnings: false
  },
  mangle: {
    screw_ie8: true
  },
  output: {
    comments: false,
    screw_ie8: true
  }
})];

function makeWebpackConfig(_ref) {
  var outputDir = _ref.outputDir,
      outputPublicDir = _ref.outputPublicDir,
      src = _ref.src,
      pagesDir = _ref.pagesDir,
      configureWebpack = _ref.configureWebpack,
      production = _ref.production;

  var librarySrc = _path2.default.resolve(__dirname, '../../src');
  var srcSrc = _path2.default.resolve(process.cwd(), src);
  var pagesSrc = pagesDir ? _path2.default.resolve(process.cwd(), pagesDir) : null;
  outputDir = _path2.default.resolve(process.cwd(), outputDir);
  outputPublicDir = _path2.default.resolve(process.cwd(), outputPublicDir);

  var output = {
    entry: {
      app: [_path2.default.resolve(librarySrc, './app/index.js')]
    },
    output: {
      path: outputPublicDir,
      filename: 'app.js'
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel',
        include: [srcSrc, librarySrc, outputDir, pagesSrc],
        query: production ? _babel4.default : _babel2.default
      }, {
        test: /\.json$/, loader: 'json'
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
        loader: 'url?limit=10000'
      }, {
        test: /\.css$/,
        include: [srcSrc, librarySrc, outputDir, pagesSrc, /node_modules/],
        loader: 'style!css!postcss'
      }, {
        test: /\.html$/,
        loader: 'html'
      }, {
        test: /\.md$/,
        loader: 'html!markdown'
      }]
    },
    postcss: function postcss() {
      return [_autoprefixer2.default];
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.html', '.md', '.json'],
      modulesDirectories: ['node_modules'],
      alias: {
        build: outputDir,
        'react-library': librarySrc
      }
    },
    plugins: [].concat((0, _toConsumableArray3.default)(production ? prodPlugins : devPlugins)),
    devtool: 'eval'
  };

  if (configureWebpack) {
    return configureWebpack(output, production);
  }
  return output;
}