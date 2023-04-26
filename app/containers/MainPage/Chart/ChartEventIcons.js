import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { eventIconBg } from '../../../styles-constants';
import PassIcon from '../FootballPage/EventIcon/PassIcon';
import { EVENT_TYPES } from '../FootballPage/mocks/matchesData';
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

const StyledEvent = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 35px;
  z-index: 3;
  height: 35px;
  border-radius: 29px;
  background: ${eventIconBg};
  animation: pulse 500ms;
  @keyframes pulse {
    0% {
      transform: scale(0.8);
    }
    40% {
      transform: scale(1.2);
    }
    60% {
      transform: scale(0.9);
    }
    80% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  :hover {
    transform: scale(1.2);
    z-index: 6;
  }
  .logo-wrp {
    width: 20px;
    height: 20px;
    flex: 0 20px;
    svg {
      color: #ffffff;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
`;

const getIcon = (type) => {
  switch (type) {
    case EVENT_TYPES.GOAL:
      return <GoalIcon />;
    case EVENT_TYPES.PASS:
      return <PassIcon />;
    case EVENT_TYPES.PASS_INTERCEPTION:
    case EVENT_TYPES.SHOT_BLOCKED:
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

const Event = ({ type, event }) => (
  <StyledEvent style={{ left: `${event.x - 15}px`, top: `${event.y - 30}px` }}>
    <div className="logo-wrp">
      {getIcon(type)}
    </div>
  </StyledEvent>
);

Event.propTypes = {
  type: PropTypes.number,
  event: PropTypes.object,
};

export default class ChartEventLog extends React.PureComponent {
  render() {
    const { events } = this.props;
    return (
      <div>
        {events.filter((e) => e.type !== EVENT_TYPES.NONE).map((e) => (<Event
          key={`${e.timestamp}_icon`}
          event={e}
          type={e.type}
        />))}
      </div>
    );
  }
}

ChartEventLog.propTypes = {
  events: PropTypes.array,
};
