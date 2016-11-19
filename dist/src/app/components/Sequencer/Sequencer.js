'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _components = require('build/components');

var components = _interopRequireWildcard(_components);

var _Story = require('../../../lib/Story');

var _Story2 = _interopRequireDefault(_Story);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequencer = function (_Component) {
  (0, _inherits3.default)(Sequencer, _Component);

  function Sequencer(props) {
    (0, _classCallCheck3.default)(this, Sequencer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Sequencer.__proto__ || (0, _getPrototypeOf2.default)(Sequencer)).call(this, props));

    _this.state = {
      sequenceKey: 0,
      sequenceProps: _Story2.default.getSequenceInitialProps(props.story),
      stepsRendered: 0
    };
    return _this;
  }

  (0, _createClass3.default)(Sequencer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.story !== this.props.story || nextProps.stepIndex < this.props.stepIndex) {
        this.setState({
          sequenceKey: this.state.sequenceKey + 1,
          sequenceProps: _Story2.default.getSequenceInitialProps(nextProps.story),
          stepsRendered: 0
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.checkSequence();
      this.notifyProps();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.checkSequence(true);
    }
  }, {
    key: 'checkSequence',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(notify) {
        var _props, story, stepIndex, stepsRendered, sequenceProps;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _props = this.props, story = _props.story, stepIndex = _props.stepIndex;
                stepsRendered = this.state.stepsRendered;
                sequenceProps = this.state.sequenceProps;

                if (!(stepsRendered === stepIndex)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return');

              case 5:

                this.setState({ stepsRendered: stepsRendered + 1 });
                _context.next = 8;
                return _Story2.default.getSequenceStepProps(this._component, story, stepsRendered + 1, sequenceProps);

              case 8:
                sequenceProps = _context.sent;

                this.setState({ sequenceProps: sequenceProps });
                if (notify) {
                  this.notifyProps();
                }

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkSequence(_x) {
        return _ref.apply(this, arguments);
      }

      return checkSequence;
    }()
  }, {
    key: 'notifyProps',
    value: function notifyProps() {
      if (this.props.onPropsChange) {
        this.props.onPropsChange(this.state.sequenceProps);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          sequenceKey = _state.sequenceKey,
          sequenceProps = _state.sequenceProps;
      var component = this.props.component;

      var Component = components[component];

      return _react2.default.createElement(Component, (0, _extends3.default)({ key: sequenceKey, ref: function ref(_ref2) {
          return _this2._component = _ref2;
        } }, sequenceProps));
    }
  }]);
  return Sequencer;
}(_react.Component);

Sequencer.propTypes = {
  component: _react.PropTypes.string,
  story: _react.PropTypes.shape({
    sequence: _react.PropTypes.array
  }),
  stepIndex: _react.PropTypes.number,
  onPropsChange: _react.PropTypes.func
};
exports.default = Sequencer;