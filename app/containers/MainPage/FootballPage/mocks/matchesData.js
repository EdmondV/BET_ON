export const EVENT_TYPES = {
  NONE: 0,
  PASS: 1,
  PASS_INTERCEPTION: 2,
  THROW_IN: 3,
  SAVE: 4,
  SHOT_OFF_TARGET: 5,
  SHOT_ON_TARGET: 6,
  GOAL: 7,
  CARD: 8,
  TACKLE: 9,
  FREE_KICK: 10,
  CORNER: 11,
  SHOT_BLOCKED: 12,
  SHOT: 13,
  OUT: 14,
  OFFSIDE: 15,
  KICK_OFF: 16,
  PENALTY: 17,
};

function createEvent(type, timeFromBeginning, strength, team, decrease = false, x = 50, y = 50) {
  return {
    type,
    value: strength,
    team,
    decrease,
    timestamp: timeFromBeginning * 1000,
    ballPosition: { x, y },
  };
}

export function getMatchData(id) {
  return matches[id];
}

export function getMatchEvents(id) {
  return matches[id].events;
}

export function getEventName({ type }) {
  switch (type) {
    case EVENT_TYPES.PASS:
      return 'Pass';
    case EVENT_TYPES.PASS_INTERCEPTION:
      return 'Pass interception';
    case EVENT_TYPES.SAVE:
      return 'Goalkeeper save';
    case EVENT_TYPES.GOAL:
      return 'Goal';
    case EVENT_TYPES.THROW_IN:
      return 'Throw in';
    case EVENT_TYPES.CARD:
      return 'Yellow card';
    case EVENT_TYPES.FREE_KICK:
      return 'Free kick';
    case EVENT_TYPES.SHOT_ON_TARGET:
      return 'Shot on target';
    case EVENT_TYPES.CORNER:
      return 'Corner kick';
    case EVENT_TYPES.SHOT_BLOCKED:
      return 'Shot blocked';
    case EVENT_TYPES.SHOT:
      return 'Shot';
    case EVENT_TYPES.SHOT_OFF_TARGET:
      return 'Shot off target';
    case EVENT_TYPES.OUT:
      return 'Out of field';
    case EVENT_TYPES.TACKLE:
      return 'Tackle';
    case EVENT_TYPES.OFFSIDE:
      return 'Offside';
    case EVENT_TYPES.KICK_OFF:
      return 'Kick off';
    default:
      return '';
  }
}

// BRA - GER
export const MATCH_DATA_1 = {
  events: [
    createEvent(EVENT_TYPES.PASS, 5, 2, 1, false, 50, 70),
    createEvent(EVENT_TYPES.PASS, 14, 1, 1, false, 40, 60),
    createEvent(EVENT_TYPES.PASS, 16, 2, 1, false, 60, 10), // +5
    createEvent(EVENT_TYPES.PASS, 18, 2, 1, false, 45, 20), // +5
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 21, 3, 2, false, 30, 5), // +2
    createEvent(EVENT_TYPES.PASS, 25, 6, 2, false, 60, 10), // -4
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 31, 2, 1, false, 30, 20), // -2
    createEvent(EVENT_TYPES.THROW_IN, 40, 1, 2, false, 35, 0), // -3
    createEvent(EVENT_TYPES.PASS, 47, 1, 2, false, 45, 45), // -4
    createEvent(EVENT_TYPES.PASS, 50, 3, 2, false, 36, 30), // -7
    createEvent(EVENT_TYPES.GOAL, 54, 3, 2, false, 0, 50), // -10
    createEvent(EVENT_TYPES.KICK_OFF, 120, 10, 1, false, 50, 50), // 0
    createEvent(EVENT_TYPES.PASS, 125, 1, 1, false, 40, 60), // +1
    createEvent(EVENT_TYPES.PASS, 129, 6, 1, false, 90, 55), // +7
    createEvent(EVENT_TYPES.SAVE, 132, 7, 2, false, 100, 50), // 0 reset
    createEvent(EVENT_TYPES.PASS, 150, 2, 2, false, 46, 53), // +2
    createEvent(EVENT_TYPES.PASS, 156, 2, 2, false, 37, 14), // +4
    createEvent(EVENT_TYPES.PASS, 160, 2, 2, false, 20, 10), // +6
    createEvent(EVENT_TYPES.PASS, 162, 2, 2, false, 30, 25), // +8
    createEvent(EVENT_TYPES.GOAL, 164, 2, 2, false, 0, 60), // +10
    createEvent(EVENT_TYPES.KICK_OFF, 174, 10, 1, false, 50, 50), // 0 reset
    createEvent(EVENT_TYPES.PASS, 223, 1, 1, false, 35, 60), // 1
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 228, 7, 2, false, 20, 55), // -6
    createEvent(EVENT_TYPES.PASS, 231, 2, 2, false, 30, 70), // -8
    createEvent(EVENT_TYPES.GOAL, 233, 2, 2, false, 0, 40), // -10
    createEvent(EVENT_TYPES.NONE, 243, 10, 1, false, 50, 90), // 0 reset
    createEvent(EVENT_TYPES.PASS, 297, 3, 1, false, 90, 40), // +3
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 299, 2, 2, false, 20, 10), // 1
    createEvent(EVENT_TYPES.PASS, 302, 2, 2, false, 40, 70), // 3
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 305, 2, 1, false, 50, 30), // 1
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 306, 1, 1, false, 20, 10), // 2
    createEvent(EVENT_TYPES.PASS, 308, 1, 1, false, 80, 100), // 2
  ],
  duration: 314000, // 5:14
  matchStartTime: 1274000,
};

