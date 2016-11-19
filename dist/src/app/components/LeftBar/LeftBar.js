'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _config = require('build/config');

var _config2 = _interopRequireDefault(_config);

var _componentTags = require('../../componentTags');

var _componentTags2 = _interopRequireDefault(_componentTags);

var _searcher = require('../../searcher');

var _NavHeader = require('../NavHeader/NavHeader');

var _NavHeader2 = _interopRequireDefault(_NavHeader);

var _NavLink = require('../NavLink/NavLink');

var _NavLink2 = _interopRequireDefault(_NavLink);

require('./LeftBar.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeftBar = function (_Component) {
  (0, _inherits3.default)(LeftBar, _Component);

  function LeftBar(props) {
    (0, _classCallCheck3.default)(this, LeftBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LeftBar.__proto__ || (0, _getPrototypeOf2.default)(LeftBar)).call(this, props));

    _initialiseProps.call(_this);

    var search = props.location.query.search;
    var _props$routeParams = props.routeParams,
        tag = _props$routeParams.tag,
        component = _props$routeParams.component;

    var _this$getFilteredComp = _this.getFilteredComponents(search),
        resultsMap = _this$getFilteredComp.resultsMap,
        feelingLucky = _this$getFilteredComp.feelingLucky;

    _this.state = {
      expandedTag: (0, _defineProperty3.default)({}, tag, true),
      expandedTagComponent: (0, _defineProperty3.default)({}, tag + '_' + component, true),
      filteredComponents: resultsMap,
      feelingLucky: feelingLucky,
      search: search
    };
    return _this;
  }

  (0, _createClass3.default)(LeftBar, [{
    key: 'getSavedQuery',
    value: function getSavedQuery() {
      var _props$location$query = this.props.location.query,
          mode = _props$location$query.mode,
          theme = _props$location$query.theme,
          search = _props$location$query.search;

      return { mode: mode, theme: theme, search: search };
    }
  }, {
    key: 'getFilteredComponents',
    value: function getFilteredComponents(search) {
      if (!search) {
        return {};
      }
      var resultsMap = {};
      var results = _searcher.componentSearch.search(search);
      results.forEach(function (name) {
        return resultsMap[name] = true;
      });
      var feelingLucky = results[0];
      return { resultsMap: resultsMap, feelingLucky: feelingLucky };
    }
  }, {
    key: 'hasQueryProps',
    value: function hasQueryProps() {
      try {
        JSON.parse(this.props.location.query.props);
        return true;
      } catch (err) {}
      return false;
    }
  }, {
    key: 'hasStories',
    value: function hasStories(component) {
      return stories[component] && stories[component].stories && stories[component].stories.length;
    }
  }, {
    key: 'renderTagComponentStories',
    value: function renderTagComponentStories(tag, component, componentActive, query) {
      var _this2 = this;

      var componentDoc = docs[component];
      var activeStory = this.props.routeParams.story;
      var componentStories = stories[component];
      var output = [];
      if (componentStories) {
        output.push(_react2.default.createElement(
          _NavLink2.default,
          {
            className: 'story-link',
            to: {
              pathname: '/' + tag + '/' + component + '/browse'
            },
            key: 'browse2',
            active: activeStory === 'browse' && componentActive,
            activeHighlights: true },
          'Browse..'
        ));
        output = output.concat((componentStories.stories || []).map(function (story) {
          return _react2.default.createElement(
            _NavLink2.default,
            {
              className: 'story-link',
              to: {
                pathname: '/' + tag + '/' + component + '/' + story.title,
                query: query
              },
              key: story.title,
              active: activeStory === story.title && componentActive && !_this2.hasQueryProps(),
              activeHighlights: true },
            story.title
          );
        }));
      }

      if (componentDoc.hasDefault) {
        output.unshift(_react2.default.createElement(
          _NavLink2.default,
          {
            className: 'story-link',
            to: {
              pathname: '/' + tag + '/' + component,
              query: query
            },
            key: 'DEFAULT',
            active: !activeStory && componentActive,
            activeHighlights: true },
          'Default'
        ));
      }

      return _react2.default.createElement(
        'div',
        { key: 'stories' },
        output
      );
    }
  }, {
    key: 'renderTagComponent',
    value: function renderTagComponent(tag, component, query) {
      var hasStories = this.hasStories(component);
      var expanded = this.state.expandedTagComponent[tag + '_' + component];
      var active = this.props.routeParams.tag === tag && this.props.routeParams.component === component;
      var output = [];
      output.push(_react2.default.createElement(
        _NavLink2.default,
        {
          className: 'component-link',
          to: {
            pathname: '/' + tag + '/' + component,
            query: query
          },
          key: component,
          expandable: hasStories,
          expanded: expanded,
          active: active,
          activeHighlights: !hasStories,
          onExpandClick: this.handleComponentExpandClick.bind(null, tag, component),
          onClick: this.handleComponentClick.bind(null, tag, component) },
        component
      ));
      if (hasStories && expanded) {
        output.push(this.renderTagComponentStories(tag, component, active, query));
      }

      return _react2.default.createElement(
        'div',
        { key: tag + '_' + component },
        output
      );
    }
  }, {
    key: 'renderTag',
    value: function renderTag(tag, active, count) {
      return _react2.default.createElement(
        _NavLink2.default,
        {
          className: 'tag-link',
          expandable: true,
          expanded: active,
          key: tag,
          active: tag === this.props.routeParams.tag,
          onClick: this.handleTagClick.bind(null, tag) },
        tag,
        ' (',
        count,
        ')'
      );
    }
  }, {
    key: 'renderTagBrowse',
    value: function renderTagBrowse(tag) {
      var browse = this.props.browse;

      return _react2.default.createElement(
        _NavLink2.default,
        {
          className: 'component-link',
          key: tag + '_browse',
          active: tag === this.props.routeParams.tag && browse,
          to: '/' + tag + '/browse' },
        'Browse..'
      );
    }
  }, {
    key: 'renderTagSection',
    value: function renderTagSection(section, query) {
      var _this3 = this;

      var filteredComponents = this.state.filteredComponents;
      var tag = section.tag;
      var components = section.components;

      if (filteredComponents) {
        components = components.filter(function (name) {
          return filteredComponents[name];
        });
      }

      if (components.length === 0) {
        return null;
      }

      var active = this.state.expandedTag[tag];
      var output = [];
      if (active) {
        output.push(this.renderTagBrowse(tag));
        components.forEach(function (component) {
          return output.push(_this3.renderTagComponent(tag, component, query));
        });
      }
      output.unshift(this.renderTag(tag, active, components.length));

      return output;
    }
  }, {
    key: 'renderTags',
    value: function renderTags(query, search) {
      var _this4 = this;

      var output = [_react2.default.createElement(_NavHeader2.default, { key: 'componentTags', header: 'Components', className: 'bar-header' }), this.renderSearch(search)];
      output.push(_react2.default.createElement(
        'div',
        { className: 'react-library-left-bar-tags', key: 'bar-tags' },
        _componentTags2.default.map(function (section) {
          return _this4.renderTagSection(section, query);
        })
      ));

      return output;
    }
  }, {
    key: 'renderSearch',
    value: function renderSearch(search) {
      var clear = search ? _react2.default.createElement(
        'span',
        { className: 'clear-button', onClick: this.handleSearchClear },
        '\xD7'
      ) : null;
      return _react2.default.createElement(
        'div',
        { className: 'bar-search', key: 'search' },
        _react2.default.createElement('input', {
          onChange: this.handleSearchChange,
          onKeyPress: this.handleSearchPress,
          value: search || '',
          placeholder: 'Filter..' }),
        clear
      );
    }
  }, {
    key: 'renderStatic',
    value: function renderStatic() {
      var _this5 = this;

      var output = (_config.pages || []).map(function (page, i) {
        if (page.type === _NavHeader2.default) {
          return _react2.default.cloneElement(page, { key: 'page_' + i, className: 'bar-header' });
        } else {
          var path = page.props.path;
          var title = page.props.title;

          path = '/' + path;
          return _react2.default.createElement(
            _NavLink2.default,
            {
              className: 'page-link',
              key: 'page_' + i,
              active: path === _this5.props.location.pathname,
              activeHighlights: true,
              to: path },
            title
          );
        }
      });

      if (_config.pages && _config.pages[0] && _config.pages[0].type !== _NavHeader2.default) {
        output.unshift(_react2.default.createElement(_NavHeader2.default, { header: 'Pages', className: 'bar-header', key: 'page_default' }));
      }

      return output;
    }
  }, {
    key: 'render',
    value: function render() {
      var search = this.state.search;

      return _react2.default.createElement(
        'div',
        { className: 'react-library-left-bar' },
        _react2.default.createElement(
          'h1',
          { className: 'app-title' },
          _config2.default.title
        ),
        this.renderStatic(),
        this.renderTags(this.getSavedQuery(), search)
      );
    }
  }]);
  return LeftBar;
}(_react.Component);

