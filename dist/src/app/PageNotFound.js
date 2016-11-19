'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _history = require('./history');

var _history2 = _interopRequireDefault(_history);

var _components = require('build/components');

var components = _interopRequireWildcard(_components);

var _config = require('build/config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageNotFound = function (_Component) {
  (0, _inherits3.default)(PageNotFound, _Component);

  function PageNotFound() {
    (0, _classCallCheck3.default)(this, PageNotFound);
    return (0, _possibleConstructorReturn3.default)(this, (PageNotFound.__proto__ || (0, _getPrototypeOf2.default)(PageNotFound)).apply(this, arguments));
  }

  (0, _createClass3.default)(PageNotFound, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var pathname = void 0;
      if (_config.pages && _config.pages[0] && _config.pages[0].props.path) {
        pathname = '/' + _config.pages[0].props.path;
      }
      if (!pathname) {
        pathname = '/All/' + (0, _keys2.default)(components)[0];
      }
      _history2.default.replace({
        pathname: pathname
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return PageNotFound;
}(_react.Component);

exports.default = PageNotFound;