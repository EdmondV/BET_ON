
function progress(expiredAt, createdAt, currentTime) {
  if (!expiredAt || currentTime > expiredAt) return 1;
  return 1 - ((expiredAt - currentTime) / (expiredAt - createdAt));
}

/**
 * return true if there is less than 15s to deadline
 * @param remainingTime {number} seconds left to deadline
 * @return {boolean}
 */
function isDeadline(remainingTime) {
  return remainingTime < 15;
}

export {
  progress,
  isDeadline,
};
