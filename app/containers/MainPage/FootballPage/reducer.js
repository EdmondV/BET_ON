/* eslint-disable
 no-return-assign,
 no-param-reassign,
 one-var,
 */
import _ from 'lodash';
import {
  GENERATE_DATA,
  TICKER_TICK,
  TOGGLE_VIDEO_FULLSCREEN,
  GO_TO_ROOM,
  SAVE_VIDEO_TS,
  CHANGE_TIMEFRAME,
  MAKE_NEW_BET,
  CHANGE_BET_RESULT,
  SEND_CHAT_MESSAGE_REQUEST,
  CLOSE_MODAL,
  ON_TOGGLE_ANIMATED_FOOTBALLER,
  TOGGLE_WIDGET,
} from './actions';
import { footballRoomModel1, footballRoomModel2, footballRoomModel3, footballRoomModel4, footballRoomModel5, userModel } from './mocks/data';
import { messagesList1, messagesList2, messagesList3, messagesList4, messagesList5 } from './mocks/botBetsData';

export const initialState = {
  footballRooms: [footballRoomModel1, footballRoomModel2, footballRoomModel3, footballRoomModel4, footballRoomModel5],
  selectedRoom: { ...footballRoomModel1 },
  messagesLists: [messagesList1, messagesList2, messagesList3, messagesList4, messagesList5],
  messagesList: { ...messagesList1 },
  timeframe: 5,
  currentTs: 0,
  username: localStorage.getItem('demoUserName') || 'You',
  isExplModalOpen: !localStorage.getItem('explModalOpen'),
  user: { ...userModel },
  ended: [],
  isFootballerShow: false,
  isWidgetShow: true,

};

const addData = ({ data }, tick) => _.uniqBy([...data, tick], 'timestamp');

function updateBalance({ user }, betValue) {
  const newUser = { ...user };
  const balance = newUser.balance - betValue;

  newUser.balance = balance > 0 ? balance : 1000 - betValue;

  return newUser;
}

function winUpdateBalance({ user }, win) {
  const newUser = { ...user };

  newUser.balance += win;

  return newUser;
}

function footballPageReducer(state = initialState, { type, payload, changed, args, ...action }) { // eslint-disable-line
  switch (type) {
    case TICKER_TICK: {
      const room = { ...state.selectedRoom };
      const rooms = [...state.footballRooms];

      const i = rooms.findIndex((r) => r.id === room.id);
      rooms[i].data = addData(room, payload);
      room.data = addData(room, payload);

      return { ...state, selectedRoom: room, footballRooms: rooms, currentTs: payload.timestamp };
    }
    case TOGGLE_VIDEO_FULLSCREEN: {
      const { fullScreen, data, time } = payload;
      return { ...state, selectedRoom: { ...state.selectedRoom, video: { ...state.selectedRoom.video, fullScreen, data, time } } };
    }
    case SAVE_VIDEO_TS: {
      const { time, id } = payload;
      const rooms = [...state.footballRooms];

      const i = rooms.findIndex((r) => r.id === id);
      rooms[i].video.time = time;

      return { ...state, footballRooms: rooms };
    }
    case CHANGE_TIMEFRAME: {
      const { data } = payload;
      return { ...state, timeframe: data };
    }
    case MAKE_NEW_BET: {
      const { data } = payload;
      if (!data.bet) return state;
      const newSelectedRoom = { ...state.selectedRoom };
      const index = newSelectedRoom.bets.findIndex((bet) => bet.timestamp >= data.timestamp);
      newSelectedRoom.bets.splice(index !== -1 ? index : newSelectedRoom.bets.length, 0, data);
      return { ...state, selectedRoom: newSelectedRoom, user: { ...updateBalance(state, data.bet) } };
    }
    case GENERATE_DATA:
      return state;
    case GO_TO_ROOM: {
      const { id } = payload;
      const currentRoom = { ...state.selectedRoom };

      if (currentRoom.id !== id) {
        const room = { ...state.footballRooms.find((r) => r.id === id) };
        const list = { ...state.messagesLists.find((r) => r.id === id) };
        return { ...state, selectedRoom: room || state.footballRooms[0], messagesList: list || state.messagesLists[0] };
      }
      return state;
    }
    case CHANGE_BET_RESULT: {
      const { data } = payload;
      const selectedRoom = { ...state.selectedRoom };
      selectedRoom.bets.forEach((b) => {
        if (b.id === data.id) {
          b.result = 'Win';
        }
      });
      return { ...state, selectedRoom };
    }
    case SEND_CHAT_MESSAGE_REQUEST: {
      const { message, ts } = payload;
      const messagesList = { ...state.messagesList };

      const index = messagesList.messages.findIndex((r) => r.timestamp >= ts);
      const currentIndex = index !== -1 ? index : messagesList.messages.length;
      const newMessage = {
        user: true,
        avatar: './assets/neymar.png',
        username: state.username.length ? state.username : 'You',
        id: Math.random().toString(36).substr(5, 13),
        timestamp: ts,
        message,
      };
      messagesList.messages.splice(currentIndex, 0, newMessage);
      return { ...state, messagesList };
    }
    case 'END_GAME': {
      const { id, win } = payload;
      const newEnded = [...state.ended];

      if (newEnded.find((rId) => rId === id)) {
        return state;
      }

      newEnded.push(id);

      return { ...state, ended: newEnded, user: { ...winUpdateBalance(state, win.yourWinning) } };
    }
    case CLOSE_MODAL: {
      return { ...state, isExplModalOpen: false };
    }
    case ON_TOGGLE_ANIMATED_FOOTBALLER: {
      const { data } = payload;
      return { ...state, isFootballerShow: data };
    }
    case TOGGLE_WIDGET: {
      const { data } = payload;
      return { ...state, isWidgetShow: data };
    }
    default:
      return state;
  }
}

export default footballPageReducer;
