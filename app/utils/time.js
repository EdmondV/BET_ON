import { m } from 'utils/intl';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getMinutes = (ms) => Math.floor(ms / 59000);

export const getSeconds = (ms) => ((ms % 59000) / 1000).toFixed(0);

/**
 *
 * @param s {number} seconds left
 * @returns {string} e.g 1m || 59s || 2m
 */
export const getCountdownValue = (s) => {
  if (s / 60 >= 1) {
    return `${Math.floor(s / 60)}m`;
  }
  return `${s}s`;
};

export const pad = (n) => (n < 10 ? `0${n}` : (n.toString && n.toString()));

export const countdown = (time) => {
  if (isNaN(time)) {
    return '';
  }
  const timeLeft = time - Date.now();
  if (timeLeft < 0) {
    return '';
  }

  const minutes = getMinutes(timeLeft);
  const seconds = getSeconds(timeLeft);

  return `00:${pad(minutes)}:${pad(seconds)}`;
};

export const getMsToTime = (time) => {
  if (isNaN(time)) {
    return '';
  }
  let ms = time - Date.now();

  if (ms < 0) ms = 0;
  return ms;
};

export const short = (time) => {
  if (isNaN(time)) {
    return '0s';
  }
  const timeLeft = time - Date.now();
  if (timeLeft < 0) {
    return '0s';
  }
  const minutes = getMinutes(timeLeft);
  if (minutes >= 1) {
    return `${minutes}m`;
  }
  return `${getSeconds(timeLeft)}s`;
};

/*
 */
/**
 *
 * @param {Date} date
 */
const isToday = (date) => new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);

export const getFormattedTime = (time, format = 'MMM D') => {
  const date = new Date(time);

  switch (format) {
    case 'D':
      return date.getDate().toString();
    case 'MMM D':
      return `${m(`time.${monthNames[date.getMonth()]}`)} ${date.getDate()}`;
    case 'MMM D, HH:mm':
      return `${m(`time.${monthNames[date.getMonth()]}`)} ${date.getDate()}, ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    case 'HH:mm':
      return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    case 'HH:mm:ss':
      return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    case 'mm:ss':
      return `${pad(date.getHours() >= 3 ? date.getMinutes() + 60 : date.getMinutes())}:${pad(date.getSeconds())}`;
    case 'HUMAN_DATE':
      if (isToday(date)) return m('global.today');

      return `${monthNames[date.getMonth()]}/${pad(date.getDate())}`;
    case 'HUMAN_MINUTES':
      if (isToday(date)) return `${pad(date.getHours())}:${pad(date.getMinutes())}`;

      return `${monthNames[date.getMonth()]}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}}`;
    default:
      return 'Unknown format';
  }
};
