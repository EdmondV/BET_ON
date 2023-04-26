import React from 'react';
import { func, object, string } from 'prop-types';
import styled from 'styled-components';
import { icons } from './icons';

const StyledIcon = styled.span`
  width: ${(props) => props.width || '24px'};
  height: ${(props) => props.height || '24px'};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  vertical-align: middle;
`;

export default class Icon extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const image = icons[this.props.name];
    const width = this.props.width || '24px';
    const height = this.props.height || '24px';
    return image ? <div style={this.props.style}>
      <StyledIcon
        onClick={() => this.props.onClick && this.props.onClick()}
        style={{ backgroundImage: `url(${image})`, width, height }}
      />
    </div> : null;
  }
}

Icon.propTypes = {
  name: string,
  width: string,
  height: string,
  style: object,
  onClick: func,
};
