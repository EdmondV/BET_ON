import React from 'react';
import ReactDOM from 'react-dom';

import 'sanitize.css/sanitize.css';
import 'global-styles';
import FontFaceObserver from 'fontfaceobserver';

import ScenarioManager from './ScenarioManager';
import { RoomScenarios } from './Room.scenario';
import { RoomPreviewScenarios } from './RoomPreview.scenario';

const robotoObserver = new FontFaceObserver('Lato', {});
robotoObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.remove();
}, () => {
  document.body.classList.remove('fontLoaded');
});

ReactDOM.render(
  <ScenarioManager>
    {RoomScenarios}
    {RoomPreviewScenarios}
  </ScenarioManager>,
  document.getElementById('app')
);
