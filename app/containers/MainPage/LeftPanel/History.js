import React from 'react';
import { func, string, any, bool, object } from 'prop-types';
import styled from 'styled-components';
import Waypoint from 'react-waypoint';
import { FormattedMessage } from 'utils/intl';
import LeftPanelHeader from 'components/LeftPanelHeader';
import Loader from 'components/Loader';
import Button from 'components/Button/StyledButton';
import { redirectToRoomCreate } from 'utils/redirects';
import RoomTabHistory from 'components/RoomTabHistory';
import Scrollbar from 'components/StyledScrollbar';
import { flex } from 'styles-constants';

import messages from './messages';

const HistoryPanelWrapper = styled.div`
  padding-bottom: 20px;
`;
const ScrollWrapper = styled.div`
  overflow: hidden;
  position: relative;
  margin-bottom: -20px;
  padding-bottom: 20px;
  ${flex(null, null)};
  > div {
    flex: 1 100%;
    height: auto!important;
  }
  .tr-scrollbar {
    overflow: visible!important;
  }
`;

const HeaderWrapper = styled.div`
`;

const HistoryListWrapper = styled.div`
  padding: 2px 5px 0;
  min-height: 60px;
  .history-tab {
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const InfinityLoader = styled.div`
  height: 60px;
  position: relative;
`;

export const EmptyHistoryMsg = styled.div`
  margin-bottom: 15px;
`;

export const CreateButton = styled(Button)`
  white-space: normal;
  text-align: center;
  line-height: 16px;
  height: 49px;
  font-weight: 300;
  font-size: 12px;
  padding: 0;
  box-shadow: inset 0 0 15px rgba(255,255,255,0.6);
  transition: box-shadow 300ms ease 0s;
  border: 1px solid #000c2a;
  cursor: pointer;
`;

const loaderCss = {
  margin: '0 auto',
  left: 0,
  right: 0,
  top: 38,
};

export default class History extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { search: '' };
  }
  componentDidMount() {
    this.get();
  }
  get = () => this.props.dispatch({
    type: 'GET_ROOMS_FINISHED_REQUEST',
  });

  search = (e) => {
    if (e) {
      this.setState({ search: e.target.value });
    }
    return this.props.dispatch({
      type: 'SEARCH_ROOMS_FINISHED_REQUEST',
      title: e && e.target.value,
    });
  };
  add = () => {
    if (!this.props.roomsHistory.length) return false;

    return this.props.dispatch({
      type: 'ADD_ROOMS_FINISHED_REQUEST',
      title: this.state.search,
      offset: this.props.roomsHistory[this.props.roomsHistory.length - 1].id,
    });
  };
  render() {
    return (
      <HistoryPanelWrapper>
        <HeaderWrapper>
          <LeftPanelHeader route={this.props.route} onSearchInputChange={this.search} searchProcessing={this.props.searchProcessing} />
        </HeaderWrapper>
        <ScrollWrapper>
          <Scrollbar>
            <HistoryListWrapper>
              {this.props.roomsHistory.map((room, index) =>
                (<RoomTabHistory
                  index={index}
                  historyChunk={Math.floor(index / 20)}
                  key={room.id}
                  params={this.props.params}
                  room={room}
                  dispatch={this.props.dispatch}
                />))}
              {(this.props.roomsHistoryLoaded && !this.props.roomsHistory.length) && <div>
                <EmptyHistoryMsg>
                  <FormattedMessage {...messages.empty_history} />
                </EmptyHistoryMsg>
                <CreateButton onClick={redirectToRoomCreate}>
                  <FormattedMessage {...messages.history_create_room} />
                </CreateButton>
              </div>}
            </HistoryListWrapper>
            {(!this.props.roomsHistoryLoaded && this.props.roomsHistory.length) && <InfinityLoader>
              <Loader scale={0.7} loaderCss={loaderCss} />
            </InfinityLoader>}
            {(!this.props.roomsHistoryLoaded && !this.props.roomsHistory.length) &&
            <Loader scale={0.7} loaderCss={loaderCss} />}
            <Waypoint onEnter={this.add} />
          </Scrollbar>
        </ScrollWrapper>
      </HistoryPanelWrapper>
    );
  }
}

History.propTypes = {
  route: string,
  roomsHistory: any,
  dispatch: func,
  roomsHistoryLoaded: bool,
  params: object,
  searchProcessing: bool,
};
