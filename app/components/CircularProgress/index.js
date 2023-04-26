import React from 'react';
import PropTypes from 'prop-types';
import { progress } from './utils';

export default class CircularProgress extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { radius, bgColor, strokeWidth, size, currentTime, bet, room, strokeColor } = this.props;
    const arcValue = bet
      ? progress(bet.deadline.timestamp, bet.timestamp, currentTime)
      : progress(room.deadlineAt, room.createdAt, currentTime);
    const viewBox = `0 0 ${size} ${size}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * (arcValue > 0 ? arcValue : 0);
    return (
      <svg width={size} height={size} viewBox={viewBox}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          stroke={bgColor}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          stroke={!strokeColor ? '#fad81e' : strokeColor}
          fill="transparent"
        />
      </svg>
    );
  }
}

CircularProgress.propTypes = {
  radius: PropTypes.number,
  strokeWidth: PropTypes.number,
  bgColor: PropTypes.string,
  size: PropTypes.number,
  currentTime: PropTypes.number,
  bet: PropTypes.object,
  room: PropTypes.object,
  strokeColor: PropTypes.string,
};
