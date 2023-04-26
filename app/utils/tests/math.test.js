import { round } from '../math';

describe('Math utils', () => {
  describe('round', () => {
    it('should removed all digits after limie', () => {
      expect(round(0.000051231231, 5)).toBe('0.00005');
    });

    it('add zeros if digits are not enough', () => {
      expect(round(0.01, 5)).toBe('0.01000');
    });
  });
});
