import React from 'react';
import styled from 'styled-components';
import { color, hexToRgb } from 'styles-constants';
import { func, bool } from 'prop-types';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { FormattedMessage } from 'utils/intl';

import { toggleLogoutPopup, logoutRequest as logout } from 'containers/MainPage/actions';
import { toggleEditProfile } from 'modules/settings/actions';

const DemoPopupWrapper = styled.div`
  position: fixed;
  top: 45%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1100;
  max-width: 420px;
  box-shadow: 0 6px 12px 0 rgba(${hexToRgb(color.lightBlue)}, 0.22);
  padding: 10px 20px 20px;
  background-color: ${color.lightBlue};
`;

const StyledMessage = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 1.44;
`;

const BtnGroupWrapper = styled.div`
  margin-top: 28px;
  display: flex;
  > div {
    &:first-child {
      padding-right: 7px;
      button {
        opacity: 1!important;
      }
    }
    &:last-child {
      padding-left: 7px;
      button {
        background-color: ${color.danger}!important;
        border-color: ${color.danger}!important;
        &:hover {
          opacity: 0.8!important;
        }
      }
    }
  }
`;

const CloseIcon = styled.div`
  text-align: right;
  opacity: 0.5;
  transition: opacity 0.2s ease-out;
  &:hover {
    opacity: 0.9;
  }
  span {
    margin-right: -12px;
    cursor: pointer;
  }
`;

// TODO: animation end in main sidebar OR animation in edit profile (after first is opened)
// TODO: intl messages (including breaking spaces helper)
const openEditProfile = (leftPanelOpen, onToggleSidebar, accountSecondAsideOpened, dispatch) => {
  if (!leftPanelOpen) {
    onToggleSidebar(true, 'account');
    setTimeout(() => { dispatch(toggleEditProfile(true)); }, 700);
  } else if (!accountSecondAsideOpened) {
    dispatch(toggleEditProfile(true));
  }
  dispatch(toggleLogoutPopup(false));
};

export default class DemoUserPopup extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { dispatch, onToggleSidebar, leftPanelOpen, accountSecondAsideOpened } = this.props;
    return (
      <DemoPopupWrapper>
        <CloseIcon>
          <Icon name="cross" width="216x" height="16px" onClick={() => dispatch(toggleLogoutPopup(false))} />
        </CloseIcon>
        <StyledMessage>
          <FormattedMessage id="global.demoLogout1" /><br />
          <FormattedMessage id="global.demoLogout2" /><br />
          <FormattedMessage id="global.demoLogout3" /><br />
          <FormattedMessage id="global.demoLogout4" />
        </StyledMessage>
        <BtnGroupWrapper>
          <Button
            onClick={() => openEditProfile(leftPanelOpen, onToggleSidebar, accountSecondAsideOpened, dispatch)}
            theme="transparent"
          >
            <FormattedMessage id="global.demoLogoutCancel" />
          </Button>
          <Button
            onClick={() => this.props.dispatch(logout())}
            theme="transparent"
          >
            <FormattedMessage id="global.logoutAnyway" />
          </Button>
        </BtnGroupWrapper>
      </DemoPopupWrapper>
    );
  }
}

DemoUserPopup.propTypes = {
  dispatch: func,
  onToggleSidebar: func,
  leftPanelOpen: bool,
  accountSecondAsideOpened: bool,
};
