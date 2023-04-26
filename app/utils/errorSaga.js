import { put } from 'redux-saga/effects';
import { notifyError, m } from 'utils/intl';

export const handleError = (payload) => ({
  type: 'HANDLE_ERROR',
  payload,
});

export const handleFormError = (payload, preventNotify) => ({
  type: 'HANDLE_FORM_ERROR',
  payload,
  preventNotify,
});

export function* formErrorSaga({ payload, preventNotify }) {
  if (!payload || preventNotify) return;
  yield put(notifyError(errorMessage(payload[0])));
}

export default function* errorSaga({ payload }) {
  if (!payload) return;
  const { action, error } = payload;
  if (!error) return;
  yield put(notifyError(errorMessage(payload), action));
}

export function errorMessage(e) {
  if (!e) return '';
  if (e.message) return e.message;

  const { field, error, type } = e;
  if (error === 'forbidden' || (type === 'auth' && error === 'required')) {
    return m('errors.wrongPass');
  }
  if (error === 'invalid') {
    return `${cap(field)} ${m('errors.invalid')}`;
  }
  if (error === 'required') {
    return `${cap(field)} ${m('errors.required')}`;
  }
  if (error === 'length') {
    if (field === 'amount') return m('minDepo');
    return `${cap(field)} ${m('errors.tooShort')}`;
  }
  if (error === 'not enough') {
    return m('errors.insufficientFunds');
  }
  return `${cap(field)} ${error}`;
}

const cap = (s) => s ? `${s.charAt(0).toUpperCase()}${s.slice(1)}` : '';
