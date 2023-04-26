import React from 'react';
import styled from 'styled-components';
import { fontWeight } from 'styles-constants';
import { FormattedMessage } from 'utils/intl';
import messages from 'containers/LoginPage/messages';

// FIXME: remove cascading
const NoticeWrapper = styled.div`
  width: 100%;
  text-align: left;
  & h2 {
    margin-top: 0;
    font-weight: ${fontWeight.normal};
  }
`;

// FIXME: conditions!
export default class NoticeFeedback extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <NoticeWrapper>
        <div>
          <h2><FormattedMessage {...messages.feedback_sent_title} /></h2>
          <p><FormattedMessage {...messages.feedback_sent_text} /></p>
        </div>
      </NoticeWrapper>
    );
  }
}
