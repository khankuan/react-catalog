import React from 'react'
import PropTypes from 'prop-types';
import cx from 'classnames'

import './Avatar.css'

/**
 *  @categories: Image
 *  @tags: Profile, Picture
 *  @default
 *  Display pic of a user
 */
const Avatar = ({ theme, type, src, ...passProps }) => {
  return (
    <img
      {...passProps}
      className={cx('demo-avatar', `demo-avatar-type-${type}`, `demo-avatar-theme-${theme}`)}
      src={src} />
  )
}

Avatar.propTypes = {
  /** Image Url */
  src: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['square', 'round']),
  theme: PropTypes.oneOf(['light', 'dark'])
}

Avatar.defaultProps = {
  src: 'http://success.grownupgeek.com/wp-content/uploads/2013/01/no-avatar.png',
  type: 'round',
  theme: 'light'
}

export default Avatar
