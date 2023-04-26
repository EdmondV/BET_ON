import { fromJS } from 'immutable';
import { all, put, takeLatest, takeEvery, select, call } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { delay } from 'redux-saga';

import { redirectToWithdrawal, ROOM_URL_PREFIX, logout as authLogout } from 'utils/redirects';
import { handleError, handleFormError } from 'utils/errorSaga';
import { get, post, API_URL } from 'utils/request';
import { fetchRequest, postRequest, putRequest } from 'utils/apiSaga';
import { updateNewRoomSettings } from 'modules/settings/actions';
import { m, errorMessage, notify } from 'utils/intl';

import {
  // rooms,
  // addRoom,
  // roomsSearch,
  roomsFinishedSearch,
  logout,
  profileStats,
  chat,
  roomsFinished,
  addRoomsFinished,
  bet,
  setTabPinned,
  getRoomDataSuccess,
  subscribeToRoom,
  leaders,
  recommendedRoom,
  availableAssets,
  newRoom,
  confirmation,
  changeEmail,
  deposit,
  avatar,
  userCards,
  userCard,
  attachment,
  toReview,
  getUserCard,
  getUserCardsRequest,
  withdrawalRequest,
  feedback,
  username,
  password,
  logsRequest,
  assetsHistory,
  profile,
} from './actions';

import { convertFromAPI, processRoom } from '../../modules/rooms/utils';

