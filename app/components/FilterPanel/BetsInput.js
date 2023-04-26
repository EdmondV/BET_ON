import React from 'react';
import styled from 'styled-components';
import { flex, fontSize, fontWeight, fontFamily } from 'styles-constants';
import Input from 'components/Input';

const BetsInputWrapper = styled.div`
  margin-top: 21px;
  flex: 2;
`;

const InputsWrapper = styled.div`
  ${flex('space-between')};
`;

const StyledHeading = styled.div`
  text-align: left;
  opacity: 0.8;
  font-size: ${fontSize.body};
  font-weight: ${fontWeight.regular};
`;

const InputWrapper = styled.div`
  flex: 0 40%;
  margin-top: 14px;
  position: relative;
  input {
    padding-left: 14px;
    font-size: 14px;
  }
  &:before {
    content: 'ᗸ ';
    position: absolute;
    line-height: 1;
    left: 0;
    bottom: 8px;
    font-size: 14px;
    font-family: ${fontFamily.heading};
    transition: visibility 200ms ease-out;
  }
`;

const parse = (value, prev) => {
  const num = new RegExp('^[0-9]+$');
  if (value === '') return value;
  if (value.match(num)) return (parseInt(value, 10));
  return prev;
};

export default class BetsInput extends React.PureComponent { // eslint-disable-line
  render() {
    return (
      <BetsInputWrapper>
        <StyledHeading>Bets: </StyledHeading>
        <InputsWrapper>
          <InputWrapper>
            <Input
              name="minBet"
              label="From"
              customActive
              normalize={parse}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              name="maxBet"
              label="To"
              customActive
              normalize={parse}
            />
          </InputWrapper>
        </InputsWrapper>
      </BetsInputWrapper>
    );
  }
}
