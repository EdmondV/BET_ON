import React from 'react';
import styled from 'styled-components';
import { object, number } from 'prop-types';
import { Team1ColorRGB, Team2ColorRGB, color } from 'styles-constants';
import AvatarImg from '../../containers/MainPage/FootballPage/AvatarImg';
// import { API_URL } from '../../utils/request';
import CircularProgress from '../CircularProgress';
import icon from '../../containers/MainPage/FootballPage/mocks/assets/soccer.png';

const h = '50px';
const ease = '200ms ease-out';

const BetInfo = styled.div`
  width: 42px;
  height: 42px;
  margin: 4px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.12);
  overflow: hidden;
  font-weight: 500;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  color: #fff;
  justify-content: space-around;
  animation: scale 0.3s;
  z-index: 5;
`;

const BetCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  position: absolute;
  z-index: 5;
  top: ${({ top }) => !top ? '50px' : 'auto'};
  bottom: ${({ top }) => top ? '50px' : 'auto'};
  margin: ${({ top }) => top ? '-25px 0 0 -25px' : '0 0 0 -25px'};
  background-color: inherit;
  animation: scale 0.3s;
  @keyframes scale {
    0%, 90% {
      transform: scale3d(1, 1, 0);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  }
`;

const VerticalLine = styled.div`
  position: absolute;
  width: 2px;
  z-index: -1;
  background-color: inherit;
  height: ${h};
  left: -1px;
  bottom: ${({ top }) => top ? 0 : 'auto'};
  top: ${({ top }) => !top ? 0 : 'auto'};
  animation: grow 0.3s;
  @keyframes grow {
    from { height: 0; }
    to { height: ${h}; }
  }
`;

const ProgressWrapper = styled.div`
  transform: rotate(-90deg);
`;

const BetWrapper = styled.div`
  position: absolute;
  z-index: 4;

  .value {
    color: rgba(255, 255, 255, 0.9);
  }

  &:hover {
    z-index: 8;
    opacity: 1;

    .circle {
      transform: ${({ user }) => user && 'scale(1.2)'};
    }
  }
  svg {
    top: -8px;
    left: -8px;
    position: absolute;
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const DeadlineStroke = styled.div`
  height: 2px;
  width: ${({ width }) => width}px;
  background-color: inherit;
  :before {
    content: '';
    opacity: ${({ isEdited }) => isEdited ? 0 : 0.8};
    background: url(${icon});
    right: -5px;
    background-color: inherit;
    height: 16px;
    background-size: 13px;
    width: 20px;
    background-repeat: no-repeat;
    position: absolute;
    background-position: 3px 1px;
    top: -7px;
    border-radius: 7px;
  }
`;

const BetPoint = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  position: absolute;
  margin: -4px 0 0 -4px;
  background-color: inherit;
`;

const BetValue = styled.div`
  margin: 0 auto;
  border-radius: 20px;
  padding: 0 5px;
  display: inline-block;
  transition: all ${ease};
  z-index: 2;
`;

const BetValueWrapper = styled.div`
  border-radius: 10px;
  position: absolute;
  font-size: 10px;
  bottom: ${({ top }) => top ? '-11px' : 'auto'};
  top: ${({ top }) => !top ? '-11px' : 'auto'};
  left: 0;
  right: 0;
  text-align: center;
  transition: all ${ease};
  background-color: inherit;
  color: #fff;
`;


// function printColor(bet, time) {
function printColor(bet) {
  let selectedColor = '';
  // if (bet.deadline.timestamp <= time) {
  //   selectedColor = bet.result === 'Win' ? color.success : color.roomLoss;
  // } else
  if (bet.team === 1) {
    selectedColor = Team1ColorRGB;
  } else if (bet.team === 2) {
    selectedColor = Team2ColorRGB;
  }
  return selectedColor;
}

const Bet = ({ bet, time }) => {
  const isEdited = bet.isEdited;
  const top = bet.team === 1;
  return (
    <BetWrapper
      user={bet.user}
      style={{
        left: `${bet.x}px` || 0,
        top: `${bet.y}px` || 0,
        background: printColor(bet, time),
        transform: bet.user ? 'scale(1)' : 'scale(0.8)',
      }}
    >
      {bet.user && <DeadlineStroke top={top} isEdited={isEdited} width={bet.deadlineX - bet.x} />}
      {!bet.user &&
        <ProgressWrapper>
          <CircularProgress
            bet={bet}
            radius={7}
            size={16}
            strokeWidth={2}
            currentTime={time}
            bgColor={color.primarySecond}
          />
        </ProgressWrapper>
      }
      {!isEdited && <BetPoint />}
      {!isEdited && <VerticalLine top={top} />}
      {!isEdited && <BetCircle className="circle" top={top} isUser={bet.user}>
        <BetInfo>
          {!bet.user ? <AvatarImage src={AvatarImg(bet.name)} alt={bet.id} /> : `$${bet.bet}`}
        </BetInfo>
        <BetValueWrapper top={top} className={`value value--${top ? 'top' : 'bottom'}`}>
          {!bet.user && <BetValue>$ {bet.bet}</BetValue>}
        </BetValueWrapper>
      </BetCircle>}
    </BetWrapper>
  );
};

Bet.propTypes = {
  bet: object,
  time: number,
};

export default Bet;
