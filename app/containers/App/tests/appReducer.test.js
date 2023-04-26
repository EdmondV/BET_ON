import { fromJS } from 'immutable';
import * as matchers from 'jest-immutable-matchers';

import appReducer, { defaultState } from '../reducer';

// profile payload example
const payload = {
  success: true,
  payload: {
    id: '596484a477657d306531636b',
    username: 'mmmmm',
    email: 'matyunya@gmail.com',
    wallets: {
      DEMO: 28946.22000000001,
      REAL: 0,
    },
    wallet: 'DEMO',
    demo: false,
    verified: true,
    training: 0,
    referrer: '',
    createdAt: 1499759780356,
    rank: 2,
  },
  ts: 1500266784657,
};

const error = {
  error: { someError: 1 },
};

const modifiedState = {
  ...defaultState,
  profile: payload.payload,
  error,
};

const differentPayload = {
  ...payload,
  payload: {
    ...payload.payload,
    id: 'different_id',
  },
};

const formError = {
  success: false,
  errors: [
    {
      type: 'auth',
      error: 'forbidden',
    },
  ],
};

const stateWithFormError = {
  ...modifiedState,
  formErrors: formError,
};

describe('appReducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });
  it('passes if the object is immutable', () => {
    expect(appReducer(undefined, {}))
      .toBeImmutable();
  });
  it('should have following initial state', () => {
    expect(appReducer(undefined, {}))
      .toEqualImmutable(fromJS(defaultState));
  });
  it('should set loading to true on data requests', () => {
    expect(appReducer(undefined, { type: 'LOGIN_REQUEST' }))
      .toEqualImmutable(fromJS({
        ...defaultState,
        loading: true,
      }));
    expect(appReducer(undefined, { type: 'DEMO_LOGIN_REQUEST' }))
      .toEqualImmutable(fromJS({
        ...defaultState,
        loading: true,
      }));
    expect(appReducer(undefined, { type: 'PROFILE_REQUEST' }))
      .toEqualImmutable(fromJS({
        ...defaultState,
        loading: true,
      }));
  });
  it('should update profile on successful request', () => {
    expect(appReducer(undefined, { type: 'PROFILE_SUCCESS', payload }))
      .toEqualImmutable(fromJS({
        ...defaultState,
        profile: payload.payload,
      }));
  });
  it('should return default state with new profile data if new profile is different from the old one', () => {
    expect(appReducer(fromJS(modifiedState), {
      type: 'PROFILE_SUCCESS',
      payload: differentPayload,
    })
    .get('error')
    ).toEqualImmutable(fromJS({
      ...defaultState,
    })
    .get('error'));
  });
  it('should return same state with if old and new profile ids are the same on profile success', () => {
    expect(appReducer(fromJS(modifiedState), {
      type: 'PROFILE_SUCCESS',
      payload,
    })).toEqualImmutable(fromJS(modifiedState));
  });
  it('should set error and loading off on error', () => {
    expect(appReducer(fromJS(defaultState), { type: 'PROFILE_ERROR', error }))
      .toEqualImmutable(fromJS({
        ...defaultState,
        loading: false,
        error,
      }));
    expect(appReducer(fromJS(defaultState), { type: 'LOGIN_ERROR', error }))
      .toEqualImmutable(fromJS({
        ...defaultState,
        loading: false,
        error,
      }));
    expect(appReducer(fromJS(defaultState), { type: 'DEMO_LOGIN_ERROR', error }))
      .toEqualImmutable(fromJS({
        ...defaultState,
        loading: false,
        error,
      }));
    expect(appReducer(fromJS(defaultState), { type: 'LOGOUT_ERROR', error }))
      .toEqualImmutable(fromJS({
        ...defaultState,
        loading: false,
        error,
      }));
  });
  it('should set form error', () => {
    expect(appReducer(fromJS(defaultState), { type: 'HANDLE_FORM_ERROR', payload: formError }))
      .toEqualImmutable(fromJS({
        ...defaultState,
        loading: false,
        formErrors: formError,
      }));
  });
  it('should reset form error on post request or profile update', () => {
    expect(appReducer(fromJS(stateWithFormError), { type: 'POST_DATA' }))
      .toEqualImmutable(fromJS(modifiedState));
    expect(appReducer(fromJS(stateWithFormError), { type: 'CHANGE_EMAIL_SUCCESS' }))
      .toEqualImmutable(fromJS(modifiedState));
    expect(appReducer(fromJS(stateWithFormError), { type: 'UPDATE_PASSWORD_SUCCESS' }))
      .toEqualImmutable(fromJS(modifiedState));
    expect(appReducer(fromJS(stateWithFormError), { type: 'UPDATE_USERNAME_SUCCESS' }))
      .toEqualImmutable(fromJS(modifiedState));
  });
  it('should reset state if new profile is different from the old one on login/demo login success', () => {
    expect(appReducer(fromJS(modifiedState), {
      type: 'LOGIN_SUCCESS',
      payload: differentPayload,
    })).toEqualImmutable(fromJS(defaultState));
    expect(appReducer(fromJS(modifiedState), {
      type: 'DEMO_LOGIN_SUCCESS',
      payload: differentPayload,
    })).toEqualImmutable(fromJS(defaultState));
  });
});
