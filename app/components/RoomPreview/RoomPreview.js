import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import { redirectToRoom, ROOM_URL_PREFIX } from 'utils/redirects';
import { roomPreview, color } from 'styles-constants';
import CircularProgress from 'components/CircularProgress';
import AssetBackground from 'components/AssetBackground';
import Countdown from 'components/Countdown';
import NoticeBet from 'components/NoticeBet';
import SvgIcon from 'components/SvgIcon';
import TeamLogo from '../../containers/MainPage/FootballPage/TeamLogo/TeamLogo';
import BankIcon from '../../containers/MainPage/FootballPage/mocks/assets/bank.svg';
import { getMatchData } from '../../containers/MainPage/FootballPage/mocks/matchesData';
import { getFormattedTime } from '../../utils/time';

import {
  RoomPreviewWrapper,
  RoomDetailsWrapper,
  RoomPreviewChartWrapper,
  RoomPreviewBottomWrapper,
  ArcWrapper,
  BetBtn,
  Money,
  Triangle,
  BtnDetailsWrapper,
  RoomBetValue,
  RoomUpperDetails,
  Time,
  Title,
} from './RoomPreviewStyles';

import BetsList from './BetsList';
import { goToRoom as goRoom } from '../../containers/MainPage/FootballPage/actions';

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
 react/no-did-mount-set-state,
 */

const betAndRedirect = ({ id, bet }, makeBet, team) => {
  redirectToRoom(id);
  return makeBet ? makeBet({ id, bet, team }) : null;
};

