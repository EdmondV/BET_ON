import { getMatchData } from './matchesData';

function getRandomInt() {
  const min = 0;
  const max = 2;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateMatchData = (id = 1) => {
  // TODO: BORDERS
  // const MAX_VAL = 10;
  // const MIN_VAL = -10;

  const { events, duration } = getMatchData(id);

  const direction = (team, value, decrease) => team === 1 || decrease ? value : -value;

  const ticks = duration / 1000;
  const data = [];

  for (let i = 0; i < ticks; i += 1) {
    const currentTS = i * 1000;
    const event = events.find((e) => e.timestamp === currentTS);
    const prevTick = data[i - 1];

    if (!event) {
      data.push(prevTick ?
        { timestamp: prevTick.timestamp + 1000, value: prevTick.value } :
        { timestamp: currentTS, value: 0 }
      );
    } else if (event && prevTick) {
      data.push({
        timestamp: prevTick.timestamp + 1000,
        value: prevTick.value + direction(event.team, event.value, event.decrease),
      });
    }
  }

  return data;
};

/**
 * Random
 * @return {*[]}
 */
export const generateData = () => {
  const data = [];

  const chartTime = 60000 * 3; // 3min
  const MAX_VAL = 10;
  const MIN_VAL = -10;

  function getNextNumber(value) {
    const rand = Math.random();
    let nextValue = value;

    if (rand > 0.5) {
      nextValue += getRandomInt();
    } else {
      nextValue -= getRandomInt();
    }

    if (nextValue > MAX_VAL - 1) {
      nextValue = value;
    } else if (nextValue < MIN_VAL) {
      nextValue = value;
    }

    return nextValue;
  }


  let num = 0;
  let timestamp = 0;

  for (let i = 0; i < chartTime / 1000; i += 1) {
    timestamp += 1000; // by 1 sec

    if (i !== 0) {
      num = !(i % 3) ? getNextNumber(num) : num;
    }

    data.push({
      value: num,
      timestamp,
    });
  }

  return [...data];
};

const teamNames = {
  BRC: 'Barcelona',
  BAR: 'Barcelona',
  RMA: 'Real Madrid',
  PSG: 'PSG',
  BRA: 'Brazil',
  GER: 'Germany',
  S04: 'Schalke',
  DOR: 'Dortmund',
  SPM: 'Spartak Moscow',
  RKA: 'Rubin Kazan',
};

export function getTeamName(key) {
  return teamNames[key];
}
