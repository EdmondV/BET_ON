import styled from 'styled-components';
import { fontSize, color } from '../../../styles-constants';

export const HeaderWrapper = styled.div`
  font-size: ${fontSize.body};
  border-bottom: 1px solid rgba(35, 44, 82, 0.8);
  background-color: ${color.primary};
  height: ${({ isWidgetShow }) => !isWidgetShow ? '100px' : '0'};
  transition: height 300ms;
`;

export const RoomInfoWrapper = styled.div`
  text-align: center;
  padding: 6px;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  max-width: 640px;
  margin: 0 auto;
  height: 99px;
  > span {
    font-size: ${fontSize.heading};
  }

  .team-name {
    text-transform: uppercase;
    font-size: 17px;
    letter-spacing: 3px;
    white-space: nowrap;
  }

  .team-logo {
    display: flex;
    justify-content: space-between;
    &.left {
      width: 25%;
      justify-content: flex-end;
    }
    &.right {
      justify-content: flex-start;
      width: 24%;
    }
  }

  .logo-wrp {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-height: 35px;
    }
  }
}

.score-wrp {
  width: 52%;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
}

.total {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 20px;
  }
  .label {
    margin: 0 10px 0 5px;
    letter-spacing: 1px;
    font-size: 8pt;
    text-transform: none;
    color: ${color.grayFontColor};
  }
  .sum {
    font-size: 14pt;
    font-weight: 500;
    letter-spacing: 1px;
  }
`;

export const TeamsCountWrapper = styled.div`
  width: 100%;
  display: flex;
  font-size: 12px;
  margin-top: 15px;
`;

export const TeamCount = styled.div`
  text-align: center;
  color: ${({ team }) => color[`${team}Color`]};
  width: ${({ width }) => width}%;

  .countIndicator{
    background: ${({ team }) => color[`${team}Color`]};
    height: 5px;
    border-radius: ${({ team }) => team === 'bull' ? '3px 0 0 3px' : '0 3px 3px 0'};
  }
`;

export const Value = styled.div`
  padding: 0;
  position: absolute;
  margin-top: 43px;
  &.left {
    color: ${color.teamAColor};
  }
  &.right {
    color: ${color.teamBColor};
  }
`;

export const LeftScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 24%;
  height: 55px;
  align-items: flex-end;
  justify-content: space-between;
  padding-right: 15px;
  .team-logo {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    &.left {
      width: 25%;
      justify-content: flex-end;
    }
    &.right {
      justify-content: flex-start;
      width: 24%;
    }
  }
`;
export const CentralScoreWrapper = styled.div`
  display: flex;
  width: 54%;
  flex-direction: column;
`;
export const RightScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 24%;
  height: 55px;
  align-items: flex-start;
  justify-content: space-between;
  padding-left: 15px;
  .team-logo {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    &.left {
      width: 25%;
      justify-content: flex-end;
    }
    &.right {
      justify-content: flex-start;
      width: 24%;
    }
  }
`;
export const TeamsScore = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  .score {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -1px;
  }
  .time {
    font-size: 12px;
    color: ${color.activeColor};
  }
`;
export const Total = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;
export const ScoreWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo-wrp {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-height: 35px;
    }
  }
`;
