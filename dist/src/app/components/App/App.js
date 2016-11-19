'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _stories = require('build/stories');

var stories = _interopRequireWildcard(_stories);

var _components = require('build/components');

var components = _interopRequireWildcard(_components);

var _LeftBar = require('../LeftBar/LeftBar');

var _LeftBar2 = _interopRequireDefault(_LeftBar);

var _Main = require('../Main/Main');

var _Main2 = _interopRequireDefault(_Main);

var _RightBar = require('../RightBar/RightBar');

var _RightBar2 = _interopRequireDefault(_RightBar);

var _StaticPage = require('../StaticPage/StaticPage');

var _StaticPage2 = _interopRequireDefault(_StaticPage);

var _Browse = require('../Browse/Browse');

var _Browse2 = _interopRequireDefault(_Browse);

var _Sequencer = require('../Sequencer/Sequencer');

var _Sequencer2 = _interopRequireDefault(_Sequencer);

require('./App.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = App.__proto__ || (0, _getPrototypeOf2.default)(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentProps: null
    }, _this.handleSequencePropsChange = function (currentProps) {
      _this.setState({ currentProps: currentProps });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.redirectIfNotFound(this.props);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      this.redirectIfNotFound(nextProps);
    }
  }, {
    key: 'redirectIfNotFound',
    value: function redirectIfNotFound(props) {
      var route = props.route,
          routeParams = props.routeParams;
      var component = routeParams.component,
          story = routeParams.story,
          tag = routeParams.tag;

      var browse = tag && !component && !story;
      if (!route.page && !browse && story !== 'browse') {
        //  if component page
        if (!components[component]) {
          var router = this.context.router;

          router.push('');
        }
      }
      var componentStory = stories[component] && stories[component].stories.find(function (x) {
        return x.title === story;
      });
      if (componentStory && _react2.default.isValidElement(componentStory.content)) {
        var _router = this.context.router;

        _router.replace({
          pathname: '/' + tag + '/' + component + '/browse'
        });
      }
    }
  }, {
    key: 'getActiveStory',
    value: function getActiveStory(props) {
      var _props$routeParams = props.routeParams,
          component = _props$routeParams.component,
          story = _props$routeParams.story;

      if (story && stories[component] && stories[component].stories) {
        return stories[component].stories.find(function (item) {
          return item.title === story;
        });
      }
      return null;
    }
  }, {
    key: 'getQueryProps',
    value: function getQueryProps() {
      var query = this.props.location.query;

      try {
        return JSON.parse(query.props);
      } catch (err) {}
      return {};
    }
  }, {
    key: 'denormalizeProps',
    value: function denormalizeProps(props) {
      props = (0, _extends3.default)({}, props);
      (0, _keys2.default)(props).forEach(function (prop) {
        var value = props[prop];
        if (prop.indexOf('.') > -1) {
          (function () {
            delete props[prop];
            var keys = prop.split('.');
            var key = keys[keys.length - 1];
            var obj = props;
            keys.slice(0, -1).forEach(function (key) {
              obj[key] = obj[key] || {};
              obj = obj[key];
            });
            obj[key] = value;
          })();
        }
      });
      return props;
    }
  }, {
    key: 'renderNodeStoryComponent',
    value: function renderNodeStoryComponent(story, queryProps) {
      return _react2.default.cloneElement(story.content, queryProps);
    }
  }, {
    key: 'renderObjectStoryComponent',
    value: function renderObjectStoryComponent(story, queryProps) {
      var component = this.props.routeParams.component;

      var renderProps = (0, _extends3.default)({}, story ? story.content : {}, this.denormalizeProps(queryProps));

      var Comp = components[component];
      if (!Comp) {
        throw new Error('Component not available');
      }
      return _react2.default.createElement(Comp, renderProps);
    }
  }, {
    key: 'renderSequenceStoryComponent',
    value: function renderSequenceStoryComponent(story) {
      var query = this.props.location.query;
      var component = this.props.routeParams.component;

      return _react2.default.createElement(_Sequencer2.default, {
        component: component,
        story: story,
        stepIndex: parseInt(query.sequence || 1) - 1,
        onPropsChange: this.handleSequencePropsChange
      });
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent(story, queryProps) {
      if (!story || (0, _typeof3.default)(story.content) === 'object') {
        //  Default or Object story
        var component = this.renderObjectStoryComponent(story, queryProps);
        return { component: component, renderProps: component.props };
      } else if (_react2.default.isValidElement(story.content)) {
        //  Node story
        var _component = this.renderNodeStoryComponent(story, queryProps);
        return { component: _component, renderProps: _component.props };
      } else if (story.sequence) {
        //  sequence story
        var _component2 = this.renderSequenceStoryComponent(story);
        return { component: _component2, renderProps: this.state.currentProps };
      }
    }
  }, {
    key: 'renderContent',
    value: function renderContent(routeParams, location, browse) {
      var route = this.props.route;
      var story = routeParams.story;

      if (route.page) {
        return _react2.default.createElement(
          _StaticPage2.default,
          { className: route.className },
          route.page
        );
      } else if (browse || story === 'browse') {
        return _react2.default.createElement(_Browse2.default, {
          key: 'browse',
          routeParams: routeParams,
          location: location });
      } else {
        var _story = this.getActiveStory(this.props);
        var queryProps = this.getQueryProps();
        var error = void 0;
        var rendered = void 0,
            component = void 0,
            renderProps = void 0;
        try {
          rendered = this.renderComponent(_story, queryProps);
          component = rendered.component;
          renderProps = rendered.renderProps;
        } catch (err) {
          error = err;
        }

        return [_react2.default.createElement(_Main2.default, {
          key: 'main',
          routeParams: routeParams,
          location: location,
          component: component,
          renderProps: renderProps,
          story: _story,
          error: error }), _react2.default.createElement(_RightBar2.default, {
          key: 'rightBar',
          routeParams: routeParams,
          location: location,
          renderProps: renderProps,
          queryProps: queryProps,
          error: error,
          disabled: _story && _story.sequence })];
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          routeParams = _props.routeParams,
          location = _props.location;
      var tag = routeParams.tag,
          component = routeParams.component,
          story = routeParams.story;

      var browse = tag && !component && !story;
      return _react2.default.createElement(
        'div',
        { className: 'react-library-app' },
        _react2.default.createElement(_LeftBar2.default, { routeParams: routeParams, location: location, browse: browse }),
        this.renderContent(routeParams, location, browse)
      );
    }
  }]);
  return App;
}(_react.Component);

App.propTypes = {
  location: _react.PropTypes.object,
  routeParams: _react.PropTypes.shape({
    tag: _react.PropTypes.string,
    component: _react.PropTypes.string,
    story: _react.PropTypes.string
  })
};
App.contextTypes = {
  router: _react.PropTypes.object
};
exports.default = App;