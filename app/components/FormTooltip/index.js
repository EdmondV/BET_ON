import React from 'react';
import styled, { keyframes } from 'styled-components';
import { node, bool, any, string } from 'prop-types';
import { hexToRgb } from 'styles-constants';

const Wrapper = styled.div`
  position: relative;
`;

const slideLeft = keyframes`
  { 
    0% { transform: translate3d(100%, 0, 0); opacity: 0; } 
    50% { opacity: 0.3; } 
    100% { opacity: 1; } 
  }
`;

const TooltipWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: inline-block;
`;

const TooltipBody = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  right: -105%;
  height: 100%;
  animation: ${slideLeft} 0.5s;
`;

const Tooltip = styled.div`
  position: absolute;
  color: #ffffff;
  font-size: 14px;
  top: 0;
  left: 0;
  width: ${(props) => props.wide ? '120%' : '100%'};
  height: 100%;
`;

const TooltipMessage = styled.span`
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  background-color: rgba(${hexToRgb('#C33630')}, 0.8);
  border-radius: 3px;
  padding: 7px 30px 7px 20px;
  text-align: left;
  &:before {
    content: '';
    position: absolute;
    border-top: 7px solid transparent;
    border-right: 7px solid rgba(${hexToRgb('#C33630')}, 0.8);
    border-bottom: 7px solid transparent;
    width: 0;
    height: 0;
    left: -7px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default class FormTooltip extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { show, children, component, message } = this.props;
    return (
      <Wrapper>
        {show && <TooltipWrapper>
          <TooltipBody>
            <Tooltip wide={this.props.wide}>
              {component && <TooltipMessage>{ component }</TooltipMessage>}
              {(!component && message) && <TooltipMessage><span> { message } </span></TooltipMessage>}
            </Tooltip>
          </TooltipBody>
        </TooltipWrapper>}
        {React.Children.toArray(children)}
      </Wrapper>
    );
  }
}

FormTooltip.propTypes = {
  children: node,
  component: any,
  message: string,
  show: bool,
  wide: bool,
};
