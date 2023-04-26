import React from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import { change } from 'redux-form';
import Input from 'components/Input';

const InputWrapper = styled.div`
  width: 100%;
  padding: 0 30px;
  position: relative;
  display: flex;
  > div, input {
    height: 35px;
  }
`;

const AmountButton = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: ${(props) => props.value === 'increment' ? 'auto' : '0'};
  right: ${(props) => props.value === 'increment' ? '0' : 'auto'};
  width: 30px;
  height: 100%;
  background: rgba(255,255,255,0.15);
  border-radius: ${(props) => props.value === 'increment' ? '0 5px 5px 0' : '5px 0 0 5px'};
  font-size: 20px;
  cursor: pointer;
  line-height: 32px;
`;

const numPlusCurrencyPattern = /[0-9]+[$]$|[0-9]/g;

const toCurrencyValue = (value, prev) => { // eslint-disable-line
  if (value === '' || value === '$' || !value) return '';
  const match = value.match(numPlusCurrencyPattern);
  if ((prev === null || prev === undefined) && value.match(numPlusCurrencyPattern)) return value;
  if (value.indexOf('$') > -1 && prev && prev.indexOf('$') > -1 && value.indexOf('$$') > -1) return prev;
  if (match && match.length > 1) return match.join('');
  if (match && value && match.length === 1) return match[0];
};

export default class AmountInput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  onBlurHandler(e) {
    const num = /\d+/g;
    const val = e.target.value;
    if (val && val.match) {
      let amountNum = val.match(num);
      amountNum = `$${parseInt(amountNum[0], 10)}`;
      setTimeout(() => this.props.dispatch(change('newRoom', 'bet', amountNum)));
    }
  }
  changeValue(increment) {
    const el = document.getElementById('amount_value');
    let bet;
    if (el) bet = el.value;
    const num = /\d+/g;
    if (!bet || !bet.match) bet = '$1';
    let amountNum = parseFloat(bet.match(num)[0]);
    const incrementer = amountNum === 1 ? 4 : 5;
    increment ? amountNum += incrementer : amountNum -= incrementer; // eslint-disable-line
    if (amountNum <= 0) amountNum = 1;
    this.props.dispatch({
      type: 'INPUT_AMOUNT',
      meta: {
        analytics: {
          type: `INPUT_AMOUNT_${amountNum}`,
          category: 'interface',
        },
      },
    });
    amountNum = `$${amountNum}`;
    this.props.dispatch(change('newRoom', 'bet', amountNum));
  }

  render() {
    return (
      <InputWrapper>
        <AmountButton value="decrement" onClick={() => { this.changeValue(false); }}>
          -
        </AmountButton>
        <Input
          placeholder={this.props.placeholder}
          name="bet"
          center
          required
          id="amount_value"
          normalize={toCurrencyValue}
          onBlur={(e) => this.onBlurHandler(e)}
        />
        <AmountButton value="increment" onClick={() => { this.changeValue(true); }}>
          +
        </AmountButton>
      </InputWrapper>
    );
  }
}

AmountInput.propTypes = {
  placeholder: string,
  dispatch: func,
};
