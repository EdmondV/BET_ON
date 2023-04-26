import React from 'react';
import styled from 'styled-components';
import { bool, func } from 'prop-types';
import IconEye from './eye.svg';

const IconWrapper = styled.div`
  position: absolute;
  height: 15px;
  width: 20px;
  z-index: 1000;
  background: url(${IconEye}) no-repeat;
  right: 0;
  bottom: 10px;
  opacity: ${(props) => props.active ? '1' : '0.5'};
  cursor: pointer;
  transition: opacity 300ms;
  &:hover {
    opacity: 1;
  }
`;

export class IconShowPassword extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <IconWrapper
        active={this.props.showPassword}
        onClick={this.props.onClick}
      />
    );
  }
}


IconShowPassword.propTypes = {
  showPassword: bool,
  onClick: func,
};

export default IconShowPassword;
