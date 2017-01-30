'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var outputDir = _ref2.outputDir,
        title = _ref2.title,
        pagesDir = _ref2.pagesDir;
    var config, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = {
              title: title
            };

            pagesDir = _path2.default.resolve(process.cwd(), pagesDir);

            data = ['export default ' + (0, _stringify2.default)(config)];

            if (_fs2.default.existsSync(pagesDir)) {
              data.push('export { default as pages } from \'' + _path2.default.relative(outputDir, pagesDir) + '\'');
            }

            _context.next = 6;
            return (0, _writeFile2.default)({ outputPath: outputDir + '/config.js', data: data.join('\n') });

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function generateConfig(_x) {
    return _ref.apply(this, arguments);
  }

  return generateConfig;
}();