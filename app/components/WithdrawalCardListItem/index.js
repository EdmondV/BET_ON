import React from 'react';
import { Link } from 'react-router';
import { determineCardType } from 'utils/creditCardType';
import styled from 'styled-components';
import { string, number } from 'prop-types';
import { CARD_URL_PREFIX } from 'utils/redirects';
import { CardTypeIcon } from 'components/CardTypeIcon';
import { CARD_STATUS, cardStatusMessages } from 'constants/deposit';

import { depositPageMessage } from 'utils/intl';

const CardListWrapper = styled.div`
  display: flex;
  margin-top: 7px;
`;

const CardNumber = styled.div`
  font-size: 16px;
`;

const ItemWrapper = styled.div`
  padding-left: 21px;
`;

const CardStatus = styled.div`
  font-size: 16px;
`;

const WithDrawalWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StatusAndActionWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  justify-content: space-between;
`;

const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => props.left ? '60%' : '40%'};
`;

// Links to
// 1) Initial card verification (send first application) (status: unapproved)
// 2) OR To chat with support (status: declined)
const ToWithdrawal = styled(Link)`
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 50%, transparent 50%, transparent 100%);
  font-size: 14px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  padding: 8px 12px;
  border: 1px solid transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
`;

export class CardListItem extends React.PureComponent { // eslint-disable-line
  render() {
    return (
      <CardListWrapper>
        <ListItemWrapper left>
          <div>
            <CardTypeIcon
              alwaysActive
              image={
                determineCardType(this.props.cardNumber) || 'visa'
              }
            />
          </div>
          <ItemWrapper>
            <CardNumber>{this.props.cardNumber}</CardNumber>
          </ItemWrapper>
        </ListItemWrapper>
        <StatusAndActionWrapper>
          <CardStatus>
            {cardStatusMessages(this.props.cardStatus)}
          </CardStatus>
          <WithDrawalWrapper>
            <ToWithdrawal to={{ pathname: CARD_URL_PREFIX, query: { id: this.props.cardId } }}>
              { this.props.cardStatus === CARD_STATUS.APPROVED
                ? depositPageMessage('cardButtonWithdraw') // withdraw
                : depositPageMessage('cardButtonVerify') // verify
              }
            </ToWithdrawal>
          </WithDrawalWrapper>
        </StatusAndActionWrapper>
      </CardListWrapper>
    );
  }
}

CardListItem.propTypes = {
  cardNumber: string,
  cardStatus: number,
  cardId: string,
};
