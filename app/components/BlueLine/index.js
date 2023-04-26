import React from 'react';
import { func, bool, object } from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'utils/intl';
import messages from './messages';

const LineWrapper = styled.div`
  display: block;
  background: #5273bd;
  border-radius: 15px;
  padding: 0 10px;
  margin: 20px auto 0;
  color: #ffffff;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  font-size: 12px;
  text-transform: uppercase;
`;

export default class BlueLine extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const customCss = this.props.customCss || {};
    return (
      <LineWrapper
        style={customCss}
        onClick={this.props.onHandleClick}
      >
        {this.props.currentMember ? <FormattedMessage {...messages.try_again} /> : <FormattedMessage {...messages.create_new_room} />}
      </LineWrapper>
    );
  }
}

BlueLine.propTypes = {
  onHandleClick: func,
  customCss: object,
  currentMember: bool,
};
