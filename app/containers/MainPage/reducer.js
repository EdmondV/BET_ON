import { fromJS, List } from 'immutable';

import { ROOM_GAME_STATUS, ROOM_STATUS } from 'constants/room';
import { loadedSettings } from 'modules/settings/settings';
import { removeAppPreloader } from 'utils/domHelper';
import { recommendedRoom } from './actions';

export const initialState = fromJS({
  isRoomLoading: false,
  isOnline: true,
  profileIsLoaded: false,
  isWsConnected: true,
  showRecommended: false,
  recommendedFetching: false,
  confirmationSent: false,
  confirmationEmail: '',
  leaders: new List(),
  leadersLoaded: false,
  recommendedRoom: {},
  bettingOn: false,
  messages: new List(),
  roomsHistory: new List(),
  roomsHistoryLoaded: false,
  roomsRecommended: new List(),
  showAvatarUploader: false,
  spotlight: 0,
  profileStats: {
    rank: 0,
    dailyProfit: 0,
  },
  roomsSearch: {
    active: false,
    title: '',
  },
  searchProcessing: false,
  demoUserLogoutPopup: false,
  sortSettings: loadedSettings.getIn(['game', 'roomsSortSettings']),
  filterSettings: loadedSettings.getIn(['game', 'roomsFilterSettings']),
  availableAssets: [],
});

export const winningTeam = (room, v) => {
  if (!room.firstAsset) return ROOM_GAME_STATUS.DRAW;
  if (room.status === ROOM_STATUS.CANCELLED) return ROOM_GAME_STATUS.DRAW;

  if (room.firstAsset.value > v) {
    return ROOM_GAME_STATUS.BEARS_WIN;
  } else if (room.firstAsset.value < v) {
    return ROOM_GAME_STATUS.BULLS_WIN;
  }

  return ROOM_GAME_STATUS.DRAW;
};

const searchRooms = (title) => (
  !title ? this.initialState.getIn(['roomsSearch']) : fromJS({
    active: true,
    title,
  })
);

