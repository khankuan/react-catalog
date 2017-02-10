import React from 'react'
import cx from 'classnames'
import './NavHeader.css'

const NavHeader = ({ header, className }) => {
  return (
    <h6 className={cx('react-gallery-nav-header', className)}>{header}</h6>
  )
}

export default NavHeader
