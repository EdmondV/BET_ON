import styled from 'styled-components';
import { color, drawColor10 } from 'styles-constants';

export const MainPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const MainLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  > div {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
`;

export const LeftPanelAndChartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  min-height: 500px;
  overflow: hidden;
`;

export const ChartAndHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const ChartLayoutWrapper = styled.div`
  height: auto;
  border-bottom: 1px solid rgba(35,44,82,0.8);
  display: flex;
  flex: 1 1 375px;
  position: relative;
`;

export const ChartAndFooterWrapper = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  .react-video {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    max-height: 100%;
  }
`;

export const ModalMain = styled.div`
  position: absolute;
  z-index: 2;
  height: 80%;
  width: 100%;
  border-radius: 5px 5px 0 0;
  .rows {
    font-weight: 400;
    color: ${color.mainFontColor};
    align-items: center;
    flex-direction: row;
    display: flex;
    justify-content: space-around;
    height: 20%;
    .center {
      width: 40%;
      text-align: center;
    }
    div {
      z-index: 2;
    }
    h2 {
      color: ${color.activeColor};
      margin-bottom: 5px;
      font-weight: 400;
    }
    img {
      width: 50px;
    }
    .bank-sum {
      font-size: 13pt;
    }
    .total-bank {
      font-size: 9pt;
    }
  }
  .rows:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: ${drawColor10};
  }
  .rows:first-child {
    height: 40%;
  }
  .rows:first-child:before {
    height: 0;
  }
  :before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(1,1,1,0.5);
  }
`;

export const ModalFooter = styled.div`
  height: 20%;
  width: 100%;
  border-radius: 0 0 5px 5px;
  background-color: ${color.teamAColor};
  position: absolute;
  z-index: 2;
  top: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: ${color.mainFontColor};
  .sum {
    font-weight: 500;
    margin-left: 20px;
    font-size: 15px;
  }
`;

export const BackgroundImg = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 80%;
  border-radius: 5px 5px 0 0;
  :before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(1,1,1,0.4);
    border-radius: 5px;
  }
`;

export const ExplainerModalMain = styled.div`
  position: absolute;
  z-index: 2;
  height: 85%;
  width: 100%;
  border-radius: 5px 5px 0 0;
  background-position: center;
  background-size: 800px;
  text-align: center;
  svg: {
    transform: rotate(270deg);
  }
  .title {
    height: 50%;
    width: 75%;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: yellow;
    h1 {
      z-index: 5;
      margin: 0 auto;
    }
  }
  .text {
    width: 75%;
    height: 50%;
    margin: 0 auto;
    display: flex;
    color: #fff;
    h2 {
      z-index: 5;
      font-weight: 300;
      font-size: 19pt;
    }
  }
  :before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    background: rgba(1,1,1,0.2);
  }
`;

export const ExplainerModalFooter = styled.div`
  height: 15%;
  width: 100%;
  border-radius: 0 0 5px 5px;
  background-color: ${color.teamAColor};
  position: absolute;
  z-index: 2;
  top: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: ${color.mainFontColor};
  font-size: 20pt;
  button {
    width: 50%;
    height: 100%;
    cursor: pointer;
  }
  button:hover {
    font-size: 22pt;
  }
  .skip {
    border-radius: 0 0 0 5px;
    border-right: 1px solid black;
    background-color: ${color.primarySecond};
  }
`;

export const ProgressWrapper = styled.div`
  position: absolute;
  top: -37px;
  z-index: 5;
  display: flex;
  width: 70%;
  justify-content: space-between;
  svg: {
    transform: rotate(270deg);
  }
`;
export const CircleWrapper = styled.div`
  border-radius: 50%;
  transform: rotate(-90deg);
  background-color: ${color.primarySecond};
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    transform: rotate(90deg);
    position: absolute;
    z-index: 1;
    color: #fff;
    font-size: 20pt;
    font-weight: 400;
  }
  span {
    transform: rotate(90deg);
    position: absolute;
    z-index: 1;
    color: #fff;
    font-size: 20pt;
    font-weight: 400;
  }
`;
