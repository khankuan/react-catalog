'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./LinkButton.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @categories: Button
 * @tags: Links, href, url
 * An anchor element
 */
var LinkButton = function (_Component) {
  (0, _inherits3.default)(LinkButton, _Component);

  function LinkButton() {
    (0, _classCallCheck3.default)(this, LinkButton);
    return (0, _possibleConstructorReturn3.default)(this, (LinkButton.__proto__ || (0, _getPrototypeOf2.default)(LinkButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(LinkButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          passProps = (0, _objectWithoutProperties3.default)(_props, ['className']);

      return _react2.default.createElement('a', (0, _extends3.default)({}, passProps, { className: (0, _classnames2.default)('demo-link-button', className) }));
    }
  }]);
  return LinkButton;
}(_react.Component);

LinkButton.propTypes = {
  children: _react.PropTypes.node.isRequired,
  className: _react.PropTypes.string
};
exports.default = LinkButton;