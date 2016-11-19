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

require('./StaticPage.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StaticPage = function StaticPage(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = (0, _objectWithoutProperties3.default)(_ref, ['children', 'className']);

  if (typeof children === 'string') {
    children = _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: children } });
  } else {
    var Comp = children;
    children = _react2.default.createElement(Comp, null);
  }
  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, props, { className: 'react-library-page' }),
    _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('react-library-page-wrapper', className) },
      children
    )
  );
};

exports.default = StaticPage;