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
Object.keys(tags).sort().forEach(tag => componentTags.push({ tag, components: tags[tag] }))

componentTags.forEach(componentTag => componentTag.components.sort())

export default componentTags
