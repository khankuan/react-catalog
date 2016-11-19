'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regExp = new RegExp('^[a-zA-Z0-9]+');

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var index = _ref2.index,
        exports = _ref2.exports,
        outputDir = _ref2.outputDir;
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = (0, _keys2.default)(exports).map(function (name) {
              return {
                name: name,
                exportName: name.match(regExp)[0]
              };
            }).sort(function (a, b) {
              return a.exportName - b.exportName;
            }).map(function (_ref3) {
              var name = _ref3.name,
                  exportName = _ref3.exportName;
              return 'export { default as ' + exportName + ' } from \'' + exports[name] + '\'';
            }).join('\n') + '\n';
            _context.next = 3;
            return (0, _writeFile2.default)({ outputPath: outputDir + '/' + index + '.js', data: data });

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function writeIndex(_x) {
    return _ref.apply(this, arguments);
  }

  return writeIndex;
}();