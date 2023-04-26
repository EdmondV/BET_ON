import styled, { keyframes } from 'styled-components';
import { color, fontSize, fontWeight, Team1ColorRGB, Team2ColorRGB } from 'styles-constants';

/* stylelint-disable indentation */
const betAnimation = keyframes`{
  from {
    opacity: 0.4;
    transform: scale(0.4);
  }
  to {
    opacity: 0;
    transform: scale(1);
  }
}`;
/* stylelint-enable */

export const BetButtonWrapper = styled.div`
  height: 50%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  left: 0;
  right: 0;
  margin: 0 auto;

  &.bull { margin-top: 0; top: 0; }
  &.bear { margin-bottom: 0; top: 50%; }
`;

export const BetButton = styled.button`
  width: 166px;
  height: 166px;
  position: absolute;
  left: 50%;
  margin-left: -83px;
  border-radius: 50%;
  cursor: pointer;

  .polygon{
    display: block;
    position: absolute;
    width: 94px;
    height: 47px;
    left: 50%;
    margin-left: -47px;

    svg{
      width: 94px;
      height: 47px;
      fill: rgba(0, 0, 0, 0.1);
    }
  }

  &.bull {
    top: 100%;
    margin-top: -83px;
    background: ${color.bullColor};

    .polygon{
      top: 15px;
    }

    &:hover{
      background-color: rgba(0, 165, 38, 1);
      display: inline-block;
    }
  }

  &.bear {
    bottom: 100%;
    margin-bottom: -83px;
    background: ${color.bearColor};

    .polygon{
      bottom: 15px;
      transform: rotate(180deg);
    }
    .bear-gain {
      position: absolute;
      top: 20px;
    }
    .bear-sum {
      position: absolute;
      top: 5px;
    }

    &:hover{
      background-color: #e37b00;
    }
  }
`;

export const BetButtonProfit = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 94px;
  height: 47px;
  left: 50%;
  margin-left: -47px;
  text-align: center;
  color: rgba(0, 0, 0, 0.3);
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.lightBold};

  img {
    width: 24px;
  }

  &.bull{
    top: 15px;
    padding-top: 10px;
  }

  &.bear{
    bottom: 15px;
    padding-bottom: 10px;
  }

  .gain{
    font-size: ${fontSize.extraSmall};
    font-weight: ${fontWeight.normal};
    text-transform: uppercase;
  }
`;

export const BetWrapper = styled.div`
  width: 132px;
  height: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -15px 0 0 -66px;
  border-radius: 15px;
  background: ${color.primarySecond};
  text-align: center;
  color: #fff;
  font-size: ${fontSize.body};
  font-weight: ${fontWeight.lightBold};
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: ${fontSize.extraSmall};
    color: ${color.grayFontColor};
    text-transform: uppercase;
  }

  .plus {
    position: absolute;
    right: 2px;
    height: 27px;
    width: 27px;
    background: ${color.primaryLighted};
    margin: 0 auto;
    font-size: 14pt;
    border-radius: 50%;
    :hover {
      color: #fff;
      cursor: pointer;
    }
  }
  .minus {
    position: absolute;
    left: 2px;
    height: 27px;
    width: 27px;
    background: ${color.primaryLighted};
    margin: 0 auto;
    font-size: 14pt;
    border-radius: 50%;
    :hover {
      color: #fff;
      cursor: pointer;
    }
  }
`;

export const MembersWrapper = styled.span`
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  left: 50%;

  &.bull { bottom: calc(50% + 6px); }
  &.bear { top: calc(50% + 6px); }
