import React from 'react';
import styled from 'styled-components';
import { hexToRgb } from 'styles-constants';
import { any } from 'prop-types';
import { FormattedMessage } from 'utils/intl';

import messages from 'containers/MainPage/DepositPage/messages';

import ListItem from './ListItem';

const OperationsListTable = styled.table`
  width: 100%;
  font-size: 14px;
`;

const StyledHead = styled.thead`
  color: rgba(${hexToRgb('#ffffff')}, 0.4);
  padding-bottom: 4px;
`;

const TableCell = styled.td`
  padding: 10px 0;
`;

export default class OperationsList extends React.PureComponent { // eslint-disable-line
  render() {
    const { logs } = this.props;
    return (
      <OperationsListTable>
        <StyledHead>
          <tr>
            <TableCell><FormattedMessage {...messages.operationsSum} /> ($)</TableCell>
            <TableCell><FormattedMessage {...messages.operationsOperation} /></TableCell>
            <TableCell><FormattedMessage {...messages.operationsSource} /></TableCell>
            <TableCell><FormattedMessage {...messages.operationsStatus} /></TableCell>
            <TableCell><FormattedMessage {...messages.operationsDate} /></TableCell>
          </tr>
        </StyledHead>
        <tbody>
          {
            logs.map(
              (log, i) => <ListItem
                key={i}
                status={log.status}
                walletExtId={log.walletExtId}
                type={log.type}
                createdAt={log.createdAt}
                amount={log.amount}
              />
            )
          }
        </tbody>
      </OperationsListTable>
    );
  }
}

OperationsList.propTypes = {
  logs: any,
};
