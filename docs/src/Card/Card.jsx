import React, { PropTypes } from 'react'
import cx from 'classnames'

import './Card.css'

/**
 * @categories: Containers, Cards
 * @tags: Box
 * To wrap contents in a box-like div
 */
const Card = ({ children, depth, ...passProps }) => {
  return (
    <div {...passProps} className={cx('demo-card', `demo-card-depth-${depth}`)} >
      {children}
    </div>
  )
}

Card.propTypes = {
  /** Darkness */
  depth: PropTypes.oneOf(['1', '2']),
  children: PropTypes.node.isRequired
}

Card.defaultProps = {
  depth: '1'
}

export default Card
