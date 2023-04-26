import { object } from 'prop-types';
import { roomIsActive } from '../../utils/rooms';

export const deadlineSound = (room) => {
  const { timeLeftDeadline, timeLeftExpiredAt } = room;
  if (timeLeftDeadline !== undefined && timeLeftExpiredAt !== undefined) {
    return ((timeLeftDeadline <= 3000 && timeLeftDeadline > 0) || (timeLeftExpiredAt <= 3000 && timeLeftExpiredAt > 0) && roomIsActive(room));
  }
  return false;
};

deadlineSound.propTypes = {
  room: object,
};
