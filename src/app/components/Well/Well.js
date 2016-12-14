import React, { PropTypes } from 'react';
import cx from 'classnames';

import './Well.css';

const Well = ({ className, theme, title, children, ...props }) => (
  <div
    {...props}
    className={cx(
      'react-library-well',
      `react-library-well-${theme}`,
      className,
    )}
  >
    {
      title ?
        <span className='react-library-well-title'>
          {title}
        </span>
      : null
    }
    { children }
  </div>
);

Well.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']),
  title: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
};

Well.defaultProps = {
  theme: 'light',
};

export default Well;
