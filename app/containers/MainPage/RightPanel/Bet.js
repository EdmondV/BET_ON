import React from 'react';
import { object } from 'prop-types';
import AnimatedNumber from 'react-animated-number';
import Avatar from '../../../components/Avatar';
import {
  AvatarWrapper,
  BetWrapper,
  PlayerWrapper,
  PlayerBet,
} from './RightPanelStyles';

const avatarStyles = () => ({
  width: '30px',
  height: '30px',
  fontSize: '10px',
  marginTop: '2px',
});

class Bet extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { bet } = this.props;
    return (
      <BetWrapper>
        <PlayerWrapper>
          <AvatarWrapper>
            <Avatar
              customCss={avatarStyles(bet && bet.avatar)}
              initials={bet && bet.name && bet.name.substring(0, 2)}
              avatar={bet && bet.avatar}
              name={bet && bet.name}
            />
          </AvatarWrapper>
          <span>{bet.name}</span>
        </PlayerWrapper>
        <PlayerBet team={bet.team}>
          $ <AnimatedNumber
            component="text"
            initialValue={0}
            duration={300}
            formatValue={(n) => (n && n.toFixed) ? n.toFixed(2) / 1 : 0}
            value={bet.bet}
          />
        </PlayerBet>
      </BetWrapper>
    );
  }
}

Bet.propTypes = {
  bet: object,
};

export default Bet;
