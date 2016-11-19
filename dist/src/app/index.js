'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _history = require('./history');

var _history2 = _interopRequireDefault(_history);

var _config = require('build/config');

var _App = require('./components/App/App');

var _App2 = _interopRequireDefault(_App);

var _PageNotFound = require('./PageNotFound');

var _PageNotFound2 = _interopRequireDefault(_PageNotFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(
  _reactRouter.Router,
  { history: _history2.default },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '' },
    _config.pages ? _config.pages.map(function (page, i) {
      return _react2.default.cloneElement(page, { key: i, component: _App2.default, page: page.props.component });
    }) : null,
    _react2.default.createElement(_reactRouter.Route, { path: ':tag/browse', component: _App2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: ':tag/browse/:mode', component: _App2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: ':tag/:component', component: _App2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: ':tag/:component/:story', component: _App2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '*', component: _PageNotFound2.default })
  )
), document.getElementById('app'));