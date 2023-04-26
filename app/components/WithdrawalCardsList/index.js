import React from 'react';
import styled from 'styled-components';
import { any } from 'prop-types';
import { FormattedMessage } from 'utils/intl';
import { space } from 'styles-constants';
import { CardListItem } from 'components/WithdrawalCardListItem';

import messages from 'containers/MainPage/DepositPage/messages';

export const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => props.left ? '60%' : '40%'};
`;

const ListHeader = styled.div`
  display: flex;
  padding-bottom: ${space(1)};
  border-bottom: 1px solid #122243;
`;

const HeaderText = styled.span`
  text-transform: uppercase;
  opacity: 0.8;
`;

export default class WithdrawalCardsList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { cards } = this.props;
    return (
      <div>
        <ListHeader>
          <ListItemWrapper left>
            <HeaderText><FormattedMessage {...messages.withdrawalCard} /></HeaderText>
          </ListItemWrapper>
          <ListItemWrapper>
            <HeaderText><FormattedMessage {...messages.operationsStatus} /></HeaderText>
          </ListItemWrapper>
        </ListHeader>
        { cards && cards.map((card) =>
          <CardListItem key={card.id} cardNumber={card.cardNumber} cardStatus={card.status} cardId={card.id} />) }
      </div>
    );
  }
}

WithdrawalCardsList.propTypes = {
  cards: any,
};
