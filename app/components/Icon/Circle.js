import React from 'react';
import { number, string, object } from 'prop-types';

const Circle = ({ size, color, style, className }) => {
  const radius = size / 2;
  const svgSize = size * 4;

  return (<svg width={svgSize} height={svgSize} style={style} fill="transparent" className={className}>
    <circle
      cx={radius}
      cy={radius}
      r={radius}
      fill={color}
    />
  </svg>);
};

Circle.propTypes = {
  size: number,
  color: string,
  style: object,
  className: string,
};

export default Circle;
