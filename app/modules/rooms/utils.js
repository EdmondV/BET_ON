import { decimalsForAsset } from 'utils/assets';
import { ROOM_STATUS, ROOM_GAME_STATUS, ROOM_PROCESS_STATUS } from 'constants/room';

const convertShortAsset = (i) => ({ timestamp: i.t * 1000, value: i.v });

const bet = (a, b) => (a + b.bet).toFixed(2) / 1;

const payout = (a, b) => (a + b.payout).toFixed(2) / 1;

const teamBank = (room, team) => room.meta[team].bank * (1 - room.commission || 0.02);

const calcPayout = (room, team) => (teamBank(room, team) / (1 + room.meta[team].bets) + room.bet).toFixed(2) / 1;

const getStatus = (room) => {
  if (!room.firstAsset || !room.lastAsset) {
    return room.gameStatus;
  }
  if (room.firstAsset.value === room.lastAsset.value) {
    return ROOM_GAME_STATUS.DRAW;
  }
  return room.gameStatus;
};

/**
 * Checks if room is active
 * @param status
 * @param room
 */
const roomIsActive = ({ status }) => status === ROOM_STATUS.ACTIVE;

/**
 * Time between deadline and expiration time (doesn't care if user can view result or not)
 * @param room
 * @param time
 */
const betsAreOff = (room, time) => room.status === ROOM_STATUS.ACTIVE && room.deadlineAt <= time;

/**
 * Checks if user can view final result
 * @param members
 * @param userId
 */
const canViewResult = ({ members }, userId) => members && !!(members.find((m) => m.id === userId));

/**
 * At least one team has NO bets or all bets were made by user
 * @param room
 * @param userId
 * @param time
 */
const getNobodyJoined = (room, userId, time) => time >= room.deadlineAt &&
  ((!room.bets.find((r) => r.team === 1) || !room.bets.find((r) => r.team === 2)) // at least one team has NO bets
    || !room.bets.find((b) => b.authorId !== userId)) // or all bets were made by user
;

/**
 *
 * @param assets
 * @param room
 * @param userId
 * @param time
 * @return {*} processed status
 */
const getProcessedStatus = ({ assets, ...room }, userId, time) => { // eslint-disable-line
  if (!assets || !userId) return ROOM_PROCESS_STATUS.LOADING;
  const firstAsset = assets[0] || {};
  const lastAsset = assets[assets.length - 1] || {};

  if (!canViewResult(room, userId) && (betsAreOff(room, time) || !roomIsActive(room))) {
    return ROOM_PROCESS_STATUS.FORBIDDEN_NOT_PARTICIPATED;
  }

  if (getNobodyJoined(room, userId, time) && canViewResult(room, userId)) {
    return ROOM_PROCESS_STATUS.CANCELLED_NOBODY;
  }

  // FIXME: shorten condition. DRAW room has "cancelled" status from backend
  if (canViewResult(room, userId) && (room.status === ROOM_STATUS.FINISHED || (room.status === ROOM_STATUS.CANCELLED && room.gameStatus === ROOM_GAME_STATUS.DRAW))) { // eslint-disable-line

    if (room.gameStatus === ROOM_GAME_STATUS.BULLS_WIN) {
      return ROOM_PROCESS_STATUS.FINISHED_TEAM1_WIN;
    } else if (room.gameStatus === ROOM_GAME_STATUS.BEARS_WIN) {
      return ROOM_PROCESS_STATUS.FINISHED_TEAM2_WIN;
    } else { // eslint-disable-line
      return ROOM_PROCESS_STATUS.FINISHED_DRAW;
    }

  } // eslint-disable-line

  if (firstAsset.value < lastAsset.value && roomIsActive(room)) {
    return ROOM_PROCESS_STATUS.ACTIVE_TEAM1_WIN;
  } else if (firstAsset.value > lastAsset.value && roomIsActive(room)) {
    return ROOM_PROCESS_STATUS.ACTIVE_TEAM2_WIN;
  } else if (firstAsset.value === lastAsset.value && roomIsActive(room)) {
    return ROOM_PROCESS_STATUS.ACTIVE_DRAW;
  }

  // fallback
  return ROOM_PROCESS_STATUS.LOADING;
};

const getRoomResult = ({ myPayout, myBet, bears, bulls, gameStatus }) => {
  switch (true) {
    case !bears || !bulls:
    case !bears.length || !bulls.length:
      return 'nobody';
    case gameStatus === ROOM_GAME_STATUS.DRAW:
      return 'draw';
    case myPayout > myBet:
      return 'win';
    default:
      return 'lose';
  }
};

