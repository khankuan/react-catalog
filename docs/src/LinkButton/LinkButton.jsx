import React, { Component } from 'react'
import PropTypes from 'prop-types';
import cx from 'classnames'

import './LinkButton.css'

/**
 * @categories: Button
 * @tags: Links, href, url
 * An anchor element
 */
export default class LinkButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  }

  render () {
    const { className, ...passProps } = this.props
    return <a {...passProps} className={cx('demo-link-button', className)} />
  }
}
