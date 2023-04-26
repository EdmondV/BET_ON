import React from 'react';
import { any, string, func, object, bool } from 'prop-types';
import { change } from 'redux-form';
import Input from 'components/Input';
import styled from 'styled-components';
import { convertTimeframe } from 'utils/math';
import FaSortDesc from 'react-icons/lib/fa/sort-desc';
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
  > div {
    text-align: left;
    font-size: 12px;
    padding: 6px 6px 6px 14px;
    &:hover {
      background: #5273bd;
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
  type: string,
  meta: object,
  disabled: bool,
};

export default class PeriodsInput extends React.PureComponent {
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
    this.props.getAvailableAssets(
      { timeframe: convertTimeframe(val) + 60 }
    );
    this.props.dispatch(change('newRoom', 'expired', val));
    this.props.dispatch({
      type: 'SELECT_PERIOD',
      meta: {
        analytics: {
          type: `SELECT_PERIOD_${val}`,
          category: 'interface',
        },
      },
    });
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
        <InputWrapper onClick={this.toggleDropdown}>
          <Input
            disabled
            type="text"
            name="expired"
            component={RenderField}
          />
          <ArrowWrapper>
            <FaSortDesc style={FaDescStyles} />
          </ArrowWrapper>
        </InputWrapper>
        <ListOptions hidden={this.state.hidden}>
          {this.props.options.map((option, i) =>
            <StyledOption key={i} onClick={() => { this.setValue(option); this.toggleDropdown(); }}>{option}</StyledOption> // eslint-disable-line
          )}
        </ListOptions>
      </SelectInputWrapper>
    );
  }
}

PeriodsInput.propTypes = {
  options: any,
  getAvailableAssets: func,
  dispatch: func,
};