const singlePayout = (b, totalPayout, betsLength) => (b + (totalPayout / betsLength)).toFixed(2) / 1;

/* eslint-disable no-param-reassign */
export function convertFromAPI(room) {
  room.assetDecimals = decimalsForAsset(room.asset);
  room.assets = room.assets ? room.assets.map(convertShortAsset) : [];
  room.fee = (room.fee && room.fee.toFixed) ? room.fee.toFixed(2) / 1 : 0;
  room.chartMeta = calculateMeta(room);
  return room;
}

export function normalizeY(y, pad = 0.1) {
  // fix Y
  y.max = 10;
  y.min = -10;
  const d = y.max - y.min;

  let m = null;
  if (d > 0) {
    m = {
      max: y.max + d * pad,
      min: y.min - d * pad,
    };
  } else {
    m = {
      max: y.max * (1 - pad / 100),
      min: y.min * (1 + pad / 100),
    };
  }

  m.delta = m.max - m.min;

  return m;
}

export function calculateMeta(room) {
  const { assets } = room;

  const meta = {
    x: {
      min: room.createdAt,
      max: room.expiredAt,
      delta: room.expiredAt - room.createdAt,
    },
    y: {
      min: Infinity,
      max: -Infinity,
    },
  };

  for (let i = 0; i < assets.length; i += 1) {
    const v = assets[i].value;
    meta.y.max = Math.max(meta.y.max, v);
    meta.y.min = Math.min(meta.y.min, v);
  }

  meta.y.delta = meta.y.max - meta.y.min;

  return meta;
}


export function collectionFromApi(rooms, users) {
  return rooms.map((r) => {
    r = convertFromAPI(r);
    r.members = r.membersId.map((id) => users[id]);
    if (typeof users === 'object') {
      if (Array.isArray(r.membersId)) {
        r.members = r.membersId.map((id) => users[id]);
      }
      delete r.membersId;
    }
    return r;
  });
}
/* eslint-enable no-param-reassign */

/**
 *
 * @param room {object} to update
 * @param data {object} data from WS. Room Status update doesn't have members prop. Bet update has
 * @returns {*}
 */

// FIXME: DRY ISSUES
export const mergeRoomData = (room, data, userId, time) => {
  const { bet: newBet, deadlineAt, status, members, gameStatus } = data;

  // update of room status / cancel OR finish events
  if (!data.members) {
    return processRoom({
      ...room,
      bet: newBet,
      deadlineAt,
      status,
      gameStatus,
    }, userId, time);
  }

  // bets updates
  const bets = data.bets.map((b) => {
    const m = members.find((member) => member.id === b.authorId);

    return {
      ...b,
      name: m && m.username,
      avatar: m && m.avatar,
    };
  });

  return processRoom({
    ...room,
    ...{ bets },
    bet: newBet,
    deadlineAt,
    members: [...room.members, ...members],
  }, userId, time);
};

