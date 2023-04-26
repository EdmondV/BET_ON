import styled from 'styled-components';
import {
  color,
  hexToRgb,
  fontWeight,
  fontFamily,
  fontSize,
  flex,
} from 'styles-constants';
import { transition } from 'animation-constants';

const ToggleWrapperWidth = 300;

export const TogglerLink = styled.div`
  display: block;
  width: 50%;
  text-align: center;
  font-size: ${fontSize.heading};
  font-weight: ${fontWeight.regular};
  line-height: 36px;
  cursor: pointer;
  color: #fff;
  font-family: ${fontFamily.heading};
  transition: opacity 200ms;
  opacity: ${(props) => props.active ? '1' : '0.6'};
  margin-top: 14px;
  &:hover {
    text-decoration: none;
    opacity: 1;
    color: ${color.mainFontColor};
  }
`;

export const ToggleWrapper = styled.div`
  ${flex('space-between')};
  width: ${ToggleWrapperWidth}px;
  border-bottom: 1px solid rgba(${hexToRgb(color.mainFontColor)}, 0.6);
  position: relative;
  margin-bottom: 30px;
  &:before {
    content: '';
    display: ${(props) => props.active !== false ? 'block' : 'none'};
    position: absolute;
    bottom: -1px;
    right: auto;
    left: auto;
    width: 50%;
    height: 3px;
    background: ${color.newSuccess};
    transition: ${transition()};
    transform: ${({ form }) => form === 'login' ? 'translateX(0)' : 'translateX(100%)'};
  }
`;
