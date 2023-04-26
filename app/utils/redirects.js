import { browserHistory } from 'react-router';
import Cookies from 'js-cookie';

export const HOME_URL = '/game';
export const ROOM_CREATE_URL = `${HOME_URL}/new`;
export const ROOM_URL_PREFIX = `${HOME_URL}/`;// + {id};
export const CARD_URL_PREFIX = `${HOME_URL}/withdrawal/card/`;
export const DEPOSIT_PAGE_URL = `${HOME_URL}/deposit`;
export const WITHDRAWAL_PAGE_URL = `${HOME_URL}/withdrawal`;
export const OPERATIONS_PAGE_URL = `${HOME_URL}/operations`;

export function redirectToRoomCreate() {
  browserHistory.push(ROOM_CREATE_URL);
}

export function redirectToWithdrawal() {
  browserHistory.push(`${HOME_URL}/withdrawal`);
}

export function redirectToDeposit() {
  browserHistory.push(`${HOME_URL}/deposit`);
}

export function redirectToOperations() {
  browserHistory.push(`${HOME_URL}/operations`);
}

export function redirectToRoom(id) {
  browserHistory.push(ROOM_URL_PREFIX + id);
}

export function redirectToHome() {
  browserHistory.push(HOME_URL);
}

export function redirectToAuth() {
  browserHistory.push(`${HOME_URL}/`);
}

export function redirectToBlocked() {
  browserHistory.push(`${HOME_URL}/blocked`);
}

export function logout(redirect = true) {
  Cookies.remove('session');
  Cookies.remove('session', {
    path: '/',
    domain: `.${window.location.host}`,
  });

  if (redirect) {
    browserHistory.push('/');
  }
}

