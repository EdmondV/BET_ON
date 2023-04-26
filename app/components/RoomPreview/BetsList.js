import React from 'react';
import { bool, array } from 'prop-types';

import {
  BetsListWrapper,
  Bet,
} from './BetsListStyles';

export default class BetsList extends React.PureComponent { // eslint-disable-line
  render() {
    const { currentBets } = this.props;
    return (
      <BetsListWrapper compact={this.props.compact}>
        {currentBets && currentBets.map((bet) => (
          <Bet key={bet.id} bull={bet.team === 1} />
        ))}
      </BetsListWrapper>
    );
  }
}

BetsList.propTypes = {
  compact: bool,
  currentBets: array,
};
