'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _generateComponentIndexAndDocs = require('./utils/generateComponentIndexAndDocs');

var _transpile = require('./utils/transpile');

var _transpile2 = _interopRequireDefault(_transpile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var src = _ref2.src,
        outputDir = _ref2.outputDir,
        componentPattern = _ref2.componentPattern,
        storyPattern = _ref2.storyPattern;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _transpile2.default)({ src: src, outputDir: outputDir, storyPattern: storyPattern });

          case 2:
            console.log(_chalk2.default.green('Src transpiled'));

            //  Generate component index
            _context.next = 5;
            return (0, _generateComponentIndexAndDocs.generateTranspiledIndex)({ src: src, componentPattern: componentPattern, storyPattern: storyPattern, outputDir: outputDir });

          case 5:
            console.log(_chalk2.default.green('Component index generated.'));

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function transpile(_x) {
    return _ref.apply(this, arguments);
  }

  return transpile;
}();