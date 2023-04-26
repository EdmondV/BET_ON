import styled from 'styled-components';
import { color, hexToRgb } from '../../../styles-constants';
import Button from '../../../components/Button/StyledButton';

export const AccButton = styled(Button)`
  white-space: normal;
  text-align: center;
  line-height: 16px;
  height: 45px;
  width: 172px;
  color: #000000;
  padding: 0;
  /* box-shadow: inset 0 0 15px rgba(255,255,255,0.6); */
  transition: box-shadow 300ms ease 0s;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  letter-spacing: 0;
  border-radius: 0.15em;
  background-color: ${color.activeColor};
  margin-right: 20px;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  &:hover {
    background-color: ${color.activeColor};
  }
`;
export const ProfileMoney = styled.div`
  color: ${color.mainFontColor};
  font-size: 11px;
  width: 96px;
  padding: 10px 0 6px;
  text-align: left;
  .amount {
    font-size: 20px;
    font-weight: bold;
  }
`;
export const AccButtonWrapper = styled.div`
  display: block;
  text-align: center;
  width: 107px;
  padding: 1px;
  border-radius: 5px;
`;
// export const ProfileInfoWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   color: #fff;
// `;
export const AvatarWrapper = styled.div`
  padding-right: 8px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;
export const LogoWrapper = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
  z-index: 2;
  background: ${color.teamAColor};
  border-bottom: 1px solid rgba(${hexToRgb(color.primaryLighted)}, 0.8);
`;
export const HeaderWrapper = styled.div`
`;
export const Helper = styled.div`
  display: flex;
`;
export const TopWrapper = styled.div`
  height: 70px;
  background: ${color.teamAColor};
  border-bottom: 1px solid rgba(35,44,82,0.8);
  text-align: center;
  z-index: 1;
  position: relative;
  display: flex;
  max-width: 100%;
  margin-left: -70px; /* logo is ignored in flex row - fix for high resolution (1920) */
  padding-left: 70px; /* logo is ignored in flex row - fix for high resolution (1920) */
  flex: 1;
`;
export const RoomsListContainerWrapper = styled.div`
  display: flex;
  flex: 1;
  text-align: left;
  align-items: center;
  overflow: hidden;
`;
export const ProfileColWrapper = styled.div`
  display: flex;
  width: 353px;
  justify-content: space-between;
  align-items: center;
  padding: 7px 98px 7px 0;
  text-align: right;
  position: relative;
  z-index: 2;
`;

export const RoomTabsWrapper = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;
`;
