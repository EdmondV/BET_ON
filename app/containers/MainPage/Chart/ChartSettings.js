import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SettingsButton from '../../../containers/MainPage/FootballPage/mocks/assets/settings_button.png';
import { color } from '../../../styles-constants';

export const ChartSettingsWrapper = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 40px;
  left: 20px;
  z-index: 4;
  transition: bottom 300ms;
`;

export const ChartSettingsIcon = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  padding: 30%;
  background: rgba(35, 44, 51, 0.9);
  border-radius: 50%;
  opacity: ${({ show }) => show ? 1 : 0.8};
  img {
    width: 100%;
    height: 100%;
  }
  :hover {
    opacity: 1;
    transition: transform 1s ease-out;
    transform: rotate(320deg);
  }
`;

export const ChartSettingsPopup = styled.div`
  min-width: 100px;
  margin-left: 50px;
  text-align: left;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  opacity: ${({ show }) => show ? 1 : 0};
  top: -3px;
`;

export const PopupItem = styled.div`
  display: block;
  text-align: left;
  width: 100%;
  padding: 1px 0;
  color: ${({ active }) => active ? color.mainFontColor : color.grayFontColor};
  letter-spacing: 1px;
  font-size: 10px;
  .text {
    position: absolute;
    transform: translateX(5px);
  }
  .toggle {
    width: 15px;
    height: 8px;
    border: 1px solid white;
    display: inline-block;
    border-radius: 1px;
    margin: 0 5px;
    :before {
      content: '';
      position: absolute;
      margin: 1px;
      width: 6px;
      height: 4px;
      background: ${({ active }) => active ? color.newSuccess : color.roomLoss};
      transition: transform 0.3s ease-out;
      transform: ${({ active }) => active ? 'translateX(5px)' : 'translateX(0px)'};
      z-index: 5;
    }
  }
`;

export class ChartSettings extends React.PureComponent {
  static propTypes = {
    isBetsShow: PropTypes.bool,
    isMyBetsShow: PropTypes.bool,
    isEventsShow: PropTypes.bool,
    isWidgetShow: PropTypes.bool,
    toggleChartEvents: PropTypes.func,
    toggleWidgetWrapper: PropTypes.func,
  }
  componentWillMount() {
    this.setState({ isOpen: false });
  }
  render() {
    const { isBetsShow, isEventsShow, isMyBetsShow, isWidgetShow, toggleChartEvents, toggleWidgetWrapper } = this.props;
    const { isOpen } = this.state;
    return (
      <ChartSettingsWrapper>
        <ChartSettingsIcon show={isOpen} onClick={() => this.setState({ isOpen: !isOpen })}>
          <img src={SettingsButton} alt="settings" />
        </ChartSettingsIcon>
        <ChartSettingsPopup show={isOpen} className="popup">
          <PopupItem active={isMyBetsShow} onClick={() => toggleChartEvents('isMyBetsShow', !isMyBetsShow)}><span className="toggle" /><span className="text">MY BETS</span></PopupItem>
          <PopupItem active={isBetsShow} onClick={() => toggleChartEvents('isBetsShow', !isBetsShow)}><span className="toggle" /><span className="text">OTHER BETS</span></PopupItem>
          <PopupItem active={isEventsShow} onClick={() => toggleChartEvents('isEventsShow', !isEventsShow)}><span className="toggle" /><span className="text">EVENTS</span></PopupItem>
          <PopupItem active={isWidgetShow} onClick={() => toggleWidgetWrapper(!isWidgetShow)}><span className="toggle" /><span className="text">WIDGET</span></PopupItem>
        </ChartSettingsPopup>
      </ChartSettingsWrapper>
    );
  }
}

export default ChartSettings;
