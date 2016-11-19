export default function hasDefault (props) {
  for (let key in props) {
    if ((props[key].type && props[key].type.name === 'shape') ||
        (!props[key].type && props[key].name === 'shape')) {
      if (!hasDefault(props[key].type.value)) {
        return false
      }
    }
    if (props[key].required && props[key].defaultValue === undefined) {
      return false
    }
  }
  return true
}
