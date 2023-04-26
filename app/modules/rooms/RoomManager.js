import NewRoom from './NewRoom';
import Rooms from './Rooms';
import {
  collectionFromApi, convertFromAPI, filterQuery, processRoom, processTick,
  subscribersWatcher,
} from './utils';
import { loadedSettings, loadSettings } from '../settings/settings';
import { roomCancelled } from '../../utils/rooms';
import { ROOM_PROCESS_STATUS } from '../../constants/room';

// TODO: adding rooms to rooms panel
// TODO: remove room on deadline (if not a member and not pinned)

// FIXME WTF? settings = state.settings || loadedSettings
/**
 * @param state
 * @param settings
 * @returns {RoomManager}
 * @constructor
 */
export default function RoomManager(state = {}, settings = state.settings || loadedSettings) {
  this.userId = '';
  this.settings = settings;
  this.init(state);
  return this;
}


// FIXME request should be roomManager props, but somehow it doesn't works
let request;

/**
 * If any method will "return this.clone()" app will be re-rendered.
 * Otherwise, "return this" will not re-render the app.
 * @type {{setUserId: (function(*): RoomManager), init: (function(*)), setActive: (function(Object, boolean=): RoomManager), updateActiveRoomAssets: (function(Object): RoomManager), tick: (function(*=): RoomManager), processNewRoom: (function(*=)), formatRequest: (function({id?: *}): *), getRandomRoom: (function(): RoomManager), processRequest: (function({rooms?: *, users?: *, filter: boolean}): RoomManager), updateRoom: (function({id: string, data: Object}): RoomManager), sortRooms: (function(Array=, {direction: string, type: *, active: boolean}): Array), getActiveRooms: (function(): Array), leftPanelRooms: (function(): Array), pinTab: (function(string, boolean)), addRoom: (function(Object, boolean): (*|RoomManager)), hideRecommended: (function(): RoomManager), updateSettings: (function(): RoomManager), clone: (function(): RoomManager)}}
 */
