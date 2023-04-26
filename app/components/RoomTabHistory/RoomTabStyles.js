import styled from 'styled-components';
import { color, fontSize, space, flex, fontFamily, fontWeight, letterSpacing } from 'styles-constants';
import slideRight from 'components/SlideRightAnimation';

const isCurrentRoom = (props) => props && props.room && props.params && (props.room.id === props.params.id);

const defaultBorderRadius = '3em';

const getBorderColor = (activeRoom, room) => {
  if (activeRoom || !room) {
    return '#fff';
  } else if (room.isDrawOrNobody) {
    return 'transparent';
  } else if (room.finalResult === 'win') {
    return color.newSuccessHover;
  }
  return color.danger;
};

export const StyledRoomTab = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
  width: 100%;
  font-size: ${fontSize.small};
  background-color: ${color.primary};
  border-radius: ${defaultBorderRadius};
  opacity: ${(props) => isCurrentRoom(props) ? '1' : '0.8'};
  border: 1px solid transparent;
  border-color: ${(props) => getBorderColor(isCurrentRoom(props), props && props.room)};
  transition: opacity 300ms;
  animation: ${slideRight} 0.45s backwards;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  padding: 6px ${space()};
  margin-bottom: 8px;
  height: 52px;
`;

export const TabContentWrapper = styled.div`
  ${flex('space-between', 'stretch')};
  padding: 0 10px;
`;

export const DateWrapper = styled.div`
  ${flex('center', 'flex-end', 'column')};
  flex: 0 40px;
  position: relative;
  top: -1px;
  font-size: 11px;
  opacity: 0.7;
  font-family: ${fontFamily.heading};
  .date {
    line-height: 1.3;
    margin-top: 2px;
  }
`;

export const StyledRoomInfo = styled.div`
  opacity: 0.6;
`;

export const Asset = styled.span`
  font-family: ${fontFamily.heading};
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.lightBold};
  letter-spacing: ${letterSpacing.medium};
  position: relative;
  bottom: -4px;
`;

export const Title = styled.span`
  font-family: ${fontFamily.heading};
  font-size: 13px;
  font-weight: ${fontWeight.light};
  padding-left: ${space()};
  white-space: nowrap;
  position: absolute;
  overflow: hidden;
  max-width: 90px;
  bottom: 6px;
  &:before {
    content: '';
    display: ${({ shadow }) => shadow ? 'block' : 'none'};
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    bottom: 0;
    background: linear-gradient(to right, rgba(0,12,42,0) 0%,rgba(0,12,42,1) 100%);
  }
`;

export const RoomInfoWrapper = styled.div`
  ${flex('flex-start', 'center', 'column')};
`;

export const StyledProfitWrapper = styled.span`
  ${flex()};
  font-size: ${fontSize.body};
  color: ${(p) => p.color};
`;

export const ResultText = styled.div`
  ${flex(null, 'center')};
  padding-left: ${({ drawOrNobody }) => !drawOrNobody ? space() : '0'};
  text-transform: uppercase;
  font-family: ${fontFamily.heading};
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.lightBold};
  letter-spacing: ${letterSpacing.small};
`;

export const StyledResultIcon = styled.div`
  transform: rotateY(180deg);
  height: 19px;
  svg {
    position: relative;
    top: -4px;
    width: 28px;
    fill: ${({ team }) => team === 'bull' ? color.bullColor : color.bearColor};
  }
`;


export const CircleIcon = styled.div`
  height: 19px;
`;

export const StyledCircle = styled.div``;
