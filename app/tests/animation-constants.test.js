import { transitions, transition } from '../animation-constants';

describe('transitions', () => {
  it('contains transion defaults', () => {
    expect(transitions).toEqual({
      default: '0.3s ease-out',
      defaultEmptyEffect: '0.3s',
      defaultTransitionTime: '0.3s',
    });
  });
});

describe('transition', () => {
  it('creates transition', () => {
    expect(transition()).toEqual(`all ${transitions.default}`);
  });
});
