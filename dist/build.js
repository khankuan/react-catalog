'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _clearOutput = require('./utils/clearOutput');

var _clearOutput2 = _interopRequireDefault(_clearOutput);

var _generateAssets = require('./utils/generateAssets');

var _generateAssets2 = _interopRequireDefault(_generateAssets);

var _generateComponentIndexAndDocs = require('./utils/generateComponentIndexAndDocs');

var _generateComponentIndexAndDocs2 = _interopRequireDefault(_generateComponentIndexAndDocs);

var _generateStoryIndex = require('./utils/generateStoryIndex');

var _generateStoryIndex2 = _interopRequireDefault(_generateStoryIndex);

var _generateConfig = require('./utils/generateConfig');

var _generateConfig2 = _interopRequireDefault(_generateConfig);

var _startWebpackProd = require('./utils/startWebpackProd');

var _startWebpackProd2 = _interopRequireDefault(_startWebpackProd);

var _makeWebpackConfig = require('./config/makeWebpackConfig');

var _makeWebpackConfig2 = _interopRequireDefault(_makeWebpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var src = _ref2.src,
        pagesDir = _ref2.pagesDir,
        assets = _ref2.assets,
        outputDir = _ref2.outputDir,
        head = _ref2.head,
        body = _ref2.body,
        title = _ref2.title,
        componentPattern = _ref2.componentPattern,
        storyPattern = _ref2.storyPattern,
        configureWebpack = _ref2.configureWebpack,
        postBuild = _ref2.postBuild;
    var outputPublicDir, webpackConfig;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _clearOutput2.default)({ outputDir: outputDir + '/!(__tests__)' });

          case 2:
            console.log(_chalk2.default.green('Folder reset.'));

            _context.next = 5;
            return (0, _generateAssets2.default)({ outputDir: outputDir, assets: assets, head: head, body: body, production: true });

          case 5:
            console.log(_chalk2.default.green('Assets generated.'));

            //  Generate component index, docs and story index
            _context.next = 8;
            return (0, _generateComponentIndexAndDocs2.default)({ src: src, componentPattern: componentPattern, storyPattern: storyPattern, outputDir: outputDir });

          case 8:
            console.log(_chalk2.default.green('Component docs generated.'));
            (0, _generateStoryIndex2.default)({ src: src, storyPattern: storyPattern, outputDir: outputDir });
            console.log(_chalk2.default.green('Stories generated.'));

            //  Generate config file
            _context.next = 13;
            return (0, _generateConfig2.default)({ outputDir: outputDir, title: title, pagesDir: pagesDir });

          case 13:
            console.log(_chalk2.default.green('Config generated.'));

            //  Start build and server
            outputPublicDir = outputDir + '/public';
            webpackConfig = (0, _makeWebpackConfig2.default)({ src: src, outputDir: outputDir, outputPublicDir: outputPublicDir, pagesDir: pagesDir, configureWebpack: configureWebpack, production: true });
            _context.next = 18;
            return (0, _startWebpackProd2.default)({ webpackConfig: webpackConfig, outputDir: outputPublicDir });

          case 18:
            console.log(_chalk2.default.green('Bundle built.'));

            if (!postBuild) {
              _context.next = 23;
              break;
            }

            _context.next = 22;
            return postBuild();

          case 22:
            console.log(_chalk2.default.green('Post build completed.'));

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function build(_x) {
    return _ref.apply(this, arguments);
  }

  return build;
}();