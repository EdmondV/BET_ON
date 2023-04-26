import React from 'react';
import styled from 'styled-components';
import { any, func } from 'prop-types';
import { leftPanelMessage } from 'utils/intl';
import slideRight from 'components/SlideRightAnimation';

import ListItem from './ListItem';

const StyledList = styled.div`
  margin-top: 30px;
  margin-bottom: 14px;
  display: flex;
  animation: ${slideRight} 0.3s 0.5s ease backwards;
  > div {
    flex: 1;
  }
`;

const onClickHandler = (name, rank, onToggleSidebar) => {
  switch (name) {
    case 'rank':
      onToggleSidebar(true, 'leaders');
      break;
    case 'wallet':
      onToggleSidebar(true, 'history');
      break;
    default:
      break;
  }
};

const AccountUserInfoList = ({ balance, rank, dailyProfit, onToggleSidebar }) => (
  <StyledList>
    <ListItem
      onToggleSidebar={onToggleSidebar}
      onClickHandler={onClickHandler}
      icon="rank"
      title={leftPanelMessage('rank')}
      value={rank}
    />
    <ListItem
      onToggleSidebar={onToggleSidebar}
      onClickHandler={onClickHandler}
      icon="wallet"
      title={leftPanelMessage('balance')}
      value={`$ ${balance}`}
    />
    <ListItem
      onToggleSidebar={onToggleSidebar}
      onClickHandler={() => {}}
      icon="profit"
      title={leftPanelMessage('daily_profit')}
      value={`$ ${dailyProfit}`}
    />
  </StyledList>
);

AccountUserInfoList.propTypes = {
  balance: any,
  rank: any,
  dailyProfit: any,
  onToggleSidebar: func,
};

export default AccountUserInfoList;
