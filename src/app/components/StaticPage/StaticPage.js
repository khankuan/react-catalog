import React from 'react'
import cx from 'classnames'
import DocumentTitle from 'react-document-title'

import './StaticPage.css'

const StaticPage = ({ title, children, className, ...props }) => {
  if (typeof children === 'string') {
    children = <div dangerouslySetInnerHTML={{ __html: children }} />
  } else {
    const Comp = children
    children = <Comp />
  }
  return (
    <div {...props} className='react-library-page'>
      <DocumentTitle title={title} />
      <div className={cx('react-library-page-wrapper', className)}>
        {children}
      </div>
    </div>
  )
}

export default StaticPage
