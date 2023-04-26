import React from 'react';
import styled, { keyframes } from 'styled-components';
import { string, func, any, object, bool } from 'prop-types';
import { browserName } from 'utils/browserDetection';
import { color } from 'styles-constants';
import { FormattedMessage } from 'utils/intl';
import LeaderTab from 'components/LeaderTab';
import LeftPanelHeader from 'components/LeftPanelHeader';
import Loader from 'components/Loader';
import { redirectToRoomCreate } from 'utils/redirects';
import { CreateButton } from './History';
import messages from './messages';

const slideUp = keyframes`{ from { transform: translateY(100%); } to { transform: translateY(0); } }`;


const LeaderWrapper = styled.div`
  margin: 0 auto;
  ${browserName() === 'firefox' && 'overflow: hidden;'}
  flex: 1;
`;

const EtcWrapper = styled.div`
  animation: ${slideUp} 1.5s;
  &:before{
    display: block;
    content: '';
    border-top: ${color.grayFontColor} 1px solid;
    margin-left: 12px;
    padding-top: 10px;
  }
`;

const ScrollWrapper = styled.div`
  margin-top: 14px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  ${browserName() === 'firefox' && `
    position: relative;
    left: 20px;
    margin-left: -20px;
    padding: 0 22px 0 5px; // 22px because border and shadow was cropped when no scrollbar (FF)
  `}
`;

const NoRankMsg = styled.div`
  margin-bottom: 15px;
`;

export default class Leader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.updateInterval = null;
  }

  componentWillMount() {
    this.props.getLeaders();

    this.updateInterval = setInterval(() => this.props.getLeaders(), 20000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    const { leaders, leadersLoaded } = this.props;
    return (
      <LeaderWrapper>
        <LeftPanelHeader route={this.props.route} />
        <ScrollWrapper>
          {(leaders.list && leaders.list.length > 0 && leaders.user && leaders.user.rank > 0) &&
          leaders.list.map((leader) => <LeaderTab key={leader.userId} leader={leader} {...this.props} />)}
          {leaders.list && !leaders.list.find((l) => l.userId === this.props.user.id) && leaders.user && leaders.user.rank > 0 &&
            <EtcWrapper>
              <LeaderTab
                key={leaders.user.id}
                leader={{ ...leaders.user, ...this.props.user }}
                {...this.props}
              />
            </EtcWrapper>}
          {leaders.user && !leaders.user.rank && <div>
            <NoRankMsg>
              <p style={{ whiteSpace: 'pre' }}>
                <FormattedMessage {...messages.leaders_no_rank} />
              </p>
            </NoRankMsg>
            <CreateButton onClick={redirectToRoomCreate}>
              <FormattedMessage {...messages.leaders_create_room} />
            </CreateButton>
          </div>}
          {!leadersLoaded && <Loader />}
        </ScrollWrapper>
      </LeaderWrapper>
    );
  }
}

Leader.propTypes = {
  route: string,
  getLeaders: func,
  leaders: any,
  user: object,
  leadersLoaded: bool,
};
