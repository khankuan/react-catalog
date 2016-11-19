'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ghPages = require('gh-pages');

var _ghPages2 = _interopRequireDefault(_ghPages);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var outputDir = _ref2.outputDir;
    var outputPublicDir;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            outputPublicDir = outputDir + '/public';
            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              _ghPages2.default.publish(_path2.default.resolve(process.cwd(), outputPublicDir), function (err) {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            }));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function publish(_x) {
    return _ref.apply(this, arguments);
  }

  return publish;
}();