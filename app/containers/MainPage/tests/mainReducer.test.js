import { fromJS } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import mainPageReducer, { initialState } from '../reducer';

describe('mainPageReducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it('returns the initial state', () => {
    expect(mainPageReducer(undefined, {})).toEqualImmutable(fromJS(initialState));
  });
  it('passes if the object is immutable', () => {
    expect(mainPageReducer(undefined, {}))
      .toBeImmutable();
  });
  it('should set loading to true on room is loading', () => {
    expect(mainPageReducer(undefined, { type: 'SET_ROOM_IS_LOADING', payload: { loading: true } }))
      .toEqualImmutable(initialState.set('isLoading', true));
  });
  it('should set loading to true on new room request', () => {
    expect(mainPageReducer(undefined, { type: 'CREATE_NEW_ROOM_REQUEST' }).get('loading'))
      .toEqualImmutable(true);
  });
  it('should set loading to false on new room create failure', () => {
    expect(mainPageReducer(undefined, { type: 'CREATE_NEW_ROOM_FAILURE' }).get('loading'))
      .toEqualImmutable(false);
  });
  it('should set loading to false on new room create success', () => {
    expect(mainPageReducer(undefined, { type: 'CREATE_NEW_ROOM_SUCCESS' }).get('loading'))
      .toEqualImmutable(false);
  });
  it('should set loading to false on room is loading false', () => {
    expect(mainPageReducer(undefined, { type: 'SET_ROOM_IS_LOADING', payload: { loading: false } }))
      .toEqualImmutable(initialState.set('isLoading', false));
  });
  it('sets room id on bet', () => {
    expect(mainPageReducer(undefined, { type: 'BET_REQUEST', bet: { id: 123 } }).get('bettingOn'))
      .toEqualImmutable(123);
  });
  it('sets confirmation to true on success', () => {
    expect(mainPageReducer(undefined, { type: 'CONFIRMATION_SUCCESS' }).get('confirmationSent'))
      .toEqualImmutable(true);
  });
  it('sets confirmation email sent to true on change email success', () => {
    expect(mainPageReducer(undefined, { type: 'CHANGE_EMAIL_SUCCESS' }).get('confirmationSent'))
      .toEqualImmutable(true);
  });
  it('sets navigator online', () => {
    expect(mainPageReducer(undefined, { type: 'NAVIGATOR_ONLINE' }).get('isOnline'))
      .toEqualImmutable(true);
  });
  it('sets navigator offline', () => {
    expect(mainPageReducer(undefined, { type: 'NAVIGATOR_OFFLINE' }).get('isOnline'))
      .toEqualImmutable(false);
  });
  it('toggles spotlight animation', () => {
    expect(mainPageReducer(undefined, { type: 'TOGGLE_SPOTLIGHT_ANIMATION', team: 1 }).get('spotlight'))
      .toEqualImmutable(1);
  });
  it('check ws connection', () => {
    expect(mainPageReducer(undefined, { type: 'WS.CONNECTION_CHANGE', connected: false }).get('isWsConnected'))
      .toEqualImmutable(false);
  });
  it('shows avatar uploader', () => {
    expect(mainPageReducer(undefined, { type: 'SHOW_AVATAR_UPLOADER' }).get('showAvatarUploader'))
      .toEqualImmutable(true);
  });
  it('hides avatar uploader', () => {
    expect(mainPageReducer(undefined, { type: 'HIDE_AVATAR_UPLOADER' }).get('showAvatarUploader'))
      .toEqualImmutable(false);
  });
  it('hides avatar uploader after upload', () => {
    expect(mainPageReducer(undefined, { type: 'AVATAR_SUCCESS' }).get('showAvatarUploader'))
      .toEqualImmutable(false);
  });
  it('saves email address on change email request', () => {
    expect(mainPageReducer(undefined, {
      type: 'CHANGE_EMAIL_REQUEST',
      payload: { email: 'test@test.ru' },
    }).get('confirmationEmail'))
      .toEqualImmutable('test@test.ru');
  });
});
