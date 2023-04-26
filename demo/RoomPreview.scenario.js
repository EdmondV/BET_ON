import React from 'react';
import moment from 'moment';

import { round } from '../app/utils/math';

import Scenario from './Scenario';
import ScenarioGroup from './ScenarioGroup';
import Renderer from './Renderer';

import RoomPreview from '../app/components/RoomPreview/index';
import RoomTabHistory from '../app/components/RoomTabHistory/index';

const assetDecimals = 4;
const firstAsset = { timestamp: moment().subtract(10, 'seconds').valueOf(), value: round(10.1240, assetDecimals) };
const scenario = new Scenario({
  room: {
    firstAsset,
    title: 'Very long string Very long string Very long string Very long string',
    asset: 'DEMO',
    isGamePlaying: true,
    bets: [],
    bet: 100,
    assetDecimals: 4,
    createdAt: moment().subtract(10, 'seconds').valueOf(),
    deadlineAt: moment().subtract(5, 'seconds').valueOf(),
    expiredAt: moment().subtract(1, 'seconds').valueOf(),
  },
  assets: [
    firstAsset,
  ],
});

// scenario.addAssetValue(moment().subtract(9, 'seconds').valueOf(), 10.1241, 'assets');
// scenario.addAssetValue(moment().subtract(8, 'seconds').valueOf(), 10.1239, 'assets');
// scenario.addAssetValue(moment().subtract(7, 'seconds').valueOf(), 10.1241, 'assets');
// scenario.addAssetValue(moment().subtract(6, 'seconds').valueOf(), 10.1237, 'assets');
// scenario.addAssetValue(moment().subtract(5, 'seconds').valueOf(), 10.1240, 'assets');
// scenario.addAssetValue(moment().subtract(4, 'seconds').valueOf(), 10.1239, 'assets');
// scenario.addAssetValue(moment().subtract(3, 'seconds').valueOf(), 10.1238, 'assets');
// scenario.addAssetValue(moment().subtract(2, 'seconds').valueOf(), 10.1242, 'assets');
// scenario.addAssetValue(moment().subtract(1, 'seconds').valueOf(), 10.1239, 'assets');

export const RoomPreviewScenarios = (
  <ScenarioGroup name="Room Preview">
    <Renderer
      wrapper={{
        width: '250px',
        backgroundColor: '#232c52',
        overflow: 'hidden',
        padding: '20px',
      }}
      delay={300}
      loop={false}
      name="Long strings" scenario={scenario}
    >
      <RoomPreview />
      <RoomPreview showChartPreview />
      <RoomTabHistory />
    </Renderer>
  </ScenarioGroup>
);
