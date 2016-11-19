'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFileName;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFileName(filePath) {
  return _path2.default.basename(filePath).replace(/\.[^/.]+$/, '');
}