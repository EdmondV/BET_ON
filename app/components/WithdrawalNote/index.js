import React from 'react';
import styled from 'styled-components';
import { any } from 'prop-types';
import { FormattedMessage } from 'utils/intl';
import Icon from 'components/Icon';

const WithdrawalNoteWrapper = styled.div`
  display: flex;
  background: #5396DA;
  padding: 10px 20px 12px 0;
  align-items: center;
  border-radius: 0.25em;
  margin-bottom: 14px;
`;

const IconWrapper = styled.div`
  flex: 0 0 64px;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    background-position: center center;
  }
`;

export default function WithdrawalNote({ messages }) { // messages in props as circular deps warning appeared
  return (
    <WithdrawalNoteWrapper>
      <IconWrapper>
        <Icon name="attentionWhite" width="34px" height="34px" />
      </IconWrapper>
      <div>
        <FormattedMessage {...messages.verifyCardNote} />
      </div>
    </WithdrawalNoteWrapper>
  );
}

WithdrawalNote.propTypes = {
  messages: any,
};
