import React from 'react';
import { func, bool, instanceOf } from 'prop-types';
import styled from 'styled-components';
import { fontSize, color, hexToRgb } from 'styles-constants';
import Checkbox from 'components/Checkbox';
import { m } from 'utils/intl';
import RoomManager from '../../../modules/rooms/RoomManager';

const ChartFooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${fontSize.body};
  height: 40px;
  border-bottom: 1px solid rgba(${color.primaryLighted}, 0.8);
  white-space: nowrap;
  background: linear-gradient(to bottom, rgba(255,255,255,0.05) 45%, transparent 45%, transparent 100%);
  color: rgba(${hexToRgb('#ffffff')}, 0.8);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const BlockBtn = styled.div`
  display: flex;
`;

const BlockCheckbox = styled.div`
  display: flex;
  align-items: center;
`;

export class FooterChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { roomManager } = this.props;
    return (
      <ChartFooterWrapper>
        <BlockBtn />
        <BlockCheckbox>
          <Checkbox
            label={m('global.smooth')}
            id="smooth"
            onClick={() => this.props.onToggleSmooth(!this.props.smoothDisabled)}
            checked={!this.props.smoothDisabled}
          />
          <Checkbox
            label={m('global.showBets')}
            id="showBets"
            onClick={() => this.props.onToggleBet(!this.props.showBets)}
            checked={this.props.showBets}
          />
          <Checkbox
            onClick={() => this.props.onPinTab(roomManager.active.id, false)}
            label={m('global.pinTab')}
            id="pinTab"
            checked={roomManager.tabs.includes(roomManager.active.id)}
          />
        </BlockCheckbox>
      </ChartFooterWrapper>
    );
  }
}

FooterChart.propTypes = {
  onPinTab: func,
  roomManager: instanceOf(RoomManager).isRequired,
  showBets: bool,
  smoothDisabled: bool,
  onToggleBet: func,
  onToggleSmooth: func,
};
