'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _componentTags = require('../../componentTags');

var _componentTags2 = _interopRequireDefault(_componentTags);

var _BrowseComponent = require('../BrowseComponent/BrowseComponent');

var _BrowseComponent2 = _interopRequireDefault(_BrowseComponent);

require('./Browse.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Browse = function (_Component) {
  (0, _inherits3.default)(Browse, _Component);

  function Browse() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Browse);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Browse.__proto__ || (0, _getPrototypeOf2.default)(Browse)).call.apply(_ref, [this].concat(args))), _this), _this.handleModeChange = function (e) {
      var mode = e.target.value;
      var router = _this.context.router;
      var _this$props = _this.props,
          location = _this$props.location,
          routeParams = _this$props.routeParams;
      var tag = routeParams.tag;

      router.push((0, _extends3.default)({}, location, {
        pathname: '/' + tag + '/browse' + (mode ? '/' + mode : '')
      }));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Browse, [{
    key: 'renderComponent',
    value: function renderComponent(name, mode, tag) {
      return _react2.default.createElement(
        'div',
        { className: 'component-section', key: name },
        _react2.default.createElement(_BrowseComponent2.default, { name: name, mode: mode, tag: tag })
      );
    }
  }, {
    key: 'renderContent',
    value: function renderContent(tag, mode) {
      var _this2 = this;

      var componentTag = _componentTags2.default.find(function (c) {
        return c.tag === tag;
      });
      return componentTag.components.map(function (c) {
        return _this2.renderComponent(c, mode, tag);
      });
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader(tag, mode) {
      return _react2.default.createElement(
        'div',
        { className: 'browse-header' },
        _react2.default.createElement(
          'h2',
          null,
          tag
        ),
        _react2.default.createElement(
          'div',
          { className: 'option-group' },
          _react2.default.createElement(
            'label',
            null,
            _react2.default.createElement('input', { type: 'radio', name: 'mode', checked: !mode, onChange: this.handleModeChange, value: '' }),
            'Story Mode'
          ),
          _react2.default.createElement(
            'label',
            null,
            _react2.default.createElement('input', { type: 'radio', name: 'mode', checked: mode === 'full', onChange: this.handleModeChange, value: 'full' }),
            'Full'
          )
        )
      );
    }
  }, {
    key: 'renderComponentBrowse',
    value: function renderComponentBrowse(component, tag) {
      return this.renderComponent(component, 'full', tag);
    }
  }, {
    key: 'render',
    value: function render() {
      var routeParams = this.props.routeParams;
      var tag = routeParams.tag,
          mode = routeParams.mode,
          component = routeParams.component;


      if (component) {
        return _react2.default.createElement(
          'div',
          { className: 'react-library-browse' },
          this.renderComponentBrowse(component, tag)
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'react-library-browse' },
        this.renderHeader(tag, mode),
        this.renderContent(tag, mode)
      );
    }
  }]);
  return Browse;
}(_react.Component);

Browse.propTypes = {
  location: _react.PropTypes.object,
  history: _react.PropTypes.object,
  routeParams: _react.PropTypes.shape({
    tag: _react.PropTypes.string,
    mode: _react.PropTypes.oneOf(['full'])
  })
};
Browse.contextTypes = {
  router: _react.PropTypes.object
};
exports.default = Browse;