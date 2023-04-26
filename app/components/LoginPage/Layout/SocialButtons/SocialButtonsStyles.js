import styled from 'styled-components';
import {
  buttonAnimation,
  fontWeight,
  fontFamily,
  fontSize,
  letterSpacing,
  color,
} from 'styles-constants';

const buttonWidth = 110;

export const ButtonsWrapper = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  margin-top: 20px;
  position: relative;
  margin-bottom: 15px;
`;

export const FacebookBtn = styled.div`
  width: ${buttonWidth}px;
  height: 40px;
  text-transform: uppercase;
  text-align: center;
  line-height: 40px;
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.semibold};
  background: #1d3065;
  color: #ffffff;
  opacity: 0.6;
  border-radius: 20px;
  cursor: pointer;
  font-family: ${fontFamily.heading};
  letter-spacing: ${letterSpacing.large};
  ${buttonAnimation}
  &:hover {
    opacity: 1;
  }
`;

export const GoogleBtn = styled.div`
  width: ${buttonWidth}px;
  height: 40px;
  text-transform: uppercase;
  text-align: center;
  line-height: 40px;
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.semibold};
  background: #6B2E3D;
  color: ${color.mainFontColor};
  opacity: 0.6;
  border-radius: 20px;
  cursor: pointer;
  font-family: ${fontFamily.heading};
  letter-spacing: ${letterSpacing.large};
  ${buttonAnimation}
  &:hover {
    opacity: 1;
  }
`;

export const ErrorNotice = styled.div`
  color: red;
  position: absolute;
  top: 110%;
  width: 200px;
  left: 50%;
  margin-left: -100px;
  font-size: ${fontSize.extraSmall};
`;
