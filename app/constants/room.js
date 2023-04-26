
const ROOM_STATUS = {
  INVALID: 2,
  ACTIVE: 4,
  FINISHED: 5,
  CANCELLED: 7,
};

const ROOM_GAME_STATUS = {
  UNKNOWN: 0,
  DRAW: -1,
  NO_BULLS: -2,
  NO_BEARS: -3,
  NOBODY_JOINED: -4,
  CANNOT_BE_FINISHED: -5,
  BULLS_WIN: 1,
  BEARS_WIN: 2,
};

const ROOM_PROCESS_STATUS = {
  LOADING: {
    type: 'LOADING',
    game: 'LOADING',
  },
  ACTIVE_TEAM1_WIN: {
    type: 'ACTIVE',
    game: 'TEAM1_WIN',
  },
  ACTIVE_TEAM2_WIN: {
    type: 'ACTIVE',
    game: 'TEAM2_WIN',
  },
  ACTIVE_DRAW: {
    type: 'ACTIVE',
    game: 'DRAW',
  },
  FINISHED_TEAM1_WIN: {
    type: 'FINISHED',
    game: 'TEAM1_WIN',
  },
  FINISHED_TEAM2_WIN: {
    type: 'FINISHED',
    game: 'TEAM2_WIN',
  },
  FINISHED_DRAW: {
    type: 'FINISHED',
    game: 'DRAW',
  },
  CANCELLED_NOBODY: {
    type: 'CANCELLED',
    game: 'NOBODY',
  },
  FORBIDDEN_NOT_PARTICIPATED: {
    type: 'FORBIDDEN',
    game: 'NOT_PARTICIPATED',
  },
};

const AVAILABLE_TIMEFRAMES = ['1m', '3m', '5m', '10m'];

const TIMEFRAMES_IN_SECONDS = [60, 180, 300, 600];

export {
  ROOM_GAME_STATUS,
  ROOM_STATUS,
  AVAILABLE_TIMEFRAMES,
  TIMEFRAMES_IN_SECONDS,
  ROOM_PROCESS_STATUS,
};
