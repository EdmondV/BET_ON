import React from 'react';
import styled, { keyframes } from 'styled-components';
import { bool, string, func } from 'prop-types';
import { FormattedMessage } from 'utils/intl';
import { color, hexToRgb } from 'styles-constants';
import messages from 'containers/MainPage/LeftPanel/messages';

const slideTop = keyframes`
  { 
    0% { transform: translate3d(0, -100%, 0); opacity: 0; } 
    50% { opacity: 0.3; } 
    100% { opacity: 1; } 
  }
`;

const slideLeft = keyframes`
  { 
    0% { transform: translate3d(150%, -50%, 0); opacity: 0; } 
    50% { opacity: 0.3; } 
    100% { opacity: 1; } 
  }
`;

const accountTooltipStyles = `
  left: auto;
  right: 0;
  top: 50%;
  transform: translate(105%, -50%);
  padding: 8px 6px;
  width: auto;
  cursor: pointer;
  animation: ${slideLeft} 0.3s;
  background: rgba(${hexToRgb('#666666')}, 0.6);
  color: rgba(${hexToRgb('#ffffff')}, 0.7);
  &:before {
    border-top: 6px solid transparent;
    border-left: 6px solid transparent;
    right: auto;
    left: -12px;
    top: 50%;
    bottom: auto;
    transform: translateY(-50%) rotate(0deg);
    border-top: 6px solid transparent;
    border-left: 6px solid transparent;
    border-right: 6px solid rgba(${hexToRgb('#666666')}, 0.6);
    border-bottom: 6px solid transparent;
  }
`;

const resendConfirmationStyles = `
  ${accountTooltipStyles}
  padding: 8px 6px;
    max-width: 132px;
    text-align: left;
    right: -4px;
    top: 65%;
    color: #fff;
    background: rgba(${hexToRgb(color.success)}, 0.9);
    &:before {
      border-right: 6px solid rgba(${hexToRgb(color.success)}, 0.9);
    }
`;

const themes = {
  accountTooltip: accountTooltipStyles,
  resendConfirmation: resendConfirmationStyles,
};

const Tooltip = styled.div`
  position: absolute;
  width: ${(p) => p.verified ? '72px' : '90px'};
  left: ${(p) => p.verified ? '-21px' : '-29px'};
  right: 0;
  margin: 0 auto;
  padding: 4px 4px 6px;
  top: -48px;
  line-height: 1.2;
  background: ${(p) => p.verified ? `rgba(${hexToRgb(color.success)}, 0.2)` : `rgba(${hexToRgb('#666666')}, 0.2)`};
  color: ${(p) => p.verified ? `${color.success}` : `rgba(${hexToRgb('#ffffff')}, 0.4)`};
  border-radius: 0.2em;
  animation: ${slideTop} 0.3s;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-top: 6px solid transparent;
    border-left: 6px solid transparent;
    border-bottom: ${(p) => p.verified ? `6px solid rgba(${hexToRgb(color.success)}, 0.2)` : `6px solid rgba(${hexToRgb('#666666')}, 0.2)`};
    width: 0;
    height: 0;
    bottom: -4px;
    transform: rotate(45deg);
  }
  ${({ theme }) => themes[theme]}
`;

const isTooltipShown = (outerShow, innerShow) => outerShow || innerShow;

export default class AccountTooltip extends React.PureComponent { // eslint-disable-line
  componentWillMount() {
    this.state = {};
  }
  componentWillUpdate() {
    switch (this.props.name) {
      case 'deposit':
      case 'withdrawal':
      case 'operations':
        if (this.props.isRealAccount) {
          this.setState({
            hidden: true,
          });
        } else {
          this.setState({
            hidden: false,
          });
        }
        break;
      default:
        this.setState({
          hidden: false,
        });
    }
  }
  onHoverHandler = (enter) => {
    this.setState({
      hovered: enter,
    });
  };
  render() {
    const { show, verified, theme, name, isRealAccount, onClickHandler, confirmationSent } = this.props;
    return (
      <div>
        {(show && theme === 'confirmed') && <Tooltip theme={theme} verified={verified}>
          {verified ? <FormattedMessage {...messages.email_verified} /> : <FormattedMessage {...messages.email_not_verified} />}
        </Tooltip>}
        {(isTooltipShown(show, this.state.hovered) && theme === 'accountTooltip' && !this.state.hidden) && <Tooltip
          theme={theme}
          verified={verified}
          onMouseEnter={() => this.onHoverHandler(true)}
          onMouseLeave={() => this.onHoverHandler(false)}
          onClick={() => onClickHandler(name, isRealAccount)}
        >
          {name === 'deposit' && <FormattedMessage {...messages.open_real} />}
          {(name !== 'deposit' && !isRealAccount) && <FormattedMessage {...messages.accountTooltipAvailableForRealAcc} />}
        </Tooltip>}
        {(theme === 'resendConfirmation' && (show || this.state.hovered)) && <Tooltip
          theme={theme}
          onMouseEnter={() => this.onHoverHandler(true)}
          onMouseLeave={() => this.onHoverHandler(false)}
        >
          { confirmationSent ? <FormattedMessage {...messages.TooltipConfirmationSent} /> : <FormattedMessage {...messages.TooltipConfirmationResend} /> }
        </Tooltip>}
      </div>
    );
  }
}

AccountTooltip.propTypes = {
  show: bool,
  verified: bool,
  theme: string,
  name: string,
  isRealAccount: bool,
  confirmationSent: bool,
  onClickHandler: func,
};
