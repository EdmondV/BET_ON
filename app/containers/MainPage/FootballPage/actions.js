import { generateData } from './mocks/data';

// data
export const GENERATE_DATA = 'GENERATE_DATA';
export const TICKER_TICK = 'TICKER_TICK';

// video
export const SAVE_VIDEO_TS = 'SAVE_VIDEO_TS';

export const TOGGLE_VIDEO_FULLSCREEN = 'TOGGLE_VIDEO_FULLSCREEN';

// navigation
export const GO_TO_ROOM = 'GO_TO_ROOM';

// bets
export const CHANGE_TIMEFRAME = 'CHANGE_TIMEFRAME';
export const MAKE_NEW_BET = 'MAKE_NEW_BET';
export const CHANGE_BET_RESULT = 'CHANGE_BET_RESULT';
export const SEND_CHAT_MESSAGE_REQUEST = 'SEND_CHAT_MESSAGE_REQUEST';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const ON_TOGGLE_ANIMATED_FOOTBALLER = 'ON_TOGGLE_ANIMATED_FOOTBALLER';
export const TOGGLE_WIDGET = 'TOGGLE_WIDGET';

export const generate = () => ({
  type: GENERATE_DATA,
  payload: generateData,
});

export const toggleVideoFullScreen = ({ data, time, fullScreen }) => ({
  type: TOGGLE_VIDEO_FULLSCREEN,
  payload: {
    data,
    time,
    fullScreen,
  },
});

export const goToRoom = (id) => ({
  type: GO_TO_ROOM,
  payload: { id },
});

export const saveVideoTs = ({ ts, id }) => ({
  type: SAVE_VIDEO_TS,
  payload: { time: ts, id },
});

export const changeTimeframe = (data) => ({
  type: CHANGE_TIMEFRAME,
  payload: {
    data,
  },
});

export const makeNewBet = (data) => ({
  type: MAKE_NEW_BET,
  payload: {
    data,
  },
});

export const toggleWidget = (data) => ({
  type: TOGGLE_WIDGET,
  payload: {
    data,
  },
});

export const changeBetResult = (data) => ({
  type: CHANGE_BET_RESULT,
  payload: {
    data,
  },
});

export const sendChatMessage = ({ message, ts }) => ({
  type: SEND_CHAT_MESSAGE_REQUEST,
  payload: {
    message,
    ts,
  },
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const onToggleAnimatedFootballer = (data) => ({
  type: ON_TOGGLE_ANIMATED_FOOTBALLER,
  payload: {
    data,
  },
});
