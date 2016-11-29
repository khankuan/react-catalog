'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasDefault;
function hasDefault(props) {
  for (var key in props) {
    if (props[key].type && props[key].type.name === 'shape' || !props[key].type && props[key].name === 'shape') {
      if (!hasDefault(props[key].type.value)) {
        return false;
      }
    }
    if (props[key].required && props[key].defaultValue === undefined) {
      return false;
    }
  }
  return true;
}