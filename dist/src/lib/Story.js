'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Story = function Story(type) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Story);
  this.stories = [];
  this.handleCalls = [];

  this.add = function (story) {
    _this.stories.push(story);
  };

  this.sequence = function (story, sequence) {
    return _this.stories.push((0, _extends3.default)({}, story, { sequence: sequence }));
  };

  this.handler = function (method) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (process.env.NODE_ENV === 'TEST') {
        _this.handleCalls.push({ method: method, args: args });
      } else {
        alert(method + ' called with\n\n' + (0, _stringify2.default)(args, null, 2));
      }
    };
  };

  this.popHandleCalls = function () {
    var out = _this.handleCalls;
    _this.handleCalls = [];
    return out;
  };

  this.type = type;
};

Story.getSequenceInitialProps = function (story) {
  var step = story.sequence[0];
  if (typeof step.update === 'function') {
    return step.update();
  } else if ((0, _typeof3.default)(step.update) === 'object') {
    return step.update;
  }
};

Story.getSequenceStepProps = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ref, story, index, prevProps) {
    var step, updated;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            step = story.sequence[index];

            if (!(typeof step.update === 'function')) {
              _context.next = 8;
              break;
            }

            _context.next = 4;
            return step.update(prevProps, ref);

          case 4:
            updated = _context.sent;
            return _context.abrupt('return', updated || prevProps);

          case 8:
            if (!((0, _typeof3.default)(step.update) === 'object')) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('return', step.update);

          case 10:
            return _context.abrupt('return', prevProps);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = Story;