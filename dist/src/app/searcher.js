'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.componentSearch = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _fuse = require('fuse.js');

var _fuse2 = _interopRequireDefault(_fuse);

var _docs = require('build/docs');

var docs = _interopRequireWildcard(_docs);

var _components = require('build/components');

var components = _interopRequireWildcard(_components);

var _stories = require('build/stories');

var stories = _interopRequireWildcard(_stories);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentObjs = (0, _keys2.default)(components).map(function (name) {
  var doc = docs[name];
  return {
    name: name,
    nameText: name.replace(/([A-Z])/g, ' $1').trim(), //  Make camel case searchable
    description: doc ? doc.description : '',
    keywords: doc ? doc.keywords : null,
    stories: stories[name] ? stories[name].stories : null
  };
});

var componentSearch = exports.componentSearch = new _fuse2.default(componentObjs, {
  keys: [{
    name: 'nameText',
    weight: 1
  }, {
    name: 'description',
    weight: 0.3
  }, {
    name: 'keywords',
    weight: 1
  }, {
    name: 'stories.title',
    weight: 1
  }, {
    name: 'stories.description',
    weight: 0.3
  }],
  id: 'name',
  tokenize: true,
  threshold: 0.3
});