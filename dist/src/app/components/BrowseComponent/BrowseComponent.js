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

var _docs = require('build/docs');

var docs = _interopRequireWildcard(_docs);

var _stories = require('build/stories');

var stories = _interopRequireWildcard(_stories);

var _components = require('build/components');

var components = _interopRequireWildcard(_components);

var _reactRouter = require('react-router');

var _RenderSafe = require('../RenderSafe/RenderSafe');

var _RenderSafe2 = _interopRequireDefault(_RenderSafe);

var _BrowseComponentSequence = require('../BrowseComponentSequence/BrowseComponentSequence');

var _BrowseComponentSequence2 = _interopRequireDefault(_BrowseComponentSequence);

require('./BrowseComponent.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowseComponent = function (_Component) {
  (0, _inherits3.default)(BrowseComponent, _Component);

  function BrowseComponent(props) {
    (0, _classCallCheck3.default)(this, BrowseComponent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BrowseComponent.__proto__ || (0, _getPrototypeOf2.default)(BrowseComponent)).call(this, props));

    _this.handleStoryChange = function (e) {
      _this.setState({
        selectedStory: e.target.value,
        stepIndex: 0
      });
    };

    var selectedStory = void 0;
    var doc = docs[props.name];
    var story = stories[props.name];
    if (props.story) {
      selectedStory = props.story;
    } else if (doc.hasDefault) {
      selectedStory = '';
    } else if (story && story.stories[0]) {
      selectedStory = story.stories[0].title;
    }
    _this.state = {
      selectedStory: selectedStory
    };
    return _this;
  }

  (0, _createClass3.default)(BrowseComponent, [{
    key: 'renderStoryOutput',
    value: function renderStoryOutput(name, story) {
      var output = void 0;
      if (story.sequence) {
        output = _react2.default.createElement(_BrowseComponentSequence2.default, { className: 'component-sequence', story: story, component: name });
      } else if (_react2.default.isValidElement(story.content)) {
        output = story.content;
      } else {
        var _Component2 = components[name];
        output = _react2.default.createElement(
          _RenderSafe2.default,
          null,
          _react2.default.createElement(_Component2, story.content)
        );
      }
      return output;
    }
  }, {
    key: 'renderStory',
    value: function renderStory(tag, name, story, showName) {
      var output = this.renderStoryOutput(name, story);
      return _react2.default.createElement(
        'div',
        { key: story.title, className: 'component-content-story', id: story.title },
        showName ? _react2.default.createElement(
          'h5',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { className: 'component-link', to: '/' + tag + '/' + name + '/' + story.title },
            story.title
          )
        ) : null,
        _react2.default.createElement(
          'div',
          { className: 'component-output' },
          output
        )
      );
    }
  }, {
    key: 'renderDefault',
    value: function renderDefault(tag, name, showName) {
      var Component = components[name];
      return _react2.default.createElement(
        'div',
        { key: 'default', className: 'component-content-story' },
        showName ? _react2.default.createElement(
          'h5',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { className: 'component-link', to: '/' + tag + '/' + name },
            'Default'
          )
        ) : null,
        _react2.default.createElement(
          'div',
          { className: 'component-output' },
          _react2.default.createElement(
            _RenderSafe2.default,
            null,
            _react2.default.createElement(Component, { key: 'default' })
          )
        )
      );
    }
  }, {
    key: 'renderContent',
    value: function renderContent(tag, name, mode, activeStory) {
      var _this2 = this;

      var output = [];
      var doc = docs[name];
      var story = stories[name];
      if (!mode || activeStory && activeStory !== 'browse') {
        (function () {
          var selectedStory = _this2.state.selectedStory;
          if (selectedStory) {
            var s = story.stories.find(function (s) {
              return s.title === selectedStory;
            });
            output.push(_this2.renderStory(tag, name, s));
          } else if (doc.hasDefault) {
            output.push(_this2.renderDefault(tag, name));
          }
        })();
      } else {
        if (doc.hasDefault) {
          output.push(this.renderDefault(tag, name, true));
        }
        if (story && story.stories) {
          story.stories.forEach(function (s) {
            output.push(_this2.renderStory(tag, name, s, true));
          });
        }
      }

      if (output.length === 0) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: 'component-content' },
        output
      );
    }
  }, {
    key: 'renderStorySelect',
    value: function renderStorySelect(name) {
      var story = stories[name];
      var doc = docs[name];
      if (story && story.stories && story.stories.length) {
        var selectedStory = this.state.selectedStory;

        return _react2.default.createElement(
          'select',
          { value: selectedStory, onChange: this.handleStoryChange },
          doc.hasDefault ? _react2.default.createElement(
            'option',
            { value: '', key: 'default' },
            'Default'
          ) : null,
          story.stories.map(function (s) {
            return _react2.default.createElement(
              'option',
              { value: s.title, key: s.title },
              s.title
            );
          })
        );
      }
    }
  }, {
    key: 'renderEmpty',
    value: function renderEmpty() {
      return _react2.default.createElement(
        'div',
        { className: 'content-empty' },
        'Default is not available and component does not has any stories.'
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          mode = _props.mode,
          tag = _props.tag,
          story = _props.story;

      var content = this.renderContent(tag, name, mode, story);
      return _react2.default.createElement(
        'div',
        { className: 'react-library-browse-component' },
        _react2.default.createElement(
          'h4',
          { className: 'component-header' },
          _react2.default.createElement(
            _reactRouter.Link,
            { className: 'component-link', to: '/' + tag + '/' + name },
            name
          ),
          !mode && !story ? this.renderStorySelect(name) : null
        ),
        content || this.renderEmpty()
      );
    }
  }]);
  return BrowseComponent;
}(_react.Component);

BrowseComponent.propTypes = {
  name: _react.PropTypes.string,
  mode: _react.PropTypes.string,
  tag: _react.PropTypes.string,
  story: _react.PropTypes.string
};
exports.default = BrowseComponent;