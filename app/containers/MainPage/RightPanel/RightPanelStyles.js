import styled from 'styled-components';
import { fontSize, color, betsPanelWidth, headerHeight, fontWeight, space, flex } from '../../../styles-constants';
import { browserName } from '../../../utils/browserDetection';
import Logo from '../../../components/Logo/logo@2x.png';

export const BetsPanelWrapper = styled.div`
  height: calc(100vh - ${headerHeight}px);
  width: ${betsPanelWidth}px;
  background: ${color.betsPanelBg};
  border-left: ${color.primaryLighted} 1px solid;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;
export const VideoPanel = styled.div`
  flex: 0 0 ${headerHeight * 2}px;
  border-bottom: ${color.primaryLighted} 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ fullScreen }) => fullScreen ? `url(${Logo})` : 'none'};
  background-color: ${({ fullScreen }) => fullScreen ? color.activeColor : 'transparent'};
  background-repeat: no-repeat;
  background-size: 95px;
  background-position: center;
`;
export const SettingsWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex: 0 0 40px;
`;
export const PeriodWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  border: 1px solid rgba(91,192,222, 0.4);
  border-radius: 4px;
  height: 30px;
  margin: 0 auto;
  max-width: 200px;
`;
export const PeriodButton = styled.button`
  flex: 1 1 auto;
  border: none;
  text-align: center;
  border-radius: 0;
  cursor: pointer;
  font-size: 9px;
  color: ${({ isCurrent }) => isCurrent ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)'};
  background: ${({ isCurrent }) => isCurrent ? 'rgba(91,192,222, 0.4)' : 'transparent'};
  transition: all 300ms ease-out;
  padding: 0;
  &:hover {
    background: rgba(91,192,222, 0.12);
    color: #fff;
  }

  &:first-child {
    border-radius: 3px 0 0 3px;
  }

  &:last-child {
    border-radius: 0 3px 3px 0;
  }
`;
export const UserOverviewWrapper = styled.div`
  display: flex;
  border-bottom: ${color.primaryLighted} 1px solid;
  flex: 0 0 100px;
`;
export const UserOverviewItem = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 25px 0;

  &.bet {
    border-right: ${color.primaryLighted} 1px solid;

    .title {
      & > div {
        margin: -2px 0 0;
      }
      svg {
        width: 31px;
      }
    }
  }

  .title{
    font-size: ${fontSize.small};
    color: ${color.grayFontColor};
    display: flex;
    align-items: center;
    margin: 10px 0;

    & > div {
      display: inline-block;
      margin-right: 5px;
    }
    svg{
      fill: ${color.grayFontColor};
      width: 18px;
    }
  }

  .summ{
    font-size: 18px;
    font-weight: ${fontWeight.lightBold};
  }
`;
export const MembersAndChatWrapper = styled.div`
  flex: 0 0 calc(100vh - 500px);
  display: flex;
  flex-direction: column;
`;
export const MembersAndChatHeader = styled.div`
  ${flex('center')};
  flex: 0 0 40px;
`;
export const MembersAndChartButton = styled.button`
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  border-bottom: ${color.primaryLighted} 2px solid;
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.lightBold};
  color: ${color.grayFontColor};
  cursor: pointer;
  letter-spacing: 2px;

  svg {
    fill: ${color.grayFontColor};
    width: 20px;
    margin-right: 10px;
  }

  &.active{
    border-bottom-color: ${color.activeColor};
    color: ${color.mainFontColor};

    svg{
      fill: ${color.mainFontColor};
    }
  }

  &:hover{
    color: ${color.mainFontColor};

    svg{
      fill: ${color.mainFontColor};
    }
  }

  ${browserName() === 'safari' && 'padding: 0 20px'};
`;
export const PlayersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  padding: 10px 5px ${browserName() === 'firefox' ? '20px' : '0'} ${space(1.5)};
  > div {
    flex: 1;
  }
  .scrollarea-content {
    position: absolute;
    width: 100%;
  }
`;

export const ChatWrapper = styled.div`
  padding: 20px 5px 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  flex: 1;
  width: 234px;
`;

export const MessagesWrapper = styled.div`
  ${flex()};
  flex: 1 100%;
  margin-top: -15px;
  .tr-scrollbar {
    overflow: hidden;
    flex: 1 100%;
  }
  .scrollarea-content {
    position: absolute;
    width: 100%;
  }
`;

export const AvatarWrapper = styled.div`
  margin-right: 5px;
  height: 30px;
`;

export const BetWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  font-size: ${fontSize.body};
  font-weight: ${fontWeight.regular};
  margin-bottom: 15px;
  flex: 0 0 30px;
  padding-right: 10px;
`;

export const PlayerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  color: ${color.grayFontColor};
  font-weight: 300;
`;

export const PlayerBet = styled.div`
  font-weight: 300;
  color: ${({ team }) => team === 1 ? color.bullColor : color.bearColor};
`;
