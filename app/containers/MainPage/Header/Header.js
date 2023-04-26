import React from 'react';
import { bool, object, func, any } from 'prop-types';

// import { FormattedMessage } from '../../../utils/intl';
import { LogoSmall } from '../../../components/Logo';
import Avatar from '../../../components/Avatar';
import { space } from '../../../styles-constants';
import TopPanel from './TopPanelTabs';
import {
  AccButton,
  ProfileMoney,
  AccButtonWrapper,
  AvatarWrapper,
  LogoWrapper,
  HeaderWrapper,
  Helper,
  TopWrapper,
  RoomsListContainerWrapper,
  ProfileColWrapper,
} from './HeaderStyles';
// import messages from './messages';

export default class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user } = this.props;
    const firstPartBalance = user.balance.toString()[0];
    const secondPartBalance = user.balance.toString().slice(1);
    const balance = user.balance >= 1000 ? `$ ${firstPartBalance} ${secondPartBalance}` : `$ ${user.balance}`;
    return (
      <HeaderWrapper>
        <Helper>
          <LogoWrapper>
            <LogoSmall />
          </LogoWrapper>
          <TopWrapper>
            <RoomsListContainerWrapper id="room_tabs_container">
              <TopPanel rooms={this.props.rooms} />
            </RoomsListContainerWrapper>
            <ProfileColWrapper>
              <AvatarWrapper onClick={() => this.props.onToggleSidebar(!this.props.open, 'account')}>
                <Avatar
                  style={{ paddingLeft: space(2) }}
                  initials={'PL'}
                  avatar
                />
              </AvatarWrapper>
              <ProfileMoney>
                <div className="balance">Balance: </div>
                <div className="amount">{balance || 0}</div>
              </ProfileMoney>
              <AccButtonWrapper>
                <AccButton
                  onClick={() => {}}
                >
                  <span>Deposit</span>
                </AccButton>
              </AccButtonWrapper>
            </ProfileColWrapper>
          </TopWrapper>
        </Helper>
      </HeaderWrapper>
    );
  }
}

Header.propTypes = {
  user: object,
  onToggleSidebar: func,
  open: bool,
  rooms: any,
};

// const openRealAccountPanel = ({ onToggleSidebar, onToggleDepositPanel, leftPanelOpen }) => {
//   if (!leftPanelOpen) {
//     onToggleSidebar(true, 'account');
//     setTimeout(() => { onToggleDepositPanel(true); }, 500);
//   } else {
//     onToggleSidebar(true, 'account');
//     onToggleDepositPanel(true);
//   }
// };
