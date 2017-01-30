'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _generateComponentDoc = require('./generateComponentDoc');

var _generateComponentDoc2 = _interopRequireDefault(_generateComponentDoc);

var _getFileName = require('./getFileName');

var _getFileName2 = _interopRequireDefault(_getFileName);

var _writeIndex = require('./writeIndex');

var _writeIndex2 = _interopRequireDefault(_writeIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_ref2) {
    var addComponentToIndex = function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(name, file) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (componentExports.components[name]) {
                  _context.next = 4;
                  break;
                }

                componentExports.components[name] = _path2.default.relative(outputDir, file);
                _context.next = 4;
                return (0, _writeIndex2.default)({ index: 'components', outputDir: outputDir, exports: componentExports.components });

              case 4:
                if (componentExports.docs[name]) {
                  _context.next = 8;
                  break;
                }

                componentExports.docs[name] = './docs/' + name;
                _context.next = 8;
                return (0, _writeIndex2.default)({ index: 'docs', outputDir: outputDir, exports: componentExports.docs });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function addComponentToIndex(_x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }();

    var src = _ref2.src,
        componentPattern = _ref2.componentPattern,
        storyPattern = _ref2.storyPattern,
        outputDir = _ref2.outputDir,
        componentExports = _ref2.componentExports;
    var docsDir;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            docsDir = outputDir + '/docs';
            _context5.next = 3;
            return new _promise2.default(function (resolve, reject) {
              var watcher = _chokidar2.default.watch(componentPattern, {
                ignored: storyPattern,
                cwd: src,
                ignoreInitial: true
              });

              watcher.on('add', function () {
                var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(file) {
                  var name;
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          file = _path2.default.resolve(src, file);
                          console.log('component_add', file);
                          _context2.next = 4;
                          return (0, _generateComponentDoc2.default)({ inputPath: file, outputDir: docsDir });

                        case 4:
                          name = _context2.sent;

                          addComponentToIndex(name, file);

                        case 6:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                return function (_x4) {
                  return _ref4.apply(this, arguments);
                };
              }());

              watcher.on('change', function () {
                var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(file) {
                  var name;
                  return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          file = _path2.default.resolve(src, file);
                          console.log('component_change', file);
                          _context3.next = 4;
                          return (0, _generateComponentDoc2.default)({ inputPath: file, outputDir: docsDir });

                        case 4:
                          name = _context3.sent;

                          addComponentToIndex(name, file);

                        case 6:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, this);
                }));

                return function (_x5) {
                  return _ref5.apply(this, arguments);
                };
              }());

              watcher.on('unlink', function () {
                var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(file) {
                  var name;
                  return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          file = _path2.default.resolve(src, file);
                          console.log('component_remove', file);
                          name = (0, _getFileName2.default)(file);

                          if (componentExports.components[name]) {
                            delete componentExports.components[name];
                            (0, _writeIndex2.default)({ index: 'components', outputDir: outputDir, exports: componentExports.components });
                          }
                          if (componentExports.docs[name]) {
                            delete componentExports.docs[name];
                            (0, _writeIndex2.default)({ index: 'docs', outputDir: outputDir, exports: componentExports.docs });
                            _fs2.default.unlinkSync(docsDir + '/' + name + '.js');
                          }

                        case 5:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, this);
                }));

                return function (_x6) {
                  return _ref6.apply(this, arguments);
                };
              }());

              resolve(watcher);
            });

          case 3:
            return _context5.abrupt('return', _context5.sent);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  function watchAllComponentDoc(_x) {
    return _ref.apply(this, arguments);
  }

  return watchAllComponentDoc;
}();