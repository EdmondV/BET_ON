import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


import BrcLogo from './BRC.png';
import PsgLogo from './PSG.png';
import RmaLogo from './RMA.png';
import BraLogo from './BRA.png';
import GerLogo from './GER.png';
import S04Logo from './S04.png';
import DorLogo from './DOR.png';
import SpmLogo from './SPM.png';
import RkaLogo from './RKA.png';

import { getTeamName } from '../mocks/utils';

const Logos = {
  BRC: BrcLogo,
  BAR: BrcLogo,
  PSG: PsgLogo,
  RMA: RmaLogo,
  RMD: RmaLogo,
  BRA: BraLogo,
  GER: GerLogo,
  DOR: DorLogo,
  S04: S04Logo,
  SPM: SpmLogo,
  RKA: RkaLogo,
};

const getLogo = (name) => Logos[name];

const StyledPreloadingScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: opacity 500ms ease-out;
  opacity: ${({ hide }) => hide ? '0' : '1'};
  .team-logo {
    width: 50%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 40px;
    opacity: 0.6;
    img {
      height: 75%;
      width: auto;
    }
    &.first {
      .text {
        margin-top: 20px;
      }
    }
    &.second {
      top: auto;
      bottom: 0;
      .text {
        margin-bottom: 20px;
      }
    }
    .text {
      font-size: 36px;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
`;

export default class PreloadingScreen extends React.PureComponent {
  render() {
    const { room } = this.props;

    return (
      <StyledPreloadingScreen hide={this.props.hide}>
        <div className="team-logo first">
          <img src={getLogo(room.teamA.name)} alt={getTeamName(room.teamA.name)} />
          <div className="text">{getTeamName(room.teamA.name)}</div>
        </div>
        <div className="team-logo second">
          <div className="text">{getTeamName(room.teamB.name)}</div>
          <img src={getLogo(room.teamB.name)} alt={getTeamName(room.teamB.name)} />
        </div>
      </StyledPreloadingScreen>
    );
  }
}

PreloadingScreen.propTypes = {
  room: PropTypes.object,
  hide: PropTypes.bool,
};
