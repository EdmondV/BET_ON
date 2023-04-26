import React from 'react';
import Cookies from 'js-cookie';
import { string, any } from 'prop-types';
import { FormattedMessage } from 'utils/intl';
import styled from 'styled-components';
import { space } from 'styles-constants';
import A from 'components/A';
import { redirectToRoom } from 'utils/redirects';

import messages from 'containers/LoginPage/messages';

import DivideLine from '../DivideLine';
import SocialButtons from '../SocialButtons';

const SectionStyled = styled.section`
  display: block;
  margin-top: ${space(2)};
`;
/* eslint-disable */
class LoginSection extends React.PureComponent { // eslint-disable-line
  render() {
    const { fbLoginStatus } = this.props;
    return (
      <SectionStyled>
        <A style={{ display: 'block' }} to="/forgot-password"> <FormattedMessage {...messages.forgot} /> </A>
        <DivideLine><FormattedMessage {...messages.signupPage_or} /></DivideLine>
        <SocialButtons fbLoginStatus={fbLoginStatus} />
      </SectionStyled>
    );
  }
}

LoginSection.propTypes = {
  fbLoginStatus: any,
};

class RegistrationSection extends React.PureComponent { // eslint-disable-line
  render() {
    const { fbLoginStatus } = this.props;
    return (
      <SectionStyled>
        <DivideLine><FormattedMessage {...messages.signupPage_or} /></DivideLine>
        <SocialButtons fbLoginStatus={fbLoginStatus} />
      </SectionStyled>
    );
  }
}

RegistrationSection.propTypes = {
  fbLoginStatus: any,
};

class FeedbackSection extends React.PureComponent { // eslint-disable-line
  render() {
    const { authorized, activeRoomId } = this.props;
    return (
      <SectionStyled>
        {
          !authorized || !activeRoomId ? <A to="/" style={{ position: 'absolute', top: '100%', left: '50%', width: 60, marginLeft: -30, marginTop: '10px' }}>← Return</A>
          : <A onClick={() => {redirectToRoom(activeRoomId);}} style={{ position: 'absolute', top: '100%', left: '0', right: '0', margin: '10px auto 0' }}>← Return to game</A>
        }
      </SectionStyled>
    );
  }
}

class PasswordRecoverySection extends React.PureComponent { // eslint-disable-line
  render() {
    return <SectionStyled />;
  }
}

export default class BottomSection extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { fbLoginStatus, pathname, activeRoomId } = this.props;
    return (
      <div>
        {pathname === '/' && <LoginSection fbLoginStatus={fbLoginStatus} />}
        {pathname === '/registration' && <RegistrationSection fbLoginStatus={fbLoginStatus} />}
        {pathname === '/feedback' && <FeedbackSection authorized={!!(Cookies.get('session'))} activeRoomId={activeRoomId} />}
        {pathname === '/forgot-password' && <PasswordRecoverySection />}
      </div>
    );
  }
}
/* eslint-enable */
BottomSection.propTypes = {
  pathname: string,
  fbLoginStatus: any,
  activeRoomId: any,
};
