import React from 'react';
import { any, string, object, bool, func } from 'prop-types';
import styled from 'styled-components';
import { change } from 'redux-form';
import FaSortDesc from 'react-icons/lib/fa/sort-desc';
import Input from 'components/Input';
import StyledScrollbar from 'components/StyledScrollbar';
import { isClickedOutside } from '../../utils/domHelper';

const SelectInputWrapper = styled.div`
  position: relative;
  width: 48%;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
`;

const ArrowWrapper = styled.div`
  position: absolute;
  background: rgba(255,255,255,0.15);
  width: 30px;
  height: 100%;
  cursor: pointer;
  right: 0;
  top: 0;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
`;

const StyledSelectInput = styled.input`
  background-color: rgba(255,255,255,0.15);
  height: 30px;
  border-radius: 5px;
  position: relative;
  width: 100%;
  font-size: 14px;
  text-align: center;
  padding-right: 34px;
  padding-left: 12px;
`;

const ListOptions = styled.div`
  display: ${(props) => props.hidden ? 'none' : 'block'};
  width: 100%;
  background: #232c52;
  position: absolute;
  top: 0;
  z-index: 2;
  transform: translateY(-100%);
  height: 300px;
  overflow: hidden;
  .option {
    text-align: left;
    font-size: 12px;
    padding: 6px 6px 6px 14px;
    &:hover {
      background: #5273bd;
    }
  }
  
  .tr-scrollbar {
    max-height: 100%;
    .scrollarea-content {
      padding-right: 0!important;
    }
  }
`;

const FaDescStyles = {
  position: 'absolute',
  top: '40%',
  transform: 'translateY(-50%)',
  left: 0,
  right: 0,
  margin: '0 auto',
};


const StyledOption = styled.div``;

// TODO: change component/Input to support custom styles on return
const RenderField = ({ input, type, disabled, meta: { touched, error } }, ...props) => (
  <StyledSelectInput
    {...input}
    {...props}
    type={type}
    error={!!(touched && error)}
    disabled={disabled}
  />
);

RenderField.propTypes = {
  input: object,
  placeholder: string,
  type: string,
  meta: object,
  disabled: bool,
};

export default class SelectInput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.setState({
      hidden: true,
    });
  }
  componentDidMount() {
    document.addEventListener('click', this.documentClick);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.documentClick);
  }
  setValue = (val) => {
    this.props.dispatch(change('newRoom', 'asset', val));
  };
  documentClick = (e) => {
    if (!isClickedOutside(e.target, this) && !this.state.hidden) {
      this.toggleDropdown();
    }
  };
  toggleDropdown = () => {
    this.setState((prevState) => { // eslint-disable-line arrow-body-style
      return { hidden: !prevState.hidden };
    });
  };
  render() {
    return (
      <SelectInputWrapper>
        <InputWrapper onClick={() => this.toggleDropdown()}>
          <Input
            disabled
            type="text"
            component={RenderField}
            name="asset"
          />
          <ArrowWrapper>
            <FaSortDesc style={FaDescStyles} />
          </ArrowWrapper>
        </InputWrapper>
        <ListOptions hidden={this.state.hidden}>
          <StyledScrollbar theme="assetsList">
            {this.props.options.map((option, i) =>
              (<StyledOption
                className="option"
                key={i} // eslint-disable-line
                onClick={() => {
                  this.setValue(option);
                  this.props.onChange(option);
                  this.toggleDropdown();
                }}
              >
                {option}
              </StyledOption>)
            )}
          </StyledScrollbar>
        </ListOptions>
      </SelectInputWrapper>
    );
  }
}

SelectInput.propTypes = {
  options: any,
  onChange: func,
  dispatch: func,
};
