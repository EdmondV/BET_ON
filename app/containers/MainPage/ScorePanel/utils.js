export function calc(bets) {
  let total = 0;
  let teamA = 0;
  let teamB = 0;
  bets.forEach((b) => {
    total += b.bet;
    teamA += b.team === 1 ? b.bet : 0;
    teamB += b.team === 2 ? b.bet : 0;
  });
  let f = Math.ceil(100 / (total / teamA));
  let s = 100 - f;
  if (!f && !s) {
    f = 50;
    s = 50;
  }
  return { total, teamA, teamB, f, s };
}
