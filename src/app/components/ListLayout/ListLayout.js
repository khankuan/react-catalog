import React, { PropTypes } from 'react';
import cx from 'classnames';

import './ListLayout.css';

const ListLayout = ({
  className,
  children,
  ...props
}) => {
  const classNames = cx(
    'react-catalog-list-layout',
    className,
  );
  const mappedChildren = React.Children.map(children, child => (
    child ? React.cloneElement(child, {
      className: cx('react-catalog-list-layout-item', child.props.className),
    }) : null
  )).filter(x => !!x);

  if (mappedChildren.length === 0) {
    return <div {...props} />;
  }

  return <div {...props} className={classNames}>{mappedChildren}</div>;
};

ListLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ListLayout.defaultProps = {
};

export default ListLayout;
