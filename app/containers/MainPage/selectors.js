import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectCurrentUserId = (state) => state.getIn(['global', 'profile', 'id']);

const selectRawHistory = (state) => state.getIn(['mainPage', 'roomsHistory']);

const selectHistory = () => createSelector(
  selectRawHistory,
  selectCurrentUserId,
  (rooms, id) => {
    if (!id) return rooms;
    return rooms;
  }
);

const selectUser = () => createSelector(
  selectGlobal,
  (state) => {
    const u = state.get('profile').toJS();
    return {
      ...u,
      balance: u.wallets && u.wallets[u.wallet] ? parseFloat(u.wallets[u.wallet] || 0).toFixed(2) : 0,
      avatarName: u.username && u.username.length ? u.username.substring(0, 2) : 'pl',
    };
  }
);

const selectSettings = (state) => state.get('settings');

const selectLeftPanel = () => createSelector(
  selectSettings,
  (state) => state.get('leftPanel')
);

const selectSound = () => createSelector(
  selectSettings,
  (state) => state.getIn(['sound', 'enabled'])
);

const selectShowBets = () => createSelector(
  selectSettings,
  (state) => state.getIn(['chart', 'showBets'])
);

const selectSmoothDisabled = () => createSelector(
  selectSettings,
  (state) => state.getIn(['chart', 'smoothDisabled'])
);

const selectLeftPanelOpen = () => createSelector(
  selectSettings,
  (state) => state.getIn(['app', 'leftPanel', 'open'])
);

const selectLeftPanelRoute = () => createSelector(
  selectSettings,
  (state) => state.getIn(['app', 'leftPanel', 'route'])
);

const selectAccountSecondAsideOpened = () => createSelector(
  selectSettings,
  (state) => state.getIn(['app', 'leftPanel', 'accountSecondAsideOpened'])
);

const selectDepositPanelOpened = () => createSelector(
  selectSettings,
  (state) => state.getIn(['app', 'leftPanel', 'depositPanelOpened'])
);

export {
  selectUser,
  selectHistory,
  selectSound,
  selectSmoothDisabled,
  selectShowBets,
  selectLeftPanelRoute,
  selectLeftPanel,
  selectLeftPanelOpen,
  selectAccountSecondAsideOpened,
  selectDepositPanelOpened,
};
