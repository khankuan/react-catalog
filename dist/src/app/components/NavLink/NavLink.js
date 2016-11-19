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

var _reactRouter = require('react-router');

require('./NavLink.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavLink = function NavLink(_ref) {
  var expandable = _ref.expandable,
      expanded = _ref.expanded,
      onExpandClick = _ref.onExpandClick,
      active = _ref.active,
      activeHighlights = _ref.activeHighlights,
      children = _ref.children,
      disabled = _ref.disabled,
      className = _ref.className,
      passProps = (0, _objectWithoutProperties3.default)(_ref, ['expandable', 'expanded', 'onExpandClick', 'active', 'activeHighlights', 'children', 'disabled', 'className']);

  var Component = passProps.to ? _reactRouter.Link : 'a';

  var expansion = void 0;
  if (expandable) {
    expansion = _react2.default.createElement(
      'span',
      { className: 'expand', onClick: onExpandClick },
      expanded ? '-' : '+'
    );
  }

  return _react2.default.createElement(
    Component,
    (0, _extends3.default)({}, passProps, {
      className: (0, _classnames2.default)('react-library-nav-link', { active: active, selected: active && activeHighlights, disabled: disabled }, className) }),
    _react2.default.createElement(
      'span',
      { className: 'link-text' },
      children
    ),
    expansion
  );
};

exports.default = NavLink;