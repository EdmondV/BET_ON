import { delay } from 'redux-saga';
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { get, API_URL } from 'utils/request';
import { handleError, handleFormError } from 'utils/errorSaga';
import { errorMessage } from 'utils/intl';

import { fetchActiveRoomsAndTabs, gotoRandomRoom, drawRoomFromCache, setIsLoading } from './actions';
import { redirectToAuth, redirectToBlocked, redirectToRoom, redirectToRoomCreate } from '../../utils/redirects';
import { roomsSearch } from '../../containers/MainPage/actions';
import { convertFromAPI } from './utils';

export function* roomManagerSagas() {
  try {
    yield all([
      takeLatest('ROOM_MANAGER.GO_TO_ROOM', goRoom),
      takeLatest('ROOM_MANAGER.PUSH_REQUEST', pushRequest),
      takeLatest('ROOM_MANAGER.GO_TO_RANDOM_ROOM', goRandomRoom),
      takeLatest('ADD_ROOMS_REQUEST', pushRequest),
      takeLatest(roomsSearch.REQUEST, pushRequest),
    ]);
  } catch (error) {
    let errors = {};
    if (error.response && error.response.json) {
      errors = yield error.response.json();
      if (errors && errors.errors && errors.errors.length) {
        yield put(handleFormError(errors.errors));
      }
    } else {
      yield put(handleError(error));
    }
  }
}

const hasAssets = ({ assets }) => assets && !!(assets.length);

function* goRoom({ args }) {
  const state = yield select();
  const manager = state.get('roomManager');
  const showRecommended = state.getIn(['mainPage', 'showRecommended']);

  const exists = manager.rooms.getRooms().find((r) => r.id === args.id);
  yield put(setIsLoading(true));
  yield delay(10); // A small delay to avoid UI lagging, when chart & grid is animated & redraw

  if (showRecommended) yield put({ type: 'HIDE_RECOMMENDED' });

  if (exists && hasAssets(exists)) {
    yield all([
      put(setIsLoading(false)),
      put(drawRoomFromCache(args.id)),
    ]);
  } else {
    try {
      const { payload: room } = yield call(get, `${API_URL}/room/${args.id}`);

      manager.setActive(convertFromAPI(room));

      yield all([
        put(setIsLoading(false)),
        put(drawRoomFromCache(args.id)),
      ]);
    } catch (error) {
      yield all([
        put(fetchActiveRoomsAndTabs.failure()),
        put(handleError({ error, message: errorMessage('rooms') })),
      ]);

      switch (error.response.status) {
        case 404:
          redirectToRoomCreate();
          break;
        case 423:
          redirectToBlocked();
          break;
        default:
          redirectToAuth();
      }
    }
  }
}

function* goRandomRoom() {
  const state = yield select();
  const manager = state.get('roomManager');

  const room = manager.rooms.getRandomRoom();

  if (room) {
    redirectToRoom(room.id);
    yield put(drawRoomFromCache(room.id));
  } else {
    // yield put(fetchRequest({
    //   url: 'rooms',
    //   query: { limit: 1 },
    //   redirectUrl: (response) => {
    //     if (!response.payload || !response.payload.length) {
    //       return ROOM_CREATE_URL;
    //     }
    //     return ROOM_URL_PREFIX + response.payload[0].id;
    //   },
    //   errorMessage: errorMessage('fetchingRoom'),
    // }));
    redirectToRoomCreate();
  }
}

function* pushRequest({ args }) {
  const state = yield select();
  const manager = state.get('roomManager');

  const search = state.getIn(['mainPage', 'roomsSearch']).toJS();
  const searchQuery = search.active ? { title: search.title } : {};

  // don't use preloader on filter and left panel adding rooms requests
  if (args.id !== 'filter' && args.id !== 'add_rooms') yield put(setIsLoading(true));

  try {
    const response = yield call(get, `${API_URL}/rooms`, manager.formatRequest({ ...args, ...searchQuery }));

    if (args.id === 'search_rooms') yield put(roomsSearch.success());

    yield all([
      put(fetchActiveRoomsAndTabs.success({ ...response.payload, clearRoomsList: args.id === 'filter' || args.id === 'search_rooms', ...searchQuery })),
      args.id === 'random' ? put(gotoRandomRoom()) : null,
      put(setIsLoading(false)),
    ]);
  } catch (error) {
    yield all([
      put(fetchActiveRoomsAndTabs.failure()),
      put(handleError({ error, message: errorMessage('rooms') })),
      put(setIsLoading(false)),
    ]);
  }
}


export default [roomManagerSagas];
