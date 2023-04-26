import { takeEvery, put, call, fork, all } from 'redux-saga/effects';
import errorSaga, { formErrorSaga, handleError, handleFormError } from 'utils/errorSaga';
import { fetchSaga, postSaga, putSaga } from 'utils/apiSaga';

export const navigatorOnline = () => ({ type: 'NAVIGATOR_ONLINE' });
export const navigatorOffline = () => ({ type: 'NAVIGATOR_OFFLINE' });

export function once(target, type) {
  return new Promise((resolve) => {
    const listener = (e) => {
      target.removeEventListener(type, listener);
      resolve(e);
    };
    target.addEventListener(type, listener);
  });
}

function* globalSagas() {
  try {
    yield all([
      fork(listenNetwork),
      takeEvery('FETCH_DATA', fetchSaga),
      takeEvery('POST_DATA', postSaga),
      takeEvery('HANDLE_ERROR', errorSaga),
      takeEvery('HANDLE_FORM_ERROR', formErrorSaga),
      takeEvery('PUT_DATA', putSaga),
    ]);
  } catch (error) {
    let errors = {};
    if (error.response && error.response.json) {
      errors = yield error.response.json();
      if (errors && errors.errors && errors.errors.length) {
        yield put(handleFormError(errors.errors));
      }
    } else {
      yield put(handleError(error));
    }
  }
}

export function* watchWindowOnline() {
  while (true) { // eslint-disable-line
    yield call(once, window, 'online');
    yield put(navigatorOnline());
  }
}

export function* watchWindowOffline() {
  while (true) { // eslint-disable-line
    yield call(once, window, 'offline');
    yield put(navigatorOffline());
  }
}

function* listenNetwork() {
  if (navigator.onLine) {
    yield put(navigatorOnline());
  } else {
    yield put(navigatorOffline());
  }
  yield fork(watchWindowOnline);
  yield fork(watchWindowOffline);
}


export default [globalSagas];
