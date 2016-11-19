'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

require('./SequenceControls.css');

var _NavLink = require('../NavLink/NavLink');

var _NavLink2 = _interopRequireDefault(_NavLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SequenceControls = function (_Component) {
  (0, _inherits3.default)(SequenceControls, _Component);

  function SequenceControls() {
    (0, _classCallCheck3.default)(this, SequenceControls);
    return (0, _possibleConstructorReturn3.default)(this, (SequenceControls.__proto__ || (0, _getPrototypeOf2.default)(SequenceControls)).apply(this, arguments));
  }

  (0, _createClass3.default)(SequenceControls, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          story = _props.story,
          stepIndex = _props.stepIndex,
          onStepChange = _props.onStepChange,
          className = _props.className;
      var sequence = story.sequence;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('react-library-sequence-controls', className) },
        _react2.default.createElement(
          'div',
          { className: 'sequence-list' },
          sequence.map(function (step, i) {
            return [_react2.default.createElement(
              _NavLink2.default,
              {
                key: i,
                className: 'sequence-link',
                active: stepIndex === i,
                onClick: onStepChange.bind(null, i) },
              step.title
            ), i < sequence.length - 1 ? _react2.default.createElement(
              'span',
              { key: i + '_arrow', className: 'sequence-arrow' },
              '\u2192'
            ) : null];
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'steppers' },
          _react2.default.createElement(
            _NavLink2.default,
            {
              className: 'sequence-link',
              onClick: onStepChange.bind(null, 0) },
            '\u27F3'
          ),
          _react2.default.createElement(
            _NavLink2.default,
            {
              className: 'sequence-link',
              onClick: onStepChange.bind(null, stepIndex - 1),
              disabled: stepIndex === 0 },
            'Previous'
          ),
          _react2.default.createElement(
            _NavLink2.default,
            {
              className: 'sequence-link',
              onClick: onStepChange.bind(null, stepIndex + 1),
              disabled: stepIndex === sequence.length - 1 },
            'Next'
          )
        )
      );
    }
  }]);
  return SequenceControls;
}(_react.Component);

SequenceControls.propTypes = {
  story: _react.PropTypes.shape({
    sequence: _react.PropTypes.array
  }),
  stepIndex: _react.PropTypes.number,
  onStepChange: _react.PropTypes.func.isRequired,
  className: _react.PropTypes.string
};
exports.default = SequenceControls;