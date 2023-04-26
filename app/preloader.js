import { fromJS } from 'immutable';

const initialState = fromJS({
  appPreloading: true,
  avatarUploading: false,
  rooms: false,
  createRoomPreloading: false, // we need this as a fallback for removing state preloader if API returns an error. Don't remove
});

// FIXME Move all components preloaders to state
export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'SIGNUP_REQUEST':
    case 'FB_AUTH_REQUEST':
    case 'PROFILE_REQUEST':
    case 'DEMO_LOGIN_REQUEST':
    case 'LOGOUT_REQUEST':
      return state;
    case 'FB_AUTH_SUCCESS':
    case 'FB_AUTH_FAILURE':
    case 'PROFILE_SUCCESS':
    case 'PROFILE_FAILURE':
    case 'LOGIN_SUCCESS':
    case 'LOGIN_FAILURE':
    case 'SIGNUP_SUCCESS':
    case 'SIGNUP_FAILURE':
    case 'DEMO_LOGIN_SUCCESS':
    case 'DEMO_LOGIN_FAILURE':
    case 'LOGOUT_SUCCESS':
    case 'LOGOUT_FAILURE':
      return state
        .set('appPreloading', false);
    case 'AVATAR_REQUEST':
      return state
        .set('avatarUploading', true);
    case 'AVATAR_SUCCESS':
    case 'AVATAR_FAILURE':
      return state
        .set('avatarUploading', false);
    case 'GET_ROOMS_REQUEST':
      return state.set('rooms', true);
    case 'GET_ROOMS_FAILURE':
    case 'GET_ROOMS_SUCCESS':
      return state.set('rooms', false);
    case 'CREATE_NEW_ROOM_REQUEST':
      return state.set('createRoomPreloading', true);
    case 'CREATE_NEW_ROOM_SUCCESS':
    case 'CREATE_NEW_ROOM_FAILURE':
      return state.set('createRoomPreloading', false);
    default:
      return state;
  }
}
