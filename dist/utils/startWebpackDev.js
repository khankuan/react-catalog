'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var webpackConfig = _ref2.webpackConfig,
        outputDir = _ref2.outputDir,
        port = _ref2.port;
    var compiler, server;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            webpackConfig.entry.app.unshift(require.resolve('webpack-dev-server/client') + ('?http://localhost:' + port + '/'), require.resolve('webpack/hot/dev-server'));
            compiler = (0, _webpack2.default)(webpackConfig);
            server = new _webpackDevServer2.default(compiler, {
              contentBase: outputDir,
              hot: true,
              stats: {
                hash: false,
                version: false,
                assets: false,
                modules: false,
                chunkModules: false,
                source: false,
                colors: true,
                chunk: false,
                children: false,
                chunkOrigins: false
              }
            });

            server.listen(port);
            return _context.abrupt('return', server);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function webpackDev(_x) {
    return _ref.apply(this, arguments);
  }

  return webpackDev;
}();