import React from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';

import {
  ModalMain,
  ModalFooter,
  BackgroundImg,
} from '../../LayoutStyles';
import modalBgImage from '../mocks/assets/popup_bg.jpg';
import TeamLogo from '../TeamLogo/TeamLogo';

class GameResultModal extends React.PureComponent {
  render() {
    const { isEndGameModalOpen, totalResult, room, closeModal } = this.props;
    return (
      <Modal
        classNames={{ modal: 'modal-foot', closeIcon: 'modal-close-button' }}
        open={isEndGameModalOpen}
        onClose={closeModal}
        little
      >
        <BackgroundImg style={{ backgroundImage: `url(${modalBgImage})` }} />
        <ModalMain>
          <div className="rows">
            <div className="left"><TeamLogo name={room.teamA.name.toLowerCase()} /></div>
            <div className="center">
              <h2>ROUND IS OVER</h2>
              <span className="total-bank">Total bank</span>
              <br />
              <span className="bank-sum">$ {totalResult.total}</span>
            </div>
            <div className="right"><TeamLogo name={room.teamB.name.toLowerCase()} /></div>
          </div>
          <div className="rows">
            <div className="left">{totalResult.totalPlayersA}</div>
            <div className="center">Number of players</div>
            <div className="right">{totalResult.totalPlayersB}</div>
          </div>
          <div className="rows">
            <div className="left">{totalResult.betsA}</div>
            <div className="center">Number of bets</div>
            <div className="right">{totalResult.betsB}</div>
          </div>
          <div className="rows">
            <div className="left">{totalResult.wonBetsA}</div>
            <div className="center">Bets won</div>
            <div className="right">{totalResult.wonBetsB}</div>
          </div>
        </ModalMain>
        <ModalFooter>
          <span>Your bets<span className="sum">$ {totalResult.yourBets}</span></span><span>Your winnings<span className="sum"> $ {totalResult.yourWinning}</span></span>
        </ModalFooter>
      </Modal>
    );
  }
}

GameResultModal.propTypes = {
  isEndGameModalOpen: PropTypes.bool,
  totalResult: PropTypes.object,
  room: PropTypes.object,
  closeModal: PropTypes.func,
};

export default GameResultModal;
