import React from 'react';
import { func, bool } from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { form, space, fontSize, fontWeight, flex, color } from 'styles-constants';
import { m } from 'utils/intl';
import Label from 'components/Input/Label';
import SvgIcon from 'components/SvgIcon';


const loadingAnimation = keyframes`
  0% {
    width: 0;
    transform: translateX(0);
  }

  10% {
    width: 0;
  }

  70% {
    width: 100%;
    transform: translateX(0);
  }

  75% {
    transform: translateX(0);
  }

  100% {
    width: 100%;
    transform: translateX(100%);
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  border-bottom: ${form.input.borderInactiveColor} 2px solid;
  margin: 0 0 ${space(4)} 0;
  padding-top: 10px;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 100%;
    height: 2px;
    border-radius: 0 0 2px 2px;
    overflow: hidden;
    background: ${form.input.borderActiveColor};
    width: ${(p) => p.active ? 100 : 0}%;
    transition: width 200ms ease-out;
    z-index: 0;
  }
  &:before {
    content: '';
    display: ${({ loading }) => loading ? 'block' : 'none'};
    position: absolute;
    left: 0;
    top: 100%;
    height: 2px;
    border-radius: 0 0 2px 2px;
    overflow: hidden;
    transition: width 200ms ease-out;
    background-color: ${color.newSuccess};
    animation: 1s ${loadingAnimation} infinite;
    animation-fill-mode: forwards;
    z-index: 1;
  }
  .label {
    margin-top: ${({ active }) => active ? '0' : '-7px'};
  }
`;

const InputIcon = styled.div`
  height: 35px;
  ${flex(null, 'center')};
  padding-top: 2px;
  opacity: ${({ active }) => active ? '1' : '0.6'};
  svg {
    width: 18px;
    fill: #ffffff;
  }
`;

const StyledSearchInput = styled.input`
  display: block;
  width: 100%;
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.body};
  padding-right: ${space()}; /* hiding text if long value */
`;

const isActive = ({ active, value }) => active || value.length;

export default class SearchInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      value: '',
    };
  }

  /**
   * Cancel rooms search in props on unmount
   */
  componentWillUnmount() {
    if (this.state.value && this.props.roomsActiveSearch) this.props.dispatch({ type: 'CANCEL_ROOMS_SEARCH' });
  }
  onFocusToggle = () => {
    this.setState({ active: !this.state.active });
  }
  onInput = (e) => {
    this.setState({ value: e.target.value });
  }
  render() {
    return (
      <InputWrapper loading={this.props.loading} active={isActive(this.state)}>
        <Label className="label" active={isActive(this.state)} text="">{m('Search.SearchInput')}</Label>
        <StyledSearchInput
          onChange={this.props.onSearchInputChange}
          onFocus={this.onFocusToggle}
          onBlur={this.onFocusToggle}
          onInput={this.onInput}
          type="text"
        />
        <InputIcon active={isActive(this.state)}>
          <SvgIcon icon="search" />
        </InputIcon>
      </InputWrapper>
    );
  }
}

SearchInput.propTypes = {
  onSearchInputChange: func,
  loading: bool,
  roomsActiveSearch: bool,
  dispatch: func,
};
