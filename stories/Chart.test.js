/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import { assert } from 'expect';

import { storiesOf, describe, it, specs } from '../.storybook/facade';
import Chart from '../app/components/Chart/Chart';

const haveStyle = (elem, need) => {
  const actual = elem.getAttribute('style');

  assert(
    actual.indexOf(need) !== -1,
    'Expected %s to not have a %s style of %s',
    elem,
    need,
    actual
  );
};


storiesOf('Chart', module)
  .add('Draw', () => {
    const rawData = [];
    for (let i = 10; i > 0; i -= 1) {
      rawData.push({ timestamp: moment().subtract(i, 'minute').valueOf(), value: 1 });
    }

    const story =
      (<Chart
        width={800}
        height={400}
        room={{
          firstAsset: rawData[0],
          bets: [],
          assetDecimals: 5,
          lastAsset: rawData[9],
          createdAt: moment().subtract(10, 'minute').valueOf(),
          deadlineAt: moment().subtract(5, 'minute').valueOf(),
          expiredAt: moment().subtract(1, 'minute').valueOf(),
        }}
        rawData={rawData}
        showBets={false}
      />);


    specs(() => describe('Pulse', () => {
      it('Should place line on middle chart', () => {
        haveStyle(mount(story).find('.startPoint').node, 'top: 50%');
      });
    }));

    return story;
  })
  .add('Team 1 win', () => {
    console.log('Add'); // eslint-disable-line
    const rawData = [];
    for (let i = 10; i > 1; i -= 1) {
      rawData.push({ timestamp: moment().subtract(i, 'minute').valueOf(), value: 2 + Math.random().toFixed(4) });
    }

    rawData.push({ timestamp: moment().subtract(1, 'minute').valueOf(), value: 1 + parseFloat(rawData[0].value) });

    const story =
      (<Chart
        width={800}
        height={400}
        room={{
          firstAsset: rawData[0],
          bets: [],
          assetDecimals: 5,
          lastAsset: rawData[9],
          createdAt: moment().subtract(10, 'minute').valueOf(),
          deadlineAt: moment().subtract(5, 'minute').valueOf(),
          expiredAt: moment().subtract(1, 'minute').valueOf(),
        }}
        rawData={rawData}
        showBets={false}
      />);


    // specs(() => describe('Pulse', function () {
    //   it('Should place start poonit on start', function () {
    //     let output = mount(story);
    //     expect(output.text()).toContain('Hello World');
    //   });
    // }));

    return story;
  })
  .add('Team 2 win', () => {
    const rawData = [];
    for (let i = 10; i > 1; i -= 1) {
      rawData.push({ timestamp: moment().subtract(i, 'minute').valueOf(), value: 2 + Math.random().toFixed(4) });
    }

    rawData.push({ timestamp: moment().subtract(1, 'minute').valueOf(), value: -1 + parseFloat(rawData[0].value) });

    const story =
      (<Chart
        width={800}
        height={400}
        room={{
          firstAsset: rawData[0],
          bets: [],
          assetDecimals: 5,
          lastAsset: rawData[9],
          createdAt: moment().subtract(10, 'minute').valueOf(),
          deadlineAt: moment().subtract(5, 'minute').valueOf(),
          expiredAt: moment().subtract(1, 'minute').valueOf(),
        }}
        rawData={rawData}
        showBets={false}
      />);


    // specs(() => describe('Pulse', function () {
    //   it('Should place start poonit on start', function () {
    //     let output = mount(story);
    //     expect(output.text()).toContain('Hello World');
    //   });
    // }));

    return story;
  })
  .add('Smoothing and bet', () => {
    const rawData = [
      { timestamp: moment().subtract(10, 'minute').valueOf(), value: 1 },
      { timestamp: moment().subtract(9, 'minute').valueOf(), value: 1 },
      { timestamp: moment().subtract(8, 'minute').valueOf(), value: 1 },
      { timestamp: moment().subtract(7, 'minute').valueOf(), value: 1 },
      { timestamp: moment().subtract(6, 'minute').valueOf(), value: 1 },
      { timestamp: moment().subtract(5, 'minute').valueOf(), value: 10 },
      { timestamp: moment().subtract(4, 'minute').valueOf(), value: 1 },
      { timestamp: moment().subtract(3, 'minute').valueOf(), value: 1 },
      { timestamp: moment().subtract(2, 'minute').valueOf(), value: 1 },
      { timestamp: moment().subtract(1, 'minute').valueOf(), value: 1 },
    ];

    const props = {
      width: 800,
      height: 400,

      room: {
        firstAsset: rawData[0],
        lastAsset: rawData[9],
        bets: [
          {
            id: Date.now(),
            team: 1,
            bet: 1,
            created: moment().subtract(10, 'minute').valueOf(),
          },
          {
            id: Date.now() + 1,
            team: 1,
            bet: 10,
            created: moment().subtract(5, 'minute').valueOf(),
          },
          {
            id: Date.now() + 2,
            team: 1,
            bet: 1,
            created: moment().subtract(1, 'minute').valueOf(),
          },
        ],
        assetDecimals: 4,
        createdAt: moment().subtract(10, 'minute').valueOf(),
        deadlineAt: moment().subtract(5, 'minute').valueOf(),
        expiredAt: moment().subtract(1, 'minute').valueOf(),
      },
      showBets: true,
      smooth: false,
      rawData,
    };

    return <Chart {...props} />;
  });
