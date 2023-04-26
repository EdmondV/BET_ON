import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TeamLogo from '../FootballPage/TeamLogo/TeamLogo';
import PassIcon from '../FootballPage/EventIcon/PassIcon';
import { EVENT_TYPES, getEventName } from '../FootballPage/mocks/matchesData';
import { getTeamName } from '../FootballPage/mocks/utils';
import GoalIcon from '../FootballPage/EventIcon/GoalIcon';
import PassInterception from '../FootballPage/EventIcon/PassInterception';
import SaveIcon from '../FootballPage/EventIcon/SaveIcon';
import ThrowInIcon from '../FootballPage/EventIcon/ThrowInIcon';
import CardIcon from '../FootballPage/EventIcon/CardIcon';
import FreeKickIcon from '../FootballPage/EventIcon/FreeKick';
import GateKick from '../FootballPage/EventIcon/GateKick';
import CornerIcon from '../FootballPage/EventIcon/CornerIcon';
import ShotOffTargetIcon from '../FootballPage/EventIcon/ShotOffTargetIcon';
import OffsideIcon from '../FootballPage/EventIcon/OffsideIcon';
import { hexToRgb, color } from '../../../styles-constants';
import { getFormattedTime } from '../../../utils/time';

const StyledWrapper = styled.div`
  width: ${({ isWidgetShow }) => isWidgetShow ? '870px' : '330px'};
  transition: transform 300ms ease-out, width 300ms;
  transform: ${({ pos }) => pos ? `translateY(${pos}px)` : 'translateY(0)'};
`;

const StyledEventLog = styled.div`
  position: absolute;
  height: 144px;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: ${({ angle }) => angle === 0 ? 78 : 52}px;
  transition: bottom 300ms;
  overflow: hidden;
  color: rgba(${hexToRgb('#fff')}, 0.8);
  display: flex;
  justify-content: center;
  z-index: 1;
`;

const StyledEvent = styled.div`
  display: flex;
  flex-direction: ${({ teamA }) => teamA ? 'row-reverse' : 'row'};
  align-items: flex-end;
  height: 144px;
  padding-bottom: 52px;
  justify-content: flex-end;
  margin-left: ${({ teamA }) => teamA ? '600px' : '0'};
  margin-right: ${({ teamA }) => teamA ? '0' : '600px'};
  transform: skew(${({ teamA, angle }) => teamA ? angle : -angle}deg);
  .event-wrp {
    margin: 0 10px;
    font-size: 12px;
    width: auto;
    display: inline-block;
    height: 42px;
    padding: 3px 6px;
    background: rgba(${({ teamA }) => teamA ? hexToRgb(color.bearColor) : hexToRgb(color.bullColor)}, 0.6);
    border-radius: 3px;
    color: #ffffff;
    text-align: ${({ teamA }) => teamA ? 'right' : 'left'};
    letter-spacing: 1px;
    .text {
      font-size: 12px;
      text-transform: uppercase;
      white-space: nowrap;
      color: ${color.grayFontColor};
      float: ${({ teamA }) => teamA ? 'left' : 'right'};
    }
    .event-name {
      font-weight: 400;
    }
    > div {
      display: inline-block;
      transform: skew(${({ teamA, angle }) => teamA ? -angle : angle}deg);
    }
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
  }
  .logo-wrp {
    width: 20px;
    height: 20px;
    transform: skew(${({ teamA, angle }) => teamA ? -angle : angle}deg);
    img {
      width: 100%;
      height: auto;
      float: ${({ teamA }) => teamA ? 'left' : 'right'};
    }
    &.team {
      width: 33px;
      img {
        max-height: 20px;
        width: auto;
      }
    }
  }
`;

const getTeamNameById = (room, teamId) => room[teamId === 1 ? 'teamA' : 'teamB'].name;

