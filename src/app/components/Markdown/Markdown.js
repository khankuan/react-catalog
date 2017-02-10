import React, { PropTypes } from 'react'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'

import './Markdown.css'

const Markdown = ({ className, ...props }) =>
  <ReactMarkdown {...props} className={cx('react-gallery-markdown', className)} />

Markdown.propTypes = {
  className: PropTypes.string
}

export default Markdown
