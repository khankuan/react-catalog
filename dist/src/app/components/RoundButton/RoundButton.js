'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./RoundButton.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RoundButton = function RoundButton(_ref) {
  var className = _ref.className,
      theme = _ref.theme,
      props = (0, _objectWithoutProperties3.default)(_ref, ['className', 'theme']);

  return _react2.default.createElement('button', (0, _extends3.default)({}, props, {
    className: (0, _classnames2.default)('react-library-round-button', 'theme-' + theme, props.className) }));
};

RoundButton.propTypes = {
  className: _react.PropTypes.string,
  theme: _react.PropTypes.oneOf(['dark', 'light'])
};

RoundButton.defaultProps = {
  theme: 'dark'
};

exports.default = RoundButton;