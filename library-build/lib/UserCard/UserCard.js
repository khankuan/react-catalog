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

var _Card = require('../Card/Card');

var _Card2 = _interopRequireDefault(_Card);

var _Avatar = require('../Avatar/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _LinkButton = require('../LinkButton/LinkButton');

var _LinkButton2 = _interopRequireDefault(_LinkButton);

require('./UserCard.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @categories: User, Cards
 * @tags: Profile
 * A component display a user info with options to add menu actions
 */
var UserCard = function (_Component) {
  (0, _inherits3.default)(UserCard, _Component);

  function UserCard() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, UserCard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UserCard.__proto__ || (0, _getPrototypeOf2.default)(UserCard)).call.apply(_ref, [this].concat(args))), _this), _this.handleActionClick = function (action, e) {
      var onActionClick = _this.props.onActionClick;

      if (onActionClick) {
        onActionClick(action, e);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(UserCard, [{
    key: 'renderActions',
    value: function renderActions() {
      var _this2 = this;

      var _props = this.props,
          expanded = _props.expanded,
          actions = _props.actions;

      if (!expanded || actions.length === 0) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: 'demo-user-card-actions' },
        actions.map(function (action) {
          return _react2.default.createElement(
            _LinkButton2.default,
            {
              ref: function ref(_ref2) {
                return _this2['_action_' + action] = _ref2;
              },
              key: action,
              className: 'demo-action',
              onClick: _this2.handleActionClick.bind(null, action) },
            action
          );
        })
      );
    }
  }, {
    key: 'renderMore',
    value: function renderMore() {
      var _props2 = this.props,
          expanded = _props2.expanded,
          onExpand = _props2.onExpand;

      if (expanded) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: 'demo-user-card-more' },
        _react2.default.createElement(
          _LinkButton2.default,
          { onClick: onExpand },
          'More'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          name = _props3.name,
          avatar = _props3.avatar;

      return _react2.default.createElement(
        _Card2.default,
        null,
        _react2.default.createElement(
          'div',
          { className: 'demo-user-card-info' },
          _react2.default.createElement(_Avatar2.default, { src: avatar }),
          _react2.default.createElement(
            'span',
            { className: 'demo-name' },
            name
          )
        ),
        this.renderMore(),
        this.renderActions()
      );
    }
  }]);
  return UserCard;
}(_react.Component);

UserCard.propTypes = {
  name: _react.PropTypes.string.isRequired,
  avatar: _react.PropTypes.string,
  expanded: _react.PropTypes.bool,
  onExpand: _react.PropTypes.func,
  onActionClick: _react.PropTypes.func,
  actions: _react.PropTypes.arrayOf(_react.PropTypes.string)
};
UserCard.defaultProps = {
  actions: []
};
exports.default = UserCard;