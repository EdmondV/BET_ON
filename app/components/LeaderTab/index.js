import React from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';
import Avatar from 'components/Avatar';
import { fontSize } from 'styles-constants';

import {
  StyledLeaderTab,
  TabContentWrapper,
  IndexWrapper,
  RoomInfoWrapper,
  StyledProfitWrapper,
  StyledUsernameWrapper,
  StyledCurrentUserMark,
} from './LeaderTabStyles';

const AvatarWrapper = styled.div`
  float: left;
  margin-right: 5px;
`;
const avatarStyles = {
  width: '27px',
  height: '27px',
  fontSize: fontSize.small,
  margin: '0 6px 0 10px',
};

export default class LeaderTab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { leader, user } = this.props;
    const index = leader.rank <= 10 ? leader.rank / 8 : 0;
    return (
      <StyledLeaderTab style={{ animationDelay: `${index}s` }} {...this.props}>
        <TabContentWrapper>
          <IndexWrapper {...this.props}>
            <span>{leader.rank}</span>
          </IndexWrapper>
          <RoomInfoWrapper>
            <AvatarWrapper>
              <Avatar
                customCss={avatarStyles}
                avatar={user.id === leader.userId ? user.avatar : leader.avatar}
                initials={user.id === leader.userId ? user.username.substring(0, 2) : leader.username.substring(0, 2)}
              />
            </AvatarWrapper>
            <div>
              <StyledUsernameWrapper {...this.props}>{leader.username}</StyledUsernameWrapper>
              <StyledProfitWrapper>ᗸ {(leader && leader.won && leader.won.toFixed) ? leader.won.toFixed(2) : 0}</StyledProfitWrapper>
            </div>
          </RoomInfoWrapper>
        </TabContentWrapper>
        {leader.userId === user.id && <StyledCurrentUserMark />}
      </StyledLeaderTab>
    );
  }
}

LeaderTab.propTypes = {
  leader: object,
  user: object,
};
