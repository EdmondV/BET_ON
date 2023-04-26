import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'utils/intl';
import A from 'components/A';
import { color, hexToRgb, fontWeight, fontSize } from 'styles-constants';
import messages from 'containers/LoginPage/messages';

import blockIcon from 'components/LoginPage/Icons/block_icon.svg';
import mail from 'components/LoginPage/Icons/mail.svg';

const ErrorWrapper = styled.div`
  width: 300px;
  text-align: left;
  padding: 20px 30px;
  border-radius: 5px;
  border: 1px solid ${color.danger};
  margin-top: 20px;
  h2 {
    margin: 0;
    color: ${color.danger};
    font-size: ${fontSize.heading};
    height: ${(props) => props.active ? '60px' : '30px'};
    padding-right: 15px;
    display: block;
    &:before {
      display: ${(props) => props.active ? 'block' : 'none'};
      content: '';
      float: left;
      background: url(${blockIcon}) no-repeat;
      width: 60px;
      height: 60px;
      background-size: contain;
      margin-left: -15px;
      margin-top: -5px;
    }
  }
  p {
    margin: 5px 0;
    > span {
      font-size: ${(props) => props.active ? fontSize.small : fontSize.body};
      color: ${(props) => props.active ? `rgba(${hexToRgb(color.mainFontColor)}, 0.6)` : `rgba(${hexToRgb(color.mainFontColor)}, 1)`};
    }
  }
  a {
    color: ${(props) => props.active ? color.mainFontColor : '#5294de'};
    font-weight: ${(props) => props.active ? fontWeight.lightBold : fontWeight.regular};
    &:before {
      content: '';
      display: ${(props) => props.active ? 'block' : 'none'};
      float: left;
      background: url(${mail}) no-repeat;
      width: 27px;
      height: 20px;
      background-size: contain;
    }
  }
`;

export default class ErrorRestore extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { noAccount, blockAccount } = this.props;
    return (
      <ErrorWrapper active={blockAccount}>
        {noAccount &&
        <div>
          <h2><FormattedMessage {...messages.signupPage_restore_error_header} /></h2>
          <p><FormattedMessage {...messages.signupPage_restore_error_text} /></p>
          <A to="/registration"><FormattedMessage {...messages.signupPage_restore_signup} />?</A>
        </div>}
        {blockAccount &&
        <div>
          <h2><FormattedMessage {...messages.signupPage_block_account_header} /></h2>
          <p><FormattedMessage {...messages.signupPage_block_account_text} /></p>
          <a href="mailto:support@tradingrooms.com">Support@tradingrooms.com</a>
        </div>}
      </ErrorWrapper>
    );
  }
}

ErrorRestore.propTypes = {
  blockAccount: bool,
  noAccount: bool,
};
