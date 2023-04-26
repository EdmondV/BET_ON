import React from 'react';
import { func, object, any, bool, number, string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { minPageWidth, menuWidth, leftPanelWidth } from 'styles-constants';
import styled from 'styled-components';
import NewRoomCreateForm from 'components/NewRoomCreateForm';
import NewRoomChart from 'components/Chart/NewRoomChart';

import { getAvailableAssets } from '../actions';

const OpenWrapper = styled.div`
  width: 600px;
  height: 140px;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  background: rgba(35,44,82,0.8);
  position: absolute;
  bottom: 70px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

export const NewRoomChartWrapper = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  position: relative;
  padding-bottom: 40px;
`;

export class NewRoomPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: func,
    data: any,
    browser: object,
    leftPanelOpen: bool,
    newRoomSettings: object,
    spotlight: number,
    selectedAsset: string,
    settingsAsset: string,
    fetchingHistory: bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      createdAt: Date.now() - 250000,
      expiredAt: Date.now() + 20000,
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'ROOM_MANAGER.NEW_ROOM_ACTIVE',
      payload: {
        active: true,
      },
    });

    this.props.dispatch({
      type: 'ROOM_MANAGER.SELECT_ASSET',
      payload: {
        asset: this.props.selectedAsset || this.props.settingsAsset,
        from: Date.now() - 250000,
        to: Date.now(),
      },
    });
  }

  componentWillReceiveProps() {
    this.setState({
      createdAt: Date.now() - 250000,
      expiredAt: Date.now() + 20000,
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'ROOM_MANAGER.NEW_ROOM_ACTIVE',
      payload: {
        active: false,
      },
    });
  }

  render() {
    const { data, newRoomSettings, spotlight, selectedAsset, settingsAsset, fetchingHistory } = this.props;
    const { createdAt, expiredAt } = this.state;
    const chartHeight = this.props.browser.height - 69;

    let chartWidth = Math.max(minPageWidth, this.props.browser.width) - menuWidth;

    if (this.props.leftPanelOpen) {
      chartWidth -= leftPanelWidth;
    }

    return (
      <NewRoomChartWrapper>
        <NewRoomChart
          asset={selectedAsset || settingsAsset}
          rawData={data}
          isLoading={!data.length || fetchingHistory}
          width={chartWidth}
          height={chartHeight}
          spotlight={spotlight}
          room={{
            asset: selectedAsset || settingsAsset,
            firstAsset: data[0],
            createdAt,
            expiredAt,
            assetDecimals: 5,
          }}
        />
        <OpenWrapper>
          <NewRoomCreateForm
            {...this.props}
            asset={selectedAsset || settingsAsset}
            title={newRoomSettings.title}
            expired={newRoomSettings.expired}
            bet={newRoomSettings.bet}
            type={newRoomSettings.type}
            team={newRoomSettings.team}
          />
        </OpenWrapper>
      </NewRoomChartWrapper>
    );
  }
}

NewRoomPage.defaultProps = {
  data: [],
};

const mapStateToProps = createStructuredSelector({
  settingsAsset: (state) => state.getIn(['settings', 'game', 'newRoomSettings', 'asset']),
  selectedAsset: (state) => state.get('roomManager').new.settings.asset,
  data: (state) => state.get('roomManager').new.assets,
  availableAssets: (state) => state.getIn(['mainPage', 'availableAssets']),
  newRoomSettings: (state) => state.get('roomManager').new.settings,
  createRoomPreloading: (state) => state.getIn(['preloader', 'createRoomPreloading']),
  fetchingHistory: (state) => state.get('roomManager').new.fetchingHistory,
});

export default connect(mapStateToProps, (dispatch) => ({
  getAvailableAssets: (timeframe) => dispatch(getAvailableAssets(timeframe)),
  dispatch,
}))(NewRoomPage);

