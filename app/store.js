import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { take, takeEvery, race, put, call, all } from 'redux-saga/effects';
import ravenMiddleware from 'redux-raven-middleware';
import reactGA from 'react-ga';

import createReducer from './reducers';
import { middleware } from './sounds';

const sagaMiddleware = createSagaMiddleware();

export function logPageView() {
  if (process.env.NODE_ENV !== 'production') return;
  reactGA.set({ page: window.location.pathname + window.location.search });
  reactGA.pageview(window.location.pathname + window.location.search);
}

const analyticsMiddleware = () => (next) => (action) => {
  if (action.meta && action.meta.analytics) {
    const { analytics } = action.meta;
    console.log('analytics action', analytics.type.toLowerCase().replace(/_/g, '-')); // eslint-disable-line
    reactGA.event({
      action: analytics.type.toLowerCase().replace(/_/g, '-'),
      category: analytics.category || (analytics.payload && analytics.payload.category) || 'general',
      value: analytics.value || 0,
    });
  }
  return next(action);
};

const PROMISE = '@@redux-form-saga/PROMISE';
function* handlePromiseSaga({ payload }) {
  const { request, defer, types } = payload;
  const { resolve, reject } = defer;
  const [SUCCESS, FAIL] = types;

  const [winner] = yield all([
    race({
      success: take(SUCCESS),
      fail: take(FAIL),
    }),
    put(request),
  ]);

  if (winner.success) {
    yield call(resolve, winner.success && winner.success.payload ? winner.success.payload : winner.success);
    yield call(reject, winner.fail && winner.fail.payload ? winner.fail.payload : winner.fail);
  }
}

export function* formActionSaga() {
  yield takeEvery(PROMISE, handlePromiseSaga);
}

export default function configureStore(initialState = {}, history) {
  const middlewares = [
    sagaMiddleware,
    middleware,
    routerMiddleware(history),
  ];

  if (process.env.NODE_ENV === 'production') {
    // Google analytics
    reactGA.initialize('UA-91949628-1');
    logPageView();
    reactGA.set({ appName: 'TradingRooms Game v2' });
    middlewares.push(analyticsMiddleware);
    middlewares.push(ravenMiddleware(
      'https://59b53611f6a64e72b61a1dcbfae1fb80@sentry.faunus.io/5',
      { release: `${process.env.VERSION} ${process.env.BUILD}` }));
  }


  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    ((process.env.DEBUG || '').length || process.env.NODE_ENV !== 'production') &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(applyMiddleware(...middlewares))
  );


  store.runSaga = sagaMiddleware.run;
  sagaMiddleware.run(formActionSaga);
  store.asyncReducers = {};

  return { store };
}
