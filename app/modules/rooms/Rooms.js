import {
  mergeRoomData,
} from './utils';

export default function Rooms() {
  this.rooms = new Set();
}

Rooms.prototype = {
  /**
   * get rooms (array)
   * @return {Array} rooms
   */
  getRooms() {
    return Array.from(this.rooms);
  },

  /**
   * Redirect to random room from pool
   * @return {room}
   */
  getRandomRoom() {
    const rooms = this.getRooms();
    if (!rooms.length) return null;

    return rooms[Math.round(Math.random() * (rooms.length - 1))];
  },

  /**
   * Return active rooms from pool (for left panel)
   * @returns {Array} active rooms
   */
  getActiveRooms() {
    const rooms = this.getRooms();
    return rooms.filter((r) => r.status === 4 && r.timeLeftDeadline > 0);
  },

  /**
   * Set rooms from passed array into set
   * @param rooms {Array}
   */
  setRooms(rooms) {
    this.rooms = new Set(rooms);
  },

  /**
   * add room in set
   * @param room {room}
   */
  addRoom(room) {
    this.rooms.add(room);
  },

  /**
   *
   * @param ids {Array} rooms to save in pool
   */
  removeRooms(ids) {
    const rooms = this.getRooms();
    this.rooms = new Set(rooms.filter((r) => ids.includes(r.id)));
  },

  /**
   * Merging room data in rooms pool
   * @param id {string} room id
   * @param data {object} data to update
   * @param userId
   * @param time
   * @return {*}
   */
  updateRoom(id, data, userId, time) {
    const rooms = this.getRooms();
    const room = rooms.find((r) => r.id === id);
    const index = rooms.findIndex((r) => r.id === id);

    if (!room) return;

    // update room in pool
    rooms[index] = mergeRoomData(room, data, userId, time); // processing will be handled in mergeRoomData

    this.rooms = new Set(rooms);

    return rooms[index]; // eslint-disable-line
  },

  /**
   * Apply sorting for left panel rooms
   * @param rooms {Array} active rooms from pool
   * @param direction {string} ASC/DESC
   * @param sortType {type} bet/deadlineAt
   * @param active {boolean} if need to apply sort
   * @return {Array} list of sorted rooms
   */
  sortRooms(rooms = [], { direction, type, active }) {
    if (!active) return rooms;
    return rooms.sort((a, b) => direction === 'ASC' ? a[type] - b[type] : b[type] - a[type]) || [];
  },

  /**
   * Returns rooms for left panel, apply sorting if needed
   * @return {Array} list of rooms for left panel
   */
  leftPanelRooms(settings) {
    const sortSettings = settings.getIn(['game', 'roomsSortSettings']).toJS();
    return this.sortRooms(this.getActiveRooms(), sortSettings);
  },
};
