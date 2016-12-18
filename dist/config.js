'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = function (configPath) {
  //  Default config
  var config = {
    src: 'src',
    pagesDir: 'src/pages',
    outputDir: 'library-build',
    assets: [],
    title: 'React Library',
    componentPattern: '**/*.jsx',
    storyPattern: '**/*.story.jsx',
    configureWebpack: null,
    postBuild: null,
    port: 9000
  };

  var configFile = _path2.default.resolve(process.cwd() + '/', configPath || 'library.config.js');

  if (!_fs2.default.existsSync(configFile)) {
    return config;
  }

  try {
    var data = require(configFile).default || require(configFile); //  support module.exports
    config = (0, _extends3.default)({}, config, data);
  } catch (err) {
    throw new Error('Error loading config ' + (err.stack || err));
  }
  return config;
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }