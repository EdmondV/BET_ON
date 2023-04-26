/* eslint-disable
  no-plusplus,
  consistent-return,
 */
import React from 'react';
import Modal from 'react-responsive-modal';
import CircularProgress from 'components/CircularProgress';
import PropTypes from 'prop-types';
import check from '../mocks/assets/explainer/check.png';
import bgImage0 from '../mocks/assets/explainer/Step-0@2x.png';
import bgImage1 from '../mocks/assets/explainer/Step-1@2x.png';
import bgImage2a from '../mocks/assets/explainer/Step-2a@2x.png';
import bgImage2b from '../mocks/assets/explainer/Step-2b@2x.png';
import bgImage3a from '../mocks/assets/explainer/Step-3a@2x.png';
import bgImage3b from '../mocks/assets/explainer/Step-3b@2x.png';
import bgImage3c from '../mocks/assets/explainer/Step-3c@2x.png';
import bgImage4 from '../mocks/assets/explainer/Step-4@2x.png';
import bgImage5 from '../mocks/assets/explainer/Step-5@2x.png';

import {
  ExplainerModalMain,
  ExplainerModalFooter,
  ProgressWrapper,
  CircleWrapper,
} from '../../LayoutStyles';

const getBgImage = (screen) => {
  switch (screen) {
    case 0:
      return { img: bgImage0, title: 'Welcome to the Bet on Chart tutorial', text: 'Here you can learn the game basics in 5 simple steps.' };
    case 1:
      return { img: bgImage1, title: 'This is the chart representing the team advantage in the match.', text: 'It moves up and down as the game progresses.' };
    case 2:
      return { img: bgImage2a, title: 'Here you can choose a time frame you wish to bet on.', text: '' };
    case 3:
      return { img: bgImage2b, title: 'These are the main betting buttons.', text: 'Adjust the size of the bet to your liking and press one of the buttons to make a bet.' };
    case 4:
      return { img: bgImage3a, title: 'Press the green button if you think', text: 'that BARCELONA si going to be closer to victory and the chart will be higher within the chosen time frame.' };
    case 5:
      return { img: bgImage3b, title: 'Press the orange button if you think', text: 'that REAL MADRID is going to be closer to victory and the chart will be lower within the chosen frame.' };
    case 6:
      return { img: bgImage3c, title: 'You can also Drag & Drop your bet on the chart', text: '' };
    case 7:
      return { img: bgImage4, title: 'This is the game\'s bank.', text: 'It contains all the bets that have been made during the match. Win and share the bank with your teammates.' };
    case 8:
      return { img: bgImage5, title: 'This is your potential payout amount.', text: 'In multiplayer mode the payout is dynamic, so it\'s up to you to decide, whether to back out or continue playing.' };
    default:
      return { img: bgImage0, title: '', text: '' };
  }
};

const progressData = [{ deadlineAt: 1, createdAt: 0 }, { deadlineAt: 3, createdAt: 1 }, { deadlineAt: 6, createdAt: 3 }, { deadlineAt: 7, createdAt: 6 }, { deadlineAt: 8, createdAt: 7 }];

class TutorModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      screen: 0,
      isOpen: this.props.isOpen,
    };
  }
  render() {
    const { screen, isOpen } = this.state;
    const { closeExplModal } = this.props;
    const currentInfo = getBgImage(screen);
    const cirlces = [];
    for (let i = 0; i < progressData.length; i++) {
      cirlces[i] = (<CircleWrapper key={progressData[i].deadlineAt}>
        <CircularProgress
          size={65}
          radius={31}
          strokeWidth={3}
          bgColor={screen < progressData[i].createdAt ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,.3)'}
          room={{ deadlineAt: progressData[i].deadlineAt, createdAt: progressData[i].createdAt }}
          currentTime={screen}
          strokeColor="#fff"
        />
        {screen < progressData[i].deadlineAt ? <span>{i + 1}</span> : <img src={`${check}`} alt="bgs" />}
      </CircleWrapper>);
    }
    return (
      <Modal
        classNames={{ modal: 'modal-expl' }}
        open={isOpen}
        onClose={() => null}
        little
      >
        <ProgressWrapper>
          {cirlces}
        </ProgressWrapper>
        <ExplainerModalMain style={{ backgroundImage: `url(${currentInfo.img})` }}>
          <div className="title">
            <h1>{currentInfo.title}</h1>
          </div>
          <div className="text">
            <h2>{currentInfo.text}</h2>
          </div>
        </ExplainerModalMain>
        <ExplainerModalFooter>
          <button
            style={{ display: screen === 8 ? 'none' : '' }}
            className="skip"
            onClick={() => {
              this.setState({ isOpen: false });
              localStorage.setItem('explModalOpen', true);
              closeExplModal();
            }}
          >Skip</button>
          <button style={{ display: screen === 8 ? 'none' : '' }} className="next" onClick={() => screen !== 8 && this.setState({ screen: screen + 1 })}>Continue</button>
          <button
            style={{ display: screen !== 8 ? 'none' : '' }}
            onClick={() => {
              this.setState({ isOpen: false });
              localStorage.setItem('explModalOpen', true);
              closeExplModal();
            }}
          >Start the game</button>
        </ExplainerModalFooter>
      </Modal>

    );
  }
}

TutorModal.propTypes = {
  isOpen: PropTypes.bool,
  closeExplModal: PropTypes.func,
};

export default TutorModal;
