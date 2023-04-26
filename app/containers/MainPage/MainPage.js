import React from 'react';
import { object, func, any, bool, string, instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { leftPanelWidth, minPageWidth } from '../../styles-constants';
import DemoUserPopup from '../../components/DemoUserPopup';
import {
  toggleSmooth,
  toggleSidebar,
  toggleDepositPanel,
} from '../../modules/settings/actions';
import {
  pushRoomsRequest,
  gotoRoom,
} from '../../modules/rooms/actions';
import Header from './Header/Header';
import LeftPanel from './LeftPanel';
import {
  MainPageLayout,
  MainLayoutWrapper,
  LeftPanelAndChartWrapper,
} from './LayoutStyles';
import {
  selectUser,
  selectSound,
  selectLeftPanel,
  selectLeftPanelRoute,
  selectLeftPanelOpen,
  selectAccountSecondAsideOpened,
} from './selectors';
import {
  pinTab,
  getProfileStats,
  createNewRoom,
  goToCreateRoom,
  toggleSpotlightAnimation,
} from './actions';
import RoomManager from '../../modules/rooms/RoomManager';
import FootballPage from './FootballPage/FootballPage';
import RightPanel from './RightPanel/RightPanel';

// const OfflineBar = styled.div `
//   position: fixed;
//   overflow: hidden;
//   opacity: 1;
//   background: rgba(133, 35, 28, 1);
//   color: #fff;
//   z-index: 1000;
//   top: 50%;
//   left: 50%;
//   width: 400px;
//   line-height: 21px;
//   padding: 14px;
//   padding-top: 21px;
//   padding-bottom: 21px;
//   margin-left: -200px;
//   margin-top: -100px;
//   text-align: center;
//   filter: none;
//   box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
// `;

const isGameRoute = (pathname) => pathname.includes('game');

export class MainPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      canShowModal: false,
    };
  }

  componentWillMount() {
    setTimeout(() => this.setState({ canShowModal: true }), 5000);

    this.props.dispatch({ type: 'PROFILE_REQUEST' });
  }

  render() {
    const { pathname } = this.props.location;
    const {
      demoUserLogoutPopup,
      user,
      dispatch,
      roomManager,
    } = this.props;
    // const isGameCanBePlaying = this.props.appIsOnline && this.props.appIsWsConnected;
    const showLogoutPopup = demoUserLogoutPopup;
    const overlayModal = null;
    const filter = 'none';
    // if (this.state.canShowModal) {
    //   filter = isGameCanBePlaying && !showLogoutPopup ? 'none' : 'blur(2px)';
    // }

    return (
      <div style={{ height: '100vh', minWidth: minPageWidth, position: 'relative' }}>
        {overlayModal}
        {showLogoutPopup && <DemoUserPopup
          dispatch={dispatch}
          onToggleSidebar={this.props.onToggleSidebar}
          leftPanelOpen={this.props.leftPanelOpen}
          accountSecondAsideOpened={this.props.accountSecondAsideOpened}
        />}
        {/* as react mounting begins FROM children TO highest parent, some of them began to fetching before profile success (e.g history panel) */}
        {/* this renders them after profile success occurred */}
        <MainPageLayout style={{ filter }}>
          <Header
            user={this.props.userModel}
            onPinTab={this.props.onPinTab}
            onToggleSidebar={this.props.onToggleSidebar}
            onToggleDepositPanel={this.props.onToggleDepositPanel}
            route={this.props.leftPanelRoute}
            open={this.props.leftPanelOpen}
            goToCreateRoom={this.props.goToCreateRoom}
            params={this.props.params}
            leftPanelOpen={this.props.leftPanelOpen}
            roomManager={roomManager}
            rooms={this.props.rooms}
            room={this.props.room}
            dispatch={this.props.dispatch}
          />
          <LeftPanelAndChartWrapper>
            <LeftPanel
              params={this.props.params}
              sound={this.props.sound}
              user={user}
              width={leftPanelWidth}
              dispatch={dispatch}
              locale={this.props.locale}
              open={this.props.leftPanelOpen}
              route={this.props.leftPanelRoute}
              onToggleSidebar={this.props.onToggleSidebar}
              formErrors={this.props.formErrors}
              location={this.props.location}
              getProfileStats={this.props.getProfileStats}
              accountSecondAsideOpened={this.props.accountSecondAsideOpened}
              depositPanelOpened={this.props.depositPanelOpened}
              onToggleDepositPanel={this.props.onToggleDepositPanel}
            />
            <MainLayoutWrapper>
              {isGameRoute(pathname) && <FootballPage {...this.props} />}
            </MainLayoutWrapper>
            <RightPanel
              room={this.props.room}
              toggleSpotlightAnimation={this.props.toggleSpotlightAnimation}
              spotlight={this.props.spotlight}
              user={this.props.user}
              messages={this.props.messages}
              dispatch={this.props.dispatch}
            />
          </LeftPanelAndChartWrapper>
        </MainPageLayout>
      </div>
    );
  }
}