export const MATCH_DATA_2 = {
  duration: 319000, // 5:19
  matchStartTime: 1880000,
  events: [
    createEvent(EVENT_TYPES.PASS, 4, 2, 1, false, 30, 55), // +2
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 8, 2, 2, false, 80, 90), // 0
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 11, 2, 1, false, 60, 70), // +2
    createEvent(EVENT_TYPES.PASS, 16, 1, 1, false, 40, 45), // +3
    createEvent(EVENT_TYPES.PASS, 20, 1, 1, false, 50, 20), // +4
    createEvent(EVENT_TYPES.PASS, 25, 1, 1, false, 60, 30), // +5
    createEvent(EVENT_TYPES.PASS, 30, 3, 1, false, 90, 60), // +8
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 33, 4, 2, false, 80, 40), // +4
    createEvent(EVENT_TYPES.PASS, 37, 2, 2, false, 60, 70), // +2
    createEvent(EVENT_TYPES.PASS, 44, 1, 2, false, 55, 80), // 0
    createEvent(EVENT_TYPES.NONE, 48, 2, 2), // -2
    createEvent(EVENT_TYPES.CARD, 56, -2, 1, true, 55, 80), // -4
    createEvent(EVENT_TYPES.FREE_KICK, 72, 2, 2, false, 55, 80), // -6
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 78, 2, 1, false, 40, 50), // -4
    createEvent(EVENT_TYPES.PASS, 84, 2, 1, false, 55, 60), // -2
    createEvent(EVENT_TYPES.PASS, 86, 2, 1, false, 90, 55), // 0
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 91, 2, 2, false, 70, 30), // -2
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 97, 2, 1, false, 60, 70), // 0
    createEvent(EVENT_TYPES.PASS, 101, 1, 1, false, 45, 55), // +1
    createEvent(EVENT_TYPES.PASS, 104, 1, 1, false, 50, 20), // +2
    createEvent(EVENT_TYPES.PASS, 107, 1, 1, false, 60, 40), // +3
    createEvent(EVENT_TYPES.PASS, 110, 2, 1, false, 65, 50), // +5
    createEvent(EVENT_TYPES.PASS, 121, 2, 1, false, 70, 15), // +7
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 126, 5, 2, false, 80, 30), // +3
    createEvent(EVENT_TYPES.PASS, 131, 2, 2, false, 70, 20), // +1
    createEvent(EVENT_TYPES.PASS, 133, 4, 2, false, 75, 30), // -3
    createEvent(EVENT_TYPES.PASS, 139, 2, 2, false, 30, 70), // -5
    createEvent(EVENT_TYPES.NONE, 142, 1, 2), // -7
    createEvent(EVENT_TYPES.SHOT_ON_TARGET, 143, 2, 2, false, 0, 50), // -9
    createEvent(EVENT_TYPES.SAVE, 144, 4, 1, false, 0, 50), // -5
    createEvent(EVENT_TYPES.CORNER, 190, 2, 2, false, 0, 0), // -7
    createEvent(EVENT_TYPES.SHOT_ON_TARGET, 192, 2, 2, false, 0, 50), // -9
    createEvent(EVENT_TYPES.SAVE, 194, 6, 1, false, 0, 50), // -3
    createEvent(EVENT_TYPES.PASS, 198, 1, 1, false, 30, 40), // -2
    createEvent(EVENT_TYPES.PASS, 203, 2, 1, false, 50, 10), // 0
    createEvent(EVENT_TYPES.PASS, 208, 1, 1, false, 40, 20), // +1
    createEvent(EVENT_TYPES.PASS, 233, 1, 1, false, 55, 60), // +2
    createEvent(EVENT_TYPES.PASS, 235, 3, 1, false, 70, 40), // +5
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 238, 4, 2, false, 80, 50), // +1
    createEvent(EVENT_TYPES.PASS, 241, 1, 2, false, 65, 20), // 0
    createEvent(EVENT_TYPES.PASS, 243, 2, 2, false, 45, 60), // -2
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 258, 4, 1, false, 55, 70), // +2
    createEvent(EVENT_TYPES.PASS, 263, 1, 1, false, 40, 80), // +3
    createEvent(EVENT_TYPES.PASS, 274, 1, 1, false, 45, 30), // +4
    createEvent(EVENT_TYPES.PASS, 280, 1, 1, false, 70, 20), // +5
    createEvent(EVENT_TYPES.NONE, 282, 2, 2, false, 50, 80), // +3
    createEvent(EVENT_TYPES.PASS, 300, 2, 1, false, 65, 40), // +5
    createEvent(EVENT_TYPES.PASS, 310, 1, 1, false, 20, 30), // +6
    createEvent(EVENT_TYPES.PASS, 312, 1, 1, false, 40, 80), // +7
  ],
};

