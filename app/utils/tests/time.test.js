/**
 * Test the time lib
 */
import moment from 'moment';
import { countdown, pad, getFormattedTime, normalDate } from '../time';

describe('time', () => {
  describe('pad', () => {
    it('should add trailing zero if number less then 10', () => {
      expect(pad(0)).toBe('00');
      expect(pad(9)).toBe('09');
    });
    it('should not add traling zero if number less then 10', () => {
      expect(pad(10)).toBe('10');
      expect(pad(100)).toBe('100');
    });
  });

  describe('countdown', () => {
    it('should be empty if date is in past', () => {
      const d = new Date() - 1000;
      expect(countdown(d)).toBe('');
    });

    it('should be empty if date is not a number', () => {
      expect(countdown(undefined)).toBe('');
      expect(countdown(null)).toBe('');
      expect(countdown(NaN)).toBe('');
    });

    it('should 00:01:00 if remians a minute', () => {
      const d = Date.now() + 60000;
      expect(countdown(d)).toBe('00:01:01');
    });

    it('should 00:01:00 if remians 59 seconds', () => {
      const d = Date.now() + 59000;
      expect(countdown(d)).toBe('00:01:00');
    });
  });

  describe('getFormattedTime', () => {
    it('should return "D" format', () => {
      expect(getFormattedTime(new Date(), 'D')).toBe(moment().format('D'));
      expect(getFormattedTime(moment('01-01-2000').toDate(), 'D')).toBe('1');
    });

    it('should return "MMM D" format', () => {
      expect(getFormattedTime(new Date(), 'MMM D')).toBe(moment().format('MMM D'));
      expect(getFormattedTime(moment('01-01-2000').toDate(), 'MMM D')).toBe('Jan 1');
    });

    it('should return "MMM D, HH:mm" format', () => {
      expect(getFormattedTime(new Date(), 'MMM D, HH:mm')).toBe(moment().format('MMM D, HH:mm'));
      expect(getFormattedTime(moment('01-01-2000 01:02:03').toDate(), 'MMM D, HH:mm')).toBe('Jan 1, 01:02');
    });

    it('should return "HH:mm: format', () => {
      expect(getFormattedTime(new Date(), 'HH:mm')).toBe(moment().format('HH:mm'));
      expect(getFormattedTime(moment('01-01-2000 01:02:03').toDate(), 'HH:mm')).toBe('01:02');
    });

    it('should return "HH:mm:ss" format', () => {
      expect(getFormattedTime(new Date(), 'HH:mm:ss')).toBe(moment().format('HH:mm:ss'));
      expect(getFormattedTime(moment('01-01-2000 01:02:03').toDate(), 'HH:mm:ss')).toBe('01:02:03');
    });

    it('should return "HUMAN_DATE" format', () => {
      it('should return today', () => {
        expect(normalDate(new Date())).toBe('Today');
      });
      it('should return formatted date', () => {
        expect(normalDate(moment('01-01-2000').toDate())).toBe('Jan/01');
      });
      it('should coerce numbers', () => {
        expect(normalDate(3600 * 24 * 1000)).toBe('Jan/02');
      });
    });

    it('should return "HUMAN_TIME" format', () => {
      it('should return today', () => {
        expect(normalDate(new Date())).toBe('Today');
      });
      it('should return formatted date', () => {
        expect(normalDate(moment('01-01-2000').toDate())).toBe('Jan/01');
      });
      it('should coerce numbers', () => {
        expect(normalDate(3600 * 24 * 1000)).toBe('Jan/02');
      });
    });
  });
});
