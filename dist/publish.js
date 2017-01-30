'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = publish;

var _ghPages = require('gh-pages');

var _ghPages2 = _interopRequireDefault(_ghPages);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function publish(_ref) {
  var outputDir = _ref.outputDir;

  var outputPublicDir = outputDir + '/public';
  return new _promise2.default(function (resolve, reject) {
    _ghPages2.default.publish(_path2.default.resolve(process.cwd(), outputPublicDir), function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}