export const MATCH_DATA_3 = {
  duration: 310100, // 5:11
  matchStartTime: 1731000,
  events: [
    createEvent(EVENT_TYPES.PASS, 4, 1, 2), // -1
    createEvent(EVENT_TYPES.PASS, 10, 1, 2), // -2
    createEvent(EVENT_TYPES.PASS, 11, 1, 2), // -3
    createEvent(EVENT_TYPES.PASS, 16, 1, 2), // -4
    createEvent(EVENT_TYPES.PASS, 24, 0, 2), // -4
    createEvent(EVENT_TYPES.PASS, 28, 1, 2), // -5
    createEvent(EVENT_TYPES.PASS, 34, 0, 2), // -5
    createEvent(EVENT_TYPES.PASS, 37, 2, 2), // -7
    createEvent(EVENT_TYPES.SHOT_ON_TARGET, 38, 2, 2), // -9
    createEvent(EVENT_TYPES.SAVE, 39, 5, 1), // -4 // first corner kick after
    createEvent(EVENT_TYPES.CORNER, 71, 2, 2), // -6
    createEvent(EVENT_TYPES.SHOT, 72, 2, 2), // -8
    createEvent(EVENT_TYPES.SHOT_BLOCKED, 73, 2, 1), // -6
    createEvent(EVENT_TYPES.NONE, 75, 2, 2), // -8
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 78, 4, 1), // -4
    createEvent(EVENT_TYPES.NONE, 81, 1, 1), // -3
    createEvent(EVENT_TYPES.PASS, 87, 2, 1), // -1
    createEvent(EVENT_TYPES.PASS, 96, 1, 1), // 0
    createEvent(EVENT_TYPES.PASS, 107, 0, 1), // 0
    createEvent(EVENT_TYPES.PASS, 116, 2, 1), // +2
    createEvent(EVENT_TYPES.PASS, 118, 1, 1), // +3
    createEvent(EVENT_TYPES.PASS, 122, 2, 1), // +5
    createEvent(EVENT_TYPES.SHOT_ON_TARGET, 125, 2, 1), // +7
    createEvent(EVENT_TYPES.SAVE, 126, 3, 2), // +4

    createEvent(EVENT_TYPES.CORNER, 156, 2, 1), // +6
    createEvent(EVENT_TYPES.SHOT_OFF_TARGET, 157, 1, 1), // +7
    createEvent(EVENT_TYPES.NONE, 160, 4, 2), // +3
    createEvent(EVENT_TYPES.PASS, 188, 2, 2), // +1
    createEvent(EVENT_TYPES.PASS, 193, 1, 2), // 0
    createEvent(EVENT_TYPES.PASS, 204, 2, 2), // -2
    createEvent(EVENT_TYPES.PASS, 211, 1, 2), // -3
    createEvent(EVENT_TYPES.PASS, 217, 0, 2),
    createEvent(EVENT_TYPES.PASS, 224, 1, 2), // -4
    createEvent(EVENT_TYPES.PASS, 231, 1, 2), // -5
    createEvent(EVENT_TYPES.PASS, 238, 2, 2), // -7
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 242, 4, 1), // -3
    createEvent(EVENT_TYPES.PASS, 248, 1, 1), // -2

    createEvent(EVENT_TYPES.PASS, 254, 2, 1), // -2
    createEvent(EVENT_TYPES.OUT, 256, 1, 1), // -1
    createEvent(EVENT_TYPES.THROW_IN, 271, 1, 1), // 0
    createEvent(EVENT_TYPES.PASS, 274, 3, 2), // -3
    createEvent(EVENT_TYPES.PASS, 280, 1, 2), // -4
    createEvent(EVENT_TYPES.PASS, 287, 1, 2), // -5
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 294, 3, 1), // -2
    createEvent(EVENT_TYPES.PASS, 297, 1, 1), // +1
    createEvent(EVENT_TYPES.PASS, 301, 3, 1), // +4
    createEvent(EVENT_TYPES.PASS, 303, 3, 1), // +7
    createEvent(EVENT_TYPES.SHOT_OFF_TARGET, 305, 1, 1), // +8
    createEvent(EVENT_TYPES.NONE, 308, 5, 2), // +3
  ],
};

