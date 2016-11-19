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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./DocumentationTable.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DocumentationTable = function (_Component) {
  (0, _inherits3.default)(DocumentationTable, _Component);

  function DocumentationTable() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DocumentationTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DocumentationTable.__proto__ || (0, _getPrototypeOf2.default)(DocumentationTable)).call.apply(_ref, [this].concat(args))), _this), _this.handleNumberChange = function (key, e) {
      if (!isNaN(e.target.value)) {
        _this.handleChange(key, parseInt(e.target.value));
      }
    }, _this.handleStringChange = function (key, e) {
      _this.handleChange(key, e.target.value);
    }, _this.handleChange = function (key, value) {
      if (_this.props.onPropsChange) {
        var schema = _this.props.schema;

        try {
          // Set to undefined if value is default
          value = value === schema[key].defaultValue.value ? undefined : value;
        } catch (err) {}
        _this.props.onPropsChange(key, value);
      }
    }, _this.isChangeable = function (key) {
      return key.indexOf('[]') === -1;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  //  If its array, we can't change because we don't know which index to change


  (0, _createClass3.default)(DocumentationTable, [{
    key: 'getValueForKey',


    //   Get value in props given a dotted key (eg, user.avatar.url)
    value: function getValueForKey(key) {
      var keys = key.split('.');
      var curProps = this.props.renderProps;
      if (!curProps) {
        return;
      }
      for (var i = 0; i < keys.length; i++) {
        if (curProps[keys[i]]) {
          curProps = curProps[keys[i]];
        } else {
          return;
        }
      }
      return curProps;
    }

    //  Make new props given a dotted key (eg, user.avatar.url) and a new value

  }, {
    key: 'mergeValueToKey',
    value: function mergeValueToKey(key, value) {
      var curProps = (0, _extends3.default)({}, this.props.renderProps);
      var keys = key.split('.');
      var prop = curProps;
      for (var i = 0; i < keys.length - 1; i++) {
        prop[keys[i]] = (0, _extends3.default)({}, prop[keys[i]] || {}); //  clone the sub object
        prop = prop[keys[i]];
      }
      prop[keys[keys.length - 1]] = value;
      return curProps;
    }

    //  Flatten prop for shapes

  }, {
    key: 'getRowsForProp',
    value: function getRowsForProp() {
      var _this2 = this;

      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var prop = arguments[1];

      //  Patch gendoc that did not have a consistent schema
      if (prop.name && !prop.type) {
        prop.type = { name: prop.name, value: prop.value };
      }

      if (!prop.type) {
        return [];
      }

      if (prop.type.name === 'arrayOf') {
        prop = prop.type.value || prop.value;
        return this.getRowsForProp(key + '[]', prop);
      }

      if (prop.type.name !== 'shape') {
        return [{ key: key, prop: prop }];
      } else {
        var _ret2 = function () {
          var props = prop.type.value;
          if (!props) {
            return {
              v: []
            };
          }
          var rows = [{ key: key, prop: prop }];
          (0, _keys2.default)(props).forEach(function (subKey) {
            var prefixKey = (key ? key + '.' : '') + subKey;
            rows = rows.concat(_this2.getRowsForProp(prefixKey, props[subKey]));
          });
          return {
            v: rows
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret2)) === "object") return _ret2.v;
      }
    }

    //  split key to get prefix (before last dot) and actual key name

  }, {
    key: 'splitKey',
    value: function splitKey(key) {
      var index = key.lastIndexOf('.');
      if (index === -1) {
        return { key: key, prefix: '' };
      } else {
        return { key: key.substring(index + 1), prefix: key.substring(0, index + 1) };
      }
    }
  }, {
    key: 'renderForBoolean',
    value: function renderForBoolean(key, changable, disabled) {
      if (!changable) {
        return null;
      }

      var checked = this.getValueForKey(key) || false;
      return _react2.default.createElement('input', {
        className: 'type-bool',
        type: 'checkbox',
        onChange: this.handleChange.bind(null, key, !checked),
        checked: checked,
        disabled: disabled });
    }
  }, {
    key: 'renderForNumber',
    value: function renderForNumber(key, changable, disabled) {
      if (!changable) {
        return null;
      }

      var value = parseFloat(this.getValueForKey(key) || 0);
      return _react2.default.createElement('input', {
        className: 'type-number',
        type: 'number',
        onChange: this.handleNumberChange.bind(null, key),
        value: value,
        disabled: disabled });
    }
  }, {
    key: 'renderForString',
    value: function renderForString(key, changable, disabled) {
      if (!changable) {
        return null;
      }

      var value = this.getValueForKey(key) || '';
      return _react2.default.createElement('input', {
        className: 'type-string',
        onChange: this.handleStringChange.bind(null, key),
        value: value,
        disabled: disabled });
    }
  }, {
    key: 'renderForOneOf',
    value: function renderForOneOf(key, values, changable, disabled) {
      var _this3 = this;

      var curValue = this.getValueForKey(key);
      var items = values.map(function (v) {
        return v.value;
      }).map(function (value) {
        if (!isNaN(value)) {
          value = parseFloat(value);
        }
        if (typeof value === 'string' && value[0] === "'" && value[value.length - 1] === "'") {
          value = value.substring(1, value.length - 1);
        }
        return _react2.default.createElement(
          'span',
          {
            key: value,
            className: (0, _classnames2.default)('type-value', { active: curValue == value, changable: changable }),
            onClick: changable && !disabled ? _this3.handleChange.bind(null, key, value) : null },
          value
        );
      });

      return _react2.default.createElement(
        'span',
        { className: 'type-oneof' },
        items
      );
    }
  }, {
    key: 'renderTable',
    value: function renderTable(schema) {
      var _this4 = this;

      var disabled = this.props.disabled;

      var rows = this.getRowsForProp('', { type: { name: 'shape', value: schema } }).slice(1);
      return rows.map(function (row, i) {
        var prop = row.prop;
        var key = _this4.splitKey(row.key);
        var defaultValue = prop.defaultValue ? prop.defaultValue.value : null;

        //  For string values, gendoc gives quotes '', we need to remove them
        var type = prop.type.name;
        if (defaultValue === 'null') {
          defaultValue = null;
        }
        if (type === 'bool') {
          defaultValue = !!defaultValue;
        }
        if (typeof defaultValue === 'string' && defaultValue[0] === "'" && defaultValue[defaultValue.length - 1] === "'") {
          defaultValue = defaultValue.substring(1, defaultValue.length - 1);
        }
        if (type === 'enum') {
          //  rename for the stake of less confusion
          type = 'oneOf';
        }

        var changable = _this4.isChangeable(row.key);

        return _react2.default.createElement(
          'tr',
          { key: row.key, className: (0, _classnames2.default)({ alt: i % 2 }) },
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(
              'span',
              { className: 'type-prefix' },
              key.prefix
            ),
            _react2.default.createElement(
              'span',
              null,
              key.key
            ),
            prop.array ? '[]' : null,
            prop.required ? ' *' : null
          ),
          _react2.default.createElement(
            'td',
            {
              onClick: _this4.handleChange.bind(null, row.key, defaultValue) },
            _react2.default.createElement(
              'span',
              { className: (0, _classnames2.default)('type-value changable', { active: _this4.getValueForKey(row.key) == defaultValue }) },
              defaultValue
            )
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(
              'span',
              { className: 'field-type' },
              type
            ),
            type === 'number' ? _this4.renderForNumber(row.key, changable, disabled) : null,
            type === 'string' ? _this4.renderForString(row.key, changable, disabled) : null,
            type === 'bool' ? _this4.renderForBoolean(row.key, changable, disabled) : null,
            type === 'oneOf' ? _this4.renderForOneOf(row.key, prop.type.value, changable, disabled) : null
          ),
          _react2.default.createElement(
            'td',
            { className: 'field-description' },
            prop.description ? _react2.default.createElement(
              'span',
              { title: prop.description },
              '?'
            ) : null
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var schema = this.props.schema;


      return _react2.default.createElement(
        'div',
        { className: 'react-library-documentation-table' },
        _react2.default.createElement(
          'table',
          null,
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                null,
                'Name'
              ),
              _react2.default.createElement(
                'td',
                null,
                'Default'
              ),
              _react2.default.createElement(
                'td',
                null,
                'Type'
              ),
              _react2.default.createElement('td', null)
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            this.renderTable(schema)
          )
        )
      );
    }
  }]);
  return DocumentationTable;
}(_react.Component);

DocumentationTable.propTypes = {
  schema: _react.PropTypes.object,
  renderProps: _react.PropTypes.object,
  onPropsChange: _react.PropTypes.func,
  disabled: _react.PropTypes.bool
};
exports.default = DocumentationTable;