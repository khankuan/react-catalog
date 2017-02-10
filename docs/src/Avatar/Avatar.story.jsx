import { Story } from 'react-catalog'
import Avatar from './Avatar'

const story = new Story(Avatar)
export default story

story.add({
  title: 'Square type',
  content: { type: 'square' }
})

story.add({
  title: 'Dark theme',
  content: { theme: 'dark' }
})