export const MATCH_DATA_4 = {
  duration: 260000, // 4:20
  matchStartTime: 374000, // 6:14
  events: [
    createEvent(EVENT_TYPES.PASS, 7, 1, 2),
    createEvent(EVENT_TYPES.PASS, 10, 1, 2),
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 13, 2, 1), // 0
    createEvent(EVENT_TYPES.PASS, 17, 2, 1), // -2
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 20, 2, 2), // 0
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 29, 2, 1), // +2
    createEvent(EVENT_TYPES.PASS, 34, 1, 1), // +3
    createEvent(EVENT_TYPES.PASS, 38, 1, 1), // +4
    createEvent(EVENT_TYPES.PASS, 41, 1, 1), // +5
    createEvent(EVENT_TYPES.PASS, 44, 1, 1), // +6
    createEvent(EVENT_TYPES.TACKLE, 46, 3, 2), // +3
    createEvent(EVENT_TYPES.NONE, 55, 3, 1), // +6

    createEvent(EVENT_TYPES.FREE_KICK, 108, 1, 1), // +7
    createEvent(EVENT_TYPES.OFFSIDE, 110, -4, 1, true), // +3
    createEvent(EVENT_TYPES.NONE, 120, 3, 2), // 0
    createEvent(EVENT_TYPES.FREE_KICK, 126, 3, 2), // -3
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 134, 1, 1), // -2
    createEvent(EVENT_TYPES.THROW_IN, 149, 2, 2), // -4
    createEvent(EVENT_TYPES.TACKLE, 151, 2, 1), // -2
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 158, 1, 2), // -3
    createEvent(EVENT_TYPES.PASS, 162, 1, 2), // -4
    createEvent(EVENT_TYPES.PASS, 183, 1, 2),

    createEvent(EVENT_TYPES.OUT, 194, 5, 1), // 0
    createEvent(EVENT_TYPES.PASS, 204, 1, 1), // +1
    createEvent(EVENT_TYPES.PASS, 212, 2, 1), // +3
    createEvent(EVENT_TYPES.FREE_KICK, 225, 1, 1),
    createEvent(EVENT_TYPES.PASS, 227, 1, 1),
    createEvent(EVENT_TYPES.PASS, 240, 1, 1),
    createEvent(EVENT_TYPES.NONE, 252, 1, 1),
  ],
};

