import styled from 'styled-components';
import { space, hexToRgb, color } from 'styles-constants';


export const StyledMessage = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: ${({ currentUser }) => currentUser ? 'row-reverse' : 'row'};
  align-items: flex-end;
  justify-content: space-between;
`;

export const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: rgba(${hexToRgb('#ffffff')}, 0.6);
  flex-direction: ${(props) => props.currentUser ? 'row' : 'row-reverse'};
  margin: 0 10px;
`;

export const MessageUsername = styled.div`
  padding-bottom: 5px;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  padding-right: ${(props) => props.currentUser ? 0 : 8}px;
  padding-left: ${(props) => props.currentUser ? 8 : 0}px;
  display: inline-flex;
  flex-direction: ${({ currentUser }) => currentUser ? 'row-reverse' : 'row'};
`;

export const MessageBody = styled.div`
  position: relative;
  margin-top: ${space(2)};
  font-size: 12px;
  padding: 5px 10px;
  background: ${(props) => props.currentUser ? color.lightBlue : color.primaryLighted};
  border-radius: ${(props) => props.currentUser ? '10px 10px 0 10px' : '10px 10px 10px 0'};
  &:after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: ${(props) => props.currentUser ? 'auto' : '-5px'};
    right: ${(props) => props.currentUser ? '-5px' : 'auto'};
    display: block;
    width: 10px;
    height: 10px;
    background: ${(props) => props.currentUser ? color.lightBlue : color.primaryLighted};
    transform: rotate(45deg);
  }
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 80%;
  height: 100%;
`;
