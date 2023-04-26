/* eslint-disable
  no-underscore-dangle,
  no-fallthrough,
  no-param-reassign,
  default-case,
  no-unused-expressions,
  no-sequences,
  one-var,
  react/prop-types,
  no-unused-vars,
  no-shadow,
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { color, TeamAColor, TeamBColor } from '../../styles-constants';
import { getTeamName } from '../../containers/MainPage/FootballPage/mocks/utils';
import { getMatchData, getMatchEvents } from '../../containers/MainPage/FootballPage/mocks/matchesData';
import TeamLogo from '../../containers/MainPage/FootballPage/TeamLogo/TeamLogo';
import { getFormattedTime } from '../../utils/time';
import CircularProgress from '../CircularProgress';
// import GoalIcon from '../../containers/MainPage/FootballPage/EventIcon/GoalIcon';
// import PassInterception from '../../containers/MainPage/FootballPage/EventIcon/PassInterception';
// import PassIcon from '../../containers/MainPage/FootballPage/EventIcon/PassIcon';
// import SaveIcon from '../../containers/MainPage/FootballPage/EventIcon/SaveIcon';
// import ThrowInIcon from '../../containers/MainPage/FootballPage/EventIcon/ThrowInIcon';
// import CardIcon from '../../containers/MainPage/FootballPage/EventIcon/CardIcon';
// import FreeKickIcon from '../../containers/MainPage/FootballPage/EventIcon/FreeKick';
// import GateKick from '../../containers/MainPage/FootballPage/EventIcon/GateKick';
// import CornerIcon from '../../containers/MainPage/FootballPage/EventIcon/CornerIcon';
// import ShotOffTargetIcon from '../../containers/MainPage/FootballPage/EventIcon/ShotOffTargetIcon';
// import OffsideIcon from '../../containers/MainPage/FootballPage/EventIcon/OffsideIcon';

export const LeftWidgetInfo = styled.div`
  height: ${({ isShow }) => isShow ? '140px' : '0px'};
  flex: 1 1 auto;
  display: flex;
  padding-top: 21.5px;
  align-items: center;
  flex-direction: column;
  .team-logo {
    display: flex;
    justify-content: space-between;
    font-size: 13pt;
    letter-spacing: 2px;
    text-transform: uppercase;
    &.right {
      justify-content: flex-end;
    }
    &.left {
      justify-content: flex-start;
    }
  }
`;

export const WidgetLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-height: 35px;
  }
`;

export const RightWidgetInfo = styled.div`
  height: ${({ isShow }) => isShow ? '140px' : '0px'};
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  padding-top: 21.5px;
  align-items: center;
`;

export const CentralRightWidgetPlace = styled.div`
  display: flex;
  align-items: center;
`;

export const WidgetWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 670px;
  .logo-wrp {
    width: 20px;
    height: 20px;
    svg {
      width: 20px;
      height: 20px;
      color: #ffffff;
      margin-right: 10px;
    }
  }
`;

export const MainWidgetWrapper = styled.div`
  display: flex;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${({ isShow }) => isShow ? '140px' : '0px'};
  opacity: ${({ isShow }) => isShow ? 1 : 0};
  transition: height 300ms, opacity 300ms;
  background-color: ${color.primary};
  z-index: 3;
  justify-content: center;
`;

export const WidgetScoreWrapper = styled.div`
  display: flex;
  margin: 0 15px;
`;

export const CentralLeftWidgetPlace = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const Value = styled.div`
  padding: 8px 10px;
  &.left {
    color: ${color.teamAColor};
  }
  &.right {
    color: ${color.teamBColor};
  }
`;

export const Score = styled.div`
  display: inline-block;
  transform: skew(-20deg);
  padding: 5px;
  background-color: ${({ color }) => color};
  min-height: 41px;
  div {
    transform: skew(20deg);
    display: flex;
    justify-content: center;
  }
  :nth-child(1) {
    border-radius: 3px 0 0 3px;
    font-size: 18pt;
    font-weight: 500;
    width: 35px;
  }
  :nth-child(2) {
    min-width: 60px;
    .half {
      font-size: 6pt;
      padding-left: 9px;
      letter-spacing: 1px;
      color: ${color.grayFontColor};
    }
  }
  :nth-child(3) {
    border-radius: 0 3px 3px 0;
    font-size: 18pt;
    font-weight: 500;
    width: 35px;
  }
`;

export const TotalValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  .label {
    margin: 0 10px 0 5px;
    letter-spacing: 1px;
    font-size: 8pt;
    text-transform: none;
    color: ${color.grayFontColor};
  }
  .sum {
    font-size: 10pt;
    font-weight: 500;
    letter-spacing: 1px;
  }
`;

export const ProgressWrapper = styled.div`
  transform: rotate(90deg);
`;

export class Widget extends React.PureComponent {
  static propTypes = {
    isShow: PropTypes.bool,
  }
  componentWillMount() {
    this.setState({ currentEvent: {} });
  }
  componentDidMount() {
    this.redrawWidget();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentEvent && nextProps.currentEvent !== this.props.currentEvent) {
      this.setState({ currentEvent: nextProps.currentEvent });
    }
  }
  redrawWidget() {
    const { currentEvent } = this.state;
    this.canvas = document.getElementById('widget');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // Field
    this.ctx.beginPath();
    this.ctx.fillStyle = color.teamAColor;
    this.ctx.moveTo(208, 15);
    this.ctx.lineTo(512, 15);
    this.ctx.lineTo(555, 115);
    this.ctx.lineTo(165, 115);
    this.ctx.fill();
    // Perimetr
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.moveTo(215, 19);
    this.ctx.lineTo(505, 19);
    this.ctx.lineTo(540, 105);
    this.ctx.lineTo(180, 105);
    this.ctx.lineTo(216, 19);
    this.ctx.stroke();
    // CentralY line
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.moveTo(360, 19);
    this.ctx.lineTo(360, 105);
    this.ctx.stroke();
    // Field Shadow
    this.ctx.fillStyle = color.secondLayer;
    this.ctx.beginPath();
    this.ctx.moveTo(175, 115);
    this.ctx.lineTo(545, 115);
    this.ctx.lineTo(550, 125);
    this.ctx.lineTo(170, 125);
    this.ctx.fill();
    // Left Panel
    this.ctx.beginPath();
    // this.ctx.fillStyle = `rgba(${TeamAColor}, ${currentEvent.team === 1 ? 1 : 0.5})`;
    this.ctx.fillStyle = color.teamAColor;
    this.ctx.moveTo(70, 0);
    this.ctx.lineTo(200, 0);
    this.ctx.lineTo(135, 140);
    this.ctx.lineTo(0, 140);
    this.ctx.fill();
    // Right Panel
    this.ctx.beginPath();
    this.ctx.fillStyle = color.teamBColor;
    this.ctx.moveTo(520, 0);
    this.ctx.lineTo(650, 0);
    this.ctx.lineTo(730, 140);
    this.ctx.lineTo(585, 140);
    this.ctx.fill();
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
    return { total, teamA, teamB };
  }
  render() {
    const { isShow, room, currentTs } = this.props;
    const { bets } = room;
    if (isShow) this.redrawWidget();
    let scoreA = room.scoreA,
      scoreB = room.scoreB;
    const events = getMatchEvents(room.id);
    const currentBets = bets.filter((b) => b.timestamp <= currentTs);
    const createdAt = getMatchData(room.id).matchStartTime;
    const sum = this.sum(currentBets);
    events.filter((e) => e.timestamp < currentTs).forEach((e) => {
      if (e.type === 7) e.team === 1 ? scoreA += 1 : scoreB += 1;
    });
    return (
      <MainWidgetWrapper isShow={isShow}>
        <LeftWidgetInfo isShow={isShow}>
          <div style={{ display: 'inline-block' }}>
            <div className="team-logo left">
              <span className="team-name left">{getTeamName(room.teamA.name)}</span>
            </div>
            <CentralLeftWidgetPlace>
              <WidgetLogo>
                <TeamLogo name={room.teamA.name.toLowerCase()} />
              </WidgetLogo>
              <WidgetScoreWrapper>
                <Score color={color.teamAColor}><div>{scoreA}</div></Score>
                <Score color={color.primaryLighted}>
                  <div>{getFormattedTime(createdAt + currentTs, 'mm:ss')}</div>
                  <div className="half">1st half</div>
                </Score>
                <Score color={color.teamBColor}><div>{scoreB}</div></Score>
              </WidgetScoreWrapper>
              <WidgetLogo>
                <TeamLogo name={room.teamB.name.toLowerCase()} />
              </WidgetLogo>
            </CentralLeftWidgetPlace>
            <div className="team-logo right">
              <span className="team-name right">{getTeamName(room.teamB.name)}</span>
            </div>
          </div>
        </LeftWidgetInfo>
        <WidgetWrapper>
          <canvas
            id="widget"
            width="730px"
            height="140px"
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
            }}
          />
        </WidgetWrapper>
        <RightWidgetInfo isShow={isShow}>
          <div style={{ display: 'inline-block' }}>
            <CentralRightWidgetPlace>
              <Value className="left">{`$ ${sum.teamA}`}</Value>
              <ProgressWrapper>
                <CircularProgress
                  size={74}
                  radius={28}
                  strokeWidth={18}
                  bgColor={color.teamBColor}
                  strokeColor={color.teamAColor}
                  showDeadline
                  room={{ deadlineAt: sum.total ? sum.total : 100, createdAt: 0 }}
                  currentTime={sum.total ? sum.teamA : 50}
                />
              </ProgressWrapper>
              <Value className="right">{`$ ${sum.teamB}`}</Value>
            </CentralRightWidgetPlace>
            <TotalValue>
              <div className="label"> In the bank </div>
              <div className="sum"> {`$ ${sum.total}`}</div>
            </TotalValue>
          </div>
        </RightWidgetInfo>
      </MainWidgetWrapper>
    );
  }
}

export default Widget;
