import React from 'react';
import moment from 'moment';

import Scenario from './Scenario';
import ScenarioGroup from './ScenarioGroup';
import Renderer from './Renderer';

import Chart from '../app/components/Chart/Chart';

const firstAsset = { timestamp: moment().subtract(10, 'seconds').valueOf(), value: 10.1240 };
const scenario = new Scenario({
  width: 800,
  height: 400,

  room: {
    firstAsset,
    isGamePlaying: true,
    bets: [],
    assetDecimals: 4,
    createdAt: moment().subtract(10, 'seconds').valueOf(),
    deadlineAt: moment().subtract(5, 'seconds').valueOf(),
    expiredAt: moment().subtract(1, 'seconds').valueOf(),
  },
  showBets: true,
  smooth: true,
  rawData: [
    firstAsset,
  ],
});

scenario.addAssetValue(moment().subtract(9, 'seconds').valueOf(), 10.1241);
scenario.addAssetValue(moment().subtract(8, 'seconds').valueOf(), 10.1239);
scenario.addAssetValue(moment().subtract(7, 'seconds').valueOf(), 10.1241);
scenario.addAssetValue(moment().subtract(6, 'seconds').valueOf(), 10.1237);
scenario.addAssetValue(moment().subtract(5, 'seconds').valueOf(), 10.1240);
scenario.addAssetValue(moment().subtract(4, 'seconds').valueOf(), 10.1239);
scenario.addAssetValue(moment().subtract(3, 'seconds').valueOf(), 10.1238);
scenario.addAssetValue(moment().subtract(2, 'seconds').valueOf(), 10.1242);
scenario.addAssetValue(moment().subtract(1, 'seconds').valueOf(), 10.1239);


export const RoomScenarios = (
  <ScenarioGroup name="Chart">
    <Renderer name="Animated" scenario={scenario}>
      <Chart />
    </Renderer>
  </ScenarioGroup>
);
