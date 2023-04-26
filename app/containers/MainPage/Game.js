import React from 'react';
import { object, func, any, bool, number, instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { minPageWidth, menuWidth, leftPanelWidth, headerHeight, bgColor, betsPanelWidth } from 'styles-constants';

import Chart from 'components/Chart/Chart';
import RecommendedRoom from 'components/RecommendedRoom';
import { deadlineSound } from 'components/DeadlineSound';
import SoundComponent from 'components/SoundComponent';
import Loader from 'components/Loader';


import {
  toggleChat,
  toggleBet,
} from 'modules/settings/actions';

import BetsPanel from './BetsPanel/BetsPanel';

import { HeaderChart } from './HeaderChart';
import { FooterChart } from './FooterChart';
import {
  ChartLayoutWrapper,
  ChartAndFooterWrapper,
  ChartAndHeaderWrapper,
} from './LayoutStyles';

import {
  makeBet,
} from './actions';

import {
  selectSmoothDisabled,
  selectShowBets,
} from './selectors';
import RoomManager from '../../modules/rooms/RoomManager';

export class Game extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      cancelDispatched: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.roomManager.active.id !== nextProps.roomManager.active.id) {
      this.setState({ cancelDispatched: false });
    }
  }
  render() {
    const { roomManager, showRecommended, leftPanelOpen, recommendedFetching } = this.props;
    const room = roomManager.active || {};

    const chartHeight = Math.max(224, this.props.browser.height - headerHeight - 69 - 40);
    let chartWidth = Math.max(minPageWidth, this.props.browser.width) - menuWidth - betsPanelWidth;

    if (leftPanelOpen) {
      chartWidth -= leftPanelWidth;
    }

    return (
      <div style={{ position: 'relative' }}>
        {room.id ? <ChartAndHeaderWrapper>
          { deadlineSound(room) && <SoundComponent soundName="deadline" /> }
          <HeaderChart
            room={room}
            chatOpen={this.props.chatOpen}
            onToggleChat={this.props.onToggleChat}
            myBets={this.props.myBets}
            myPayout={this.props.myPayout}
            appInOnline={this.props.appIsOnline}
          />
          <ChartLayoutWrapper>
            <ChartAndFooterWrapper>
              {showRecommended && <RecommendedRoom roomManager={roomManager} recommendedFetching={recommendedFetching} />}
              <Chart
                isLoading={roomManager.active.isLoading}
                width={chartWidth}
                height={chartHeight}
                time={roomManager.time}
                room={room}
                showBets={this.props.showBets}
                smoothDisabled={this.props.smoothDisabled}
                spotlight={this.props.spotlight}
              />
              <FooterChart
                onPinTab={this.props.onPinTab}
                onToggleBet={this.props.onToggleBet}
                onToggleSmooth={this.props.onToggleSmooth}
                room={room}
                showBets={this.props.showBets}
                smoothDisabled={this.props.smoothDisabled}
                roomManager={roomManager}
              />
            </ChartAndFooterWrapper>
          </ChartLayoutWrapper>
        </ChartAndHeaderWrapper> : null}
        {room.id ? <BetsPanel
          room={room}
          toggleSpotlightAnimation={this.props.toggleSpotlightAnimation}
          spotlight={this.props.spotlight}
          makeBet={this.props.makeBet}
          user={this.props.user}
          messages={this.props.messages}
          dispatch={this.props.dispatch}
        /> : null}
        {roomManager.active.isLoading && <Loader bgColor={bgColor} />}
      </div>
    );
  }
}

Game.propTypes = {
  roomManager: instanceOf(RoomManager).isRequired,
  user: object.isRequired,
  browser: object.isRequired,
  leftPanelOpen: bool,
  onToggleChat: func,
  dispatch: func,
  onPinTab: func,
  onToggleBet: func,
  onToggleSmooth: func,
  messages: any,
  makeBet: func,
  showBets: bool,
  smoothDisabled: bool,
  showRecommended: bool,
  recommendedFetching: bool,
  myBets: number,
  myPayout: number,
  chatOpen: bool,
  appIsOnline: bool,
  toggleSpotlightAnimation: func,
  spotlight: number,
};

const mapStateToProps = createStructuredSelector({
  showRecommended: (state) => state.getIn(['mainPage', 'showRecommended']),
  recommendedFetching: (state) => state.getIn(['mainPage', 'recommendedFetching']),
  smoothDisabled: selectSmoothDisabled(),
  showBets: selectShowBets(),
});

const makeDispatchToProps = (dispatch) => ({
  makeBet: (bet) => dispatch(makeBet(bet)),
  onToggleBet: (open) => dispatch(toggleBet(open)),
  onToggleChat: (open) => dispatch(toggleChat(open)),
});
export default connect(mapStateToProps, makeDispatchToProps)(Game);
