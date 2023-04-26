import React from 'react';
import styled from 'styled-components';
import { func, object } from 'prop-types';

import { color } from 'styles-constants';

import Button from '../Button';
import Checkbox from '../Checkbox';

const NoticeWrapper = styled.div`
  display: flex;
  margin: 14px 0 4px;
  padding: 0 4px;
  flex-direction: column;
  z-index: 5;
`;

const StyledButton = styled(Button)`
  background-color: ${color.lightBlue};
  border-color: ${color.lightBlue};
  margin: 10px 0;
  &:hover {
    background-color: #457dbd;
    border-color: #457dbd;
  }
  &:disabled {
    background-color: #457dbd;
    border-color: #457dbd;
  }
`;

const StyledButtonWrapper = styled.div`
  margin: 0;
`;

export default class NoticeBet extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.setState({
      showNotice: true,
    });
  }
  toggleShowNotice(e) {
    this.setState({
      showNotice: !e.target.checked,
    });
  }
  makeBet() {
    this.props.makeBet();
    if (!this.state.showNotice) this.props.onToggleShowNotice(false);
  }
  render() {
    return (
      <NoticeWrapper>
        <span>This will make bet immediately</span>
        <StyledButtonWrapper>
          <StyledButton theme="noticeButton" onClick={() => this.makeBet()}>Submit</StyledButton>
        </StyledButtonWrapper>
        <Checkbox
          onClick={(e) => this.toggleShowNotice(e)}
          label="Don't show again"
          id={`showAgain-${this.props.room.id}`}
          customCss={{ margin: 0, paddingLeft: '1px' }}
        />
      </NoticeWrapper>
    );
  }
}

NoticeBet.propTypes = {
  makeBet: func,
  onToggleShowNotice: func,
  room: object,
};
