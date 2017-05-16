import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './RoundButton.css'

const RoundButton = ({ className, theme, ...props }) => {
  return (
    <button
      {...props}
      className={cx('react-catalog-round-button', `theme-${theme}`, props.className)} />
  )
}

RoundButton.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.oneOf(['dark', 'light'])
}

RoundButton.defaultProps = {
  theme: 'dark'
}

export default RoundButton
