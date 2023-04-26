function createEvent(name, bet, timeFromBeginning, result, team, deadline) {
  return {
    name,
    avatar: './assets/neymar.png',
    bet,
    result,
    id: Math.random().toString(36).substr(3, 8),
    team,
    timestamp: timeFromBeginning * 1000,
    deadline: {
      timestamp: (timeFromBeginning + deadline) * 1000,
    },
  };
}

function createMessage(username, timestamp, message) {
  return {
    username,
    id: Math.random().toString(36).substr(1, 10),
    timestamp: timestamp * 1000,
    message,
    avatar: './assets/neymar.png',
  };
}

export const messagesList1 = {
  messages: [
    createMessage('Jack Nicholson', 12, 'I\'m going to win.'),
    createMessage('Michael Caine', 14, 'Ole!'),
    createMessage('Dustin Hoffman', 20, 'Brazyl forward!'),
    createMessage('Marlon Brando', 30, 'Bets are made.'),
    createMessage('Tom Hanks', 40, 'There are no more bets.'),
    createMessage('Robert De Niro', 50, 'Where is the goal?'),
    createMessage('Robin Williams', 55, 'The stands are in ecstasy!'),
    createMessage('Daniel Day-Lewis', 63, 'Judge for soap!'),
    createMessage('Dustin Hoffman', 130, 'Call Solo.'),
    createMessage('Tom Hanks', 145, 'cuttlefish...'),
    createMessage('Marlon Brando', 155, 'Jesus is their judge'),
    createMessage('Michael Caine', 228, 'We won!'),
  ],
  id: 1,
};

export const messagesList2 = {
  messages: [
    createMessage('Jack Nicholson', 12, 'I\'m feeling lucky!'),
    createMessage('Tom Hanks', 21, 'fortune is on my side!'),
    createMessage('Dustin Hoffman', 35, 'success is my middle name!'),
    createMessage('Robert De Niro', 51, 'I\'m going to win.'),
    createMessage('Robin Williams', 60, 'who will score the second goal?'),
    createMessage('Daniel Day-Lewis', 75, 'Hello!'),
    createMessage('Spencer Tracy', 85, 'Judge for soap!'),
    createMessage('Tom Hanks', 100, 'Jesus is their judge'),
    createMessage('Marlon Brando', 120, 'Bets are made.'),
    createMessage('Robert De Niro', 190, 'it\'s fun'),
    createMessage('Daniel Day-Lewis', 196, 'We won!'),
    createMessage('Michael Caine', 200, 'Where is the goal'),
    createMessage('Jack Nicholson', 222, 'Go go go'),
    createMessage('Tom Hanks', 250, 'Last chance'),
  ],
  id: 2,
};

export const messagesList3 = {
  messages: [
    createMessage('Jack Nicholson', 10, 'I have a good feeling!'),
    createMessage('Michael Caine', 21, 'No cause for concern'),
    createMessage('Tom Hanks', 35, 'My mom plays better!'),
    createMessage('Marlon Brando', 68, 'Bets are made'),
    createMessage('Robert De Niro', 85, 'who will score the second goal?'),
    createMessage('Marlon Brando', 96, 'Hello!'),
    createMessage('Robin Williams', 115, 'Judge for soap!'),
    createMessage('Daniel Day-Lewis', 190, 'cuttlefish...'),
    createMessage('Dustin Hoffman', 210, 'I\'m going to win.'),
    createMessage('Spencer Tracy', 225, 'it\'s fun'),
    createMessage('Jack Nicholson', 250, 'We won!'),
    createMessage('Michael Caine', 270, 'Where is the goal'),
  ],
  id: 3,
};

export const messagesList4 = {
  messages: [
    createMessage('Tom Hanks', 10, 'I have a good feeling!'),
    createMessage('Robert De Niro', 21, 'No cause for concern'),
    createMessage('Michael Caine', 115, 'Judge for soap!'),
    createMessage('Robin Williams', 131, 'My mom plays better!'),
    createMessage('Daniel Day-Lewis', 150, 'Bets are made'),
    createMessage('Spencer Tracy', 167, 'who will score the second goal?'),
    createMessage('Dustin Hoffman', 190, 'cuttlefish...'),
    createMessage('Marlon Brando', 210, 'I\'m going to win.'),
    createMessage('Jack Nicholson', 220, 'Hello!'),
    createMessage('Spencer Tracy', 225, 'it\'s fun'),
    createMessage('Robert De Niro', 250, 'We won!'),
    createMessage('Michael Caine', 270, 'Where is the goal'),
  ],
  id: 4,
};

export const messagesList5 = {
  messages: [
    createMessage('Tom Hanks', 10, 'I have a good feeling!'),
    createMessage('Robert De Niro', 21, 'No cause for concern'),
    createMessage('Michael Caine', 115, 'Judge for soap!'),
    createMessage('Robin Williams', 131, 'Hello!'),
    createMessage('Daniel Day-Lewis', 150, 'Bets are made'),
    createMessage('Spencer Tracy', 167, 'who will score the second goal?'),
    createMessage('Dustin Hoffman', 190, 'cuttlefish...'),
    createMessage('Marlon Brando', 210, 'I\'m going to win.'),
    createMessage('Jack Nicholson', 220, 'Hello!'),
    createMessage('Spencer Tracy', 225, 'it\'s fun'),
    createMessage('Robert De Niro', 250, 'We won!'),
    createMessage('Michael Caine', 270, 'Where is the goal'),
  ],
  id: 5,
};