MainPage.propTypes = {
  user: object.isRequired,
  userModel: object,
  onToggleSidebar: func,
  dispatch: func,
  params: object,
  onPinTab: func,
  getInitialData: func,
  location: object,
  goToCreateRoom: func,
  formErrors: any,
  getProfileStats: func,
  demoUserLogoutPopup: bool,
  locale: string,
  onToggleDepositPanel: func,
  toggleSpotlightAnimation: func,
  spotlight: any,
  messages: any,
  // Room Worker
  roomManager: instanceOf(RoomManager),
  pushRoomsRequest: func,
  gotoRoom: func,

  // MainPage/reducer
  appIsWsConnected: bool,
  appIsOnline: bool,

  // Settings
  sound: bool,
  leftPanelRoute: string,
  leftPanelOpen: bool,
  accountSecondAsideOpened: bool,
  depositPanelOpened: bool,
  rooms: any,
  room: any,
};


const mapStateToProps = createStructuredSelector({
  user: selectUser(),
  roomManager: (state) => state.get('roomManager'),
  userModel: (state) => state.get('footballPage').user,
  rooms: (state) => state.get('footballPage').footballRooms,
  room: (state) => state.get('footballPage').selectedRoom,

  // SETTINGS PROPS FROM LOCAL FORAGE
  sound: selectSound(),

  leftPanel: selectLeftPanel(),
  leftPanelOpen: selectLeftPanelOpen(),
  leftPanelRoute: selectLeftPanelRoute(),
  accountSecondAsideOpened: selectAccountSecondAsideOpened(),
  locale: (state) => state.getIn(['settings', 'locale']),

  // MainPage/reducer
  appIsOnline: (state) => state.getIn(['mainPage', 'isOnline']),
  appIsWsConnected: (state) => state.getIn(['mainPage', 'isWsConnected']),

  // OTHER PROPS
  isRoomLoading: (state) => state.getIn(['mainPage', 'isRoomLoading']),
  pinned: (state) => state.get('roomManager').tabs, // ids[] of pinned rooms from mainPage reducer


  browser: (state) => state.get('browser'),
  messages: (state) => state.getIn(['mainPage', 'messages']),

  formErrors: (state) => state.getIn(['global', 'formErrors']).toJS(),

  spotlight: (state) => state.getIn(['mainPage', 'spotlight']),
  demoUserLogoutPopup: (state) => state.getIn(['mainPage', 'demoUserLogoutPopup']),
});

const mapDispatchToProps = (dispatch) => ({
  // SETTINGS
  onToggleSidebar: (open, route) => dispatch(toggleSidebar(open, route)),
  onToggleSmooth: (smooth) => dispatch(toggleSmooth(smooth)),
  onToggleDepositPanel: (open) => dispatch(toggleDepositPanel(open)),

  // ROOM WORKER
  pushRoomsRequest: (id) => dispatch(pushRoomsRequest(id)),
  gotoRoom: (id) => dispatch(gotoRoom(id)),

  // API
  onPinTab: (room, setPinned, open) => dispatch(pinTab(room, setPinned, open)),
  goToCreateRoom: () => dispatch(goToCreateRoom()),
  createNewRoom: (roomData) => dispatch(createNewRoom(roomData)),
  toggleSpotlightAnimation: (team) => dispatch(toggleSpotlightAnimation(team)),
  getProfileStats: () => dispatch(getProfileStats()),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
