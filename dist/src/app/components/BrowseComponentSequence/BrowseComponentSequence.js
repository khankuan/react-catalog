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

var _SequenceControls = require('../SequenceControls/SequenceControls');

var _SequenceControls2 = _interopRequireDefault(_SequenceControls);

var _Sequencer = require('../Sequencer/Sequencer');

var _Sequencer2 = _interopRequireDefault(_Sequencer);

var _RenderSafe = require('../RenderSafe/RenderSafe');

var _RenderSafe2 = _interopRequireDefault(_RenderSafe);

require('./BrowseComponentSequence.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowseComponentSequence = function (_Component) {
  (0, _inherits3.default)(BrowseComponentSequence, _Component);

  function BrowseComponentSequence() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BrowseComponentSequence);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BrowseComponentSequence.__proto__ || (0, _getPrototypeOf2.default)(BrowseComponentSequence)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      stepIndex: 0
    }, _this.handleStepChange = function (i) {
      _this.setState({ stepIndex: i });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BrowseComponentSequence, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          story = _props.story,
          component = _props.component;
      var stepIndex = this.state.stepIndex;

      return _react2.default.createElement(
        'div',
        { className: 'react-library-browse-component-sequence' },
        _react2.default.createElement(_SequenceControls2.default, {
          key: 'control',
          className: 'sequence-controls',
          story: story,
          stepIndex: stepIndex,
          onStepChange: this.handleStepChange }),
        _react2.default.createElement(
          _RenderSafe2.default,
          { key: 'output' },
          _react2.default.createElement(_Sequencer2.default, { component: component, story: story, stepIndex: stepIndex })
        )
      );
    }
  }]);
  return BrowseComponentSequence;
}(_react.Component);

BrowseComponentSequence.propTypes = {
  story: _react.PropTypes.shape({
    sequence: _react.PropTypes.array
  }),
  component: _react.PropTypes.string
};
exports.default = BrowseComponentSequence;