RoomManager.prototype = {
  /**
   * Change current userId for room processing
   * @param userId
   * @returns {RoomManager}
   */
  setUserId(userId) {
    if (this.userId && userId !== this.userId) {
      this.init();
    }
    this.userId = userId;
    return this.clone();
  },

  /**
   * Initialize from state
   * @param state
   */
  init(state) {
    this.userId = state.userId || '';
    this.active = state.active || {};
    this.rooms = state.rooms || new Rooms();
    this.tabs = state.tabs || this.settings.getIn(['pinned']).toJS();
    this.new = state.new || new NewRoom();
    this.isLoaded = !!state.isLoaded;
    this.subscriptions = state.subscriptions || [];
    this.time = state.time || Date.now();
    this.recommendedRoomId = state.recommendedRoomId || '';

    this.subscriptions = subscribersWatcher(this, this.settings);
  },


  /**
   * Change active room
   * @param room {object}
   * @returns {RoomManager}
   */
  setActive(room) {
    const rooms = this.rooms.getRooms();
    const index = rooms.findIndex((r) => r.id === room.id) === -1 ? false : rooms.findIndex((r) => r.id === room.id);

    this.active = processRoom(room, this.userId, this.time);

    if (!index) {
      // add processed room in pool
      this.rooms.addRoom(this.active);
    } else {
      // update assets in rooms pool. Draw from cache will get assets from there
      rooms[index] = this.active;
      this.rooms.setRooms(rooms);
    }

    return this.clone();
  },

  /**
   * Process asses tick
   * @param assets
   * @returns {RoomManager}
   */

  /*
    // FIXME Check if room is cancelled
    if (room.gameStatus === ROOM_GAME_STATUS.DRAW || (room.isGamePlaying || room.canViewResult) && !room.cancelled) {
      reducedData = room.assets || [];
    } else {
      reducedData = room.assets ? room.assets.filter((a) => a.timestamp <= room.deadlineAt) : [];
    }
   */
  tick(assets) {
    let time = 0;
    const byId = assets.reduce((o, a) => {
      o[a.id] = { // eslint-disable-line
        value: a.value,
        timestamp: a.timestamp * 1000,
      };
      time = Math.max(a.timestamp, time);
      return o;
    }, {});
    const rooms = this.rooms.getRooms();

    /**
     * Stop adding assets on room's cancel
     * @param room
     * @return {string} deadline or expired boundary where to stop adding assets to room
     */
    const assetsBoundary = (room) => roomCancelled(room) || room.gameStatus === ROOM_PROCESS_STATUS.LOADING ? 'deadlineAt' : 'expiredAt';

    this.time = time * 1000;

    // FIXME DRY issue
    if (this.active.asset) {
      const a = byId[this.active.asset];
      if ((a && a.timestamp <= this.active[assetsBoundary(this.active)]) && this.active.status === 4) {
        this.active = processTick(this.active, a, this.userId, this.time);
      }
    }

    if (this.new.settings.asset && this.new.active) {
      const a = byId[this.new.settings.asset];
      if (a) {
        this.new.assets.push(a);
      }
    }

    for (let i = 0; i < rooms.length; i += 1) {
      const a = byId[rooms[i].asset];
      if ((a && a.timestamp <= rooms[i][assetsBoundary(rooms[i])]) && rooms[i].status === 4) {
        rooms[i] = processTick(rooms[i], a, this.userId, this.time);
      }
    }

    this.rooms.setRooms(rooms);
    return this.clone();
  },


  processNewRoom(params) {
    this.new = this.new.processSettings(params);
    return this.clone();
  },

  /**
   * Prepare initial request for API
   * @returns {*}
   */
  formatRequest({ id, ids, limit, title }) {
    const lp = this.settings.getIn(['app', 'leftPanel']);
    const filterSettings = this.settings.getIn(['game', 'roomsFilterSettings']).toJS();
    const filterParams = filterQuery(filterSettings);
    request = {
      active: (lp.get('open') && lp.get('route') === 'rooms') || id === 'random',
      tabs: this.settings.get('pinned').toJS() || [],
      ...filterParams,
      ...{ title },
    };

    if (id && id !== 'random') {
      request.currentRoom = id;
      request.tabs = request.tabs.filter((tabRoomId) => tabRoomId !== id); // remove this id from tabs query if it is currentRoom in request
    }

    if (id === 'filter' || id === 'add_rooms' || id === 'search_rooms') { // id === 'filter' is only on update filter condition, not on initial request;
      delete request.currentRoom; // simple update filter OR add rooms request doesn't need this prop (we have these rooms in pool)
      delete request.tabs; // simple update filter OR add rooms request doesn't need this prop (we have these rooms in pool)
    }

    if (id === 'add_rooms') {
      request = { ...request, ...{ excludePreview: ids, limit } }; // exclude rooms from request on add room
    }

    if (id === 'search_rooms') {
      request = { ...request, ...{ limit } };
    }

    return request;
  },

  /**
   * Process initial request
   * @param rooms
   * @param users
   * @param filter {boolean} if it is filter processing
   * @returns {RoomManager}
   */
  processRequest({ rooms, users, clearRoomsList }) {
    const roomsParsed = collectionFromApi(rooms, users);

    /**
     * If it is filter processing, we should save rooms which are in TABS and current active room
     * Then left panel becomes clear and if there are some rooms from request they will merge with saved rooms
     * @type {Array}
     */

    if (clearRoomsList) {
      this.rooms.removeRooms([...this.tabs, this.active.id]);
    }

    for (let i = 0; i < roomsParsed.length; i += 1) {
      const r = processRoom(roomsParsed[i], this.userId, this.time);

      if (request.currentRoom === r.id) {
        this.active = r;
      }

      this.rooms.addRoom(r);
    }

    this.request = {};
    this.isLoaded = true;

    return this.clone();
  },

  /**
   * Main room - ws updater
   * @param id {string} room id
   * @param data {object} data from ws
   * @return {RoomManager}
   */
  updateRoom({ id, data }) {
    const { userId, time } = this;
    // update active room
    if (id === this.active.id) {
      this.active = this.rooms.updateRoom(id, data, userId, time); // if it was active room, update it
      return this.clone();
    }

    this.rooms.updateRoom(id, data, userId, time);
    return this.clone();
  },

  /**
   * Pinned rooms handler
   * @param id {string} room id to pin
   * @param setPinned {boolean} pin only (not unpin)
   */
  pinTab(id, setPinned) {
    if (this.tabs.includes(id) && !setPinned) {
      this.tabs = this.tabs.filter((tabId) => tabId !== id);
    } else {
      if (!this.tabs.includes(id)) this.tabs.push(id); // eslint-disable-line
    }
    return this.updateSettings();
  },

  /**
   * Recommended room add handler
   * @param room {object} unparsed new room to add to pool
   * @param recommended {boolean} add recommended room to pool
   * @return {* | RoomManager}
   */
  addRoom(room, recommended) {
    const rooms = this.rooms.getRooms();
    // adding recommended room
    if (recommended && !rooms.find((r) => r.id === room.id)) {
      // add to pool if it isn't there
      this.rooms.addRoom(processRoom(convertFromAPI(room), this.userId, this.time));
      this.recommendedRoomId = room.id;
    } else if (recommended) {
      // just set id alias if room is already in pool
      this.recommendedRoomId = room.id;
    }
    return this.clone();
  },

  /**
   * remove alias if user click on hide recommended
   * @return {RoomManager}
   */
  hideRecommended() {
    this.recommendedRoomId = '';
    return this.clone();
  },

  // FIXME Can we pass new settings through updateSettings param from a action payload?
  /**
   * Update settings (if settings updated recache them from LS)
   * @return {RoomManager}
   */
  updateSettings() {
    this.settings = loadSettings();
    return this.clone();
  },

  /**
   * Clone instance
   * @returns {RoomManager}
   */
  clone() {
    return new RoomManager(this);
  },
};
