import React from 'react';
// import { Link } from 'react-router';
import { object, string, func, bool, number, any } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { DEPOSIT_PAGE_URL, WITHDRAWAL_PAGE_URL, redirectToHome } from 'utils/redirects';
import styled from 'styled-components';
import { color, fontSize, hexToRgb, fontFamily, letterSpacing, fontWeight, space, flex, zIndex } from 'styles-constants';
import Icon from 'components/Icon/';
import SvgIcon from 'components/SvgIcon';
import LocaleToggle from 'components/LocaleToggle';

import {
  changeLocale,
  toggleSound,
  togglePaymentPolicyAgree,
} from 'modules/settings/actions';

import {
  sendFeedback,
  leaders,
  confirmation,
} from '../actions';

import Rooms from './Rooms';
import History from './History';
import Account from './Account';
import Leader from './Leader';
import Feedback from './Feedback';

import {
  selectHistory,
  selectDepositPanelOpened,
} from '../selectors';
import MenuIcon from '../FootballPage/MenuIcon/MenuIcon';

const IconWidth = '20px';

// TODO: consistent styling
const Helper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${color.primary};
`;

const wrapperStyle = {
  width: 80,
  borderRight: `1px solid rgb(${hexToRgb(color.primaryLighted)})`,
  textAlign: 'center',
  fontSize: fontSize.small,
  position: 'relative',
  zIndex: zIndex.secondSidebar + 1, /* opening second sidebar is under this layer */
  background: color.primary,
};
const openingSidebarWrapper = {
  transition: 'all 0.3s ease-out',
  background: `rgb(${hexToRgb(color.primaryLighted)})`,
  zIndex: zIndex.secondSidebar, /* and this layer (it includes 2 sidebar, that's why works) */
  borderRight: 'none',
  padding: 10,
  display: 'flex',
};
const LeftPanelWrapper = styled.div`
  ${flex(null, 'stretch')};
  align-self: stretch;
  position: relative;
  flex: 0;
`;
const IconWrapper = styled.div`
  display: block;
  width: 100%;
  position: relative;
  ${({ sound }) => sound && `
    opacity: 0.5;
    margin-bottom: ${space(3)};
    svg {
      width: ${IconWidth};
    }
  `}
`;

const LanguageWrapper = styled.div`
  position: absolute;
  bottom: ${space(3)};
  width: 100%;
`;

// const FaqWrapper = styled.div`
//   position: absolute;
//   bottom: 84px;
//   width: 100%;
//   font-size: ${fontSize.small};
//   opacity: 0.8;
//   font-weight: ${fontWeight.regular};
//   a {
//     color: ${color.mainFontColor};
//     cursor: pointer;
//   }
// `;

const StyledAsideLink = styled.div`
  padding: ${space(3)} 0;
  display: block;
  cursor: pointer;
  text-transform: uppercase;
  font-family: ${fontFamily.heading};
  letter-spacing: ${letterSpacing.medium};
  font-size: ${fontSize.extraSmall};
  font-weight: ${fontWeight.semibold};
  &:hover {
    background-color: ${color.primaryLighted};
    opacity: 1;
  }
  background-color: ${(props) => props.active ? `${color.primaryLighted}` : 'transparent'};
  opacity: ${(props) => props.active ? '1' : '0.5'};

  > * {
    display: block;
  }

  div {
    margin-bottom: ${space()};
  }

  svg {
    fill: #ffffff;
    width: ${({ name }) => name === 'rooms' ? '24px' : `${IconWidth}`};
    margin: 0 auto 6px;
  }
`;

const PanelWrapper = styled.div`
  ${flex()}; /* need this for stretch children vertically (safari) */
  max-width: ${({ open }) => open ? '240px' : '0'}; /* safari ignores that elem is hidden and set width for empty elem */
  flex: 1;
  > div {
    ${flex(null, null, 'column')};
    flex: 1;
    max-height: 100%;
    max-width: 100%; /* container overflows by X axis without this boundary (safari) */
    margin: 0 auto;
  }
`;

const Version = styled.div`
  position: absolute;
  bottom: 5px;
  text-align: center;
  font-size: 9px;
  color: #fff;
  opacity: 0.4;
  width: 100%;
`;

export const IconArrow = styled.div`
  width: 11px;
  z-index: ${zIndex.secondSidebar + 1};
  height: auto;
  position: absolute;
  top: 20px;
  right: 15px;
  span {
    left: -3px;
    top: 4px;
    position: absolute;
    opacity: 0.5;
  }
  &:hover {
    span {
      opacity: 0.9;
    }
    &:after {
      content: '';
      position: absolute;
      width: 21px;
      height: 21px;
      top: 2px;
      left: -5px;
      border-radius: 50%;
      background: rgba(${hexToRgb('#fff')}, 0.1);
    }
  }
`;

const ComingSoon = styled.div`
  justify-content: center;
`;

