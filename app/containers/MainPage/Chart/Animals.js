import styled, { keyframes } from 'styled-components';

const BearImg = '/img/bear-animation.png';
const BullImg = '/img/bull-animation.png';

const walkingBear = keyframes`{ from { background-position: 0 0; } to { background-position: -8880px 0; } }`;
const walkingBull = keyframes`{ from { background-position: 0 0; } to { background-position: -7440px 0; } }`;

export const Bear = styled.div`
  transform: ${(p) => `scale(${p.scale});`};
  right: -50px;
  width: 240px;
  height: 178px;
  position: absolute;
  top: ${(p) => p.scale >= 0.5 ? -50 : -60}px;
  opacity: ${(p) => p.opacity};
  transition: all 300ms ease-out;
  background-image: url(${BearImg});
  animation: ${walkingBear} 1s infinite steps(37);
`;

export const Bull = styled.div`
  transform: ${(p) => `scale(${p.scale});`};
  right: -50px;
  width: 240px;
  height: 178px;
  position: absolute;
  top: ${(p) => p.scale >= 0.5 ? -120 : -110}px;
  transition: all 300ms ease-out;
  opacity: ${(p) => p.opacity};
  background-image: url(${BullImg});
  animation: ${walkingBull} 0.75s steps(31) infinite;
`;
