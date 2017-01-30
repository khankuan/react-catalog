'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearOldTests = exports.generateComponentsStoryTests = exports.generateComponentsDefaultTests = exports.getDoc = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getDoc = exports.getDoc = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var inputPath = _ref2.inputPath;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _generateComponentDoc.parseComponentDoc)({ inputPath: inputPath });

          case 3:
            return _context.abrupt('return', _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', null);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 6]]);
  }));

  return function getDoc(_x) {
    return _ref.apply(this, arguments);
  };
}();

var generateComponentsDefaultTests = exports.generateComponentsDefaultTests = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
    var src = _ref4.src,
        componentPattern = _ref4.componentPattern,
        storyPattern = _ref4.storyPattern,
        outputDir = _ref4.outputDir;
    var files;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return globPromise(componentPattern, {
              cwd: src,
              ignore: storyPattern
            });

          case 2:
            files = _context2.sent;
            _context2.next = 5;
            return _bluebird2.default.all(files.map(function (f) {
              var inputPath = _path2.default.resolve(src + '/', f);
              return getDoc({ inputPath: inputPath }).then(function (doc) {
                if (doc && doc.hasDefault) {
                  var name = (0, _getFileName2.default)(f);
                  var outputPath = _path2.default.relative(process.cwd(), _path2.default.resolve(outputDir, './' + name + '.test.js'));
                  var data = (0, _generateTest.generateDefaultTest)({
                    data: '<' + name + ' />',
                    it: name + ' default renders',
                    componentPath: _path2.default.relative(outputDir, inputPath),
                    name: name
                  });
                  return (0, _writeFile2.default)({ outputPath: outputPath, data: data });
                }
              });
            }));

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function generateComponentsDefaultTests(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var generateComponentsStoryTests = exports.generateComponentsStoryTests = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref6) {
    var src = _ref6.src,
        storyPattern = _ref6.storyPattern,
        outputDir = _ref6.outputDir;
    var files;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return globPromise(storyPattern, {
              cwd: src
            });

          case 2:
            files = _context3.sent;
            _context3.next = 5;
            return _bluebird2.default.all(files.map(function (f) {
              var inputPath = _path2.default.resolve(src + '/', f);
              var name = (0, _getFileName2.default)(f).split();
              var outputPath = _path2.default.relative(process.cwd(), _path2.default.resolve(outputDir, './' + name + '.test.js'));
              var data = (0, _generateTest.generateStoriesTest)({
                importedPath: _path2.default.relative(outputDir, inputPath),
                name: name
              });
              (0, _writeFile2.default)({ outputPath: outputPath, data: data });
            }));

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function generateComponentsStoryTests(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

var clearOldTests = exports.clearOldTests = function () {
  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref8) {
    var outputDir = _ref8.outputDir;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _clearOutput2.default)({ outputDir: outputDir + '/!(__snapshots__)' });

          case 2:
            return _context4.abrupt('return', _context4.sent);

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function clearOldTests(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _generateComponentDoc = require('./generateComponentDoc');

var _generateTest = require('./generateTest');

var _getFileName = require('./getFileName');

var _getFileName2 = _interopRequireDefault(_getFileName);

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

var _clearOutput = require('./clearOutput');

var _clearOutput2 = _interopRequireDefault(_clearOutput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globPromise = _bluebird2.default.promisify(_glob2.default);

exports.default = function () {
  var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_ref10) {
    var src = _ref10.src,
        componentPattern = _ref10.componentPattern,
        storyPattern = _ref10.storyPattern,
        outputDir = _ref10.outputDir;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return clearOldTests({ outputDir: outputDir });

          case 2:
            _context5.next = 4;
            return generateComponentsDefaultTests({ src: src, componentPattern: componentPattern, storyPattern: storyPattern, outputDir: outputDir });

          case 4:
            _context5.next = 6;
            return generateComponentsStoryTests({ src: src, componentPattern: componentPattern, storyPattern: storyPattern, outputDir: outputDir });

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  function generateComponentsTests(_x5) {
    return _ref9.apply(this, arguments);
  }

  return generateComponentsTests;
}();