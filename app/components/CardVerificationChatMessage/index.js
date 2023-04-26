import React from 'react';
import styled from 'styled-components';
import { bool, string, number, any } from 'prop-types';
import { color } from 'styles-constants';
import { getFormattedTime } from 'utils/time';

import IconFile from './IconFile.svg';

const MainMessageWrapper = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.isUserMessage ? 'flex-start' : 'flex-end'};
`;

const MessageHeaderInfo = styled.div`
  margin-bottom: 4px;
  padding: ${(props) => props.isUserMessage ? '0 10px 0 0' : '0 0 0 10px'};
`;
const MessageOwner = styled.span`
  padding-right: 8px;
`;
const MessageDate = styled.span``;
const MessageWrapper = styled.div`
  background: ${(props) => props.isUserMessage ? '#2C426C' : color.primary};
  margin: ${(props) => props.isUserMessage ? '0 20px 30px 0' : '0 0 30px 20px'};
  width: 100%;
  max-width: 80%;
  position: relative;
  padding: 10px 6px 10px 10px;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: ${(props) => props.isUserMessage ? 'auto' : '-10px'};
    right: ${(props) => props.isUserMessage ? '-10px' : 'auto'};
    border: 10px solid ${(props) => props.isUserMessage ? '#2C426C' : color.primary};
    border-color: ${(props) => props.isUserMessage ? '#2C426C' : color.primary}, transparent, transparent, transparent;
  }
`;
const MessageBody = styled.div`
  padding-bottom: 10px;
  text-align: left;
  border-bottom: ${(props) => props.hasAttachments ? '1px solid #122243' : 'none'};
`;
const AttachmentsList = styled.div`
  margin-top: 7px;
`;
const Attachment = styled.div`
  padding-left: 28px;
  position: relative;
  text-align: left;
  margin-bottom: 4px;
  &:before {
    content: '';
    background: url(${IconFile}) no-repeat top center;
    position: absolute;
    left: 2px;
    top: 0;
    width: 15px;
    height: 15px;
  }
`;

const hasAttachments = (attachments) => attachments.length !== 0;

export default function ChatMessage(props) {
  const { isUserMessage, userMessage, createdAt, attachments } = props;
  return (
    <MainMessageWrapper userMessage={isUserMessage}>
      <MessageHeaderInfo>
        <MessageOwner>{ isUserMessage ? 'You' : 'Support' }</MessageOwner>
        <MessageDate>{ getFormattedTime(createdAt, 'D, MMM, HH:mm') }</MessageDate>
      </MessageHeaderInfo>
      <MessageWrapper isUserMessage={isUserMessage}>
        <MessageBody hasAttachments={hasAttachments(attachments)}>
          { userMessage }
        </MessageBody>
        { hasAttachments(attachments) &&
          <AttachmentsList>
            { attachments.map((a, i) => <Attachment key={i}>{a.name}</Attachment>) }
          </AttachmentsList>
        }
      </MessageWrapper>
    </MainMessageWrapper>
  );
}

ChatMessage.propTypes = {
  isUserMessage: bool,
  userMessage: string,
  createdAt: number,
  attachments: any,
};
