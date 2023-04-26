import React from 'react';
import { any, bool, func, number, object } from 'prop-types';
import ChatMessage from '../../../components/ChatMessage';
import ChatForm from '../../../components/ChatForm';
import StyledScrollbar from '../../../components/StyledScrollbar';
import { ChatWrapper, MessagesWrapper } from './RightPanelStyles';
// import { browserName } from 'utils/browserDetection';

export default class ChatPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.setState({
      messages: this.props.messages,
      updateScroll: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { messages } = nextProps;
    if (this.props.messages && this.props.messages.length !== messages.length) {
      this.setState({
        messages,
        updateScroll: true,
      });
    } else if (this.props.messages && this.props.messages.length === messages.length) {
      this.setState({
        messages,
        updateScroll: false,
      });
    }
  }

  render() {
    const { messages, room, sendMessage } = this.props;
    return (
      <ChatWrapper open={this.props.chatOpen} width={this.props.width}>
        <MessagesWrapper>
          <StyledScrollbar theme="chat" scrollBottom updateScroll={this.state.updateScroll}>
            {
              messages.map((message) =>
                (<ChatMessage
                  key={message.id}
                  message={message.message}
                  time={message.timestamp}
                  currentUser={message.user}
                  username={message.username}
                  avatar={message.avatar}
                  // todo: need live socket update of room after bet
                  avatarName={message.username.substring(0, 2)}
                />)
              )
            }
          </StyledScrollbar>
        </MessagesWrapper>
        <ChatForm sendMessage={sendMessage} room={room} />
      </ChatWrapper>
    );
  }
}

ChatPanel.propTypes = {
  chatOpen: bool,
  messages: any,
  width: number,
  room: object,
  sendMessage: func,
};
