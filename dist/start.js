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

var _watchAllComponentDoc = require('./utils/watchAllComponentDoc');

var _watchAllComponentDoc2 = _interopRequireDefault(_watchAllComponentDoc);

var _watchAllStory = require('./utils/watchAllStory');

var _watchAllStory2 = _interopRequireDefault(_watchAllStory);

var _startWebpackDev = require('./utils/startWebpackDev');

var _startWebpackDev2 = _interopRequireDefault(_startWebpackDev);

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
        postBuild = _ref2.postBuild,
        port = _ref2.port;
    var componentExports, storyExports, outputPublicDir, webpackConfig;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _clearOutput2.default)({ outputDir: outputDir });

          case 2:
            console.log(_chalk2.default.green('Folder reset.'));

            _context.next = 5;
            return (0, _generateAssets2.default)({ outputDir: outputDir, assets: assets, head: head, body: body });

          case 5:
            console.log(_chalk2.default.green('Assets generated.'));

            //  Generate component index, docs and story index
            _context.next = 8;
            return (0, _generateComponentIndexAndDocs2.default)({ src: src, componentPattern: componentPattern, storyPattern: storyPattern, outputDir: outputDir });

          case 8:
            componentExports = _context.sent;

            console.log(_chalk2.default.green('Component docs generated.'));
            _context.next = 12;
            return (0, _generateStoryIndex2.default)({ src: src, storyPattern: storyPattern, outputDir: outputDir });

          case 12:
            storyExports = _context.sent;

            console.log(_chalk2.default.green('Stories generated.'));

            //  Generate config file
            _context.next = 16;
            return (0, _generateConfig2.default)({ outputDir: outputDir, title: title, pagesDir: pagesDir });

          case 16:
            console.log(_chalk2.default.green('Config generated.'));

            //  Watch folder for component and story files
            _context.next = 19;
            return (0, _watchAllComponentDoc2.default)({ src: src, componentPattern: componentPattern, storyPattern: storyPattern, outputDir: outputDir, componentExports: componentExports });

          case 19:
            _context.next = 21;
            return (0, _watchAllStory2.default)({ src: src, storyPattern: storyPattern, outputDir: outputDir, storyExports: storyExports });

          case 21:
            console.log(_chalk2.default.green('Begin watching files..'));

            //  Start build and server
            outputPublicDir = outputDir + '/public';
            webpackConfig = (0, _makeWebpackConfig2.default)({ src: src, outputDir: outputDir, outputPublicDir: outputPublicDir, pagesDir: pagesDir, configureWebpack: configureWebpack });
            _context.next = 26;
            return (0, _startWebpackDev2.default)({ webpackConfig: webpackConfig, outputDir: outputPublicDir, port: port });

          case 26:
            console.log(_chalk2.default.green('Server started at http://localhost:' + port));

            if (!postBuild) {
              _context.next = 31;
              break;
            }

            _context.next = 30;
            return postBuild({ dev: true });

          case 30:
            console.log(_chalk2.default.green('Post build completed.'));

          case 31:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function start(_x) {
    return _ref.apply(this, arguments);
  }

  return start;
}();