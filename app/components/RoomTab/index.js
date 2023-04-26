import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { color } from 'styles-constants';

/* eslint-disable
  no-return-assign,
  func-names,
  one-var,
  prefer-const,
  consistent-return,
  no-plusplus,
  no-cond-assign,
  no-sequences,
  unexpected chained assignment,
  no-unused-expressions,
  react/no-did-mount-set-state
 */

import {
  StyledRoomTab,
  TabContentWrapper,
  TabWrapper,
  ContentWrapper,
  ArcWrapper,
  TimerValue,
  ProgressWrapper,
  // CloseIcon,
} from './RoomTabStyles';
import CircularProgress from '../CircularProgress';
import SoccerIcon from '../../containers/MainPage/FootballPage/MenuIcon/Soccer/SoccerIcon';
import { goToRoom } from '../../containers/MainPage/FootballPage/actions';
import { getMatchData, getMatchEvents } from '../../containers/MainPage/FootballPage/mocks/matchesData';
import { getFormattedTime } from '../../utils/time';

// TODO: Preloader on "nobody joined"
const ResultFinished = () => (
  <span>
    <span>
      test
    </span>
  </span>
);

ResultFinished.propTypes = {
};

class RoomTab extends React.PureComponent { // eslint-disable-line
  render() {
    const { width, room, currentTs, selectedRoom } = this.props;
    let scoreA = room.scoreA,
      scoreB = room.scoreB,
      total = 0;
    const events = getMatchEvents(room.id);
    const lastTs = room.data.length >= 1 ? room.data[room.data.length - 1].timestamp : 0;
    const currentRoomTs = room.id === selectedRoom.id ? currentTs : lastTs;
    const currentBets = room.bets && room.bets.filter((b) => b.timestamp <= currentRoomTs);
    currentBets.forEach((b) => total += b.bet);
    events.filter((e) => e.timestamp < currentRoomTs).forEach((e) => {
      if (e.type === 7) {
        e.team === 1 ? scoreA += 1 : scoreB += 1;
      }
    });
    return (
      <StyledRoomTab
        width={width}
        className={selectedRoom.id === room.id ? 'active' : ''}
        isPlaying
      >
        <TabContentWrapper {...this.props} onClick={() => { this.props.goToRoom(room.id, currentTs); }}>
          <TabWrapper>
            <ArcWrapper>
              <div className="icon-bg">
                <SoccerIcon />
              </div>
              <ProgressWrapper>
                <CircularProgress
                  radius={19}
                  size={41}
                  strokeWidth={1.5}
                  room={room}
                  currentTime={currentRoomTs}
                  bgColor={color.primarySecond}
                  showDeadline
                />
              </ProgressWrapper>
              <TimerValue deadline styles={{ danger: '#fad81e', arcProgress: '#fe8a01' }}>{getFormattedTime(getMatchData(this.props.room.id).matchStartTime + currentRoomTs, 'mm:ss')}</TimerValue>
            </ArcWrapper>
            <ContentWrapper>
              <div className="score">{`${room.teamA.name} ${scoreA} — ${scoreB} ${room.teamB.name}`}</div>
              <div className="bets-info">
                <span className="bets">Bets <strong>$ {total}</strong></span>
                {/* eslint-disable */}
                <span className="arrow"> → </span>
                {/* eslint-enable */}
                <span className="gain">Payout <strong>$ {total * 2}</strong></span>
              </div>
            </ContentWrapper>
          </TabWrapper>
        </TabContentWrapper>
      </StyledRoomTab>);
  }
}

RoomTab.propTypes = {
  width: PropTypes.number,
  room: PropTypes.object,
  params: PropTypes.object,
  onPinTab: PropTypes.func,
  currentTime: PropTypes.number,
  goToRoom: PropTypes.func,
  currentTs: PropTypes.number,
  selectedRoom: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  winningTeam: (state) => state.getIn(['mainPage', 'winningTeam']),
  currentTime: (state) => state.get('roomManager').time,
  currentTs: (state) => state.get('footballPage').currentTs,
  selectedRoom: (state) => state.get('footballPage').selectedRoom,
});

const makeDispatchToProps = (dispatch) => ({
  goToRoom: (id) => dispatch(goToRoom(id)),
});

export default connect(mapStateToProps, makeDispatchToProps)(RoomTab);
