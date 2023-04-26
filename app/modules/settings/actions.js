import { fromJS } from 'immutable';
import { DEFAULT_STATE } from './settings';

export function toggleSound(sound) {
  return {
    type: 'SETTINGS.SAVE',
    changed: { path: ['sound', 'enabled'], value: !!sound },
    meta: {
      sound: 'click',
      analytics: {
        category: 'interface',
        type: `TOGGLE_SOUND-${sound ? 'on' : 'off'}`,
      },
    },
    switchSound: true,
  };
}

export function changeLocale(locale) {
  return {
    type: 'SETTINGS.SAVE',
    changed: { path: ['locale'], value: locale },
    meta: {
      analytics: {
        type: `CHANGE_LOCALE_TO_${locale}`,
        category: 'interface',
      },
    },
  };
}

export function toggleSmooth(smooth) {
  return {
    type: 'SETTINGS.SAVE',
    changed: { path: ['chart', 'smoothDisabled'], value: !!smooth },
    meta: {
      analytics: {
        category: 'interface',
        type: `TOGGLE_SMOOTH-${smooth ? 'off' : 'on'}`,
      },
    },
  };
}

export function togglePaymentPolicyAgree(agree) {
  return {
    type: 'SETTINGS.SAVE',
    changed: { path: ['payment', 'policy'], value: !!agree },
    meta: {
      analytics: {
        type: `TOGGLE_PAYMENT_POLICY_${agree ? '' : 'DIS'}AGREE`,
        category: 'payments',
      },
    },
  };
}

export function toggleChat(open) {
  return {
    type: 'SETTINGS.SAVE',
    changed: { path: ['game', 'isChatOpen'], value: !!open },
    meta: {
      sound: 'click',
      analytics: {
        category: 'interface',
        type: `TOGGLE_CHAT-${open ? 'on' : 'off'}`,
      },
    },
    open,
  };
}

export function toggleBet(open) {
  return {
    type: 'SETTINGS.SAVE',
    changed: { path: ['chart', 'showBets'], value: !!open },
    meta: {
      sound: 'click',
      analytics: {
        category: 'interface',
        type: `TOGGLE_BET-${open ? 'on' : 'off'}`,
      },
    },
    open,
  };
}


export function toggleShowNotice(open) {
  return {
    type: 'SETTINGS.SAVE',
    changed: { path: ['game', 'needBetNotification'], value: !!open },
    meta: {
      sound: 'click',
      analytics: {
        category: 'interface',
        type: `NEED_BET_NOTIFICATION-${open ? 'on' : 'off'}`,
      },
    },
  };
}

export function toggleViewRooms(open) {
  return {
    type: 'SETTINGS.SAVE',
    changed: { path: ['app', 'showChartPreview'], value: !!open },
    meta: {
      sound: 'click',
      analytics: {
        category: 'interface',
        type: `TOGGLE_VIEW_ROOMS-${open ? 'on' : 'off'}`,
      },
    },
  };
}

export function toggleSidebar(open, route) {
  return {
    type: 'SETTINGS.SAVE_SIDEBAR',
    changed: { open, route },
    meta: {
      sound: 'click',
    },
  };
}

export const updateNewRoomSettings = (value) => ({
  type: 'SETTINGS.NEW_ROOM',
  changed: { path: ['game', 'newRoomSettings'], value },
});

export const updateRoomsSortSettings = (value) => ({
  type: 'SETTINGS.SAVE',
  changed: { path: ['game', 'roomsSortSettings'], value },
});

export const updateRoomsFilterSettings = (value) => ({
  type: 'SETTINGS.SAVE',
  changed: { path: ['game', 'roomsFilterSettings'], value: fromJS(value) },
});

export const cancelRoomsFilter = () => ({
  type: 'SETTINGS.SAVE',
  changed: { path: ['game', 'roomsFilterSettings'], value: fromJS(DEFAULT_STATE.game.roomsFilterSettings) },
});

export const toggleEditProfile = (open) => ({
  type: 'SETTINGS.TOGGLE_EDIT_PROFILE',
  open,
});

export const toggleDepositPanel = (open) => ({
  type: 'SETTINGS.TOGGLE_DEPOSIT_PANEL',
  open,
});

export const toggleFilterPanel = (open) => ({
  type: 'SETTINGS.TOGGLE_FILTER_PANEL',
  meta: {
    sound: 'click',
  },
  open,
});
