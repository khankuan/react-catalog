import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router'
import './NavLink.css'

const encodeTo = url => url.split('/').map(encodeURIComponent).join('/')

const NavLink = ({ expandable, expanded, onExpandClick, active, activeHighlights, children,
  disabled, className, to, ...passProps }) => {
  const Component = to ? Link : 'a'

  let expansion
  if (expandable) {
    expansion = (
      <span className='expand' onClick={onExpandClick}>
        {expanded ? '-' : '+'}
      </span>
    )
  }

  if (typeof to === 'string') {
    to = encodeTo(to)
  } else if (typeof to === 'object') {
    to.pathname = encodeTo(to.pathname)
  }

  return (
    <Component
      {...passProps}
      to={to}
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
