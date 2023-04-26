import React from 'react';
import styled, { keyframes } from 'styled-components';
import { object, bool, string, number } from 'prop-types';
import Circle from 'components/Icon/Circle';
import { Team1ColorRGB, Team2ColorRGB } from 'styles-constants';

// FIXME WTF? Somehow this line is required otherwise it crashes
import { Bull, Bear } from './Animals'; //eslint-disable-line

const propTypes = {
  pulse: object,
  prevPulse: object,
  animated: bool,
  color: string,
  spotlight: number,
  roomActive: bool,
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

const beacon = keyframes`{
  from {
    opacity: 0.4;
    transform: scale(0);
  }
  to {
    opacity: 0;transform: scale(1);
  }
}`;
/* stylelint-enable */

const SpotlightWrapper = styled.div`
  display: ${(p) => p.team ? 'block' : 'none'};
  position: relative;
  left: -25px;
`;

const CropContainer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  overflow: hidden;
  margin-top: ${(p) => p.team === 1 ? '-100%' : '0'};
  transform: rotate3d(1,0,0,${(p) => p.team === 2 ? '180deg' : '0deg'});

  .circle-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    transform-origin: bottom left;
    transform: rotate(55deg);

    .circle {
      display: block;
      content: '';
      background-color: ${(p) => p.team === 1 ? Team1ColorRGB : Team2ColorRGB};
      width: 200%;
      height: 200%;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: -100%;
      animation: ${beacon} 5s ease-out backwards infinite;
    }

    .circle:nth-child(2) {
      animation-delay: 1s;
    }

    .circle:nth-child(3) {
      animation-delay: 2s;
    }

    .circle:nth-child(4) {
      animation-delay: 3s;
    }

    .circle:nth-child(5) {
      animation-delay: 4s;
    }

  }
`;

const Pulse = ({ pulse, animated, prevPulse, color, spotlight, roomActive }) => {
  const { x, y, radius = 2 } = pulse;
  const radiusMargin = `${-radius / 2}px`;

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
      zIndex: 9,
      // transition: !first ? 'all 1s' : 'none',
      left: x,
      top: y,
    }}
  >
    <svg
      width="50px"
      height="50px"
      style={{
        margin: '-25px 0 0 -25px',
        transform: `scale(${scale})`,
        transition: 'all 500ms',
        display: animated ? 'block' : 'none',
      }}
    >
      {animated && <circle cx="50%" cy="50%" r="25%" fill="none" stroke={`rgba(${color},0.5)`} strokeWidth="5%">
        <animate attributeType="SVG" attributeName="r" begin="0s" dur="1.5s" repeatCount="indefinite" from="10%" to="50%" />
        <animate attributeType="CSS" attributeName="stroke-width" begin="0s" dur="1.5s" repeatCount="indefinite" from="5%" to="0%" />
        <animate attributeType="CSS" attributeName="opacity" begin="0s" dur="1.5s" repeatCount="indefinite" from="1" to="0" />
      </circle>}
    </svg>
    {roomActive && <SpotlightWrapper team={spotlight}>
      <CropContainer team={spotlight}>
        <div className="circle-container">
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
        </div>
      </CropContainer>
    </SpotlightWrapper>}
    <Circle
      className="pulse"
      size={radius}
      color={`rgb(${color})`}
      style={{
        animation: animated ? `${pulseAnimation} 1s linear infinite` : 'none',
        transformOrigin: '8px 8px',
        position: 'absolute',
        marginLeft: radiusMargin,
        marginTop: radiusMargin,
        transition: 'color 1s ease-out',
      }}
    />
  </div>);
};

Pulse.propTypes = propTypes;

export default Pulse;
