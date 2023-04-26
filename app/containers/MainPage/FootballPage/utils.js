export function calc(bets) {
  const playersA = {};
  const playersB = {};
  let total = 0;
  let yourBets = 0;
  let yourWinning = 0;
  let betsA = 0;
  let betsB = 0;
  let wonBetsA = 0;
  let wonBetsB = 0;
  bets.forEach((b) => {
    const name = b.name;
    if (b.team === 1) {
      playersA[name] = true;
      betsA += 1;
      wonBetsA += b.result === 'Win' ? 1 : 0;
    } else if (b.team === 2) {
      playersB[name] = true;
      betsB += 1;
      wonBetsB += b.result === 'Win' ? 1 : 0;
    }
    total += b.bet;
    if (b.user) {
      yourBets += b.bet;
      yourWinning = b.result === 'Win' ? yourWinning + b.bet : yourWinning - b.bet;
    }
});
  const totalPlayersA = Object.keys(playersA).length;
  const totalPlayersB = Object.keys(playersB).length;
  return {
    total,
    yourBets,
    yourWinning,
    totalPlayersA,
    totalPlayersB,
    betsA,
    betsB,
    wonBetsA,
    wonBetsB,
  };
}