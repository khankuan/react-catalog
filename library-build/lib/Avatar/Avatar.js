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

require('./Avatar.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  @categories: Image
 *  @tags: Profile, Picture
 *  @default
 *  Display pic of a user
 */
var Avatar = function Avatar(_ref) {
  var theme = _ref.theme,
      type = _ref.type,
      src = _ref.src,
      passProps = (0, _objectWithoutProperties3.default)(_ref, ['theme', 'type', 'src']);

  return _react2.default.createElement('img', (0, _extends3.default)({}, passProps, {
    className: (0, _classnames2.default)('demo-avatar', 'demo-avatar-type-' + type, 'demo-avatar-theme-' + theme),
    src: src }));
};

Avatar.propTypes = {
  /** Image Url */
  src: _react.PropTypes.string.isRequired,
  type: _react.PropTypes.oneOf(['square', 'round']),
  theme: _react.PropTypes.oneOf(['light', 'dark'])
};

Avatar.defaultProps = {
  src: 'http://success.grownupgeek.com/wp-content/uploads/2013/01/no-avatar.png',
  type: 'round',
  theme: 'light'
};

exports.default = Avatar;