export const botBetsDataMatch1 = [
  createEvent('Jack Nicholson', 220, 12, 'Win', 1, 10),
  createEvent('Michael Caine', 50, 14, 'Win', 2, 20),
  createEvent('Dustin Hoffman', 75, 19, 'Lose', 1, 20),
  createEvent('Marlon Brando', 50, 30, 'Win', 1, 10),
  createEvent('Tom Hanks', 80, 37, 'Win', 2, 10),
  createEvent('Robert De Niro', 190, 46, 'Win', 2, 15),
  createEvent('Robin Williams', 70, 55, 'Lose', 2, 15),
  createEvent('Daniel Day-Lewis', 200, 62, 'Win', 1, 20),
  createEvent('Dustin Hoffman', 70, 130, 'Lose', 1, 15),
  createEvent('Tom Hanks', 140, 145, 'Win', 2, 10),
  createEvent('Marlon Brando', 160, 155, 'Win', 1, 60),
  createEvent('Michael Caine', 30, 226, 'Win', 1, 30),
];

export const botBetsDataMatch2 = [
  createEvent('Jack Nicholson', 120, 12, 'Lose', 2, 5),
  createEvent('Tom Hanks', 180, 20, 'Win', 1, 10),
  createEvent('Dustin Hoffman', 150, 30, 'Win', 2, 10),
  createEvent('Robert De Niro', 80, 46, 'Lose', 1, 15),
  createEvent('Robin Williams', 130, 55, 'Win', 2, 15),
  createEvent('Daniel Day-Lewis', 200, 68, 'Win', 1, 20),
  createEvent('Spencer Tracy', 50, 85, 'Lose', 1, 20),
  createEvent('Tom Hanks', 50, 100, 'Win', 1, 10),
  createEvent('Marlon Brando', 130, 110, 'Win', 2, 30),
  createEvent('Robert De Niro', 100, 190, 'Win', 2, 15),
  createEvent('Daniel Day-Lewis', 130, 195, 'Lose', 2, 60),
  createEvent('Michael Caine', 50, 200, 'Lose', 1, 60),
  createEvent('Jack Nicholson', 80, 220, 'Win', 1, 15),
  createEvent('Tom Hanks', 20, 250, 'Lose', 2, 30),
];

export const botBetsDataMatch3 = [
  createEvent('Jack Nicholson', 100, 10, 'Win', 2, 5),
  createEvent('Michael Caine', 180, 20, 'Lose', 1, 10),
  createEvent('Tom Hanks', 80, 37, 'Win', 1, 10),
  createEvent('Marlon Brando', 110, 70, 'Lose', 2, 10),
  createEvent('Robert De Niro', 120, 85, 'Win', 1, 15),
  createEvent('Marlon Brando', 20, 95, 'Lose', 2, 30),
  createEvent('Robin Williams', 130, 115, 'Win', 1, 15),
  createEvent('Daniel Day-Lewis', 200, 190, 'Lose', 1, 20),
  createEvent('Dustin Hoffman', 50, 210, 'Win', 2, 20),
  createEvent('Spencer Tracy', 100, 225, 'Win', 1, 20),
  createEvent('Sean Penn', 130, 250, 'Lose', 2, 60),
  createEvent('Michael Caine', 50, 270, 'Lose', 1, 60),
];

export const botBetsDataMatch4 = [
  createEvent('Tom Hanks', 100, 10, 'Lose', 2, 5),
  createEvent('Robert De Niro', 180, 20, 'Win', 1, 15),
  createEvent('Michael Caine', 130, 115, 'Win', 2, 15),
  createEvent('Robin Williams', 40, 131, 'Win', 1, 10),
  createEvent('Daniel Day-Lewis', 110, 150, 'Win', 2, 10),
  createEvent('Spencer Tracy', 60, 167, 'Lose', 1, 15),
  createEvent('Dustin Hoffman', 200, 190, 'Win', 1, 20),
  createEvent('Marlon Brando', 50, 210, 'Win', 1, 20),
  createEvent('Jack Nicholson', 20, 220, 'Lose', 2, 30),
  createEvent('Spencer Tracy', 100, 225, 'Win', 1, 20),
  createEvent('Robert De Niro', 130, 250, 'Lose', 2, 10),
  createEvent('Michael Caine', 50, 270, 'Lose', 1, 10),
];

export const botBetsDataMatch5 = [
  createEvent('Tom Hanks', 100, 10, 'Lose', 2, 5),
  createEvent('Robert De Niro', 180, 20, 'Win', 1, 15),
  createEvent('Michael Caine', 130, 115, 'Win', 2, 15),
  createEvent('Robin Williams', 40, 131, 'Win', 1, 10),
  createEvent('Daniel Day-Lewis', 110, 150, 'Win', 2, 10),
  createEvent('Spencer Tracy', 60, 167, 'Lose', 1, 15),
  createEvent('Dustin Hoffman', 200, 190, 'Win', 1, 20),
  createEvent('Marlon Brando', 50, 210, 'Win', 1, 20),
  createEvent('Jack Nicholson', 20, 220, 'Lose', 2, 30),
  createEvent('Spencer Tracy', 100, 225, 'Win', 1, 20),
  createEvent('Robert De Niro', 130, 250, 'Lose', 2, 10),
  createEvent('Michael Caine', 50, 270, 'Lose', 1, 10),
];
