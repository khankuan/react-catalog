import { Story } from 'react-library'
import UserCard from './UserCard'
const delay = time => new Promise(resolve => setTimeout(resolve, time))
const story = new Story(UserCard)
export default story

story.add({
  title: 'Default',
  content: { name: 'John', onExpand: action => console.log('More clicked') }
})

story.add({
  title: 'Customize Actions',
  theme: 'dark',
  content: {
    name: 'John',
    expanded: true,
    actions: ['Add as friend', 'Message'],
    onActionClick: story.handler('onActionClick')
  }
})

story.sequence({
  title: 'User doing an action'
}, [{
  title: 'Initial',
  update: () => ({
    name: 'John',
    actions: ['Add as friend', 'Message'],
    onActionClick: story.handler('onActionClick')
  })
}, {
  title: 'Card becomes expanded (after 1 sec)',
  update: async function(props) {
    await delay(1000)
    props.expanded = true
  }
}, {
  title: 'User clicks on Message action',
  update: (props, ref) => {
    const message = ref.props.actions[1]
    ref.handleActionClick(message)
  }
}])
