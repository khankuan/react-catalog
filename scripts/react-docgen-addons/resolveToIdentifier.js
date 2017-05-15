/*
 * Based on unmerged PR: https://github.com/khankuan/react-docgen/blob/feature/dependencies/src/utils/resolveToModule.js
 */

import { utils } from 'react-docgen'
const { match, resolveToValue } = utils
import recast from 'recast';

var {types: {namedTypes: types}} = recast;

/**
 * Given a path (e.g. call expression, member expression or identifier),
 * this function tries to find the name of module from which the "root value"
 * was imported.
 */
export default function resolveToIdentifier(path, name) {
  name = name || path.value.name
  var node = path.node;
  switch (node.type) {
    case types.VariableDeclarator.name:
      if (node.init) {
        return resolveToIdentifier(path.get('init'), name);
      }
      break;
    case types.CallExpression.name:
      if (match(node.callee, {type: types.Identifier.name, name: 'require'})) {
        if (path.parentPath.value.id) {
          return path.parentPath.value.id.name
        }
        if (path.parentPath.value.property) {
          return path.parentPath.value.property.name
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
      let specifier = node.specifiers.find(specifier => specifier.local.name === name)
      if (!specifier) {
        specifier = node.specifiers[0]
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
