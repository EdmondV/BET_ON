import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CircularProgress from 'components/CircularProgress';
import AnimatedNumber from 'react-animated-number';
import SvgIcon from 'components/SvgIcon';


import { FormattedMessage } from 'utils/intl';
import messages from 'global-messages';

import {
  BetButtonWrapper,
  BetButton,
  BetWrapper,
  BetButtonProfit,
  BetAnimationContainer,
  MembersWrapper,
  MemberIndicator,
} from './CtrlPanelStyles';

import TeamLogo from '../../containers/MainPage/FootballPage/TeamLogo/TeamLogo';


const CtrlWrapper = styled.div`
  position: relative;
  flex: 1;
  margin: 0 auto;
  width: 100%;
`;


export const ProgressWrapper = styled.div`
  width: 188px;
  height: 188px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -94px 0 0 -94px;
  transform: rotate(-90deg);
`;

export default class CtrlPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      lightBulls: false,
      lightBears: false,
      betCoast: 25,
    };
  }
  componentWillUnmount() {
  }
  render() {
    const { makeBet, timeframe, room, currentTs, toggleAnimatedFootballer, isFootballerShow, user } = this.props;
    const { data } = room;
    return (
      <CtrlWrapper>
        {this.state.lightBulls && <BetAnimationContainer className="bull">
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
        </BetAnimationContainer>}
        {this.state.lightBears && <BetAnimationContainer className="bear">
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
        </BetAnimationContainer>}
        <ProgressWrapper>
          <CircularProgress
            size={188}
            radius={91}
            strokeWidth={5}
            bgColor="rgba(255,255,255,.3)"
            showDeadline
            room={room}
            currentTime={currentTs}
            {...this.props}
          />
        </ProgressWrapper>
        <BetButtonWrapper className="bull">
          <BetButton // eslint-disable-line
            className="bull"
            onMouseOver={() => isFootballerShow === false && toggleAnimatedFootballer(true)}
            onMouseOut={() => isFootballerShow === true && toggleAnimatedFootballer(false)}
            onClick={() => makeBet({
              timeframe,
              avatar: '/assets/neymar.png',
              name: user.username,
              bet: this.state.betCoast,
              team: 1,
              user: true,
              id: room.bets.length,
              timestamp: data[data.length - 1].timestamp,
              value: data[data.length - 1].value,
              deadline: {
                timestamp: data[data.length - 1].timestamp + timeframe * 1000,
              },
            })}
          >
            <span className="polygon">
              <SvgIcon icon="triangle" />
            </span>
            <BetButtonProfit className="bull bull-bet">
              <TeamLogo name={room.teamA.name.toLowerCase()} />
            </BetButtonProfit>
            <MembersWrapper className="bull">
              {
                room.bets.map((b) => (
                  b.team === 1 && b.timestamp <= currentTs &&
                  <MemberIndicator
                    className="bull"
                    isCurrentUser={b.user}
                    key={b.id}
                  />
                ))
              }
            </MembersWrapper>
          </BetButton>
        </BetButtonWrapper>
        <BetButtonWrapper className="bear">
          <BetButton // eslint-disable-line
            className="bear"
            onMouseOver={() => isFootballerShow === false && toggleAnimatedFootballer(true)}
            onMouseOut={() => isFootballerShow === true && toggleAnimatedFootballer(false)}
            onClick={() => makeBet({
              timeframe,
              avatar: '/assets/neymar.png',
              name: user.username,
              bet: this.state.betCoast,
              team: 2,
              user: true,
              id: room.bets.length,
              timestamp: data[data.length - 1].timestamp,
              value: data[data.length - 1].value,
              deadline: {
                timestamp: data[data.length - 1].timestamp + timeframe * 1000,
              },
            })}
          >
            <span className="polygon">
              <SvgIcon icon="triangle" />
            </span>
            <BetButtonProfit className="bear bear-bet">
              <TeamLogo name={room.teamB.name.toLowerCase()} />
            </BetButtonProfit>
            <MembersWrapper className="bear">
              {
                room.bets.map((b) => (
                  b.team === 2 && b.timestamp <= currentTs &&
                  <MemberIndicator
                    className="bear"
                    isCurrentUser={b.user}
                    key={b.id}
                  />
                ))
              }
            </MembersWrapper>
          </BetButton>
        </BetButtonWrapper>
        <BetWrapper>
          <span className="minus" role="presentation" onClick={() => this.state.betCoast - 25 > 0 ? this.setState({ betCoast: this.state.betCoast - 25 }) : {}}>-</span>
          <span><FormattedMessage {...messages.bet} /> -&nbsp;</span>
          $ <AnimatedNumber
            component="text"
            initialValue={0}
            duration={300}
            value={this.state.betCoast}
            stepPrecision={0}
          />
          <span className="plus" role="presentation" onClick={() => this.setState({ betCoast: this.state.betCoast + 25 < 1000 ? this.state.betCoast + 25 : this.state.betCoast })}>+</span>
        </BetWrapper>
      </CtrlWrapper>
    );
  }
}

CtrlPanel.propTypes = {
  makeBet: PropTypes.func,
  toggleSpotlightAnimation: PropTypes.func,
  timeframe: PropTypes.number,
  room: PropTypes.object,
  currentTs: PropTypes.number,
  toggleAnimatedFootballer: PropTypes.func,
  isFootballerShow: PropTypes.bool,
  user: PropTypes.object,
};
