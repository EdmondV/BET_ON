import createAction from 'utils/actionsCreator';

export const login = createAction('LOGIN', false, 'account');
export const sendLogin = (query) => ({
  type: 'LOGIN_REQUEST',
  payload: query,
});
export const signup = createAction('SIGNUP', false, 'account');
export const sendSignup = (query) => ({
  type: 'SIGNUP_REQUEST',
  payload: query,
});
export const fbAuth = createAction('FB_AUTH', true, 'account');
export const feedback = createAction('FEEDBACK_LOGIN_PAGE', true, 'account');
export const sendFeedback = (query) => ({
  type: 'FEEDBACK_LOGIN_PAGE_REQUEST', // FEEDBACK_REQUEST can be caught by mainPage watcher after logout, then it has another name
  payload: query,
});
export const recoverPassword = createAction('RECOVER_PASSWORD', true, 'account');
export const newPassword = createAction('NEW_PASSWORD', true, 'account');
export const stat = createAction('STAT', false);
export const demoLogin = createAction('DEMO_LOGIN', false, 'account');

export const getInitialData = () => ({ type: 'INIT_LP' });
export const stopListenStats = () => ({ type: 'STOP_UPDATE_STATS' });

export const saveDemoUserName = (name) => ({
  type: 'SAVE_DEMO_USER_NAME',
  payload: {
    name,
  },
});
