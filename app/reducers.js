import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notifications } from 'react-notification-system-redux';
import { createResponsiveStateReducer } from 'redux-responsive';

import globalReducer from 'containers/App/reducer';
import footballPageReducer from './containers/MainPage/FootballPage/reducer';

const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

export default function createReducer(asyncReducers) {
  return combineReducers({
    notifications,
    route: routeReducer,
    global: globalReducer,
    footballPage: footballPageReducer,
    form: formReducer,
    browser: createResponsiveStateReducer(null, {
      extraFields: () => ({
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    }),
    ...asyncReducers,
  });
}
