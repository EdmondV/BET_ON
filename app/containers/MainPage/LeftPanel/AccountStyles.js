import styled, { keyframes } from 'styled-components';
import { space, color, hexToRgb, zIndex } from 'styles-constants';

const isDemoUser = (user) => user && (user.wallet === 'DEMO');
const isAsideOpened = (props) => props && (props.secondAsideOpened);

export const uiWidth = '100%';

export const avatarWidth = 150;

const fadeOut = keyframes`{ from {opacity: 0;} to {opacity: 1;} }`;

export const UiWrapper = styled.div`
  width: ${uiWidth};
  margin: ${space(2)} auto 0;
  display: block;
  align-items: center;
  animation: ${fadeOut} 0.5s 0.4s ease backwards;
  button {
    font-weight: bold;
  }
`;

export const AsideAccountWrapper = styled.div`
  padding-top: ${space(5)};
  padding-bottom: ${space(3)};
  overflow: hidden;
  animation: ${fadeOut} 0.3s 0.2s ease backwards;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  max-width: 220px;
  display: inline-flex;
`;

export const UserName = styled.div`
  text-transform: capitalize;
  font-size: 12px;
  padding: 0 ${space(2)} 2px;
  display: flex;
  align-items: center;
`;

export const BottomButtonsWrapper = styled.div`
  bottom: ${space(2)};
  margin: 10px auto 20px;
  text-align: center;
  width: 100%;
  animation: ${fadeOut} 0.3s 0.8s ease backwards;
  > div {
    margin-bottom: ${space(2)};
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const avatarStyles = {
  width: avatarWidth,
  height: avatarWidth,
  fontSize: '24px',
};

// don't use height 100% here, cause bug in safari
export const FlexHelper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

export const FlexVerticalColumn = styled.div`
  display: flex;
  flex-direction: column;
  z-index: ${zIndex.secondSidebar};
  margin: -20px -10px;
  padding: 20px;
  background: ${color.primaryLighted};
  box-shadow: 6px 6px 6px rgba(${hexToRgb('#0a1636')}, 0.3);
`;

export const AvatarHelper = styled.div`
  position: absolute;
  width: ${avatarWidth}px;
  height: ${avatarWidth}px;
  overflow: hidden;
  display: inline-flex;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
`;

// FIXME: WalletLabel is not the candidate to listen all APP props :(
export const WalletLabel = styled.div`
  width: 45px;
  height: 45px;
  background: ${({ user }) => isDemoUser(user) ? '#485871' : `${color.newSuccess}`};
  color: ${color.primary};
  position: absolute;
  top: -8px;
  left: -8px;
  font-size: 11px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  z-index: 3;
  > span {
    display: inline-flex;
    text-transform: uppercase;
  }
`;

export const ChangeAvatarLabel = styled.label`
  cursor: pointer;
  position: absolute;
  bottom: -120px;
  z-index: 1;
  left: 0;
  width: ${avatarWidth}px;
  height: ${avatarWidth}px;
  background: ${color.newSuccess};
  display: inline-flex;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: center;
  padding-top: 3px;
  transition: all 0.3s ease-out;
  transform: translateY(${(p) => p.show ? '0' : '34px'});
  &:hover {
    background: ${color.newSuccessHover};
  }
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  text-align: center;
  width: 200px;
  margin: 0 auto;
  animation: ${fadeOut} 0.3s 0.3s ease backwards;
`;

export const IconWrapper = styled.div`
  width: 28px;
  height: 28px;
  display: inline-flex;
  justify-content: center;
  align-self: flex-end;
  flex-shrink: 0;
`;

export const SettingsIcon = IconWrapper.extend`
  opacity: ${(props) => isAsideOpened(props) ? '1' : '0.6'};
  transition: all 0.3s ease-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
