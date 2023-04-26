import React from 'react';
import { number, string, node } from 'prop-types';

const VerticalLine = ({ pos, children, color = 'rgba(70, 123, 184, 0.3)', zIndex }) => <div
  style={{
    position: 'absolute',
    left: pos,
    top: 0,
    bottom: 0,
    width: '2px',
    opacity: 1,
    background: color,
    zIndex,
  }}
>
  <div
    style={{
      position: 'absolute',
      display: 'inline-block',
      color: 'rgba(0,240,255,.8)',
      fontSize: '10px',
      lineHeight: 1,
      bottom: '5px',
      left: '50%',
      width: '60px',
      textAlign: 'center',
      marginLeft: '-30px',
      zIndex: 4,
    }}
  >{children}</div>
</div>;

VerticalLine.propTypes = {
  pos: string,
  children: node,
  color: string,
  zIndex: number,
};

export default VerticalLine;
