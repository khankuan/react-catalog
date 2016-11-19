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

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCodemirror = require('react-codemirror');

var _reactCodemirror2 = _interopRequireDefault(_reactCodemirror);

require('codemirror/mode/htmlmixed/htmlmixed');

require('codemirror/mode/jsx/jsx');

var _reactElementToJsxString = require('react-element-to-jsx-string');

var _reactElementToJsxString2 = _interopRequireDefault(_reactElementToJsxString);

var _components = require('build/components');

var components = _interopRequireWildcard(_components);

var _RoundButton = require('../RoundButton/RoundButton');

var _RoundButton2 = _interopRequireDefault(_RoundButton);

var _RenderSafe = require('../RenderSafe/RenderSafe');

var _RenderSafe2 = _interopRequireDefault(_RenderSafe);

var _Sequencer = require('../Sequencer/Sequencer');

var _Sequencer2 = _interopRequireDefault(_Sequencer);

require('codemirror/lib/codemirror.css');

require('codemirror/theme/material.css');

require('./Previewer.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var beautifyHtml = require('js-beautify').html;


var modes = ['react', 'jsx', 'html'];
var themes = ['checker', 'dark', 'light'];

var Previewer = function (_Component) {
  (0, _inherits3.default)(Previewer, _Component);

  function Previewer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Previewer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Previewer.__proto__ || (0, _getPrototypeOf2.default)(Previewer)).call.apply(_ref, [this].concat(args))), _this), _this.handleModeClick = function () {
      var nextMode = modes[(modes.indexOf(_this.props.mode) + 1) % modes.length];
      _this.props.onModeChange(nextMode === modes[0] ? undefined : nextMode);
    }, _this.handleThemeClick = function () {
      var nextTheme = themes[(themes.indexOf(_this.props.theme) + 1) % themes.length];
      _this.props.onThemeChange(nextTheme === themes[0] ? undefined : nextTheme);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Previewer, [{
    key: 'renderHtml',
    value: function renderHtml(component) {
      var theme = this.props.theme;

      var htmlString = _server2.default.renderToString(component).replace(/ data-reactid="[^"]*"/ig, '').replace(/ data-react-checksum="[^"]*"/ig, '').replace(/ data-reactroot="[^"]*"/ig, '').replace(/<noscript><\/noscript>/g, '');

      return _react2.default.createElement(_reactCodemirror2.default, {
        className: 'previewer-html',
        value: beautifyHtml(htmlString, { indent_size: 2, unformatted: [] }),
        options: {
          mode: 'htmlmixed',
          theme: theme === 'dark' ? 'material' : 'default',
          readOnly: true,
          lineWrapping: true
        }
      });
    }
  }, {
    key: 'renderJSX',
    value: function renderJSX(component) {
      var theme = this.props.theme;

      return _react2.default.createElement(_reactCodemirror2.default, {
        key: 'code',
        className: 'previewer-jsx',
        value: (0, _reactElementToJsxString2.default)(component),
        options: {
          mode: 'jsx',
          theme: theme === 'dark' ? 'material' : 'default',
          readOnly: true,
          lineWrapping: true
        }
      });
    }
  }, {
    key: 'renderSequenceSource',
    value: function renderSequenceSource() {
      var _props = this.props,
          component = _props.component,
          mode = _props.mode,
          renderProps = _props.renderProps;

      var output = void 0;
      if (renderProps) {
        var _Component2 = components[component.props.component];
        var sequenceComponent = _react2.default.createElement(_Component2, renderProps);
        if (mode === 'html') {
          output = this.renderHtml(sequenceComponent);
        } else if (mode === 'jsx') {
          output = this.renderJSX(sequenceComponent);
        }
      }

      return _react2.default.createElement(
        'div',
        { key: 'source' },
        output
      );
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      var _props2 = this.props,
          component = _props2.component,
          mode = _props2.mode;

      var style = {};
      if (mode !== 'react') {
        style.display = 'none';
      }
      return _react2.default.cloneElement(component, {
        style: (0, _extends3.default)({}, component.props.style, {
          display: mode !== 'react' ? 'none' : undefined
        })
      });
    }
  }, {
    key: 'renderComponentSource',
    value: function renderComponentSource() {
      var _props3 = this.props,
          component = _props3.component,
          mode = _props3.mode;

      if (mode === 'react') {
        return null;
      } else if (component.type === _Sequencer2.default) {
        return this.renderSequenceSource();
      } else if (mode === 'html') {
        return this.renderHtml(component);
      } else if (mode === 'jsx') {
        return this.renderJSX(component);
      } else {
        throw new Error('Invalid Mode');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          theme = _props4.theme,
          className = _props4.className;

      var buttonTheme = theme === 'dark' ? 'light' : 'dark';
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('react-library-previewer', 'theme-' + theme, className) },
        _react2.default.createElement(
          _RenderSafe2.default,
          null,
          this.renderComponent()
        ),
        _react2.default.createElement(
          _RenderSafe2.default,
          null,
          this.renderComponentSource()
        ),
        _react2.default.createElement(
          'div',
          { className: 'previewer-controls' },
          _react2.default.createElement(
            _RoundButton2.default,
            { theme: buttonTheme, onClick: this.handleModeClick },
            '</>'
          ),
          _react2.default.createElement(
            _RoundButton2.default,
            { theme: buttonTheme, onClick: this.handleThemeClick },
            'B/W'
          )
        )
      );
    }
  }]);
  return Previewer;
}(_react.Component);

Previewer.propTypes = {
  component: _react.PropTypes.node,
  renderProps: _react.PropTypes.object,
  className: _react.PropTypes.string,
  mode: _react.PropTypes.oneOf(modes),
  theme: _react.PropTypes.oneOf(themes),
  onModeChange: _react.PropTypes.func.isRequired,
  onThemeChange: _react.PropTypes.func.isRequired
};
Previewer.defaultProps = {
  mode: modes[0],
  theme: themes[0]
};
exports.default = Previewer;