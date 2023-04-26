import { call, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { handleError, handleFormError } from 'utils/errorSaga';
import { logout } from 'utils/redirects';

import { API_URL, get, post, put as putFetch } from './request';

export const fetchRequest = (payload) => ({
  type: 'FETCH_DATA',
  payload,
});

export const postRequest = (payload) => ({
  type: 'POST_DATA',
  payload,
});

export const putRequest = (payload) => ({
  type: 'PUT_DATA',
  payload,
});

function* fetch(payload, method) {
  const { url, query, action, redirectUrl, errorMessage, chain, contentType, noGlobalError, noFieldError } = payload;
  try {
    const response = yield call(method, `${API_URL}/${url}`, query, contentType || 'application/json');
    if (action) {
      yield put(action.success(response));
    }
    if (chain && chain.length) {
      for (let k = 0, l = chain.length; k < l; k++) { // eslint-disable-line
        yield chain[k](response);
      }
    }
    if (redirectUrl) {
      yield browserHistory.push(typeof (redirectUrl) === 'function' ? redirectUrl(response) : redirectUrl);
    }
  } catch (error) {
    let errors = {};
    if (error.response.status === 401) {
      logout();
      yield put({ type: 'LOGIN_FAILURE' }); // removes infinite preloader if session token is expired
      return;
    }
    if (error.response && error.response.status === 423) {
      yield browserHistory.push('/blocked');
    } else if (error.response && error.response.json && !noFieldError) {
      errors = yield error.response.json();
      if (errors && errors.errors && errors.errors.length) {
        yield put(handleFormError(errors.errors, noGlobalError));
      }
    } else if (errorMessage) {
      yield put(handleError({ error, message: errorMessage }));
    } else {
      yield put(handleError(error));
    }
    if (action) {
      yield put(action.failure());
    }
  }
}

export function* fetchSaga({ payload }) {
  try {
    yield fetch(payload, get);
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

export function* postSaga({ payload }) {
  try {
    yield fetch(payload, post);
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

export function* putSaga({ payload }) {
  try {
    yield fetch(payload, putFetch);
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
