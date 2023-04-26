import styled, { keyframes } from 'styled-components';
import { color, hexToRgb, fontFamily, space, flex, fontWeight, fontSize, circle, roomPreview } from 'styles-constants';
import slideRight from 'components/SlideRightAnimation';
import FieldBg from 'containers/MainPage/FootballPage/mocks/assets/field_bg.png';


const isCurrentRoom = (props) => props.room && props.params && (props.room.id === props.params.id);

const fadeIn = keyframes`{ from { opacity: 0; } to {opacity: 0.85;} }`;

function getOpacity(room) {
  if (room.showRecommended || isCurrentRoom(room)) {
    return '1';
  }
  if (room.fading) {
    return '0';
  }
  return '0.85';
}

const RoomPreviewHeight = 210;
const RoomCompactHeight = 122;
const ArcWidth = 66;

export const RoomPreviewWrapper = styled.div`
  ${flex(null, null, 'column')};
  font-family: ${fontFamily.heading};
  position: relative;
  margin: 0 auto 10px;
  width: 100%;
  min-height: ${({ showChartPreview }) => !showChartPreview ? `${RoomCompactHeight}px` : `${RoomPreviewHeight}px`};
  font-size: ${fontSize.small};
  padding: 10px 14px 14px;
  border-radius: 1em;
  background: ${color.primaryDarked};
  text-align: left;
  opacity: ${getOpacity};
  animation: ${(props) => props.showRecommended ? `${fadeIn} 2s` : `${slideRight} 0.5s backwards`};
  border: 1px solid ${({ isRoomCurrent }) => isRoomCurrent ? color.activeColor : 'transparent'};
  transition: opacity 300ms;
  &:hover {
    opacity: 1;
  }
  &:first-child {
    margin-top: 3px;
  }
`;

export const RoomDetailsWrapper = styled.div`
  padding: ${({ compact }) => compact ? '0' : '0 0 4px 0'};
`;

export const RoomUpperDetails = styled.div`
  ${flex('space-between')};
  text-transform: uppercase;
  font-size: 8pt;
`;

export const Title = styled.div``;

export const Time = styled.div`
  ${flex(null, 'center')};
  span {
    padding-left: 5px;
  }
  svg {
    fill: ${color.mainFontColor};
    width: 12px;
    position: relative;
    top: -1px;
  }
`;

export const RoomPreviewChartWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 110px;
  padding: 0;
  border-radius: 0.75em;
  margin-bottom: 4px;
  overflow: hidden;
  background: url('${FieldBg}');
  background-repeat: no-repeat;
  background-size: 100% auto;
  > div {
    overflow: hidden;
    border-radius: 0.75em;
  }
`;

export const RoomPreviewBottomWrapper = styled.div`
  ${flex('space-between', 'stretch')};
  padding-top: ${({ compact }) => compact ? '0' : space()};
  flex: 1;
  position: relative;
  z-index: 3;
  cursor: pointer;
  .logo-wrp {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 66px;
    justify-content: space-between;
    img {
      max-width: 40px;
      max-height: 40px;
      height: auto;
    }
  }
`;

export const BetBtn = styled.div`
  ${flex('center', 'center', 'column')};
  flex: 1;
  position: relative;
  top: 4px;
  border-radius: 5px;
  color: rgba(${hexToRgb('#ffffff')}, 0.8);
  font-size: ${fontSize.small};
  line-height: 15px;
  padding: ${(props) => props.type === 'bull' ? '5px 0 14px 0' : '14px 0 5px 0'};
  margin: ${({ type }) => type === 'bull' ? '0 0 0 -14px' : '0 -14px 0 0'};
  opacity: 0.75;

  .circle {
    position: absolute;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 60px;
    height: 60px;
    ${circle()};
    transition: opacity 200ms ease-out;
    opacity: 0;
    background: ${({ type }) => type === 'bull' ? color.bullColor : color.bearColor};
  }

  &:hover {
    .circle {
      opacity: 0.4;
    }
  }
`;

export const Payout = styled.div``;

export const Money = styled.div`
  font-size: 11px;
  color: ${color.mainFontColor};
  z-index: 10;
`;

export const Triangle = styled.div`
  position: relative;
  top: ${({ bull }) => bull ? '-4px' : '4px'};
  border: 14px solid transparent;
  border-bottom-color: ${({ bull }) => bull ? color.bullColor : 'transparent'};
  border-top-color: ${({ bull }) => bull ? 'transparent' : color.bearColor};
  width: 0;
  height: 0;
`;

export const BtnDetailsWrapper = styled.div`
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  margin-top: 5px;
`;


export const ArcWrapper = styled.div`
  position: relative;
  flex: 0 ${ArcWidth}px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1;
  height: ${ArcWidth}px;
  background: ${roomPreview.roomPreviewBg};
  cursor: default;
  transform: rotate(-90deg);
  ${circle()};
`;

export const RoomBetValue = styled.div`
  ${flex('center', 'flex-start', 'column')};
  cursor: default;
  font-size: 14px;
  font-weight: ${fontWeight.bold};
  width: 16px;
  position: absolute;
  top: ${({ compact }) => compact ? '14px' : '15px'};
  height: 100%;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 2;

  img {
    width: 14px;
    padding-top: 4px;
  }

  .title {
    color: rgba(256,256,256,0.5);
    font-size: 6pt;
    font-weight: 100;
    width: 60px;
    padding-left: 12px;
  }

  .value {
    font-size: 9pt;
  }
`;
