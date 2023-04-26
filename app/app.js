/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import { calculateResponsiveState } from 'redux-responsive';
import Raven from 'raven-js';

import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from 'containers/App/selectors';

import configureStore, { logPageView } from 'store';

// Import CSS reset and Global Styles
import './global-styles';

// Import routes
import createRoutes from './routes';
import WS from './modules/modules/ws';


const latoObserver = new FontFaceObserver('Lato', {});
latoObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const { store } = configureStore(initialState, browserHistory);


const ravenErrorCatcher = (err) => {
  if (Raven.isSetup()) {
    Raven.captureException(err);
  }
};

window.addEventListener('resize', () => store.dispatch(calculateResponsiveState(window)));
window.onerror = ravenErrorCatcher;


// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

const render = (cb) => {
  ReactDOM.render(
    <Provider store={store}>
      <Router
        history={history}
        routes={rootRoute}
        onUpdate={logPageView}
      />
    </Provider>,
    document.getElementById('app'), cb
  );
};

if (module.hot) {
  module.hot.accept('./i18n', () => {
    render();
  });
}

if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'watch') {
  render();
}

let firstConnect = true;
const ws = new WS(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws`, {
  onConnect: () => {
    console.log('ws connected');
    if (firstConnect) {
      store.dispatch({ type: 'WS.CONNECTED', connected: true });
      firstConnect = false;
    } else {
      store.dispatch({ type: 'WS.CONNECTION_CHANGE', connected: true });
    }
  },
  onDisconnect: () => {
    store.dispatch({ type: 'WS.CONNECTION_CHANGE', connected: false });
  },
  onError: ravenErrorCatcher,
  onMessage: ({ type, payload }) => {
    switch (type) {
      case 'assets':
        store.dispatch({ type: 'WS.UPDATE_ASSETS', payload });
        break;
      case 'assets.patch':
        store.dispatch({ type: 'WS.PATCH_ASSETS', payload });
        break;
      case 'paymentMethods.patch':
        store.dispatch({ type: 'WS.PAYMENT_METHODS_PATCH', payload });
        break;
      case 'profile':
        if (payload.errors) {
          // redirectToAuth();
          // Cookies.remove('session');
          return;
        }

        // if (payload.user === 'guest' && localeExist(payload.country)) {
        //   store.dispatch(defaultLocale(payload.country));
        // }

        store.dispatch({ type: 'WS.PROFILE_DATA', payload });
        break;
      case 'profile.patch':
        store.dispatch({ type: 'WS.PROFILE_UPDATE', payload });
        break;
      case 'position.closed':
        store.dispatch({ type: 'WS.POSITION_CLOSED', payload });
        break;
      case 'assets.volatility':
        store.dispatch({ type: 'WS.VOLATILITY_UPDATE', payload });
        break;
      case 'deposit.minUSD':
        store.dispatch({ type: 'WS.MIN_AMOUNT', payload });
        break;
      default:
        console.warn(`New type of WS message! ${type} – 
        ${JSON.stringify(payload)} 
        :)`);
    }
  },
});

export {
  store,
  ws,
};
