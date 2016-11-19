'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ncp = require('ncp');

var _ncp2 = _interopRequireDefault(_ncp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

var _generateIndexHtml = require('./generateIndexHtml');

var _generateIndexHtml2 = _interopRequireDefault(_generateIndexHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var outputDir = _ref2.outputDir,
        assets = _ref2.assets,
        head = _ref2.head,
        body = _ref2.body,
        production = _ref2.production;
    var outputPublicDir, copy;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (assets && !Array.isArray(assets)) {
              assets = [assets];
            }
            outputPublicDir = outputDir + '/public';

            if (!_fs2.default.existsSync(outputPublicDir)) {
              _mkdirp2.default.sync(outputPublicDir);
            }

            _context.next = 5;
            return (0, _writeFile2.default)({ outputPath: outputPublicDir + '/index.html', data: (0, _generateIndexHtml2.default)({ head: head, body: body, production: production }) });

          case 5:
            copy = _bluebird2.default.promisify(_ncp2.default.ncp);
            _context.next = 8;
            return _bluebird2.default.all(assets.map(function (asset) {
              return asset.src && _fs2.default.existsSync(asset.src) ? copy(asset.src, '' + outputPublicDir + (asset.dest || '')) : _bluebird2.default.resolve();
            }));

          case 8:
            return _context.abrupt('return', _context.sent);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function generateAssets(_x) {
    return _ref.apply(this, arguments);
  }

  return generateAssets;
}();