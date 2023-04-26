import styled from 'styled-components';
import { fontFamily, fontSize, fontWeight, space, flex } from 'styles-constants';

export const AsideTitle = styled.h2`
  display: inline-flex;
  font-size: ${fontSize.displaySmall};
  font-weight: ${fontWeight.regular};
  font-family: ${fontFamily.heading};
  margin: 0;
  margin: 32px 0 ${space(2)} 0;
  > span {
    padding-left: 14px;
  }
`;

export const AsideHeader = styled.div`
  text-transform: none;
  padding-left: 7px;
  padding-right: 10px;
`;

export const HeaderIcon = styled.div`
  ${flex('center', 'center')};
  > div {
    display: flex;
  }
  svg {
    width: 16px;  
    height: 16px;
    fill: #ffffff;
  }
`;

export const SearchInputWrapper = styled.div`
  overflow: hidden;
`;
