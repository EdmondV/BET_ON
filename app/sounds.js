import { Howl, Howler } from 'howler';

/**
 * @type {{notification: Howl, draw: Howl, notificationFail: Howl, click: Howl, betFall: Howl, betRise: Howl, winFall: Howl, winRise: Howl, deadline: Howl, chatMessage: Howl}}
 */

const preload = false;

const soundsFiles = {
  notification: new Howl({ src: ['/sounds/notification.aac'], volume: 0.1, preload }),
  draw: new Howl({ src: ['/sounds/draw.aac'], volume: 0.5, preload }),
  notificationFail: new Howl({ src: ['/sounds/notification-fail.aac'], volume: 0.5, preload }),
  click: new Howl({ src: ['/sounds/click.aac'], volume: 0.5, preload }),
  betFall: new Howl({ src: ['/sounds/bet-fall.aac'], volume: 0.4, preload }),
  betRise: new Howl({ src: ['/sounds/bet-rise.aac'], volume: 0.4, preload }),
  winFall: new Howl({ src: ['/sounds/win-fall.aac'], volume: 0.4, preload }),
  winRise: new Howl({ src: ['/sounds/win-rise.aac'], volume: 0.4, preload }),
  deadline: new Howl({ src: ['/sounds/deadline.aac'], volume: 0.4, preload }),
  chatMessage: new Howl({ src: ['/sounds/chat-message.aac'], volume: 0.4, preload }),
};

/**
 * Saga middelware for sounds
 * @returns {function(*): function(*=)}
 */
export function middleware() {
  return (next) => (data) => {
    if (!data.meta || !data.meta.sound) return next(data);

    playSound(data.meta.sound);

    return next(data);
  };
}

/**
 * Play one specific sound and return it
 * @param {string} soundName
 * @returns {object} sound object
 */
export function playSound(soundName) {
  const sound = soundsFiles[soundName];
  if (sound) {
    if (sound.state() === 'unloaded') {
      sound.load();
    }
    sound.play();
  }
  return sound;
}

/**
 * Toggle mute of all sounds
 * @param {bool} on
 */
export function togglePageSound(on) {
  if (on) {
    Howler.mute(false);
  } else {
    Howler.mute(true);
  }
}

export default soundsFiles;
