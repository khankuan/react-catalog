'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = componentDependencyHandler;

var _recast = require('recast');

var _recast2 = _interopRequireDefault(_recast);

var _resolveToIdentifier = require('./resolveToIdentifier');

var _resolveToIdentifier2 = _interopRequireDefault(_resolveToIdentifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var types = _recast2.default.types.namedTypes;

/**
 * It resolves the path to its module name and adds it to the "dependencies" entry
 * in the documentation.
 */

function addDependencies(documentation, paths, variableDeclarations, jsx) {
  var dependencies = {};
  paths.map(function (path) {
    var value = path.value;

    var moduleName = (0, _resolveToIdentifier2.default)(path);
    //  If module is a declaration, ignore them
    //  If path is jsx, assume module is jsx
    if (moduleName) {
      if (!variableDeclarations[moduleName] && jsx[value]) {
        return moduleName;
      }
    } else {
      //  Native tags
      if (typeof value !== 'string' && value.value) {
        return value.value;
      }
    }
  }).filter(function (p) {
    return !!p;
  }).forEach(function (p) {
    return dependencies[p] = true;
  });

  documentation.set('dependencies', (0, _keys2.default)(dependencies));
}

function componentDependencyHandler(documentation, path) {
  var identifiers = [];
  var jsx = {};
  var variableDeclarations = {};
  _recast2.default.visit(path.parentPath.parentPath, {
    visitNode: function visitNode(path) {
      if (path.get('type').value === 'VariableDeclaration') {
        path.get('declarations').value.forEach(function (node) {
          variableDeclarations[node.id.name] = true;
        });
      }
      this.traverse(path);
    },
    visitIdentifier: function visitIdentifier(path) {
      var componentPath;
      if (path.get('type').value === 'JSXIdentifier' && path.parentPath.get('type').value !== 'JSXAttribute') {
        componentPath = path.get('name');
        jsx[componentPath.value] = true;
      } else if (path.get('name').value === 'createElement') {
        //  Get first argument in React.createElement
        componentPath = path.parentPath.parentPath.get('arguments').get(0);
        jsx[componentPath.value] = true;
      } else if (path.get('type').value === 'Identifier') {
        componentPath = path.get('name');
      }

      if (componentPath) {
        identifiers.push(componentPath);
      }
      this.traverse(path);
    }
  });
  addDependencies(documentation, identifiers, variableDeclarations, jsx);
}