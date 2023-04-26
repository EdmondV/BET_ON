import React from 'react';
import styled from 'styled-components';
import { bool, func, string, object, any } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateRoomsFilterSettings, cancelRoomsFilter } from 'modules/settings/actions';
import { FormattedMessage } from 'utils/intl';
import { color, leftPanelWidth, zIndex, flex } from 'styles-constants';

import EditProfile from 'components/EditProfile';
import Icon from 'components/Icon';
import AvatarUploader from 'components/AvatarUploader';
import SvgIcon from 'components/SvgIcon';
import FilterPanel from 'components/FilterPanel';

import { getAvailableAssets } from 'containers/MainPage/actions';

// TODO: move styles to separate file
const AsideWrapper = styled.div`
  position: absolute;
  top: -20px;
  left: -10px;
  bottom: -20px;
  right: -10px;
  z-index: ${zIndex.mainSidebar};
`;

const Aside = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${color.primaryLighted};
  transition: transform 0.3s ease-out;
  transform: translateX(${(props) => props.show ? `${leftPanelWidth}px` : '0'});
  box-shadow: ${(p) => p.show ? '6px 0 6px rgba(10, 22, 54, 0.3)' : 'none'};
  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }
`;

const SecondAsideHeader = styled.div`
  height: 51px;
  display: flex;
  padding: 22px 14px 0 0;
  align-items: flex-start;
  justify-content: flex-end;
`;

const CloseIcon = styled.div`
  display: inline-flex;
  cursor: pointer;
  opacity: 0.8;
`;

const AsideHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 21px;
`;

const IconWrapper = styled.div`
  padding-right: 8px;
`;

const SvgIconWrp = styled.div`
  padding-right: 8px;
  svg {
    fill: #ffffff;
    width: 18px;
  }
`;

const StyledHeading = styled.h2`
  margin: 0;
  font-size: 22px;
  font-family: 'Lato', sans-serif;
  letter-spacing: 1px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 0 21px 20px 26px;
  min-height: 560px;
  overflow-y: ${({ editProfile }) => editProfile ? 'visible' : 'auto'}; /* inner scroll aren't needed in editProfile component */
  > div {
    ${flex(null, null, 'column')};
  }
`;

const Heading = (props) => (
  <div>
    {props.name === 'profile' &&
      <AsideHeader>
        <IconWrapper>
          <SvgIcon styles={{ width: 20, height: 20 }} icon="settings" />
        </IconWrapper>
        <StyledHeading>
          <FormattedMessage {...props.messages.accountEditProfileHeader} />
        </StyledHeading>
      </AsideHeader>
    }
    {props.name === 'avatarUploader' &&
    <AsideHeader>
      <StyledHeading>
        <FormattedMessage {...props.messages.accountAvatarHeader} />
      </StyledHeading>
    </AsideHeader>
    }
    {props.name === 'filter' &&
    <AsideHeader>
      <SvgIconWrp>
        <SvgIcon icon="filter" />
      </SvgIconWrp>
      <StyledHeading>
        <span>Filter</span>
      </StyledHeading>
    </AsideHeader>
    }
  </div>
);

Heading.propTypes = {
  name: string,
  messages: any,
  user: object,
};

const SidebarContent = (component, props) => {
  switch (component) {
    case 'profile':
      return <EditProfile {...props} />;
    case 'filter':
      return <FilterPanel {...props} />;
    case 'avatarUploader': // avatar uploader return from show prop because some dependencies on file input (should be in DOM)
    default:
      return '';
  }
};

export class SecondAside extends React.PureComponent {  // eslint-disable-line
  // TODO: available assets based on timeframe
  // TODO: move to filter panel
  componentWillMount() {
    // this.props.getAvailableAssets({ timeframe: 180 });
  }
  render() {
    const { onClick, component, dispatch, user, avatarUploading, messages } = this.props;
    return (
      <AsideWrapper className="secondAsideWrp">
        <Aside show={this.props.show} component={component}>
          <SecondAsideHeader>
            <CloseIcon onClick={onClick}>
              <Icon name="cross" width="14px" height="14px" />
            </CloseIcon>
          </SecondAsideHeader>
          <Heading name={component} messages={messages} user={user} />
          <ContentWrapper editProfile={component === 'profile'}>
            {SidebarContent(component, this.props)}
            {component !== 'filter' && <AvatarUploader show={component === 'avatarUploader'} avatarUploading={avatarUploading} avatar={user.avatar} dispatch={dispatch} />}
          </ContentWrapper>
        </Aside>
      </AsideWrapper>
    );
  }
}

SecondAside.propTypes = {
  show: bool,
  onClick: func,
  dispatch: func,
  component: string,
  user: object,
  avatarUploading: bool,
  messages: any,
  getAvailableAssets: func,
};

// TODO: get all props for second sidebar inside component

const mapStateToProps = createStructuredSelector({
  availableAssets: (state) => state.getIn(['mainPage', 'availableAssets']),
  roomsFilterSettings: (state) => state.getIn(['settings', 'game', 'roomsFilterSettings']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  getAvailableAssets: (timeframe) => dispatch(getAvailableAssets(timeframe)),
  updateRoomsFilterSettings: (settings) => dispatch(updateRoomsFilterSettings(settings)),
  cancelFilter: () => dispatch(cancelRoomsFilter()),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(SecondAside);