const getIcon = (type) => {
  switch (type) {
    case EVENT_TYPES.GOAL:
      return <GoalIcon />;
    case EVENT_TYPES.PASS:
      return <PassIcon />;
    case EVENT_TYPES.SHOT_BLOCKED:
    case EVENT_TYPES.PASS_INTERCEPTION:
    case EVENT_TYPES.TACKLE:
      return <PassInterception style={{ width: '14px' }} />;
    case EVENT_TYPES.SAVE:
      return <SaveIcon />;
    case EVENT_TYPES.OUT:
    case EVENT_TYPES.THROW_IN:
      return <ThrowInIcon style={{ width: '15px' }} />;
    case EVENT_TYPES.CARD:
      return <CardIcon />;
    case EVENT_TYPES.FREE_KICK:
      return <FreeKickIcon />;
    case EVENT_TYPES.SHOT:
    case EVENT_TYPES.SHOT_ON_TARGET:
      return <GateKick />;
    case EVENT_TYPES.CORNER:
      return <CornerIcon />;
    case EVENT_TYPES.SHOT_OFF_TARGET:
      return <ShotOffTargetIcon />;
    case EVENT_TYPES.OFFSIDE:
      return <OffsideIcon style={{ width: '14px' }} />;
    default:
      return <PassInterception style={{ width: '14px' }} />;
  }
};

const Event = ({ name, teamName, type, time, team, angle }) => (
  <StyledEvent teamA={team === 1} angle={angle}>
    <div className="logo-wrp team">
      <TeamLogo name={teamName.toLowerCase()} />
    </div>
    <div className="event-wrp">
      <div className="text">{getTeamName(teamName)}</div><br />
      <div>
        <span className="logo-wrp">{getIcon(type)}</span>
        <span className="time">{getFormattedTime(time, 'mm:ss')} - </span>
        <span className="event-name">{name}</span>
      </div>
    </div>
  </StyledEvent>
);

Event.propTypes = {
  name: PropTypes.string,
  teamName: PropTypes.string,
  type: PropTypes.number,
  time: PropTypes.number,
  team: PropTypes.number,
  angle: PropTypes.number,
};

export default class ChartEventLog extends React.PureComponent {
  componentWillMount() {
    this.setState({
      events: [...this.props.events].filter((e) => e.type !== EVENT_TYPES.NONE),
      shown: [],
      eventLogPos: 144,
      angle: [0, 12, 18][this.props.selectedProjection],
    });
  }

  componentWillReceiveProps({ room, events, selectedProjection }) {
    const time = room.data && room.data.length ? room.data[room.data.length - 1].timestamp : 0;
    const filteredEvents = events.filter((e) => e.type !== EVENT_TYPES.NONE);
    this.setState({ events: filteredEvents });

    const event = filteredEvents.find((e) => e.timestamp === time);

    if (this.props.room.video.id !== room.video.id) {
      const initialPos = 144 - (filteredEvents.filter((e) => e.timestamp <= time).length * 144);

      this.setState({ eventLogPos: initialPos });
    }

    if (this.props.selectedProjection !== selectedProjection) {
      this.setState({
        angle: [0, 12, 18][selectedProjection],
      });
    }

    if (event) {
      this.setState({
        team: event.team,
        angle: [0, 12, 18][selectedProjection],
        eventLogPos: this.state.eventLogPos - 144,
      });
    }
  }

  render() {
    const { room, createdAt, isWidgetShow } = this.props;
    const { events, team, angle } = this.state;
    return (
      <StyledEventLog teamA={team === 1} angle={angle}>
        <StyledWrapper pos={this.state.eventLogPos} isWidgetShow={isWidgetShow}>
          {events.filter((e) => e.type !== EVENT_TYPES.NONE).map((e) => (<Event
            key={e.timestamp}
            team={e.team}
            name={getEventName(e)}
            teamName={getTeamNameById(room, e.team)}
            type={e.type}
            time={createdAt + e.timestamp}
            angle={angle}
          />))}
        </StyledWrapper>
      </StyledEventLog>
    );
  }
}

ChartEventLog.propTypes = {
  events: PropTypes.array,
  room: PropTypes.object,
  createdAt: PropTypes.number,
  isWidgetShow: PropTypes.bool,
  selectedProjection: PropTypes.number,
};
