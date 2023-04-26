import createAction from 'utils/actionsCreator';

export const fetchActiveRoomsAndTabs = createAction('ROOM_MANAGER.PUSH_REQUEST', false);

export const pushRoomsRequest = (id) => ({ type: 'ROOM_MANAGER.PUSH_REQUEST', args: { id } });

export const gotoRandomRoom = () => ({ type: 'ROOM_MANAGER.GO_TO_RANDOM_ROOM' });

export const gotoRoom = (id) => ({
  type: 'ROOM_MANAGER.GO_TO_ROOM',
  args: { id },
  meta: { analytics: { type: 'SPECTATE_ROOM', category: 'game' } },
});

export const drawRoomFromCache = (id) => ({
  type: 'ROOM_MANAGER.DRAW_ROOM_FROM_CACHE',
  args: { id },
});

export const setIsLoading = (loading) => ({
  type: 'ROOM_MANAGER.SET_ACTIVE_IS_LOADING',
  args: { loading },
});
