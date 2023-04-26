import React from 'react';
import { keyframes } from 'styled-components';
import { object, bool, string } from 'prop-types';
import Circle from 'components/Icon/Circle';

const propTypes = {
  pulse: object,
  prevPulse: object,
  animated: bool,
  color: string,
};

/* stylelint-disable indentation */
const pulseAnimation = keyframes`{ 
  from {
    transform: none;
  }
  50% {
    transform: scale(0.8);
  }
  to {
    transform: none;
  }
}`;
/* stylelint-enable */

const SmallPulse = ({ pulse, animated, prevPulse, color }) => {
  const { x, y, radius = 7 } = pulse;
  const radiusMargin = `${-radius}px`;

  let scale = prevPulse ? Math.abs(prevPulse.y - pulse.y) : 0;
  if (scale >= 5) {
    scale = Math.min(1 + scale / 10, 2);
  } else {
    scale = 1;
  }

  return (<div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      position: 'absolute',
      zIndex: 10,
      left: x,
      top: y,
    }}
  >
    <svg
      width="5px"
      height="5px"
      style={{
        transform: `scale(${scale})`,
        transition: 'all 500ms',
        display: animated ? 'block' : 'none',
      }}
    >
    </svg>
    <Circle
      className="pulse"
      size={radius}
      color={`rgb(${color})`}
      style={{
        animation: animated ? `${pulseAnimation} 1s linear infinite` : 'none',
        position: 'absolute',
        marginLeft: radiusMargin,
        marginTop: radiusMargin,
        transition: 'color 1s ease-out',
      }}
    />

  </div>);
};

SmallPulse.propTypes = propTypes;

export default SmallPulse;
