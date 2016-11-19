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

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _getFileName = require('./getFileName');

var _getFileName2 = _interopRequireDefault(_getFileName);

var _writeIndex = require('./writeIndex');

var _writeIndex2 = _interopRequireDefault(_writeIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref2) {
    var src = _ref2.src,
        storyPattern = _ref2.storyPattern,
        outputDir = _ref2.outputDir,
        storyExports = _ref2.storyExports;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return new _promise2.default(function (resolve, reject) {
              var watcher = _chokidar2.default.watch(storyPattern, {
                cwd: src,
                ignoreInitial: true
              });

              watcher.on('add', function () {
                var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(file) {
                  var name;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          file = _path2.default.resolve(src, file);
                          console.log('story_add', file);
                          name = (0, _getFileName2.default)(file);

                          storyExports[name] = _path2.default.relative(outputDir, file);
                          (0, _writeIndex2.default)({ index: 'stories', outputDir: outputDir, exports: storyExports, exportAll: true });

                        case 5:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x2) {
                  return _ref3.apply(this, arguments);
                };
              }());

              watcher.on('unlink', function () {
                var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(file) {
                  var name;
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          file = _path2.default.resolve(src, file);
                          console.log('story_remove', file);
                          name = (0, _getFileName2.default)(file);

                          if (storyExports[name]) {
                            delete storyExports[name];
                            (0, _writeIndex2.default)({ index: 'stories', outputDir: outputDir, exports: storyExports, exportAll: true });
                          }

                        case 4:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                return function (_x3) {
                  return _ref4.apply(this, arguments);
                };
              }());

              resolve(watcher);
            });

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function watchAllStory(_x) {
    return _ref.apply(this, arguments);
  }

  return watchAllStory;
}();