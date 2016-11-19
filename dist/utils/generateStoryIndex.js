'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _writeIndex = require('./writeIndex');

var _writeIndex2 = _interopRequireDefault(_writeIndex);

var _getFileName = require('./getFileName');

var _getFileName2 = _interopRequireDefault(_getFileName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var src = _ref2.src,
        storyPattern = _ref2.storyPattern,
        outputDir = _ref2.outputDir;
    var globPromise, files, exports;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            globPromise = _bluebird2.default.promisify(_glob2.default);
            _context.next = 3;
            return globPromise(storyPattern, {
              cwd: src
            });

          case 3:
            files = _context.sent;
            exports = {};

            files.forEach(function (f) {
              return exports[(0, _getFileName2.default)(f)] = _path2.default.relative(outputDir, './' + src + '/' + f);
            });
            _context.next = 8;
            return (0, _writeIndex2.default)({ index: 'stories', exports: exports, outputDir: outputDir });

          case 8:
            return _context.abrupt('return', exports);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function generateAllComponentDoc(_x) {
    return _ref.apply(this, arguments);
  }

  return generateAllComponentDoc;
}();