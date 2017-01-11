import * as components from 'build/components'
import * as docs from 'build/docs'

//  Add components to 'All' category
const componentCategories = []
componentCategories.push({
  category: 'All',
  components: Object.keys(components)
})

//  Process component docs
const categories = {}
Object.keys(components).forEach(component => {
  const doc = docs[component]
  if (doc.categories) {
    doc.categories.forEach(category => {
      categories[category] = categories[category] || []
      categories[category].push(component)
    })
  }
})
Object.keys(categories).sort().forEach(category => componentCategories.push({ category, components: categories[category] }))

componentCategories.forEach(componentCategory => componentCategory.components.sort())

export default componentCategories
