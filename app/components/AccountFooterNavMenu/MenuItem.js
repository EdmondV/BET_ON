import React from 'react';
import styled from 'styled-components';
import { string, bool, object } from 'prop-types';
import { FormattedMessage } from 'utils/intl';

import SvgIcon from 'components/SvgIcon';
import Icon from 'components/Icon';
import AccountTooltip from 'components/AccountTooltip';

import { redirectToWithdrawal, redirectToOperations, DEPOSIT_PAGE_URL, WITHDRAWAL_PAGE_URL, OPERATIONS_PAGE_URL } from 'utils/redirects';


const StyledMenuItem = styled.div`
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  div, span {
    transition: opacity 0.2s ease-out;
  }
  position: relative;
`;


// FIXME: refactor in one property: active
// FIXME: remove hover logic from disabled prop
const IconWrapper = styled.div`
  flex: 0 21px;
  width: 21px; /* flex: 0 21px doesn't work in safari */
  opacity: ${({ disabled, activeLink }) => disabled && !activeLink ? '0.4' : '1'}; /* hover for not active / real account links */
  cursor: pointer;
`;
const StyledTitle = styled.div`
  flex: 1;
  display: inline-flex;
  justify-content: flex-start;
  padding-left: 14px;
  text-transform: uppercase;
  align-self: flex-end;
  font-family: 'Lato', sans-serif;
  letter-spacing: 1.5px;
  font-weight: bold;
  opacity: ${({ disabled, activeLink }) => disabled && !activeLink ? '0.4' : '1'}; /* hover for not active / real account links */
  > span {
    cursor: pointer;
  }
`;
const ArrowIcon = styled.div`
  flex: 0 21px;
  transform: rotate(180deg);
  cursor: pointer;
  > div {
    display: inline-flex;
  }
`;

const TextWrapper = styled.span``;

const isDepositPage = (pathname) => pathname.includes(DEPOSIT_PAGE_URL);
const isWithdrawalPage = (pathname) => pathname.includes(WITHDRAWAL_PAGE_URL);
const isOperationsPage = (pathname) => pathname.includes(OPERATIONS_PAGE_URL);

const openRealAccountPanel = ({ onToggleDepositPanel }) => {
  onToggleDepositPanel(true);
};

export default class MenuItem extends React.PureComponent { // eslint-disable-line
  componentWillMount() {
    this.state = {};
  }
  onHoverHandler = (enter) => {
    this.setState({
      hovered: enter,
    });
  };
  onClickHandler(name, isRealAccount, props) {
    switch (name) {
      case 'deposit':
        openRealAccountPanel(props);
        break;
      case 'withdrawal':
        if (isRealAccount) {
          redirectToWithdrawal();
        } else {
          openRealAccountPanel(props);
        }
        break;
      case 'operations':
        if (!isRealAccount) openRealAccountPanel(props);
        if (isRealAccount) redirectToOperations();
        break;
      default:
        break;
    }
  }
  render() {
    const { name, isRealAccount, location, messages } = this.props;
    const { hovered } = this.state;
    return (
      <StyledMenuItem>
        <IconWrapper
          disabled={(!hovered || (!isRealAccount && name !== 'deposit'))}
          activeLink={
            isDepositPage(location.pathname) && name === 'deposit' ||
            isWithdrawalPage(location.pathname) && name === 'withdrawal' ||
            isOperationsPage(location.pathname) && name === 'operations'
          }
          onMouseEnter={() => this.onHoverHandler(true)}
          onMouseLeave={() => this.onHoverHandler(false)}
          onClick={() => this.onClickHandler(name, isRealAccount, this.props)}
        >
          <SvgIcon icon={name} styles={{ color: '#fff' }} />
        </IconWrapper>
        {name === 'deposit' && <StyledTitle
          disabled={!hovered}
          activeLink={isDepositPage(location.pathname)}
        >
          <TextWrapper
            onMouseEnter={() => this.onHoverHandler(true)}
            onMouseLeave={() => this.onHoverHandler(false)}
            onClick={() => this.onClickHandler(name, isRealAccount, this.props)}
          ><FormattedMessage {...messages.accountDeposit} />
          </TextWrapper>
        </StyledTitle>}
        {name === 'operations' && <StyledTitle
          disabled={!hovered || !isRealAccount}
          activeLink={isOperationsPage(location.pathname)}
        >
          <TextWrapper
            onMouseEnter={() => this.onHoverHandler(true)}
            onMouseLeave={() => this.onHoverHandler(false)}
            onClick={() => this.onClickHandler(name, isRealAccount, this.props)}
          ><FormattedMessage {...messages.accountOperations} />
          </TextWrapper>
        </StyledTitle>}
        {name === 'withdrawal' && <StyledTitle
          disabled={!hovered || !isRealAccount}
          activeLink={isWithdrawalPage(location.pathname)}
        >
          <TextWrapper
            onMouseEnter={() => this.onHoverHandler(true)}
            onMouseLeave={() => this.onHoverHandler(false)}
            onClick={() => this.onClickHandler(name, isRealAccount, this.props)}
          ><FormattedMessage {...messages.accountWithdrawal} />
          </TextWrapper>
        </StyledTitle>}
        <ArrowIcon
          onMouseEnter={() => this.onHoverHandler(true)}
          onMouseLeave={() => this.onHoverHandler(false)}
          onClick={() => this.onClickHandler(name, isRealAccount, this.props)}
        >
          <Icon name="arrowLeft" width="9px" height="11px" />
        </ArrowIcon>
        <AccountTooltip
          onClickHandler={this.onClickHandler}
          isRealAccount={this.props.isRealAccount}
          name={name}
          show={this.state.hovered}
          theme="accountTooltip"
        />
      </StyledMenuItem>
    );
  }
}

MenuItem.propTypes = {
  name: string,
  isRealAccount: bool,
  location: object,
  messages: object,
};
