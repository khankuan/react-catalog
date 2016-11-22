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

var _reactDocumentTitle = require('react-document-title');

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _docs = require('build/docs');

var docs = _interopRequireWildcard(_docs);

var _stories = require('build/stories');

var stories = _interopRequireWildcard(_stories);

require('./Main.css');

var _Markdown = require('../Markdown/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Previewer = require('../Previewer/Previewer');

var _Previewer2 = _interopRequireDefault(_Previewer);

var _NavLink = require('../NavLink/NavLink');

var _NavLink2 = _interopRequireDefault(_NavLink);

var _SequenceControls = require('../SequenceControls/SequenceControls');

var _SequenceControls2 = _interopRequireDefault(_SequenceControls);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = function (_Component) {
  (0, _inherits3.default)(Main, _Component);

  function Main() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Main);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Main.__proto__ || (0, _getPrototypeOf2.default)(Main)).call.apply(_ref, [this].concat(args))), _this), _this.formatText = function (text) {
      return text.split('\n').map(function (t, i) {
        return _react2.default.createElement(_Markdown2.default, { className: 'header-description', key: i, source: t });
      });
    }, _this.handleQueryChange = function (query) {
      var router = _this.context.router;
      var location = _this.props.location;

      router.push((0, _extends3.default)({}, location, {
        query: query
      }));
    }, _this.handleModeChange = function (mode) {
      var query = (0, _extends3.default)({}, _this.props.location.query);
      query.mode = mode;
      _this.handleQueryChange(query);
    }, _this.handleThemeChange = function (theme) {
      var query = (0, _extends3.default)({}, _this.props.location.query);
      query.theme = theme;
      _this.handleQueryChange(query);
    }, _this.handleSequenceChange = function (i) {
      var query = (0, _extends3.default)({}, _this.props.location.query);
      if (i === 0) {
        delete query.sequence;
      } else {
        query.sequence = i + 1;
      }
      _this.handleQueryChange(query);
    }, _this.renderSequence = function (story) {
      var query = _this.props.location.query;

      var stepIndex = query.sequence ? parseInt(query.sequence) - 1 : 0;

      return _react2.default.createElement(_SequenceControls2.default, {
        story: story,
        stepIndex: stepIndex,
        onStepChange: _this.handleSequenceChange });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Main, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.checkForwardToStory(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.checkForwardToStory(nextProps);
    }

    //  Forward to a story if default is not available

  }, {
    key: 'checkForwardToStory',
    value: function checkForwardToStory(props) {
      var _props$routeParams = props.routeParams,
          component = _props$routeParams.component,
          story = _props$routeParams.story,
          tag = _props$routeParams.tag;
      var router = this.context.router;
      var location = props.location;

      var componentDoc = docs[component];
      if (!componentDoc) {
        return;
      }

      var componentStory = stories[component];
      if (!story && !componentDoc.hasDefault && componentStory && componentStory.stories.length) {
        var firstStory = componentStory.stories[0];
        router.replace((0, _extends3.default)({}, location, {
          pathname: '/' + tag + '/' + component + '/' + firstStory.title
        }));
      }
    }
  }, {
    key: 'renderStory',
    value: function renderStory(story) {
      if (story) {
        var description = story.description;
        var isSequence = !!story.sequence;
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h3',
            { className: 'story-title' },
            story.title
          ),
          isSequence ? this.renderSequence(story) : null,
          description
        );
      }
      return null;
    }
  }, {
    key: 'renderHeaderTags',
    value: function renderHeaderTags(componentDoc) {
      var _this2 = this;

      if (!componentDoc.tags) {
        return null;
      }

      var tags = componentDoc.tags.map(function (tag) {
        return _react2.default.createElement(
          _NavLink2.default,
          {
            className: 'tag-link',
            to: { pathname: '/' + tag + '/browse' },
            key: tag,
            active: tag === _this2.props.routeParams.tag },
          tag
        );
      });

      return _react2.default.createElement(
        'div',
        { className: 'header-tags' },
        tags
      );
    }
  }, {
    key: 'renderHeaderKeywords',
    value: function renderHeaderKeywords(componentDoc) {
      if (!componentDoc.keywords) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: 'header-keywords' },
        _react2.default.createElement(
          'em',
          null,
          componentDoc.keywords.join(', ')
        )
      );
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader(story) {
      var component = this.props.routeParams.component;

      var componentDoc = docs[component];
      var description = componentDoc ? componentDoc.description : null;
      return _react2.default.createElement(
        'div',
        { className: 'react-library-main-header' },
        _react2.default.createElement(
          'h2',
          { className: 'component-title' },
          component
        ),
        this.renderHeaderTags(componentDoc),
        this.renderHeaderKeywords(componentDoc),
        description ? this.formatText(description) : null,
        this.renderStory(story)
      );
    }
  }, {
    key: 'renderDefaultError',
    value: function renderDefaultError(component) {
      return _react2.default.createElement(
        'div',
        { className: 'default-error' },
        'Default is not available, component has required props.'
      );
    }
  }, {
    key: 'renderPreview',
    value: function renderPreview() {
      var _props = this.props,
          location = _props.location,
          component = _props.component,
          renderProps = _props.renderProps;
      var query = location.query;

      return _react2.default.createElement(_Previewer2.default, {
        className: 'previewer',
        component: component,
        renderProps: renderProps,
        mode: query.mode,
        theme: query.theme,
        onModeChange: this.handleModeChange,
        onThemeChange: this.handleThemeChange });
    }
  }, {
    key: 'render',
    value: function render() {
      var component = this.props.routeParams.component;
      var story = this.props.story;

      var doc = docs[component];
      if (!doc) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: 'react-library-main' },
        _react2.default.createElement(_reactDocumentTitle2.default, { title: '' + component + (story && story.title ? ' - ' + story.title : '') }),
        this.renderHeader(story),
        !story && !doc.hasDefault ? this.renderDefaultError(component) : this.renderPreview()
      );
    }
  }]);
  return Main;
}(_react.Component);

Main.propTypes = {
  location: _react.PropTypes.object,
  routeParams: _react.PropTypes.shape({
    tag: _react.PropTypes.string,
    component: _react.PropTypes.string,
    story: _react.PropTypes.string
  }),
  story: _react.PropTypes.shape({
    title: _react.PropTypes.string,
    content: _react.PropTypes.any,
    description: _react.PropTypes.string
  }),
  renderProps: _react.PropTypes.object
};
Main.contextTypes = {
  router: _react.PropTypes.object
};
exports.default = Main;