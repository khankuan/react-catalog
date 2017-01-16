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

require('./Card.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @categories: Containers, Cards
 * @tags: Box
 * To wrap contents in a box-like div
 */
var Card = function Card(_ref) {
  var children = _ref.children,
      depth = _ref.depth,
      passProps = (0, _objectWithoutProperties3.default)(_ref, ['children', 'depth']);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, passProps, { className: (0, _classnames2.default)('demo-card', 'demo-card-depth-' + depth) }),
    children
  );
};

Card.propTypes = {
  /** Darkness */
  depth: _react.PropTypes.oneOf(['1', '2']),
  children: _react.PropTypes.node.isRequired
};

Card.defaultProps = {
  depth: '1'
};

exports.default = Card;