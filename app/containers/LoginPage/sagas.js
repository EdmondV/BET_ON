import { put, takeLatest, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import Cookies from 'js-cookie';
import queryString from 'query-string';

import { HOME_URL } from 'utils/redirects';
import { postRequest, fetchRequest, putRequest } from 'utils/apiSaga';
import { handleError } from 'utils/errorSaga';
import { errorMessage } from 'utils/intl';

import { login, recoverPassword, newPassword, signup, stat, feedback, demoLogin, fbAuth } from './actions';

function* loginWatcherSaga() {
  try {
    yield all([
      takeLatest('INIT_LP', getInitialData),
      takeLatest(login.REQUEST, handleLogin),
      takeLatest(signup.REQUEST, handleSignup),
      takeLatest(fbAuth.REQUEST, handleFbAuth),
      takeLatest(recoverPassword.REQUEST, handleRecover),
      takeLatest(newPassword.REQUEST, handleRestore),
      takeLatest('GET_STATS_DATA', handleStat),
      takeLatest('START_UPDATE_STATS', updateStats),
      takeLatest('STOP_UPDATE_STATS', stopUpdateStats),
      takeLatest(feedback.REQUEST, handleFeedback),
      takeLatest(demoLogin.REQUEST, handleDemoLogin),
    ]);
  } catch (error) {
    yield (put(handleError(error)));
  }
}

function* getInitialData() {
  yield all([
    put({ type: 'GET_STATS_DATA' }),
    put({ type: 'START_UPDATE_STATS' }),
  ]);
}


export function* handleLogin(action) {
  const { login: loginD, password } = action.payload;
  // const state = yield select();

  yield put(postRequest({
    url: 'signin',
    query: { login: loginD, password },
    action: login,
    errorMessage: errorMessage('login'),
    redirectUrl: `${HOME_URL}/1`,
    chain: [
      (response) => {
        Cookies.set('session', response.payload.token, {
          // convert seconds to days
          expires: response.payload.expires / 86400,
        });
      },
    ],
  }));
}

export function* handleDemoLogin() {
  yield put(fetchRequest({
    url: 'signup/demo',
    action: demoLogin,
    errorMessage: errorMessage('demo'),
    contentType: 'text/plain',
    redirectUrl: HOME_URL,
  }));
}

export function* handleRecover(action) {
  const { email } = action.payload;

  yield put(postRequest({
    url: 'password/restore',
    query: { email },
    action: recoverPassword,
    redirectUrl: '/restore-sent',
    errorMessage: errorMessage('passwordRecover'),
  }));
}

export function* handleRestore(action) {
  const { password } = action.payload;
  const { userId, token } = queryString.parse(location.search);

  yield put(putRequest({
    url: 'password/restore/confirm',
    query: { password, userId, token },
    action: recoverPassword,
    redirectUrl: '/restore-success',
    errorMessage: errorMessage('passwordRecover'),
  }));
}

export function* handleSignup(action) {
  yield put(postRequest({
    url: 'signup',
    query: action.payload,
    action: signup,
    errorMessage: errorMessage('signup'),
    redirectUrl: `${HOME_URL}/1`,
    chain: [
      (response) => {
        Cookies.set('session', response.payload.token, {
          // convert seconds to days
          expires: response.payload.expires / 86400,
        });
      },
    ],
  }));
}

export function* handleFbAuth(action) {
  const ref = Cookies.get('referrer');

  yield put(postRequest({
    url: `oauth/fb${ref ? `/?_r=${encodeURIComponent(ref)}` : ''}`,
    query: action.payload,
    action: fbAuth,
    errorMessage: errorMessage('fb'),
    redirectUrl: `${HOME_URL}/1`,
    noFieldError: true,
    chain: [
      (response) => {
        Cookies.set('session', response.payload.token, {
          // convert seconds to days
          expires: response.payload.expires / 86400,
        });
      },
    ],
  }));
}

export function* handleFeedback(action) {
  yield put(postRequest({
    url: 'feedback',
    query: action.payload,
    action: feedback,
    errorMessage: errorMessage('feedback'),
    noGlobalError: true,
    redirectUrl: '/feedback-sent',
  }));
}

let mounted = false;
export function* handleStat() {
  yield put(fetchRequest({
    url: 'stats',
    action: stat,
  }));
}
function* updateStats() {
  mounted = true;
  while (mounted) {
    yield delay(3000);
    yield put({ type: 'GET_STATS_DATA' });
  }
}

function* stopUpdateStats() {
  mounted = false;
}

export default [loginWatcherSaga];
