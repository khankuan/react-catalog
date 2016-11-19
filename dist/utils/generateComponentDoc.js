'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseComponentDoc = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var parseComponentDoc = exports.parseComponentDoc = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var inputPath = _ref2.inputPath;
    var data, doc, componentName;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return readFile(inputPath, 'utf8');

          case 2:
            data = _context.sent;
            doc = (0, _reactDocgen.parse)(data, null, [].concat((0, _toConsumableArray3.default)(_reactDocgen.defaultHandlers), [_componentDependencyHandler2.default]));
            componentName = (0, _getFileName2.default)(inputPath);

            doc.name = componentName;
            if (doc.description) {
              doc = (0, _extends3.default)({}, doc, (0, _processDescription2.default)(doc.description));
            }
            //  If default enabled, check for required propTypes
            if (doc.props && doc.hasDefault) {
              doc.hasDefault = (0, _hasDefault2.default)(doc.props);
            }
            return _context.abrupt('return', doc);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function parseComponentDoc(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

var _reactDocgen = require('react-docgen');

var _componentDependencyHandler = require('../react-docgen-addons/componentDependencyHandler');

var _componentDependencyHandler2 = _interopRequireDefault(_componentDependencyHandler);

var _processDescription = require('../react-docgen-addons/processDescription');

var _processDescription2 = _interopRequireDefault(_processDescription);

var _hasDefault = require('../react-docgen-addons/hasDefault');

var _hasDefault2 = _interopRequireDefault(_hasDefault);

var _getFileName = require('./getFileName');

var _getFileName2 = _interopRequireDefault(_getFileName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFile = _bluebird2.default.promisify(_fs2.default.readFile);

exports.default = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
    var inputPath = _ref4.inputPath,
        outputDir = _ref4.outputDir;
    var componentDoc, outputPath, data, curData;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return parseComponentDoc({ inputPath: inputPath });

          case 2:
            componentDoc = _context2.sent;
            outputPath = outputDir + '/' + componentDoc.name + '.js';
            data = 'export default ' + (0, _stringify2.default)(componentDoc, null, 2);
            _context2.prev = 5;
            _context2.next = 8;
            return readFile(outputPath, 'utf8');

          case 8:
            curData = _context2.sent;

            if (!(curData === data)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt('return', componentDoc.name);

          case 11:
            _context2.next = 15;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2['catch'](5);

          case 15:
            _context2.next = 17;
            return (0, _writeFile2.default)({
              outputPath: outputPath,
              data: data
            });

          case 17:
            return _context2.abrupt('return', componentDoc.name);

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[5, 13]]);
  }));

  function generateComponentDoc(_x2) {
    return _ref3.apply(this, arguments);
  }

  return generateComponentDoc;
}();