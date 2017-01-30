'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTranspiledIndex = exports.generateComponentDocs = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var generateComponentDocs = exports.generateComponentDocs = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref2) {
    var _this = this;

    var src = _ref2.src,
        componentPattern = _ref2.componentPattern,
        storyPattern = _ref2.storyPattern,
        outputDir = _ref2.outputDir,
        production = _ref2.production;

    var globPromise, files, docsDir, exports, _loop, i;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            globPromise = _bluebird2.default.promisify(_glob2.default);
            _context2.next = 3;
            return globPromise(componentPattern, {
              cwd: src,
              ignore: storyPattern
            });

          case 3:
            files = _context2.sent;
            docsDir = outputDir + '/docs';
            exports = {
              components: {},
              docs: {}
            };
            _loop = _regenerator2.default.mark(function _callee(i) {
              var f;
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      f = files[i];
                      _context.next = 3;
                      return (0, _generateComponentDoc2.default)({ inputPath: _path2.default.resolve(src + '/', f), outputDir: docsDir }).then(function (name) {
                        exports.components[name] = _path2.default.relative(outputDir, './' + src + '/' + f);
                        exports.docs[name] = './docs/' + name;
                      }).catch(parseComponentDocErrorHandler);

                    case 3:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this);
            });
            i = 0;

          case 8:
            if (!(i < files.length)) {
              _context2.next = 13;
              break;
            }

            return _context2.delegateYield(_loop(i), 't0', 10);

          case 10:
            i++;
            _context2.next = 8;
            break;

          case 13:
            return _context2.abrupt('return', exports);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function generateComponentDocs(_x) {
    return _ref.apply(this, arguments);
  };
}();

var generateTranspiledIndex = exports.generateTranspiledIndex = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref6) {
    var src = _ref6.src,
        componentPattern = _ref6.componentPattern,
        storyPattern = _ref6.storyPattern,
        outputDir = _ref6.outputDir;

    var globPromise, files, lib, i, _f, component;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            globPromise = _bluebird2.default.promisify(_glob2.default);
            _context4.next = 3;
            return globPromise(componentPattern, {
              cwd: src,
              ignore: storyPattern
            });

          case 3:
            files = _context4.sent;
            lib = {};
            i = 0;

          case 6:
            if (!(i < files.length)) {
              _context4.next = 21;
              break;
            }

            _context4.prev = 7;
            _f = files[i];
            _context4.next = 11;
            return (0, _generateComponentDoc.parseComponentDoc)({ inputPath: _path2.default.resolve(src + '/', _f) });

          case 11:
            component = _context4.sent;

            lib[component.name] = './lib/' + _f.replace('.jsx', '.js');
            _context4.next = 18;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4['catch'](7);

            parseComponentDocErrorHandler(_context4.t0);

          case 18:
            i++;
            _context4.next = 6;
            break;

          case 21:
            _context4.next = 23;
            return (0, _writeIndex2.default)({ index: 'lib', exports: lib, outputDir: outputDir, es5: true });

          case 23:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[7, 15]]);
  }));

  return function generateTranspiledIndex(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _generateComponentDoc = require('./generateComponentDoc');

var _generateComponentDoc2 = _interopRequireDefault(_generateComponentDoc);

var _writeIndex = require('./writeIndex');

var _writeIndex2 = _interopRequireDefault(_writeIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseComponentDocErrorHandler(err) {
  if (err.message === 'IGNORED') {
    console.warn(_chalk2.default.yellow('Ignored:', f));
  } else if (err.message === 'No suitable component definition found.') {
    return;
  } else {
    console.warn(_chalk2.default.red('Error parsing file:', f, err.message));
  }
}

exports.default = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref4) {
    var src = _ref4.src,
        componentPattern = _ref4.componentPattern,
        storyPattern = _ref4.storyPattern,
        outputDir = _ref4.outputDir,
        production = _ref4.production;
    var exports;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return generateComponentDocs({ src: src, componentPattern: componentPattern, storyPattern: storyPattern, outputDir: outputDir, production: production });

          case 2:
            exports = _context3.sent;
            _context3.next = 5;
            return (0, _writeIndex2.default)({ index: 'components', exports: exports.components, outputDir: outputDir });

          case 5:
            _context3.next = 7;
            return (0, _writeIndex2.default)({ index: 'docs', exports: exports.docs, outputDir: outputDir });

          case 7:
            return _context3.abrupt('return', exports);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function generateComponentIndexAndDocs(_x2) {
    return _ref3.apply(this, arguments);
  }

  return generateComponentIndexAndDocs;
}();