export const MATCH_DATA_5 = {
  duration: 326000, // 5:26
  matchStartTime: 4647000, // 77:27
  events: [
    createEvent(EVENT_TYPES.NONE, 3, 1, 1),
    createEvent(EVENT_TYPES.PASS, 5, 1, 1),
    createEvent(EVENT_TYPES.SAVE, 12, 2, 2),
    createEvent(EVENT_TYPES.NONE, 30, 1, 2),
    createEvent(EVENT_TYPES.NONE, 36, 1, 2),
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 40, 2, 1),
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 44, 2, 2), // -2
    createEvent(EVENT_TYPES.PASS, 48, 0, 2),
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 56, 2, 1), // 0

    createEvent(EVENT_TYPES.FREE_KICK, 78, 2, 1),
    createEvent(EVENT_TYPES.PASS, 81, 1, 1),
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 83, 2, 2),
    createEvent(EVENT_TYPES.PASS, 88, 2, 2),
    createEvent(EVENT_TYPES.PASS, 90, 1, 2),
    createEvent(EVENT_TYPES.TACKLE, 91, 2, 1), // 0
    createEvent(EVENT_TYPES.PASS, 94, 2, 1),
    createEvent(EVENT_TYPES.PASS, 100, 2, 1),
    createEvent(EVENT_TYPES.PASS, 102, 3, 1),
    createEvent(EVENT_TYPES.SHOT, 103, 1, 1),
    createEvent(EVENT_TYPES.SHOT_OFF_TARGET, 104, -3, 1, true),
    createEvent(EVENT_TYPES.NONE, 110, 5, 2), // 0

    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 138, 2, 2), // -2
    createEvent(EVENT_TYPES.PASS, 141, 3, 2), // -5
    createEvent(EVENT_TYPES.TACKLE, 146, 3, 1), // -2
    createEvent(EVENT_TYPES.PASS, 148, 2, 1), // 0
    createEvent(EVENT_TYPES.PASS, 150, 1, 1), // +1
    createEvent(EVENT_TYPES.PASS, 155, 2, 1), // +3
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 157, 3, 2), // 0
    createEvent(EVENT_TYPES.NONE, 160, 2, 2), // -2
    createEvent(EVENT_TYPES.PASS, 164, 3, 2), // -5
    createEvent(EVENT_TYPES.NONE, 164, 2, 2), // -7
    createEvent(EVENT_TYPES.GOAL, 167, 5, 2), // -12 ?
    createEvent(EVENT_TYPES.NONE, 180, 10, 1), // ?! 0 visually

    createEvent(EVENT_TYPES.NONE, 252, 3, 1),
    createEvent(EVENT_TYPES.PASS, 259, 1, 1),
    createEvent(EVENT_TYPES.SHOT_OFF_TARGET, 261, 1, 1),
    createEvent(EVENT_TYPES.NONE, 265, 5, 2),
    createEvent(EVENT_TYPES.NONE, 293, 3, 2),
    createEvent(EVENT_TYPES.PASS_INTERCEPTION, 296, 3, 1),
    createEvent(EVENT_TYPES.THROW_IN, 318, 1, 1),
  ],
};

const matches = {
  1: MATCH_DATA_1,
  2: MATCH_DATA_2,
  3: MATCH_DATA_3,
  4: MATCH_DATA_4,
  5: MATCH_DATA_5,
};
