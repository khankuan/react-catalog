import React, { PropTypes, Component } from 'react'

import Card from '../Card/Card'
import Avatar from '../Avatar/Avatar'
import LinkButton from '../LinkButton/LinkButton'

import './UserCard.css'

/**
 * @tags: User, Cards
 * @keywords: Profile
 * A component display a user info with options to add menu actions
 */
export default class UserCard extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    expanded: PropTypes.bool,
    onExpand: PropTypes.func,
    onActionClick: PropTypes.func,
    actions: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    actions: []
  }

  handleActionClick = (action, e) => {
    const { onActionClick } = this.props
    if (onActionClick) {
      onActionClick(action, e)
    }
  }

  renderActions () {
    const { expanded, actions } = this.props
    if (!expanded || actions.length === 0) {
      return null
    }

    return (
      <div className='demo-user-card-actions'>
        {
          actions.map(action =>
            <LinkButton
              ref={ref => (this[`_action_${action}`] = ref)}
              key={action}
              className='demo-action'
              onClick={this.handleActionClick.bind(null, action)}>
              {action}
            </LinkButton>
          )
        }
      </div>
    )
  }

  renderMore () {
    const { expanded, onExpand } = this.props
    if (expanded) {
      return null
    }

    return (
      <div className='demo-user-card-more'>
        <LinkButton onClick={onExpand}>More</LinkButton>
      </div>
    )
  }

  render () {
    const { name, avatar } = this.props
    return (
      <Card>
        <div className='demo-user-card-info' >
          <Avatar src={avatar} />
          <span className='demo-name'>{name}</span>
        </div>
        {this.renderMore()}
        {this.renderActions()}
      </Card>
    )
  }
}
