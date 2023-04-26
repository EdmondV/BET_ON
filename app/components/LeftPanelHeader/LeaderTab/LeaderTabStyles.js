import styled from 'styled-components';
import { color, fontSize, space } from 'styles-constants';
import slideRight from 'components/SlideRightAnimation';

const isCurrentUser = (props) => props.leader && props.leaders && (props.leaders.user.userId === props.leader.userId);

export const StyledLeaderTab = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: top;
  line-height: 15px;
  height: 27px;
  margin: 0 0 14px;
  width: 100%;
  font-size: ${fontSize.small};
  cursor: default;
  padding-left: 17px;
  box-sizing: border-box;
  animation: ${slideRight} 0.4s backwards;
`;

export const TabContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const IndexWrapper = styled.div`
  flex-shrink: 0;
  width: 25px;
  height: 27px;
  position: relative;
  font-size: ${fontSize.body};
  line-height: 27px;
  text-align: right;
  color: ${(p) => isCurrentUser(p) ? color.mainFontColor : color.grayFontColor};
`;

export const RoomInfoWrapper = styled.div`
  width: 200px;
  > span {
    display: block;
    padding-left: ${space()};
    margin-bottom: ${space()};
    white-space: nowrap;
    text-transform: capitalize;
    &:last-child {
      margin: 0;
    }
  }
  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

export const StyledProfitWrapper = styled.span`
  font-size: ${fontSize.small};
  color: ${color.success};
  text-align: left;
  line-height: 1.2em;
`;

export const StyledUsernameWrapper = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  white-space: nowrap;
  margin-top: -2px;
  font-size: ${fontSize.small};
  color: ${(p) => isCurrentUser(p) ? color.mainFontColor : color.grayFontColor};
  line-height: 1.2em;
`;

export const StyledCurrentUserMark = styled.div`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 8px;
  background: ${color.success};
`;
