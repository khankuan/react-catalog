import Fuse from 'fuse.js'

import * as docs from 'build/docs'
import * as components from 'build/components'
import * as stories from 'build/stories'

const componentObjs = Object.keys(components).map(name => {
  const doc = docs[name]
  return {
    name,
    nameText: name.replace(/([A-Z])/g, ' $1').trim(),  //  Make camel case searchable
    description: doc ? doc.description : '',
    categories: doc ? doc.categories : null,
    tags: doc ? doc.tags : null,
    stories: stories[name] ? stories[name].stories : null
  }
})

export const componentSearch = new Fuse(componentObjs, {
  keys: [{
    name: 'nameText',
    weight: 1
  }, {
    name: 'categories',
    weight: 1
  }, {
    name: 'description',
    weight: 0.3
  }, {
    name: 'tags',
    weight: 1
  }, {
    name: 'stories.title',
    weight: 1
  }, {
    name: 'stories.description',
    weight: 0.3
  }],
  id: 'name',
  tokenize: true,
  threshold: 0.3
})
