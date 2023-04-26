import styled, { keyframes } from 'styled-components';
import { color, fontSize, drawColor } from 'styles-constants';

const expandTab = keyframes`
  0% {
    transform: scale(0);
  }
  90% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// const TabSpacing = 6;
// const TabPadding = 6;

// const getActiveTabBorderColor = (teamWon, isPlaying) => {
//   if (!isPlaying) return color.mainFontColor;
//   if (teamWon === 0) return color.grayFontColor;
//   return teamWon === 2 ? color.bearColor : color.bullColor;
// };


export const StyledRoomTab = styled.div`
  flex-shrink: 0;
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: top;
  line-height: 15px;
  height: 47px;
  margin-top: 2px;
  margin-left: 13px;
  margin-right: 0;
  width: ${(props) => props.width || 223}px;
  font-size: ${fontSize.small};
  background-color: ${color.primaryLighted};
  border-radius: 25px;
  border: 1px solid ${color.primaryLighted};
  opacity: 0.6;
  animation: ${expandTab} 0.3s;
  transform-origin: origin;
  cursor: pointer;
  transition: border-color 300ms ease 0s;

  &.active {
    border-color: ${color.activeColor};
    opacity: 1;

    .draw {
      color: #fff;
      opacity: 0.5;
    }
  }

  .draw {
    color: ${drawColor};
  }
  .loss {
    color: ${color.roomLoss};
  }

  &:hover {
    opacity: 1;
    .close-tab-icon {
      opacity: 0.5;
      &:hover{
        opacity: 0.8;
      }
    }
  }
  padding: 0;

  .tabArc{
    background: rgba(255, 255, 255, 0.25);
    border-radius: 50%;
  }

  .panel{
    background: ${color.primaryLighted};
  }
`;

export const TabContentWrapper = styled.div`
  display: flex;
  color: white;
  text-decoration: none;
  padding: 2px;
  height: 50px;
  &:hover {
    text-decoration: none;
  }
`;

export const TabWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: start;
  padding: 5px 16px;
  letter-spacing: 1px;
  .score {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .bets-info {
    font-size: 10px;
    margin-top: 2px;
    .bets, .gain {
      color: rgba(255, 255, 255, 0.6);
      strong {
        color: #ffffff;
        font-weight: bold;
      }
    }
  }
`;

export const ArcWrapper = styled.div`
  width: 35px;
  height: 35px;
  position: relative;
  .icon-bg {
    opacity: 0.2;
    position: absolute;
    width: 65%;
    height: 65%;
    transform: translateY(-50%);
    top: 59%;
    left: 17%;
    right: 0;
    margin: 0 auto;
  }
`;

export const TimerValue = styled.div`
  position: absolute;
  right: 0;
  top: 59%;
  letter-spacing: 1px;
  transform: translateY(-50%);
  font-size: 10px;
  margin: 0 auto;
  text-align: center;
  color: ${({ styles, deadline }) => deadline ? styles.danger : styles.arcProgress};
`;

export const CloseIcon = styled.div`
  padding-top: 9px;
  right: 20px;
  position: absolute;
  text-align: right;
  opacity: 0.5;
  transition: opacity 0.2s ease-out;
  &:hover {
    opacity: 0.9;
  }
  span {
    margin-right: -12px;
    cursor: pointer;
    height: 21px;
  }
`;

export const ProgressWrapper = styled.div`
  position: absolute;
  transform: rotate(-90deg);
`;
