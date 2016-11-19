import * as docs from 'build/docs'
import * as components from 'build/components'

const deps = {
  by: {},
  on: {}
}

for (let key in docs) {
  const dep = docs[key].dependencies || []
  deps.on[key] = [...dep.filter(d => components[d]), ...dep.filter(d => !components[d])]
  dep
    .filter(d => !!components[d])
    .forEach(d => {
      deps.by[d] = deps.by[d] || []
      deps.by[d].push(key)
    })
}

export default deps
