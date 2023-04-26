import { fromJS } from 'immutable';

import { stat } from './actions';

const initialState = fromJS({
  stats: {},
  signupErrors: [],
  loginErrors: [],
  feedbackErrors: [],
  demoUserName: localStorage.getItem('demoUserName') || null,
});

function homeReducer(state = initialState, { payload, ...action }) {
  switch (action.type) {
    case stat.SUCCESS:
      return state.set('stats', payload.payload);
    case 'POST_DATA':
      return state.set('formErrors', []);
    case 'HANDLE_FORM_ERROR':
      return state.set('formErrors', payload);
    case 'LOGIN_SUCCESS':
    case 'FB_AUTH_SUCCESS':
      return initialState;
    case '@@router/LOCATION_CHANGE':
      return state.set('formErrors', []);
    case 'SAVE_DEMO_USER_NAME': {
      return state.set('demoUserName', payload.name);
    }
    default:
      return state;
  }
}

export default homeReducer;
