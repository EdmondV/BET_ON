import { ROOM_GAME_STATUS, ROOM_PROCESS_STATUS, ROOM_STATUS } from '../constants/room';

/**
 * Public method for for front needs
 * @param roomStatus
 */
export const getRoomStatus = ({ roomStatus }) => roomStatus;

/**
 * Checks for nobody joined
 * @param roomStatus
 */
export const nobodyJoined = ({ roomStatus }) => roomStatus === ROOM_PROCESS_STATUS.CANCELLED_NOBODY;

export const isDraw = ({ roomStatus }) => roomStatus === ROOM_PROCESS_STATUS.FINISHED_DRAW;

export const isDrawOrNobody = ({ roomStatus }) => roomStatus === ROOM_PROCESS_STATUS.FINISHED_DRAW || roomStatus === ROOM_PROCESS_STATUS.CANCELLED_NOBODY;

/**
 * Includes check for "nobody" AND "forbidden" condition
 * @param roomStatus
 */
export const roomCancelled = ({ roomStatus }) => roomStatus === ROOM_PROCESS_STATUS.FORBIDDEN_NOT_PARTICIPATED || roomStatus === ROOM_PROCESS_STATUS.CANCELLED_NOBODY;

/**
 * Return true if room wasn't cancelled and is still playing
 * @param roomStatus
 */
export const roomIsActive = ({ roomStatus }) => roomStatus.type === 'ACTIVE';

/**
 * Used for preloaders (also is a fallback if smth goes wrong with assets or time)
 * @param roomStatus
 */
export const roomIsProcessing = ({ roomStatus }) => roomStatus === ROOM_PROCESS_STATUS.LOADING;

/**
 * Detects user participation in selected room
 * @param roomStatus
 */
export const canViewResult = ({ roomStatus }) => roomStatus !== ROOM_PROCESS_STATUS.FORBIDDEN_NOT_PARTICIPATED;

/**
 * True - in period between expiration and deadline (all rooms, even not participated)
 * @param room
 * @param time
 */
export const betsAreOff = (room, time) => room.status === ROOM_STATUS.ACTIVE && room.deadlineAt <= time;

/**
 * Used for active (not cancelled) room
 * @param roomStatus
 * @return {number} team ENUM number
 */
export const winningTeam = ({ roomStatus }) => {
  if (roomStatus.type === 'ACTIVE' && roomStatus.game === 'TEAM1_WIN') {
    return 1;
  } else if (roomStatus.type === 'ACTIVE' && roomStatus.game === 'TEAM2_WIN') {
    return 2;
  }
  return 0;
};

/**
 * Team string string for some front needs
 * @param gameStatus
 */
// FIXME: always returns bears on any other result
// history rooms aren't processed as others to set status from "roomStatus"
export const teamWon = ({ gameStatus }) => gameStatus === ROOM_GAME_STATUS.BULLS_WIN ? 'bull' : 'bear';
