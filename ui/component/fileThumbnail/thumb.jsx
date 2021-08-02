// @flow
import React from 'react';
import classnames from 'classnames';
import type { Node } from 'react';
import useLazyLoading from 'effects/use-lazy-loading';

type Props = {
  thumb: string,
  fallback: ?string,
  children?: Node,
  className?: string,
};

const Thumb = (props: Props) => {
  const { thumb, fallback, children, className } = props;
  const thumbnailRef = React.useRef(null);
  useLazyLoading(thumbnailRef);

  return (
    <div
      ref={thumbnailRef}
      data-background-image={thumb}
      data-background-image-fallback={fallback}
      className={classnames('media__thumb', className)}
    >
      {children}
    </div>
  );
};

export default Thumb;
