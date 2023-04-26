import styled from 'styled-components';
import { color } from '../../../../styles-constants';

export const MainWidgetWrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 45px;
  left: 50px;
  width: ${({ width }) => width - 100 + 'px'};
  height: ${({ isShow, height }) => isShow ? height - 100 + 'px' : '0px'};
  opacity: ${({ isShow }) => isShow ? 0.7 : 0};
  transition: height 300ms, opacity 300ms;
  z-index: 3;
  justify-content: center;
`;
export const WidgetWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  justify-content: center;
  display: flex;
`;
export const Slider = styled.div`
  z-index: 2000;
  position: absolute;
  bottom: -15px;
  border-radius: 5px;
  width: 360px;
  height: 16px;
  padding: 6px 0;
  :before {
    content: '';
    background: ${color.primaryDarked};
    height: 4px;
    width: 100%;
    position: absolute;
    border-radius: 10px;
  }
  :hover {
    .thumb {
      opacity: 1;
      height: 6px;
      top: -1px;
    }
  }
`;
export const Thumb = styled.div`
  width: 120px;
  height: 4px;
  border-radius: 3px;
  position: relative;
  left: 0;
  top: 0;
  background: ${color.activeColor};
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 200ms, height 300ms, top 300ms;
  :active {
    opacity: 1;
    height: 6px;
    top: -1px;
  }
  :hover {
    opacity: 1;
    height: 6px;
    top: -1px;
  }
`;
