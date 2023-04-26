import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'TR',
  url: 'https://game2.tradingrooms.com',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: false,
  sortStoriesByKind: true,
});


function loadStories() {
  require('../stories/Chart.test');
}

configure(loadStories, module);
