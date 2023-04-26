import React from 'react';
import { func, object, bool } from 'prop-types';
import { FormattedMessage } from 'utils/intl';
import { API_URL } from 'utils/request';

import { toggleEditProfile } from 'modules/settings/actions';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import SvgIcon from 'components/SvgIcon';
import AccountFooterNavMenu from 'components/AccountFooterNavMenu';

import AccountUserInfoList from 'components/AccountUserInfoList';
import messages from './messages';

import {
  logoutRequest as logout, hideAvatarUploader, toggleLogoutPopup,
} from '../actions';
import SecondAside from './SecondAside';
import VerifiedIcon from './VerifiedIcon';

import {
  FlexHelper,
  FlexVerticalColumn,
  AsideAccountWrapper,
  AvatarHelper,
  AvatarWrapper,
  ChangeAvatarLabel,
  WalletLabel,
  UserInfoWrapper,
  UserName,
  SettingsIcon,
  // UiWrapper,
  avatarStyles,
  BottomButtonsWrapper,
} from './AccountStyles';


const clickSound = () => ({
  type: 'PLAIN_SOUND',
  meta: {
    sound: 'click',
  },
});

const getRank = (rank, total, loaded) => {
  if (!loaded || !rank) return '?';
  if (total) return `${rank} / ${total}`;
  return rank;
};

class Account extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.setState({
      component: 'profile',
      showAvatarLabel: false,
    });
    this.props.getLeaders();
    this.props.getProfileStats();
  }

  // FIXME: state control of 4 components is hard to debug and extend
  componentWillUpdate(nextProps) {
    const shouldSidebarOpen = !this.props.accountSecondAsideOpened;

    // On deposit panel to show request switch to deposit component
    if (nextProps.depositPanelOpened) {
      this.changeComponent('depositPanel');
    }

    // open aside on file upload and change component
    if (nextProps.showAvatarUploader) {
      if (shouldSidebarOpen) this.toggleSecondAside(true);
      this.changeComponent('avatarUploader');
    }

    // On EVERY CLOSE of second sidebar RESET to profile component
    if (!nextProps.accountSecondAsideOpened && this.state.component !== 'profile') {
      this.changeComponent('profile'); // restore profile component on close second aside
      this.props.onToggleDepositPanel(false); // remove deposit panel
      this.avatarPreviewUpdate(); // remove avatar preview if closing avatarUploader
    }

    // on successful change of avatar - close aside
    if ((nextProps.user.avatar !== this.props.user.avatar) && (this.state.component === 'avatarUploader')) {
      this.toggleSecondAside(false);
      this.props.dispatch(hideAvatarUploader());
    }
  }

  onConfirmedClick(verified) {
    if (!this.props.accountSecondAsideOpened && !verified) {
      this.toggleSecondAside(); // open second aside to non verified user
    }
  }

  toggleSecondAside(toogle, onAvatarOpen = false) {
    if (onAvatarOpen) { // if avatarUploader is opened just change the component
      this.props.dispatch(hideAvatarUploader());
      this.changeComponent('profile');
    }
    this.props.dispatch(toggleEditProfile(toogle || !this.props.accountSecondAsideOpened));
    this.props.dispatch(clickSound());
  }

  toggleShowAvatarLabel(toggle) {
    this.setState({
      showAvatarLabel: toggle,
    });
  }

  changeComponent(component) {
    this.setState({
      component: component || 'profile',
    });
  }

  avatarOnClickHandler() {
    const fileUpload = document.getElementById('avatar_uploader');
    if (fileUpload) fileUpload.click();
  }

  avatarPreviewUpdate() {
    const el = document.getElementById('preview');
    if (el) {
      el.className === 'overlay' ? el.parentNode.removeChild(el) : el.src = `${API_URL}/profile/avatar/${this.props.user.avatar}`; // eslint-disable-line
    }
  }

  render() {
    const {leaders, leadersLoaded, location, onToggleSidebar, user, onToggleDepositPanel} = this.props; // eslint-disable-line
    const { avatarName, username, balance, wallet, avatar, verified, demo } = this.props.user;
    const { rank, dailyProfit } = this.props.profileStats;
    return (
      <FlexHelper>
        <SecondAside
          {...this.props}
          onClick={() => this.toggleSecondAside(!this.props.accountSecondAsideOpened, true)}
          show={this.props.accountSecondAsideOpened}
          component={this.state.component}
          messages={messages}
        />
        <FlexVerticalColumn style={{ flexGrow: 1, marginBottom: 0 }}>
          <AsideAccountWrapper>
            <AvatarWrapper
              onMouseEnter={() => this.toggleShowAvatarLabel(true)}
              onMouseLeave={() => this.toggleShowAvatarLabel(false)}
            >
              <AvatarHelper onClick={() => this.avatarOnClickHandler()}>
                <ChangeAvatarLabel
                  show={this.state.showAvatarLabel}
                  id="change_label"
                >
                  <span>Change</span>
                </ChangeAvatarLabel>
              </AvatarHelper>
              <Avatar asideAvatar initials={avatarName} customCss={avatarStyles} avatar={avatar} />
              <WalletLabel user={user}><span>{wallet === 'DEMO' ? 'Demo' : 'Real'}</span></WalletLabel>
            </AvatarWrapper>
          </AsideAccountWrapper>
          <UserInfoWrapper>
            <VerifiedIcon verified={verified} onClick={() => this.onConfirmedClick(verified)} />
            <UserName>{username}</UserName>
            <SettingsIcon
              {...this.props}
              onClick={() => this.toggleSecondAside(!this.props.accountSecondAsideOpened, true)}
            >
              <SvgIcon
                icon="settings"
                color="#ffffff"
                style={{ display: 'inline-flex', alignSelf: 'center' }}
                styles={{ width: 14, height: 14 }}
              />
            </SettingsIcon>
          </UserInfoWrapper>
          {/* <UiWrapper>
            <Button
              onClick={() => {
                onToggleDepositPanel(true);
              }}
            >
              {wallet !== 'DEMO' && <FormattedMessage {...messages.deposit} />}
              {wallet === 'DEMO' && <FormattedMessage {...messages.open_real} />}
            </Button>
          </UiWrapper> */}
          <AccountUserInfoList
            balance={balance}
            rank={getRank(rank, leaders.count, leadersLoaded)}
            dailyProfit={dailyProfit && dailyProfit.toFixed ? dailyProfit.toFixed(2) : 0}
            onToggleSidebar={onToggleSidebar}
          />
          <AccountFooterNavMenu
            location={location}
            isRealAccount={wallet !== 'DEMO'}
            messages={messages}
            onToggleDepositPanel={onToggleDepositPanel}
          />
        </FlexVerticalColumn>
        <FlexVerticalColumn style={{ flexGrow: 0, justifyContent: 'flex-end', marginTop: 0, paddingTop: 0 }}>
          <BottomButtonsWrapper id="logout">
            <Button
              onClick={() => this.props.dispatch(demo ? toggleLogoutPopup(true) : logout())}
              theme="transparent"
            >
              <FormattedMessage {...messages.logout} />
            </Button>
          </BottomButtonsWrapper>
        </FlexVerticalColumn>
      </FlexHelper>
    );
  }
}

Account.propTypes = {
  user: object,
  dispatch: func,
  getLeaders: func,
  location: object,
  onToggleSidebar: func,
  getProfileStats: func,
  profileStats: object,
  accountSecondAsideOpened: bool,
  onToggleDepositPanel: func,
};

export default Account;
