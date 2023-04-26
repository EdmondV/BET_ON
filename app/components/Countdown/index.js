import React from 'react';
import { number } from 'prop-types';
import { getCountdownValue } from 'utils/time';

export default class Countdown extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    timeLeft: number,
  };

  render() {
    return (
      <div>{getCountdownValue(Math.round(this.props.timeLeft / 1000))}</div>
    );
  }
}
