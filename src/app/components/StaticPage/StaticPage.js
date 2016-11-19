import React from 'react'
import cx from 'classnames'

import './StaticPage.css'

const StaticPage = ({ children, className, ...props }) => {
  if (typeof children === 'string') {
    children = <div dangerouslySetInnerHTML={{ __html: children }} />
  } else {
    const Comp = children
    children = <Comp />
  }
  return (
    <div {...props} className='react-library-page'>
      <div className={cx('react-library-page-wrapper', className)}>
        {children}
      </div>
    </div>
  )
}

export default StaticPage
