'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveToIdentifier;

var _reactDocgen = require('react-docgen');

var _recast = require('recast');

var _recast2 = _interopRequireDefault(_recast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var match = _reactDocgen.utils.match,
    resolveToValue = _reactDocgen.utils.resolveToValue; /*
                                                         * Based on unmerged PR: https://github.com/khankuan/react-docgen/blob/feature/dependencies/src/utils/resolveToModule.js
                                                         */

var types = _recast2.default.types.namedTypes;

/**
 * Given a path (e.g. call expression, member expression or identifier),
 * this function tries to find the name of module from which the "root value"
 * was imported.
 */

function resolveToIdentifier(path, name) {
  name = name || path.value.name;
  var node = path.node;
  switch (node.type) {
    case types.VariableDeclarator.name:
      if (node.init) {
        return resolveToIdentifier(path.get('init'), name);
      }
      break;
    case types.CallExpression.name:
      if (match(node.callee, { type: types.Identifier.name, name: 'require' })) {
        if (path.parentPath.value.id) {
          return path.parentPath.value.id.name;
        }
        if (path.parentPath.value.property) {
          return path.parentPath.value.property.name;
        }
      }
      return resolveToIdentifier(path.get('callee'), name);
    case types.Identifier.name:
    case types.JSXIdentifier.name:
      var valuePath = resolveToValue(path);
      if (valuePath !== path) {
        return resolveToIdentifier(valuePath, name);
      }
      break;
    case types.ImportDeclaration.name:
      var specifier = node.specifiers.find(function (specifier) {
        return specifier.local.name === name;
      });
      if (specifier === -1) {
        specifier = node.specifiers[0];
      }
      return (specifier.imported || specifier.local).name;
    case types.MemberExpression.name:
      while (path && types.MemberExpression.check(path.node)) {
        path = path.get('object');
      }
      if (path) {
        return resolveToIdentifier(path, name);
      }
  }
  return node.name;
}