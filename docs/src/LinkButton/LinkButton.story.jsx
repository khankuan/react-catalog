import { Story } from 'react-gallery'
import LinkButton from './LinkButton'

const story = new Story(LinkButton)
export default story

story.add({
  title: 'Default',
  content: { children: 'Click me' }
})
