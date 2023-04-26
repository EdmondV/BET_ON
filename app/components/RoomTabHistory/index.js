import React from 'react';
import { object, number } from 'prop-types';
import { browserHistory } from 'react-router';
import { m } from 'utils/intl';

import { color } from 'styles-constants';
import { ROOM_URL_PREFIX } from 'utils/redirects';
import { getFormattedTime } from 'utils/time';
import SvgIcon from 'components/SvgIcon';
import {
  StyledRoomTab,
  DateWrapper,
  TabContentWrapper,
  RoomInfoWrapper,
  StyledProfitWrapper,
  StyledRoomInfo,
  Asset,
  Title,
  StyledResultIcon,
  ResultText,
  StyledCircle,
  CircleIcon,
} from './RoomTabStyles';

import { isDraw, isDrawOrNobody, teamWon } from '../../utils/rooms';

const ResultIcon = (room) => (
  /* eslint-disable */
  <div>
    {!isDrawOrNobody(room) ? // if it is NOT a draw OR nobody joined show animal icon
      <StyledResultIcon team={teamWon(room)}>
        <SvgIcon icon={teamWon(room)} />
      </StyledResultIcon> : // else show circle (in progress in design)
      <CircleIcon>
        <StyledCircle result={room.finalResult} />
      </CircleIcon>
    }
  </div>
  /* eslint-enable */
);

const ResultMessage = (room) => (
  <span>
    {!isDrawOrNobody(room) && <span>
      {room.myPayout > 0 ? `${m('roomStatus.roomWin')} +ᗸ ${room.myPayout}` : `${m('roomStatus.roomLoss')} -ᗸ ${room.myBet}`}
    </span>}
    {isDrawOrNobody(room) && <span>{isDraw(room) ? `${m('roomStatus.roomDraw')}` : `${m('roomStatus.roomNobody')}`}</span>}
  </span>
);

// checks if we need shadow on long title in tab
const titleNeedShadow = (el) => {
  if (el) return el.offsetWidth > 85;
  return false;
};

export default class RoomTabHistory extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    room: object,
    index: number,
    historyChunk: number,
  };
  render() {
    const { room, historyChunk } = this.props;
    const index = (this.props.index - (20 * historyChunk)) / 10; // animate every history rooms request loaded

    let c = color.danger;
    if (room.myPayout > 0) {
      c = color.newSuccess;
    } else if (isDrawOrNobody(room)) {
      c = '#5d6c7c';
    }

    return (
      <StyledRoomTab
        style={{ animationDelay: `${index}s` }}
        className="history-tab"
        {...this.props}
      >
        {room.processed && <TabContentWrapper onClick={() => browserHistory.push(ROOM_URL_PREFIX + room.id)}>
          <RoomInfoWrapper>
            <StyledProfitWrapper color={c}>
              {ResultIcon(room)}
              <ResultText drawOrNobody={isDrawOrNobody(room)}>
                {ResultMessage(room)}
              </ResultText>
            </StyledProfitWrapper>
            <StyledRoomInfo>
              <Asset>{room.asset}</Asset>
              <Title shadow={titleNeedShadow(this.title)} innerRef={(span) => { this.title = span; }}>{room.title}</Title>
            </StyledRoomInfo>
          </RoomInfoWrapper>
          <DateWrapper>
            <span>{getFormattedTime(room.expiredAt, 'HH:mm')}</span>
            <span className="date">{`${getFormattedTime(room.expiredAt, 'MMM D')}`}</span>
          </DateWrapper>
        </TabContentWrapper>}
      </StyledRoomTab>
    );
  }
}
