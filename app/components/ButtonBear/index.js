import React from 'react';
import { object, func, bool } from 'prop-types';
import styled from 'styled-components';
import { fontSize } from 'styles-constants';
import AnimatedNumber from 'react-animated-number';
import { FormattedMessage } from 'utils/intl';
import messages from 'global-messages';

import btnBear from './btn-bear.svg';


const ButtonWrapper = styled.button`
  background-color: rgba(255, 138, 0, 0.8);
  right: 10px;
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
    box-shadow: 0 -1px 16px 10px rgba(255, 138, 0, 0.5);
    background-color: rgba(255, 138, 0, 1);
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 50%;
    width: 80px;
    margin-left: -40px;
    height: 80px;
    background: url(${btnBear}) center no-repeat;
    background-size: contain;
  }
  > div {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin-top: 10px;
    > span {
      display: block;
    }
  }
  .label {
    font-weight: 300;
    margin-bottom: 1px;
  }
`;

export default class ButtonBear extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
                value={room ? room.nextBearsPayout : 0}
                formatValue={(n) => (n && n.toFixed) ? n.toFixed(2) : 0}
              />
            </span>
          </div>
        }
        {newRoom &&
        <div>
          <span><FormattedMessage {...messages.startForBears} /></span>
        </div>
        }
      </ButtonWrapper>
    );
  }
}

ButtonBear.propTypes = {
  customCss: object,
  room: object,
  onClick: func,
  newRoom: bool,
  onMouseEnter: func,
  onMouseLeave: func,
};
