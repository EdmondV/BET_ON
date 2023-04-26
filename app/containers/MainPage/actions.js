import createAction from 'utils/actionsCreator';

export const logout = createAction('LOGOUT', true, 'account');

export const logoutRequest = () => ({ type: 'LOGOUT_REQUEST' });

export const addRoom = createAction('ADD_ROOM', false);

export const bet = createAction('BET', false, 'game');

export const leaders = createAction('LEADERS', false);

export const confirmation = createAction('CONFIRMATION', true, 'account');

export const changeEmail = createAction('CHANGE_EMAIL', true, 'account');

export const deposit = createAction('DEPOSIT_PAGE', true, 'payments');

export const avatar = createAction('AVATAR', true, 'account');

export const recommendedRoom = createAction('RECOMMENDED_ROOM', false);

export const makeBet = (payload) => ({
  type: 'BET_REQUEST',
  bet: payload,
  meta: {
    analytics: {
      type: `make-bet-${payload.team === 1 ? 'bulls' : 'bears'}`,
      category: 'game',
    },
  },
});

export const chat = createAction('SEND_CHAT_MESSAGE');

export const rooms = createAction('GET_ROOMS', false);

export const roomsSearch = createAction('SEARCH_ROOMS', false);

export const addRoomsSearch = ({ title }) => ({
  type: 'SEARCH_ROOMS_REQUEST',
  args: {
    id: 'search_rooms',
    title,
    limit: 10,
  },
});

export const roomsFinishedSearch = createAction('SEARCH_ROOMS_FINISHED', false);

export const roomsFinished = createAction('GET_ROOMS_FINISHED', false);

export const addRoomsFinished = createAction('ADD_ROOMS_FINISHED', false);

export const profile = createAction('PROFILE', false);

export const profileStats = createAction('PROFILE_STATS', false);

export const getProfileStats = () => ({ type: 'PROFILE_STATS_REQUEST' });

/**
 *
 * @param id {string} room id to pin
 * @param setPinned {boolean} only pin (not unpin) on create room / make bet
 * @param open {boolean} analytics data
 */
export const pinTab = (id, setPinned = false, open) => ({
  type: 'PIN_TAB',
  payload: {
    id,
    setPinned,
  },
  meta: {
    sound: 'click',
    analytics: {
      type: `PIN_CURRENT_ROOM_TAB-${open ? 'on' : 'off'}`,
      category: 'interface',
    },
  },
});

// FIXME: merge in one method if analytics needed
/**
 * Without analytics
 * @param id {string} pin tab id
 * @param setPinned {boolean} only pin (not unpin) on create room / make bet
 */
export const setTabPinned = (id, setPinned = false) => ({ type: 'PIN_TAB', payload: { id, setPinned } });

export const subscribeToRoom = (roomToSubscribe) => ({ type: 'SUBSCRIBE_TO_ROOM', room: roomToSubscribe });

export const getRoomData = (id) => ({
  type: 'GET_ROOM_DATA',
  id,
});

export const goToCreateRoom = () => ({
  type: 'GO_TO_CREATE_ROOM',
  meta: {
    analytics: {
      type: 'GO_TO_CREATE_ROOM',
      category: 'interface',
    },
  },
});

export const getRoomDataSuccess = (payload) => ({
  type: 'GET_ROOM_DATA_SUCCESS',
  payload,
});

export const getRandomRoom = () => ({ type: 'GET_RANDOM_ROOM_REQUEST' });

export const hideRecommended = () => ({
  type: 'HIDE_RECOMMENDED',
  meta: {
    analytics: {
      type: 'HIDE_RECOMMENDED',
      category: 'interface',
    },
  },
});

export const availableAssets = createAction('GET_AVAILABLE_ASSETS', false);

export const getAvailableAssets = (payload) => ({
  type: 'GET_AVAILABLE_ASSETS_REQUEST',
  payload,
});

export const newRoom = createAction('CREATE_NEW_ROOM');

export const createNewRoom = (payload) => ({
  type: 'CREATE_NEW_ROOM_REQUEST',
  payload,
  meta: {
    sound: payload.rawData.team === 1 ? 'betRise' : 'betFall',
    analytics: {
      type: 'create-room',
      category: 'game',
    },
  },
});

export const userCards = createAction('GET_USER_CARDS', false);

export const getUserCardsRequest = () => ({
  type: 'GET_USER_CARDS_REQUEST',
});

export const userCard = createAction('GET_USER_CARD', false);

export const getUserCard = (id) => ({
  type: 'GET_USER_CARD_REQUEST',
  id,
});

export const attachment = createAction('SEND_ATTACHMENT');

export const sendAttachment = (payload) => ({
  type: 'SEND_ATTACHMENT_REQUEST',
  payload,
  meta: {
    analytics: {
      type: 'upload-file',
      category: 'account',
    },
  },
});

export const setAttachment = (payload) => ({
  type: 'SET_ATTACHMENT',
  payload,
});

export const clearAttachments = ({
  type: 'CLEAR_ATTACHMENTS',
});

export const clearAttachment = (payload) => ({
  type: 'CLEAR_ATTACHMENT',
  payload,
});

export const toReview = createAction('SEND_CARD_IN_REVIEW');

export const sendInReview = (payload) => ({
  type: 'SEND_CARD_IN_REVIEW_REQUEST',
  payload,
  meta: {
    analytics: {
      type: 'SEND_CARD_IN_REVIEW_REQUEST',
      category: 'account',
    },
  },
});

export const showAvatarUploader = () => ({ type: 'SHOW_AVATAR_UPLOADER', meta: { sound: 'click' } });
export const hideAvatarUploader = () => ({ type: 'HIDE_AVATAR_UPLOADER' });

export const avatarUploadRequest = (payload) => ({
  type: 'AVATAR_REQUEST',
  payload,
  meta: {
    analytics: {
      type: 'AVATAR_REQUEST',
      category: 'account',
    },
  },
});

export const withdrawalRequest = createAction('SEND_WITHDRAWAL', true, 'payments');

export const sendWithdrawalRequest = (payload) => ({
  type: 'SEND_WITHDRAWAL_REQUEST',
  payload,
  meta: {
    analytics: {
      type: 'SEND_WITHDRAWAL_REQUEST',
      category: 'payments',
    },
  },
});

export const feedback = createAction('FEEDBACK', true, 'account');

export const sendFeedback = (payload) => ({
  type: 'FEEDBACK_REQUEST',
  payload,
});


export const username = createAction('UPDATE_USERNAME', true, 'form');

export const password = createAction('UPDATE_PASSWORD', true, 'form');

export const toggleSpotlightAnimation = (team) => ({
  type: 'TOGGLE_SPOTLIGHT_ANIMATION',
  team,
});

export const logsRequest = createAction('LOGS', false);

export const toggleLogoutPopup = (open) => ({
  type: 'TOGGLE_LOGOUT_POPUP',
  open,
});


export const filterRooms = () => ({
  type: 'FILTER_ROOMS',
  args: {
    id: 'filter', // will be handled by pushRequest saga and processing in roomManager
  },
});

export const addRooms = createAction('ADD_ROOMS', false);

export const addRoomsRequest = ({ ids, limit }) => ({
  type: 'ADD_ROOMS_REQUEST',
  args: {
    id: 'add_rooms',
    ids,
    limit,
  },
});

export const assetsHistory = createAction('GET_ASSETS_HISTORY', false);
