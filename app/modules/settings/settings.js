import { fromJS, List } from 'immutable';
import { togglePageSound } from '../../sounds';

const today = (new Date()).getDay();

export const DEFAULT_STATE = {
  locale: 'en',
  sound: {
    enabled: true,
  },
  pinned: new List(),
  userId: false,
  app: {
    showChartPreview: true,
    leftPanel: {
      open: false,
      accountSecondAsideOpened: false,
      depositPanelOpened: false,
      filterPanelOpened: false,
      route: '',
    },
  },
  chart: {
    smoothDisabled: false,
    showBets: true,
  },
  game: {
    chatIsOpen: false,
    needBetNotification: true,
    newRoomSettings: {
      title: '',
      type: 1,
      team: 1,
      asset: today === 6 || today === 0 ? 'DEMO' : 'EURUSD',
      bet: '$1',
      expired: '3m',
    },
    roomsSortSettings: {
      active: true,
      type: 'deadlineAt',
      direction: 'DESC',
    },
    roomsFilterSettings: {
      active: false,
      assets: new List(),
      timeframe: new List(),
      minBet: '',
      maxBet: '',
    },
  },
  payment: {
    policy: false,
  },
};

export const loadSettings = () => {
  const state = localStorage.getItem('settings');
  let stateParsed = null;

  try {
    stateParsed = JSON.parse(state);
  } catch (e) {
    return fromJS(DEFAULT_STATE);
  }

  const settings = fromJS(DEFAULT_STATE).mergeDeep(stateParsed);

  togglePageSound(settings.getIn(['sound', 'enabled']));

  return settings;
};

export const loadedSettings = loadSettings();

const updateSettings = (state) => {
  localStorage.setItem('settings', JSON.stringify(state.toJSON()));
  return state;
};

export function reducer(state = loadedSettings, { type, changed, switchSound, payload, ...action }) {
  switch (type) {
    case 'SETTINGS.SAVE': {
      if (switchSound) {
        togglePageSound(changed.value);
      }
      // console.log(changed.value.toJS());
      return updateSettings(state.setIn(changed.path, changed.value));
    }
    case 'PIN_TAB': {
      const { id } = payload;
      return updateSettings(state.update('pinned', (data) => {
        if (data.includes(id)) {
          return data.filter((i) => i !== id);
        }
        return data.push(id);
      }));
    }
    case 'PROFILE_SUCCESS': {
      if (payload.payload.id !== state.get('userId')) {
        return updateSettings(loadedSettings.set('userId', payload.payload.id));
      }
      return state;
    }
    case 'SETTINGS.SAVE_SIDEBAR': {
      const { open, route } = changed;

      if (
        route &&
        state.getIn(['app', 'leftPanel', 'open']) &&
        state.getIn(['app', 'leftPanel', 'route']) !== route
      ) {
        return updateSettings(state
          .setIn(['app', 'leftPanel', 'route'], route)
        );
      }

      return updateSettings(state
        .setIn(['app', 'leftPanel', 'open'], open)
        .setIn(['app', 'leftPanel', 'route'], route))
        .setIn(['app', 'leftPanel', 'accountSecondAsideOpened'], false); // always close on aside close (not just change route)
    }
    case 'SETTINGS.TOGGLE_EDIT_PROFILE': {
      const { open } = action;
      return updateSettings(state.setIn(['app', 'leftPanel', 'accountSecondAsideOpened'], open));
    }
    case 'SETTINGS.TOGGLE_DEPOSIT_PANEL': {
      const { open } = action;
      if (!state.getIn(['app', 'leftPanel', 'accountSecondAsideOpened']) && open) {
        return updateSettings(state
          .setIn(['app', 'leftPanel', 'accountSecondAsideOpened'], open) // open second aside if closed on every deposit open request
          .setIn(['app', 'leftPanel', 'depositPanelOpened'], open)
        );
      }
      return updateSettings(state.setIn(['app', 'leftPanel', 'depositPanelOpened'], open)); // hide/close depo panel (components switching is in SecondAside state)
    }
    case 'SETTINGS.TOGGLE_FILTER_PANEL': {
      const { open } = action;
      return updateSettings(state.setIn(['app', 'leftPanel', 'filterPanelOpened'], open));
    }
    case 'SETTINGS.NEW_ROOM': {
      return updateSettings(state.setIn(changed.path, changed.value));
    }
    default: {
      return state;
    }
  }
}
