import React from 'react';
import PropTypes from 'prop-types';
import RoomTabsList from '../../../components/RoomTabsList';
import { RoomTabsWrapper } from './HeaderStyles';

export class TopPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { rooms } = this.props;

    return (
      <RoomTabsWrapper>
        <RoomTabsList footballRooms={rooms} />
      </RoomTabsWrapper>
    );
  }
}

TopPanel.propTypes = {
  rooms: PropTypes.any,
};

export default TopPanel;
