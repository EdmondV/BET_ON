import React from 'react';
import PropTypes from 'prop-types';
import TeamLogo from '../FootballPage/TeamLogo/TeamLogo';
import { getTeamName } from '../FootballPage/mocks/utils';
import { getFormattedTime } from '../../../utils/time';
import { getMatchData, getMatchEvents } from '../FootballPage/mocks/matchesData';
import { calc } from './utils';
import {
  HeaderWrapper,
  RoomInfoWrapper,
  Value,
  TeamsCountWrapper,
  TeamCount,
  LeftScoreWrapper,
  CentralScoreWrapper,
  RightScoreWrapper,
  TeamsScore,
  Total,
  ScoreWrapper,
} from './ScorePanelStyles';
/* eslint-disable
 no-return-assign,
 func-names,
 one-var,
 prefer-const,
 consistent-return,
 no-plusplus,
 no-cond-assign,
 no-sequences,
 no-unused-expressions,
 */

export class ScorePanel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.setState({ sum: {} });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentBets !== this.props.currentBets) {
      this.setState({ sum: calc(nextProps.currentBets) });
    }
  }
  render() {
    const { room, currentTs, isWidgetShow } = this.props;
    const { sum } = this.state;
    let scoreA = room.scoreA,
      scoreB = room.scoreB;
    const events = getMatchEvents(room.id);
    const createdAt = getMatchData(room.id).matchStartTime;
    events.filter((e) => e.timestamp < currentTs).forEach((e) => {
      if (e.type === 7) e.team === 1 ? scoreA += 1 : scoreB += 1;
    });
    return (
      <HeaderWrapper isWidgetShow={isWidgetShow}>
        <RoomInfoWrapper>
          <ScoreWrapper>
            <LeftScoreWrapper>
              <div className="team-logo left">
                <span className="team-name">{getTeamName(room.teamA.name)}</span>
              </div>
              <Value className="left">{`$ ${sum.teamA}`}</Value>
            </LeftScoreWrapper>
            <CentralScoreWrapper>
              <TeamsScore>
                <div className="logo-wrp">
                  <TeamLogo name={room.teamA.name.toLowerCase()} />
                </div>
                <div className="central">
                  <div className="score">{`${scoreA} - ${scoreB}`}</div>
                  <div className="time">{getFormattedTime(createdAt + currentTs, 'mm:ss')}</div>
                </div>
                <div className="logo-wrp">
                  <TeamLogo name={room.teamB.name.toLowerCase()} />
                </div>
              </TeamsScore>
              <TeamsCountWrapper>
                <TeamCount team="bull" width={sum.f || 1}>
                  <div className="countIndicator" />
                </TeamCount>
                <TeamCount team="bear" width={sum.s || 1}>
                  <div className="countIndicator" />
                </TeamCount>
              </TeamsCountWrapper>
            </CentralScoreWrapper>
            <RightScoreWrapper>
              <div className="team-logo right">
                <span className="team-name">{getTeamName(room.teamB.name)}</span>
              </div>
              <Value className="right">{`$ ${sum.teamB}`}</Value>
            </RightScoreWrapper>
          </ScoreWrapper>
          <Total>
            <div className="total">
              <div className="label"> In the bank </div>
              <div className="sum"> {`$ ${sum.total}`}</div>
            </div>
          </Total>
        </RoomInfoWrapper>
      </HeaderWrapper>
    );
  }
}

ScorePanel.propTypes = {
  room: PropTypes.object,
  currentTs: PropTypes.number,
  isWidgetShow: PropTypes.bool,
  currentBets: PropTypes.array,
};

export default ScorePanel;
