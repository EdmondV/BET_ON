import React from 'react';
import { string, any, func, object, bool, instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import VirtualList from 'react-virtual-list';
import { createStructuredSelector } from 'reselect';
import { toggleShowNotice, toggleViewRooms, updateRoomsFilterSettings, cancelRoomsFilter, toggleFilterPanel } from 'modules/settings/actions';
import { FormattedMessage } from 'utils/intl';
import { redirectToRoomCreate } from 'utils/redirects';

import LeftPanelHeader from 'components/LeftPanelHeader';
import StyledScrollbar from 'components/StyledScrollbar';

import SecondAside from './SecondAside';
import { CreateButton, EmptyHistoryMsg } from './History';
import { makeBet, addRoomsRequest } from '../actions';
import messages from './messages';

import {
  LeftPanelWrapper,
  Helper,
  RoomsWrp,
  RoomsListWrapper,
} from './RoomsStyles';
import RoomManager from '../../../modules/rooms/RoomManager';
import { footballRooms } from '../FootballPage/mocks/data';
import RoomPreview from '../../../components/RoomPreview/RoomPreview';

const ROOMS_UPDATE_INTERVAL = 10;
const ROOMS_NUMBER_TO_ACTIVATE_TIMER = 10;

const RoomsList = ({
  virtual,
  ...props
}) => (
  <RoomsListWrapper style={virtual.style}>
    {virtual.items.map((room) => (
      <RoomPreview
        key={room.id}
        room={room}
        {...props}
      />
    ))}
  </RoomsListWrapper>
);

RoomsList.propTypes = {
  virtual: object,
};

class Rooms extends React.PureComponent {
  static propTypes = {
    route: string,
    dispatch: func,
    showChartPreview: bool,
    roomManager: instanceOf(RoomManager),
    searchProcessing: bool,
    roomsSortSettings: object,
    filterPanelOpened: bool,
    roomsFilterSettings: object,
    cancelFilter: func,
    toggleFilterPanel: func,
    userId: any,
    settings: object,
    addRoomsRequest: func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      timer: 10,
      intervalId: null,
    });
  }

  componentDidMount() {
    this.createList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showChartPreview !== this.props.showChartPreview) {
      this.createList();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const rooms = nextProps.roomManager.rooms.leftPanelRooms(this.props.settings);
    const { intervalId } = nextState;

    /**
     * Add rooms with limit trying to place 10 rooms to Rooms panel
     * Executes if timer is set and it's value is zero
     */
    // FIXME: include pinned rooms also
    if (nextState.timer <= 0 && nextState.intervalId) {
      // console.log('Timer add rooms, number to add: ', 10 - rooms.length);
      // this.props.addRoomsRequest({
      //   ids: rooms.map((r) => r.id),
      //   limit: 10 - rooms.length,
      // });
      this.destroyTimer(); // destroy timer after dispatch
    }

    // if (nextState.timer !== this.state.timer) console.log(nextState.timer); // DEBUGGING TIMER VALUE

    if (rooms.length < ROOMS_NUMBER_TO_ACTIVATE_TIMER && intervalId === null) { // set timer if needed and if there is NO timer set
      this.setTimer();
    } else if (rooms.length >= ROOMS_NUMBER_TO_ACTIVATE_TIMER && intervalId) { // destroy timer if there are enough rooms
      this.destroyTimer();
    }
  }

  componentWillUnmount() {
    this.destroyTimer(); // always destroy
  }

  /**
   * Set timer and set its id to state
   */
  setTimer() {
    // console.log('set timer');
    const intId = setInterval(() => { this.countdown(); }, 1000);
    this.setState({
      timer: ROOMS_UPDATE_INTERVAL,
      intervalId: intId,
    });
  }

  /**
   * Removes timer and clean id from state
   */
  destroyTimer() {
    // console.log('destroy timer');
    clearInterval(this.state.intervalId);
    this.setState((prevState) => ({ ...prevState, ...{ timer: ROOMS_UPDATE_INTERVAL, intervalId: null } }));
  }

  searchRooms = (e) => {
    if (!e || !e.target.value) this.props.dispatch({ type: 'CANCEL_ROOMS_SEARCH' }); // switch off searching in props (used in sagas)

    // const searchQuery = !e || !e.target.value ? {} : { title: e.target.value, ids: this.props.roomManager.rooms.getActiveRooms().map((r) => r.id) };
    // // this.props.dispatch({
    // //   type: !e || !e.target.value ? 'GET_ROOMS_REQUEST' : 'SEARCH_ROOMS_REQUEST', // if no search value, make get rooms request
    // //   ...searchQuery,
    // // });
    // this.props.dispatch(addRoomsSearch({
    //   title: e.target.value,
    // }));
  };

  /**
   * Timer countdown
   */
  countdown() {
    this.setState((prevState) => ({ ...prevState, ...{ timer: prevState.timer - 1 } }));
  }

  createList = () => {
    this.VirtualRoomsList = VirtualList({
      container: this.container,
      initialState: {
        firstItemIndex: 0, // show first ten items
        lastItemIndex: 9, // during initial render
      },
    })(RoomsList);
  }

  render() {
    const VirtualRoomsList = this.VirtualRoomsList;
    const { dispatch, filterPanelOpened, roomsFilterSettings, roomManager } = this.props;

    return (
      <LeftPanelWrapper>
        <SecondAside {...this.props} show={filterPanelOpened} onClick={() => { this.props.toggleFilterPanel(!filterPanelOpened); }} component="filter" />
        <Helper>
          <LeftPanelHeader
            onSearchInputChange={() => {}}
            route={this.props.route}
            searchProcessing={false}
            dispatch={dispatch}
          />
          <RoomsWrp
            innerRef={(w) => this.container = w } // eslint-disable-line
          >
            {VirtualRoomsList &&
            <StyledScrollbar theme="rooms" returnChildren>
              <VirtualRoomsList
                items={footballRooms}
                footballRooms={footballRooms}
                {...this.props}
                itemHeight={this.props.showChartPreview ? 250 : 122}
                itemBuffer={2}
              />
            </StyledScrollbar>}
            {roomManager.isLoaded && !roomManager.rooms.getRooms().length && <div>
              <EmptyHistoryMsg>
                <FormattedMessage {...messages.empty_history} />
              </EmptyHistoryMsg>
              <CreateButton onClick={redirectToRoomCreate}>
                <FormattedMessage {...messages.history_create_room} />
              </CreateButton>
            </div>}
          </RoomsWrp>
        </Helper>
      </LeftPanelWrapper>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  roomManager: (state) => state.get('roomManager') || {},
  needBetNotification: (state) => state.getIn(['settings', 'game', 'needBetNotification']),
  searchProcessing: (state) => state.getIn(['mainPage', 'searchProcessing']),
  showChartPreview: (state) => state.getIn(['settings', 'app', 'showChartPreview']),
  roomsSortSettings: (state) => {
    const settings = state.getIn(['settings', 'game', 'roomsSortSettings']);
    if (settings) return settings.toJS();
    return {};
  },
  roomsFilterSettings: (state) => state.getIn(['settings', 'game', 'roomsFilterSettings']).toJS(),
  route: (state) => state.getIn(['settings', 'app', 'leftPanel', 'route']),
  filterPanelOpened: (state) => state.getIn(['settings', 'app', 'leftPanel', 'filterPanelOpened']),
  userId: (state) => state.getIn(['global', 'profile', 'id']),
  settings: (state) => state.getIn(['settings']),
});

export default connect(mapStateToProps, (dispatch) => ({
  onToggleShowNotice: (open) => dispatch(toggleShowNotice(open)),
  makeBet: (bet) => dispatch(makeBet(bet)),
  onToggleViewRooms: (open) => dispatch(toggleViewRooms(open)),
  updateRoomsFilterSettings: (settings) => dispatch(updateRoomsFilterSettings(settings)),
  cancelFilter: () => dispatch(cancelRoomsFilter()),
  toggleFilterPanel: (open) => dispatch(toggleFilterPanel(open)),
  addRoomsRequest: (payload) => dispatch(addRoomsRequest(payload)),
  dispatch,
}))(Rooms);
