// import { generateData, generateMatchData } from './utils';
import { generateMatchData } from './utils';
import { botBetsDataMatch1, botBetsDataMatch2, botBetsDataMatch3, botBetsDataMatch4, botBetsDataMatch5 } from './botBetsData';

export const betModel = {
  name: 'Player64',
  avatar: './assets/neymar.png',
  bet: 120,
  id: 0,
  team: 1,
  value: -1,
  timestamp: 5000,
  deadline: {
    timestamp: 5000 + 15000,
  },
};

export const betModel1 = {
  name: 'Larry',
  avatar: '/assets/neymar.png',
  bet: 100,
  id: 1,
  team: 2,
  value: -2,
  timestamp: 30000,
  deadline: {
    timestamp: 30000 + 30000,
  },
};

export const betModel2 = {
  name: 'Putin',
  avatar: '/assets/neymar.png',
  bet: 322,
  id: 2,
  team: 1,
  value: 0,
  timestamp: 45000,
  deadline: {
    timestamp: 45000 + 30000,
  },
};

export const betModel3 = {
  name: 'Trump',
  avatar: '/assets/neymar.png',
  bet: 30,
  id: 3,
  team: 2,
  value: 1,
  timestamp: 80000,
  deadline: {
    timestamp: 80000 + 15000,
  },
};

export const footballRoomModel1 = {
  id: 1,
  teamA: {
    name: 'BRA',
    score: 0,
    bets: [betModel, betModel],
  },
  teamB: {
    name: 'GER',
    score: 1,
    bets: [betModel1, betModel1],
  },
  scoreA: 0,
  scoreB: 1,
  bets: botBetsDataMatch1,
  time: '78:44',
  data: [], // random
  video: {
    id: 1,
    fullScreen: true,
    data: [...generateMatchData(1)],
    time: 0,
  },
  createdAt: 0,
  deadlineAt: 314000,
};

export const footballRoomModel2 = {
  id: 2,
  teamA: {
    name: 'BRC',
    score: 0,
    bets: [betModel, betModel1],
  },
  teamB: {
    name: 'PSG',
    score: 1,
    bets: [betModel2, betModel3],
  },
  scoreA: 1,
  scoreB: 0,
  bets: botBetsDataMatch2,
  time: '10:32',
  data: [], // random
  video: {
    id: 2,
    fullScreen: true,
    data: [...generateMatchData(2)],
    time: 0,
  },
  createdAt: 0,
  deadlineAt: 319000,
};


export const footballRoomModel3 = {
  id: 3,
  teamA: {
    name: 'RMA',
    score: 0,
    bets: [betModel, betModel1],
  },
  teamB: {
    name: 'BAR',
    score: 0,
    bets: [betModel2, betModel3],
  },
  scoreA: 0,
  scoreB: 0,
  bets: botBetsDataMatch3,
  time: '10:32',
  data: [], // random
  video: {
    id: 3,
    fullScreen: true,
    data: [...generateMatchData(3)],
    time: 0,
  },
  createdAt: 0,
  deadlineAt: 310100,
};

export const footballRoomModel4 = {
  id: 4,
  teamA: {
    name: 'DOR',
    score: 0,
    bets: [betModel, betModel1],
  },
  teamB: {
    name: 'S04',
    score: 0,
    bets: [betModel2, betModel3],
  },
  scoreA: 0,
  scoreB: 0,
  bets: botBetsDataMatch4,
  time: '10:32',
  data: [], // random
  video: {
    id: 4,
    fullScreen: true,
    data: [...generateMatchData(4)],
    time: 0,
  },
  createdAt: 0,
  deadlineAt: 260000,
};

export const footballRoomModel5 = {
  id: 5,
  teamA: {
    name: 'RKA',
    score: 1,
    bets: [betModel, betModel1],
  },
  teamB: {
    name: 'SPM',
    score: 1,
    bets: [betModel2, betModel3],
  },
  scoreA: 1,
  scoreB: 1,
  bets: botBetsDataMatch5,
  time: '10:32',
  data: [], // random
  video: {
    id: 5,
    fullScreen: true,
    data: [...generateMatchData(5)],
    time: 0,
  },
  createdAt: 0,
  deadlineAt: 326000,
};

export const footballRooms = [footballRoomModel1, footballRoomModel2, footballRoomModel3, footballRoomModel4, footballRoomModel5];

export const userModel = {
  balance: 1000,
  username: 'Demo player',
  demo: true,
};

export const betsList = [betModel, betModel1];

export const messageModel = {
  id: 1,
  username: 'Player64',
  avatar: './assets/neymar.png',
  message: 'hello world',
  createdAt: Date.now() - 18000,
};

export const messageModel1 = {
  id: 2,
  username: 'Larry',
  avatar: './assets/neymar.png',
  message: 'hello world!',
  createdAt: Date.now() - 9000,
};

export const demoChartData = {
  x: {
    delta: 1520592064000 - 1520591907000,
    max: 1520592064000,
    min: 1520591907000,
  },
  y: {
    delta: 0.728,
    max: 0.728,
    min: 0,
  },
};

export const demoData = [
  { timestamp: 1520591907000, value: 0.7279 },
];
