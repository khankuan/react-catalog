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

var _reactMarkdown = require('react-markdown');

var _reactMarkdown2 = _interopRequireDefault(_reactMarkdown);

require('./Markdown.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Markdown = function Markdown(_ref) {
  var className = _ref.className,
      props = (0, _objectWithoutProperties3.default)(_ref, ['className']);
  return _react2.default.createElement(_reactMarkdown2.default, (0, _extends3.default)({}, props, { className: (0, _classnames2.default)('react-library-markdown', className) }));
};

Markdown.propTypes = {
  className: _react.PropTypes.string
};

exports.default = Markdown;