// FIXME Refactor small rooms
export class RoomPreview extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    assets: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      showNotice: false,
      makeBet: () => {},
      chartData: props.room.assets,
      lastTimestamp: false,
      fading: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.showRecommended && nextProps.room.id !== this.props.room.id) {
      this.setState({
        chartData: nextProps.room.assets,
      });
      return;
    }
    if (!this.chart) return;

    if (nextProps.room.id !== this.props.room.id) {
      this.setState({ chartData: nextProps.room.assets });
    }
    if (!nextProps.assets || !nextProps.assets.length) { // eslint-disable-line
      return;
    }
    // if (!this.state.chartData.length) {
    //   this.setState({
    //     chartData: nextProps.assets.filter((a) => a.timestamp > nextProps.room.createdAt),
    //   });
    //   return;
    // }

    const j = nextProps.assets.length;
    const lastNew = nextProps.assets[j - 1];
    this.setState({
      chartData: this.state.chartData.concat([lastNew]),
    });
  }

  validateBet(team) {
    const { room, makeBet } = this.props;
    if (this.props.needBetNotification) {
      return this.setState({
        showNotice: true,
        makeBet: () => {
          this.setState({ showNotice: false });
          return betAndRedirect(room, makeBet, team);
        },
      });
    }
    return betAndRedirect(room, makeBet, team);
  }
  sum(bets) {
    let total = 0,
      teamA = 0,
      teamB = 0;
    bets.forEach((b) => {
      total += b.bet;
      teamA += b.team === 1 ? b.bet : 0;
      teamB += b.team === 2 ? b.bet : 0;
    });
    let f = Math.ceil(100 / (total / teamA)),
      s = 100 - f;
    if (!f && !s) {
      f = 50;
      s = 50;
    }
    return { total, teamA, teamB, f, s };
  }
  render() {
    const { room, showRecommended, redShadow, showChartPreview, currentTime, currentTs, selectedRoom } = this.props;
    const { id, asset, title, nextBullsPayout, nextBearsPayout, teamA, teamB } = room;

    const customCss = this.props.customCss || {};
    const btnType = nextBullsPayout > nextBearsPayout ? 'bull' : 'bear';
    const index = this.props.index / 8;

    const lastTs = room.data.length >= 1 ? room.data[room.data.length - 1].timestamp : 0;
    const currentRoomTs = room.id === selectedRoom.id ? currentTs : lastTs;
    const currentBets = room.bets && room.bets.filter((b) => b.timestamp <= currentRoomTs);
    const sum = this.sum(currentBets);
    return (
      <div ref={(input) => { this.chart = input; }} >
        {showChartPreview &&
        <RoomPreviewWrapper
          fading={this.state.fading}
          showRecommended={showRecommended}
          redShadow={redShadow}
          isRoomCurrent={room.id === selectedRoom.id}
          style={{ ...customCss, animationDelay: `${index}s` }}
          {...this.props}
          onClick={() => { this.props.goToRoom(id, currentTs); }}
        >
          <RoomDetailsWrapper>
            <RoomUpperDetails>
              <Title className="title">{`${teamA.name} - ${teamB.name}`}</Title>
              <Time>
                <SvgIcon styles={{ fill: color.grayFontColor }} icon="history" />
                <span>
                  {getFormattedTime(getMatchData(room.id).matchStartTime + currentRoomTs, 'mm:ss')}
                </span>
              </Time>
            </RoomUpperDetails>
            <BetsList currentTs={currentTs} currentBets={currentBets} />
          </RoomDetailsWrapper>
          <RoomPreviewChartWrapper
            onClick={() => {}}
          >
            <RoomDetailsWrapper width="200px">
              <AssetBackground
                fontSize="42px"
                bottom="28px"
              >{asset}</AssetBackground>
            </RoomDetailsWrapper>
          </RoomPreviewChartWrapper>
          <RoomPreviewBottomWrapper>
            <div className="logo-wrp">
              <TeamLogo name={teamA.name} />
              <BtnDetailsWrapper>
                <Money
                  style={{
                    color: color.teamAColor,
                    fontWeight: 700,
                    fontSize: '14px',
                    letterSpacing: '1px',
                  }}
                >$&nbsp;{sum.teamA}</Money>
              </BtnDetailsWrapper>
            </div>
            <div className="ArcWrapper-wrp">
              <ArcWrapper>
                <CircularProgress
                  radius={30}
                  size={66}
                  strokeWidth={3}
                  room={room}
                  currentTime={currentRoomTs}
                  bgColor={color.primarySecond}
                  showDeadline
                />
              </ArcWrapper>
              <RoomBetValue>
                <img src={BankIcon} alt="bankIcon" />
                <span className="title">In the bank</span>
                <span className="value">$&nbsp;{sum.total}</span>
              </RoomBetValue>
            </div>
            <div className="logo-wrp">
              <TeamLogo name={teamB.name} />
              <BtnDetailsWrapper>
                <Money
                  style={{
                    color: color.teamBColor,
                    fontWeight: 700,
                    fontSize: '14px',
                    letterSpacing: '1px',
                  }}
                >$&nbsp;{sum.teamB}</Money>
              </BtnDetailsWrapper>
            </div>
          </RoomPreviewBottomWrapper>
          {this.state.showNotice && <NoticeBet
            showNotice={this.props.showNotice}
            room={room}
            makeBet={this.state.makeBet}
            onToggleShowNotice={this.props.onToggleShowNotice}
          />}
        </RoomPreviewWrapper>}
        {!showChartPreview &&
        <RoomPreviewWrapper
          fading={this.state.fading}
          showRecommended={showRecommended}
          redShadow={redShadow}
          style={{ ...customCss, animationDelay: `${index}s` }}
          {...this.props}
          onClick={() => browserHistory.push(ROOM_URL_PREFIX + id)}
        >
          <RoomDetailsWrapper compact>
            <RoomUpperDetails>
              <Title className="title">{title}</Title>
              <Time>
                <SvgIcon icon="history" />
                <span>
                  <Countdown timeLeft={this.props.room.timeLeftDeadline} />
                </span>
              </Time>
            </RoomUpperDetails>
            <BetsList currentTs={currentTs} compact room={room} />
          </RoomDetailsWrapper>
          <RoomPreviewBottomWrapper compact>
            <BetBtn
              type="bull"
              room={room}
              showChartPreview={showChartPreview}
              compact
              onClick={() => this.validateBet(btnType === 'bull' ? 1 : 2)}
            >
              <div className="circle" />
              <Triangle bull />
              <BtnDetailsWrapper>
                <Money>$ {nextBullsPayout}</Money>
              </BtnDetailsWrapper>
            </BetBtn>
            <ArcWrapper>
              <CircularProgress
                radius={30}
                size={66}
                strokeWidth={3}
                room={room}
                currentTime={currentTime}
                deadlineTimer
                bgColor={roomPreview.innerArcColor}
                showDeadline
              />
            </ArcWrapper>
            <RoomBetValue compact>
              <SvgIcon icon="coins" />
              <span className="value">$ 100</span>
            </RoomBetValue>
            <BetBtn
              type="bear"
              onClick={() => this.validateBet(2)}
            >
              <div className="circle" />
              <BtnDetailsWrapper>
                <Money>$ {nextBearsPayout}</Money>
              </BtnDetailsWrapper>
              <Triangle bear />
            </BetBtn>
          </RoomPreviewBottomWrapper>
          {this.state.showNotice && <NoticeBet
            showNotice={this.props.showNotice}
            room={room}
            makeBet={this.state.makeBet}
            onToggleShowNotice={this.props.onToggleShowNotice}
          />}
        </RoomPreviewWrapper>}
      </div>
    );
  }
}

RoomPreview.propTypes = {
  room: PropTypes.object,
  dispatch: PropTypes.func,
  customCss: PropTypes.object,
  showRecommended: PropTypes.bool,
  showChartPreview: PropTypes.bool,
  redShadow: PropTypes.bool,
  showNotice: PropTypes.bool,
  needBetNotification: PropTypes.bool,
  onToggleShowNotice: PropTypes.func,
  makeBet: PropTypes.func,
  index: PropTypes.number,
  currentTime: PropTypes.number,
  goToRoom: PropTypes.func,
  currentTs: PropTypes.number,
  selectedRoom: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  assets: (state, props) => state.getIn(['assets', props.room.asset]),
  showRecommended: (state) => state.getIn(['mainPage', 'showRecommended']),
  currentTime: (state) => state.get('roomManager').time,
  currentTs: (state) => state.get('footballPage').currentTs,
  selectedRoom: (state) => state.get('footballPage').selectedRoom,
});

const mapDispatchToProps = (dispatch) => ({
  goToRoom: (id) => dispatch(goRoom(id)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomPreview);
