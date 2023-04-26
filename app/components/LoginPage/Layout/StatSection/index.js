import React from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';
import { hexToRgb, color, fontFamily, fontWeight } from 'styles-constants';
import { FormattedMessage } from 'utils/intl';
import AnimatedNumber from 'react-animated-number';
import messages from 'containers/LoginPage/messages';

const StatSectionWidth = 960;

const StatWrapper = styled.div`
  width: ${StatSectionWidth}px;
  display: flex;
  justify-content: space-between;
  color: #fff;
  
  > div {
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-start;
    border-right: 1px solid rgba(${hexToRgb(color.mainFontColor)}, 0.4);
    text-align: center;
    width: 33.3%;
    align-items: center;
    height: 100px;
    box-sizing: border-box;
    > span:first-child {
      font-size: 36px;
      font-weight: 300;
      font-family: ${fontFamily.heading};
    }
    > span:last-child {
      font-size: 18px;
      opacity: 0.4;
      font-weight: ${fontWeight.normal};
      font-family: ${fontFamily.heading};
      max-width: 170px;
      display: flex;
    }
  }
  > div:last-child {
    border-right: none;
  }
`;

const duration = 1000;
const round = (n) => (n && n.toFixed) ? n.toFixed(2) : 0;
const format = (n) => (n && n.replace) ? n.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') : 0;

export default class StatSection extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    stats: object,
  }
  render() {
    return (
      <StatWrapper>
        <div>

          {this.props.stats && this.props.stats.totalWinnings && <span>
            ᗸ <AnimatedNumber
              component="text"
              initialValue={0}
              duration={duration}
              formatValue={(n) => format(round(n))}
              value={this.props.stats ? this.props.stats.totalWinnings : 0}
            />
          </span>}
          <span><FormattedMessage {...messages.signupPage_totalWin} /></span>
        </div>
        <div>
          {this.props.stats && this.props.stats.totalPlayers && <span>
            <AnimatedNumber
              component="text"
              initialValue={0}
              duration={duration}
              formatValue={(n) => format(`${Math.round(n)}`)}
              value={this.props.stats.totalPlayers}
            />
          </span>}
          <span><FormattedMessage {...messages.signupPage_players} /></span>
        </div>
        <div>
          {this.props.stats && this.props.stats.activeRooms && <span>
            <AnimatedNumber
              component="text"
              initialValue={0}
              duration={duration}
              formatValue={(n) => format(`${Math.round(n)}`)}
              value={this.props.stats ? this.props.stats.activeRooms : 0}
            />
          </span>}
          <span><FormattedMessage {...messages.signupPage_openedRooms} /></span>
        </div>
      </StatWrapper>
    );
  }
}
