import { loadedSettings } from 'modules/settings/settings';

export default function NewRoomSettings(settings = loadedSettings) {
  // FIXME: update settings NOT manually
  const defaultSettings = settings.getIn(['game', 'newRoomSettings'])
    ? settings.getIn(['game', 'newRoomSettings']) // initial default settings from loadedSettings
    : settings; // patching settings after room create

  this.settings = {};

  for (const [key, value] of defaultSettings) { // eslint-disable-line
    this.settings[key] = value; // initialize all settings for new room
  }

  this.active = false; // ticks are fetching only if active = true
  this.assets = [];
  this.fetchingHistory = false;
}

NewRoomSettings.prototype = {
  /**
   *
   * @param asset{string} request for change asset
   * @param fetchingHistory{boolean} preloader indicator
   * @param assets{Array} assets for chart
   * @param updateSettings{boolean, Map} manual settings update after room creation
   * @param active{boolean} activating newRoom for collecting assets (if on room/new page)
   * @returns {*} new instance
   */
  processSettings({ asset = this.settings.asset, fetchingHistory = false, assets = [], updateSettings = false, active = true }) {
    if (!active) {
      this.clearAssets();
      this.active = active;
      return this;
    }

    this.active = active;

    if (updateSettings) return this.onCreateRoom(updateSettings);

    if (asset !== this.settings.asset) this.changeAsset(asset);

    if (assets.length) this.assets = assets;

    this.fetchingHistory = fetchingHistory;

    return this;
  },

  /**
   * clear assets on change asset
   */
  clearAssets() {
    this.assets = [];
  },

  /**
   * Change asset
   * @param asset{string}
   */
  changeAsset(asset) {
    this.clearAssets();
    this.settings.asset = asset;
  },

  /**
   *
   * @param settings{Map} update settings through next instance (constructor)
   * @returns {NewRoomSettings}
   */
  onCreateRoom(settings) {
    this.clearAssets();
    return new NewRoomSettings(settings);
  },
};

