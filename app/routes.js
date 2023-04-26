// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import { getAsyncInjectors } from 'utils/asyncInjectors';
import { HOME_URL } from 'utils/redirects';
import { reducer as settingsReducer } from 'modules/settings/settings';
import { reducer as preloaderReducer } from 'preloader';
import globalSagas from 'globalSagas';
// import { store as appStore } from 'app';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

// const isFeedbackPage = ({ location }) => location && location.pathname && location.pathname.includes('/feedback');

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  injectReducer('settings', settingsReducer);
  injectReducer('preloader', preloaderReducer);
  injectSagas(globalSagas);
  return [
    {
      path: '/',
      name: 'auth',
      onEnter() {
        if (Cookies.get('session')) { // enables routing from game to feedback
          browserHistory.push(`${HOME_URL}/1`);
        }
      },
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LoginPage/reducer'),
          import('containers/LoginPage/sagas'),
          import('containers/LoginPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectSagas(sagas.default);
          injectReducer('authPage', reducer.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      getChildRoutes(location, cb) {
        cb(null, [{
          path: 'forgot-password',
          name: 'forgot',
        },
        {
          path: 'restore-sent',
          name: 'restore-sent',
        },
        {
          path: 'registration',
          name: 'signup',
        },
        {
          path: 'feedback',
          name: 'feedback',
        },
        {
          path: 'feedback-sent',
          name: 'feedback-sent',
        },
        {
          path: 'restore',
          name: 'restore',
        },
        {
          path: 'restore-success',
          name: 'restore-success',
        },
        {
          path: 'blocked',
          name: 'blocked',
        }]);
      },
    },
    {
      path: '/game',
      name: 'game',
      // onEnter() {
      //   if (!Cookies.get('session')) { // enables routing from game to feedback
      //     browserHistory.push('/');
      //   }
      // },
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MainPage/reducer'),

          import('modules/rooms/reducer'),
          import('modules/rooms/sagas'),
          import('containers/MainPage/sagas'),

          import('containers/MainPage/MainPage'),
        ]);

        const renderRoute = loadModule(cb);
        importModules.then(([reducer, roomManagerReducer, roomManagerSagas, sagas, main]) => {
          injectSagas(sagas.default);
          injectSagas(roomManagerSagas.default);
          injectReducer('roomManager', roomManagerReducer.default);
          injectReducer('mainPage', reducer.default);
          renderRoute(main);
        });

        importModules.catch(errorLoading);
      },
      getChildRoutes(location, cb) {
        cb(null, [
          {
            path: ':id',
            name: 'viewRoom',
          }]);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
