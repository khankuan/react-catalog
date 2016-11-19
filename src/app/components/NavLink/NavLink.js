import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router'
import './NavLink.css'

const NavLink = ({ expandable, expanded, onExpandClick, active, activeHighlights, children,
  disabled, className, ...passProps }) => {
  const Component = passProps.to ? Link : 'a'

  let expansion
  if (expandable) {
    expansion = (
      <span className='expand' onClick={onExpandClick}>
        {expanded ? '-' : '+'}
      </span>
    )
  }

  return (
    <Component
      {...passProps}
      className={cx(
          'react-library-nav-link',
          { active, selected: active && activeHighlights, disabled },
          className
        )
      }>
      <span className='link-text'>{children}</span>
      {expansion}
    </Component>
  )
}

export default NavLink
