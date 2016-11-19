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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var child = _interopRequireWildcard(_child_process);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var src = _ref2.src;

    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        fix = _ref3.fix;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            src = _path2.default.resolve(process.cwd(), src);
            fix = fix ? ' --fix' : '';

            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              child.ChildProcess = child.exec('standard ' + src + '/**/*' + fix, function (err, stdout, stderr) {
                if (err) {
                  reject(stdout);
                } else if (stderr) {
                  reject(stderr);
                } else {
                  resolve(stdout);
                }
              });
            }));

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function lint(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return lint;
}();