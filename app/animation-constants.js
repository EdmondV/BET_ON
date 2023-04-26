import { keyframes } from 'styled-components';

const transitions = {
  default: '0.3s ease-out',
  defaultEmptyEffect: '0.3s',
  defaultTransitionTime: '0.3s',
};

function transition(subject = 'all', type = 'default') {
  if (!transitions[type]) return `all ${transitions.default}`;
  return `${subject} ${transitions[type]}`;
}

const fadeIn = keyframes`{0% {opacity: 0;} 50% {opacity: 0.5;} 100% {opacity: 1;}}`;

export {
  transitions,
  transition,
  fadeIn,
};
