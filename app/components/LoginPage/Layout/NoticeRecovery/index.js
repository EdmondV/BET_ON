import React from 'react';
import styled from 'styled-components';
import { fontWeight, fontSize, letterSpacing } from 'styles-constants';
import { any } from 'prop-types';
import { FormattedMessage } from 'utils/intl';
import A from 'components/A';
import messages from 'containers/LoginPage/messages';

// FIXME: remove classes (we don't need them with styled components)
// FIXME: remove cascading e.g "& h2"
const NoticeWrapper = styled.div`
  width: 100%;
  text-align: left;
  & h2 {
    margin-top: 10px;
    font-weight: ${fontWeight.normal};
  }
  
  & p {
    opacity: 0.5;
  }
  
  .notice {
    font-size: ${fontSize.small};
    text-transform: none;
    line-height: 14px;
    letter-spacing: ${letterSpacing.medium};
    text-align: center;
    opacity: 0.7;
    margin-top: 20px;
    max-width: 280px;
  }
`;

// FIXME: conditions!
export default class StatSection extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { step1, step2, step3, step4 } = this.props;
    return (
      <NoticeWrapper>
        {step1 &&
        <div>
          <h2><FormattedMessage {...messages.signupPage_restore_header} /></h2>
          <p><FormattedMessage {...messages.signupPage_restore_text} /></p>
        </div>}
        {step2 &&
        <div>
          <h2><FormattedMessage {...messages.signupPage_restore_header} /></h2>
          <p><FormattedMessage {...messages.recoverSent} /></p>
        </div>}
        {step3 &&
        <div>
          <h2><FormattedMessage {...messages.signupPage_restore_header2} /></h2>
          <p><FormattedMessage {...messages.signupPage_restore_text2} /></p>
        </div>}
        {step4 &&
        <div className="notice">
          <FormattedMessage {...messages.signupPage_restore_notice_now} />&nbsp;
          <A to="/"><FormattedMessage {...messages.login} /></A>&nbsp;
          <FormattedMessage {...messages.signupPage_restore_notice_to_play} />
        </div>}
      </NoticeWrapper>
    );
  }
}

// FIXME: :(
StatSection.propTypes = {
  step1: any,
  step2: any,
  step3: any,
  step4: any,
};