function mainPageReducer(state = initialState, { type, payload, changed, args, ...action }) {
  switch (type) {
    case 'SETTINGS.SAVE':
      if (changed && changed.path.includes('roomsSortSettings')) {
        return state.set('sortSettings', changed.value);
      } else if (changed && changed.path.includes('roomsFilterSettings')) {
        return state.set('roomsFilterSettings', changed.value);
      }
      return state;
    case 'FILTER_ROOMS': {
      if (!state.getIn(['filterSettings', 'active'])) return state;
      return state.set('rooms', new List());
    }
    case 'ADD_ROOM_SUCCESS':
      if (!payload.payload || !payload.payload.rooms || !payload.payload.rooms.length) return state;
      return state.update('rooms', (r) => new List([...r, ...payload.payload.rooms]));
    case 'SEARCH_ROOMS_SUCCESS':
    case 'SEARCH_ROOMS_FAILURE':
      return state.set('searchProcessing', false);
    case 'SEARCH_ROOMS_REQUEST': {
      const { title } = args;
      return state
        .set('searchProcessing', true)
        .set('roomsSearch', searchRooms(title));
    }
    case 'CANCEL_ROOMS_SEARCH':
      return state.set('roomsSearch', searchRooms());
    case 'BET_REQUEST':
      return state.set('bettingOn', action.bet.id);
    case 'CHANGE_EMAIL_REQUEST':
      return state.set('confirmationEmail', payload.email);
    case 'CHANGE_EMAIL_SUCCESS':
    case 'CONFIRMATION_SUCCESS':
      return state.set('confirmationSent', true);
    case 'CONFIRMATION_RESET':
      return state.set('confirmationSent', false);
    case 'CREATE_NEW_ROOM_REQUEST':
      return state
        .set('loading', true);
    case 'CREATE_NEW_ROOM_FAILURE':
    case 'CREATE_NEW_ROOM_SUCCESS':
      return state
        .set('loading', false);
    case 'SEARCH_ROOMS_FINISHED_REQUEST':
      return state
        .set('searchProcessing', true);
    case 'SEARCH_ROOMS_FINISHED_SUCCESS': {
      return state
        .set('roomsHistory', payload && payload.length ? payload : new List())
        .set('roomsHistoryLoaded', true)
        .set('searchProcessing', false);
    }
    case 'GET_ROOMS_FINISHED_SUCCESS':
      return state
        .set('roomsHistory', payload && payload.length ? payload : new List())
        .set('roomsHistoryLoaded', true);
    case 'SEARCH_ROOMS_FINISHED_FAILURE':
      return state
        .set('searchProcessing', false);
    case 'ADD_ROOMS_FINISHED_SUCCESS': {
      if (!payload) return state.set('roomsHistoryLoaded', true);
      if (payload.length < 20) {
        return state
          .update('roomsHistory', (rooms) => rooms.concat(payload))
          .set('roomsHistoryLoaded', true);
      }
      return state.update('roomsHistory', (rooms) => rooms.concat(payload));
    }
    case 'UPDATE_CHAT':
      return state.update('messages', (data) => data.concat([payload.data]));
    case 'SET_CHAT_HISTORY':
      return state.set('messages', payload.data.map((m) => m.data).sort((m1, m2) => m1.createdAt - m2.createdAt));
    case 'REMOVE_FROM_ROOMS':
      return state
        .update('rooms', (rooms) => rooms.filter((r) => r.id !== payload.id));
    case 'JOIN_ROOM':
      return state
        .set('showRecommended', false)
        .set('messages', new List())
        .update('rooms', (r) => r.filter((room) => room.status !== ROOM_STATUS.CANCELLED))
        .set('recommendedRoom', {});
    case 'LEADERS_SUCCESS':
      return state
        .set('leaders', payload.payload)
        .set('leadersLoaded', true);
    case recommendedRoom.REQUEST:
      return state.set('recommendedFetching', true);
    case recommendedRoom.SUCCESS:
      return state
        .set('recommendedFetching', false)
        .set('showRecommended', true);
    case recommendedRoom.FAILURE:
      return state
        .set('recommendedFetching', false);
    case 'HIDE_RECOMMENDED':
      return state
        .set('showRecommended', false);
    case 'SHOW_AVATAR_UPLOADER':
      return state
        .set('showAvatarUploader', true);
    case 'HIDE_AVATAR_UPLOADER':
    case 'AVATAR_SUCCESS':
      return state
        .set('showAvatarUploader', false);
    case 'TOGGLE_LOGOUT_POPUP':
      return state.set(('demoUserLogoutPopup'), action.open);
    case 'NAVIGATOR_ONLINE':
      return state.set('isOnline', true);
    case 'NAVIGATOR_OFFLINE':
      return state.set('isOnline', false);
    case 'HANDLE_FORM_ERROR':
      return state.set('formErrors', action.payload);
    case 'TOGGLE_SPOTLIGHT_ANIMATION':
      return state.set('spotlight', action.team);
    case 'PROFILE_STATS_SUCCESS':
      return state.set('profileStats', payload.payload);
    case 'GET_AVAILABLE_ASSETS_SUCCESS':
      return state.set('availableAssets', payload.payload);

    // WS
    case 'WS.CONNECTED':
      if (state.get('profileIsLoaded')) {
        removeAppPreloader();
      }
      return state.set('isWsConnected', true);
    case 'WS.CONNECTION_CHANGE':
      // return state.set('isWsConnected', action.connected);
      return state.set('isWsConnected', true);
    case 'PROFILE_SUCCESS':
      if (state.get('isWsConnected')) {
        removeAppPreloader();
      }
      return state.set('profileIsLoaded', true);

    default:
      return state;
  }
}

export default mainPageReducer;
