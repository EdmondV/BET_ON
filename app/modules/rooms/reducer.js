import RoomManager from './RoomManager';
import { convertShortAsset } from '../../utils/math';

function roomManagerReducer(manager = new RoomManager(), { type, args, payload, changed }) {
  switch (type) {
    case 'WS.UPDATE_ASSETS':
      return manager.tick(payload);
    case 'WS.ROOM_DATA': // bets processing
    case 'FINISH_ROOM': // status updates
    case 'CANCEL_ROOM': // status updates
      return manager.updateRoom(payload);
    case 'PROFILE_SUCCESS':
      return manager.setUserId(payload.payload.id);
    case 'ROOM_MANAGER.PUSH_REQUEST_SUCCESS':
      return manager.processRequest(payload);
    case 'ROOM_MANAGER.ADD_RECOMMENDED':
      if (!payload) return manager;
      return manager.addRoom(payload, true);
    case 'ROOM_MANAGER.SELECT_ASSET': {
      return manager.processNewRoom({ ...payload, fetchingHistory: true });
    }
    case 'ROOM_MANAGER.DRAW_ROOM_FROM_CACHE': {
      const rooms = manager.rooms.getRooms();
      const room = rooms.find((r) => r.id === args.id);
      return room ? manager.setActive(room) : manager;
    }
    case 'ROOM_MANAGER.NEW_ROOM_ACTIVE': {
      return manager.processNewRoom(payload);
    }
    case 'ROOM_MANAGER.SET_ACTIVE_IS_LOADING': {
      manager.active.isLoading = !!args.loading; // eslint-disable-line
      return manager.clone();
    }
    case 'GET_ASSETS_HISTORY_SUCCESS': {
      const { payload: assets } = payload;
      return manager.processNewRoom({ assets: assets.map(convertShortAsset), fetchingHistory: false });
    }
    case 'GET_ASSETS_HISTORY_FAILURE':
      return manager.processNewRoom({ fetchingHistory: false });
    case 'SETTINGS.NEW_ROOM': {
      const { value } = changed;
      return manager.processNewRoom({ updateSettings: value });
    }
    case 'SETTINGS.SAVE':
    case 'SETTINGS.SAVE_SIDEBAR':
      return manager.updateSettings();
    case 'PIN_TAB': {
      const { id, setPinned } = payload;
      return manager.pinTab(id, setPinned);
    }
    case 'HIDE_RECOMMENDED': {
      return manager.hideRecommended();
    }
    default:
      return manager;
  }
}

export default roomManagerReducer;
