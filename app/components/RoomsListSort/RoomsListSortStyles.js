import styled from 'styled-components';
import { flex, fontSize, space, hexToRgb, color } from 'styles-constants';

export const RoomsListSortWrapper = styled.div`
  ${flex(null, 'center')};
  padding: 0 10px;
  > div {
    &:nth-child(2) {
      padding-left: ${space()};
    }
  }
`;

export const Label = styled.div`
  font-size: ${fontSize.body};
  color: rgba(${hexToRgb(color.mainFontColor)}, 0.8);
`;

export const IconWrapper = styled.div`
  position: relative;
  top: -1px;
  padding-left: 9px;
  opacity: ${({ active }) => active ? '1' : '0.6'};
  > div {
    cursor: pointer;
  }
  svg {
    width: 34px;
    fill: #ffffff;
  }
  ${({ bordered }) => bordered && `
    &:before {
      content: '';
      position: absolute;
      top: 60%;
      transform: translateY(-50%);
      left: 2px;
      width: 1px;
      height: 70%;
      background: rgba(${hexToRgb('#000000')}, 0.4);
    }
  `};
`;
