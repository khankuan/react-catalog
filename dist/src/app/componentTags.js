'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _components = require('build/components');

var components = _interopRequireWildcard(_components);

var _docs = require('build/docs');

var docs = _interopRequireWildcard(_docs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  Add components to 'All' tag
var componentTags = [];
componentTags.push({
  tag: 'All',
  components: (0, _keys2.default)(components)
});

//  Process component docs
var tags = {};
(0, _keys2.default)(components).forEach(function (component) {
  var doc = docs[component];
  if (doc.tags) {
    doc.tags.forEach(function (tag) {
      tags[tag] = tags[tag] || [];
      tags[tag].push(component);
    });
  }
});
for (var key in tags) {
  componentTags.push({ tag: key, components: tags[key] });
}

componentTags.forEach(function (componentTag) {
  return componentTag.components.sort();
});

exports.default = componentTags;