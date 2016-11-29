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

var _jest = require('jest');

var _jest2 = _interopRequireDefault(_jest);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _generateComponentsTests = require('./utils/generateComponentsTests');

var _generateComponentsTests2 = _interopRequireDefault(_generateComponentsTests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2, _ref3) {
    var src = _ref2.src,
        componentPattern = _ref2.componentPattern,
        storyPattern = _ref2.storyPattern,
        outputDir = _ref2.outputDir;
    var update = _ref3.update;
    var testDir, stub, jestConfig, args;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            testDir = _path2.default.resolve(outputDir, '__tests__');
            stub = _path2.default.resolve(__dirname, 'utils/stub.js');
            _context.next = 4;
            return (0, _generateComponentsTests2.default)({ src: src, componentPattern: componentPattern, storyPattern: storyPattern, outputDir: testDir });

          case 4:
            console.log(_chalk2.default.green('Tests generated.'));

            jestConfig = {
              testPathIgnorePatterns: ['<rootDir>/node_modules/'],
              transformIgnorePatterns: ['/node_modules(?!\/(react-library))/'],
              testRegex: '(__tests__/.*|\\.(test|spec))\\.js$',
              rootDir: testDir,
              moduleNameMapper: {
                '^[./a-zA-Z0-9$_-]+\\.(jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm)$': stub,
                '^[./a-zA-Z0-9$_-]+\\.(css|sass|scss)$': stub,
                'react-library': _path2.default.resolve(__dirname, '../src/index.js'),
                alert: function alert() {}
              }
            };


            console.log('Starting tests..');
            args = ['--config', (0, _stringify2.default)(jestConfig)];

            if (update) {
              args.push('-u');
            }
            process.env.NODE_ENV = 'TEST';
            _jest2.default.run(args);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function test(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return test;
}();