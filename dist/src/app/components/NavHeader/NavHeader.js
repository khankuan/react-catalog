'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./NavHeader.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavHeader = function NavHeader(_ref) {
  var header = _ref.header,
      className = _ref.className;

  return _react2.default.createElement(
    'h6',
    { className: (0, _classnames2.default)('react-library-nav-header', className) },
    header
  );
};

exports.default = NavHeader;