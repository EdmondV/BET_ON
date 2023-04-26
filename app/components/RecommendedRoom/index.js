import React from 'react';
import { func, any, object, instanceOf, bool } from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { FormattedMessage } from 'utils/intl';

import { redirectToRoomCreate } from 'utils/redirects';
import { fontSize, color, zIndex, space } from 'styles-constants';
import Icon from 'components/Icon';
import { hideRecommended, recommendedRoom } from 'containers/MainPage/actions';

import messages from './messages';
import RoomPreview from '../RoomPreview';
import RoomManager from '../../modules/rooms/RoomManager';

const fadein = keyframes`{ from { opacity: 0; } to { opacity: 0.8; } }`;

const OverlayBg = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  background: rgba(0, 12, 42, 0.8);
  z-index: ${zIndex.recommendedRooms};
  opacity: 1;
  animation: 0.5s 0s 1 ease-in ${fadein};
`;

const styledRoomPreviewWrapper = {
  display: 'inline-flex',
  padding: space(2),
  margin: '30px auto 0 auto',
};

const RecommendedWrapper = styled.div`
  width: 260px;
  height: auto;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
  > span {
    font-size: ${fontSize.heading};
    text-align: center;
    color: ${color.success};
    position: relative;
  }
`;
const IconCross = styled.div`
  position: absolute;
  top: 40px;
  left: 100%;
  cursor: pointer;
  z-index: 4;
`;

const NewLink = styled.span`
  background: #5273bd;
  color: #ffffff;
  padding: 2px;
  cursor: pointer;
`;

class RecommendedRoom extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillReceiveProps({ roomManager, recommendedFetching }) {
    const { recommendedRoomId } = roomManager;
    const rooms = roomManager.rooms.getRooms();
    const room = rooms.find((r) => r.id === recommendedRoomId);

    if (recommendedRoomId && room && !recommendedFetching) {
      const { timeLeftDeadline } = room;
      if (timeLeftDeadline !== undefined && timeLeftDeadline <= 0) {
        this.props.getRecommendedRoom();
      }
    }
  }

  render() {
    const { onHideRecommended, roomManager } = this.props;
    const { recommendedRoomId } = roomManager;
    const rooms = roomManager.rooms.getRooms();
    const room = rooms.find((r) => r.id === recommendedRoomId);
    return (
      <OverlayBg>
        {(!room || !recommendedRoomId) &&
          <RecommendedWrapper>
            <span>Sorry, no rooms available at the moment. Feel free to <NewLink onClick={redirectToRoomCreate}>create a new one</NewLink> yourself!</span>
            <IconCross>
              <Icon
                onClick={() => onHideRecommended()}
                width="30px"
                height="30px"
                name="cross"
              />
            </IconCross>
          </RecommendedWrapper>}
        {(recommendedRoomId && room) && <RecommendedWrapper>
          <span><FormattedMessage {...messages.recommended_for_you} />
            <IconCross>
              <Icon
                onClick={() => onHideRecommended()}
                width="30px"
                height="30px"
                name="cross"
              />
            </IconCross>
          </span>
          <div>
            <RoomPreview
              customCss={styledRoomPreviewWrapper}
              key={room.id}
              room={room}
              params={this.props.params}
              redShadow={room.timeLeftDeadline < 6000}
              showRecommended
              showChartPreview
            />
          </div>
        </RecommendedWrapper>}
      </OverlayBg>
    );
  }
}

RecommendedRoom.propTypes = {
  onHideRecommended: func,
  room: any,
  getRecommendedRoom: func,
  params: object,
  roomManager: instanceOf(RoomManager),
  recommendedFetching: bool,
  dispatch: func,
};

const mapDispatchToProps = (dispatch) => ({
  onHideRecommended: () => dispatch(hideRecommended()),
  getRecommendedRoom: () => dispatch(recommendedRoom.request()),
  dispatch,
});

export default connect(null, mapDispatchToProps)(RecommendedRoom);