LeftBar.propTypes = {
  location: _react.PropTypes.object,
  routeParams: _react.PropTypes.shape({
    tag: _react.PropTypes.string,
    component: _react.PropTypes.string,
    story: _react.PropTypes.string
  })
};
LeftBar.contextTypes = {
  router: _react.PropTypes.object
};

var _initialiseProps = function _initialiseProps() {
  var _this6 = this;

  this.handleTagClick = function (tag, e) {
    e.preventDefault();
    _this6.setState({
      expandedTag: (0, _extends5.default)({}, _this6.state.expandedTag, (0, _defineProperty3.default)({}, tag, !_this6.state.expandedTag[tag]))
    });
  };

  this.toggleExpandComponent = function (tag, component) {
    var key = tag + '_' + component;
    _this6.setState({
      expandedTagComponent: (0, _extends5.default)({}, _this6.state.expandedTagComponent, (0, _defineProperty3.default)({}, key, !_this6.state.expandedTagComponent[key]))
    });
  };

  this.handleComponentExpandClick = function (tag, component, e) {
    e.preventDefault();
    e.stopPropagation();
    _this6.toggleExpandComponent(tag, component);
  };

  this.handleComponentClick = function (tag, component, e) {
    _this6.toggleExpandComponent(tag, component);
  };

  this.setSearch = function (search) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

    var _getFilteredComponent = _this6.getFilteredComponents(search),
        resultsMap = _getFilteredComponent.resultsMap,
        feelingLucky = _getFilteredComponent.feelingLucky;

    _this6.setState({
      filteredComponents: resultsMap,
      feelingLucky: feelingLucky,
      search: search
    });

    clearTimeout(_this6._searchQueryTimer);
    _this6._searchQueryTimer = setTimeout(function () {
      var location = _this6.props.location;
      var router = _this6.context.router;

      router.push((0, _extends5.default)({}, location, {
        query: (0, _extends5.default)({}, location.query, {
          search: search || undefined
        })
      }));
    }, delay);
  };

  this.handleSearchChange = function (e) {
    _this6.setSearch(e.target.value);
  };

  this.handleSearchClear = function (e) {
    _this6.setSearch(undefined, 0);
  };

  this.handleSearchPress = function (e) {
    //  Feeling lucky
    if (e.key === 'Enter' && e.target.value) {
      (function () {
        var _props$routeParams2 = _this6.props.routeParams,
            tag = _props$routeParams2.tag,
            component = _props$routeParams2.component;
        var _state = _this6.state,
            filteredComponents = _state.filteredComponents,
            feelingLucky = _state.feelingLucky;

        if (!filteredComponents[component] && feelingLucky) {
          //  If current component is not a result
          var componentTag = _componentTags2.default.find(function (x) {
            return x.tag === tag;
          });
          var tagHasComponent = componentTag && componentTag.components.indexOf(feelingLucky) > -1;
          var nextTag = tagHasComponent ? tag : 'All';
          var router = _this6.context.router;

          router.push({
            pathname: '/' + nextTag + '/' + feelingLucky,
            query: _this6.getSavedQuery()
          });
        }
      })();
    }
  };
};

exports.default = LeftBar;