export function* mainWatcherSaga() {
  try {
    yield all([
      // takeEvery('PROCESS_BET', processBet),
      takeEvery('SUBSCRIBE_TO_ROOM', subscribeToRoom),
      takeLatest(logout.REQUEST, handleLogoutSaga),
      takeLatest(confirmation.REQUEST, handleConfirmationSaga),
      takeLatest(deposit.REQUEST, handleDepositSaga),
      takeEvery(changeEmail.REQUEST, handleChangeEmailSaga),
      // takeLatest(addRoom.REQUEST, addRoomWithExclude),
      // takeLatest(roomsSearch.REQUEST, searchRooms),
      takeEvery('GET_ROOM_DATA', getRoomData),
      takeLatest(profileStats.REQUEST, getProfileStats),
      takeLatest(chat.REQUEST, sendMessage),
      takeLatest(leaders.REQUEST, getLeaders),
      takeLatest(roomsFinished.REQUEST, getRoomsFinished),
      takeLatest(roomsFinishedSearch.REQUEST, searchRoomsFinished),
      takeLatest(addRoomsFinished.REQUEST, addFinishedRooms),
      takeLatest(recommendedRoom.REQUEST, getRecommendedRoom),
      takeLatest(bet.REQUEST, makeBet),
      takeLatest(availableAssets.REQUEST, getAvailableAssets),
      takeLatest(newRoom.REQUEST, createRoom),
      takeLatest(avatar.REQUEST, changeAvatar),
      takeLatest(userCards.REQUEST, getUserCards),
      takeLatest(userCard.REQUEST, getUserCardSaga),
      takeEvery(attachment.REQUEST, sendAttachment),
      takeEvery(toReview.REQUEST, sendCardInReview),
      takeLatest(withdrawalRequest.REQUEST, sendWithdrawalRequest),
      takeLatest(feedback.REQUEST, sendFeedback),
      takeEvery(profile.REQUEST, getProfile),
      takeEvery(username.REQUEST, updateUsername),
      takeEvery(password.REQUEST, updatePassword),
      takeLatest(logsRequest.REQUEST, handleLogRequest),
      takeLatest('SETTINGS.SAVE_SIDEBAR', onToggleSidebar),
      takeLatest('UPDATE_ROOM', onUpdateRoomsList),
      takeLatest('CANCEL_ROOM', onUpdateRoomsList),
      takeLatest('CANCEL_ACTIVE_ROOM', onUpdateRoomsList),
      takeLatest('FILTER_ROOMS', onFilterRooms),
      takeLatest('ROOM_MANAGER.SELECT_ASSET', onSelectAsset),
      takeLatest('GO_TO_RECOMMENDED_ROOM', onGoToRecommendedRoom),
      takeLatest('GO_TO_ROOM', onGoToRoom),
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

export function* getLeaders() {
  yield put(fetchRequest({
    url: 'users/leaders',
    action: leaders,
    errorMessage: errorMessage('leaders'),
  }));
}

export function* getAvailableAssets(request) {
  yield put(fetchRequest({
    url: 'assets',
    query: {
      timeframe: request.payload.timeframe,
    },
    action: availableAssets,
    errorMessage: 'Assets error',
  }));
}

export function* getRecommendedRoom() {
  try {
    const response = yield call(get, `${API_URL}/rooms/recommended`);
    const { payload } = response;
    // payload can be NULL. payload: payload because roomManager reducer would destruct { payload } = action. payload: payload prevents error in reducer
    yield all([
      put({ type: 'ROOM_MANAGER.ADD_RECOMMENDED', payload: payload }), // eslint-disable-line
      put(recommendedRoom.success(payload)),
    ]);
  } catch (error) {
    yield all([
      put(recommendedRoom.failure()),
      put(handleError({ error, message: errorMessage('recommended') })),
    ]);
  }
}

export function* createRoom({ payload }) {
  yield all([
    put(postRequest({
      url: 'rooms',
      action: newRoom,
      query: payload.parsedData,
      redirectUrl: (response) => ROOM_URL_PREFIX + response.payload.id,
      errorMessage: errorMessage('newRoom'),
      chain: [
        (roomData) => put(setTabPinned(roomData.payload.id, true)), // only pin
        () => put(updateNewRoomSettings(fromJS(payload.rawData))), // Need to store immutable map instead of native JS
      ],
    })),
  ]);
}

export function* changeAvatar(request) {
  yield put(postRequest({
    url: 'files/avatar',
    action: avatar,
    query: request.payload,
    errorMessage: errorMessage('avatar'),
    chain: [
      () => put(notify(m('global.avatarChanged'))),
    ],
  }));
}

export function* handleLogoutSaga() {
  yield put(fetchRequest({
    url: 'signout',
    action: logout,
    redirectUrl: '/',
    errorMessage: m('errors.logout'),
    chain: [
      () => authLogout(false),
    ],
  }));
}

export function* handleConfirmationSaga() {
  yield put(postRequest({
    url: 'profile/email/resend',
    action: confirmation,
    errorMessage: errorMessage('confirmation'),
    chain: [
      () => put(notify(m('TooltipConfirmationSent'))),
    ],
  }));
}

export function* handleDepositSaga({ payload }) {
  yield put(postRequest({
    url: 'user/cards/deposit',
    action: deposit,
    query: payload,
    errorMessage: errorMessage('deposit'),
    noGlobalError: true,
    chain: [
      (response) => window.location.replace(response.payload.auth3dUrl),
    ],
  }));
}

export function* handleChangeEmailSaga({ payload }) {
  yield put(putRequest({
    url: 'profile/email/change',
    action: changeEmail,
    query: payload,
    errorMessage: errorMessage('confirmation'),
    noGlobalError: true,
    chain: [
      () => put(notify(m('global.emailChanged'))),
    ],
  }));
}

export function* getProfileStats() {
  yield put(fetchRequest({
    url: 'profile/stats',
    action: profileStats,
    errorMessage: errorMessage('profile'),
  }));
}

export function* getProfile() {
  yield put(fetchRequest({
    url: 'profile',
    action: profile,
    errorMessage: errorMessage('profile'),
  }));
}

export function* getRoomData(request) {
  if (request.id === 'new') return;
  let id = null;
  if (request.payload && request.payload.id) {
    id = request.payload.id;
  } else if (request.id) {
    id = request.id;
  } else {
    return;
  }
  yield put(fetchRequest({
    url: `room/${id}`,
    chain: [
      (response) => put(getRoomDataSuccess(response)),
      (roomData) => put({ type: 'SET_TIMER', payload: roomData }),
    ],
  }));
}

/**
 * Returns filter query to be used in rooms/active fetching
 * @param state Application state
 * @returns {object} filter query OR empty object
 */
// function filter(state) {
//   if (!state.getIn(['settings', 'game', 'roomsFilterSettings', 'active'])) return {};
//   const asset = state.getIn(['settings', 'game', 'roomsFilterSettings', 'assets']).toJS();
//   const timeframe = state.getIn(['settings', 'game', 'roomsFilterSettings', 'timeframe']).toJS();
//   let minBet = state.getIn(['settings', 'game', 'roomsFilterSettings', 'minBet']);
//   let maxBet = state.getIn(['settings', 'game', 'roomsFilterSettings', 'maxBet']);
//
//   minBet = minBet === '' ? {} : { minBet };
//   maxBet = maxBet === '' ? {} : { maxBet };
//   return {
//     asset,
//     timeframe,
//     ...minBet,
//     ...maxBet,
//   };
// }

/**
 * Returns search query to be used in rooms/active fetching
 * @param state Application state
 * @returns {object} search query OR empty object
 */
// function search(state) {
//   if (!state.getIn(['mainPage', 'roomsSearch', 'active'])) return {};
//
//   const title = state.getIn(['mainPage', 'roomsSearch', 'title']);
//
//   return {
//     title,
//   };
// }

// function getExistingRoomsIds(state) {
//   const sidebarRooms = state.getIn(['mainPage', 'rooms']).map((r) => r.id).toJS();
//   const pinnedRooms = state.getIn(['mainPage', 'pinnedRooms']).map((r) => r.id).toJS();
//
//   return concat(sidebarRooms, pinnedRooms);
// }

// export function* addRoomWithExclude({ payload }) {
//   const state = yield select();
//   const filterQuery = filter(state);
//   const searchQuery = search(state);
//   const existingRooms = getExistingRoomsIds(state);
//   const { limit } = payload;
//   try {
//     const response = yield call(get, `${API_URL}/rooms`, {
//       limit: limit || 1,
//       ...searchQuery, // adds only if search is active
//       ...filterQuery,
//       excludeRooms: existingRooms,
//       excludeMy: true,
//       status: 4,
//     });
//
//     yield put(addRoom.success(response));
//
//     if (!response.payload || !response.payload.length) {
//       return;
//     }
//     const newRooms = response.payload
//       .filter((r) => !existingRooms.includes(r.id));
//
//     yield all([
//       newRooms.map((room) => put(subscribeToRoom(room))),
//     ]);
//   } catch (error) {
//     yield all([
//       put(addRoom.failure()),
//       put(handleError({ error, message: errorMessage('rooms') })),
//     ]);
//   }
// }

// export function* searchRooms({ title }) {
//   yield call(delay, 300); // debounce, don't remove
//   const state = yield select();
//   const existingRooms = getExistingRoomsIds(state);
//   try {
//     const filterQuery = filter(state);
//     const response = yield call(get, `${API_URL}/rooms`, { status: 4, title, ...filterQuery });
//     yield put(roomsSearch.success(response));
//
//     if (!response.payload || !response.payload.length) {
//       return;
//     }
//     const newRooms = response.payload
//       .filter((r) => !existingRooms.includes(r.id));
//
//     yield all([
//       newRooms.map((room) => put(subscribeToRoom(room))),
//     ]);
//   } catch (error) {
//     yield all([
//       put(rooms.failure()),
//       put(handleError({ error, message: errorMessage('rooms') })),
//     ]);
//   }
// }

export function* sendMessage(request) {
  const { message, roomId } = request;
  yield put(postRequest({
    url: `room/${roomId}/chat`,
    query: { message, roomId },
    action: chat,
    errorMessage: m('makeBetChatTooltip'),
  }));
}

export function* makeBet(request) {
  yield put(postRequest({
    url: `room/${request.bet.id}/bet`,
    query: request.bet,
    action: bet,
    chain: [
      () => put(setTabPinned(request.bet.id, true)), // only pin
      () => put({ type: 'JOIN_CHAT', id: request.bet.id }),
      (response) => put({
        type: 'PLAY_SOUND',
        meta: {
          sound: response.payload.team === 1 ? 'betRise' : 'betFall',
        },
      }),
    ],
  }));
}

const history = (title, offset = 0, action) => ({
  url: 'rooms/finished',
  query: { title, offset },
  action,
  errorMessage: errorMessage('history'),
});

// FIXME: dry issue
export function* searchRoomsFinished({ title }) {
  yield call(delay, 300); // debounce, don't remove
  yield put(fetchRequest(history(title, 0, roomsFinishedSearch)));

  const state = yield select();
  const { userId, time } = state.get('roomManager');

  try {
    const response = yield call(get, `${API_URL}/rooms/finished/${title ? `?title=${title}` : ''}`);
    const { payload } = response;
    yield put(roomsFinishedSearch.success(payload && payload.length ? payload.map((r) => processRoom(convertFromAPI(r), userId, time)) : payload));
  } catch (error) {
    roomsFinishedSearch.failure();
    yield put(handleError({ error, message: errorMessage('history') }));
  }
}

export function* getRoomsFinished({ title, offset = 0 }) {
  const state = yield select();
  const { userId, time } = state.get('roomManager');

  try {
    const response = yield call(get, `${API_URL}/rooms/finished/?offset=${offset}${title ? `&title=${title}` : ''}`);
    const { payload } = response;
    yield put(roomsFinished.success(payload && payload.length ? payload.map((r) => processRoom(convertFromAPI(r), userId, time)) : payload));
  } catch (error) {
    roomsFinished.failure();
    yield put(handleError({ error, message: errorMessage('history') }));
  }
}

export function* addFinishedRooms({ title, offset }) {
  const state = yield select();
  const { userId, time } = state.get('roomManager');

  try {
    const response = yield call(get, `${API_URL}/rooms/finished/?offset=${offset}${title ? `&title=${title}` : ''}`);
    const { payload } = response;
    yield put(addRoomsFinished.success(payload && payload.length ? payload.map((r) => processRoom(convertFromAPI(r), userId, time)) : payload));
  } catch (error) {
    yield put(handleError({ error, message: errorMessage('history') }));
  }
}

export function* getUserCards() {
  yield put(fetchRequest({
    url: 'user/cards',
    action: userCards,
    errorMessage: errorMessage('cards'),
  }));
}

export function* getUserCardSaga(payload) {
  yield put(fetchRequest({
    url: 'user/card/' + payload.id, // eslint-disable-line
    action: userCard,
    errorMessage: errorMessage('card'),
  }));
}

export function* sendAttachment({ payload }) {
  const { formData } = payload;
  try {
    const response = yield call(post, `${API_URL}/files/attachment`, formData, 'multipart/form-data');
    yield put(attachment.success({
      response,
      index: payload.index,
    }));
  } catch (error) {
    yield put(attachment.failure({
      index: payload.index,
    }));
    yield put(handleError({ error, message: errorMessage('uploadingFile') }));
  }
}

export function* sendCardInReview(payload) {
  const { attachments, cardId, message, redirect } = payload.payload;
  yield put(postRequest({
    url: `user/card/${cardId}/review`,
    query: { attachments, message },
    action: toReview,
    errorMessage: 'Error on sending application',
    chain: [
      () => put(getUserCard(cardId)),
      () => put(getUserCardsRequest()),
      () => { if (redirect) redirectToWithdrawal(); },
    ],
  }));
}

export function* sendWithdrawalRequest(action) {
  const { payload } = action;
  const {
    cardNumber,
    expirationMonth,
    expirationYear,
    addressCountry,
    addressCity,
    addressLine,
    amount,
  } = payload;
  yield put(postRequest({
    url: `user/card/${payload.id}/withdrawal`,
    query: {
      cardNumber,
      expirationMonth,
      expirationYear,
      addressCountry,
      addressCity,
      addressLine,
      amount,
    },
    action: withdrawalRequest,
    errorMessage: errorMessage('withdrawal'),
  }));
}

export function* sendFeedback({ payload }) {
  const state = yield select();
  yield put(postRequest({
    url: 'feedback',
    query: {
      message: payload.message,
      email: payload.email || state.getIn(['global', 'profile', 'email']),
    },
    action: feedback,
    errorMessage: errorMessage('feedback'),
    noGlobalError: true,
    chain: payload.cb.concat([
      () => put(notify(m('global.feedbackSent'))),
    ]),
  }));
}

export function* updateUsername({ payload }) {
  yield put(putRequest({
    url: 'profile',
    query: {
      username: payload.username,
    },
    action: username,
    errorMessage: 'Username exists',
    noGlobalError: true,
    chain: [
      () => put(notify(m('global.usernameChanged'))),
    ],
  }));
}

export function* updatePassword({ payload }) {
  yield put(putRequest({
    url: 'profile/password',
    query: {
      oldPassword: payload.oldPassword,
      password: payload.password,
      passwordConfirm: payload.password,
    },
    errorMessage: errorMessage('passwordUpdate'),
    action: password,
    noGlobalError: true,
    chain: [
      () => put(notify(m('global.passwordChanged'))),
    ],
  }));
}

export function* handleLogRequest() {
  yield put(fetchRequest({
    url: 'profile/balance/log',
    action: logsRequest,
    errorMessage: errorMessage('balance'),
  }));
}

export function* onToggleSidebar({ changed }) {
  // on change route with avatar upload in progress this resets component in second aside to "Edit profile"
  const { open, route } = changed;
  if (!open || route !== 'account') yield put({ type: 'HIDE_AVATAR_UPLOADER' });
}

export function* onUpdateRoomsList() {
  const state = yield select();
  const sortIsActive = state.getIn(['settings', 'game', 'roomsSortSettings', 'active']);
  if (sortIsActive) yield put({ type: 'SORT_ROOMS' });
}

export function* onFilterRooms({ args }) {
  yield put({ type: 'ROOM_MANAGER.PUSH_REQUEST', args });
}

export function* onSelectAsset({ payload }) {
  const { asset, from, to } = payload;
  try {
    const response = yield call(get, `${API_URL}/assets/history/${asset}/${from}/${to}`);
    yield put(assetsHistory.success(response));
  } catch (error) {
    yield all([
      put(assetsHistory.failure()),
      put(handleError({ error, message: errorMessage('assets') })),
    ]);
  }
}

export function* onGoToRecommendedRoom() {
  yield put({ type: 'HIDE_RECOMMENDED' });
}

export function* onGoToRoom({ payload }) {
  yield browserHistory.push(ROOM_URL_PREFIX + payload.id);
}

export default [mainWatcherSaga];
