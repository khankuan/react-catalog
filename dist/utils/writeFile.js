'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var outputPath = _ref2.outputPath,
        data = _ref2.data;
    var dir;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dir = _path2.default.dirname(outputPath);


            if (!_fs2.default.existsSync(dir)) {
              _mkdirp2.default.sync(dir);
            }

            _fs2.default.writeFileSync(outputPath, data, 'utf8');

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function writeFile(_x) {
    return _ref.apply(this, arguments);
  }

  return writeFile;
}();