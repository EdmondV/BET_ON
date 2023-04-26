import React from 'react';
import { string, node, bool } from 'prop-types';
import { bgColorOpacity80 } from 'styles-constants';

const HorizontalLine = ({ pos, children, color = 'rgba(70, 123, 184, 0.55)', transition, hidden, left = 0, width = '100%', right, bg }) => <div
  style={{
    position: 'absolute',
    top: pos,
    width,
    transition,
    left,
    right: 0,
    height: '2px',
    background: color,
    display: hidden ? 'none' : 'block',
    boxShadow: `0px 0px 4px 0px ${color}`,
  }}
>
  <div
    style={{
      position: 'absolute',
      color: 'rgba(0,240,255,.8)',
      fontSize: '10px',
      lineHeight: 1,
      top: '-5px',
      zIndex: 4,
    }}
  />
</div>;

HorizontalLine.propTypes = {
  pos: string,
  left: string,
  children: node,
  color: string,
  transition: string,
  hidden: bool,
  width: string,
  right: string,
  bg: string,
};

export default HorizontalLine;
