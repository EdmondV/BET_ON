import styled from 'styled-components';
import { color, form } from 'styles-constants';

/* eslint-disable no-nested-ternary */
const DefaultInputWrapper = styled.div`
  color: #fff;
  display: block;
  font-weight: 300;
  width: 100%;
  border-bottom: ${(p) => p.error ? color.danger : p.noBorder ? 'transparent' : form.input.borderInactiveColor} 2px solid;
  position: relative;
  padding-top: ${(p) => p.label ? `${form.input.focusedLabelHeight}px` : 0};
  text-align: left;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 100%;
    height: 2px;
    border-radius: 0 0 2px 2px;
    overflow: hidden;
    background: ${(p) => p.error ? color.danger : form.input.borderActiveColor};
    width: ${(p) => p.active ? 100 : 0}%;
    transition: width 200ms ease-out;
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: #fff;
    transition: background-color 500000000s ease-in-out 0s;
  }

  
  input, input:active, input:focus {
    width: 100%;
    font-weight: 300;
    border: 0;
    font-size: ${`${form.input.fontSize}px`};
    line-height: ${`${form.input.lineHeight}px`};
    background: none;
    z-index: 2;
    position: relative;
    box-shadow: none;
    outline: none;
    text-align: ${(p) => p.center ? 'center' : 'left'};
  }
  
  textarea {
    width: 100%;
    font-weight: 300;
    border: 0;
    font-size: ${`${form.input.fontSize}px`};
    line-height: ${`${form.input.lineHeight}px`};
    background: none;
    z-index: 2;
    position: relative;
  }
`;

export default DefaultInputWrapper;