`;

export const MemberIndicator = styled.span`
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ isCurrentUser }) => isCurrentUser ? '#fff' : 'rgba(0,0,0,.3)'};

  &.bull{
    &:nth-child(1){
      left: -78px;
      bottom: 0;
    }
    &:nth-child(2){
      left: -76px;
      bottom: 10px;
    }
    &:nth-child(3){
      left: -72px;
      bottom: 20px;
    }
    &:nth-child(4){
      left: -67px;
      bottom: 30px;
    }
    &:nth-child(5){
      left: -60px;
      bottom: 39px;
    }
    &:nth-child(6){
      left: -52px;
      bottom: 47px;
    }
    &:nth-child(7){
      left: -43px;
      bottom: 54px;
    }
    &:nth-child(8){
      left: -33px;
      bottom: 59px;
    }
    &:nth-child(9){
      left: -22px;
      bottom: 63px;
    }
    &:nth-child(10){
      left: -10px;
      bottom: 65px;
    }
    &:nth-child(11){
      left: 3px;
      bottom: 65px;
    }
    &:nth-child(12){
      left: 15px;
      bottom: 63px;
    }
    &:nth-child(13){
      left: 26px;
      bottom: 59px;
    }
    &:nth-child(14){
      left: 36px;
      bottom: 53px;
    }
    &:nth-child(15){
      left: 45px;
      bottom: 46px;
    }
    &:nth-child(16){
      left: 53px;
      bottom: 37px;
    }
    &:nth-child(17){
      left: 60px;
      bottom: 28px;
    }
    &:nth-child(18){
      left: 66px;
      bottom: 17px;
    }
    &:nth-child(19){
      left: 70px;
      bottom: 5px;
    }
    &:nth-child(n + 20){
      display: none;
    }
  }

  &.bear{
    &:nth-child(19){
      left: -78px;
      top: 0;
    }
    &:nth-child(18){
      left: -76px;
      top: 10px;
    }
    &:nth-child(17){
      left: -72px;
      top: 20px;
    }
    &:nth-child(16){
      left: -67px;
      top: 30px;
    }
    &:nth-child(15){
      left: -60px;
      top: 39px;
    }
    &:nth-child(14){
      left: -52px;
      top: 47px;
    }
    &:nth-child(13){
      left: -42px;
      top: 54px;
    }
    &:nth-child(12){
      left: -31px;
      top: 59px;
    }
    &:nth-child(11){
      left: -19px;
      top: 63px;
    }
    &:nth-child(10){
      left: -6px;
      top: 65px;
    }
    &:nth-child(9){
      left: 7px;
      top: 64px;
    }
    &:nth-child(8){
      left: 19px;
      top: 61px;
    }
    &:nth-child(7){
      left: 30px;
      top: 56px;
    }
    &:nth-child(6){
      left: 41px;
      top: 49px;
    }
    &:nth-child(5){
      left: 50px;
      top: 41px;
    }
    &:nth-child(4){
      left: 57px;
      top: 32px;
    }
    &:nth-child(3){
      left: 63px;
      top: 22px;
    }
    &:nth-child(2){
      left: 67px;
      top: 11px;
    }
    &:nth-child(1){
      left: 70px;
      top: 0;
    }
    &:nth-child(n + 20){
      display: none;
    }
  }
`;

export const BetAnimationContainer = styled.div`
  width: 100%;
  height: 50%;
  overflow: hidden;
  position: absolute;
  left: 0;

  &.bull{
    top: 0;

    .circle{
      top: -47px;
      background-color: ${Team1ColorRGB};
    }
  }
  &.bear{
    bottom: 0;

    .circle{
      bottom: -47px;
      background-color: ${Team2ColorRGB};
    }
  }

  .circle {
    display: block;
    content: '';
    width: 360px;
    height: 360px;
    border-radius: 50%;
    position: absolute;
    left: -56px;
    animation: ${betAnimation} 4s ease-out backwards infinite;
  }

  .circle:nth-child(2) {
    animation-delay: 1s;
  }

  .circle:nth-child(3) {
    animation-delay: 2s;
  }

  .circle:nth-child(4) {
    animation-delay: 3s;
  }

  .circle:nth-child(5) {
    animation-delay: 4s;
  }
`;
