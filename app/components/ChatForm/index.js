import React from 'react';
import { func, object } from 'prop-types';
import { FormattedMessage, m } from 'utils/intl';
import styled from 'styled-components';
import { hexToRgb, color, borderRadius, fontSize } from 'styles-constants';
import SvgIcon from 'components/SvgIcon';
import messages from 'containers/MainPage/messages';
import { browserName } from 'utils/browserDetection';

const ChatInputWrapper = styled.div`
  flex: 0 80px;
  border-top: 1px solid rgba(${hexToRgb('#ffffff')}, 0.2);
  position: relative;
  margin: 0 -10px;
  padding: 0 10px 5px;
  ${browserName() === 'firefox' && 'padding-bottom: 20px'};
`;

const SendMessageForm = styled.form`
  display: flex;
  align-items: flex-start;
`;

const MessageInputWrapper = styled.div`
  width: 200px;
  height: auto;
  font-size: ${fontSize.small};
  padding-right: 5px;

  .message {
    border-bottom: 2px solid ${color.primaryLighted};
    min-height: 40px;
    max-height: 150px;
    overflow-y: auto;
    padding-top: 15px;
    user-select: text; /* required for safari */

    &:before{
      content: '${m('ChatPanel.messagePlaceholder')}';
      position: absolute;
      top: 20px;
      left: 10px;
      color: ${color.grayFontColor};
      transition: all 300ms ease 0s;
    }

    &:focus, &:not(:empty){
      outline: none;
      border-bottom-color: #fff;

      &:before{
        top: 0;
        font-size: ${fontSize.extraSmall};
      }
    }
  }
`;

const SendIcon = styled.button`
  cursor: pointer;
  opacity: ${(p) => p.disabled ? 0.6 : 1};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg{
    fill: ${color.bullColor};
    width: 15px;
    margin: -3px 0 0 3px;
  }

  &:hover{
    background-color: rgba(0, 165, 38, 0.4);
  }
`;

const MakeBetTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  margin: 10px 30px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 5px 10px;
  border-radius: ${borderRadius.default};
`;

export class ChatForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onMessageInput(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onSubmitMessage();
    }
  }
  onSubmitMessage(e) {
    if (e) e.preventDefault();
    const { room, sendMessage } = this.props;
    const message = this.message.innerText;
    if ((this.props.room.myBets && !this.props.room.myBets.length) || !message.length) return;
    sendMessage({
      message,
      ts: room.data[room.data.length - 1].timestamp,
    });
    this.message.innerText = null;
  }
  render() {
    const { room } = this.props;
    const isNotAMember = room.myBets && !room.myBets.length;
    return (
      <ChatInputWrapper>
        {isNotAMember && <MakeBetTooltip>
          <FormattedMessage {...messages.makeBetChatTooltip} />
        </MakeBetTooltip>}
        <SendMessageForm onSubmit={(e) => this.onSubmitMessage(e)}>
          <MessageInputWrapper>
            <div // eslint-disable-line
              className="message"
              contentEditable
              onKeyPress={(e) => this.onMessageInput(e)}
              ref={(msg) => { this.message = msg; }}
            />
          </MessageInputWrapper>
          <SendIcon type="submit" disabled={isNotAMember}>
            <SvgIcon icon="sendChat" />
          </SendIcon>
        </SendMessageForm>
      </ChatInputWrapper>
    );
  }
}

export default ChatForm;

ChatForm.propTypes = {
  room: object,
  dispatch: func,
  sendMessage: func,
};