const withdrawOrDepositPage = (location) => (location.pathname.includes(WITHDRAWAL_PAGE_URL) || location.pathname.includes(DEPOSIT_PAGE_URL));

const IconLink = ({ name, route, onToggleSidebar, open, location }) => (
  <IconWrapper
    onClick={() => {
      if (name === 'soccer' && withdrawOrDepositPage(location) && !open) {
        redirectToHome();
      }
      onToggleSidebar(name !== route || !open, name);
    }}
  >
    <StyledAsideLink name={name} active={name === route && open}>
      <MenuIcon name={name} />
      {name}
    </StyledAsideLink>
  </IconWrapper>
);

IconLink.propTypes = {
  name: string.isRequired,
  route: string,
  onToggleSidebar: func,
  open: bool,
  location: any,
};

function Panel(props) {
  switch (props.route) {
    case 'soccer':
      return <Rooms params={props.params} />;
    case 'history':
      return <History {...props} />;
    case 'account':
      return <Account {...props} />;
    case 'leaders':
      return <Leader {...props} />;
    case 'feedback':
      return <Feedback {...props} />;
    default:
      return <ComingSoon>Coming soon</ComingSoon>;
  }
}

Panel.propTypes = {
  route: string,
  params: object,
};

class LeftPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { width, open, route, locale, onLocaleToggle, dispatch } = this.props;
    return (
      <LeftPanelWrapper>
        { open &&
          <IconArrow onClick={() => this.props.onToggleSidebar(!this.props.onToggleSidebar)}>
            <Icon name="cross" width="17px" height="17px" />
          </IconArrow>
        }
        <div style={wrapperStyle}>
          <Helper />
          <IconLink {...this.props} name="soccer" />
          <IconLink {...this.props} name="egames" />
          <IconLink {...this.props} name="hockey" />
          <IconLink {...this.props} name="basketball" />
          <IconLink {...this.props} name="baseball" />
          <IconLink {...this.props} name="more" />
          <IconWrapper
            sound
            onClick={() => this.props.onToggleSound(!this.props.sound)}
            style={{ position: 'absolute', bottom: 60, cursor: 'pointer' }}
          >
            <SvgIcon icon={this.props.sound ? 'soundOn' : 'soundOff'} />
          </IconWrapper>
          {/* <FaqWrapper>
            <Link to={'/feedback'}>
              FAQ
            </Link>
          </FaqWrapper> */}
          <LanguageWrapper>
            <LocaleToggle
              locale={locale}
              onLocaleToggle={onLocaleToggle}
              dispatch={dispatch}
              leftPanelToggler
            />
          </LanguageWrapper>
          <Version>
            {this.props.version}
          </Version>
        </div>
        <div
          style={{
            ...wrapperStyle,
            ...openingSidebarWrapper,
            width: this.props.open ? width : 0,
            left: !this.props.open ? -width : 0,
            padding: this.props.open ? '20px 10px 0 10px' : 0,
            boxShadow: route !== 'account' ? `6px 6px 6px rgba(${hexToRgb('#0a1636')}, 0.3)` : 'none',
          }}
        >
          <PanelWrapper open={this.props.open}>
            {this.props.open &&
              <Panel {...this.props} />}
          </PanelWrapper>
        </div>
      </LeftPanelWrapper>
    );
  }
}

LeftPanel.propTypes = {
  open: bool,
  sound: bool,
  width: number,
  onToggleSound: func,
  onToggleSidebar: func,
  version: string,
  route: string,
  onLocaleToggle: func,
  locale: string,
  dispatch: func,
};

const mapStateToProps = createStructuredSelector({
  leaders: (state) => state.getIn(['mainPage', 'leaders']),
  leadersLoaded: (state) => state.getIn(['mainPage', 'leadersLoaded']),
  roomsHistory: selectHistory(),
  depositPanelOpened: selectDepositPanelOpened(),
  roomsHistoryLoaded: (state) => state.getIn(['mainPage', 'roomsHistoryLoaded']),
  showAvatarUploader: (state) => state.getIn(['mainPage', 'showAvatarUploader']),
  profileStats: (state) => state.getIn(['mainPage', 'profileStats']),
  confirmationSent: (state) => state.getIn(['mainPage', 'confirmationSent']),
  version: (state) => state.getIn(['global', 'version']),
  searchProcessing: (state) => state.getIn(['mainPage', 'searchProcessing']),
});

const mapDispatchToProps = (dispatch) => ({
  // SETTINGS
  onToggleSound: (sound) => dispatch(toggleSound(sound)),
  onLocaleToggle: (active) => dispatch(changeLocale(active)),

  // API
  getLeaders: () => dispatch(leaders.request()),
  sendFeedback: (feedbackData) => dispatch(sendFeedback(feedbackData)),
  onSendConfirmation: () => dispatch(confirmation.request()),
  togglePaymentPolicyAgree: (agree) => dispatch(togglePaymentPolicyAgree(agree)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
