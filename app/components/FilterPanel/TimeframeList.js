import React from 'react';
import styled from 'styled-components';
import { fontWeight, fontSize, flex, letterSpacing } from 'styles-constants';
import { array, func } from 'prop-types';
import Checkbox from 'components/Checkbox';
import { TIMEFRAMES_IN_SECONDS } from 'constants/room';

const TimeframesWrapper = styled.div``;

const Heading = styled.div`
  text-align: left;
  opacity: 0.8;
  font-size: ${fontSize.body};
  font-weight: ${fontWeight.regular};
`;

const InputsWrapper = styled.div`
  ${flex(null, 'center')};
  margin-top: 14px;
  .checkbox-wrapper {
    .checkbox {
      margin: 0;
    }
    &:first-child {
      align-items: flex-start;
      .checkbox {
        padding-left: 2px;
      }
    }
    &:nth-child(2) {
      padding-right: 4.5%;
    }
    &:nth-child(3) {
      padding-left: 4.5%;
    }
    &:nth-child(4) {
      align-items: flex-end;
      .checkbox {
        padding-right: 2px;
      }
    }
  }
`;

const ListItemWrapper = styled.div`
  ${flex('center', null, 'column')};
  flex: 0 25%;
  flex-wrap: nowrap;
  .checkbox-label {
    margin-left: 0;
  }
`;

const StyledChechboxTitle = styled.div`
  letter-spacing: ${letterSpacing.medium};
  margin-top: 2px;
  cursor: pointer;
`;

const CheckBoxWrapper = styled.span`
  cursor: pointer;
`;

const Timeframes = ({ timeframes, checkedTimeframes, toggleTimeframe }) => (
  <InputsWrapper>
    { timeframes.map((t) => (
      <ListItemWrapper className="checkbox-wrapper" key={t}>
        <CheckBoxWrapper onClick={() => { toggleTimeframe(t); }}>
          <Checkbox name={`${t}`} checked={checkedTimeframes.includes(t)} theme="assetsList" />
        </CheckBoxWrapper>
        <StyledChechboxTitle onClick={() => { toggleTimeframe(t); }}>{`${parseInt(t, 10) / 60}m`}</StyledChechboxTitle>
      </ListItemWrapper>
    )) }
  </InputsWrapper>
);

Timeframes.propTypes = {
  timeframes: array,
  checkedTimeframes: array,
  toggleTimeframe: func,
};

export default class TimeframeList extends React.PureComponent { // eslint-disable-line
  render() {
    const { toggleTimeframe, checkedTimeframes } = this.props;
    return (
      <TimeframesWrapper>
        <Heading>Time</Heading>
        <Timeframes checkedTimeframes={checkedTimeframes} toggleTimeframe={toggleTimeframe} timeframes={TIMEFRAMES_IN_SECONDS} />
      </TimeframesWrapper>
    );
  }
}

TimeframeList.propTypes = {
  toggleTimeframe: func,
  checkedTimeframes: array,
};
