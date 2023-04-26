import React from 'react';
import styled from 'styled-components';
import { hexToRgb, color } from 'styles-constants';
import { string, number } from 'prop-types';
import {
  LOG_DEPOSIT_TYPE,
  LogDepositTypeMessages,
  LOG_DEPOSIT_STATUS,
  LogDepositStatusMessages,
} from 'constants/deposit';

import { getFormattedTime } from 'utils/time';
import { determineCardType } from 'utils/creditCardType';

import { CardTypeIcon } from 'components/CardTypeIcon';

const StyledListItem = styled.tr`
  border-top: 1px solid rgba(${hexToRgb('#fff')}, 0.2);
`;

const TableCell = styled.td`
  padding: 12px 0;
  min-height: 56px;
`;

const ColoredCell = styled(TableCell)`
  color: ${({ success }) => success ? color.success : color.danger};
  ${({ inProgress }) => {
    if (inProgress) return 'color: #fff;';
    return '';
  }}
`;

const CardCell = styled.div`
  display: flex;
  align-items: center;
  min-height: 31px;
`;

const TableCardCell = styled(TableCell)`
  width: 220px;
`;

const CardTypeIconWrp = styled.div``;
const CardNum = styled.span`
  padding-left: 14px;
`;

export default class ListItem extends React.PureComponent { // eslint-disable-line
  render() {
    const { type, amount, status, createdAt, walletExtId } = this.props;
    return (
      <StyledListItem>
        <ColoredCell success={type === LOG_DEPOSIT_TYPE.DEPOSIT}>{ amount }</ColoredCell>
        <ColoredCell success={type === LOG_DEPOSIT_TYPE.DEPOSIT}>{ LogDepositTypeMessages(type) }</ColoredCell>
        <TableCardCell>
          <CardCell>
            <CardTypeIconWrp>
              {walletExtId && <CardTypeIcon height="auto" alwaysActive image={determineCardType(walletExtId)} />}
            </CardTypeIconWrp>
            <CardNum>
              { walletExtId }
            </CardNum>
          </CardCell>
        </TableCardCell>
        <ColoredCell
          success={status === LOG_DEPOSIT_STATUS.COMPLETE}
          inProgress={status === LOG_DEPOSIT_STATUS.IN_PROGRESS}
        >{ LogDepositStatusMessages(status) }
        </ColoredCell>
        <TableCell>{ getFormattedTime(createdAt, 'MMM D, HH:mm') }</TableCell>
      </StyledListItem>
    );
  }
}

ListItem.propTypes = {
  type: number,
  amount: number,
  status: number,
  createdAt: number,
  walletExtId: string,
};
