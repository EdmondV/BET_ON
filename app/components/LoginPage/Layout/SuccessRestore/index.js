import React from 'react';
import styled from 'styled-components';
import { bool } from 'prop-types';
import { FormattedMessage } from 'utils/intl';
import { color } from 'styles-constants';
import messages from 'containers/LoginPage/messages';

import letter from 'components/LoginPage/Icons/mail_TR.svg';
import checkMark from 'components/LoginPage/Icons/check_pass.svg';

const SuccessWrapper = styled.div`
  width: 300px;
  text-align: left;
  box-sizing: border-box;
  padding: 20px ${(props) => props.active ? '15px' : '30px'};
  border-radius: 5px;
  border: 1px solid ${color.success};
  margin-top: 20px;
  > p {
    margin: ${(props) => props.active ? '0' : '10px 0 0 60px'};
  }
  &:before {
    content: '';
    float: left;
    background: url(${(props) => props.active ? letter : checkMark}) no-repeat;
    width: ${(props) => props.active ? '75px' : '45px'};
    height: 62px;
    background-size: contain;
    display: inline-block;
    color: ${color.success};
    margin-top: ${(props) => props.active ? '-15px' : '10px'};
  }
`;

export default class SuccessRestore extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { sentRecovery, successRecovery } = this.props;
    return (
      <SuccessWrapper active={sentRecovery}>
        {sentRecovery &&
        <p><FormattedMessage {...messages.signupPage_restore_success_text} /></p>}
        {successRecovery &&
        <p><FormattedMessage {...messages.signupPage_restore_success_text2} /></p>}
      </SuccessWrapper>
    );
  }
}

SuccessRestore.propTypes = {
  sentRecovery: bool,
  successRecovery: bool,
};
