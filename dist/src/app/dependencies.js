'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _docs = require('build/docs');

var docs = _interopRequireWildcard(_docs);

var _components = require('build/components');

var components = _interopRequireWildcard(_components);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deps = {
  by: {},
  on: {}
};

var _loop = function _loop(key) {
  var dep = docs[key].dependencies || [];
  deps.on[key] = [].concat((0, _toConsumableArray3.default)(dep.filter(function (d) {
    return components[d];
  })), (0, _toConsumableArray3.default)(dep.filter(function (d) {
    return !components[d];
  })));
  dep.filter(function (d) {
    return !!components[d];
  }).forEach(function (d) {
    deps.by[d] = deps.by[d] || [];
    deps.by[d].push(key);
  });
};

for (var key in docs) {
  _loop(key);
}

exports.default = deps;