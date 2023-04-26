import { fromJS, List } from 'immutable';

const defaultProfile = fromJS({
  id: false,
  username: 'pl',
  email: '',
  wallets: {
    DEMO: false,
    REAL: false,
  },
  avatar: '',
  wallet: false,
  demo: false,
  verified: false,
  training: false,
  createdAt: false,
  redirectOnLogin: false,
});

export const defaultState = {
  loading: false,
  error: false,
  formErrors: new List(),
  version: `${process.env.VERSION} ${process.env.BUILD}`,
  profile: defaultProfile,
};

export const initialState = fromJS(defaultState);

function appReducer(state = initialState, { type, payload, error }) {
  switch (type) {
    case 'LOGIN_REQUEST':
    case 'DEMO_LOGIN_REQUEST':
    case 'PROFILE_REQUEST':
    case 'LOGOUT_REQUEST': {
      return state;
    }
    case 'DEMO_LOGIN_SUCCESS':
    case 'LOGIN_SUCCESS':
    case 'FB_AUTH_SUCCESS': {
      const userId = state.getIn(['profile', 'id']);
      if (!userId || !payload || !payload.payload) return initialState;
      else if (payload.payload.id === userId) return state.set('loading', false);

      return initialState;
    }
    case 'SET_LOGIN_REDIRECT_URL':
      return state;
    case 'PROFILE_SUCCESS': {
      const id = state.getIn(['profile', 'id']);
      if (id && payload && payload.payload && payload.payload.id === id) {
        return state
          .set('profile', fromJS(payload.payload))
          .set('loading', false);
      }
      return initialState
        .set('profile', fromJS(payload.payload))
        .set('loading', false);
    }
    case 'UPDATE_PROFILE':
      return state.update('profile', (profile) => profile.merge(payload.data));
    case 'PROFILE_ERROR':
    case 'LOGIN_ERROR':
    case 'DEMO_LOGIN_ERROR':
    case 'LOGOUT_ERROR':
      return state
        .set('error', fromJS(error))
        .set('loading', false);
    case 'UPDATE_USERNAME_SUCCESS':
    case 'UPDATE_PASSWORD_SUCCESS':
    case 'CHANGE_EMAIL_SUCCESS':
    case 'POST_DATA':
      return state.set('formErrors', new List());
    case 'HANDLE_FORM_ERROR':
      return state.set('formErrors', fromJS(payload));
    default:
      return state;
  }
}

export default appReducer;
