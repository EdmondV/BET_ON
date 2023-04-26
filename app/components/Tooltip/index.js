import React from 'react';
import { object } from 'prop-types';
import { fontSize } from 'styles-constants';

import { FormattedMessage } from 'utils/intl';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  > span {
    width: 180px;
    height: auto;
    position: relative;
    display: inline-flex;
    padding: 10px;
    background: #823232;
    font-size: ${fontSize.small};
    text-align: left;
    border-radius: 2px;
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-right: 10px solid #823232;
      border-bottom: 10px solid transparent;
      left: -8px;
      top: 50%;
      margin-top: -10px;
    }
  }
`;

export default class Tooltip extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const customCss = this.props.customCss || {};
    return (
      <Wrapper style={customCss}>
        <span><FormattedMessage id="agreeWithPolicy" /></span>
      </Wrapper>
    );
  }
}

Tooltip.propTypes = {
  customCss: object,
};

