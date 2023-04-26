import React from 'react';
import { bool, object } from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'utils/intl';
import messages from 'global-messages';


const InfoWrapper = styled.div`
  position: absolute;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  margin: -50px auto 0 auto;
  border-top: none;
  display: flex;
  justify-content: space-between;
  bottom: 100%;
  left: 0;
  background: #000C2A;
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid #232c52;
`;

const InfoCol = styled.div`
  display: flex;
  text-align: center;
  padding: 10px;
  width: 33.3%;
  flex-direction: column;
  > span {
    display: block;
    width: 100%;
    text-align: center;
    &:first-child {
      font-size: 10px;
    }
    &:last-child {
      font-weight: 500;
    }
  }
`;

export default class InfoWinRoom extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { room, bullsWin } = this.props;
    const { myBet, myPayout, bullsCommission, bearsCommission, userWon } = room;
    return (
      <InfoWrapper>
        <InfoCol>
          <span><FormattedMessage {...messages.myBets} /></span>
          <span>ᗸ {myBet}</span>
        </InfoCol>
        <InfoCol>
          <span><FormattedMessage {...messages.payout} /></span>
          <span>ᗸ {userWon ? myPayout : 0}</span>
        </InfoCol>
        <InfoCol>
          <span><FormattedMessage {...messages.commission} /></span>
          <span>ᗸ {userWon && (bullsWin ? (bullsCommission || 0).toFixed(2) : (bearsCommission || 0).toFixed(2)) || 0}</span>
        </InfoCol>
      </InfoWrapper>
    );
  }
}

InfoWinRoom.propTypes = {
  room: object,
  bullsWin: bool,
};
