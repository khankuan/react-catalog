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

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commonPlugins = [new _webpack2.default.LoaderOptionsPlugin({
  options: {
    postcss: [(0, _autoprefixer2.default)({
      browsers: ['last 2 version']
    })],
    context: process.cwd()
  }
}), new _webpack2.default.optimize.CommonsChunkPlugin({
  name: 'lib',
  chunks: ['components', 'app']
}), new _webpack2.default.optimize.CommonsChunkPlugin({
  name: 'vendor',
  chunks: ['vendor', 'lib', 'app']
})];

var devPlugins = [].concat(commonPlugins, [new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoEmitOnErrorsPlugin()]);

var extractLibraryCss = new _extractTextWebpackPlugin2.default('library.css');
var extractSourceCss = new _extractTextWebpackPlugin2.default('lib.css');
var prodPlugins = [].concat(commonPlugins, [new _webpack2.default.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }), new _webpack2.default.optimize.DedupePlugin(), new _webpack2.default.optimize.UglifyJsPlugin({
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
}), extractLibraryCss, extractSourceCss]);

var cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
};

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
      app: ['babel-polyfill', _path2.default.resolve(librarySrc, './app/index.js')],
      vendor: ['react', 'react-router', 'react-dom', 'history', 'react-codemirror', 'codemirror', 'js-beautify', 'react-element-to-jsx-string', 'classnames', 'react-markdown', 'fuse.js', 'react-document-title'],
      components: [_path2.default.resolve(outputDir, './components.js')]
    },
    output: {
      path: outputPublicDir,
      filename: '[name].js'
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: production ? _babel4.default : _babel2.default
        }],
        include: [srcSrc, librarySrc, outputDir, pagesSrc]
      }, {
        test: /\.css$/,
        include: [srcSrc, pagesSrc],
        use: production ? extractSourceCss.extract({
          loader: [cssLoader, 'postcss-loader']
        }) : ['style-loader', cssLoader, 'postcss-loader']
      }, {
        test: /\.css$/,
        include: [librarySrc, outputDir, /node_modules/],
        use: production ? extractSourceCss.extract({
          loader: [cssLoader, 'postcss-loader']
        }) : ['style-loader', cssLoader, 'postcss-loader']
      }, {
        test: /\.json$/,
        use: 'json-loader'
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 10000 }
        }
      }, {
        test: /\.html$/,
        use: 'html-loader'
      }, {
        test: /\.md$/,
        use: ['html-loader', 'markdown-loader']
      }]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.html', '.md', '.json'],
      modules: ['node_modules'],
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