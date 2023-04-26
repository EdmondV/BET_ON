import React from 'react';
import { bool, string } from 'prop-types';
import Avatar from 'components/Avatar';
import {
  StyledMessage,
  MessageWrapper,
  MessageUsername,
  MessageBody,
  AvatarWrapper,
} from './ChatMessageStyles';

export default function ChatMessage(props) {
  return (
    <StyledMessage currentUser={props.currentUser}>
      <AvatarWrapper currentUser={props.currentUser}>
        <Avatar initials={props.avatarName} avatar={props.avatar} name={props.username} customCss={{ width: '27px', height: '27px' }} />
      </AvatarWrapper>
      <MessageWrapper currentUser={props.currentUser}>
        <MessageBody currentUser={props.currentUser}>
          <MessageUsername>{props.username}</MessageUsername>
          {props.message}
        </MessageBody>
      </MessageWrapper>
    </StyledMessage>
  );
}

ChatMessage.propTypes = {
  username: string,
  avatarName: string,
  avatar: string,
  message: string,
  currentUser: bool,
};
