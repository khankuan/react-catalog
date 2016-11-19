import * as components from 'build/components'
import * as docs from 'build/docs'

//  Add components to 'All' tag
const componentTags = []
componentTags.push({
  tag: 'All',
  components: Object.keys(components)
})

//  Process component docs
const tags = {}
Object.keys(components).forEach(component => {
  const doc = docs[component]
  if (doc.tags) {
    doc.tags.forEach(tag => {
      tags[tag] = tags[tag] || []
      tags[tag].push(component)
    })
  }
})
for (let key in tags) {
  componentTags.push({ tag: key, components: tags[key] })
}

componentTags.forEach(componentTag => componentTag.components.sort())

export default componentTags