// This is active room and tabs selector with user bets/game status data.
export function processRoom(room, userId, currentTime = Date.now()) {
  if (room.stopCalculating) return room;

  const bets = room.bets.map((b) => {
    const m = room.members.find((member) => member.id === b.authorId);

    return {
      ...b,
      name: m && m.username,
      avatar: m && m.avatar,
    };
  });

  const bulls = [];
  const bears = [];
  const myBets = [];

  for (let i = 0; i < room.bets.length; i += 1) {
    if (room.bets[i].team === 1) {
      bulls.push(room.bets[i]);
    } else {
      bears.push(room.bets[i]);
    }

    if (room.bets[i].authorId === userId) {
      myBets.push(room.bets[i]);
    }
  }

  const bullsPayout = calcPayout(room, 'bears');
  const bearsPayout = calcPayout(room, 'bulls');
  const totalPayout = (bullsPayout + bearsPayout).toFixed(2) || 0;

  const myBet = myBets.reduce(bet, 0) || 0;

  const userWon = (bulls.length > 0 && room.gameStatus === ROOM_GAME_STATUS.BULLS_WIN) || (bears.length > 0 && room.gameStatus === ROOM_GAME_STATUS.BEARS_WIN) || (room.gameStatus === ROOM_GAME_STATUS.DRAW);

  let myPayout = (room.gameStatus === ROOM_GAME_STATUS.DRAW) ? myBet : myBets.reduce(payout, 0) || 0;
  myPayout = (userWon || currentTime < room.deadlineAt) ? myPayout : 0;
  const finalResult = getRoomResult({ myPayout, myBet, ...room });
  const roomStatus = getProcessedStatus(room, userId, currentTime);

  let assets = room.assets;
  let stopCalculating = false;
  switch (roomStatus) {
    case ROOM_PROCESS_STATUS.ACTIVE_DRAW:
    case ROOM_PROCESS_STATUS.ACTIVE_TEAM1_WIN:
    case ROOM_PROCESS_STATUS.ACTIVE_TEAM2_WIN:
    case ROOM_PROCESS_STATUS.LOADING:
      break;
    default: // eslint-disable-line no-case-declarations
      stopCalculating = true;

      const field = roomStatus === ROOM_PROCESS_STATUS.FORBIDDEN_NOT_PARTICIPATED ||
                    roomStatus === ROOM_PROCESS_STATUS.CANCELLED_NOBODY ? 'deadlineAt' : 'expiredAt';

      assets = room.assets.filter((a) => a.timestamp <= room[field]);
  }

  return {
    ...room,
    stopCalculating,
    assets,
    bets,
    nextBullsPayout: singlePayout(room.bet, teamBank(room, 'bears'), bulls.length + 1),
    nextBearsPayout: singlePayout(room.bet, teamBank(room, 'bulls'), bears.length + 1),
    bullsPayout,
    bearsPayout,
    totalPayout,
    bet: parseInt(room.bet, 10),
    bulls,
    bears,
    userWon,
    myPayout,
    finalResult,
    isDrawOrNobody: finalResult === 'nobody' || finalResult === 'draw',
    commission: room.commission || 0.02,
    bullsCommission: room.meta.bears.bank * (room.commission || 0.02),
    bearsCommission: room.meta.bulls.bank * (room.commission || 0.02),
    myBet,
    nobodyJoined: getNobodyJoined(room, userId),
    gameStatus: getStatus(room),
    roomStatus, // main processed status for game needs
    processed: true, // FIXME WTF?
    timeLeftDeadline: room.deadlineAt - currentTime > 0 ? Math.round(room.deadlineAt - currentTime) : 0, // in ms (e.g 68000 = 68 seconds)
    timeLeftExpiredAt: room.expiredAt - currentTime > 0 ? Math.round(room.expiredAt - currentTime) : 0, // in ms (e.g 68000 = 68 seconds)
  };
}

export function processTick(room, value, userId, currentTime) {
  // FIXME: blocks updating active room in rooms pool
  // const l = room.assets.length;
  //
  // if (l && room.assets[l - 1].timestamp === value.timestamp) { // Room already proccesed
  //   return { ...room };
  // }

  room.assets.push(value);

  const min = Math.min(room.chartMeta.y.min, value.value);
  const max = Math.max(room.chartMeta.y.max, value.value);
  room.chartMeta.y = { // eslint-disable-line no-param-reassign
    min,
    max,
    delta: max - min,
  };

  return processRoom(room, userId, currentTime);
}

/**
 * Set ids of rooms to subscribe
 * @param rooms {Rooms} roomManager rooms pool
 * @param subscriptions {Array} roomManager subs array
 * @param tabs {Array} ids[] of pinned rooms
 * @param settings {object} Immutable object. Current app settings
 * @return {Array}
 */
export function subscribersWatcher({ rooms, subscriptions, tabs }, settings) {
  const lp = settings.getIn(['app', 'leftPanel', 'open']);
  const route = settings.getIn(['app', 'leftPanel', 'route']);
  const roomsPool = rooms.getRooms();
  let subs = subscriptions || [];

  if (lp && route === 'rooms') {
    subs = roomsPool.filter((room) => room.status === 4).map((room) => room.id);
  } else {
    subs = roomsPool.filter((room) => room.status === 4 && tabs.includes(room.id)).map((room) => room.id);
  }
  return subs;
}

export function filterQuery(settings) {
  const { active, assets: asset, timeframe } = settings;
  let { minBet, maxBet } = settings;

  minBet = minBet !== '' ? minBet : []; // this will remove from query url?minBet=&maxBet= (empty params)
  maxBet = maxBet !== '' ? maxBet : []; // this will remove from query url?minBet=&maxBet= (empty params)

  if (!active) return {};
  return {
    asset,
    timeframe,
    minBet,
    maxBet,
  };
}
