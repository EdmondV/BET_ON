import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import Button from 'components/Button/StyledButton';
import { FormattedMessage } from 'utils/intl';
import messages from 'global-messages';

export const StyledNewRoomBtn = styled(Button)`
  flex-shrink: 0;
  display: inline-block;
  text-transform: none;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  height: 50px;
  width: 85px;
  padding: 0 15px;
  box-shadow: inset 0 0 15px rgba(255,255,255,0.6);
  transition: box-shadow 300ms ease 0s;
  border: 1px solid #000c2a;
  cursor: pointer;
  letter-spacing: 0;
`;

export default function NewRoomBtn({ onClick }) {
  return (
    <StyledNewRoomBtn onClick={onClick}>
      <FormattedMessage {...messages.new} />
      <br />
      <FormattedMessage {...messages.room} />
    </StyledNewRoomBtn>
  );
}

NewRoomBtn.propTypes = {
  onClick: func.isRequired,
};
