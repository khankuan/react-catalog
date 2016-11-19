'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _docs = require('build/docs');

var docs = _interopRequireWildcard(_docs);

var _components = require('build/components');

var components = _interopRequireWildcard(_components);

var _dependencies = require('../../dependencies');

var _dependencies2 = _interopRequireDefault(_dependencies);

var _componentTags = require('../../componentTags');

var _componentTags2 = _interopRequireDefault(_componentTags);

var _DocumentationTable = require('../DocumentationTable/DocumentationTable');

var _DocumentationTable2 = _interopRequireDefault(_DocumentationTable);

var _NavLink = require('../NavLink/NavLink');

var _NavLink2 = _interopRequireDefault(_NavLink);

require('./RightBar.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RightBar = function (_Component) {
  (0, _inherits3.default)(RightBar, _Component);

  function RightBar() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RightBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RightBar.__proto__ || (0, _getPrototypeOf2.default)(RightBar)).call.apply(_ref, [this].concat(args))), _this), _this.handlePropsChange = function (key, value) {
      var router = _this.context.router;
      var location = _this.props.location;
      var queryProps = _this.props.queryProps;

      var query = location.query;
      if (value === undefined) {
        if (queryProps) {
          delete queryProps[key];
        }
      } else {
        if (!queryProps) {
          queryProps = {};
        }
        queryProps[key] = value;
      }

      if (queryProps && (0, _keys2.default)(queryProps).length > 0) {
        query.props = (0, _stringify2.default)(queryProps);
      } else {
        delete query.props;
      }

      router.push((0, _extends3.default)({}, location, {
        query: query
      }));
    }, _this.renderLink = function (name) {
      if (!components[name]) {
        return _react2.default.createElement(
          'span',
          { className: 'dependency', key: name },
          name
        );
      }
      var tag = _this.props.routeParams.tag;

      var componentTag = _componentTags2.default.find(function (x) {
        return x.tag === tag;
      });
      var tagHasComponent = componentTag.components.indexOf(name) > -1;
      return _react2.default.createElement(
        _NavLink2.default,
        {
          key: name,
          active: true,
          className: 'dependency',
          to: '/' + (tagHasComponent ? tag : 'All') + '/' + name },
        name
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RightBar, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.error) {
        return false;
      }
      return true;
    }
  }, {
    key: 'renderTable',
    value: function renderTable() {
      var _props = this.props,
          renderProps = _props.renderProps,
          routeParams = _props.routeParams,
          disabled = _props.disabled;
      var component = routeParams.component;

      return _react2.default.createElement(_DocumentationTable2.default, {
        schema: docs[component].props,
        renderProps: renderProps,
        onPropsChange: this.handlePropsChange,
        disabled: disabled });
    }
  }, {
    key: 'renderDependenciesRow',
    value: function renderDependenciesRow(type, names) {
      if (names.length === 0) {
        return null;
      }
      return _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          { className: 'table-type' },
          type,
          ':'
        ),
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(
            'div',
            { className: 'table-names' },
            names.map(this.renderLink)
          )
        )
      );
    }
  }, {
    key: 'renderDependencies',
    value: function renderDependencies() {
      var component = this.props.routeParams.component;

      var on = _dependencies2.default.on[component] || [];
      var by = _dependencies2.default.by[component] || [];
      if (on.length === 0 && by.length === 0) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h4',
          { className: 'bar-header' },
          'Dependencies'
        ),
        _react2.default.createElement(
          'table',
          { className: 'react-library-dependency' },
          _react2.default.createElement(
            'tbody',
            null,
            this.renderDependenciesRow('Uses', on),
            this.renderDependenciesRow('Used by', by)
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var error = this.props.error;


      return _react2.default.createElement(
        'div',
        { className: 'react-library-right-bar' },
        this.renderDependencies(),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            { className: 'bar-header' },
            'Properties'
          ),
          error ? null : this.renderTable()
        )
      );
    }
  }]);
  return RightBar;
}(_react.Component);

RightBar.propTypes = {
  location: _react.PropTypes.object,
  history: _react.PropTypes.object,
  routeParams: _react.PropTypes.shape({
    tag: _react.PropTypes.string,
    component: _react.PropTypes.string,
    story: _react.PropTypes.string
  }),
  component: _react.PropTypes.node,
  queryProps: _react.PropTypes.object,
  disabled: _react.PropTypes.bool
};
RightBar.contextTypes = {
  router: _react.PropTypes.object
};
exports.default = RightBar;