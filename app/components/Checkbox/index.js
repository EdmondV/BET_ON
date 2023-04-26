import React from 'react';
import { string, object, func, bool, any } from 'prop-types';
import { fontSize, color, hexToRgb } from 'styles-constants';
import FaCheck from 'react-icons/lib/fa/check';

import styled from 'styled-components';
import squareIcon from './square.svg';
import checkIcon from './check.svg';

const Themes = {
  default: `
    display: inline-block;
    margin: 0 10px;
    opacity: 0.8;
    position: relative;
    > input {
      display: none;
      &:checked + label:before {
        content: "";
        background: url(${checkIcon}) center no-repeat;
        background-size: cover;
        width: 14px;
        height: 12px;
      }
    }
    > label {
      font-size: ${fontSize.small};
      display: inline-block;
      cursor: pointer;
      position: relative;
      margin-left: 20px;
      line-height: 1.2;
      &:before {
        content: "";
        background: url(${squareIcon}) center no-repeat;
        opacity: 0.8;
        font-size: ${fontSize.body};
        display: inline-block;
        position: absolute;
        top: 50%;
        margin-top: -5px;
        left: -20px;
        width: 12px;
        height: 12px;
      }
    }
  `,
  assetsList: `
    display: inline-block;
    margin: 0 10px;
    position: relative;
    input {
      display: none;
    }
    label {
      font-size: ${fontSize.small};
      display: inline-block;
      cursor: pointer;
      position: relative;
      margin-left: 20px;
      width: 16px;
      height: 16px;
      line-height: 1.25;
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border: 1px solid rgba(${hexToRgb('#fff')}, 0.8);
        border-radius: 0.2em;
      }
    }
  `,
};

const FaCheckStyles = {
  position: 'absolute',
  color: color.newSuccess,
  left: 0,
  right: 0,
  margin: '0 auto',
  top: '50%',
  transform: 'translateY(-50%)',
};

const CheckboxInput = styled.div`
  ${({ theme }) => Themes[theme]};
`;

export default class Checkbox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const customCss = this.props.customCss || {};
    return (
      <CheckboxInput className="checkbox" style={customCss} theme={this.props.theme || 'default'}>
        <input
          onChange={this.props.onClick}
          type="checkbox"
          id={this.props.id}
          checked={this.props.checked}
          name={this.props.name}
        />
        {/* eslint-disable */}
        {this.props.labelComponent ? this.props.labelComponent
          : <label className="checkbox-label" htmlFor={this.props.id}>{this.props.label}
            {(this.props.checked && this.props.theme === 'assetsList') && <FaCheck style={FaCheckStyles} />}
          </label>}
        {/* eslint-enable */}
      </CheckboxInput>
    );
  }
}

Checkbox.propTypes = {
  label: string,
  id: string,
  customCss: object,
  onClick: func,
  checked: bool,
  name: string,
  theme: string,
  labelComponent: any,
};
