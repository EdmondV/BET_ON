import React from 'react';
import { any, func } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'utils/intl';
import messages from 'containers/LoginPage/messages';
import { color } from 'styles-constants';
import Button from 'components/Button';

// styles
import {
  ButtonsWrapper,
  FacebookBtn,
  GoogleBtn,
  ErrorNotice,
} from './SocialButtonsStyles';

const FbEmailAccessWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(0,0,0,0.4);
  z-index: 10;
`;

const FbEmailAccessPopup = styled.div`
  width: 350px;
  border-radius: 5px;
  background: ${color.primaryLighted};
  padding: 20px 15px;
  margin-top: -100px;
`;

const FbEmailAccessButtonsWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
`;

const PopupButtonWrapper = styled.div`
  width: 150px;
`;

class SocialButtons extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: func,
    fbLoginStatus: any,
  };
  componentWillMount() {
    this.setState({ showErr: false, showFbEmailAccess: false });
  }
  /* eslint-disable */
  onFbLoginStatusChange(response) {
    if (!response.authResponse) {
      FB.getAuthResponse((res) => this.onFbLoginStatusChange(res));
      return;
    }
    if (response.authResponse && response.authResponse.grantedScopes && response.authResponse.grantedScopes.indexOf('email') === -1) {
      this.setState({ fbEmailPermissionStatus: 'declined', showFbEmailAccess: true });
      return;
    }
    FB.api('/me', {fields: 'first_name, last_name, email'}, (res) => {
      if (!res.email) {
        FB.api(`/${response.authResponse.userID}/permissions`, (r) => {
          const emailPermission = r.data.find((p) => p.permission === 'email');
          this.setState({ fbEmailPermissionStatus: emailPermission.status, showFbEmailAccess: true });
        });
        return;
      }
      this.props.dispatch({
        type: 'FB_AUTH_REQUEST',
        payload: {
          id: res.id,
          email: res.email,
          username: `${res.first_name} ${res.last_name}`,
          token: response.authResponse.accessToken,
          expiresIn: response.authResponse.expiresIn,
        },
      });
    });
  }
  onFbLogin(rerequest) {
    this.onHideFacebookEmailPopupError();
    if (rerequest) {
      FB.login((res) => this.onFbLoginStatusChange(res), { scope: 'email', auth_type: 'rerequest', return_scopes: true });
    } else if (this.props.fbLoginStatus.status !== 'connected') {
      FB.login((res) => this.onFbLoginStatusChange(res), { scope: 'email', return_scopes: true });
    } else {
      this.onFbLoginStatusChange(this.props.fbLoginStatus);
    }
  }
  /* eslint-enable */
  onHideFacebookEmailPopupError() {
    this.setState({ showFbEmailAccess: false });
  }
  showNotice(name) {
    this.setState({ showErr: true });
    this.props.dispatch({
      type: 'CLICK_SOCIAL',
      meta: {
        analytics: {
          type: `CLICK_${name}`,
          category: 'interface',
        },
      },
    });
  }
  render() {
    return (
      <ButtonsWrapper>
        <FacebookBtn onClick={() => this.onFbLogin()}>Facebook</FacebookBtn>
        <GoogleBtn onClick={() => this.showNotice('google')}>Google+</GoogleBtn>
        {this.state.showErr &&
        <ErrorNotice><FormattedMessage {...messages.signupPage_sorryNotice} /></ErrorNotice>}
        {this.state.showFbEmailAccess &&
        <FbEmailAccessWrapper>
          <FbEmailAccessPopup>
            {this.state.fbEmailPermissionStatus === 'declined' ?
              <div>
                <p><FormattedMessage {...messages.loginPage_share_fb_email} /></p>
                <FbEmailAccessButtonsWrapper>
                  <PopupButtonWrapper>
                    <Button onClick={() => this.onFbLogin(true)}>
                      <FormattedMessage {...messages.loginPage_share} />
                    </Button>
                  </PopupButtonWrapper>
                  <PopupButtonWrapper>
                    <Button theme="transparent" onClick={() => this.onHideFacebookEmailPopupError()}>
                      <FormattedMessage {...messages.loginPage_no_thanks} />
                    </Button>
                  </PopupButtonWrapper>
                </FbEmailAccessButtonsWrapper>
              </div>
              :
              <div>
                <p><FormattedMessage {...messages.loginPage_fill_fb_email} /></p>
                <FbEmailAccessButtonsWrapper>
                  <Button theme="transparent" onClick={() => this.onHideFacebookEmailPopupError()}>
                    <FormattedMessage {...messages.loginPage_fill_fb_email_ok} />
                  </Button>
                </FbEmailAccessButtonsWrapper>
              </div>
            }
          </FbEmailAccessPopup>
        </FbEmailAccessWrapper>}
      </ButtonsWrapper>
    );
  }
}

export default connect(null, (dispatch) => ({ dispatch }))(SocialButtons);
