import React from 'react';
import { object, func, number, any } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { FormattedMessage } from '../../../utils/intl';
import messages from '../../../global-messages';

import CtrlPanel from '../../../components/CtrlPanel';
import SvgIcon from '../../../components/SvgIcon';
import StyledScrollbar from '../../../components/StyledScrollbar';

import Bet from './Bet';
import { userModel } from '../FootballPage/mocks/data';
import { changeTimeframe, makeNewBet, sendChatMessage, onToggleAnimatedFootballer } from '../FootballPage/actions';
import ChatPanel from './ChatPanel';
import {
  BetsPanelWrapper,
  SettingsWrapper,
  PeriodWrapper,
  PeriodButton,
  UserOverviewWrapper,
  UserOverviewItem,
  MembersAndChatWrapper,
  MembersAndChatHeader,
  MembersAndChartButton,
  PlayersWrapper,
} from './RightPanelStyles';

import { selectUser } from '../selectors';

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
 */
const showClosed = (timer) => timer && timer.betsOff;
const timeFrames = [5, 10, 15, 30, 45, 60];

// FIXME: Props for styled components doesn't work in bets panel component (in the entire component)
// FIXME: rerenders every second and on the second rerender lost all props from render method (console.log to see the bug)
export class RightPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      activeRightTab: 'players',
    };
  }
  // FIXME: remove?
  componentWillReceiveProps(nextProps) {
    if (this.props.spotlight && showClosed(nextProps.timer)) { // eslint-disable-line
      this.props.toggleSpotlightAnimation(0);
    }
  }
  onBottomTabToggle(tab) {
    this.setState({ activeRightTab: tab });
  }
  culc(bets) {
    let bet = 0,
      payout = 0;
    bets.forEach((b) => b.user ? bet += b.bet : null);
    payout = bet * 2;
    return { bet, payout };
  }
  render() {
    const {
      changeTimeframePeriod,
      timeframe,
      room,
      messagesList,
      sendMessage,
    } = this.props;
    const time = room.data && room.data.length ? room.data[room.data.length - 1].timestamp : 0;
    const userBets = this.culc(room.bets);
    return (
      <BetsPanelWrapper>
        <UserOverviewWrapper>
          <UserOverviewItem className="bet">
            <div className="title">
              <SvgIcon icon="coins" />
              <FormattedMessage {...messages.myBets} />
            </div>
            <div className="summ">$ {userBets.bet}</div>
          </UserOverviewItem>
          <UserOverviewItem>
            <div className="title">
              <SvgIcon icon="cup" />
              <FormattedMessage {...messages.myPayout} />
            </div>
            <div className="summ">$ {userBets.payout}</div>
          </UserOverviewItem>
        </UserOverviewWrapper>
        <CtrlPanel {...this.props} />
        <SettingsWrapper>
          <PeriodWrapper>
            {timeFrames.map((t) => (
              <PeriodButton
                onClick={() => { changeTimeframePeriod(t); }}
                isCurrent={timeframe === t}
                key={t}
              >{t === 60 ? '1m' : `${t}s`}
              </PeriodButton>))}
          </PeriodWrapper>
        </SettingsWrapper>
        {<MembersAndChatWrapper>
          <MembersAndChatHeader>
            <MembersAndChartButton
              className={`chatButton ${this.state.activeRightTab === 'chat' ? 'active' : ''}`}
              onClick={() => this.onBottomTabToggle('chat')}
            >
              <SvgIcon icon="chat" />
              <FormattedMessage {...messages.chat} />
            </MembersAndChartButton>
            <MembersAndChartButton
              className={this.state.activeRightTab === 'players' ? 'active' : ''}
              onClick={() => this.onBottomTabToggle('players')}
            >
              <SvgIcon icon="players" />
              <FormattedMessage {...messages.players} />
            </MembersAndChartButton>
          </MembersAndChatHeader>
          {this.state.activeRightTab === 'chat' && <ChatPanel
            messages={messagesList.messages.filter((e) => e.timestamp < time)}
            user={userModel}
            room={room}
            sendMessage={sendMessage}
            dispatch={this.props.dispatch}
          />}
          {this.state.activeRightTab === 'players' && <PlayersWrapper>
            <StyledScrollbar theme="chat" vertical returnChildren>
              {room.bets.filter((e) => e.timestamp < time).map((b) => (<Bet
                key={b.id}
                bet={b}
              />))}
            </StyledScrollbar>
          </PlayersWrapper>}
        </MembersAndChatWrapper>}
      </BetsPanelWrapper>
    );
  }
}

RightPanel.propTypes = {
  toggleSpotlightAnimation: func,
  spotlight: number,
  messages: any,
  dispatch: func,
  currentTime: number,
  changeTimeframePeriod: func,
  timeframe: number,
  room: object,
  messagesList: object,
  sendMessage: func,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
  timeframe: (state) => state.get('footballPage').timeframe,
  room: (state) => state.get('footballPage').selectedRoom,
  currentTs: (state) => state.get('footballPage').currentTs,
  messagesList: (state) => state.get('footballPage').messagesList,
  isFootballerShow: (state) => state.get('footballPage').isFootballerShow,
});

const makeDispatchToProps = (dispatch) => ({
  changeTimeframePeriod: (data) => dispatch(changeTimeframe(data)),
  makeBet: (data) => dispatch(makeNewBet(data)),
  sendMessage: (message, ts) => dispatch(sendChatMessage(message, ts)),
  toggleAnimatedFootballer: (data) => dispatch(onToggleAnimatedFootballer(data)),
});

export default connect(mapStateToProps, makeDispatchToProps)(RightPanel);
