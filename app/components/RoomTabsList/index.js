import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StyledScrollbar from 'components/StyledScrollbar';
import RoomTab from '../RoomTab';

const StyledTabsList = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 60px;
  margin-top: 10px;
  .scrollarea-content {
    position: absolute!important;
    width: auto!important;
    display: flex!important;
  }

  .tr-scrollbar {
    width: 100%!important;
    height: 100%!important;
    position: absolute!important;
    .scrollbar-container {
      padding-left: 17px;
    }
  }
`;

const RightScrollHelper = styled.div`
  width: 10px;
  flex-shrink: 0;
`;

// const newBtnWidth = 90; // New room button

const TAB_SIZE = {
  XS: 55,
  S: 100,
  SM: 120,
  M: 240, // 140
  L: 160,
  XL: 180,
};

// const getTabSize = (preferredTabsSize) => {
//   switch (true) {
//     case preferredTabsSize > TAB_SIZE.XL:
//       return TAB_SIZE.XL;
//     case preferredTabsSize > TAB_SIZE.L:
//       return TAB_SIZE.L;
//     case preferredTabsSize > TAB_SIZE.M:
//       return TAB_SIZE.M;
//     case preferredTabsSize > TAB_SIZE.SM:
//       return TAB_SIZE.SM;
//     case preferredTabsSize > TAB_SIZE.S:
//       return TAB_SIZE.S;
//     default:
//       return TAB_SIZE.S;
//   }
// };

// const setTabSize = (tabsNumber, containerWidth) => {
//   if (!tabsNumber || !containerWidth) return TAB_SIZE.M;
//
//   const preferredTabsSize = ((containerWidth - (tabsNumber * 10)) - (newBtnWidth + 10)) / tabsNumber; // 10 is a margin of each item
//   return getTabSize(preferredTabsSize);
// };

export default class RoomTabsList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // rooms from roomsManager
    // ids[] of pinned rooms from mainPage reducer
    const { footballRooms } = this.props;
    // const width = setTabSize(4, this.state.containerWidth);
    return (
      <StyledTabsList>
        <StyledScrollbar horizontal theme="roomTabsList" returnChildren>
          {footballRooms
            .map((r) => (
              <RoomTab
                key={r.id}
                width={TAB_SIZE.M}
                onPinTab={() => {}}
                room={r}
              />))}
          <RightScrollHelper />
        </StyledScrollbar>
      </StyledTabsList>
    );
  }
}

RoomTabsList.propTypes = {
  footballRooms: PropTypes.array,
};
