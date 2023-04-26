import styled from 'styled-components';
import {
  hexToRgb,
  color,
  fontFamily,
  fontWeight,
  fontSize,
} from 'styles-constants';
import { transition } from 'animation-constants';

export const Footer = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid rgba(${hexToRgb(color.mainFontColor)}, 0.2);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 95px;
`;

export const Copyright = styled.div`
  width: 100%;
  font-size: ${fontSize.small};
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-weight: ${fontWeight.light};
  border-top: 1px solid rgba(${hexToRgb(color.mainFontColor)}, 0.2);
  color: rgba(${hexToRgb(color.mainFontColor)}, 0.4);
  align-items: center;
  font-family: ${fontFamily.heading};
  position: relative;
   
  .version {
    color: rgba(${hexToRgb(color.mainFontColor)}, 0.3);
    user-select: auto;
    font-size: 9px;
    margin-left: 5px;
  }
`;

export const FooterMenu = styled.div`
  width: 812px;
  display: inline-flex;
  justify-content: space-between;
  > a {
    cursor: pointer;
    font-size: ${fontSize.body};
    font-weight: ${fontWeight.normal};
    transition: ${transition('defaultEmptyEffect')};
    font-family: ${fontFamily.heading};
    color: rgba(${hexToRgb(color.mainFontColor)}, 0.6);
    line-height: 64px; 
    display: inline-flex;
    height: 64px;
    padding: 0 5px;
    border-bottom: 2px solid transparent;
    &:hover {
      color: ${color.mainFontColor};
      border-bottom: 2px solid ${color.newSuccess};
    }
  }
`;
