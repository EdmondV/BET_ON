import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { minPageWidth, menuWidth, leftPanelWidth, betsPanelWidth } from '../../../styles-constants';

import {
  ChartAndHeaderWrapper,
  ChartAndFooterWrapper,
  ChartLayoutWrapper,
} from '../LayoutStyles';
import {
  calc,
} from './utils';

import TutorModal from './TutorModal/TutorModal';
import GameResultModal from './GameResultModal/GameResultModal';

import Chart from '../Chart/Chart';
// import Widget from '../../../components/Chart/Widget';
import ScorePanel from '../ScorePanel/ScorePanel';

import { changeBetResult, closeModal } from './actions';
/* eslint-disable
 no-return-assign,
 no-param-reassign,
 one-var,
 array-callback-return,
 */

class FootballPage extends React.PureComponent {
  // top panel without tabs
  // non left panel
  // chart on the middle
  // classic right panel
  constructor(props) {
    super(props);
    this.state = {
      explModalOpen: !localStorage.getItem('explModalOpen'),
      isEndGameModalOpen: false,
      totalResult: {},
    };
  }
  componentWillMount() {
    const { pathname } = this.props.location;
    if (pathname.includes('game')) {
      const query = pathname.split('/');
      if (parseFloat(query[query.length - 1])) {
        this.props.dispatch({ type: 'GO_TO_ROOM', payload: { id: parseFloat(query[query.length - 1]) } });
      } else {
        this.props.dispatch({ type: 'GO_TO_ROOM', payload: { id: 1 } });
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    const { room, currentTs } = nextProps;
    if (currentTs >= room.deadlineAt - 1000) {
      const sum = calc(room.bets);
      this.props.dispatch(
        {
          type: 'END_GAME',
          payload: {
            win: sum,
            id: room.id,
          },
        }
      );
      this.setState({ isEndGameModalOpen: true, totalResult: sum });
    }
    const isChangeResult = room.bets.length > 0 && room.bets.find((b) => {
      const lastAsset = room.data[room.data.length - 1];
      if (lastAsset && !b.result && b.deadline.timestamp <= lastAsset.timestamp && b.user) {
        if (b.team === 1) {
          b.result = b.value < lastAsset.value ? 'Win' : 'Lose';
        } else {
          b.result = b.value > lastAsset.value ? 'Win' : 'Lose';
        }
      }
    });
    if (isChangeResult) {
      this.props.betResult(isChangeResult);
    }
  }
  render() {
    const { roomManager, leftPanelOpen, room, closeExplModal } = this.props;
    const { isEndGameModalOpen, totalResult, explModalOpen } = this.state;
    // chart height value is 80
    const chartHeight = Math.max(224, this.props.browser.height - 80 - 52 - 40);
    let chartWidth = Math.max(minPageWidth, this.props.browser.width) - menuWidth - betsPanelWidth;
    if (leftPanelOpen) {
      chartWidth -= leftPanelWidth;
    }
    return (
      <div>
        <TutorModal isOpen={explModalOpen} closeExplModal={closeExplModal} />
        <GameResultModal closeModal={() => this.setState({ isEndGameModalOpen: false })} isEndGameModalOpen={isEndGameModalOpen} totalResult={totalResult} room={room} />
        <ChartAndHeaderWrapper>
          <ScorePanel
            room={room}
            currentTs={this.props.currentTs}
            chatOpen={this.props.chatOpen}
            onToggleChat={this.props.onToggleChat}
            myBets={this.props.myBets}
            myPayout={this.props.myPayout}
            appInOnline={this.props.appIsOnline}
            currentBets={room.bets.filter((b) => b.timestamp <= this.props.currentTs)}
            // isWidgetShow={this.props.isWidgetShow}
            isWidgetShow={false}
          />
          <ChartLayoutWrapper>
            <ChartAndFooterWrapper>
              <Chart
                isLoading={false}
                width={chartWidth}
                height={chartHeight}
                time={roomManager.time}
                room={room}
                showBets={this.props.showBets}
                smoothDisabled={this.props.smoothDisabled}
                spotlight={this.props.spotlight}
              />
            </ChartAndFooterWrapper>
          </ChartLayoutWrapper>
          {/* <Widget
            isShow={this.props.isWidgetShow}
            room={room}
            currentTs={this.props.currentTs}
            currentEvent={getMatchEvents(room.id).filter((e) => e.type !== EVENT_TYPES.NONE).find((e) => e.timestamp === this.props.currentTs)}
          /> */}
        </ChartAndHeaderWrapper>
      </div>
    );
  }
}

FootballPage.propTypes = {
  roomManager: PropTypes.any,
  leftPanelOpen: PropTypes.bool,
  browser: PropTypes.any,
  chatOpen: PropTypes.bool,
  onToggleChat: PropTypes.func,
  myBets: PropTypes.any,
  myPayout: PropTypes.any,
  appIsOnline: PropTypes.any,
  showBets: PropTypes.any,
  smoothDisabled: PropTypes.bool,
  spotlight: PropTypes.any,
  room: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  currentTs: PropTypes.any,
  betResult: PropTypes.func,
  closeExplModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  roomManager: (state) => state.get('roomManager'),
  rooms: (state) => state.get('footballPage').footballRooms,
  room: (state) => state.get('footballPage').selectedRoom,
  currentTs: (state) => state.get('footballPage').currentTs,
  isWidgetShow: (state) => state.get('footballPage').isWidgetShow,
});

const mapDispatchToProps = (dispatch) => ({
  betResult: (data) => dispatch(changeBetResult(data)),
  closeExplModal: () => dispatch(closeModal()),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(FootballPage);
