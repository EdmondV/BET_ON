import React from 'react';
import styled from 'styled-components';
import { bool, any } from 'prop-types';
import { FormattedMessage } from 'utils/intl';

import Profileform from './ProfileForm';

const InfoField = styled.div`
  opacity: 0.6;
  text-align: left;
  line-height: 1.55;
`;

export default class AccountSecondAside extends React.PureComponent {  // eslint-disable-line
  render() {
    const { messages } = this.props;
    return (
      <div>
        <InfoField><FormattedMessage {...messages.accountEditProfileInfo} /></InfoField>
        <Profileform {...this.props} secondAsideOpened={this.props.show} />
      </div>
    );
  }
}

AccountSecondAside.propTypes = {
  messages: any,
  show: bool,
};
