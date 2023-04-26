import React from 'react';
import { object, number } from 'prop-types';
import styled from 'styled-components';
import { fontSize, fontWeight } from 'styles-constants';
import { FormattedMessage, m } from 'utils/intl';

import { redirectToRoomCreate } from 'utils/redirects';
import BlueLine from 'components/BlueLine';
import { short } from 'utils/time';
import { ROOM_GAME_STATUS, ROOM_STATUS } from 'constants/room';
import { ProgressWrapper } from 'components/CtrlPanel';
import CircularProgress from 'components/CircularProgress';

import messages from './messages';
import BgBull from './win-bulls.svg';
import BgBear from './win-bears.svg';
import { betsAreOff, canViewResult, nobodyJoined, roomCancelled } from '../../utils/rooms';

const ClosedWrapper = styled.div`
  flex: 0 0 260px;
  margin: 0 auto;
  position: relative;
`;

const WinWrapper = styled.div`
  width: 166px;
  height: 166px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -83px 0 0 -83px;
  border-radius: 50%;
  overflow: hidden;
  &:before {
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${(props) => props.bull ? BgBull : BgBear});
    background-size: 190px auto;
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 100%;
    filter: grayscale(100%) blur(2px);
  }
`;

const getTextWrapperBg = (bull, userWon) => {
  if (!userWon) return 'rgba(102,102,102,.6)';
  return bull ? 'rgba(0,165,38,.4)' : 'rgba(255,138,0,.4)';
};

const TextWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: ${({ userWon }) => userWon ? fontWeight.lightBold : fontWeight.regular};
  color: #ffffff;
  background-color: ${(props) => getTextWrapperBg(props.bull, props.userWon)};
  > span {
    display: block;
    &:first-child {
      font-size: ${fontSize.bodyLarge};
    }
    &:last-child {
      font-size: ${fontSize.displaySmall};
    }
  }  
`;

const NobodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > span {
    width: 80%;
    font-size: ${fontSize.bodyLarge};
    display: block;
  }
`;

const BetsOfWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  > span {
    font-size: ${fontSize.bodyLarge};
    display: block;
    line-height: 40px;
    margin: 0 7px;
  }
`;

const TimeRemained = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  text-align: center;
  font-weight: ${fontWeight.lightBold};
`;

export const winner = (room) => {
  if (room.userWon) {
    return 'You';
  }
  if (room.gameStatus === ROOM_GAME_STATUS.BULLS_WIN) {
    return 'Bulls';
  }
  return 'Bears';
};

export const payout = (room) => {
  switch (winner(room)) {
    case 'Bulls':
      return room.bullsPayout;
    case 'Bears':
      return room.bearsPayout;
    case 'You':
    default:
      return room.myPayout;
  }
};

const showCountdown = (room, time) => betsAreOff(room, time) && !roomCancelled(room);

// export const currentMember = (room) => room.myBet > 0;

export default class ClosedRoom extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { room, currentTime } = this.props;
    return (
      <ClosedWrapper room={room}>
        {/* draw room doesn't need red circle */}
        {!roomCancelled(room) && room.gameStatus !== ROOM_GAME_STATUS.DRAW && <ProgressWrapper>
          <CircularProgress
            size={188}
            radius={91}
            strokeWidth={5}
            bgColor="rgba(255,255,255,.3)"
            showDeadline
            {...this.props}
          />
        </ProgressWrapper>}
        {room.status === ROOM_STATUS.FINISHED && !roomCancelled(room) && <WinWrapper bull={room.gameStatus === ROOM_GAME_STATUS.BULLS_WIN}>
          <TextWrapper bull={room.gameStatus === ROOM_GAME_STATUS.BULLS_WIN} userWon={room.userWon}>
            <span>{m('global.you')} {m(`global.${room.userWon ? 'win' : 'lose'}`)}</span>
            <span>ᗸ {room.userWon ? '+{payout(room)}' : `-${room.myBet}`}</span>
          </TextWrapper>
        </WinWrapper>}
        {(roomCancelled(room) && !canViewResult(room)) && <NobodyWrapper>
          <FormattedMessage {...messages.you_must_join} />
          <BlueLine currentMember={canViewResult(room)} onHandleClick={redirectToRoomCreate} />
        </NobodyWrapper>}

        {nobodyJoined(room) &&
          <NobodyWrapper>
            <FormattedMessage {...messages.nobody_joined} />
            <BlueLine currentMember={canViewResult(room)} onHandleClick={redirectToRoomCreate} />
          </NobodyWrapper>}

        {room.gameStatus === ROOM_GAME_STATUS.DRAW && canViewResult(room) && <NobodyWrapper>
          <FormattedMessage {...messages.game_ended_in_draw} />
          <BlueLine currentMember={canViewResult(room)} onHandleClick={redirectToRoomCreate} />
        </NobodyWrapper>}

        {(showCountdown(room, currentTime)) &&
          <BetsOfWrapper>
            <FormattedMessage {...messages.all_bets} />
            <TimeRemained>{short(room.expiredAt)}</TimeRemained>
            <FormattedMessage {...messages.are_off} />
          </BetsOfWrapper>}
      </ClosedWrapper>
    );
  }
}

ClosedRoom.propTypes = {
  room: object,
  currentTime: number,
};
