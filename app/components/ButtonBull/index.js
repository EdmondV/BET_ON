import React from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';
import { fontSize } from 'styles-constants';
import AnimatedNumber from 'react-animated-number';
import { FormattedMessage } from 'utils/intl';
import messages from 'global-messages';

import btnBull from './btn-bull.svg';

const ButtonWrapper = styled.button`
  background-color: rgba(0, 165, 38, 0.8);
  left: 10px;
  position: absolute;
  text-align: center;
  font-size: ${fontSize.body};
  top: 10px;
  bottom: 10px;
  width: 90px;
  border-radius: 5px;
  transition: 0.2s transform;
  cursor: pointer;
  z-index: 100;
  &:hover {
    box-shadow: 0 -1px 16px 10px rgba(0, 165, 38, 0.5);
    background-color: rgba(0, 165, 38, 1);
  }
  &:before {
    content: '';
    position: absolute;
    top: 3px;
    width: 80px;
    height: 80px;
    left: 50%;
    margin-left: -40px;
    background: url(${btnBull}) center no-repeat;
    background-size: contain;
  }
  > div {
    margin-top: 90px;
    > span {
      display: block;
    }
  }
  
  .label {
    font-weight: 300;
    margin-bottom: 1px;
  }
`;


export default class ButtonBull extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { onClick, customCss, room, newRoom, onMouseEnter, onMouseLeave } = this.props;
    return (
      <ButtonWrapper style={customCss} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {!newRoom &&
          <div>
            <div className="label"><FormattedMessage {...messages.payout} /></div>
            <span>
                $
                <AnimatedNumber
                  component="text"
                  initialValue={0}
                  duration={300}
                  value={room ? room.nextBullsPayout : 0}
                  formatValue={(n) => (n && n.toFixed) ? n.toFixed(2) : 0}
                />
            </span>
          </div>}
        {newRoom &&
          <div>
            <span><FormattedMessage {...messages.startForBulls} /></span>
          </div>}
      </ButtonWrapper>
    );
  }
}

ButtonBull.propTypes = {
  customCss: object,
  room: object,
  onClick: func,
  onMouseEnter: func,
  onMouseLeave: func,
  newRoom: bool,
};
